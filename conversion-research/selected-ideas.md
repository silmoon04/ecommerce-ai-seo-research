# Fifty purchase hypotheses

Research snapshot: 29 September 2026. These are screened, untested ideas. None has an established expected conversion lift. Numerical scenarios are assumptions, not forecasts. Effects may overlap and must not be added together.

## I01. Preserve the selected variant from AI link to cart

Infrastructural | Arrival and cart | Test first | now

### Buyer

A configurable-goods merchant receiving AI referrals that identify a particular size, pack or regional variant.

### Problem

A shopper chooses one variant in an assistant, then a redirect, locale switch or theme defaults to another. Reconstructing the choice can end the purchase.

### Intervention

Build a merchant-owned resolver that maps observed incoming identifiers to the displayed variant and cart line. Verify image, price, stock and locale together. When the incoming choice is ambiguous, show a selector and ask the shopper to confirm.

### Mechanism

Removing an avoidable choice mismatch lets an already interested shopper continue with the product they intended to buy.

### Overlap

Shopify already supports variant deep links and cart permalinks. Peec already reports product destinations. A correctly configured native link is the baseline, not a blank product page.

### Edge

Earn additional purchasing shoppers by catching real theme, redirect and app failures that persist beyond correct native configuration.

### Evidence

Mechanism evidence only. Shopify documents the relevant link and rendering behavior; Peec documents destination diagnostics. Neither establishes this repair service's purchase effect.

### Experiment

Randomize persistent shoppers at their first observed AI-origin arrival carrying a supported identifier. Compare the resolver with the correctly configured native route. Keep all assigned eligible shoppers, including immediate exits, and follow completed orders through a predeclared buying window and later returns. Audit assignment before interpreting results.

### Metric

Completed purchasing shoppers per all assigned eligible shoppers; deduplicated orders, retained orders and contribution after returns. Track wrong-variant purchases and added latency.

### Dependency

Explicit incoming identifiers, control of redirects and theme behavior, current inventory and an assignment-to-order join. Ongoing pricing needs recurring regressions and affected traffic beyond a one-off repair.

### Falsifier

The native fix eliminates recurring failures, the recoverable population cannot cover delivery costs, or better correctness fails to produce an economically useful purchase gain after returns.

### Impact scenario

Illustration: 5,000 AI visits/month, eligible fraction e, a 2.5% eligible purchase rate and £30 contribution after expected returns imply 125e baseline orders. Assume one visit per shopper. Eligibility is unmeasured; incremental orders could be zero or negative.

### Value scenario

A £99 monthly test fee requires 3.3 extra completed orders to break even, or 9.9 for a chosen 3x value-to-fee threshold, before integration costs. The fee is unvalidated.

### Implementation

Start with one theme and supported URL format. Probe sampled observed links after releases, compare rendered selection with cart contents, and route exceptions to merchant review.

### Cost control

Use deterministic identifier mappings and changed-page probes; reserve model calls for classifying unfamiliar failures.

### Sources

