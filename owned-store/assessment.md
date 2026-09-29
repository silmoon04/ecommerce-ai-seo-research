# A real store. A useful experiment?

Research checked 29 September 2026. Four GPT-6 Astra agents, each using max reasoning, examined products, costs, experimental design and instrumentation. No store or live experiment has been launched. Prices below are published observations; budgets, sample sizes and commercial examples are explicitly labelled assumptions or calculations.

**Yes. I would use an owned store to develop this product, with a spending cap and a narrow catalogue.** It gives us somewhere to verify product facts, deploy changes, inspect real orders and discover which work is worth automating. That is a much stronger starting point than building another visibility dashboard around synthetic prompts.

The biggest risk is spending months running a small retail business whose traffic never becomes large enough to test the software. We should judge the shop's retail economics, the experiments and demand for the eventual software separately. A useful experiment can lose money. A profitable shop can succeed for reasons that do not transfer to another merchant.

## What the shop would let us learn

We could trace a proposed correction from its evidence to its publication, its appearance in a live shopping surface and the resulting customer experience. We could also discover ordinary failures that a prompt-only test misses: a wrong variant link, incompatible dimensions, unavailable stock, an unexpected shipping charge or a refund that removes the apparent profit.

An owned store removes the need to persuade a merchant to install our first prototype. It does not remove the need for customers. Fifty listings on a new domain can still receive almost no relevant traffic. Professional presentation, sound SEO and useful products establish a fair starting point; they do not guarantee discovery.

I would set three questions at the start:

1. Can this catalogue produce retained contribution after fulfilment, returns and acquisition?
2. Can our proposed corrections improve a defined outcome compared with a competent manual review?
3. Will another merchant pay for those corrections or for keeping them correct over time?

The third question should enter the project early. Otherwise we may build excellent software for our own unusual shop.

## A niche built around questions customers need answered

My first research candidate is **compact storage and workstations for miniature painters**: bottle racks, brush holders, portable trays and inserts for small desks. My second is **packing organisers tested inside a few named travel bags**. Both offer concrete facts we could measure ourselves.

These are hypotheses about useful buying questions. We have not established that their customers prefer AI to Google, that demand is underserved, or that either range has a profitable supplier agreement. A product being easy to discuss with an assistant is a reason to investigate it, not evidence of an AI sales channel.

| Candidate | A useful buying question | Facts we could own | Main constraint |
| --- | --- | --- | --- |
| Miniature-painting storage | Which rack fits my mixed bottles on a shallow desk and packs away afterwards? | Measured bottle fit, clearance, assembled footprint, capacity and pack-away photos | Supplier margin, delivery and design rights need checking |
| Bag-specific packing organisers | Which combination fits this backpack with a laptop and shoes? | Loaded fit tests, usable dimensions, weight and a photographed packing plan | Bag revisions and actual packed shape matter |
| Craft desk accessories | Which holder fits my pegboard and these tools? | Compatibility and usable clearances | Generic products already have cheap alternatives |
| Travel leggings with useful pockets | Will this pocket hold my phone in its case, and what is the inseam? | Pocket tests, measurements, wash results and clear size advice | More sample work and subjective fit; printing changes the artwork, not the garment's cut |

