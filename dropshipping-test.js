(() => {
  'use strict';
  const data = window.dropshippingStudy;
  const $ = id => document.getElementById(id);
  const el = (tag, text, cls) => { const n = document.createElement(tag); if (text != null) n.textContent = text; if (cls) n.className = cls; return n; };
  const arr = value => Array.isArray(value) ? value : [];
  const plain = value => value == null ? '' : Array.isArray(value) ? value.map(plain).join(' ') : typeof value === 'object' ? Object.entries(value).map(([k,v]) => `${k.replaceAll('_',' ')}: ${plain(v)}`).join('; ') : String(value);
  const p = (parent, text, cls) => { if (text != null && plain(text)) parent.append(el('p', plain(text), cls)); };
  const url = value => { try { const u = new URL(value); return ['https:', 'http:'].includes(u.protocol) ? u.href : null; } catch { return null; } };
  const link = (text, value) => { const a = el('a', text); const safe = url(value); if (safe) { a.href = safe; a.target = '_blank'; a.rel = 'noopener noreferrer'; } return a; };
  const labelled = (parent, label, value) => { if (!plain(value)) return; const n = el('p'); n.append(el('strong', `${label} `), document.createTextNode(plain(value))); parent.append(n); };
  const money = value => Number.isFinite(value) ? new Intl.NumberFormat('en-GB', {style:'currency',currency:'GBP',minimumFractionDigits:2,maximumFractionDigits:2}).format(value) : 'Unavailable';
  const finite = value => Number.isFinite(Number(value));
  if (!data) { $('decision-status').textContent = 'Reviewed study data is pending.'; $('calculator').append(el('p','Calculator defaults are pending. No substitute assumptions have been inserted.','small-note')); $('reset-model').disabled = true; return; }
  $('video-count').textContent = arr(data.videos).length;
  $('decision-count').textContent = arr(data.decisions).length;
  if (data.overview?.verdict) { $('verdict').replaceChildren(); p($('verdict'), data.overview.verdict); }
  arr(data.overview?.paragraphs).forEach(t => p($('overview-copy'),t));
  arr(data.overview?.takeaways).forEach(t => p($('takeaways'),t,'takeaway'));
  const limits = el('ul'); arr(data.overview?.limitations).forEach(t => limits.append(el('li',plain(t)))); $('limitations').append(limits);
  if (arr(data.videos).length) $('video-grid').replaceChildren();
  arr(data.videos).forEach(v => {
    const card = el('article',null,'video-card');
    if (/^[A-Za-z0-9_-]{11}$/.test(v.video_id || '')) {
      const a = link('', `https://www.youtube.com/watch?v=${v.video_id}`), img = el('img');
      img.src = `https://i.ytimg.com/vi/${v.video_id}/hqdefault.jpg`; img.alt = `Video reference: ${v.title || v.creator || 'reviewed video'}`; img.width = 480; img.height = 360; img.loading = 'lazy'; a.append(img); card.append(a);
    }
    const h = el('h3'); h.append(link(v.title || 'Reviewed video',v.url)); card.append(h);
    p(card, `${v.creator || ''}${v.published ? ' · '+v.published : ''}${v.duration_seconds ? ' · '+Math.floor(v.duration_seconds/60)+':'+String(v.duration_seconds%60).padStart(2,'0') : ''}`,'video-meta');
    p(card,v.brief_summary); p(card,v.evidence_limits,'evidence-limit'); $('video-grid').append(card);
  });
  $('claim-count').textContent = `(${arr(data.claims).length} claims)`;
  arr(data.claims).forEach(c => { const a=el('article',null,'claim'); a.append(el('h4',c.claim)); p(a,`${c.time || ''}${c.time ? ' · ' : ''}${plain(c.evidence_status)}`,'status'); labelled(a,'Missing evidence:',c.missing); labelled(a,'Our response:',c.our_response); $('claims').append(a); });
  arr(data.workflow).forEach(w => { const a=el('article',null,'workflow-item'); a.append(el('h3',w.title)); const cols=el('div',null,'workflow-columns'); [['Creator’s step',w.creator_step],['Our proposed decision',w.our_decision]].forEach(([label,text]) => { const c=el('div'); c.append(el('strong',label)); p(c,text); cols.append(c); }); a.append(cols); labelled(a,'Reason:',w.reason); labelled(a,'Evidence task:',w.test); $('workflow').append(a); });
  if(data.tools_summary){const comparison=el('div',null,'workflow-columns');[['Lean first test',data.tools_summary.lean],['Full paid stack',data.tools_summary.full]].forEach(([label,text])=>{const box=el('div');box.append(el('strong',label));p(box,text);comparison.append(box);});$('tool-list').append(comparison);p($('tool-list'),data.tools_summary.note,'small-note');}
  arr(data.tools).forEach(t => { const row=el('article',null,'tool'), head=el('div'), body=el('div'); const h=el('h3'); h.append(link(t.name,t.source_url)); head.append(h); p(body,t.role); labelled(body,'Published price:',t.price_note); p(body,t.decision,'tool-decision'); row.append(head,body); $('tool-list').append(row); });
  arr(data.cases).forEach(c => { const card=el('article',null,'case'); card.append(el('h3',c.name)); labelled(card,'Recommendation:',c.recommendation); p(card,c.reason); labelled(card,'Next test:',c.next_test); labelled(card,'Still unknown:',c.unknown); $('case-grid').append(card); });
  const plan=data.plan;
  if (plan?.budget) {
    const b=plan.budget, panel=el('div',null,'budget-panel');
    panel.append(el('h3','A planning ceiling, subject to the gates')); p(panel,finite(b.ceiling)?money(Number(b.ceiling)):plain(b.ceiling),'budget-amount');
    const allocations=arr(b.allocations), bar=el('div',null,'budget-bar'); bar.setAttribute('aria-label','Budget allocations');
    allocations.forEach(a=> { if (finite(a.amount) && Number(a.amount)>0) { const seg=el('span'); seg.style.flexGrow=String(Number(a.amount)); seg.title=`${a.name}: ${money(Number(a.amount))}`; bar.append(seg); } }); panel.append(bar);
    allocations.forEach(a => { const row=el('div',null,'allocation'); row.append(el('strong',a.name),el('span',finite(a.amount)?money(Number(a.amount)):plain(a.amount))); p(row,a.purpose); panel.append(row); });
    p(panel,b.note); labelled(panel,'Founder hours:',plan.hours); p(panel,plan.note); $('budget').replaceChildren(panel);
  }
  arr(plan?.stages).forEach(s=> { const li=el('li'); li.append(el('h3',s.title)); p(li,s.action); const gate=el('div',null,'gate'); labelled(gate,'Continue when:',s.continue_rule); labelled(gate,'Stop when:',s.stop_rule); li.append(gate); labelled(li,'Cost:',s.cost_note); $('stages').append(li); });
  const decisions=arr(data.decisions), searchRecords=[];
  [...new Set(decisions.map(d=>d.area).filter(Boolean))].sort().forEach(v=>{const o=el('option',v);o.value=v;$('decision-area').append(o);});
  [...new Set(decisions.map(d=>d.priority).filter(Boolean))].sort().forEach(v=>{const o=el('option',v);o.value=v;$('decision-priority').append(o);});
  decisions.forEach(d=> {
    const details=el('details',null,'decision'), summary=el('summary'), heading=el('div'), body=el('div',null,'decision-body');
    summary.append(el('span',d.id,'decision-id')); heading.append(el('h3',d.question || d.title || d.decision)); heading.append(el('span',`${d.area || ''} · ${d.priority || ''} · ${d.confidence || ''}`,'tags')); summary.append(heading); details.append(summary);
    labelled(body,'Decision:',d.decision); labelled(body,'Reason:',d.rationale); if (d.experiment) { body.append(el('h4','The bounded experiment')); const g=el('div',null,'record-grid'); Object.entries(d.experiment).forEach(([k,v])=> {const cell=el('div');cell.append(el('strong',k.replaceAll('_',' ')));p(cell,v);g.append(cell);}); body.append(g); }
    if(d.applications){body.append(el('h4','Application to each case'));const g=el('div',null,'record-grid');Object.entries(d.applications).forEach(([k,v])=>{const cell=el('div');cell.append(el('strong',k.replaceAll('_',' ')));p(cell,v);g.append(cell);});body.append(g);}
    labelled(body,'Dependencies:',arr(d.depends_on).join(', ') || 'None listed'); labelled(body,'Uncertainty:',d.uncertainty);
    if(d.review){const review=el('div',null,'review');review.append(el('h4','Critical review'));labelled(review,'Verdict:',d.review.verdict);p(review,d.review.reason);labelled(review,'Changes:',d.review.changes);body.append(review);}
    if(arr(d.evidence).length){body.append(el('h4','Supporting sources'));const list=el('ul');d.evidence.forEach(e=>{const li=el('li');li.append(link(e.label || e.url,e.url));list.append(li);});body.append(list);}
    details.append(body);$('decision-list').append(details);searchRecords.push({node:details,record:d,text:JSON.stringify(d).toLowerCase()});
  });
  function filter(){const query=$('decision-search').value.toLowerCase().trim(),area=$('decision-area').value,priority=$('decision-priority').value;let count=0;searchRecords.forEach(r=>{r.node.hidden=Boolean((query&&!r.text.includes(query))||(area&&r.record.area!==area)||(priority&&r.record.priority!==priority));if(!r.node.hidden)count++;});$('decision-status').textContent=`${count} of ${decisions.length} reviewed decisions${count===0 ? '. Try another search or clear a filter.' : ''}`;}
  ['decision-search','decision-area','decision-priority'].forEach(id=>$(id).addEventListener('input',filter));filter();
  arr(data.sources).forEach(s=>{const li=el('li');li.append(link(s.label || s.url,s.url));li.append(el('small',plain(s.type)));$('source-list').append(li);});
  $('model-note').textContent = data.meta?.models ? `Research and review workflow: ${plain(data.meta.models)}. Facts and conclusions require human verification before a live test.` : 'Research reviewed through source collection, application and critical review. No customer experiment was run.';
  const defaults=data.economics?.calculator_defaults;
  const portfolio=data.economics?.portfolio_sensitivity;
  if(portfolio && arr(portfolio.rows).length){
    const figure=el('figure',null,'portfolio-figure');figure.append(el('h3','Positive order margin still has to repay the experiment'));
    p(figure,'Static portfolio sensitivity · chosen scenario, not measured results','small-note');
    const table=el('table'),caption=el('caption','Total experiment result at different initial paid-order counts');table.append(caption);
    const head=el('thead'),hr=el('tr');['Initial paid orders','Cash profit / loss','Economic profit / loss'].forEach(t=>{const th=el('th',t);th.scope='col';hr.append(th);});head.append(hr);table.append(head);
    const body=el('tbody');arr(portfolio.rows).forEach(r=>{if(!finite(r.initial_paid_orders)||!finite(r.cash_profit_gbp)||!finite(r.economic_profit_gbp))return;const row=el('tr'),th=el('th',String(r.initial_paid_orders));th.scope='row';row.append(th);[['cash_profit_gbp'],['economic_profit_gbp']].forEach(([k])=>row.append(el('td',money(Number(r[k])),Number(r[k])<0?'loss':'gain')));body.append(row);});table.append(body);figure.append(table);
    const plot=el('div',null,'portfolio-bars');const plotRows=[];arr(portfolio.rows).forEach(r=>{if(!finite(r.initial_paid_orders)||!finite(r.cash_profit_gbp)||!finite(r.economic_profit_gbp))return;plotRows.push({label:`${r.initial_paid_orders} orders · cash`,value:Number(r.cash_profit_gbp)},{label:`${r.initial_paid_orders} orders · economic`,value:Number(r.economic_profit_gbp),highlight:true});});bars(plot,plotRows,true);figure.append(plot);
    const note=el('figcaption');p(note,'Assumptions: £75 total advertising; £148.22 sample, store and domain fixed costs; 20 setup hours valued at £300; expected 8% full refunds and 2% separate replacements, with variable time included in the order model. Acquisition spend is counted once. Unused reserves are excluded. Cash profit includes the experiment’s cash costs and excludes unpaid founder time. Economic profit also deducts variable order labour and £300 valued setup time. These totals are supplied scenario arithmetic, not results from a live store.');figure.append(note);
    document.querySelector('.cash-calculator').before(figure);
  }
  const targetNote=el('p','The inherited contribution target is £18 per initial paid order. £5 is a lower chosen sensitivity, not an equivalent success condition. A scenario that reaches £5 can still fail the £18 target. Both exclude fixed costs and tax.','target-note');
  $('order-advanced').before(targetNote);
  const fields=[
    ['price','Selling price (£)','order-controls',0,100000,0.01],['landed','Landed fulfilment (£)','order-controls',0,100000,0.01],['cac','Acquisition per order (£)','order-controls',0,100000,0.01],['refund_percent','Full refunds (%)','order-controls',0,100,0.1],
    ['fee_percent','Payment percentage (%)','order-advanced',0,100,0.1],['fee_fixed','Fixed payment fee (£)','order-advanced',0,10000,0.01],['replacement_percent','Separate replacements (%)','order-advanced',0,100,0.1],['labor','Variable labour per order (£)','order-advanced',0,100000,0.01],['profit_floor','Contribution target per order (£)','order-advanced',0,100000,0.01],
    ['products','Products actually funded','cash-controls',1,50,1],['sample_per_product','Sample per product (£)','cash-controls',0,100000,0.01],['traffic_per_product','Paid traffic per product (£)','cash-controls',0,100000,0.01],['test_budget','Available testing cash (£)','cash-controls',0,10000000,1],
    ['shared_costs','Shared setup & tools (£)','cash-advanced',0,1000000,0.01],['working_reserve','Working reserve held (£)','cash-advanced',0,1000000,0.01],['hours_per_product','Setup hours per product','cash-advanced',0,10000,0.25],['hourly_rate','Value of founder time (£/hour)','cash-advanced',0,100000,0.01]
  ];
  if (!defaults || !fields.every(([k])=>finite(defaults[k]))) { $('order-results').append(el('p','Reviewed calculator defaults are pending. Calculations are unavailable until every required assumption is supplied.')); $('reset-model').disabled=true; return; }
  fields.forEach(([key,label,target,min,max,step])=>{const l=el('label',label),i=el('input');i.type='number';i.id=`model-${key}`;i.min=String(min);i.max=String(max);i.step=String(step);i.value=String(defaults[key]);l.htmlFor=i.id;l.append(i);$(target).append(l);i.addEventListener('input',calculate);});
  function read(){const result={};let valid=true;fields.forEach(([key,, ,min,max])=>{const input=$(`model-${key}`),v=Number(input.value);const ok=input.value!==''&&Number.isFinite(v)&&v>=min&&v<=max&&(key!=='products'||Number.isInteger(v));input.setAttribute('aria-invalid',String(!ok));if(!ok)valid=false;result[key]=v;});return valid?result:null;}
  function stat(parent,label,value,negative=false,note){const item=el('div',null,negative?'negative':'');item.append(el('dt',label));const dd=el('dd',value);if(note)dd.append(el('small',note));item.append(dd);parent.append(item);}
  function bars(target,rows,zeroCentered=false){target.replaceChildren();const values=rows.map(r=>r.value),min=zeroCentered?Math.min(0,...values):0,max=Math.max(0,...values),range=max-min||1,zero=(0-min)/range*100;rows.forEach(r=>{const row=el('div',null,`chart-row${r.highlight?' highlight':''}`),track=el('div',null,'bar-track'),bar=el('div',null,`bar${r.value<0?' negative':''}`),start=Math.min(zero,(r.value-min)/range*100),width=Math.abs(r.value)/range*100;bar.style.left=`${start}%`;bar.style.width=`${width}%`;if(r.value===0)bar.hidden=true;track.append(bar);if(zeroCentered){const z=el('span',null,'zero');z.style.left=`${zero}%`;track.append(z);}row.append(el('span',r.label,'chart-label'),track,el('span',money(r.value),'chart-value'));target.append(row);});}
  function calculate(){const x=read();$('order-results').replaceChildren();$('cash-results').replaceChildren();if(!x){$('input-error').textContent='Enter valid non-negative values in all fields. Rates must be 0–100%; funded products must be a whole number from 1 to 50.';$('roas-chart').replaceChildren();$('cash-chart').replaceChildren();$('roas-caption').textContent='Scenario unavailable while an input is invalid.';$('cash-caption').textContent='Scenario unavailable while an input is invalid.';return;}$('input-error').textContent='';
    const before=x.price*(1-x.refund_percent/100)-x.landed*(1+x.replacement_percent/100)-(x.price*x.fee_percent/100+x.fee_fixed)-x.labor,after=before-x.cac,ceiling=before-x.profit_floor;
    stat($('order-results'),'Before acquisition & fixed costs',money(before),before<0);stat($('order-results'),'After chosen acquisition cost',money(after),after<0,'Fixed costs and tax still excluded');stat($('order-results'),'Break-even acquisition ROAS',before>0?`${(x.price/before).toFixed(2)}×`:'Unreachable',before<=0,before<=0?'No positive contribution available to fund acquisition':undefined);stat($('order-results'),'ROAS at chosen contribution target',ceiling>0?`${(x.price/ceiling).toFixed(2)}×`:'Unreachable',ceiling<=0,`Target ${money(x.profit_floor)} before fixed costs; CAC ceiling ${money(ceiling)}`);
    stat($('order-results'),'Inherited £18 target: required ROAS',before>18?`${(x.price/(before-18)).toFixed(2)}×`:'Unreachable',before<=18,`Acquisition ceiling ${money(before-18)} per initial paid order`);
    stat($('order-results'),'Lower £5 sensitivity: required ROAS',before>5?`${(x.price/(before-5)).toFixed(2)}×`:'Unreachable',before<=5,'Chosen sensitivity; does not satisfy the inherited £18 target');
    bars($('roas-chart'),[1,2,3.39,5,9].map(roas=>({label:`${roas}× ROAS`,value:before-x.price/roas,highlight:roas===3.39})),true);
    $('roas-caption').textContent=`Chosen ROAS points, not measured results. The 3.39× point is not observed performance for our store. Assumptions: ${money(x.price)} initial receipt; ${money(x.landed)} fulfilment; ${x.refund_percent}% refunds; ${x.replacement_percent}% additional replacements; ${x.fee_percent}% + ${money(x.fee_fixed)} payment fee; ${money(x.labor)} labour. Each point assumes CAC = initial receipt ÷ ROAS.`;
    const spend=x.shared_costs+x.products*(x.sample_per_product+x.traffic_per_product),cash=spend+x.working_reserve,time=x.products*x.hours_per_product*x.hourly_rate;
    stat($('cash-results'),'Cash required, including reserve',money(cash),cash>x.test_budget);stat($('cash-results'),'Operating spend, excluding reserve',money(spend));stat($('cash-results'),'Cash remaining against chosen budget',money(x.test_budget-cash),cash>x.test_budget);stat($('cash-results'),'Product setup time valued separately',money(time),false,`${(x.products*x.hours_per_product).toLocaleString('en-GB')} hours; not added to cash requirement`);
    const points=Array.from({length:10},(_,i)=>i+1);if(x.products>10)points.push(x.products);if(x.products!==50)points.push(50);
    bars($('cash-chart'),points.map(n=>({label:`${n} product${n===1?'':'s'}`,value:x.shared_costs+n*(x.sample_per_product+x.traffic_per_product)+x.working_reserve,highlight:n===x.products})));
    $('cash-caption').textContent=`Funded products, not free shortlist entries. Assumptions: ${money(x.sample_per_product)} sample and ${money(x.traffic_per_product)} paid traffic per product; ${money(x.shared_costs)} shared costs; ${money(x.working_reserve)} held reserve. Chosen cash ceiling ${money(x.test_budget)}. No sales receipts or forecast liabilities are assumed.`;
  }
  $('reset-model').addEventListener('click',()=>{fields.forEach(([key])=>$(`model-${key}`).value=String(defaults[key]));calculate();});calculate();
})();
