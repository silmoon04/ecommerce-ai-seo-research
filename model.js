(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.ResearchModel = factory();
}(typeof window !== 'undefined' ? window : this, function () {
  'use strict';
  const defaults = { payers:100,price:99,support:30,churn:5,cac:150,delivery:10,hourly:25,overhead:100,research:50,founder:3000,share:0 };
  function business(v) {
    const revenue = v.payers*v.price;
    const processing = revenue*.029;
    const revenueShare = revenue*v.share/100;
    const delivery = v.payers*v.delivery;
    const support = v.payers*v.support/60*v.hourly;
    const replacement = v.payers*v.churn/100*v.cac;
    const fixed = v.overhead+v.research+v.founder;
    const contribution = v.price*(1-.029-v.share/100)-v.delivery-v.support/60*v.hourly-v.churn/100*v.cac;
    const surplus = v.payers*contribution-fixed;
    const breakEven = contribution>0?Math.ceil(fixed/contribution):(contribution===0&&fixed===0?0:null);
    return { revenue,processing,revenueShare,delivery,support,replacement,fixed,contribution,surplus,breakEven,supportHours:v.payers*v.support/60,initialAcquisition:v.payers*v.cac };
  }
  function merchant(v) {
    const visits=v.sessions*v.aiShare/100;
    const baseline=visits*v.conversion/100;
    const extra=baseline*v.lift/100;
    const sales=extra*v.contribution;
    const labour=v.savedHours*v.hourly;
    return {visits,baseline,extra,sales,labour,value:sales+labour,net:sales+labour-v.fee,ordersNeeded:v.contribution>0?Math.ceil(v.fee/v.contribution):null,hoursNeeded:v.hourly>0?v.fee/v.hourly:null};
  }
  function free(conversion) {
    const total=100*.5+100*10/60*25;
    return {total,payers:conversion,costPerPayer:conversion>0?total/conversion:null,auditsFor100:conversion>0?Math.ceil(100/(conversion/100)):null};
  }
  return {defaults,business,merchant,free};
}));