- [Support product variants](https://shopify.dev/docs/storefronts/themes/product-merchandising/variants)
- [Create cart permalinks](https://shopify.dev/docs/apps/build/checkout/create-cart-permalinks)
- [AI Shopping Analytics](https://peec.ai/blog/ai-shopping-analytics)

Underlying candidates: peec-02, geoffy-02, simprosys-02, tinyseo-03, google-07, smartseo-02, infrastructure-06, channable-04

## I02. Recover unavailable items with requirement-preserving alternatives

Behavioral | Selection recovery | Test first | now

### Buyer

A merchant with measurable AI-origin arrivals at unavailable variants and enough genuinely suitable stock to offer alternatives.

### Problem

A recommendation becomes unavailable before arrival. A generic related-products carousel can ignore the requirement that made the original item suitable.

### Intervention

Build a stockout recovery component that checks live alternatives against confirmed requirements. Show exact differences, delivered cost and a truthful wait option. Keep hard constraints intact and require an explicit choice before replacing the original cart line.

### Mechanism

A usable substitute or informed decision to wait can preserve a purchase that the stockout would otherwise lose.

### Overlap

Algolia already implements out-of-stock alternatives and stock filtering, including its documented Co-op deployment. The comparator should be a tuned related-products and waitlist flow.

### Edge

The proposed gain comes from protecting requirements and choosing between substitute, another variant and waiting. An immediate replacement sale alone cannot establish extra demand.

### Evidence

Hypothesis with direct capability overlap. Algolia's vendor case concerns its own shopping experience; it supplies neither randomization details for this policy nor an expected AI-origin lift.

### Experiment

Assign persistent shoppers on their first eligible stockout arrival. Hold prices and available assortment constant between the proposed policy and the tuned baseline. Count all assigned shoppers over 60 days, then mature returns. Power the test on the observed eligible population, not all site traffic.

### Metric

Any completed catalog purchase per all assigned eligible shoppers, plus total orders and retained contribution. Follow later original-item purchases and returns to expose substitution or timing shifts.

### Dependency

Reliable variant stock, defensible restock information, explicit requirements, and identity continuity sufficient for the chosen buying window.

### Falsifier

Substitute sales rise while 60-day purchasing shoppers do not, or unsuitable replacements and returns erase the gain.

### Impact scenario

Illustrative monthly inputs: 5,000 AI visits, unmeasured stockout eligible fraction e, 2.5% eligible purchase rate and £30 contribution after expected returns. Baseline orders equal 125e, assuming one visit per shopper. Incremental orders may be zero or negative.

### Value scenario

Test a £99 monthly fee against 3.3 additional completed orders for break-even or 9.9 for a 3x value-to-fee threshold, before stock integration and review costs. No willingness to pay is established.

### Implementation

Begin in one category with reviewed substitute relationships. Recheck stock when showing options and adding to cart; disclose unknown restock dates.

### Cost control

Cache stable product relationships while refreshing stock. Rank a small valid set with deterministic rules before considering a learned policy.

### Sources

- [Co-op: Scaling Grocery Search and Improving Basket Sizes With Algolia](https://www.algolia.com/customers/co-op)
- [Merchandise Recommendations](https://www.algolia.com/ecommerce-merchandising-playbook/recommendations-rules)

Underlying candidates: algorithmic-04, peec-03, burnish-05, datafeedwatch-05, channable-02, simprosys-05, lilyai-03, gorgias-05, behavioral-07

## I03. Prove exact compatibility before purchase

Algorithmic | Product qualification | Test first | integration-heavy

### Buyer

A parts or accessories merchant with licensed manufacturer data and an expert responsible for compatibility rules.

### Problem

Matching product descriptions cannot establish that an accessory works with a particular model, revision or connector. Uncertainty can block a suitable purchase or cause a wrong one.

### Intervention

Compile manufacturer relationships, exclusions and revision boundaries into a versioned checker. Resolve the buyer's exact model, return supported, incompatible or unknown, and show the source behind the result. Recheck the selected variant when the cart changes.

### Mechanism

An auditable fit answer removes a concrete purchase objection while preventing unsuitable orders that later become returns.

### Overlap

Octane already documents branching, exclusions and exact variant mapping. Partly advertises OEM-based identification, although its Workshop page has mixed launch-status wording. Compare against the merchant's competent fitment finder using equal source data.

### Edge

The checker must add suitable purchasing shoppers through explicit exclusions and revision handling beyond a good finder or faceted search.

### Evidence

Mechanism and competitor evidence only. These sources establish existing approaches; they do not measure the proposed compatibility check's incremental purchase effect.

### Experiment

Randomize persistent AI-origin shoppers when they enter an eligible compatibility journey, before the checker asks anything. Compare with the established finder. Include incomplete model entries and unknown results in the assigned denominator. Follow completed orders through the buying window and subsequent fit-related returns.

### Metric

Purchasing shoppers per all assigned eligible shoppers, with independently reviewed compatibility errors, retained orders and contribution after returns.

### Dependency

Licensed authoritative relationships, model normalization, expert ownership and a cart integration retaining the evidence version. Start outside hazardous equipment.

### Falsifier

The false-compatible rate breaches the predeclared tolerance, or an adequately precise trial excludes the minimum useful retained purchase gain.

### Impact scenario

For illustration, 5,000 monthly AI visits times unknown fit-check eligible fraction e times a 2.5% purchase rate gives 125e orders. At £30 contribution after expected returns, baseline contribution is £3,750e. Assume one visit per shopper; effects can be zero or negative.

### Value scenario

A £99 monthly fee to test needs 3.3 additional completed orders before costs, or 9.9 for a 3x value-to-fee threshold. Licensing and expert maintenance could dominate that fee.

### Implementation

Choose one bounded accessory family, build expert-reviewed cases including exclusions, and abstain when model or source data is incomplete.

### Cost control

Reuse verified rules and update affected model families only. Do not substitute cheap language similarity for a maintained compatibility relation.

### Sources

- [Partly](https://www.partly.com/integrations/workshop)
- [Quiz Logic - Product Recommendation Engines | Octane AI](https://www.octaneai.com/products/quiz-logic)
- [Carts and checkout for agents](https://shopify.dev/docs/agents/carts-and-checkout)

Underlying candidates: burnish-06, scrunch-05, geoffy-04, datafeedwatch-02, feedonomics-04, simprosys-04, smartseo-04, shopify-04, identity-04, searchpilot-05

## I04. Turn a delivery deadline into a feasible purchase plan

Temporal | Fulfilment qualification | Test first | integration-heavy

### Buyer

An event, gift or urgent-use merchant with reliable fulfillment systems and meaningful deadline-sensitive demand.

### Problem

An accurate generic delivery range can still leave the buyer unsure whether the whole basket will arrive before an event.

### Intervention

Build a deadline resolver using destination, needed-by date, stock location, handling cutoff, carrier service and capacity. Return feasible shipping or collection choices, then carry the chosen service into checkout and revalidate the whole basket.

### Mechanism

A concrete feasible plan can recover a buyer who would abandon because delivery uncertainty makes the purchase unusable.

### Overlap

Google Merchant Center already models delivery estimates and cutoffs; UCP exposes fulfillment options. Compare against the merchant's accurate existing estimator and checkout, with the same operational inputs.

### Edge

Earlier qualification must produce additional on-time purchasers through a real alternative, such as collection. Merely displaying a date adds little.

### Evidence

Official delivery and protocol documentation supports implementation. No source establishes a purchase percentage for this deadline-preserving flow.

### Experiment

Randomize persistent AI-origin shoppers entering a predeclared deadline-relevant category or route before offering the resolver. Keep every assigned eligible shopper, including those who decline to give a date. Measure completed purchases over the buying cycle and follow actual delivery, cancellations and later returns.

### Metric

Completed purchasers and purchasers receiving the full order by their confirmed deadline per all assigned eligible shoppers. Reconcile retained contribution and late-delivery losses.

### Dependency

Authoritative location stock, handling calendars, timezones, carrier promises, checkout service control and merchant ownership of any guarantee.

### Falsifier

No useful purchase gain against an accurate estimator, or late arrivals and refunds erase the apparent gain. An unhonored service selection invalidates the mechanism.

### Impact scenario

Illustrative inputs are 5,000 AI visits/month, unknown deadline-route eligible fraction e, 2.5% eligible purchase rate and £30 contribution after expected returns. With one visit per shopper, baseline orders are 125e. The effect could be zero or negative.

### Value scenario

A £99 monthly test fee requires 3.3 extra completed orders, or 9.9 for a 3x value-to-fee threshold, before fulfillment integration and any additional service subsidies. This is a hurdle, not a forecast.

### Implementation

Pilot one region and a small service set. Display timestamped estimates, require confirmation after a material change, and offer guaranteed dates only with an actual merchant commitment.

### Cost control

Compute feasible options from operational rules and cache calendars. Refresh volatile stock and capacity instead of repeatedly generating delivery prose.

### Sources

- [Set up estimated delivery time](https://support.google.com/merchants/answer/14949917?hl=en)
- [Handling cutoff time [handling_cutoff_time]](https://support.google.com/merchants/answer/16543665?hl=en)
- [Fulfillment](https://ucp.dev/specification/shopping/extensions/fulfillment/)

Underlying candidates: temporal-01, profound-05, peec-05, burnish-04, geoffy-03, datafeedwatch-04, channable-03, simprosys-03, smartseo-03, shopify-03, google-09, infrastructure-09, gorgias-06, searchpilot-04, behavioral-08, constructor-06

## I05. Build the smallest complete basket that performs the task

Algorithmic | Basket construction | Test first | integration-heavy

### Buyer

A specialist merchant selling projects that require several compatible products, with maintained dependency and quantity rules.

### Problem

A plausible shopping list can omit an essential adapter or include equipment the buyer already owns. The customer cannot tell whether paying for the basket will complete the task.

### Intervention

Build a constraint solver that translates a declared job into required capabilities, subtracts owned equipment and selects a minimum sufficient set of compatible variants and quantities within budget. Check live stock and show unresolved requirements and optional extras separately before the buyer approves the cart.

### Mechanism

Verifiable completeness lets a hesitant project buyer commit to a usable purchase without checking every dependency elsewhere.

### Overlap

Constructor ASA already supports multi-item goals and catalog validation. Google supports required-part relationships, and native carts already accept multiple variants. A good merchant kit is another strong comparator.

### Edge

Win more purchasing customers than the same-data agent or competent kit. More items and higher basket value are insufficient.

### Evidence

Existing agent and attribute documentation establishes components of the build. It does not show that the proposed completeness checks create additional purchases.

### Experiment

Randomize persistent AI-origin shoppers at the first eligible project request. Compare the solver with the merchant's best multi-item agent or kit at equal prices and information. Keep all assigned projects, including unresolved ones. Measure completed purchases through a full project-buying window and later missing-part or incompatibility returns.

### Metric

Purchasing shoppers per all assigned eligible shoppers, verified complete orders, retained orders and contribution. Report missing components and unnecessary additions separately.

### Dependency

Expert-owned dependency rules, shared variant identifiers, owned-equipment input, inventory and cart APIs, plus order and return data.

### Falsifier

The solver increases basket size without more purchasers, or completeness errors and returns offset any order gain.

### Impact scenario

Illustration only: 5,000 AI visits/month, unmeasured project eligible fraction e, 2.5% eligible purchase rate and £30 contribution after expected returns imply 125e baseline orders. Assume one visit per shopper. Additional purchases may be zero or negative.

### Value scenario

Test a £99 monthly fee; 3.3 extra completed orders cover it and 9.9 meet a 3x value-to-fee threshold before rule maintenance and setup. Replace £30 with observed project contribution before pricing.

### Implementation

Start within one merchant and one bounded task family. Validate complete sets in fixtures, then create exact cart lines only after approval.

### Cost control

Use deterministic dependency checks. Limit language generation to interpreting the task and explaining verified choices; avoid expensive open-ended planning for routine kits.

### Sources

- [Learn about AI Shopping Agent](https://docs.constructor.com/docs/products-ai-shopping-agents-learn-about-ai-shopping-agent)
- [How to use conversational attributes](https://support.google.com/merchants/answer/17085370)
- [Carts and checkout for agents](https://shopify.dev/docs/agents/carts-and-checkout)

Underlying candidates: constructor-01, profound-03, scrunch-10, geoffy-05, channable-08, feedonomics-05, smartseo-06, google-06, algorithmic-03, behavioral-06, gorgias-07, shopify-07

## I06. Keep correctable checkout errors inside the purchase flow

Infrastructural | Checkout recovery | Test first | integration-heavy

### Buyer

A merchant checkout engineering team operating an approved agent checkout route connected to legacy commerce systems.

### Problem

A correctable address, delivery or discount issue can reach the buyer as a terminal generic failure, forcing a restart or losing the order.

### Intervention

Build a version-aware adapter mapping known nonpayment validation errors into the negotiated UCP code, field path and severity. Preserve valid checkout state and expose the permitted correction. Leave pricing, fraud rules and purchase eligibility unchanged.

### Mechanism

A buyer can correct one blocking field and finish an otherwise valid order without repeating the purchase flow.

### Overlap

Google already documents canonical errors, recoverable states and checkout continuation. The comparator is the merchant's current standards-compliant adapter, with the same business rules.

### Edge

Additional nonduplicate purchases must come from handling concrete downstream failures more accurately than the existing integration. Correct classification alone is insufficient.

### Evidence

Official UCP guidance explains why unknown codes can cause generic errors and how recovery fields work. It gives no prevalence estimate or expected purchase gain for this merchant.

### Experiment

Assign persistent shoppers when entering the eligible approved checkout route, before any failure occurs. Compare adapters and retain everyone assigned, including sessions without errors. Follow completed orders and later cancellations or returns. Use production-representative error fixtures first; size the live trial using actual eligible traffic.

### Metric

Completed purchasing shoppers per all assigned eligible checkout entrants; deduplicated orders, retained contribution, retry loops and checkout latency. Error-only conversion is secondary.

### Dependency

Merchant error ownership, approved protocol integration, version negotiation and stable checkout-to-order identifiers. Measure recurring recoverable failure volume before subscription pricing. Ambiguous payment completion needs separate reconciliation.

### Falsifier

Most errors are correctly terminal, or the new adapter increases corrections and retries without additional retained purchases.

### Impact scenario

Illustrative common model: 5,000 AI visits/month, unknown route eligible fraction e, 2.5% eligible purchase rate and £30 contribution after expected returns give 125e orders. The 2.5% rate is an assumption, not a checkout benchmark. Effects may be zero or negative.

### Value scenario

A £99 monthly fee to test needs 3.3 extra completed orders for break-even or 9.9 for a 3x value-to-fee threshold before engineering, monitoring and setup. Measure actual route economics before quoting.

### Implementation

Audit frequent error categories, redact customer details in fixtures, test every correction path, and introduce the adapter behind assignment and rollback controls.

### Cost control

Prioritize frequent recoverable failures and deterministic mappings. Reuse protocol conformance tests; avoid a language model deciding whether to retry payments.

### Sources

- [Error codes](https://developers.google.com/merchant/ucp/guides/overview/error-codes)
- [Frequently Asked Questions](https://developers.google.com/merchant/ucp/faq)
- [Native checkout REST API implementation](https://developers.google.com/merchant/ucp/implementation/2026-04-08/native-checkout-api)

Underlying candidates: google-03, profound-09, peec-10

## I07. Quote the payable total before the buyer commits

Regulatory | Offer qualification | Test first | integration-heavy

### Buyer

A merchant whose shipping, tax, duty or mandatory charges materially depend on the chosen variant and destination.

### Problem

A shopper may compare headline prices, invest in a choice and only then discover a different payable total. An earlier accurate quote could prevent that late abandonment.

### Intervention

Add a read-only quote component using exact variant, quantity and buyer-entered destination. Show the payable total, components, assumptions and expiry; carry a quote reference into cart and visibly requote material changes.

### Mechanism

The buyer can choose an affordable offer while alternatives remain available, reducing late surprises among genuinely feasible purchases.

### Overlap

UCP already models fulfillment choices and costs; merchant checkouts already calculate totals. Compare with an accurate native flow that meets the same disclosure requirements.

### Edge

Earlier reconciliation must yield additional retained purchasers where quote timing or disagreement is an observed problem. More attractive headline clicks are not the objective.

### Evidence

CMA guidance supports clear mandatory-charge disclosure and UCP documents fulfillment costs. These are requirements and implementation evidence, not a legal assurance or measured feature lift.

### Experiment

Randomize persistent AI-origin shoppers before quote presentation on a predeclared eligible route. Both arms retain required disclosures and identical prices. Count every assigned shopper, including those who decline destination entry or leave after seeing the total. Follow completed orders through the buying window and later returns.

### Metric

Purchasing shoppers per all assigned eligible shoppers, completed orders and retained contribution after discounts, payment fees and returns. Monitor quote-to-checkout disagreement.

### Dependency

An authoritative quote API, explicit destination input, market rules, checkout reconciliation and merchant-reviewed wording. Uncertain duties must remain labeled estimates.

### Falsifier

Mismatch and timing friction are negligible, or earlier quotes fail to deliver the minimum useful retained purchase gain against the lawful native baseline.

### Impact scenario

Illustration: 5,000 AI visits/month, unknown quote-route eligible fraction e, 2.5% eligible purchase rate and £30 contribution after expected returns imply 125e orders. Assume one visit per shopper. The intervention can have zero or negative purchase effects.

### Value scenario

An unvalidated £99 monthly fee needs 3.3 extra completed orders for break-even or 9.9 for a 3x value-to-fee threshold, before quote-service and integration costs. Lower margin after subsidies changes this hurdle.

### Implementation

Begin with one region and one charge model. Compare quoted and settled totals in shadow mode before testing the earlier display.

### Cost control

Reuse the merchant's quote engine, cache only within valid price and stock windows, and avoid duplicate tax calculations.

### Sources

- [Providing clear and accurate information about prices: summary](https://www.gov.uk/government/publications/price-transparency-cma209/providing-clear-and-accurate-information-about-prices-summary)
- [Fulfillment](https://ucp.dev/specification/shopping/extensions/fulfillment/)

Underlying candidates: scrunch-04, peec-08, feedonomics-07, simprosys-06

## I08. Ask only the question that changes the buying decision

Behavioral | Decision support | Test first | now

### Buyer

A merchant controlling its shopping agent or landing component, with enough choice complexity that one missing fact can change the recommendation.

### Problem

Before selecting a suitable product, a shopper may be missing one decisive fact. An agent can ask several generic questions yet fail to identify the detail that changes the viable choices.

### Intervention

Build a question-selection policy that identifies a missing fact by checking disagreement among viable candidates. Ask one bounded clarification when the answer would change suitability; otherwise show the provisional shortlist. Explain why the fact matters and allow skipping.

### Mechanism

Obtaining the right missing fact can resolve uncertainty before selection while avoiding irrelevant questions that make the buying task harder.

### Overlap

Constructor already retains conversation context and refines recommendations. Octane already supports branching and variant selection. Compare with the tuned merchant agent and a short fixed quiz.

### Edge

Purchase-tested selection of the next useful question must outperform a simple fixed quiz at equal factual quality and hard-constraint enforcement.

### Evidence

Existing product documentation establishes conversational and branching capability. It does not establish that this policy adds purchases; more completed dialogues would be only a diagnostic.

### Experiment

Randomize persistent AI-origin shoppers before the first eligible decision clarification and retain assignment across turns. Use the same products, facts, prices and post-selection promotional prompts. Include every assigned shopper, including skipped questions and abandoned conversations. Observe completed orders through a prespecified buying window, then reconcile returns.

### Metric

Purchasing shoppers per all assigned eligible shoppers, completed orders and retained contribution. Guard against wrong recommendations, longer journeys and increased abandonment.

### Dependency

Agent policy control, audited hard requirements, comparable candidate attributes and conversation-to-order linkage without assuming access to private external chats.

### Falsifier

The policy cannot beat a competent fixed question or gains disappear after unsuitable-product returns. Lower question count alone does not justify shipping.

### Impact scenario

Illustrative monthly cohort: 5,000 AI visits, unknown clarification eligible fraction e, 2.5% eligible purchase rate and £30 contribution after expected returns. One visit per shopper gives 125e baseline orders; any incremental change may be zero or negative.

### Value scenario

A £99 monthly test fee requires 3.3 additional completed orders to break even, or 9.9 for a 3x value-to-fee threshold, before serving and experimentation costs. This does not establish demand for the fee.

### Implementation

Start with a rules-based disagreement score and a small reviewed question set. Show useful results immediately and retain confirmed requirements when a question is skipped.

### Cost control

Use candidate differences and a bounded question set before training another model. Spend model calls on facts that can change which products qualify.

### Sources

- [Learn about AI Shopping Agent](https://docs.constructor.com/docs/products-ai-shopping-agents-learn-about-ai-shopping-agent)
- [Quiz Logic - Product Recommendation Engines | Octane AI](https://www.octaneai.com/products/quiz-logic)

Underlying candidates: constructor-02, peec-06, burnish-08, lilyai-05, truefit-03, algorithmic-02, gorgias-03, behavioral-01

## I09. Resolve retired recommendations to a documented successor

Temporal | Selection recovery | Develop next | now

### Buyer

A merchant still receiving AI referrals for retired models, with manufacturer revision records and available successors.

### Problem

An old recommendation may lead to a dead page or a replacement that quietly lacks the feature the buyer wanted.

### Intervention

Build a versioned predecessor-successor table and a visible replacement comparison. Preserve the retired model's identity, show retained and lost capabilities, explain compatibility changes, and offer remaining stock or a documented successor for explicit selection.

### Mechanism

A shopper arriving with a stale recommendation can find a suitable current purchase without restarting research or mistaking a successor for the original.

### Overlap

Smart SEO already handles archived-product redirects and editable destinations. Schema.org already represents model succession. Compare with a competent manually chosen successor page as well as a generic redirect.

### Edge

Requirement continuity and a precise account of differences must create additional purchasers beyond an ordinary replacement page.

### Evidence

Official redirect documentation and the successorOf property establish existing mechanics. Neither proves that answer engines consume this relationship or that this experience increases purchases.

### Experiment

Randomize persistent shoppers on their first AI-origin arrival for a retired model. Compare the replacement component with the best truthful existing successor flow. Retain all assigned arrivals and follow all catalog orders through a complete buying window and later returns. Keep public feed changes outside this visitor experiment.

### Metric

Completed purchasing shoppers per all assigned retired-model arrivals, retained orders and contribution after returns. Track wrong-model complaints and orders shifted from other current products.

### Dependency

Authoritative lineage, human review of material differences, control of the arrival route and assignment-to-order linkage.

### Falsifier

A well-maintained manual successor page performs equally well within the minimum useful effect, or lost-capability returns cancel the gain.

### Impact scenario

Illustrative inputs: 5,000 AI visits/month, unknown retired-model eligible fraction e, 2.5% eligible purchase rate and £30 contribution after expected returns give 125e baseline orders. Assume one visit per shopper. Extra orders may be zero or negative.

### Value scenario

Test a £99 monthly fee against 3.3 extra completed orders for break-even or 9.9 for a 3x value-to-fee threshold, before lineage maintenance and setup costs. This is not a validated price.

### Implementation

Start with the most visited retired product family. Store model identity separately from offers and never reuse an old identifier for a replacement.

### Cost control

Review only changed model relationships and high-traffic obsolete destinations. Use deterministic routing once the manufacturer lineage is approved.

### Sources

- [successorOf - Schema.org Property](https://schema.org/successorOf)
- [Fixing broken links | Sherpas Design Help Center](https://intercom.help/sherpas-design/en/articles/10602788-fixing-broken-links)

Underlying candidates: profound-06, scrunch-02, smartseo-01, tinyseo-07

## I10. Calculate the exact packs and quantities needed for the job

Psychological | Basket construction | Develop next | now

### Buyer

A flooring, consumables or materials merchant whose shoppers arrive with a quantity or coverage requirement.

### Problem

A buyer may understand the unit price but still struggle to choose packs that cover the job without excessive surplus or an unexpected total.

### Intervention

Build a deterministic quantity planner that converts the requested amount of one material into valid pack combinations. Show delivered total, unit cost, surplus and any merchant-defined allowance separately. Send the selected combination to exact native cart lines and recheck stock and price.

### Mechanism

Making the required purchase calculable and executable can turn uncertainty about quantities into a completed order.

### Overlap

DataFeedWatch already helps expose pack quantities in product titles, and Shopify already supports variant quantities and cart totals. Good unit-price displays and existing quantity calculators are the baseline.

### Edge

The planner must add purchasing customers through valid combinations and checkout-consistent totals. Selling a larger pack or increasing basket value is not enough.

### Evidence

The DataFeedWatch case supplies adjacent support for pack clarity; Shopify documents cart operations. Neither measures this planner's effect on AI-origin purchases.

### Experiment

Randomize persistent AI-origin shoppers at first entry to the eligible quantity-buying flow, before offering the planner. Compare against the existing calculator and unit-price display with equal pack information. Count every assigned shopper, including incomplete inputs. Follow completed orders over the buying window and then returns.

### Metric

Purchasing shoppers per all assigned eligible shoppers, completed orders, retained contribution and quantity-related returns. Track shortages, surplus complaints and total-price errors.

### Dependency

Reliable units, pack contents, minimum orders, conversion rules, current pricing and native cart access. Physical coverage assumptions need merchant validation.

### Falsifier

The tool raises chosen quantities without additional purchasers, or mistakes and unwanted surplus erase the retained purchase gain.

### Impact scenario

Illustration only: 5,000 AI visits/month, unmeasured quantity-flow eligible fraction e, 2.5% eligible purchase rate and £30 contribution after expected returns yield 125e baseline orders. Assume one visit per shopper. The effect may be zero or negative.

### Value scenario

At an unvalidated £99 monthly test fee, break-even needs 3.3 extra completed orders; a 3x value-to-fee threshold needs 9.9, before data cleanup and setup. Use actual contribution before selling the service.

### Implementation

Pilot one unit system and a bounded set of pack sizes. Explain rounding and allowances, then verify the resulting basket total against the merchant quote.

### Cost control

Use integer arithmetic and cached pack definitions. A language model may parse the request but should never perform the authoritative calculation.

### Sources

- [[Case Study] Using DataFeedWatch AI to create a scalable title optimization architecture](https://www.datafeedwatch.com/blog/scaling-title-optimization-using-ai)
- [Carts and checkout for agents](https://shopify.dev/docs/agents/carts-and-checkout)

Underlying candidates: datafeedwatch-06

## I11. Check physical fit and operating clearance in the buyer's space

Algorithmic | Product qualification | Develop next | integration-heavy

### Buyer

A furniture or appliance merchant with trustworthy dimensions and shoppers whose purchase depends on a specific space.

### Problem

A product can look right in a room render yet fail to fit an alcove, clear a door swing or pass through an opening.

### Intervention

Build a bounded geometry checker using manual measurements or a supported room scan. Check verified product and package dimensions against space, movement clearance and measurement uncertainty. Show checked dimensions and abstain where the margin is insufficient.

### Mechanism

A qualified fit answer can let a hesitant shopper buy while avoiding false reassurance that creates expensive returns.

### Overlap

IKEA Kreativ already places furniture at scale, and Apple RoomPlan supplies room geometry. Compare with scaled visualization plus a simple, well-designed measurement form.

### Edge

The extra value must be demonstrably better fit decisions and more retained purchasers for one specific task. An attractive render is not the differentiator.

### Evidence

Apple and IKEA establish available building blocks and a capable existing experience. Their documentation does not establish this checker's accuracy or purchase effect.

### Experiment

First validate fit judgments against independent measurements. Then randomize persistent AI-origin shoppers entering the declared spatial-fit flow, before scan or measurement completion. Include every assigned shopper, including unsupported devices and abandoned scans. Follow completed purchases through delivery and later fit-related returns.

### Metric

Purchasing shoppers per all assigned eligible shoppers, retained orders and contribution after returns. Monitor independently checked false-fit rates, measurement abandonment and delivery failures.

### Dependency

Verified dimensions, a supported measurement route, merchant-approved tolerances and an explicit abstention policy. Customer measurements remain uncertain.

### Falsifier

False-fit judgments exceed the declared tolerance, or a powered purchase test rules out a useful gain over the simple measurement baseline.

### Impact scenario

Illustrative monthly model: 5,000 AI visits, unknown spatial-fit eligible fraction e, a 2.5% eligible purchase rate and £30 contribution after expected returns imply 125e orders. Assume one visit per shopper. Effects may be zero or negative.

### Value scenario

A £99 monthly fee to test requires 3.3 extra completed orders, or 9.9 for a 3x value-to-fee threshold, before scan support and dimension maintenance. Actual furniture return costs may materially change the £30 assumption.

### Implementation

Start with shelves inside rectangular alcoves or another bounded task. Ask buyers to confirm critical dimensions and keep uncertain readings visible through cart selection.

### Cost control

Support manual entry first and add scans only when they improve decision accuracy. Reuse checked product geometry across shoppers.

### Sources

- [RoomPlan Overview - Augmented Reality - Apple Developer](https://developer.apple.com/augmented-reality/roomplan/)
- [Can I resize an item or adjust the dimensions of the room in IKEA Kreativ?](https://www.ikea.com/us/en/customer-service/knowledge/articles/3d2f761d-842f-4f1f-aa9b-0e3f91330d59.html)

Underlying candidates: algorithmic-05, psychological-05, behavioral-03

## I12. Offer an explicit compromise when the requested combination is impossible

Behavioral | Selection recovery | Develop next | now

### Buyer

A merchant with genuine zero-result shopping requests and enough assortment breadth to offer a useful compromise.

### Problem

A shopper asks for a combination the catalog cannot satisfy. Nearest-match results can silently drop the very requirement that mattered most.

### Intervention

Build a constraint checker that finds a small conflicting set of requested attributes. Separate buyer-marked requirements from negotiable preferences, then show a few purchasable options each changing one permitted preference, with the exact tradeoff and total price visible.

### Mechanism

An understandable, acceptable compromise can rescue a purchase that an unexplained empty result would lose.

### Overlap

Constructor already suggests related items and nearby query alternatives when results are limited. Octane already supports exclusions and branching. Tuned nearest-match recommendations are a capable baseline.

### Edge

The merchant earns additional catalog purchasers only if visible, buyer-approved tradeoffs outperform the same alternatives shown through ordinary relaxed search.

### Evidence

Official agent and quiz documentation establishes overlap. The proposed minimal-conflict explanation remains a purchase hypothesis with no defensible lift estimate.

### Experiment

Randomize persistent AI-origin shoppers after the same pre-treatment query produces zero valid matches and before either recovery policy runs. Compare with tuned nearest-match results at equal assortment and prices. Keep all assigned shoppers, including those refusing every compromise, and follow completed catalog orders and later returns.

### Metric

Purchasing shoppers per all assigned eligible zero-result shoppers, retained orders and contribution. Independently check every recommended purchase against the buyer's unchanged hard requirements.

### Dependency

Trustworthy structured attributes, explicit preference control, current availability and a merchant-owned agent or search interface.

### Falsifier

Alternative clicks increase without more retained purchasers, or the policy achieves sales by violating requirements the buyer never agreed to change.

### Impact scenario

Illustration: 5,000 monthly AI visits, unknown zero-result eligible fraction e, 2.5% eligible purchase rate and £30 contribution after expected returns imply 125e orders. Assume one visit per shopper. Additional orders can be zero or negative.

### Value scenario

An unvalidated £99 monthly test fee needs 3.3 extra completed orders to cover the fee or 9.9 for a 3x value-to-fee threshold, before catalog normalization and serving costs.

### Implementation

Start with discrete, comparable attributes. Preserve budget, compatibility and safety constraints; any change to a hard requirement requires the shopper's explicit revision.

### Cost control

Solve conflicts deterministically and explain only verified alternatives. Cap the displayed set without hiding the rest of the feasible assortment.

### Sources

- [Learn about AI Shopping Agent](https://docs.constructor.com/docs/products-ai-shopping-agents-learn-about-ai-shopping-agent)
- [Quiz Logic - Product Recommendation Engines | Octane AI](https://www.octaneai.com/products/quiz-logic)

Underlying candidates: feedonomics-06

## I13. Carry a buyer-approved shopping brief across the AI handoff

Identity | Arrival and cart | Conditional bet | frontier

### Buyer

A merchant and cooperating assistant partner whose shoppers lose approved decision context when moving into the store.

### Problem

A prefilled cart preserves products but can lose accepted requirements, rejected alternatives and the unfinished question. The buyer has to repeat the decision.

### Intervention

Build an expiring opaque handoff handle referencing only a buyer-approved shopping brief. Transfer selected variants, accepted constraints and the remaining task. Show an editable summary at the merchant, revalidate current facts and offer a plain-link fallback.

### Mechanism

Preserving useful context can reduce repeated research and prevent the merchant agent from undoing an already qualified choice.

### Overlap

Shopify already supports long-running carts, context and continue_url handoff; Constructor documents thread persistence. Compare against the identical correctly prefilled native cart.

### Edge

Any extra purchasing shoppers must come from preserved approved decision context. Basic variant selection, saved carts and chat memory are existing capabilities.

### Evidence

Native cart and agent documentation supports components. No evidence establishes universal external assistant support or a purchase gain from this cross-party brief.

### Experiment

With a cooperating partner, randomize shoppers at the eligible outbound handoff before merchant arrival. Include failed transfers and non-arrivals in the assigned denominator. Compare with the same prefilled cart and follow completed merchant orders and later returns. A pasted-brief onsite pilot tests only the narrower owned-site mechanism.

### Metric

Completed purchasing shoppers per all assigned eligible handoffs, retained orders and contribution. Track transfer coverage, consent refusal, stale facts and context errors.

### Dependency

Explicit partner support, shopper permission, protected short-lived storage, merchant cart integration and end-to-end outcome linkage. A referrer reveals no private conversation.

### Falsifier

Partner coverage cannot support break-even, or the prefilled-cart control matches the full cohort's retained purchase outcome.

### Impact scenario

Using 5,000 AI visits/month, unknown eligible share e, a 2.5% eligible purchase rate and £30 contribution after expected returns gives a conditional downstream baseline of 125e orders. It cannot quantify outbound-handoff lift: that requires all assigned handoffs, including non-arrivals. Effects may be zero or negative.

### Value scenario

A £99 monthly fee to test needs 3.3 additional completed orders or 9.9 for a 3x value-to-fee threshold, before partner and integration costs. This hurdle does not imply willingness to pay.

### Implementation

Test a shopper-pasted brief first, then negotiate one supported partner flow. The handle conveys no payment authority; recheck products and obtain buyer approval before checkout.

### Cost control

Transfer a compact structured record, expire it promptly and avoid copying transcripts or repeatedly summarizing full conversations.

### Sources

- [Implement AI Shopping Agent](https://docs.constructor.com/docs/products-ai-shopping-agents-learn-about-ai-shopping-agent-implement-ai-shopping-agent)
- [Carts and checkout for agents](https://shopify.dev/docs/agents/carts-and-checkout)

Underlying candidates: constructor-03, profound-02, peec-04, scrunch-03, burnish-03, feedonomics-03, lilyai-06, shopify-05, shopify-08, behavioral-02, regulatory-08, gorgias-01

## I14. Resume a saved buying decision by reviewing only what changed

Temporal | Decision continuity | Develop next | integration-heavy

### Buyer

A high-consideration merchant whose AI-origin shoppers usually research across several visits before their first purchase.

### Problem

A saved cart remembers items but may not explain why they were chosen or whether price, stock or suitability changed while the buyer was away.

### Intervention

Offer an opt-in decision record containing accepted requirements, selected and rejected options, dated evidence and the remaining task. On a voluntary return, revalidate facts and show only material changes before resuming the decision.

### Mechanism

The buyer can continue useful prior work without rereading a transcript or unknowingly relying on stale product facts.

### Overlap

Constructor already preserves threads and supports logged-in identifiers across devices. Shopify has persistent exploratory carts. An existing saved cart or chat transcript is the comparison.

### Edge

A focused review of changed facts must produce additional eventual first purchasers from the original cohort. Storage and return-visit engagement alone are insufficient.

### Evidence

Official continuity documentation establishes feasibility and direct overlap. The effect of reviewing changes on completed purchases remains unmeasured.

### Experiment

Randomize persistent AI-origin shoppers before the eligible save offer. Compare the decision record with the existing saved-cart flow and follow everyone assigned, including non-savers and non-returners, through a prespecified long buying window. Mature subsequent returns before judging retained value.

### Metric

First completed purchasing shoppers per all assigned eligible shoppers, plus retained orders and contribution. Report return-visit behavior separately without conditioning the primary denominator on it.

### Dependency

Permission to retain the record, stable assignment, versioned catalog facts and reliable voluntary return identification. Keep records editable and deletable.

### Falsifier

Returning users engage more but the full original cohort produces no economically useful additional purchases, or stale decisions create extra returns.

### Impact scenario

For illustration, 5,000 monthly AI visits, unknown multi-visit eligible fraction e, a 2.5% eligible purchase rate and £30 contribution after expected returns imply 125e orders under a one-visit-per-shopper simplification. Deduplicate actual visitors; purchase effects may be zero or negative.

### Value scenario

An unvalidated £99 monthly fee requires 3.3 extra completed orders to break even or 9.9 for a 3x value-to-fee threshold, before storage, verification and setup costs. Use matured cohort value, not faster purchases alone.

### Implementation

Begin with one project category and short explicit retention. Reconfirm only material changes; notifications would require a separate channel choice and experiment.

### Cost control

Store structured decisions and fact versions rather than full transcripts. Revalidate on return and changed catalog records instead of polling every saved project.

### Sources

- [Implement AI Shopping Agent](https://docs.constructor.com/docs/products-ai-shopping-agents-learn-about-ai-shopping-agent-implement-ai-shopping-agent)
- [Identification parameters](https://docs.constructor.com/docs/integrating-with-constructor-behavioral-tracking-identification-parameters)
- [Carts and checkout for agents](https://shopify.dev/docs/agents/carts-and-checkout)

Underlying candidates: constructor-04, burnish-09, geoffy-07, behavioral-09

## I15. Give decided shoppers a quiet path to payment

Psychological | Checkout completion | Develop next | now

### Buyer

A merchant whose ready-to-buy AI referrals still receive optional agent follow-ups, upsells or promotional interruptions.

### Problem

A shopper who has finished deciding can be distracted or delayed by another sales prompt before payment.

### Intervention

Add a readiness control triggered by an explicit request such as buy this or a shopper-selected checkout action. Suppress optional prompts for that session, show a concise order check and continue through the existing checkout route. Keep help and mandatory information accessible.

### Mechanism

Removing unnecessary interruption can help a decided buyer finish a valid order before reconsidering or abandoning.

### Overlap

Gorgias already adapts selling style and assistance to intent. Rebuy already tests cart variants, while Shopify provides checkout continuation. Use the merchant's tuned promotional flow as the baseline.

### Edge

Removing optional interruptions after explicit readiness must add purchasing shoppers while preserving contribution after lost upsell revenue. Keep product selection and decision-clarification policies fixed.

### Evidence

Product documentation establishes control points and an existing experiment comparator. No source establishes the proposed suppression policy's purchase effect.

### Experiment

Randomize persistent AI-origin shoppers immediately after the same explicit readiness cue and before optional promotions appear. Keep selection, clarification policy, offers and prices identical. Count every assigned ready shopper, including those leaving before checkout; follow completed orders and later returns.

### Metric

Purchasing shoppers per all assigned eligible ready shoppers, completed orders and retained contribution. Track help access, accidental checkout starts and revenue lost through fewer optional additions.

### Dependency

Merchant control over all relevant prompts, a clear readiness signal, native checkout continuation and order linkage. Do not infer readiness from emotion or sensitive traits.

### Falsifier

Purchases do not improve enough to clear the declared hurdle, or reduced upsell contribution outweighs the extra orders.

### Impact scenario

Illustrative common inputs: 5,000 AI visits/month, unknown readiness eligible fraction e, a 2.5% eligible purchase rate and £30 contribution after expected returns yield 125e orders. The rate is not a readiness-cohort benchmark. Effects may be zero or negative.

### Value scenario

A £99 monthly fee to test needs 3.3 extra completed orders or 9.9 for a 3x value-to-fee threshold before implementation costs, assuming unchanged contribution per order. Lost upsells can raise that hurdle.

### Implementation

Audit all automatic prompts after checkout intent, then pilot suppression on one route with a visible way to reopen assistance.

### Cost control

Use explicit events and a simple session rule. Avoid a separate intent model unless it demonstrably improves the purchase decision.

### Sources

- [Shopping Assistant explained](https://docs.gorgias.com/en-US/shopping-assistant-explained-1216108)
- [A/B Testing | Smart Cart](https://help.rebuyengine.com/en/articles/10305628-a-b-testing-smart-cart)
- [Carts and checkout for agents](https://shopify.dev/docs/agents/carts-and-checkout)

Underlying candidates: gorgias-08

## I16. Keep a stable, evidence-backed comparison at the decision point

Psychological | Decision support | Develop next | now

### Buyer

A merchant receiving AI-origin shoppers who are comparing a small set of products before making a decision.

### Problem

A conversational answer can replace earlier candidates, bury decisive differences or make an uncertain claim appear settled. The buyer must reconstruct the comparison.

### Intervention

Build a persistent comparison board that keeps buyer-selected alternatives stable. Show decisive requirements, verified limitations, relevant proof images and explicit unknowns. Let the shopper replace an option deliberately while keeping the same supported facts visible.

### Mechanism

A stable, legible account of the real differences can reduce comparison effort and resolve a specific objection before purchase.

### Overlap

Constructor already supports modular agent interfaces and product question answering. Comparison tables and review summaries are established. Compare with the current comparison UI using the same recommendations, facts and prices.

### Edge

More purchasing shoppers must result from stability and correct decisive contrast. Better ranking, longer descriptions or higher confidence scores would confound that claim.

### Evidence

Constructor's interface and product-insight documentation establishes capable overlap. The purchase effect of this particular board remains a hypothesis.

### Experiment

Randomize persistent AI-origin shoppers when the common eligibility rule identifies a comparison-stage journey, before displaying either layout. Keep every assigned shopper, including those who never open the board. Measure completed purchases through the buying window and later returns; predeclare mobile usability and factual-error guardrails.

### Metric

Completed purchasing shoppers per all assigned eligible shoppers, retained orders and contribution. Track wrong-product returns, accessibility failures and comparison completion as diagnostics.

### Dependency

Reliable comparable variant attributes, licensed or merchant-owned evidence, agent UI access and purchase joins. Private external-agent reasoning is unavailable.

### Falsifier

At equal recommendations and facts, the trial rules out a useful retained purchase gain or produces a material decline on mobile.

### Impact scenario

Illustration only: 5,000 AI visits/month, unknown comparison eligible fraction e, a 2.5% eligible purchase rate and £30 contribution after expected returns give 125e baseline orders. Assume one visit per shopper. Additional orders may be zero or negative.

### Value scenario

Test a £99 monthly fee; 3.3 extra completed orders cover it and 9.9 meet a chosen 3x value-to-fee threshold before evidence upkeep and setup. The price is unvalidated.

### Implementation

Start with a narrow category and a few comparable dimensions. Show source dates and unknowns, retain alternatives until the shopper changes them, and test the board on small screens.

### Cost control

Reuse normalized facts and existing images. Generate explanations only when the compared choice or relevant evidence changes.

### Sources

- [Beyond the Search Bar: Enhancing Product Discovery Through AI Agents](https://constructor.com/blog/enhancing-product-discovery-through-ai-agents)
- [AI Product Insights Agent | Constructor](https://constructor.com/solutions/product-insights-agent)

Underlying candidates: constructor-05, profound-07, scrunch-09, geoffy-09, lilyai-09, truefit-06, tinyseo-06

## I17. Show which choices remain suitable when priorities change

Psychological | Decision support | Conditional bet | now

### Buyer

A high-consideration merchant with trustworthy comparable product dimensions and buyers who are unsure about their priorities.

### Problem

A single recommended winner can depend on a fragile assumption, such as how much battery life matters relative to weight. The buyer may reject the recommendation without understanding what would change it.

### Intervention

Build an interactive sensitivity view where shoppers revise consequential assumptions and acceptable preference ranges. Keep hard requirements fixed, show which feasible products remain suitable, and explain the exact tradeoff at which another choice becomes preferable.

### Mechanism

Understanding when a recommendation changes can help a buyer accept a suitable option without pretending uncertain preferences are precise facts.

### Overlap

Zoovu already offers guided buying and configuration; editable filters and comparison matrices are established. Compare against a fixed recommendation and an ordinary editable comparison with the same assortment and facts.

### Edge

The view must produce additional purchasers without making the decision harder. It addresses unstable priorities, separately from missing-fact clarification or presenting current evidence.

### Evidence

Controlled decision-aid research supports a human decision mechanism in a simulated store. Zoovu establishes commercial overlap. Neither supplies contemporary AI-origin purchase lift for this sensitivity view.

### Experiment

Randomize persistent AI-origin shoppers entering the predeclared eligible comparison journey before showing sensitivity controls. Include every assigned shopper, including those leaving controls untouched. Compare completed purchases over the full buying window, then reconcile returns. Run comprehension checks separately before the purchase trial.

### Metric

Purchasing shoppers per all assigned eligible shoppers, retained orders and contribution. Track decision time, abandonment and whether shoppers correctly understand a recommendation reversal.

### Dependency

Comparable units, explicit buyer-controlled preferences, a defensible scoring rule and accessible interaction. Do not claim to expose a private model's reasoning.

### Falsifier

Shoppers cannot explain why the preferred option changes, or the purchase test excludes an economically useful gain over ordinary editable filters.

### Impact scenario

Illustrative inputs: 5,000 AI visits/month, unknown preference-sensitive eligible fraction e, a 2.5% eligible purchase rate and £30 contribution after expected returns imply 125e orders. Assume one visit per shopper. Increased complexity could make the effect zero or negative.

### Value scenario

A £99 monthly test fee needs 3.3 extra completed orders for break-even or 9.9 for a 3x value-to-fee threshold, before design, evidence maintenance and setup costs. This is not a price-demand finding.

### Implementation

Start with two understandable dimensions and buyer-set acceptable ranges. Keep every feasible alternative accessible and avoid selecting defaults according to merchant margin.

### Cost control

Use deterministic sensitivity calculations over a bounded candidate set. Validate simple controls before adding a conversational explanation layer.

### Sources

- [Consumer Decision Making in Online Shopping Environments: The Effects of Interactive Decision Aids](https://doi.org/10.1287/mksc.19.1.4.15178)
- [Zoovu: AI Product Discovery](https://www.zoovu.com/)

Underlying candidates: psychological-02, psychological-01

## I18. Teach the one technical distinction blocking the purchase

Psychological | Decision support | Develop next | now

### Buyer

A technical-goods merchant whose first-time buyers repeatedly misunderstand one consequential specification.

### Problem

Someone shopping for a cable may recognize USB-C yet confuse connector shape with charging capability. Another paragraph of specifications leaves the choice unresolved.

### Intervention

Build an optional demonstration for that specific distinction. Let the shopper choose their device and task, then show the consequence using reviewed manufacturer rules. Keep exceptions visible and checkout accessible throughout; an unanswered example must remain unknown.

### Mechanism

Understanding the distinction lets a suitable novice choose and buy, while reducing purchases based on the wrong assumption.

### Overlap

Constructor already answers product questions and refines intent; Zoovu provides guided buying and product advisors. An interactive lesson needs to outperform their configured explanations and the manufacturer's guide.

### Edge

Test whether manipulating one relevant example resolves confusion better than an equally accurate, equally long answer.

### Evidence

Mechanism hypothesis only. The sources establish substantial existing product guidance, not a measured purchase effect from this demonstration. Expected lift is unknown.

### Experiment

Persistently randomize AI-origin novices after they state the confusion but before either explanation. Compare the demonstration with matched factual text. Count every assigned shopper, including those who skip it. Measure completed purchases within 30 days and follow the full return window. Power from actual novice traffic; six weeks alone is no guarantee.

### Metric

Purchasers per all assigned novices, with catalog-wide orders and contribution after returns. Comprehension is diagnostic; incompatibility returns, accessibility and latency are guardrails.

### Dependency

Manufacturer rules, category review, an accessible merchant-controlled widget and reliable assignment-to-order joins.

### Falsifier

Understanding does not improve, or a sufficiently precise purchase test excludes the minimum gain needed to cover delivery costs.

### Impact scenario

Hypothetically, 20% of 5,000 monthly AI visits qualify. At 2.5% purchase probability, an arbitrary 10% relative gain adds 2.5 orders and £75 at £30 contribution after returns. Zero or negative effects remain possible.

### Value scenario

A £99 monthly test fee needs 3.3 additional orders to break even, or 9.9 for a chosen 3x value-to-cost hurdle, before review and setup costs. This is an unvalidated offer, not willingness-to-pay evidence.

### Implementation

Start with one recurring confusion, a small deterministic example library and a merchant-owned product-page component. Validate exceptions before live assignment.

### Cost control

Reuse reviewed demonstrations and rules instead of generating technical claims for every visitor.

### Sources

- [Learn about AI Shopping Agent](https://docs.constructor.com/docs/products-ai-shopping-agents-learn-about-ai-shopping-agent)
- [Zoovu: AI Product Discovery](https://www.zoovu.com/)

Underlying candidates: psychological-03

## I19. Show measured performance under the shopper's intended conditions

Psychological | Product qualification | Conditional bet | integration-heavy

### Buyer

An equipment merchant with licensed, representative tests of one condition-dependent outcome, such as battery runtime.

### Problem

A headline maximum cannot tell a shopper whether a product will meet their minimum under the load and temperature they expect.

### Intervention

Add a performance comparison using measured ranges under selectable conditions. Show the test count, product revision and supported operating range. Compare the shopper's minimum with the evidence; abstain when their conditions lack coverage. Never present the model's confidence as measured product performance.

### Mechanism

Credible expectations can help suitable buyers proceed and redirect unsuitable buyers before disappointment creates a return.

### Overlap

True Fit already turns apparel outcomes into fit guidance and confidence. Manufacturer test tables are a strong direct comparator for equipment; generic confidence badges offer little differentiation.

### Edge

The narrow bet is a useful, calibrated presentation of non-apparel performance under the buyer's stated conditions.

### Evidence

Hypothesis. Fit-uncertainty research supports the problem, and True Fit documents adjacent practice. Neither establishes purchase lift for this equipment intervention.

### Experiment

Pass independent calibration and subgroup coverage checks first. Randomize eligible AI-origin shoppers to the range display or an accurate specification table using the same facts. Count all assigned shoppers. Measure completed purchases within 30 days, then reconcile returns. Plan enrollment from actual traffic and outcome variance, including enough conditions to detect misleading reassurance.

### Metric

Purchasers per assigned eligible shopper, with retained orders and contribution after returns. Monitor calibration, unsuitable recommendations and performance-related complaints separately.

### Dependency

Representative measurements, reliable condition inputs, expert ownership, version control and return-reason data.

### Falsifier

Held-out measurements fail calibration, or more completed purchases do not survive return and data-acquisition costs.

### Impact scenario

Chosen assumptions: 10% of 5,000 monthly AI visits qualify, their baseline purchase probability is 2.5%, and an arbitrary 20% relative improvement adds 2.5 orders. At £30 after-return contribution that is £75. No gain, or a loss, is possible.

### Value scenario

An unvalidated £99 monthly fee requires 3.3 extra orders before measurement and integration costs; the 3x hurdle needs 9.9. Expensive testing can make this uneconomic even when the display helps shoppers.

### Implementation

Choose one measurable outcome and one equipment family. Publish reviewed test strata first; introduce statistical interpolation only after independent validation.

### Cost control

License existing tests where suitable and collect new measurements only where missing coverage blocks a material buying decision.

### Sources

- [Fit Intelligence Technical Spec, Data & MCP | True Fit](https://www.truefit.com/fit-intelligence-spec)
- [Product Fit Uncertainty in Online Markets: Nature, Effects, and Antecedents](https://doi.org/10.1287/isre.2014.0520)

Underlying candidates: psychological-04

## I20. Send a small physical sample that resolves the stated doubt

Psychological | Experiential qualification | Conditional bet | integration-heavy

### Buyer

A finish or fabric merchant with representative samples and an existing fulfillment operation.

### Problem

The shopper's remaining doubt is physical: texture, opacity or appearance in their room. More generated copy cannot settle it.

### Intervention

Offer a small comparative kit selected around the shopper's explicit question. Include the actual product identities, neutral comparison instructions and full-size prices. Save their shortlist so they can choose either product or neither after trying it. Samples themselves never count as conversion success.

### Mechanism

A relevant physical comparison may resolve enough uncertainty to create a full-size purchase that a generic sample assortment would miss.

### Overlap

Samplize already supplies physical paint samples. SoPost provides sampling, targeting and purchase pathways. Fulfillment orchestration is established competition; the proposed improvement is the kit's discriminating comparison.

### Edge

Beat a generic kit at equal shopper credit and fulfillment budget on additional full-size purchasing households.

### Evidence

Hypothesized purchase effect. Samplize and SoPost establish operational feasibility and competition, not causal gains from this particular kit design.

### Experiment

Randomize eligible AI-origin households before offering either kit and persist assignment. Include refusals, unclaimed kits and nonresponders. Compare completed full-size purchases within 60 days, followed through returns. Power on independent households and allow shipping time. A separately powered no-kit comparison is needed before expanding sampling to a new population.

### Metric

Full-size purchasing households per all assigned households, with catalog-wide contribution after returns, sample cost, waste and decision delay.

### Dependency

Representative samples, reliable delivery, household deduplication, equal-cost comparator kits and full-size order linkage.

### Falsifier

Sample engagement rises without useful full-size purchase gains, or incremental contribution fails to cover the complete delivery cost.

### Impact scenario

Illustratively, 10% of 5,000 monthly AI visits represent 500 distinct eligible households. At a 2.5% baseline, an arbitrary 20% relative gain adds 2.5 full-size orders and £75 at £30 contribution after returns. The result may be zero or negative.

### Value scenario

A £99 monthly test fee needs 3.3 extra orders, or 9.9 at 3x value, before incremental kit costs. Equal comparator costs cancel in the difference; rollout feasibility still needs the full sampling bill. Price acceptance is untested.

### Implementation

Begin with one frequent sensory tradeoff and two existing samples, using the merchant's current sample ordering and saved-shortlist flow.

### Cost control

Minimize sample weight and unnecessary variants. Count shipping, handling, credits, waste and amortized integration explicitly.

### Sources

- [Samplize FAQ](https://samplize.com/pages/faq)
- [Digital Sampling Solutions | SoPost](https://sopost.com/solutions/)

Underlying candidates: psychological-06

## I21. Restore documented risk context before a legitimate checkout is declined

Algorithmic | Checkout completion | Conditional bet | integration-heavy

### Buyer

The payments lead at a UCP-enabled retailer with an observed transaction-context mapping defect.

### Problem

The risk provider may receive incomplete documented context from an agent checkout, causing a technical integration failure to resemble a risky purchase.

### Intervention

Build a version-aware adapter that restores only documented context actually supplied by UCP. Shadow-replay redacted cases, then repair the approved mapping with fraud policy unchanged. Never reconstruct missing AVS, CVV or 3DS verification, or interpret null as low risk. Tolerate unknown optional keys.

### Mechanism

Correct context can recover legitimate purchases lost to the defect, provided the additional approvals do not create offsetting fraud losses.

### Overlap

Google supplies contextual signals already, while the merchant's payment and risk provider addresses false declines. A correctly configured native adapter is the active benchmark.

### Edge

This needs a reproducible merchant-specific defect that the current approved integration leaves unresolved.

### Evidence

Hypothesis only. Google's risk, error and lifecycle documents establish the integration contract. They do not establish excess false declines in UCP traffic.

### Experiment

After shadow validation and provider approval, randomize AI-origin buyers at their first eligible low-risk checkout between approved adapters, before the risk decision. Persist buyer assignment and deduplicate retries. Include all assigned buyers. Follow completed settled purchases through returns and chargeback maturity, potentially beyond 90 days; power fraud-loss guardrails separately and report missing legitimacy labels. Define low-risk eligibility using pre-treatment criteria common to both adapters, never treatment-generated scores.

### Metric

Legitimate settled purchasers per assigned eligible buyer, plus total completed orders, mature fraud losses and contribution. Approval rate alone cannot establish success.

### Dependency

Merchant and risk-provider approval, documented capability versions, secure minimized logs and mature dispute labels.

### Falsifier

No defect is confirmed, legitimate purchases do not increase, or added fraud and chargeback costs erase the recovered contribution.

### Impact scenario

The eligible checkout subset of 5,000 monthly AI visits is unknown; applying the 2.5% whole-visit example would misstate it. Hypothetically, D extra legitimate orders yield £30D after ordinary returns, less additional fraud losses F. D can be zero or negative.

### Value scenario

An unvalidated £99 monthly test fee breaks even when £30D exceeds £99 plus F and implementation cost K. With F=K=0, that is 3.3 orders; 3x value needs 9.9. Delayed losses can reverse an early apparent win.

### Implementation

Start with one provider, one documented field mismatch and an audited adapter release. Avoid changing risk thresholds during the mapping experiment.

### Cost control

Reuse existing risk decisions and deterministic field mapping; avoid building another fraud model. Measure recurring recoverable losses before subscription pricing; a one-time native correction supports project pricing.

### Sources

- [Risk signals implementation](https://developers.google.com/merchant/ucp/implementation/2026-04-08/risk-signals)
- [Error codes](https://developers.google.com/merchant/ucp/guides/overview/error-codes)
- [Order lifecycle implementation](https://developers.google.com/merchant/ucp/implementation/2026-04-08/order-lifecycle)

Underlying candidates: google-10

## I22. Explain supported reasons why authentic reviews disagree

Psychological | Decision support | Conditional bet | integration-heavy

### Buyer

A merchant with licensed authentic reviews, identifiable product revisions and recurring buyer questions about conflicting experiences.

### Problem

One review praises the product and another rejects it. An average sentiment score does not show whether the disagreement concerns the shopper's intended use.

### Intervention

Build a small comparison of the conflicting evidence, showing exact product version, reported conditions and relevant review counts. Link to the originals and preserve negative findings. Explain a difference only when facts support it; otherwise state that the conflict remains unresolved and offer a factual next check.

### Mechanism

A supported explanation can resolve a specific buying doubt or help the shopper choose a more suitable catalog alternative.

### Overlap

Amazon already presents positive and negative review aspects and source quotations; shopping assistants synthesize reviews. The baseline is a competent aspect summary using the same review set.

### Edge

Expose the conditions behind a real contradiction without inventing reviewer motives or explaining away a defect.

### Evidence

Hypothesis. Amazon documents existing summaries, and fit-uncertainty research motivates the problem. No source supplies this intervention's purchase lift.

### Experiment

Randomize AI-origin shoppers who state a review contradiction before either view appears. Keep review coverage identical and include every assigned shopper. Measure any catalog purchase completed within 30 days, then follow returns. Power from the eligible cohort and independently audit explanations; clicks and helpfulness votes remain secondary.

### Metric

Purchasers per all assigned eligible shoppers, with after-return contribution, omitted-negative audits, unsupported explanations and mismatch complaints.

### Dependency

Review rights, product-version matching, useful context coverage, expert audits and persistent order linkage.

### Falsifier

Explanations require unsupported assumptions, or a precise test excludes useful purchase gains while decision effort or returns rise.

### Impact scenario

Under chosen assumptions, 10% of 5,000 monthly AI visits qualify and buy at 2.5%. An arbitrary 10% relative improvement adds 1.25 orders and £37.50 at £30 contribution after returns. Zero gain and purchase losses remain possible.

### Value scenario

A £99 monthly pilot would need 3.3 extra orders before review licensing and audits, or 9.9 at a 3x value hurdle. The illustrative gain misses both targets. This price has no demonstrated market acceptance.

### Implementation

Begin with manually reviewed explanations for a handful of recurring product-version disputes. Keep an explicit unresolved state in the interface.

### Cost control

Reuse approved product-level explanations until evidence changes; do not regenerate a speculative story for each visitor.

### Sources

- [How Amazon is making it easier to shop by leveraging GenAI and AgenticAI](https://www.aboutamazon.com/news/retail/amazon-agentic-ai-gen-ai-shopping)
- [Product Fit Uncertainty in Online Markets: Nature, Effects, and Antecedents](https://doi.org/10.1287/isre.2014.0520)

Underlying candidates: psychological-08

## I23. Route unresolved buying tasks to an available specialist

Behavioral | Assisted conversion | Develop next | integration-heavy

### Buyer

A high-consideration merchant with staffed product specialists and enough unresolved AI-origin buying tasks to evaluate routing.

### Problem

Repeated bot answers leave the task unfinished; a generic transfer then makes the shopper start again with someone who lacks the right expertise.

### Intervention

Classify the unresolved task from attempted checks, match it to an available specialist and show an honest wait estimate. With the shopper's agreement, transfer a minimal brief containing the candidate products, failed checks and sourced facts. Honor explicit human requests in every arm.

### Mechanism

A specialist who can finish the actual task may recover a purchase before repetition or waiting drives the shopper away.

### Overlap

Gorgias already hands conversations to humans; Intercom Fin supports procedures and escalation. Competent existing routing at equal staffing is the comparator.

### Edge

Better task selection and context transfer must create additional purchasers within the same expert capacity.

### Evidence

Hypothesized effect. Incumbent documentation establishes workflow overlap. Gorgias's assistant attribution excludes human handovers in its stated window, making that metric unsuitable for this experiment.

### Experiment

Randomize independent queue-shift blocks between current routing and the optional proactive policy, with equal scheduled staffing and bounded queue carryover. Enroll all eligible AI-origin users before escalation, including those who decline. Measure completed purchases within 14 days, followed through returns. Power on independent blocks and track wait spillovers into both policies.

### Metric

Purchasers per all eligible assigned users, including human-assisted orders; team-wide completed orders, after-return contribution, handling time and waiting are guardrails.

### Dependency

Real specialist capacity, skills and queue APIs, approved context sharing and purchase linkage across handovers.

### Falsifier

The purchase advantage disappears at equal staffing or after counting abandoned waits, displaced control work and the whole eligible cohort.

### Impact scenario

Illustratively, 10% of 5,000 monthly AI visits qualify, with 2.5% baseline purchasing. An arbitrary one-percentage-point improvement adds five orders and £150 at £30 contribution after returns. Zero or negative effects are possible if queues worsen.

### Value scenario

A £99 monthly test price needs 3.3 extra orders, or 9.9 at 3x value, before extra labor and integration. Equal staffing controls the trial comparison; any rollout staffing increase must be costed. Willingness to pay is unknown.

### Implementation

Connect one helpdesk to two specialist task types. Replay failed conversations to validate routing before enabling the optional offer.

### Cost control

Transfer usable context and limit duplicate investigation. Do not optimize deflection at the expense of purchases.

### Sources

- [Building Fin Procedures](https://www.intercom.com/help/en/articles/13449439-building-fin-procedures)
- [Shopping Assistant explained](https://docs.gorgias.com/en-US/shopping-assistant-explained-1216108)
- [How metrics are calculated: AI & automation](https://helpcenter.gorgias.com/en-US/how-metrics-are-calculated-ai-and-automation-5666070)

Underlying candidates: behavioral-05, truefit-08, gorgias-09

## I24. Turn an unanswered buying question into a reusable supplier fact

Infrastructural | Assisted conversion | Develop next | integration-heavy

### Buyer

A specialist retailer whose staff or suppliers can verify product facts missing from the catalog.

### Problem

A real knowledge gap blocks the purchase, such as an unknown internal width. Repeating a vague answer or opening another full support conversation does not obtain the evidence.

### Intervention

Create a precise SKU-and-revision request for the smallest useful document, photograph or measurement. A specialist supplies evidence and approves the answer. Resume the shopper's saved decision through their chosen channel, then reuse the product fact with provenance and an expiry rule. Preserve unfavorable answers too.

### Mechanism

Obtaining and delivering the missing fact lets shoppers complete a decision; approved reuse can serve later buyers without repeating the investigation.

### Overlap

Intercom Fin can pause for teammate input and resume procedures. Gorgias answers product questions and hands off. A configured support workflow is a stronger comparator than unanswered chat.

### Edge

Acquire useful evidence and return it to the live buying task at a fixed expert budget.

### Evidence

Mechanism hypothesis. The cited helpdesk documentation establishes existing workflow support, not additional purchases from pooling supplier fact requests.

### Experiment

Assign product-question clusters to the evidence request or current support workflow before eligible AI-origin requests arrive. Use broader clusters where one answer would contaminate others. Include all eligible requesters, including unanswered cases. Compare completed purchases within 21 days, followed through returns; power on independent clusters and account for cross-cluster shoppers.

### Metric

Purchasers per all assigned eligible requesters, with catalog-wide orders, after-return contribution, response delay, incorrect reuse and specialist minutes.

### Dependency

Cooperating suppliers, revision identity, acceptable evidence standards, helpdesk access and shopper-approved continuation. Exclude unsupported safety-critical measurements.

### Falsifier

The queue produces no timely usable answers, or reduced support effort fails to produce a useful purchase increase.

### Impact scenario

Assume 5% of 5,000 monthly AI visits qualify and their baseline purchase probability is 2.5%. An arbitrary 20% relative improvement adds 1.25 orders and £37.50 at £30 contribution after returns. Waiting and wrong reuse can make the effect negative; zero is possible.

### Value scenario

A hypothetical £99 monthly fee needs 3.3 additional orders before new expert work and integration; 9.9 meets the 3x value hurdle with no other costs. The example does not meet either threshold, and willingness to pay is untested.

### Implementation

Start with one supplier and a recurring noncritical question. Require evidence acceptance and a working return path before adding automated prioritization.

### Cost control

Pool genuinely equivalent questions and retain only approved product facts, not shoppers' private context.

### Sources

- [Human-in-the-loop approvals for Fin Procedures](https://www.intercom.com/help/en/articles/14468561-human-in-the-loop-approvals-for-fin-procedures)
- [Shopping Assistant explained](https://docs.gorgias.com/en-US/shopping-assistant-explained-1216108)

Underlying candidates: behavioral-04, datafeedwatch-10, feedonomics-10, lilyai-08, algorithmic-07

## I25. Repair product identity collisions across feeds and offers

Identity | Discovery and offer integrity | Develop next | integration-heavy

### Buyer

A multichannel merchant with reproducible examples of regional models, packs or conditions grouped incorrectly in shopping results.

### Problem

Each feed row can look valid while conflicting identifiers cause an engine to combine materially different offers, concealing the item the shopper could buy.

### Intervention

Trace one published collision through manufacturer identity, registered GTIN, pack content, region, condition and offer IDs. Repair merchant-owned source records with authoritative evidence, submit through supported feeds and check the resulting public representation. Never invent an identifier or treat feed acceptance as proof of corrected exposure.

### Mechanism

Accurate grouping can restore qualified discovery and prevent shoppers reaching an offer that contradicts the product they selected.

### Overlap

DataFeedWatch identity review, GS1 verification and native item/group/offer mappings already address identifiers. The proposed difference is tracing an observed contradiction across individually plausible sources.

### Edge

Resolve a demonstrated grouping failure that a competent existing feed review leaves unresolved.

### Evidence

Hypothesis only. GS1 and OpenAI document identity mechanisms; neither quantifies purchases lost to this defect class.

### Experiment

Randomize sufficiently independent suspect product-family clusters before public changes, comparing investigative workflows at equal labor budgets. Fix confirmed material inaccuracies promptly in both arms. Compare completed AI-origin orders per assigned family-week, with all-channel portfolio orders and returns. Allow recrawl and buying delays; cluster power and substitution checks are required. Do not condition the estimate on post-change arrivals.

### Metric

Completed orders across fixed assigned clusters and weeks, followed through returns and contribution reconciliation. Track attribution coverage, visibility loss and purchases shifting between substitute families.

### Dependency

Observed collisions, rights to correct identifiers, authoritative reference data, supported downstream distinctions and enough independent clusters.

### Falsifier

Native mapping already resolves the defect, or verified representation changes fail to add purchases beyond the incumbent workflow.

### Impact scenario

Use fixed portfolio outcomes because discovery can change arrivals. Hypothetically, five extra completed orders per affected portfolio-month yield £150 at £30 contribution after returns. This is a chosen scenario, not a forecast; zero orders or losses are possible. The 5,000-visit model cannot identify the acquisition effect.

### Value scenario

An unvalidated £99 monthly fee needs 3.3 extra orders before investigative and integration costs; 3x value needs 9.9. Charge against the additional value over competent feed maintenance, not all sales of repaired products.

### Implementation

Build a collision evidence record and repair one supported export path first. Keep public identity repair separate from arrival variant-state recovery.

### Cost control

Investigate reproducible high-impact conflicts and reuse existing feed tooling instead of replacing every export.

### Sources

- [What is Verified by GS1?](https://support.gs1.org/support/solutions/articles/43000734077-what-is-verified-by-gs1-)
- [Products](https://developers.openai.com/commerce/specs/file-upload/products)
- [Pricing - DataFeedWatch](https://www.datafeedwatch.com/pricing)

Underlying candidates: datafeedwatch-08, simprosys-08, identity-01

## I26. Keep seller provenance and promises attached to the exact offer

Identity | Trust and terms | Develop next | integration-heavy

### Buyer

A brand or authorized retailer whose seller-sensitive journeys involve several documented offers or warranty arrangements.

### Problem

The product stays the same while the selected offer changes, leaving the shopper uncertain whose warranty, condition statement or return policy applies.

### Intervention

Bind seller, model, region, condition, warranty provider and policy version to the exact offer ID. Show material differences when the offer changes and let the buyer confirm. Publish authorization evidence only where verified; missing evidence remains unknown. A GTIN match does not authenticate the physical item.

### Mechanism

Knowing which promises accompany the purchasable offer can resolve a trust question before checkout and reduce later disputes.

### Overlap

OpenAI already passes selected merchant offer IDs and requires authoritative offer data. Google supports offer-specific policy overrides. Existing compliant offer presentation and trust evidence are the baseline.

### Edge

Preserve verified promises through a demonstrated handoff failure, beyond merely adding a seller badge.

### Evidence

Hypothesized effect. The native specifications show how identity and policy information can be represented; no purchase gain from this continuity check has been measured.

### Experiment

Persistently randomize eligible AI-origin shoppers before presenting multi-offer choices. Compare current compliant presentation with the continuity check, keeping mandatory disclosures and commercial terms equal. Count all assigned shoppers, not just those switching offers. Measure merchant purchases completed within 30 days and follow the return window; power from actual seller-sensitive traffic.

### Metric

Purchasers per assigned eligible shopper, with retained orders, after-return contribution, disputes and confirmation abandonment. Orders outside the paying buyer's commercial perimeter do not become its sales.

### Dependency

Reliable seller-policy records, stable offer IDs, publication rights and supported merchant or partner checkout access.

### Falsifier

Existing presentation already preserves the promises, or the extra confirmation creates more lost purchases than the check recovers.

### Impact scenario

For illustration, 5% of 5,000 monthly AI visits qualify at a 2.5% baseline purchase probability. An arbitrary 20% relative gain means 1.25 additional orders and £37.50 at £30 after-return contribution. Zero or negative effects remain possible.

### Value scenario

A £99 monthly test fee requires 3.3 extra orders to break even or 9.9 at 3x value, excluding verification and integration costs. Fewer disputes may add separate value, but cannot replace evidence of added purchases. Price acceptance is unknown.

### Implementation

Start with one known seller or warranty transition on merchant-owned pages. Retain the selected offer and its verified policy version through checkout.

### Cost control

Recheck records when an offer or policy changes, rather than repeating a full provenance investigation each visit.

### Sources

- [Product checkout conversion spec](https://developers.openai.com/plugins/guides/product-checkout-conversion-spec)
- [Products](https://developers.openai.com/commerce/specs/file-upload/products)
- [Merchant Return Policy Structured Data](https://developers.google.com/search/docs/appearance/structured-data/return-policy)

Underlying candidates: searchpilot-07, smartseo-07, regulatory-03, identity-02

## I27. Repair an exact partner-offer failure after incumbent routing

Infrastructural | Selection recovery | Conditional bet | integration-heavy

### Buyer

A manufacturer with partner order-receipt agreements and a documented failure in its configured retailer-routing service.

### Problem

The brand's locator points to the wrong regional model or stale offer even though a partner can fulfill the exact requested product.

### Intervention

Add a final, authoritative partner check for the exact regional SKU, condition, authorization, stock and destination before handoff. If the selected offer fails, show verified alternatives with explicit prices and terms. Preserve buyer choice and distinguish unknown stock from unavailable stock.

### Mechanism

Repairing an observed final-handoff defect may create a brand purchase that the existing locator would otherwise lose.

### Overlap

PriceSpider/Wayvia already provides retailer routing, inventory-aware experiences and purchase tracking. Its current page explicitly addresses AI shopping. Generic stock checks, pickup and attribution cannot be sold as the edge.

### Edge

Proceed only after proving a model, region or freshness failure beyond a correctly configured incumbent on the same retailer network.

### Evidence

Conditional hypothesis. Vendor documentation establishes strong overlap and tracking capabilities, not an incremental purchase effect for this repair.

### Experiment

Randomize AI-origin shoppers at the brand's page, after pre-treatment direct-unavailability eligibility but before routing, to configured PriceSpider/Wayvia or the added check. Include everyone assigned. Compare completed brand purchases across direct and participating retail channels over a full buying cycle, then returns. Power from eligible shoppers and receipt coverage; keep missing retailer outcomes unknown.

### Metric

Brand purchasing shoppers per all assigned eligible shoppers, with total brand orders and the manufacturer's channel-specific contribution. Retailer clicks, seller switching and shifted direct orders are not added demand.

### Dependency

A demonstrated incumbent miss, authoritative partner offer APIs, product mapping, permitted receipts and enough cross-channel outcome coverage.

### Falsifier

Correct incumbent configuration fixes the issue, no additional brand purchasers appear, or lost direct margin and data costs erase value.

### Impact scenario

Illustratively, 10% of 5,000 monthly AI visits qualify at 2.5% baseline brand purchasing. An arbitrary 20% relative gain adds 2.5 orders. £75 follows only if the manufacturer's realized contribution after returns is £30 per added order; retail basket value cannot supply that margin. Zero or losses remain possible.

### Value scenario

At £30 manufacturer contribution, an unvalidated £99 fee needs 3.3 extra brand orders before data costs, or 9.9 at 3x value. Recalculate with actual wholesale and direct margins; moving orders to another retailer creates no automatic benefit.

### Implementation

Pilot one reproducible offer failure and one cooperating partner. Retain the incumbent network and add the verified check immediately before handoff.

### Cost control

Pay for targeted authoritative checks and receipt coverage only where the incumbent gap is demonstrated.

### Sources

- [Shoppable Media & Where to Buy Platform | Wayvia](https://www.pricespider.com/where-to-buy/)
- [How PriceSpider's Universal Tracking Suite Works](https://www.pricespider.com/blog/how-pricespiders-universal-tracking-suite-works/)

Underlying candidates: peec-07, profound-04, scrunch-07, channable-09, regulatory-01

## I28. Preserve the organization, quote and approval needed to buy

Identity | Purchase authority | Conditional bet | integration-heavy

### Buyer

A B2B distributor with an approved assistant route and failed handoffs between product selection, quotes and purchasing approval.

### Problem

The right products reach an approver under the wrong company location, price list or quote version, so a valid request stalls or must be rebuilt.

### Intervention

Ask the authorized buyer to choose the purchasing location and project. Carry required technical sign-offs into native draft orders and bind approval to the quoted products, quantities, terms and version. Recheck material changes before payment and return changed quotes for approval through the existing authorized flow.

### Mechanism

Preserving the context needed to approve and pay can turn a valid purchasing request into a completed order without changing its commercial terms.

### Overlap

Shopify B2B already contextualizes pricing by company location and supports draft orders for approval. A competent native quote or procurement workflow is the direct benchmark.

### Edge

Fix a demonstrated cross-system loss of purchasing context, beginning with one merchant integration.

### Evidence

Hypothesis. Shopify documents the native primitives; their existence does not establish a remaining defect or additional AI-origin purchases.

### Experiment

Randomize independent organization-location purchasing projects before the handoff; cluster at organization where approvers overlap. Compare current native approval with preserved context at identical terms. Count all eligible assigned requests, including unapproved ones. Measure paid completed orders over the normal buying cycle, then cancellations and returns. Enrollment and power depend on independent organizations and payment maturity.

### Metric

Paid purchasing projects per assigned eligible project, with merchant-wide contribution after returns. Draft acceptance and purchase-order issuance remain leading indicators.

### Dependency

Native B2B permissions, explicit organization delegation, quote-version joins and access to the existing approval system. Only an authorized payer finalizes purchases.

### Falsifier

Native workflows already retain the required context, or better draft completion does not create additional paid orders.

### Impact scenario

Five thousand monthly AI visits cannot establish the number or conversion rate of independent B2B projects. A chosen scenario of five additional paid projects at £30 contribution after returns yields £150; replace that margin and denominator with actual B2B data. Zero and negative outcomes remain possible.

### Value scenario

An unvalidated £99 monthly test fee requires 3.3 extra orders at £30 contribution before integration and approval work; 3x value requires 9.9. Longer payment cycles delay both verification and payback.

### Implementation

Use native company, contact and location records. Add quote-bound context to one failing handoff; keep cross-distributor procurement outside this pilot.

### Cost control

Reuse the merchant's roles and approval interface, avoiding duplicate organization directories and manually reconstructed quotes.

### Sources

- [Headless with B2B](https://shopify.dev/docs/storefronts/headless/bring-your-own-stack/b2b)
- [Use draft orders](https://shopify.dev/docs/apps/build/b2b/draft-orders)

Underlying candidates: identity-07, behavioral-10

## I29. Resolve joint buyers' conflicting requirements before checkout

Identity | Decision support | Conditional bet | integration-heavy

### Buyer

A furniture or home-equipment merchant whose adult customers often make a genuinely joint purchase.

### Problem

A promising shortlist leaves another decision maker's objection undiscovered until checkout. A shared chat can still favor whoever states their preferences first.

### Intervention

Offer a voluntary shared decision with private entry of non-negotiable requirements and acceptable tradeoffs. Each participant controls what becomes shared. Compare products satisfying the agreed constraints and show unresolved conflicts plainly. Participants send their own invitations; the service does not infer relationships or payment authority.

### Mechanism

Resolving a concrete disagreement earlier may help a group make a mutually acceptable purchase instead of abandoning the decision.

### Overlap

IKEA Kreativ already supports saved and shared designs. Shared shortlists and collaborative-shopping tools provide a credible baseline; private constraint elicitation needs to earn its added effort.

### Edge

Produce more mutually accepted purchasing groups than the same shortlist, product facts and ordinary group chat.

### Evidence

Hypothesis. The cited collaborative-shopping laboratory study concerns coordination, while IKEA establishes existing sharing. Neither measures this intervention's incremental purchases.

### Experiment

Randomize eligible AI-origin initiating buyers before invitation or preference entry, and persist assignment for their group. Compare private elicitation with a shared shortlist and chat. Include invitations never accepted. Measure completed group purchases within 60 days, followed through returns. Power on independent groups rather than participants and deduplicate orders across group members.

### Metric

Purchasing groups per all assigned initiating groups, with later satisfaction, after-return contribution, time to decision, privacy errors and conflict complaints.

### Dependency

Voluntary adult participation, explicit sharing permissions, group-level assignment, constraint logic and consented shared-order linkage.

### Falsifier

The added process delays or reduces purchases, or a sufficiently precise trial excludes the minimum useful gain over ordinary sharing.

### Impact scenario

Hypothetically, 5% of 5,000 monthly AI visits each initiate a distinct eligible group. At 2.5% baseline purchasing, an arbitrary 20% relative gain adds 1.25 orders and £37.50 at £30 contribution after returns. Nonparticipation can leave no gain; surfaced conflict can reduce purchases.

### Value scenario

A proposed £99 monthly fee requires 3.3 extra group orders before support and integration costs, or 9.9 at 3x value. These thresholds use one order per additional purchasing group and do not establish willingness to pay.

### Implementation

Start with a saved furniture shortlist and a few explicit dimensions such as size and finish. Keep agreement distinct from authority to pay.

### Cost control

Use deterministic constraint comparisons and task-limited sharing, rather than a persistent social profile or open-ended group agent.

### Sources

- [Let's shop online together: An empirical investigation of collaborative online shopping support](https://hub.hku.hk/handle/10722/270326)
- [IKEA launches new AI-powered, digital experience](https://www.ikea.com/us/en/newsroom/corporate-news/ikea-launches-new-ai-powered-digital-experience-empowering-customers-to-create-lifelike-room-designs-pub58c94890/)

Underlying candidates: psychological-09, identity-08

## I30. Keep gift intent separate from the buyer's own preferences

Identity | Personalized selection | Develop next | integration-heavy

### Buyer

A gift-heavy merchant that controls the inputs and feedback labels used by its shopping personalization.

### Problem

A gift task can inherit the buyer's own tastes and sizes, then incorrectly teach the system that the gift reflects those same preferences.

### Intervention

Add an explicit gift-task flag with temporary editable preferences. Suppress only conflicting self-history features during that task, and label gift events separately when updating the buyer's profile. Let the shopper clear the scope easily. Use the preferences they supply without identifying or building a profile of the recipient.

### Mechanism

Relevant gift choices may create additional purchases, while cleaner feedback can prevent the gift from damaging later self-shopping recommendations.

### Overlap

Constructor already combines purchase history, contextual signals and clickstream personalization. Its tuned existing setup, including any configured gift handling, is the benchmark.

### Edge

Test feature isolation and feedback labeling, rather than treating a gift chat prompt as a new capability.

### Evidence

Hypothesis. Constructor documents the history/context interaction and identifiers. The sources do not establish that its current gift handling is defective or quantify purchase gains.

### Experiment

Among AI-origin shoppers who explicitly declare a gift task, persistently randomize account or browser assignment before recommendations. Compare current personalization with isolated task features. Count all assigned shoppers, including those who abandon or clear the scope. Measure gift purchases completed within 14 days, returns and all self-shopping purchases over 60 days. Power from eligible gift traffic and stratify seasonal periods.

### Metric

Gift purchasers per assigned eligible shopper, with total account orders and after-return contribution. Later self-shopping regression is a release guardrail.

### Dependency

Control over personalization features and training labels, explicit task context, stable assignment and reliable order linkage.

### Falsifier

Current context already handles gifts adequately, or more gift orders are offset by worse total purchasing outcomes.

### Impact scenario

Choose 20% eligibility among 5,000 monthly AI visits and a 2.5% eligible purchase probability. An arbitrary 10% relative gain adds 2.5 orders and £75 at £30 contribution after returns. This is a sensitivity calculation; zero or negative effects are possible when useful history is suppressed.

### Value scenario

An unvalidated £99 monthly fee needs 3.3 extra orders before implementation costs, or 9.9 for 3x value. Do not count a speculative future personalization benefit as measured contribution or market willingness to pay.

### Implementation

Start with one gift-heavy category and a small set of demonstrably conflicting history features. Audit downstream training labels as well as the live recommendations.

### Cost control

Reuse the existing recommendation engine and event stream; avoid a separate recipient profile or model for every gift.

### Sources

- [Learn about AI Shopping Agent](https://docs.constructor.com/docs/products-ai-shopping-agents-learn-about-ai-shopping-agent)
- [Identification parameters](https://docs.constructor.com/docs/integrating-with-constructor-behavioral-tracking-identification-parameters)

Underlying candidates: constructor-08

## I31. Refresh fit advice when the garment's construction changes

Temporal | Product qualification | Conditional bet | integration-heavy

### Buyer

An apparel brand that reuses style names and can identify manufacturing revisions to cut or fabric.

### Problem

A previously successful garment becomes a misleading size reference after its construction changes, while familiar names make the old advice appear relevant.

### Intervention

Tie reference-garment advice to the actual manufacturing revision. When a declared change or outcome alert appears, obtain an independent sample measurement before invalidating old links. Quarantine unsupported references and publish revised fit advice with its evidence version. Customer-mix changes alone cannot confirm garment drift.

### Mechanism

Current fit evidence may let suitable shoppers buy confidently instead of abandoning after inconsistent advice or buying a size that disappoints.

### Overlap

True Fit already learns from purchase and return outcomes and offers dynamic size charts. Whether it already handles the merchant's revision boundary is unknown; test against its configured current model.

### Edge

Act on a verified construction change sooner and more accurately than existing fit guidance, without excessive false alerts.

### Evidence

Hypothesized purchase effect. True Fit's specification and shopping-agent page establish mature outcome-based competition, not superiority for the proposed revision handling.

### Experiment

Before rollout, identify genuine revision cohorts using manufacturing records and blinded measurements. Randomize independent product-version clusters to revised handling or current guidance, balancing category and launch timing. Count all eligible AI-origin shoppers assigned at first exposure. Measure completed purchases over the buying window, then full returns; plan cluster power and account for shoppers crossing product groups.

### Metric

Purchasers per all assigned eligible shoppers, plus suitable retained orders, after-return contribution, false alerts and sizing complaints. Fewer returns alone are not additional purchases.

### Dependency

Reliable version identities, manufacturing cooperation, independent measurements, enough revised-product traffic and mature order/return joins.

### Falsifier

Measurements fail to confirm the alerts, or genuine-change cohorts show no useful purchase gain over current True Fit guidance.

### Impact scenario

Assume 5% of 5,000 monthly AI visits encounter eligible changed garments and purchase at 2.5%. An arbitrary 20% relative gain adds 1.25 orders and £37.50 at £30 contribution after returns. No gain or harm from false invalidation remains possible.

### Value scenario

A £99 monthly test price requires 3.3 extra orders before measurement and integration costs; 9.9 meets 3x value. Any separate return saving must be reconciled without double-counting the £30 contribution. Willingness to pay is unknown.

### Implementation

Pilot one repeated style with trustworthy revision records. Invalidate only stale garment references; leave generic catalog enrichment outside the product.

### Cost control

Use targeted sample measurements when evidence suggests a real change, rather than remeasuring the whole assortment.

### Sources

- [Fit Intelligence Technical Spec, Data & MCP | True Fit](https://www.truefit.com/fit-intelligence-spec)
- [AI Shopping Agent for Apparel & Footwear | True Fit](https://www.truefit.com/conversation-fit-agent)

Underlying candidates: truefit-04

## I32. Make a no-match garment purchasable through a real alteration

Behavioral | Assortment extension | Conditional bet | integration-heavy

### Buyer

An apparel merchant with an operating alteration service, reliable capacity and clear remedy terms.

### Problem

An otherwise suitable in-stock garment fails the shopper's length requirement, so the assistant rejects it before considering the merchant's real shortening service.

### Intervention

Search allowable garment-and-service combinations against the stated finished length and deadline. Show finished-dimension tolerance, service price, lead time and applicable return terms. Require confirmation before adding the existing alteration option. Shortening must never stand in for an incompatible waist, rise or cut.

### Mechanism

A feasible alteration turns some real no-match tasks into purchasable options without inventing stock or promising unsupported tailoring.

### Overlap

UNIQLO already offers online alterations on eligible bottoms; True Fit supplies fit guidance. Compare with competent product search plus the merchant's existing alteration offer.

### Edge

Discover the feasible combined option early enough to prevent a no-match abandonment, while delivering the promised result.

### Evidence

Mechanism hypothesis. UNIQLO establishes that this service exists and carries operational terms; it provides no causal lift estimate for agent discovery.

### Experiment

Randomize adult AI-origin shoppers with a pre-treatment no-match length constraint before presenting alternatives. Keep access to the existing alteration service in both arms and count every assigned shopper. Measure completed purchases within 30 days, then delivery, satisfaction, remakes and returns. Power from eligible no-match traffic and include service-capacity effects across arms.

### Metric

Purchasers per all assigned eligible shoppers, with delivered satisfactory purchases and contribution after service, remakes and returns. Restricted returns cannot establish improved satisfaction or retention.

### Dependency

Supported garment dimensions, trustworthy target measurements, actual alteration capacity, order integration and clear remedies.

### Falsifier

Few eligible garments are truly alterable, or additional paid orders fail delivery and satisfaction checks or lose money after rework.

### Impact scenario

Illustratively, 2% of 5,000 monthly AI visits qualify at a 2.5% baseline purchase probability. An arbitrary one-percentage-point gain adds one order. That yields £30 only if contribution after alteration and returns is £30. Zero or negative outcomes remain possible.

### Value scenario

At £30 net contribution, an unvalidated £99 monthly fee needs 3.3 additional orders or 9.9 at 3x value, before integration costs. Service and remake costs must already be deducted from the order contribution used here.

### Implementation

Begin with one merchant-approved shortening operation and eligible trouser styles. Verify the service line and finished specification survive checkout and fulfillment.

### Cost control

Reuse the existing alteration operation and deterministic feasibility rules; do not subsidize an uneconomic service to manufacture conversions.

### Sources

- [UNIQLO UK | Online Alterations | Customer Service](https://faq-uk.uniqlo.com/pkb_Home?fs=RelatedArticle&id=kA0Vh0000001Mui&l=en_US)
- [Fit Intelligence Technical Spec, Data & MCP | True Fit](https://www.truefit.com/fit-intelligence-spec)

Underlying candidates: truefit-07

## I33. Apply a verified existing benefit before budget filtering

Identity | Offer qualification | Develop next | integration-heavy

### Buyer

A merchant with a real benefit program and an owned or approved partner agent that can request prices before filtering.

### Problem

A public price can eliminate an affordable offer before a shopper applies an existing loyalty or verified benefit. A later coupon prompt cannot recover every excluded option.

### Intervention

Offer optional verification before the controlled agent applies the shopper's budget. Use the existing issuer flow, bind its result to program, offer and expiry, and retrieve a live eligible total. Keep documents with the verifier, preserve guest browsing and revalidate at checkout. No new discount is introduced.

### Mechanism

Earlier access to a genuine eligible quote may keep a suitable offer in consideration and produce an additional purchase.

### Overlap

SheerID already verifies eligibility and issues offer codes. UCP supports consented identity linking and benefits. The comparator provides the same benefit through a competent existing flow.

### Edge

Test quote timing and proof continuity at identical eligibility standards and commercial terms.

### Evidence

Hypothesis. Official documents establish the required verification and linking mechanisms, not purchase gains or access to private consumer-agent decisions.

### Experiment

In the owned or approved agent, randomize persistent program-relevant shopping tasks before budget filtering or verification. Compare early lookup with the current flow, including opt-outs, failed checks and people never reaching the merchant. Count completed merchant purchases within 30 days, then returns. Power from the assigned task population. A landing-page-only test could establish only downstream affordability reconsideration.

### Metric

Purchasers per all assigned eligible tasks, with all-channel merchant orders, after-return contribution, verification burden and discount leakage. Verified shoppers alone are a selected denominator.

### Dependency

A real program, issuer trust, supported pre-comparison price lookup, optional linking and assignment-to-order coverage.

### Falsifier

Benefits already enter comparison, or earlier lookup adds no purchases and merely discounts orders that would have occurred anyway.

### Impact scenario

A chosen 1,000-task cohort at 2.5% purchasing gains 2.5 orders under an arbitrary 10% relative improvement. £75 assumes unchanged £30 contribution after discounts and returns. The 5,000 observed-visit reference cannot supply this upstream denominator. Zero or negative contribution effects are possible.

### Value scenario

A £99 monthly test fee needs 3.3 extra orders or 9.9 at 3x value only when contribution remains £30 and other costs are zero. Include verification, integration and margin changes across all orders. Paid acceptance is untested.

### Implementation

Start with one program and an approved agent's price lookup. Return minimal eligibility and quote data, with clear benefit and expiry information.

### Cost control

Reuse valid issuer results within their permitted scope; avoid repeated verification or copying identity documents.

### Sources

- [Secure Verification Creation - SheerID Developer Center](https://developer.sheerid.com/tutorials/secure-verification-creation)
- [Setting Up Webhooks - SheerID Developer Center](https://developer.sheerid.com/tutorials/verifications/webhooks)
- [Identity Linking - Universal Commerce Protocol (UCP)](https://ucp.dev/2026-08-25/specification/common/identity-linking/)

Underlying candidates: identity-05, scrunch-06, google-05, regulatory-02, gorgias-04

## I34. Choose a purchase route that supports the actual cart

Infrastructural | Checkout routing | Develop next | integration-heavy

### Buyer

A merchant with customization or extension-dependent carts and control of an approved agent integration.

### Problem

The selected cart needs an option or validation that its proposed checkout route cannot provide, so the shopper encounters a preventable dead end.

### Intervention

Preflight the actual cart against tested channel capabilities and installed merchant requirements. Choose a supported direct checkout or a preserved storefront continuation, explain the remaining action and retain selections. Recheck after material cart changes. Mandatory validations still apply; unsupported external interfaces cannot be made to render a merchant extension.

### Mechanism

Choosing a viable route before failure may preserve a purchase that would be lost during a broken checkout attempt.

### Overlap

Shopify already documents continuation, escalation and preserved context, while its Google channel has explicit constraints. Correct native eligibility checks and fallback are the direct competitor.

### Edge

Earn an advantage on a demonstrated merchant-specific cart requirement that current routing handles poorly; a capability manifest alone is insufficient.

### Evidence

Hypothesis. Official Shopify documentation establishes available routes and limitations, not mismatch prevalence or additional purchases from this preflight.

### Experiment

Randomize persistent AI-origin buyers with pre-treatment complex-cart eligibility before route selection. Compare preflight with correctly configured native routing and fallback. Include everyone assigned and deduplicate checkout retries. Measure any completed merchant purchase within seven days, followed through returns. Power from affected-cart traffic and allow a full buying cycle; monitor latency and purchases completed through other routes.

### Metric

Purchasers per all assigned eligible buyers, with merchant-wide orders and after-return contribution. Route success is diagnostic; validation failures, lost customization and duplicate charges are guardrails.

### Dependency

Supported integration access, merchant configuration visibility, tested capabilities, cart continuation and reliable server-side order joins.

### Falsifier

Native fallback already recovers the carts, or extra preflight work loses as many completed purchases as it saves.

### Impact scenario

Assume 10% of 5,000 monthly AI visits qualify and buy at 2.5%. An arbitrary 20% relative improvement adds 2.5 orders and £75 at £30 contribution after returns. Actual cart conversion must be measured; zero or negative effects remain possible.

### Value scenario

A £99 monthly test fee needs 3.3 additional orders before conformance testing and integration, or 9.9 at 3x value. These are required outcomes for an unvalidated offer, not a forecast or demonstrated willingness to pay.

### Implementation

Start with one observed route mismatch and supported continuation path. Validate the selected cart after a merchant app update; keep preflight separate from post-error recovery.

### Cost control

Cache versioned capability results and rerun conformance checks when relevant configuration changes, while retaining a cheap live cart check. Measure recurring recoverable losses before subscription pricing; a one-time native correction supports project pricing.

### Sources

- [Carts and checkout for agents](https://shopify.dev/docs/agents/carts-and-checkout)
- [Selling on Google AI Mode and Gemini](https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts/google)
- [Checkout MCP server](https://shopify.dev/docs/agents/carts-and-checkout/checkout-mcp)

Underlying candidates: shopify-02, simprosys-09

## I35. Finish an ambiguous checkout exactly once

Infrastructural | Checkout recovery | Develop next | integration-heavy

### Buyer

A merchant or integrator whose payment and order systems sometimes disagree after a lost checkout response.

### Problem

The buyer approved one purchase, but a timeout leaves its status uncertain. Support may find an existing order, or a genuinely incomplete purchase may never finish.

### Intervention

Build a durable coordinator mapping one logical purchase to its idempotency key, payment status and order ID. Distinguish completed with a missing receipt, accepted and processing, and genuinely incomplete with a supported continuation.

### Mechanism

Resolve genuinely incomplete transactions without asking the shopper to repeat payment. Discovering an already completed order faster creates no extra purchase; recovery speed is a separate benefit.

### Overlap

UCP already specifies accepted completion and lost-response recovery. Stripe requires idempotent approval handling. Safe native recovery and competent manual reconciliation are the baseline.

### Edge

Recover more eventual, nonduplicate purchases across a heterogeneous merchant stack than that baseline, without broadening the buyer's authorization.

### Evidence

Hypothesized purchase effect. The UCP and Stripe contracts establish feasible recovery states, but provide no prevalence or incremental-order estimate for this merchant.

### Experiment

Assign persistent buyers at their first eligible AI-origin arrival through the affected integration, before any failure. Compare the coordinator with safe native recovery, retaining every assignment. Use 30-day completed purchases as the primary outcome; 24-hour resolution is secondary. Inject faults only in a sandbox. Enroll to the required sample and mature later refunds.

### Metric

Purchasers with one valid completed logical order per assigned buyer, deduplicated across payment and commerce IDs. Report later cancellations, returns, contribution and duplicate captures separately.

### Dependency

Reliable status reads, stable idempotency mapping, concurrency control and permission limited to the original purchase are mandatory.

### Falsifier

Reject the conversion claim if eventual purchases merely occur or become visible sooner, or if the useful-effect interval excludes enough extra orders to cover costs. Stop on duplicate charging.

### Impact scenario

Chosen sensitivity, not forecast: 5,000 AI visits/month, 20% eligible, a 2.5% eligible purchase baseline and GBP30 contribution per completed order after returns. A chosen 10% relative increase gives 2.5 extra orders and GBP75. Zero and negative effects remain possible.

### Value scenario

An unvalidated GBP99 monthly fee needs 3.3 extra orders to break even or 9.9 for a 3x value-to-cost hurdle before other costs. Reconciliation engineering raises both requirements; willingness to pay is unknown.

### Implementation

Start with one processor and commerce pair. Return missing receipts, observe processing orders, and continue genuinely incomplete purchases only when authoritative state permits. Never probe status with a new payment attempt.

### Cost control

Reuse native state machines and bounded polling. Measure recurring defect incidence and maximum recoverable orders before charging a subscription; a one-time correction may justify only project work.

### Sources

- [Checkout Capability](https://ucp.dev/specification/shopping/checkout/)
- [Manage your agentic commerce integration](https://docs.stripe.com/agentic-commerce/for-sellers/manage)
- [Order Capability](https://ucp.dev/specification/shopping/order/)

Underlying candidates: infrastructure-04

## I36. Complete checkout decisions before the platform timeout

Infrastructural | Checkout completion | Develop next | integration-heavy

### Buyer

A checkout engineering team with measured approval-hook deadline misses on an approved agent integration.

### Problem

The buyer is ready, but sequential dependency reads exceed the approval hook's deadline and cause an otherwise valid payment to be declined.

### Intervention

Implement a deadline-aware hook executor: map dependency order, run independent reads concurrently, remove optional calls from the critical path and retain the authoritative final checks.

### Mechanism

Return the same valid business decision before the platform abandons or declines checkout, allowing an existing purchase intention to complete.

### Overlap

Stripe provides live hooks; Google supplies UCP latency logging. Performance tools already identify slow services. A competent, tuned native hook is the comparator.

### Edge

Recover completed purchases by changing the backend decision path while preserving stock truth, security and pricing. Faster pages belong to I49.

### Evidence

Hypothesized effect. Stripe documents four-second deadlines, feed fallback for the availability hook and checkout decline for an approval timeout. Those different failure modes must remain distinct.

### Experiment

First shadow both paths to check decision parity. Then randomize buyers at eligible AI-origin entry before hook execution, keeping assignment across retries. Count all assigned buyers, including those who never reach checkout. Run across peak and ordinary periods to a powered sample, with a fixed purchase window and complete return follow-up.

### Metric

Completed, nonduplicate purchases per assigned buyer. Reconcile refunds and contribution later; monitor oversells, wrong totals, fraud loss and decision disagreement. Hook latency and timeout rate explain results but cannot replace purchases.

### Dependency

Merchant implementation control, bounded source freshness, supported fallback behavior and authoritative inventory and payment checks.

### Falsifier

The new path misses the same deadlines, changes decisions incorrectly, or cannot deliver economically useful additional purchases against the tuned comparator. Lower latency alone fails the commercial test.

### Impact scenario

Sensitivity only: of 5,000 monthly AI visits, choose 20% as eligible, with a 2.5% purchase baseline and GBP30 contribution after returns. A chosen 10% relative change adds 2.5 completed orders and GBP75. It could instead add none or lose orders.

### Value scenario

GBP99/month is an unvalidated test price: 3.3 extra orders cover the fee and 9.9 meet a 3x value-to-cost hurdle, with no other costs. Include infrastructure and implementation expense before setting a real price.

### Implementation

Begin with one approval hook missing its four-second deadline. Set lower internal budgets and cache only explicitly valid facts. If required facts remain unavailable, follow the platform's documented failure behavior.

### Cost control

Keep inexpensive request telemetry and sample detailed traces. Price recurring operation only against recurring recoverable timeout losses; a one-off native performance correction may justify project work.

### Sources

- [Manage your agentic commerce integration](https://docs.stripe.com/agentic-commerce/for-sellers/manage)
- [Use BigQuery to store and analyze UCP events (optional)](https://developers.google.com/merchant/ucp/guides/tools/bq-storage)
- [Frequently Asked Questions - Google Universal Commerce Protocol Guide](https://developers.google.com/merchant/ucp/faq)

Underlying candidates: infrastructure-05

## I37. Repair legacy basket mappings into approved checkout channels

Infrastructural | Arrival and cart | Conditional bet | integration-heavy

### Buyer

A complex-goods retailer moving baskets between a legacy system and an approved agent or browser checkout.

### Problem

A legacy pack or measured quantity can map into a schema-valid but commercially wrong basket, causing rejection, an incorrect total or an unwanted order.

### Intervention

Build a typed mapping for one documented legacy-to-channel defect. Preserve the merchant's pack meaning, units, scale, currency and fulfillment IDs, then read back the authoritative basket and reconcile differences with the buyer.

### Mechanism

Carry the intended purchasable basket through a transition that currently loses its meaning, so buyers can finish with the correct quantity and total.

### Overlap

Current UCP already defines quantity units, scale, increments, authoritative sale basis and visible conversions. Stripe ACS spans protocols; Shopify provides persistent carts and replacement semantics. These capabilities are established.

### Edge

Beat a correct current UCP or Stripe ACS implementation on a demonstrated legacy mapping defect. Adding units or recoverable quantity errors already specified by UCP is insufficient.

### Evidence

Hypothesized effect. The current UCP contract explicitly prohibits silent quantity conversion. The opportunity is merchant-specific failures beyond that contract, not a missing protocol feature.

### Experiment

Reproduce the defect and difficult reference baskets in a sandbox. Randomize persistent buyers before their first eligible complex-basket transition to a competent native correction or the checked adapter. Retain all assigned buyers. Measure seven-day completed purchases and later returns; power from actual eligible volume and include an adapter migration where practical.

### Metric

Buyers completing an accurately priced order for their confirmed quantity per assigned buyer. Report any-order completion alongside wrong-unit orders, refunds, overcharges and contribution.

### Dependency

Documented legacy semantics, version-pinned approved channel access, reference merchant totals and a supported browser continuation for unrepresentable merchandise.

### Falsifier

Correct native adapters already handle the observed cases, or checks add friction without extra accurate purchases. Any silent quantity change invalidates the claimed benefit.

### Impact scenario

Chosen sensitivity: 5,000 AI visits/month, 10% eligible complex journeys, a 2.5% eligible purchase rate and GBP30 after-return contribution. A 10% relative increase would add 1.25 orders and GBP37.50. These are arithmetic assumptions; zero or negative impact is possible.

### Value scenario

An unvalidated GBP99 monthly fee needs 3.3 extra orders for break-even or 9.9 for a 3x value-to-cost hurdle before costs. Recurring pricing needs recurring defects; a one-off native correction supports a project fee.

### Implementation

Start with one pack-versus-unit defect. Compare requested meaning with the merchant's returned sale basis and totals. Request confirmation for material changes; route unsupported merchandise through the permitted merchant handoff.

### Cost control

Keep the adapter small, generate cases from real failures and reuse native representations. Publication ordering and concurrent cart edits are separate problems.

### Sources

- [Sell through agents](https://docs.stripe.com/agentic-commerce/for-sellers)
- [Carts and checkout for agents](https://shopify.dev/docs/agents/carts-and-checkout)
- [Overview - Google Universal Commerce Protocol Guide](https://developers.google.com/merchant/ucp/guides/overview)
- [Checkout Capability - Universal Commerce Protocol](https://ucp.dev/specification/shopping/checkout/)

Underlying candidates: infrastructure-08, infrastructure-01, google-02, datafeedwatch-03

## I38. Repair false blocks of verified buyer-directed shopping agents

Infrastructural | Access and discovery | Develop next | integration-heavy

### Buyer

A merchant with verified buyer-directed agent requests falsely blocked by its own edge policy.

### Problem

A legitimate partner can read one product route but encounter a challenge at a locale redirect or cart endpoint, ending the buyer's purchase attempt before arrival is logged.

### Intervention

Trace the signed partner journey and repair the exact supported WAF rule or signature-policy configuration. Apply route-specific permissions, expiry and rate limits while preserving transaction authorization.

### Mechanism

Restore a permitted route through product selection and checkout so previously blocked buyer intentions can become completed purchases.

### Overlap

Cloudflare already verifies agent identity and supports merchant policies. Platform authentication already exists. The comparator is the merchant's competent, narrowly configured current policy.

### Edge

Recover purchases at matched fraud and load limits by fixing a proven configuration error. A user-agent string never establishes identity, and a verified operator never supplies payment authority.

### Evidence

Hypothesized. Cloudflare documents signed verification and currently warns that its verifier does not deduplicate nonces. Merchant replay protection remains necessary for writes.

### Experiment

Assign verified partner shopping sessions at ingress before the WAF decision, using a partner-issued experiment key. Include blocked sessions and nonarrivals in both arms. If pre-ingress session assignment is unavailable, randomize independent merchants before exposure and allow propagation. Compare completed orders across a fixed window, followed by returns; never analyze only admitted visitors.

### Metric

Completed orders per all assigned partner sessions, or per fixed merchant-period for cluster assignment. Report all-channel orders, refunds, contribution, unauthorized writes, fraud and infrastructure load. Without sufficient origin linkage, the AI-specific causal effect remains unidentified.

### Dependency

Merchant edge control, supported partner verification, an assignment identifier available before blocking and separate buyer authorization.

### Falsifier

No genuine false blocks are found, extra admission adds no orders, or fraud and load losses outweigh recovered contribution.

### Impact scenario

Reference arithmetic only: 5,000 monthly AI visits at 2.5% purchase and GBP30 after-return contribution. The blocked opportunity count is unknown, so acquisition lift cannot be inferred from arrivals. A chosen five additional completed orders after displacement would yield GBP150; zero or losses are possible.

### Value scenario

GBP99/month is an unvalidated price, requiring 3.3 extra orders for break-even or 9.9 for a 3x value-to-cost hurdle before edge and support costs.

### Implementation

Shadow-test genuine signed, expired and unauthorized requests on merchant endpoints, then deploy the smallest rule correction. Retain a normal buyer continuation.

### Cost control

Use the existing verifier and affected routes only. A fixed configuration repair supports project pricing; recurring fees require recurring false blocks and measured native maintenance costs.

### Sources

- [Web Bot Auth](https://developers.cloudflare.com/bots/reference/bot-verification/web-bot-auth/)
- [Verified bots](https://developers.cloudflare.com/bots/concepts/bot/verified-bots/)
- [Frequently Asked Questions - Google Universal Commerce Protocol Guide](https://developers.google.com/merchant/ucp/faq)

Underlying candidates: infrastructure-10, identity-10

## I39. Keep newer offers from being overwritten by stale publications

Infrastructural | Offer integrity | Develop next | integration-heavy

### Buyer

A multichannel merchant whose competing feed writers produce measured stock or price regressions.

### Problem

A later stock correction can be overwritten by an older import, leaving an available product hidden or presenting an offer checkout cannot honor.

### Intervention

Create a merchant-controlled publication coordinator with source sequence numbers, coalesced changes and one active import per destination. Reconcile source truth, accepted destination state, observed display and checkout independently.

### Mechanism

Keep valid offers available by preventing stale publications, then verify that restored availability creates additional completed purchases.

### Overlap

Stripe ACS and OpenAI support catalog updates and live checks; managed feed tools already synchronize offers. The comparator is well-configured scheduling with native live validation.

### Edge

Coordinate every merchant writer and repair harmful ordering failures that survive that competent baseline. Unlike I37, the changed state is a published offer, not a buyer's basket.

### Evidence

Hypothesized purchase impact. Stripe explicitly says asynchronous feed imports need not finish in submission order. Accepted updates do not establish when an agent saw them or whether orders increased.

### Experiment

Randomize merchants or genuinely independent inventory-and-substitution pools before publication changes. Preserve mandatory truth corrections in both arms. Use measured propagation wash-in and fixed cohort-period order counts, not conversion among resulting visitors. Run across several stock cycles with cluster-level power and later return reconciliation.

### Metric

Completed orders across all assigned pools, with observed AI-origin orders reported separately. Include all-channel displacement, cancellations and contribution. The total effect can be identified while the AI-influenced component remains unknown if origin is missing.

### Dependency

Control over every publisher, admitted destination APIs, authoritative stock events and usable status/readback semantics. Uncontrolled writers can invalidate the ordering guarantee.

### Falsifier

Native scheduling already prevents the failures, publication differences never reach shoppers, or completed-order gains disappear after substitutions and cancellations.

### Impact scenario

Chosen sensitivity: affected pools contain 20% of 5,000 pre-treatment monthly AI visits; at a 2.5% purchase baseline that is 25 orders. GBP30 contribution after returns makes five additional completed orders worth GBP150. This assumes a net gain, not shifted channel credit; zero or negative gains are possible.

### Value scenario

An unvalidated GBP99 monthly fee needs 3.3 additional orders for break-even or 9.9 for a 3x value-to-cost hurdle, before connector and operating costs.

### Implementation

Begin with one destination and a recorded stale-overwrite case. Use documented activation and removal operations, bounded reconciliation and a visible exception when live state cannot be verified.

### Cost control

Coalesce superseded events and use permitted readback. Price against recurring harmful writer conflicts; if one native scheduling fix resolves them permanently, charge for that project instead.

### Sources

- [Sell through agents](https://docs.stripe.com/agentic-commerce/for-sellers)
- [Products - Agentic Commerce](https://developers.openai.com/commerce/specs/api/products)
- [Manage your agentic commerce integration](https://docs.stripe.com/agentic-commerce/for-sellers/manage)

Underlying candidates: infrastructure-02, google-04

## I40. Hold inventory only when the buyer genuinely starts committing

Temporal | Checkout completion | Conditional bet | integration-heavy

### Buyer

A merchant with documented checkout stock races and a supported reservation engine.

### Problem

Exploratory carts can hoard inventory, while waiting until payment can lose stock during an ordinary buyer review. Either policy can prevent purchases.

### Intervention

Add a coordinator that acquires a real SKU/location hold only at explicit buyer commitment, carries its lease through the supported handoff, and releases it on completion, cancellation or expiry.

### Mechanism

Protect a credible purchase attempt long enough to finish while returning abandoned stock promptly to other buyers.

### Overlap

commercetools already supplies expiring cart and on-demand reservations, and merchants have native stock policies. The experiment must beat that existing machinery's best practical configuration.

### Edge

Choose better hold timing for agent journeys. Giving the last unit to an AI visitor creates no additional order when another customer would have bought it.

### Evidence

Hypothesized. Native documentation establishes reservations and expiry behavior, not incremental purchases from this timing policy.

### Experiment

Randomize independent inventory pools or merchants before any holds, with equal prices and inventory budgets. Include every channel and all assigned pool-days, including periods without agent checkout. Run across replenishment cycles and the complete buying window, then mature cancellations and returns. Buyer-level randomization is unsuitable when arms compete for the same stock.

### Metric

Total fulfilled completed orders and unique purchasers per assigned pool-period; report AI-origin orders separately, held-stock time, denied non-AI orders, refunds and contribution.

### Dependency

Atomic supported reservations, shared inventory across channels, explicit buyer intent and reliable lease release. Additional total orders must be plausible through better availability over time, rather than reassignment of certain sellouts.

### Falsifier

Gains for AI shoppers are offset by other buyers' losses, holds increase unavailable stock, or native timing already performs equally well at lower cost.

### Impact scenario

Sensitivity only: affected pools receive a chosen 20% of 5,000 AI visits/month; a 2.5% baseline implies 25 AI-origin purchases. At GBP30 contribution after returns, five net additional fulfilled orders across all channels yield GBP150. Zero or negative net orders remain possible.

### Value scenario

GBP99/month is an unvalidated fee: 3.3 net extra orders cover it and 9.9 meet a 3x value-to-cost hurdle before reservation integration and carrying costs.

### Implementation

Start with one replenished product family. Browsing and crawler reads create no holds. Show the actual expiry, cap renewal, and check the authoritative reservation before payment.

### Cost control

Reuse native leases and event handlers; instrument failures rather than polling every cart. Reject policies that need excessive reserved capacity to show a conversion gain.

### Sources

- [Inventory overview](https://docs.commercetools.com/api/inventory-overview)
- [Checkout Capability](https://ucp.dev/specification/shopping/checkout/)

Underlying candidates: infrastructure-03, peec-09, burnish-10, feedonomics-02, shopify-10, truefit-02, temporal-07

## I41. Honor a genuine quoted price through checkout

Temporal | Offer integrity | Develop next | integration-heavy

### Buyer

A merchant with verified abandonment between an authorized item-price quote and its redemption.

### Problem

A genuine quoted offer expires or changes during an AI handoff, and the buyer must contact support to receive a price the merchant would already honor.

### Intervention

Issue an expiring merchant-authorized price receipt bound to item, currency, quantity, quote version and terms. Redeem it through supported discounts or draft-order pricing after validation.

### Mechanism

Remove the support detour for an eligible quote, allowing the same approved offer to become a completed purchase.

### Overlap

Shopify already supports draft-order price locks and discounts. Native promotion scheduling, refreshed prices and a competent exception process form the comparator.

### Edge

Preserve and redeem the actual shown quote across the handoff at the same discount budget. A timer, unsupported screenshot or new discount subsidy is not the advantage.

### Evidence

Hypothesized purchase effect. Shopify documents price locks and warns that Smart Pricing experiments do not propagate their prices across sales channels. Neither establishes the frequency of recoverable quote disagreements.

### Experiment

Assign buyers when a legitimate eligible quote is issued, before a discrepancy or support request. Compare automatic receipt redemption with the current lawful price-honor process at equal final-price eligibility. Keep all assigned buyers; measure seven-day completed purchases and later returns, allowing sufficient volume and a full promotion cycle.

### Metric

Purchasers per assigned quote recipient, plus contribution after honored discounts, cancellations and returns. Track replay abuse and total merchant purchases to detect timing or channel substitution.

### Dependency

Merchant authority to honor the quote, a cooperating distribution route and a supported redemption mechanism. Shipping and tax stay separate unless genuinely included.

### Falsifier

Existing locks already solve the journey, extra purchases vanish when discount budgets match, or honoring quotes costs more than the resulting retained contribution.

### Impact scenario

Chosen sensitivity, not forecast: 5,000 monthly AI visits, 10% eligible quote recipients, 2.5% purchase baseline and GBP30 contribution after returns. A 10% relative increase adds 1.25 completed orders and GBP37.50. Any price subsidy must be included; zero or negative value is possible.

### Value scenario

An unvalidated GBP99 monthly fee needs 3.3 extra orders to break even and 9.9 for a 3x value-to-cost hurdle before operational costs. Measure actual after-discount contribution before pricing.

### Implementation

Pilot one offer family, validate receipts server-side and cap redemption to the original terms. Request buyer approval for material changes; use reviewed price-history facts for any savings claim.

### Cost control

Reuse native pricing and one receipt validator. Avoid building a new promotion engine or manually reviewing every ordinary quote.

### Sources

- [Creating draft orders](https://help.shopify.com/en/manual/fulfillment/managing-orders/create-orders/create-draft)
- [Create a pricing experiment in the Smart Pricing app](https://help.shopify.com/en/manual/products/details/product-pricing/smart-pricing/create-experiment)
- [Carts and checkout for agents](https://shopify.dev/docs/agents/carts-and-checkout)

Underlying candidates: shopify-09, channable-07, regulatory-10

## I42. Quote the return terms and practical route for this exact purchase

Regulatory | Trust and terms | Develop next | integration-heavy

### Buyer

A bulky-goods merchant whose shoppers need a practical return route before deciding to buy.

### Problem

A correct generic policy still leaves the customer unsure whether this exact item can be collected from their address, when, and at what cost.

### Intervention

Build an item-and-location return evaluator that issues applicable terms and, where supported, a real collection quote. Save its version with the order and link the actual request route.

### Mechanism

Resolve a concrete cost and logistics objection before purchase while giving the merchant an offer it can honor if a return is requested.

### Overlap

Narvar already configures product/order policies, fees and collection methods; native assistants answer policy questions. Accurate policy Q&A and a configured returns provider are the baseline.

### Edge

Provide a usable pre-purchase service commitment for the exact basket and destination. More readable policy markup alone adds little.

### Evidence

Hypothesized. Narvar establishes existing functionality. Your Europe distinguishes statutory remedies, voluntary guarantees and withdrawal rules; applicability still needs merchant review in the chosen jurisdiction.

### Experiment

Randomize buyers before the optional address/terms check, using a predeclared bulky-item AI-origin cohort. Compare the current accurate policy and existing services with the exact-purchase quote. Preserve required information in both arms. Count every assignment over a fixed buying window, then observe the full return period and costs.

### Metric

Completed purchasers per assigned buyer, with retained orders, collection expenses, refunds and contribution reconciled later. Increased purchases that are fully returned do not establish retained value.

### Dependency

Current carrier coverage, dimensions, product conditions, relevant dates and a merchant commitment to quoted terms. Statutory remedies, voluntary policy and optional convenience must remain distinct.

### Falsifier

Quotes cannot be honored, reassurance merely attracts unprofitable returns, or a competent existing returns flow earns the same purchases more cheaply.

### Impact scenario

Chosen sensitivity: 5,000 monthly AI visits, 20% eligible, a 2.5% purchase baseline and GBP30 contribution after returns. A chosen 10% relative increase gives 2.5 extra completed orders and GBP75 before any new service cost not already included. Zero or negative value is possible.

### Value scenario

GBP99/month is an unvalidated test fee, requiring 3.3 extra orders for break-even or 9.9 for a 3x value-to-cost hurdle when no other costs apply. Added collection costs raise the threshold.

### Implementation

Start with one bulky category and collection partner. Evaluate the exact dates and exceptions, show quote expiry, and keep optional collection separate from free statutory remedies.

### Cost control

Cache stable policy rules; query variable carrier prices only when needed. Gift-date return windows reuse the same evaluator.

### Sources

- [Narvar Return Overview](https://support.narvar.com/hc/en-us/articles/11307520101651-Narvar-Return-Overview)
- [Your rights when shopping in the EU - Your Europe](https://europa.eu/youreurope/citizens/consumers/shopping/shopping-consumer-rights/index_en.htm)

Underlying candidates: regulatory-09, burnish-07, geoffy-06, simprosys-07, smartseo-05, google-08, temporal-05, constructor-09, searchpilot-08

## I43. Turn a known safety specification into an evidence-complete order

Regulatory | Product qualification | Conditional bet | integration-heavy

### Buyer

A specialist distributor serving buyers who already have an approved product safety specification.

### Problem

A purchasing team must reconcile model numbers, standard versions and performance codes across documents before ordering, even when its required specification is settled.

### Intervention

Build a deterministic matcher over distributor-reviewed manufacturer records. For each buyer-supplied requirement, return satisfied, contradicted or unestablished evidence, then attach the exact model and document versions to the proposed order.

### Mechanism

Remove document ambiguity and avoidable expert-support delay so an already qualified purchasing requirement can become an accurate paid order.

### Overlap

Manufacturers such as uvex already publish standards, sizes, performance codes and conformity documents. Competent distributor search and qualified staff can assemble the same evidence.

### Edge

Preserve exact evidence-to-order continuity across supported brands and live inventory. Document extraction alone is a feature of existing product-data workflows.

### Evidence

Hypothesized purchase effect. EU PPE rules and uvex product records establish an authoritative documentation baseline. They do not prove suitability for a particular workplace or this workflow's conversion benefit.

### Experiment

Within one reviewed jurisdiction and product category, randomize purchasing accounts before their first eligible lookup. Compare the matcher with normal document access and qualified support. Keep required safety information and restrictions universal. Count all assigned accounts over a full procurement cycle, including those without matches, then follow returns and cancellations.

### Metric

Completed purchasers per assigned account, with document-to-model mismatches as a stop guardrail. Report later retained orders and contribution; a match certifies neither the worksite requirement nor safety.

### Dependency

A competent requirement owner, licensed current documents, explicit version relationships and expert escalation. The system must abstain when evidence cannot establish a requirement.

### Falsifier

The competent existing workflow yields the same eventual purchases at lower cost, or any incorrect qualification makes the proposed automation unacceptable.

### Impact scenario

Reference sensitivity only: 5,000 AI visits/month, a chosen 10% eligible population, 2.5% purchase baseline and GBP30 contribution after returns. A 10% relative increase gives 1.25 extra orders and GBP37.50. Actual account-cycle economics replace these assumptions; zero or negative value is possible.

### Value scenario

The unvalidated GBP99 monthly test fee requires 3.3 extra orders for break-even or 9.9 for a 3x value-to-cost hurdle before expert-review and integration costs.

### Implementation

Pilot a small reviewed glove catalog and one approved requirement template. Validate exact article/model identity, retain evidence versions with the cart and require qualified resolution of unknowns.

### Cost control

Use rules for approved evidence, with human review when documents change. Do not turn this into a general hazard-assessment or compliance-advice product.

### Sources

- [Regulation (EU) 2016/425 on personal protective equipment](https://eur-lex.europa.eu/legal-content/en/ALL/?uri=CELEX%3A32016R0425)
- [uvex unipur 6639 safety glove](https://www.uvex-safety.com/en/products/safety-gloves/uvex-unipur-6639-safety-glove-6024806/)

Underlying candidates: regulatory-04, profound-08, datafeedwatch-07

## I44. Make repairability resolve to a real service the buyer can use

Regulatory | Trust and terms | Conditional bet | integration-heavy

### Buyer

An electronics retailer with participating repairers and buyers who explicitly care about usable repair support.

### Problem

A repairability score does not tell a buyer whether someone serving their location can repair this exact regional model or what a defined repair currently costs.

### Intervention

Join the exact model's applicable repair information to a participating provider's current coverage, parts access, scoped quote and booking route. Display the quote's date and limitations beside the device offer.

### Mechanism

Replace an unresolved longevity objection with a service the shopper can actually access, helping the device purchase proceed.

### Overlap

EPREL already provides model-level repairability information. Samsung's UK service pages show existing repair estimates and booking options. These are substantial native and adjacent baselines.

### Edge

Beat correct required labels and existing repair information by resolving the buyer's own service route before device purchase. Merely linking a repairability badge is insufficient.

### Evidence

Hypothesized conversion effect. Commission and EPREL sources establish product information; Samsung demonstrates executable service routes in its market. None supplies purchase uplift for this proposed retailer integration.

### Experiment

Choose one market and supported model family. Randomize AI-origin shoppers with declared longevity intent before showing either flow. Keep required labels and device prices equal. Count every assignment over the complete buying window, then observe device returns and any service subsidy. Power on this narrow cohort, not the entire catalog.

### Metric

Completed device purchasers per assigned shopper, reconciled to retained orders and contribution after returns. A repair booking or paid service add-on is not an additional device purchaser.

### Dependency

Accurate regional model identity, current provider coverage and quotes, merchant-reviewed applicable information and ownership of any service promise.

### Falsifier

Shoppers cannot use the displayed repair route, the normal manufacturer route resolves the objection equally well, or added service costs erase extra purchase contribution.

### Impact scenario

Chosen sensitivity: 5,000 monthly AI visits, 10% eligible, a 2.5% eligible purchase baseline and GBP30 contribution after returns. A chosen 10% relative increase adds 1.25 device orders and GBP37.50. Zero or negative impact is possible.

### Value scenario

GBP99/month is an unvalidated price. At GBP30 per extra order, 3.3 cover the fee and 9.9 meet a 3x value-to-cost hurdle before integration or service costs.

### Implementation

Start with one defined repair and real provider availability. A current quote does not promise future parts, capacity or prices. Any future guarantee needs a funded provider commitment and its cost included; statutory rights stay separate.

### Cost control

Reuse official model records and existing repair booking systems. Refresh volatile quotes only when a shopper requests a service route.

### Sources

- [Smartphones and Tablets - European Commission](https://energy-efficient-products.ec.europa.eu/product-list/smartphones-and-tablets_en)
- [EPREL public smartphone and slate-tablet product record 2347994](https://eprel.ec.europa.eu/screen/product/smartphonestablets20231669/2347994?navigatingfrom=qr)
- [Your rights when shopping in the EU - Your Europe](https://europa.eu/youreurope/citizens/consumers/shopping/shopping-consumer-rights/index_en.htm)
- [How much will it cost to repair my phone screen? - Samsung UK](https://www.samsung.com/uk/support/mobile-devices/how-much-will-it-cost-to-repair-my-phone-screen/)

Underlying candidates: regulatory-05

## I45. Verify that the buyer can actually use the refill or take-back program

Regulatory | Offer qualification | Conditional bet | integration-heavy

### Buyer

A brand with an operating refill or take-back service and customers who want to participate.

### Problem

A supported reuse claim can still leave a buyer unable to obtain the right refill or return the packaging from their location.

### Intervention

Build an optional serviceability check using exact refill compatibility, delivery coverage, collection routes, deposit rules and accepted condition. Present the serviceable starter order with the applicable terms.

### Mechanism

Resolve whether the reuse program will work for this buyer before the first purchase, avoiding a practical objection that a general claim cannot answer.

### Overlap

Provenance already validates scoped claims and distributes them to retailers and AI discovery channels. Evidence badges and claims ledgers are established capabilities.

### Edge

Connect the buyer's actual location and product to an operating service and purchasable refill. The advantage requires functional program access beyond truthful claim presentation.

### Evidence

Hypothesized. Provenance documents claim evidence and scope; current Commission guidance establishes relevant environmental-claim constraints. Neither proves purchase uplift for the proposed serviceability flow.

### Experiment

Randomize eligible AI-origin shoppers before they choose whether to check their location. Compare the current truthful claim and normal checkout with the optional check. Keep prices, required information and subscription choice equal. Include all assigned shoppers, including unsupported addresses. Follow completed first purchases through returns and record refill behavior separately at 90 days.

### Metric

First completed purchasers per assigned shopper, later retained contribution, failed deposits and unusable collection requests. Refill orders are a secondary repeat-purchase outcome; starter and refill lines never count as two converted people.

### Dependency

A functioning service, maintained compatibility and locality data, actual deposit settlement and merchant-reviewed claims for the chosen jurisdiction. Location checking needs no compelled marketing consent.

### Falsifier

Coverage is too sparse, the normal ordering path already answers these questions, or higher first purchases lead to unresolved deposits and unprofitable returns.

### Impact scenario

Chosen sensitivity, not forecast: 5,000 AI visits/month, 20% eligible, a 2.5% purchase baseline and GBP30 after-return contribution. A chosen 10% relative increase adds 2.5 orders and GBP75. Collection subsidies may reduce that value; zero and negative outcomes remain possible.

### Value scenario

The unvalidated GBP99 monthly fee needs 3.3 additional orders for break-even or 9.9 for a 3x value-to-cost hurdle before operating costs. There is no observed willingness-to-pay claim.

### Implementation

Pilot one starter/refill pair and one collection network. Show narrow supported claims and the real route; program availability does not establish whole-product environmental superiority.

### Cost control

Reuse partner coverage tables and existing claims evidence. Refresh changes centrally instead of rechecking every stable locality on every visit.

### Sources

- [The proof behind product claims - Provenance](https://www.provenance.org/)
- [Understanding the evidence requirements - Provenance](https://knowledge.provenance.org/ensure-you-meet-the-evidence-requirements)
- [Sustainable consumption - European Commission](https://commission.europa.eu/topics/consumers/consumer-rights-and-complaints/sustainable-consumption_en)

Underlying candidates: regulatory-06

## I46. Make the entire handoff and extension step accessible

Regulatory | Checkout completion | Develop next | integration-heavy

### Buyer

A merchant and extension provider with an observed accessibility failure in the purchase handoff.

### Problem

The cart survives, but a variant selector, validation error or authentication step loses entered information or focus, stopping a keyboard or screen-reader user's purchase.

### Intervention

Repair the exact integrated journey with semantic controls, preserved entries, announced errors and predictable focus. Include a resumable assistance route and validate the whole purchase task with consenting assistive-technology users.

### Mechanism

Let shoppers finish an intended purchase across the merchant and extension boundary without repeating steps or losing the state they need.

### Overlap

Native checkouts already cover many accessible controls, and Deque offers automated, guided and manual testing. Shopify documents that its WebMCP tools do not cover app-defined checkout extension interactions.

### Edge

Fix a reproducible end-to-end task failure beyond an accessible native base checkout and a competently tested extension. An automated accessibility score is not the product outcome.

### Evidence

Hypothesized purchase effect. Shopify establishes a specific integration boundary; WCAG supplies complete-process engineering criteria. Neither an audit nor this proposal guarantees legal compliance.

### Experiment

Correct required or blocking defects for everyone first. Compare two usable baseline routes, randomizing before the extension step to the existing accessible flow or improved state-preserving transition. Predeclare a consenting assistive-technology cohort without inferring disability. Retain every assignment, measure completed purchases across the buying window and mature later returns; sparse cohorts may need several merchants.

### Metric

Completed purchasers per assigned shopper, with subgroup uncertainty, retained contribution and task abandonment reported separately. Authentication remains intact; successful scripted clicks are only diagnostics.

### Dependency

Cooperating provider, deployment access, real assistive-technology testing and merchant review of the applicable requirements.

### Falsifier

The native and current extension flow already completes the task equally well, or the new handoff adds no economically useful purchases after adequate testing.

### Impact scenario

Sensitivity only: 5,000 monthly AI visits, a chosen 5% eligible cohort, 2.5% purchase baseline and GBP30 contribution after returns. A 10% relative increase adds 0.625 completed orders and GBP18.75. That small cohort could also see zero or negative change.

### Value scenario

An unvalidated GBP99 monthly fee requires 3.3 extra orders for break-even or 9.9 for a 3x value-to-cost hurdle before implementation and human-testing costs. Accessibility duties are not contingent on this sales calculation.

### Implementation

Begin with one failing selector or validation transition. Test keyboard, screen-reader and ordinary purchase paths through confirmation, with preserved state on recoverable errors.

### Cost control

Reuse native semantic controls and shared provider fixes. Automated checks catch regressions; targeted human task sessions verify the difficult boundary.

### Sources

- [Carts and checkout for agents - Shopify](https://shopify.dev/docs/agents/carts-and-checkout)
- [Digital accessibility in retail and ecommerce - Deque](https://www.deque.com/retail-ecommerce-accessibility/)
- [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)

Underlying candidates: regulatory-07, tinyseo-04

## I47. Test a small real assortment against unmet shopping requirements

Algorithmic | Demand fulfilment | Conditional bet | integration-heavy

### Buyer

A retailer with verified unsatisfied shopping needs, supplier access and authority for a bounded inventory pilot.

### Problem

Some buyers cannot find a product because the assortment genuinely lacks their required combination of attributes. Better retrieval cannot sell stock that does not exist.

### Intervention

Deduplicate failed human shopping requests, verify the supply gap against the real catalog, and select a small buy of actual supplier SKUs under a fixed working-capital budget.

### Mechanism

Put a previously missing, suitable product into saleable inventory so unmet purchase intentions can become additional orders.

### Overlap

Google Merchant Center already suggests popular products to stock; established assortment methods account for substitution. Competent buyers and allocation software form the comparator.

### Edge

Use verified requirement-level gaps to improve one buying decision beyond popularity and existing forecasts. Synthetic prompts are not evidence of customer demand.

### Evidence

Hypothesized. Google's assortment tooling and published joint assortment/inventory research establish a strong baseline, but do not validate this input signal or its purchase effect.

### Experiment

Randomize matched, independently stocked market-category cells before any pilot buy. Give both selection policies equal working capital and marketing support. Include every assigned cell over a full replenishment and selling cycle, then mature returns. Count total affected-catalog orders, including displaced existing SKUs; do not condition analysis on shoppers who arrive after new stock appears.

### Metric

Completed purchasers and orders per assigned cell-period, with contribution, unsold inventory, carrying costs and write-downs. Report observed AI-origin outcomes separately; the AI-influenced causal component may remain unidentified.

### Dependency

Real deduplicated demand, reliable retrieval diagnostics, purchasable supplier stock and enough independent inventory cells. Pilot only one stock actuator: a small assortment buy.

### Falsifier

The apparent gap was a retrieval defect, the normal buyer selects equal or better stock, or new-SKU sales merely displace existing orders and leave costly leftovers.

### Impact scenario

Chosen sensitivity: affected cells receive 20% of 5,000 pre-treatment monthly AI visits, with a 2.5% purchase baseline. At GBP30 contribution after returns, five net additional completed orders yield GBP150 before new carrying and write-down costs. Zero or negative net value is possible.

### Value scenario

An unvalidated GBP99 monthly fee needs 3.3 extra orders for break-even or 9.9 for a 3x value-to-cost hurdle before other costs. Stock risk makes the true threshold higher; no demand or willingness-to-pay estimate is asserted.

### Implementation

Choose one repeated missing requirement and a few supplier SKUs. Record buyer approval, inventory cost, delivery dates and treatment availability before the selling period.

### Cost control

Cap quantities and exposure, reuse normal purchasing systems and stop replenishing a failed pilot. Judge value across the portfolio rather than celebrating the new SKU's sales.

### Sources

- [About popular products in Merchant Center Analytics](https://support.google.com/merchants/answer/13299535?hl=en-IE)
- [Joint assortment and inventory planning for heavy tailed demand](https://www.amazon.science/publications/joint-assortment-and-inventory-planning-for-heavy-tailed-demand)

Underlying candidates: algorithmic-06, geoffy-08

## I48. Match the intended use date to a fulfilable usable-life promise

Temporal | Fulfilment qualification | Conditional bet | integration-heavy

### Buyer

A perishable-goods merchant able to honor batch allocation or a minimum remaining-life promise.

### Problem

A product can arrive on time yet be unsuitable for the customer's intended use date. A general freshness claim leaves that uncertainty unresolved.

### Intervention

Match the shopper's declared use date to an allocatable batch or enforceable minimum-life promise, then carry the condition into the fulfillment instruction and final allocation check.

### Mechanism

Offer a basket the buyer can use when intended, reducing uncertainty that an arrival-date estimate cannot settle.

### Overlap

Ocado already publishes a Fresh+ minimum-life promise tied to delivery. Accurate life labels and a well-run existing freshness commitment are the comparator.

### Edge

Resolve a specific future use date and honor the resulting condition through picking. Another freshness badge or unsupported shelf-life calculation is insufficient.

### Evidence

Hypothesized. Ocado's terms establish a real incumbent commitment; official food guidance distinguishes use-by safety dates from best-before quality dates. Neither provides an AI purchase uplift estimate.

### Experiment

Randomize independently stocked delivery pools before either qualification flow is exposed, with equal inventory budgets. Retain every assigned pool-period and count all-channel orders, since preferential allocation of fresher stock can harm other buyers. Record the predeclared AI-origin/date-intent cohort separately. Enroll across replenishment cycles and mature refunds; power at pool level.

### Metric

Fulfilled completed orders per assigned pool-period, alongside kept orders, waste, unmet-life promises and contribution. Report observed AI-origin results without claiming unobserved AI influence.

### Dependency

User-supplied dates, appropriate storage conditions, reliable batch data or an enforceable promise, and a picker workflow that honors it.

### Falsifier

Fulfillment cannot meet the condition, the existing minimum-life promise already resolves the objection, or gains come at the cost of other orders and excess waste.

### Impact scenario

Sensitivity only: eligible pools receive a chosen 20% of 5,000 monthly AI visits, with a 2.5% purchase baseline. Five net additional completed orders at GBP30 contribution after returns yield GBP150 before additional waste or fulfillment costs. The assumptions are not forecasts; zero or losses remain possible.

### Value scenario

GBP99/month is an unvalidated fee. It needs 3.3 net extra orders for break-even or 9.9 for a 3x value-to-cost hurdle before other costs.

### Implementation

Pilot one dated category. Respect the product's actual dates and storage instructions; never extend them. If allocation fails, obtain approval for a truthful alternative or cancel under the existing process.

### Cost control

Use warehouse batch events and existing picking rules. Query detailed allocation only for date-constrained purchases; measure waste rather than hiding it in a conversion rate.

### Sources

- [Understanding food labelling: Best before and use-by dates](https://www.gov.uk/understanding-food-labelling/best-before-and-use-by-dates)
- [T&Cs: Purchase (Consumer and Business Customers)](https://www.ocado.com/content/terms-conditions-purchase-consumer)

Underlying candidates: temporal-06

## I49. Make the cold AI referral page ready for an actual purchase

Infrastructural | Arrival and cart | Develop next | now

### Buyer

A merchant with measured slow AI-referral entry paths and control over its theme and apps.

### Problem

An external referral opens an uncached product page where the correct image, variant selector or add-to-cart is not ready. Faster later navigation cannot rescue that first attempt.

### Intervention

Optimize the exact cold entry path: deliver the necessary product image and semantic controls early, defer nonessential scripts and keep variant selection and cart submission functional.

### Mechanism

Give the referred shopper a usable purchase path before delay or interface failure causes abandonment.

### Overlap

Smart SEO already optimizes images and offers navigation preloading; speed apps and native theme tuning are mature. Shopify Rollouts can test supported theme changes.

### Edge

Choose and validate changes through cold-entry purchase outcomes per engineering budget, against a competent speed app and tuned native theme.

### Evidence

Adjacent measured evidence exists in the Google/Vodafone landing-page case, but its paid traffic and 2021 baseline cannot predict AI-referral results. The proposed merchant effect remains unknown.

### Experiment

Randomize persistent buyers at their first AI-origin arrival on predeclared affected routes, before page rendering. Compare visually and functionally equivalent theme versions, stratifying on known source and device. Keep every assignment, including script failures. Measure seven-day purchases, then later returns; determine duration from actual cohort volume and include ordinary and peak traffic.

### Metric

Completed purchasers per assigned buyer, with contribution after cancellations and returns. Field loading times, usable variant controls, image adequacy and accessibility explain the mechanism; lab scores and add-to-cart alone cannot establish success.

### Dependency

Theme/app access, reliable assignment before rendering, server-side order joins and representative mobile field measurements.

### Falsifier

The tuned existing stack delivers equal purchases for less engineering cost, speed gains do not reach the cold path, or deferred code breaks buyer decisions.

### Impact scenario

Chosen sensitivity: 5,000 AI visits/month, 50% on eligible routes, a 2.5% purchase baseline and GBP30 contribution after returns. A chosen 10% relative increase adds 6.25 completed orders and GBP187.50. This is arithmetic, not an expected lift; zero or negative change remains possible.

### Value scenario

An unvalidated GBP99 monthly fee needs 3.3 extra orders to break even or 9.9 for a 3x value-to-cost hurdle before engineering and hosting costs. A one-off fix may warrant project pricing.

### Implementation

Start with one product template and its incoming variant URL. Check a cold mobile load through order confirmation, preserve image detail, and roll back errors using the platform's supported theme experiment.

### Cost control

Use a small performance budget and sampled field traces. Reuse native deployment tooling; add recurring monitoring only where app changes repeatedly reintroduce measured defects.

### Sources

- [Page speed | Sherpas Design Help Center](https://intercom.help/sherpas-design/en/articles/10602873-page-speed)
- [Vodafone: A 31% improvement in LCP increased sales by 8% | web.dev](https://web.dev/case-studies/vodafone)
- [Shopify Help Center | Types of rollouts and changes](https://help.shopify.com/en/manual/markets/rollouts/rollout-types)

Underlying candidates: smartseo-08, tinyseo-01, tinyseo-02

## I50. Make simulation earn a role in choosing purchase-producing changes

Measurement | Experiment selection | Develop next | integration-heavy

### Buyer

An agency or experimentation team with enough merchant trials and permission to reconcile orders and returns.

### Problem

A simulator can prefer an edited result without production engines retrieving it or real customers buying. Selecting work from that score may waste the release budget.

### Intervention

Build a registry pairing frozen replay predictions with independently randomized merchant purchase effects. Train and validate an intervention-selection policy on held-out merchants, intent families and future periods, allowing it to abstain.

### Mechanism

The policy creates value only by choosing deployable changes that produce more real purchases within the same total budget.

### Overlap

Shopify SimGym simulates shoppers, Rollouts runs live tests, and Lily Max advertises testing and approved deployment. Experienced operators using these tools and simple defect rules are strong comparators.

### Edge

Show prospectively that adding simulation improves the selection policy's cumulative purchase outcome beyond that competent workflow. Simulation plus an A/B dashboard is already established.

### Evidence

Purchase impact is hypothesized. SimGym explicitly warns that simulated and actual behavior can differ. Public function tools permit controlled replay, but cannot reproduce proprietary consumer retrieval, ranking, memory or checkout.

### Experiment

Randomize independent merchant portfolios before selection to the simulation-informed policy or rules/experienced operators at equal total compute, labor, implementation and testing budgets. Both arms run properly assigned live tests. Include nulls, harms and a random exploration sample. Count every assigned portfolio across a fixed deployment and buying horizon, then reconcile returns.

### Metric

Total completed purchases per assigned portfolio-period and contribution after returns, including all channels and test-period losses. AI-attributed purchases are separate; upstream changes can increase attribution share without increasing portfolio purchases. Analyze at the policy-assignment level.

### Dependency

Enough independent real trials and portfolios, deployable interventions, order/refund permission, stable outcome definitions and untouched validation data. Fifty model reruns of one intent are not fifty independent buyers.

### Falsifier

Held-out predictions add no useful selection information, or the policy fails to create more real purchases than rules or operators at equal budget. A better simulation score cannot rescue it.

### Impact scenario

Reference sensitivity only: choose all 5,000 monthly AI visits as eligible, a 2.5% purchase baseline and GBP30 contribution after returns. Five additional completed portfolio orders would yield GBP150. Acquisition opportunities and actual eligibility remain unmeasured; zero or negative policy gains are possible.

### Value scenario

An unvalidated GBP99 monthly fee requires 3.3 extra orders for break-even or 9.9 for a 3x value-to-cost hurdle before delivery costs. A portfolio study will often cost much more.

### Implementation

Start with one deployable intervention family. Freeze tool payloads and model versions, treat rank swaps as sensitivity tests, and validate selected releases against actual orders.

### Cost control

Reuse retrieval fixtures and bound simulation runs. Require purchase noninferiority before claiming a cheaper selection process.

### Sources

- [Shopify Help Center | SimGym](https://help.shopify.com/en/manual/online-store/simgym)
- [Shopify Help Center | Types of rollouts and changes](https://help.shopify.com/en/manual/markets/rollouts/rollout-types)
- [How Lily Max Works | Agentic Product Intelligence](https://www.lily.ai/how-it-works/)
- [External Validity: From Do-Calculus to Transportability Across Populations](https://arxiv.org/abs/1503.01603)
- [Function calling](https://developers.openai.com/api/docs/guides/function-calling)

Underlying candidates: measurement-01, profound-01, peec-01, scrunch-08, burnish-01, burnish-02, geoffy-10, datafeedwatch-01, feedonomics-01, simprosys-10, smartseo-10, tinyseo-09, shopify-01, google-01, lilyai-10, truefit-10, algorithmic-08, temporal-10, measurement-02, measurement-03, measurement-04, measurement-05, measurement-06, measurement-07, measurement-08, measurement-09, measurement-10, constructor-07, searchpilot-01, searchpilot-02, searchpilot-03, searchpilot-09, searchpilot-10
