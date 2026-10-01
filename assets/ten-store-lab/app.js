'use strict';
(() => {
  const data = window.TEN_STORE_DATA;
  if (!data) return;
  const $ = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const gbp = value => new Intl.NumberFormat('en-GB', {style:'currency',currency:'GBP'}).format(value);
  const list = values => `<ul>${values.map(v=>`<li>${esc(v)}</li>`).join('')}</ul>`;
  const compPrice = c => typeof c.price === 'number' ? (c.currency === 'GBP' ? gbp(c.price) : c.currency === 'USD' ? 'US$'+c.price.toFixed(2) : c.currency+' '+c.price) : /^\d/.test(c.price) ? c.currency+' '+c.price : c.price;
  const imageNote = p => p.category === 'Physical print' ? 'Artwork preview. No physical sample.' : p.slug === 'fold-street' ? 'Dimensioned original plans. No assembled sample.' : p.slug === 'museum-key' ? 'Actual printable pack excerpt. Fictional museum.' : 'Actual local prototype. Fictional example.';
  $('offer-grid').innerHTML = data.products.map(p => `<article class="offer" data-slug="${p.slug}"><a class="offer-visual" href="${p.preview}" aria-label="Open ${esc(p.brand)} storefront sample"><img src="${p.image}" width="800" height="570" alt="${esc(p.brand)} actual prototype output" loading="lazy"></a><p class="offer-image-note">${imageNote(p)}</p><div class="offer-top"><h3>${esc(p.brand)}</h3><span class="offer-price">${gbp(p.price_gbp)}</span></div><p class="offer-format">${esc(p.category)} · Proposed ${p.category === 'Physical print' ? 'delivered UK price' : 'one-off price'}</p><p class="offer-brief">${esc(p.reason)}</p><span class="readiness">${esc(p.readiness)}</span><p class="offer-next"><strong>Next check.</strong> ${esc(p.next_test)}</p><div class="offer-actions"><a href="${p.preview}">Open storefront sample</a></div><details><summary>Scope, competitors and quality evidence</summary>${p.review_gate?`<h4>Final review gate</h4><p>${esc(p.review_gate)}</p>`:''}<h4>The current product</h4><p>${esc(p.description)}</p><h4>What is included</h4>${list(p.includes)}<h4>Important limits</h4>${list(p.limitations)}<h4>Specific alternatives</h4>${p.comparisons.map(c=>`<div class="comparison"><h4>${esc(c.name)}</h4><p class="comp-price">${esc(compPrice(c))} · ${esc(c.kind)}</p><p>${esc(c.features)}</p><p>${esc(c.caveats)}</p><a href="${esc(c.url)}" target="_blank" rel="noopener">View primary listing</a></div>`).join('')}${p.review_sources.length?`<h4>Additional primary-source checks</h4>${p.review_sources.map(r=>`<div class="comparison"><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.title)}</a><p>${esc(r.finding)}</p></div>`).join('')}`:''}<h4>Recorded quality gates</h4>${list(p.quality_gates)}<p class="small-note">A recorded code or geometry pass covers that stated check only. Practitioner, human, supplier and physical checks remain separate. A prepared test file is not an executed browser test.</p><h4>Where to investigate reach</h4>${list(p.reach_channels)}<p class="small-note">Discovery hypotheses only. No audience access, outreach or purchase demand is established.</p></details></article>`).join('');
  function filter() {
    const query=$('search').value.toLowerCase().trim(),category=$('category').value,state=$('readiness').value;
    let count=0;
    for(const p of data.products) {
      const text=[p.brand,p.title,p.audience,p.description,p.reason,...p.includes].join(' ').toLowerCase();
      const stateMatch=!state||(state==='first'&&['market-day'].includes(p.slug))||(state==='physical'&&['fold-street','route-story','companion-print'].includes(p.slug))||(state==='human'&&['market-day','quiz-host','touchline','swatch-repeat','museum-key','four-bed','recipe-archive'].includes(p.slug));
      const visible=(!query||text.includes(query))&&(!category||category===p.category)&&stateMatch;
      document.querySelector(`[data-slug="${p.slug}"]`).hidden=!visible;
      if(visible) count++;
    }
    $('filter-status').textContent=`Showing ${count} of 10 offers. All prices are unvalidated test propositions.`;
    $('empty').hidden=count!==0;
  }
  ['search','category','readiness'].forEach(id=>$(id).addEventListener('input',filter));filter();
  $('budget-bar').innerHTML=data.budget.map(b=>`<span style="flex:${b.amount}"></span>`).join('');
  $('allocations').innerHTML=data.budget.map(b=>`<div class="allocation"><h3>${esc(b.name)}</h3><strong>${gbp(b.amount)}</strong><p>${esc(b.purpose)}</p></div>`).join('');
  $('source-list').innerHTML=data.products.map(p=>{const refs=new Map();for(const c of p.comparisons)refs.set(c.url,{title:c.name,url:c.url,note:c.caveats});for(const s of p.sources)refs.set(s.url,s);for(const s of p.review_sources)refs.set(s.url,{...s,note:s.finding});return `<div class="source-product"><h3>${esc(p.brand)}</h3><ul>${[...refs.values()].map(s=>`<li><a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a><small>${esc(s.note||'Primary offer reference; checked 1 October 2026.')}</small></li>`).join('')}</ul></div>`}).join('');
  $('native-accounts-status').textContent=`${data.native.account_count} of 10 actual Shopify accounts have verified Agentic plans, UK region, GBP currency, £0 billing checks and no payment method.`;
  $('native-products-status').textContent=`${data.native.native_product_count} of 10 native products are saved as drafts with matching proposed GBP prices. Orders remain closed.`;
  const nativeBrands=data.native.theme_slugs.map(slug=>data.products.find(p=>p.slug===slug)?.brand||slug);
  const nativeTime=data.native.recorded_at?new Date(data.native.recorded_at).toLocaleString('en-GB',{timeZone:'Europe/London',hour:'2-digit',minute:'2-digit',day:'numeric',month:'short'}):'time not recorded';
  $('native-status').textContent=`${data.native.theme_count} of 10 unpublished themes have recorded uploads: ${nativeBrands.join(', ')||'none recorded'}. ${data.native.latest_theme_count} are confirmed against the latest theme source. Snapshot ${nativeTime} BST. Account creation, native products and checkout are separate checks.`;
  const mirrorLabels={native_checkout_reached:'Checkout screen with test gateway',factory_theme_upload:'Factory theme upload',positive_checkout:'Successful payment test',declined_payment:'Declined-payment test',refund:'Test refund',digital_delivery:'Digital delivery test'};
  const mirror=data.native.mirror;
  $('native-mirror-status').innerHTML='<h3>Development-store checkout rehearsal</h3><p>This uses a free, nontransferable development store. It accepts no real payment and does not verify the production merchant checkout.</p><ul>'+Object.entries(mirrorLabels).map(([key,label])=>'<li>'+esc(label)+': '+(['passed','pass'].includes(mirror.checks[key])?'passed in the test environment':mirror.checks[key]==='failed'?'failed in the test environment':'not verified')+'</li>').join('')+'</ul><p class="small-note">Only the recorded test checks are shown. A simulated order or refund is not commercial evidence.</p>';
  const quality=data.review.quality_status;
  $('review-quality').innerHTML='<h3>Independent final review</h3><p>No product is ready for a paid launch. Four Bed is dropped from this paid shortlist; Touchline and Swatch Repeat are parked while their useful paid value remains unproven.</p>'+['implementation_a','implementation_b'].filter(k=>quality[k]).map(k=>'<p class="small-note">'+esc(quality[k])+'</p>').join('')+'<p class="small-note">Implementation passes cover bounded behaviour. All applicable human and physical gates remain pending.</p>';
  $('calc-product').innerHTML=data.products.map(p=>`<option value="${p.slug}">${esc(p.brand)} · ${gbp(p.price_gbp)}</option>`).join('');
  const fields=['tax','fulfilment','fees','refund','minutes','hourly','cac','fixed'];
  function calculate() {
    const product=data.products.find(p=>p.slug===$('calc-product').value);
    $('calc-price').textContent=`${gbp(product.price_gbp)} proposed price. ${product.category==='Physical print'?'Supplier and shipping quote pending.':product.slug==='recipe-archive'?'Five-recipe service labour has not been timed.':'Packaging, support and delivery costs still need validation.'}`;
    const values=Object.fromEntries(fields.map(id=>[id,$(id).value.trim()===''?null:Number($(id).value)]));
    if(Object.values(values).some(v=>v===null||!Number.isFinite(v)||v<0)) {$('calc-status').textContent='Complete every field with a finite, non-negative amount. No cost is silently assumed to be zero.';$('calc-results').innerHTML='';return;}
    if(values.tax>product.price_gbp){$('calc-status').textContent='Included tax cannot exceed the proposed price. Check the order and tax inputs.';$('calc-results').innerHTML='';return;}
    const cash=product.price_gbp-values.tax-values.fulfilment-values.fees-values.refund-values.cac;
    const labour=values.minutes*values.hourly/60,after=cash-labour,orders=after>0?Math.ceil(values.fixed/after):null;
    if(![cash,labour,after].every(Number.isFinite)||(orders!==null&&!Number.isFinite(orders))){$('calc-status').textContent='These amounts exceed the calculator\'s numeric range. Enter practical order costs.';$('calc-results').innerHTML='';return;}
    const result=(label,value,note,negative=false)=>`<div class="${negative?'negative':''}"><dt>${label}</dt><dd>${value}<small>${note}</small></dd></div>`;
    $('calc-results').innerHTML=result('Cash contribution',gbp(cash),'Per initial paid order, using entered costs.',cash<0)+result('Value of owner time',gbp(labour),'Time valuation; not a cash payment.')+result('After owner time',gbp(after),'Before unentered costs and business profit tax.',after<0)+result('Orders to recover fixed costs',orders===null?'No recovery':String(orders),orders===null?'Contribution after time is zero or negative.':`At this chosen unit result, recover ${gbp(values.fixed)}.`,orders===null);
    $('calc-status').textContent='Your chosen scenario. Inputs have not been verified by this page. No actual sales or future demand is implied.';
  }
  $('profit-form').addEventListener('submit',event=>event.preventDefault());
  $('profit-form').addEventListener('input',calculate);
  $('calc-product').addEventListener('change',()=>{fields.forEach(id=>$(id).value='');calculate();});
  $('reset-costs').addEventListener('click',()=>{fields.forEach(id=>$(id).value='');calculate();});calculate();
})();
