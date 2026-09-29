# What I would build first

I would test a product that finds and fixes lost purchases at the handoff from an AI recommendation to a merchant. The harness would help diagnose those failures and select repairs. Its commercial test is whether those repairs produce more completed orders than a well-configured existing stack.

This is a conditional recommendation. We have researched the mechanisms and competition; we have not established the frequency of these failures, a conversion lift or willingness to pay. The right next step is a bounded merchant pilot with a useful repair, an existing-tool comparator and real order outcomes.

## Eight candidates to investigate first

| Candidate | What we would actually change | What must be true for it to matter |
| --- | --- | --- |
| Keep the exact variant through checkout | Carry the recommended SKU, size, colour, quantity and market into the selected product and cart; detect and repair mismatches. | The current feed, storefront or agent integration loses that state often enough to lose purchases. |
| Recover a stockout without breaking the shopper's requirements | Offer a live alternative that satisfies the same hard constraints and obtain approval before substitution. | A suitable alternative exists and ordinary recommendations fail to identify it. |
| Prove compatibility with the shopper's equipment | Match exact models and revisions against sourced rules; show the relevant proof before purchase. | Compatibility uncertainty prevents purchases and a trustworthy source can resolve it. |
| Offer delivery that meets the actual deadline | Resolve address, cutoffs, stock location and fulfilment constraints before presenting an available route. | A feasible route exists and current delivery information hides it or contradicts itself. |
| Build a complete, compatible task basket | Find the smallest feasible set of components needed to complete the shopper's task. | Missing or incompatible components prevent the whole project purchase; larger baskets alone do not count as success. |
| Recover a correctable checkout error | Preserve an approved cart and resolve recoverable validation or payment-state errors within documented APIs. | The failure can be corrected without duplicate orders or changing buyer consent. |
| Show the payable total early enough to act on it | Quote taxes, delivery and applicable charges for the actual buyer context, then preserve that quote or explain changes. | Uncertainty about the final amount causes abandonment and the merchant can supply an accurate quote. |
| Ask one question that changes the decision | Ask only when the answer can remove a meaningful ambiguity; otherwise proceed with the best supported options. | The question resolves a blocking uncertainty and creates fewer abandoned sessions than a competent default flow. |

These are investigation priorities, not eight proven gaps. Constructor already offers multi-item shopping assistance; True Fit addresses fit and identity; Shopify and Google supply cart, offer and checkout infrastructure; Gorgias handles buying questions. The edge must be a specific unresolved failure, broader integration coverage or better measured outcomes. Each selected idea below names its overlap and the comparison that could disprove the advantage.

## Where the harness earns its place

Start with recorded search and product tool responses, factual single-variable edits and a paired control. Keep the shopper intent, model, tools and fixture version in each trace. Then test whether a replay score predicts which merchant change will win a real purchase experiment on merchants and intents held out from development.

Compare that selection policy with a human operator and simple rules given the same repair and experiment budget. If simulation does not select better changes, use it for debugging and remove it from the sales promise. Building the replay layer on an existing evaluation system keeps the first version smaller. The harness chapter provides the detailed implementation and the limits of public APIs.

Measure completed orders per assigned eligible shopper or cluster, then reconcile cancellations and returns. Do not let more recommendations, a higher average basket value or a new attribution window stand in for more purchases. A repair can still have value if it works across all traffic; report the AI-origin result separately when it can be identified.

## Starting free can help, if it produces evidence

Offer a bounded diagnostic and one agreed repair to a small pilot cohort. As planning targets, recruit 5 to 10 merchants in one category, using the same platform where possible. Choose stores with a repeatable purchase problem and enough relevant traffic to investigate it. That is a recruitment plan, not evidence that this many stores are available or sufficient for statistical power.

The free product should leave the merchant with a specific finding: the affected item or journey, the observed failure, its verified source and the action taken. Unlimited simulation credits would attract usage without necessarily teaching us whether the service earns a renewal. Limit free work by catalogue scope, runs and operator time; quote the subsequent paid scope before the free work finishes.

A useful research database would connect the observed defect, its eligibility and exposure, the intervention version, publication checks, treatment assignment, paid orders, mature returns and operating cost. Keep missing outcomes and negative experiments. A collection of prompts and recommendation scores alone would not establish purchase value.

Obtain the merchant permissions needed to retain and use those records. Separate reusable non-identifying failure patterns from merchant-confidential data and buyer-linked records. Do not assume that possession grants permission to pool individual shoppers across stores. Coverage across integrations and credible outcome labels could become an advantage; it would take repeated evidence and customer relationships to build it.

## The commercial constraint

Many ideas here also improve ordinary ecommerce. An AI-only label does not create extra buyer value. If measurable AI traffic is too small to support the fee, test the same repair across the merchant's eligible traffic and sell the broader result, while keeping the AI-specific claim honest. Agencies or higher-volume merchants may provide more relevant cases, but neither automatically solves experiment power or acquisition cost.

Use the calculator below to set a price hypothesis. With 5,000 eligible monthly visits, 2.5% baseline conversion and £30 expected contribution per completed order after returns, an assumed 10% relative lift creates 12.5 extra orders and £375 monthly contribution. A chosen 3x value-to-fee target gives a £125 monthly ceiling before setup and other merchant costs. Those are arithmetic consequences of assumptions, not an estimate of what our product will achieve or what buyers will pay.

For our own business, count model and browser runs, integrations, review time, support and acquisition spending against collected revenue. The earlier [competitor cost model](../competitive-deep-dive.html#support) explores how low monthly fees constrain support. This research does not establish our profit margin. Stop or change the offer if existing tools handle the same failures, the eligible purchase volume is too small, customers do not pay after the free work, or human delivery costs consume the fee.
