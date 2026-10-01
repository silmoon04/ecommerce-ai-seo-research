(function(){
 'use strict';
 const metric=window.CommerceMetrics;
 const store=document.body.dataset.store;
 const products=JSON.parse(document.querySelector('#catalogue-data').textContent);
 const bySku=new Map(products.map(p=>[p.slug,p]));
 const $=s=>document.querySelector(s);
 const money=v=>'£'+Number(v).toFixed(2);
 const dialog=$('.cart-dialog');
 let lastOrder=[];
 let timer;
 metric.setMode('simulation');
 const record=(name,payload={})=>metric.record(name,{store,...payload,simulated:true});
 function notify(text){$('.status').textContent=text;clearTimeout(timer);timer=setTimeout(()=>{$('.status').textContent=''},4500)}
 function cart(){return metric.getCart()}
 function sync(){document.querySelectorAll('.cart-count').forEach(e=>e.textContent=cart().reduce((n,x)=>n+x.quantity,0))}
 function resetCheckout(){$('.checkout-state').classList.add('hidden');$('.checkout-complete').classList.add('hidden');$('.cart-content').classList.remove('hidden')}
 function renderCart(){
  resetCheckout();sync();
  const items=cart();
  const container=$('.cart-content');container.replaceChildren();
  if(!items.length){const p=document.createElement('p');p.textContent='Your preview cart is empty. Add a product to try the local checkout.';container.append(p);return}
  let total=0;
  items.forEach(item=>{
   const product=bySku.get(item.sku);if(!product)return;total+=item.quantity*product.price_gbp;
   const row=document.createElement('div');row.className='cart-item';
   const info=document.createElement('div');const title=document.createElement('h3');title.textContent=product.brand;
   const price=document.createElement('p');price.textContent=money(product.price_gbp)+' each · proposed price';
   const qty=document.createElement('label');qty.className='qty';qty.append('Quantity ');const input=document.createElement('input');input.type='number';input.min='1';input.max='100';input.step='1';input.value=item.quantity;input.setAttribute('aria-label','Quantity for '+product.brand);qty.append(input);
   input.addEventListener('input',()=>{
    const value=Number(input.value);
    if(!input.value||!Number.isInteger(value)||value<1||value>100){input.setCustomValidity('Choose a whole quantity between 1 and 100.');return}
    input.setCustomValidity('');
    metric.setCart(cart().map(x=>x.sku===item.sku?{sku:x.sku,quantity:value}:x));
    subtotal.textContent=money(value*product.price_gbp);
    const displayedTotal=container.querySelector('.cart-total strong');
    if(displayedTotal)displayedTotal.textContent=money(cart().reduce((n,x)=>n+x.quantity*bySku.get(x.sku).price_gbp,0));
    sync();
   });
   input.addEventListener('change',()=>{if(!input.checkValidity()){input.value=cart().find(x=>x.sku===item.sku).quantity;input.setCustomValidity('');notify('Choose a whole quantity between 1 and 100.')}});
   const remove=document.createElement('button');remove.className='remove';remove.textContent='Remove';remove.setAttribute('aria-label','Remove '+product.brand);remove.addEventListener('click',()=>{metric.setCart(cart().filter(x=>x.sku!==item.sku));if(item.sku===store)record('remove_from_cart',{sku:store,product:store,quantity:item.quantity});renderCart()});
   info.append(title,price,qty,remove);const subtotal=document.createElement('strong');subtotal.textContent=money(item.quantity*product.price_gbp);row.append(info,subtotal);container.append(row);
  });
  const sum=document.createElement('div');sum.className='cart-total';const label=document.createElement('span');label.textContent='Simulated total';const value=document.createElement('strong');value.textContent=money(total);sum.append(label,value);container.append(sum);
  const note=document.createElement('p');note.style.fontSize='12px';note.textContent='No shipping, tax or production costs have been confirmed. This total is for the preview only.';container.append(note);
  const next=document.createElement('button');next.className='button';next.textContent='Review checkout simulation';next.addEventListener('click',()=>{
   const invalid=container.querySelector('input:invalid');if(invalid){invalid.reportValidity();return}
   const currentItems=cart();
   const currentTotal=currentItems.reduce((n,x)=>n+x.quantity*bySku.get(x.sku).price_gbp,0);
   record('begin_checkout',{page:'checkout',value:Number(currentTotal.toFixed(2)),currency:'GBP'});record('preview_checkout',{page:'checkout',value:Number(currentTotal.toFixed(2)),currency:'GBP'});
   container.classList.add('hidden');$('.checkout-state').classList.remove('hidden');$('.checkout-summary').textContent=currentItems.map(x=>x.quantity+' × '+bySku.get(x.sku).brand).join(', ')+'. Preview total '+money(currentTotal)+'.';
  });container.append(next);
 }
 $('.add-cart').addEventListener('click',()=>{const items=cart();const current=items.find(x=>x.sku===store);if(current&&current.quantity>=100){notify('The preview cart supports up to 100 of each product.');return}if(current)current.quantity++;else items.push({sku:store,quantity:1});metric.setCart(items);record('add_to_cart',{product:store,sku:store,quantity:1,value:bySku.get(store).price_gbp,currency:'GBP'});sync();notify(bySku.get(store).brand+' added to the preview cart.')});
 $('.cart-open').addEventListener('click',()=>{renderCart();record('view_cart',{page:'cart'});dialog.showModal()});
 $('.dialog-close').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()}});
 $('.return-cart').addEventListener('click',renderCart);
 $('.simulate-order').addEventListener('click',()=>{
  lastOrder=cart();lastOrder.forEach(x=>metric.record('purchase',{store:x.sku,product:x.sku,sku:x.sku,quantity:x.quantity,value:Number((bySku.get(x.sku).price_gbp*x.quantity).toFixed(2)),currency:'GBP',simulated:true}));
  metric.setCart([]);sync();$('.checkout-state').classList.add('hidden');$('.checkout-complete').classList.remove('hidden');$('.order-summary').textContent=lastOrder.map(x=>x.quantity+' × '+bySku.get(x.sku).brand).join(', ');$('.simulated-refund').disabled=false;
 });
 $('.simulated-refund').addEventListener('click',()=>{lastOrder.forEach(x=>metric.record('refund',{store:x.sku,product:x.sku,sku:x.sku,quantity:x.quantity,value:Number((bySku.get(x.sku).price_gbp*x.quantity).toFixed(2)),currency:'GBP',simulated:true}));$('.simulated-refund').disabled=true;$('.order-summary').textContent='Refund simulation complete. No money moved.'});
 function consent(allowed){metric.setConsent(allowed);$('.consent p').innerHTML=allowed?'<strong>Local preview measurements are on.</strong> Clicks remain in memory for this session. Nothing is sent to an analytics server. Withdraw to delete the log.':'<strong>Local preview measurements are off.</strong> No click events are recorded. The essential cart saves only product IDs and quantities on this device.';$('.accept').classList.toggle('hidden',allowed);$('.refuse').classList.toggle('hidden',allowed);$('.withdraw').classList.toggle('hidden',!allowed);if(allowed){record('page_view',{page:'product'});record('view_item',{product:store,page:'product',value:bySku.get(store).price_gbp,currency:'GBP'})}notify(allowed?'Local measurements allowed for this session.':'Local measurements are off. The event log has been cleared.')}
 $('.accept').addEventListener('click',()=>consent(true));$('.refuse').addEventListener('click',()=>consent(false));$('.withdraw').addEventListener('click',()=>consent(false));
 $('.tool-open')?.addEventListener('click',()=>record('tool_start',{tool:store,action:'open',page:'tool'}));
 document.querySelectorAll('a[href="#demo"]').forEach(a=>a.addEventListener('click',()=>record('select_content',{action:'open',page:'tool'})));
 $('.export-qa').addEventListener('click',()=>{const blob=new Blob([JSON.stringify(metric.exportQA(),null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=store+'-local-qa.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000)});
 function gallery(contents){$('.gallery-preview').classList.toggle('hidden',contents);$('.gallery-contents').classList.toggle('hidden',!contents);$('.show-preview').setAttribute('aria-pressed',String(!contents));$('.show-contents').setAttribute('aria-pressed',String(contents));record('select_content',{action:'select',page:'product'})}
 $('.show-preview').addEventListener('click',()=>gallery(false));$('.show-contents').addEventListener('click',()=>gallery(true));
 sync();
})();
