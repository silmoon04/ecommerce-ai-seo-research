(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const money=(n,d=0)=>new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP',maximumFractionDigits:d,minimumFractionDigits:d}).format(n);
  const number=(n,d=0)=>new Intl.NumberFormat('en-GB',{maximumFractionDigits:d}).format(n);
  const escape=value=>String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const svgNS='http://www.w3.org/2000/svg';
  const model=window.ResearchModel;
  const notes=window.RESEARCH_NOTES||[];
  let selectedFilter='All';
  let lastNoteTrigger=null;

  const waffle=document.createDocumentFragment();
  for(let i=0;i<1000;i++){const cell=document.createElement('i');if(i<4)cell.className='highlight';waffle.append(cell);}
  $('traffic-waffle').append(waffle);
  const people=document.createDocumentFragment();
  for(let i=0;i<100;i++)people.append(document.createElement('i'));
  $('free-people').append(people);

  function renderCompetitors(){
    const filtered=window.COMPETITORS.filter(item=>selectedFilter==='All'||item.category===selectedFilter);
    $('competitor-rows').innerHTML=filtered.map(item=>`<tr><td><a href="${escape(item.url)}" target="_blank" rel="noopener">${escape(item.name)} ↗</a><small>${escape(item.category)}</small>${item.free?'<span class="free-badge">Free offer available</span>':''}</td><td>${escape(item.plans)}</td><td>${escape(item.focus)}</td></tr>`).join('');
  }
  document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
    selectedFilter=button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach(other=>{other.classList.toggle('active',other===button);other.setAttribute('aria-pressed',String(other===button));});
    renderCompetitors();
  }));
  renderCompetitors();

  function updateFree(){
    const conversion=Number($('conversion').value), result=model.free(conversion);
    $('conversion-value').textContent=conversion+'%';
    $('free-payers').textContent=number(result.payers);
    $('free-cac').textContent=money(result.costPerPayer,2);
    $('free-people').querySelectorAll('i').forEach((cell,i)=>cell.classList.toggle('paid',i<result.payers));
    $('free-explanation').textContent=`Orange cells are paying customers; each cell is one completed free audit. At ${conversion}% conversion, reaching 100 payers needs about ${number(result.auditsFor100)} audits before churn.`;
  }
  $('conversion').addEventListener('input',updateFree);updateFree();

  function businessValues(){
    const values={};
    for(const key of Object.keys(model.defaults)){
      const input=$(key);
      if(!input.validity.valid||input.value.trim()===''||!Number.isFinite(input.valueAsNumber))return null;
      values[key]=input.valueAsNumber;
    }
    return values;
  }
  function niceStep(range){const rough=range/4;const magnitude=10**Math.floor(Math.log10(rough||1));const unit=rough/magnitude;return (unit<=1?1:unit<=2?2:unit<=5?5:10)*magnitude;}
  function drawProfit(v,result){
    const width=Math.max(280,Math.min(900,$('profit-chart').clientWidth||720));
    const height=width<430?245:280,pad={left:width<430?45:63,right:15,top:25,bottom:45};
    const maxX=Math.max(300,Math.ceil(v.payers*1.25/50)*50);
    const start=-result.fixed,end=maxX*result.contribution-result.fixed;
    const rawMin=Math.min(start,end,0),rawMax=Math.max(start,end,0);
    const step=niceStep(rawMax-rawMin);
    const minY=Math.floor(rawMin/step)*step,maxY=Math.ceil((rawMax||step)/step)*step;
    const x=n=>pad.left+n/maxX*(width-pad.left-pad.right);
    const y=n=>height-pad.bottom-(n-minY)/(maxY-minY)*(height-pad.top-pad.bottom);
    const compact=n=>(n<0?'-':'')+'£'+(Math.abs(n)>=1000000?number(Math.abs(n)/1000000,1)+'m':Math.abs(n)>=1000?number(Math.abs(n)/1000,1)+'k':number(Math.abs(n)));
    let markup=`<svg xmlns="${svgNS}" viewBox="0 0 ${width} ${height}" role="img" aria-labelledby="profit-svg-title" aria-describedby="profit-svg-desc"><title id="profit-svg-title">Monthly surplus by active customer count</title><desc id="profit-svg-desc">At ${v.payers} customers, surplus is ${money(result.surplus,2)}. ${result.breakEven===null?'No break-even exists with non-positive contribution.':'Break-even is '+result.breakEven+' paying customers.'} All operating inputs are assumptions.</desc>`;
    for(let t=minY;t<=maxY+.01;t+=step){markup+=`<line x1="${pad.left}" x2="${width-pad.right}" y1="${y(t)}" y2="${y(t)}" stroke="${t===0?'#9aa79d':'#dce1d8'}" ${t===0?'':'stroke-dasharray="3 5"'}/><text x="${pad.left-11}" y="${y(t)+4}" font-family="Manrope,Arial,sans-serif" text-anchor="end" font-size="10" fill="#626b66">${compact(t)}</text>`;}
    for(let i=0;i<=4;i++){const value=maxX*i/4;markup+=`<text x="${x(value)}" y="${height-24}" font-family="Manrope,Arial,sans-serif" text-anchor="middle" font-size="10" fill="#626b66">${number(value)}</text>`;}
    markup+=`<path d="M ${x(0)} ${y(start)} L ${x(maxX)} ${y(end)}" fill="none" stroke="#28636a" stroke-width="2.8"/><line x1="${x(v.payers)}" x2="${x(v.payers)}" y1="${y(result.surplus)}" y2="${height-pad.bottom}" stroke="#ed4c13" stroke-dasharray="3 4"/><circle cx="${x(v.payers)}" cy="${y(result.surplus)}" r="5" fill="#ed4c13" stroke="#f5f3ef" stroke-width="2"/>`;
    if(result.breakEven!==null&&result.breakEven<=maxX){const bx=x(result.breakEven);markup+=`<circle cx="${bx}" cy="${y(result.breakEven*result.contribution-result.fixed)}" r="3" fill="#28636a"/><text x="${bx+8}" y="${y(0)+17}" font-family="Manrope,Arial,sans-serif" font-size="9" fill="#28636a">Break-even ${number(result.breakEven)}</text>`;}
    markup+=`<text x="${width/2}" y="${height-3}" font-family="Manrope,Arial,sans-serif" text-anchor="middle" font-size="10" fill="#626b66">${width<430?'Active paying customers':'Active paying customers · orange dot is your selected scenario'}</text></svg>`;
    $('profit-chart').innerHTML=markup;
  }
  function updateBusiness(){
    const v=businessValues();
    if(!v){$('business-note').textContent='Enter valid numbers within the input limits to update the calculation. The displayed chart retains the last valid scenario.';return;}
    const r=model.business(v);
    $('business-revenue').textContent=money(r.revenue);
    $('business-surplus').textContent=money(r.surplus);
    $('business-surplus').className=r.surplus>=0?'positive':'negative';
    $('business-break').textContent=r.breakEven===null?'None':number(r.breakEven);
    $('support-hours').textContent=number(r.supportHours,1)+' support hours / month';
    const items=[['Processing + share',r.processing+r.revenueShare,'#93a49a'],['Delivery',r.delivery,'#a7b5a3'],['Support labour',r.support,'#bfc8b8'],['Replacement acquisition',r.replacement,'#d2c7b5'],['Fixed + research',v.overhead+v.research,'#858c85'],['Founder pay',v.founder,'#28636a']];
    if(r.surplus>0)items.push(['Surplus',r.surplus,'#ed4c13']);
    const total=items.reduce((sum,item)=>sum+item[1],0);
    $('cost-stack').innerHTML=items.filter(item=>item[1]>0).map(item=>`<span style="width:${item[1]/total*100}%;background:${item[2]}" title="${escape(item[0])}: ${money(item[1],2)}"></span>`).join('');
    $('cost-stack').setAttribute('aria-label',items.map(item=>item[0]+': '+money(item[1],2)).join('. '));
    $('cost-legend').innerHTML=items.map(item=>`<div><span><i class="key-dot" style="background:${item[2]}"></i>${escape(item[0])}</span><b>${money(item[1])}</b></div>`).join('');
    $('business-note').textContent=`Contribution after replacement acquisition is ${money(r.contribution,2)} per payer. Initial acquisition for ${number(v.payers)} payers is ${money(r.initialAcquisition)}, excluded from monthly surplus.${r.surplus<0?' Total displayed costs exceed revenue; the difference is the monthly deficit.':''}${r.supportHours>120?' Support already exceeds 120 hours a month. Revisit staffing and fixed costs.':''}${r.breakEven===null?' With non-positive per-customer contribution, adding customers cannot cover fixed costs.':''}`;
    const counts=[...new Set([30,48,100,300,v.payers])].sort((a,b)=>a-b);
    $('scenario-rows').innerHTML=counts.map(n=>{const row=model.business({...v,payers:n});return `<tr><td>${number(n)}${n===v.payers?' (selected)':''}</td><td>${money(row.revenue)}</td><td>${money(row.surplus,2)}</td><td>${number(row.supportHours,1)}</td></tr>`;}).join('');
    drawProfit(v,r);
  }
  Object.keys(model.defaults).forEach(key=>$(key).addEventListener('input',updateBusiness));
  $('reset-business').addEventListener('click',()=>{Object.entries(model.defaults).forEach(([key,value])=>$(key).value=value);updateBusiness();});updateBusiness();
  window.addEventListener('resize',updateBusiness);

  const merchantInputs={'sessions':'sessions','aiShare':'ai-share','conversion':'conversion-rate','lift':'lift','contribution':'order-value','fee':'merchant-fee','savedHours':'saved-hours','hourly':'merchant-hourly'};
  function updateMerchant(){
    const values={};
    for(const [key,id] of Object.entries(merchantInputs)){const input=$(id);if(!input.validity.valid||input.value.trim()===''){ $('roi-explanation').textContent='Enter valid numbers within the input limits to update this scenario.';return;}values[key]=input.valueAsNumber;}
    const r=model.merchant(values);
    $('roi-flow').innerHTML=`<div><span>AI-referred visits</span><strong>${number(r.visits,1)}</strong></div><div><span>Baseline orders</span><strong>${number(r.baseline,1)}</strong></div><div><span>Assumed extra orders</span><strong>${number(r.extra,2)}</strong></div>`;
    $('roi-value').textContent=money(r.value);
    $('roi-net').textContent=money(r.net);
    $('roi-net').className=r.net>=0?'positive':'negative';
    $('roi-explanation').textContent=`Assumed extra sales contribute ${money(r.sales,2)}; verified time savings contribute ${money(r.labour,2)}. To cover the fee through sales alone requires ${r.ordersNeeded===null?'positive contribution per order':number(r.ordersNeeded)+' additional whole orders'}. Through time alone, it requires ${r.hoursNeeded===null?'a positive labour value':number(r.hoursNeeded,2)+' verified hours saved'}.`;
  }
  Object.values(merchantInputs).forEach(id=>$(id).addEventListener('input',updateMerchant));updateMerchant();

  function renderLibrary(){
    const query=$('research-search').value.toLowerCase().trim();
    const results=notes.filter(note=>(note.title+' '+note.summary+' '+note.category+' '+note.markdown).toLowerCase().includes(query));
    $('note-count').textContent=results.length+' / '+notes.length+' notes';
    $('research-grid').innerHTML=results.length?results.map(note=>`<button class="research-card" data-note="${escape(note.id)}"><span>${escape(note.category)}</span><h3>${escape(note.title)}</h3><p>${escape(note.summary)}</p><b>Read the research ↗</b></button>`).join(''):'<p class="no-results">No matching notes. Try a product name, a source, or a broader topic.</p>';
  }
  $('research-search').addEventListener('input',renderLibrary);renderLibrary();
  function openNote(id,trigger){
    const note=notes.find(item=>item.id===id);if(!note)return;
    if(!$('note-dialog').open)lastNoteTrigger=trigger||document.activeElement;
    $('note-title').textContent=note.title;
    $('download-note').href=note.file;
    $('note-content').innerHTML=window.marked.parse(note.markdown,{gfm:true});
    $('note-content').querySelectorAll('a').forEach(link=>{
      const raw=link.getAttribute('href')||'';
      if(raw.startsWith('https://')||raw.startsWith('http://')){link.target='_blank';link.rel='noopener';}
      else if(/^[a-z][a-z0-9+.-]*:/i.test(raw)){link.removeAttribute('href');}
      else if(raw&&!raw.startsWith('#')){
        const file=raw.split('/').pop().split('#')[0];
        const linked=notes.find(item=>item.file.split('/').pop()===file);
        if(linked){link.href='#';link.dataset.note=linked.id;}
        else{link.href='notes/'+file;}
      }
    });
    $('note-dialog').scrollTop=0;
    if(!$('note-dialog').open){$('note-dialog').showModal();document.body.style.overflow='hidden';}
    $('close-note').focus();
  }
  document.addEventListener('click',event=>{const trigger=event.target.closest('[data-note]');if(trigger){event.preventDefault();openNote(trigger.dataset.note,trigger);}});
  $('close-note').addEventListener('click',()=>$('note-dialog').close());
  $('note-dialog').addEventListener('click',event=>{if(event.target===$('note-dialog')){const rect=event.target.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)$('note-dialog').close();}});
  $('note-dialog').addEventListener('close',()=>{document.body.style.overflow='';if(lastNoteTrigger?.isConnected)lastNoteTrigger.focus();});
  $('print-report').addEventListener('click',()=>window.print());
  $('print-note').addEventListener('click',()=>{document.body.classList.add('printing-note');window.print();});
  window.addEventListener('afterprint',()=>document.body.classList.remove('printing-note'));

  const sections=[...document.querySelectorAll('.chapter, #library')];
  const chapterLinks=[...document.querySelectorAll('.chapter-rail nav a')];
  function updateChapter(){let active=sections[0];for(const section of sections){if(section.getBoundingClientRect().top<window.innerHeight*.3)active=section;}chapterLinks.forEach(link=>{const current=link.hash==='#'+active.id;link.classList.toggle('active',current);if(current)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}
  let queued=false;window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(()=>{updateChapter();queued=false;});}},{passive:true});updateChapter();
})();
