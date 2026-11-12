const assert=require('node:assert/strict'), m=require('./model.js');
let tests=0;function test(name,fn){fn();tests++;console.log('PASS '+name)}
const s={...m.defaults};
test('Independent baseline reconciliation: batch',()=>{const r=m.calc(s,'batch');assert.equal(r.revenue,45750);assert.equal(r.operating,-3410);assert.equal(r.cashChange,1510);assert.equal(r.upfront,39020);assert.equal(r.stockValue,4230);assert.equal(r.fees,990);assert.equal(r.reserve,1380)});
test('Independent baseline reconciliation: after order',()=>{const r=m.calc(s,'order');assert.equal(r.operating,-17120);assert.equal(r.cashChange,-7970);assert.equal(r.upfront,21500);assert.equal(r.inbound,9000)});
test('Price tiers apply at boundaries',()=>{assert.deepEqual([1,4,5,19,20].map(q=>m.unitPrice(q)),[1200,1200,1080,1080,846]);assert.equal(m.unitPrice(20,20),1015)});
test('Zero sales have no fees, delivery-to-customer or per-order costs',()=>{const a=m.calc(s,'batch',0),b=m.calc(s,'order',0);assert.equal(a.stockLeft,20);assert.equal(a.cashChange,-39020);assert.equal(b.inbound,0);assert.equal(b.printing,0);assert.equal(b.cashChange,-21500);assert.equal(b.fees,0);assert.equal(b.postage,0);assert.equal(b.operating,-26000)});
test('No sale without inventory; no phantom replenishment',()=>{const r=m.calc(s,'batch',30);assert.equal(r.sold,20);assert.equal(r.unfilled,10);assert.equal(r.stockValue,0);assert.equal(r.operating,4320)});
test('Packaging replenishment is paid in complete packs',()=>{assert.equal(m.calc(s,'order',25).packBought,25);assert.equal(m.calc(s,'order',26).packBought,50)});
test('Fees apply to shipping as well as goods',()=>{assert.equal(m.calc({...s,demand:1,shipping:10},'order').fees,77)});
test('Budget shortfall is not hidden',()=>{assert.equal(m.calc({...s,budget:100},'batch').headroom,-29020)});
test('Break-even is first achievable count',()=>{assert.equal(m.breakeven(s,'batch'),18);assert.equal(m.breakeven(s,'order'),44);assert(m.calc(s,'batch',17).operating<0);assert(m.calc(s,'order',43).operating<0);assert.equal(m.breakeven({...s,batch:5},'batch'),null)});
test('Loss-making unit economics never invent a break-even',()=>{assert.equal(m.breakeven({...s,price:0,shipping:0},'order'),null)});
test('Input rejects negative, nonfinite and fractional quantities',()=>{for(const patch of [{price:-1},{price:NaN},{demand:1.2},{batch:0},{reserve:101}])assert.notEqual(m.validate({...s,...patch}),'')});
test('Cash / inventory / time identity holds over scenarios and tiers',()=>{for(const batch of [1,5,19,20,50])for(const n of [0,1,5,20,26,50,100])for(const mode of ['batch','order']){const r=m.calc({...s,batch,uplift:20},mode,n);assert.equal(r.operating,r.cashChange+r.stockValue+r.packsValue-r.labour);assert.equal(r.sold+r.unfilled,n);for(const v of Object.values(r))if(typeof v==='number')assert(Number.isInteger(v));}});
console.log(tests+' checks passed');
