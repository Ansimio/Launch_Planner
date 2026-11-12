/* Currency inputs are GBP; all financial calculations below use integer pennies. */
(function(root){
const defaults={budget:1000,price:28,shipping:2.50,demand:15,batch:20,inbound:6,pack:0.60,packDelivery:0,postage:1.90,feeRate:1.5,feeFixed:0.20,reserve:3,setup:80,ads:120,minutes:10,hourly:15,setupHours:4,uplift:0,leadDays:5};
const bounds={budget:[0,100000],price:[0,1000],shipping:[0,100],demand:[0,500],batch:[1,500],inbound:[0,100],pack:[0,50],packDelivery:[0,100],postage:[0,100],feeRate:[0,100],feeFixed:[0,100],reserve:[0,100],setup:[0,10000],ads:[0,10000],minutes:[0,600],hourly:[0,500],setupHours:[0,500],uplift:[0,200],leadDays:[0,90]};
const ints=['demand','batch','leadDays'];
const p=x=>Math.round((x+Number.EPSILON)*100);
function validate(s){for(const [k,[lo,hi]] of Object.entries(bounds)){if(typeof s[k]!=='number'||!Number.isFinite(s[k])||s[k]<lo||s[k]>hi||(ints.includes(k)&&!Number.isInteger(s[k])))return 'Check '+k+': enter '+(ints.includes(k)?'a whole number':'a number')+' between '+lo+' and '+hi+'.';}return '';}
function unitPrice(q,u=0){return Math.round((q>=20?846:q>=5?1080:1200)*(1+u/100));}
function calc(s,mode,demand=s.demand){
 if(validate(s))throw Error(validate(s));
 const sold=mode==='batch'?Math.min(demand,s.batch):demand;
 const bought=mode==='batch'?s.batch:sold;
 const unit=unitPrice(mode==='batch'?s.batch:1,s.uplift);
 const packBought=Math.ceil(Math.max(mode==='batch'?s.batch:sold,1)/25)*25;
 const packCost=packBought*p(s.pack), printing=bought*unit;
 const inbound=(mode==='batch'?1:sold)*p(s.inbound);
 const fixed=p(s.setup)+p(s.ads), grossEach=p(s.price)+p(s.shipping);
 const revenue=sold*grossEach;
 const fees=sold*(Math.round(grossEach*s.feeRate/100)+p(s.feeFixed));
 const reserve=sold*Math.round(grossEach*s.reserve/100);
 const postage=sold*p(s.postage);
 const cashCosts=fixed+printing+inbound+packCost+p(s.packDelivery)+fees+postage;
 const cashChange=revenue-cashCosts-reserve;
 const stockLeft=bought-sold, stockValue=stockLeft*unit;
 const packsLeft=packBought-sold, packsValue=packsLeft*p(s.pack);
 const labour=p(s.setupHours*s.hourly)+sold*p(s.minutes*s.hourly/60);
 const operating=cashChange+stockValue+packsValue-labour;
 const upfront=fixed+p(s.packDelivery)+(mode==='batch'?printing+p(s.inbound):0)+(mode==='batch'?packCost:25*p(s.pack));
 const perOrder=grossEach-unit-p(s.pack)-p(s.postage)-(Math.round(grossEach*s.feeRate/100)+p(s.feeFixed))-Math.round(grossEach*s.reserve/100)-p(s.minutes*s.hourly/60)-(mode==='batch'?0:p(s.inbound));
 return {mode,demand,sold,bought,unit,packBought,printing,inbound,packCost,fixed,revenue,fees,reserve,postage,cashCosts,cashChange,stockLeft,stockValue,packsLeft,packsValue,labour,operating,upfront,headroom:p(s.budget)-upfront,unfilled:demand-sold,perOrder};
}
function breakeven(s,mode,metric='operating'){const limit=mode==='batch'?s.batch:500;for(let n=0;n<=limit;n++){if(calc(s,mode,n)[metric]>=0)return n;}return null;}
const api={defaults,bounds,ints,p,validate,unitPrice,calc,breakeven};if(typeof module!=='undefined')module.exports=api;root.LaunchModel=api;
})(typeof window!=='undefined'?window:globalThis);