There is an existing supply market for hobby storage. HobbyZone lists racks with 26 mm and 36 mm openings at 49 PLN retail, while TTCombat documents a rack for 25 dropper bottles up to 17 ml. These establish product types and competing offers, not our wholesale cost. Volume alone does not establish that every bottle fits. [HobbyZone catalogue](https://www.hobbyzone.pl/en/prd_list/prd_list.html), [TTCombat rack](https://ttcombat.com/products/ttcombat-paint-rack-25-copy).

Yorkshire 3D advertises UK production, white-label fulfilment and dropshipping with a one-unit minimum. It is a possible route for original or commercially licensed designs, subject to a quote and sample test. We have not verified service quality or a viable unit margin. A wholesaler may prove simpler than developing custom parts. [Yorkshire 3D services](https://www.yorkshire3d.co.uk/solutions).

For travel organisers, CabinZero's medium cube is publicly listed at £12, with dimensions of 25 × 17.5 × 8 cm. That gives us a real competitor to beat on suitability or service. It does not show that generic cubes can sustain a premium. [CabinZero product](https://www.cabinzero.com/collections/top-sellers/products/classic-packing-cube-medium?variant=56989696786819).

I would sample three to five representative items first. If fulfilment and economics hold up, build towards roughly eight to twelve genuinely different product families and 30 to 50 useful variants. Avoid manufacturing differences purely to enlarge the experiment. Fifty colour or size variants give us more QA cases, but they share demand and are not fifty independent experimental units.

Dropshipping is acceptable if samples, stock information and delivery promises are dependable. The valuable content would be our measurements and honest fit advice. A polished page wrapped around unreliable fulfilment would make the research harder and the customer experience worse.

## The harness is useful if we respect what it measures

We do not need to reconstruct the exact private ChatGPT or Claude orchestration to build a useful test system. We need a reproducible approximation, plus a way to check whether its predictions transfer to live engines and customers.

OpenAI function calling and Claude client tools let our application return tool results. In that runner, we can record a candidate set, hold competitors fixed and replace only our own product's representation. Hosted search tools are different: their retrieval is not our function handler. Claude's server search also returns encrypted content blocks that its documentation says must remain unchanged when passed back. [OpenAI function calling](https://developers.openai.com/api/docs/guides/function-calling), [Claude tool overview](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview), [Claude web search](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool).

| Layer | What we change | What a positive result would mean |
| --- | --- | --- |
| Controlled replay | Our product facts or presentation in frozen tool fixtures | The tested model makes better decisions when given those candidates |
| Live discovery | Published catalogue or page information | A named live engine discovers or presents the updated information in observed cases |
| Customer experiment | A page experience assigned after arrival | The tested visitors buy or retain more value under that experience, within the design's uncertainty |

For a copy test, freeze candidate order, competitor offers, prices, stock, model settings and tool responses. If our product is inserted into every fixture, the result is conditional on inclusion. It says nothing about whether a live engine would find it in the first place. Keep unseeded discovery checks separate.

Use unseen intent families for confirmation. Rephrasing the same question twenty times does not create twenty independent markets. Record rejected edits and failures as well as winners. An unsupported tool call should invalidate or explicitly limit a replay, rather than silently fetch a new live result.

The score should reward suitability. If a verified clamp fits 20 to 45 mm desks, a request for an 18 mm desktop should reject it. A description that makes the model recommend an unsuitable product more often has failed, even if its raw selection rate rises.

OpenAI says shopping results draw on structured merchant and third-party data alongside other content, and displayed descriptions may be rewritten. Our description is one input among several. The useful target is accurate, decision-relevant information that survives those transformations. [Shopping with ChatGPT Search](https://help.openai.com/en/articles/11128490-shopping-with-chatgpt-search).

## Start with a good store, then change one mechanism

Use a straightforward theme, fast pages, real product photographs, clear fit information, visible shipping and returns, consistent product data, correct variant links and basic search tooling. Google continues to recommend established SEO practices for its AI search features. Crawling and inclusion remain uncertain; recrawl requests can take days to weeks. [Google AI guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [Recrawl timing](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).

The first experiment could be simple: the same verified compatibility facts in the usual specification section versus a concise fit summary beside the buying decision. Keep price, promotion, acquisition campaign and product availability stable. Randomly assign eligible arriving visitors, preserve their assignment and count everyone assigned, including people who buy nothing.

Paid traffic can accelerate that onsite test. It does not establish growth in organic AI discovery. Randomise the page after arrival from the same campaign, rather than compare two campaigns with different auction delivery.

Public catalogue edits need a different design. An external engine may see one indexed version for many visitors. Group variants and close substitutes into product families, retain untreated families where possible, and inspect the whole category for sales merely moving between our own products. With few independent families and little traffic, call the result directional. A visitor A/B test cannot by itself isolate the acquisition effect of a shared search listing.

The low-price Shopify plan also matters: Shopify's documented Rollouts experiments require Grow or higher. A Basic-budget pilot would need a separately implemented and validated assignment method, or a revised budget. We should not quietly assume native Rollouts experiments are included at £25. [Shopify rollout types](https://help.shopify.com/en/manual/markets/rollouts/rollout-types).

## Traffic sets the limit on the claims

We can learn quickly whether a feed is wrong, a product link fails or a fit explanation reduces model errors. Establishing a modest purchase lift is much more demanding.

The following calculations assume a hypothetical 2.5% purchase baseline, independent equal-sized arms, one comparison, 80% power and a two-sided 5% significance level. These are normal-approximation planning calculations, not forecasts of our conversion rate or expected improvement.

| Hypothetical change | Relative increase | Approximate visitors needed, both arms |
| --- | ---: | ---: |
| 2.5% → 5.0% | 100% | 1,812 |
| 2.5% → 3.0% | 20% | 33,584 |
| 2.5% → 2.75% | 10% | 128,398 |

Clustering, multiple variants and profit measurement require different calculations. Repeatedly checking an ordinary significance test and stopping when it looks positive also changes its error rate. Predefine the horizon or use a suitable sequential method. The [experimental-design note](https://silmoon04.github.io/ecommerce-ai-seo-research/owned-store/experiment.md) records the formula, assumptions and stopping considerations.

We should still act on small-sample learning: customer questions, confusing sizing, failed checkouts and obvious incompatibilities. We should describe those findings accurately. Twenty orders can expose a costly problem; they usually cannot substantiate a small percentage uplift.

## Track a small number of events well

Build one reconciled record from experiment assignment through product exposure, cart, checkout, paid order, refund and settled cost. Preserve the content version and offer seen. Use server order records to anchor purchases, since browser completion events can be missing. A refund object alone does not confirm money has moved. [Shopify checkout events](https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_completed), [Shopify refunds](https://shopify.dev/docs/api/admin-graphql/latest/objects/Refund).

Track contribution after fulfilment, payment charges and returns, alongside purchase rate. Separate staff activity, simulated shoppers and test orders from customer results. Retain observed AI referrers or channel labels as evidence; keep missing or direct sources unknown. We cannot observe a customer's private upstream prompt simply because they arrive from an assistant.

Extensive session recording is unnecessary for the first useful experiment. UK ICO guidance now permits some qualifying aggregate referrer analysis and A/B testing under its statistical-purpose exception, with notice and a free objection mechanism. Durable individual journeys, advertising uses and recordings need separate consideration. Design the consent and retention rules around the actual purposes. [ICO storage and access guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/).

The [instrumentation note](https://silmoon04.github.io/ecommerce-ai-seo-research/owned-store/instrumentation.md) specifies the ten proposed events, joins, exclusions and platform reporting limits. Ownership of the shop also does not erase platform restrictions on future cross-merchant data reuse. Keep each merchant's information isolated while establishing what research and reuse rights actually apply. [Shopify API terms](https://www.shopify.com/legal/api-terms).

## Choose the selling geography before the channel

Shopify's dedicated ChatGPT channel currently requires selling to US customers, even if the business is based elsewhere. Eligible products can be active by default, and customers complete checkout on the merchant's site. Other discovery routes, including web crawling, can still surface products outside that channel. [Shopify ChatGPT eligibility](https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts/chatgpt).

This changes the pilot. A UK-only store can study general AI referrals, product understanding and onsite conversion. If native ChatGPT shopping is central to the thesis, choose a genuine US fulfilment and returns route and rebuild the costs for that market. Enabling a destination in settings does not establish workable delivery, taxes or customer service.

## What it could cost, and where profit disappears

For a UK cost reference, Shopify Basic is £25 per monthly billing cycle, or £228 upfront annually at the advertised £19/month equivalent, before applicable taxes. It includes unlimited products. Standard online Shopify Payments cards cost 2% + 25p; Amex and international cards have a higher rate. Printify and Printful each offer a zero-subscription route, with products and fulfilment charged separately. [Shopify UK pricing](https://www.shopify.com/uk/pricing), [Printify pricing](https://printify.com/pricing/), [Printful pricing](https://www.printful.com/pricing).

The cost agent proposed this **chosen 90-day cap for a lean domestic print-on-demand route**. It is not a supplier quote, the user's agreed budget, or a funded plan for 50 custom hobby products.

| Allocation | GBP | Basis |
| --- | ---: | --- |
| Three Shopify cycles | £90 | Published £75 subscription total plus provisional £15 tax buffer |
| Domain | £20 | Allowance awaiting a quote |
| Representative samples | £90 | Spending cap; range must fit what can be checked |
| Optional paid traffic | £150 | Release after checkout and tracking work |
| Metered tools/API usage | £50 | Cap, not forecast usage |
| Contingency | £100 | Headroom, not a spending target |
| Experiment allocation | **£500** | Excludes founder labour |
| Separate fulfilment/refund float | **£250** | Cash held, not an expense by itself |

The initial envelope is £750. The hobby-storage recommendation still needs landed quotes, minimum quantities and samples; original designs may add development costs. A US-selling plan needs a separate budget. We should choose the product after those numbers are known.

Here is an illustrative order on a consistent non-VAT-registered basis: £30 collected, £18 total supplier product/delivery/tax cost, £0.85 standard-card fee and a provisional £1.50 allowance for returns or replacements. That leaves **£9.65 before acquisition and fixed costs**. Only the payment-fee rate is a published observation; the other amounts are scenario inputs.

| Assumed acquisition cost per order | Remaining contribution |
| --- | ---: |
| £0 | £9.65 |
| £6 | £3.65 |
| £10 | -£0.35 |

This is why a plausible conversion improvement can still produce a losing shop. Reconcile actual advertising once, without also deducting it a second time through allocated acquisition costs. Add founder hours when judging whether the business is worth continuing. The [cost note](https://silmoon04.github.io/ecommerce-ai-seo-research/owned-store/costs.md) covers billing, tax assumptions, refunds and working cash in detail.

Dropshipping also requires cash before all customer payouts arrive: Printify bills the merchant separately when an order enters production. Supplier policies do not replace the retailer's obligations to customers. [Printify payments](https://help.printify.com/hc/en-us/articles/4483601124113-How-does-the-payment-process-work), [UK returns guidance](https://www.gov.uk/accepting-returns-and-giving-refunds).

## A twelve-week learning plan with gates

The dates below allocate effort. They do not promise search inclusion or statistically conclusive results on schedule.

| Period | Work | Evidence needed before expanding |
| --- | --- | --- |
| Weeks 1 to 2 | Choose market and niche; get landed quotes; sample items; establish verified facts; configure checkout and order reconciliation | Deliverable products, tolerable unit economics and a trustworthy test order |
| Weeks 3 to 4 | Launch a small range; establish conventional SEO; record baseline traffic; build frozen fixtures and an untouched intent set | Working instrumentation and an honest view of available traffic |
| Weeks 5 to 6 | Confirm one replay finalist; verify live propagation; run one suitable customer comparison | Clear separation of model outcomes, live discovery and customer results |
| Weeks 7 to 8 | Investigate failures; mature returns; compare contribution and time spent; choose the next mechanism | A documented useful finding, or a specific reason the test remains unresolved |
| Weeks 9 to 12 | Try the useful mechanism with two or three outside merchants and ask for a paid pilot | Evidence that the problem recurs and someone will pay to have it solved |

Two or three outside merchants are a proposed learning target, not sufficient statistical validation across a market. Keep their data separate and their published changes under their control. If traffic is sparse, shift effort towards measurement reliability, customer interviews and partner stores with existing traffic instead of buying unlimited visits to rescue a weak hypothesis.

## What should become the product

The promising output is a repeatable workflow: identify a purchase-relevant information failure, propose a supported correction, test it, deploy it with approval, verify propagation and reconcile the customer's result. The store would tell us which parts are expensive or error-prone enough to deserve software.

For example, a measured bottle-compatibility database could power page facts, feed attributes, suitable variant links and regression checks after supplier changes. Each capability is useful even before we can credibly quantify an AI-specific revenue lift. A recurring flow of changes and defects could support monitoring revenue; a one-time cleanup may be better sold as a fixed project.

Benchmark the harness against a simple factual checklist and human judgement. If it costs more and selects no better changes, we should keep the useful audit and discard the expensive simulation. If it reliably prioritises edits that transfer to other stores, that is a much more defensible basis for selling it.

My recommendation is to proceed with supplier quotes, a few samples and a bounded measurement prototype. Start selling only when the basic retail proposition holds up. Use the shop to discover a repeatable paid service, and bring outside merchants into the work before the shop becomes the whole business.
