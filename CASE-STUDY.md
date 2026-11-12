# Edition: making a small retail launch decision inspectable

## The problem
A low unit price can hide the cost of unsold stock. A small art seller needs to compare committing to a batch with buying each print after an order, while accounting for fulfilment costs and their own time.

## Scope
An independent, AI-assisted prototype. One unframed A4 animal print, UK direct sales, one print per order, two purchasing strategies. No real business, customer interviews or sales are claimed.

## Evidence and assumptions
Public Menor giclée prices, Royal Mail postage and Stripe processing fees anchor the calculations. Each source is linked and dated. Selling price, demand, inbound delivery, advertising, packaging, owner time and a contingency reserve remain visible assumptions. The model is designed for a seller who does not reclaim input VAT, with no output VAT in the scenario. It is not a tax calculation.

## Product decisions
- One SKU keeps the comparison interpretable; multiple suppliers with unlike paper/print specifications would introduce a false comparison.
- Separate cash change from contribution. Stock not sold is cash tied up, not automatically a total loss or a realised return.
- Cap batch sales at actual stock. Do not silently assume replenishment.
- Show zero-demand and cost-increase cases alongside the base scenario.
- Make a recommendation conditional on assumptions and direct the next action toward validation.
- Include a launch checklist with dependencies, a campaign hypothesis and evidence notes. Completing a checklist does not establish real commercial readiness.
- Use browser-only HTML, CSS and JavaScript: no paid APIs or backend accounts; source files remain portable.

## What the demo illustrates
At the default assumed £28 price plus £2.50 shipping and 15 orders, batch contribution is -£34.10 after the £200 launch costs, £6 inbound delivery, £97.50 imputed owner time and other modelled costs. Cash change after reserve is +£15.10 because £48.30 remains in print/packaging inventory and owner time is not a cash payment. The after-order scenario contributes -£171.20. These are calculated scenario outputs, not actual results.

The useful conclusion is not “launch this product”. It is “validate demand and fulfilment assumptions before committing”.

## Validation and next iteration
12 automated model checks passed. Browser checks covered scenario selection, edited assumptions, budget warnings, checklist dependency protection, persistence and CSV export. Desktop and narrow-screen layouts were inspected. No external user testing has been conducted.

Next: obtain a comparable all-in supplier quote, verify the packed item's weight/size, observe a prospective user completing the comparison, then revise based on evidence. A documented comparison of suppliers is only useful after confirming matching paper, size, VAT and delivery terms.

## CV wording — use only after reviewing the project yourself
Built an AI-assisted retail launch planner comparing batch and after-order fulfilment using published UK costs, with scenario analysis, cash and inventory tracking, and a launch checklist.
