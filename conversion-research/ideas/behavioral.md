# Behavioral ideas for AI-origin purchases

Research snapshot: 29 September 2026. These ten ideas target failed steps in a shopping journey. They are proposed interventions, not measured product results. The full experiment, economics, dependency and source fields are in [behavioral.json](behavioral.json).

The useful unit is the shopper's unfinished task: find a valid match, establish a fact, assemble a working basket, resolve a delivery failure or obtain someone else's sign-off. A conversational interface is one way to complete that task. The product should earn its place by producing additional retained purchases against the merchant's current workflow.

## What the evidence establishes

A large retail field study gives a reason to investigate friction reduction, but its comparator matters. In the current June 2026 revision, query refinement raised sales 2.9% and purchase incidence about 1.2% relatively. The much larger chatbot result, 16.3% more sales and 21.7% higher purchase incidence, compares with no interactive service. The authors find no statistically significant sales or conversion advantage over human replies. None of those estimates measures our proposed interventions or external AI referrals. [Fang et al., v6](https://arxiv.org/html/2510.12049v6)

A descriptive study using 31 million Ctrip users finds that people commonly alternate between chat and search. That supports studying continuity and repeated work, but adoption and usage are selected: engaged customers encounter and use the assistant more often. Higher purchase rates among assistant users do not establish an assistant's effect. [Yan et al.](https://arxiv.org/abs/2603.24947)

Interventions can also harm purchases. Cart-retargeting field experiments found that contact soon after abandonment reduced purchase probability. Another recommendation experiment found different effects at different funnel stages; its proposed policy's up-to-3% sales gain was simulated. These findings argue for a stage-specific test, including a control that receives no additional pressure. [Li et al.](https://journals.sagepub.com/doi/abs/10.1177/0022242920959043), [Wan et al.](https://pubsonline.informs.org/doi/10.1287/isre.2020.0560)

## Ten distinct interventions

### 1. Repair the second failed query without dropping a hard constraint

A shopper has reworded the same request twice without finding a valid option. Record what each edit tried to fix, retain explicit requirements, and ask one necessary clarification before retrieving again. The repair must never quietly turn “under GBP 100 and compatible with device X” into a broader recommendation that fails those conditions.

Algolia already suggests queries, and Constructor already supports conversational product discovery. The proposed advantage is recovering across a sequence of failed attempts. Compare with the merchant's existing assistance at the first qualifying failure, then measure retained purchases across every assigned shopper. Better clicks with no purchase gain would reject the commercial claim. This can start now with good search instrumentation. [Algolia Query Suggestions](https://www.algolia.com/doc/guides/building-search-ui/ui-and-ux-patterns/query-suggestions/in-depth/query-suggestions-faq/angular), [Constructor AI Shopping Agent](https://docs.constructor.com/docs/products-ai-shopping-agents-learn-about-ai-shopping-agent)

### 2. Continue the AI recommendation at the exact variant and unfinished step

A cooperating AI assistant passes a short-lived reference to a shopper-approved brief when the user follows its recommendation. The merchant opens the selected variant and continues the unresolved task, such as checking delivery to the supplied area. Current price and stock are revalidated. The merchant must not pretend to know an external conversation it cannot access.

Shopify already supports agent carts and checkout continuation. The experiment therefore compares native continuation with the same link plus unfinished-task context, holding recommendations and prices equal. Randomize before the referral click and include people who never arrive. This is an integration-heavy partner product; an uncooperative external engine cannot be assumed to supply the brief. [Shopify carts and checkout for agents](https://shopify.dev/docs/agents/carts-and-checkout)

### 3. Replace a repeated comparison loop with a concrete product check

When the shopper explicitly repeats a question about two candidates, offer a bounded check. For example, compare the appliance's documented clearance requirement with a customer-provided shelf measurement. Show the relevant evidence and unknowns, then retain the reason an option failed.

Product questions and comparison answers already exist in Constructor Product Insights and Gorgias. The proposed advantage is completing a verifiable check and avoiding repeated unsuitable recommendations. Randomize against the current assistant; track retained purchases and false passes. Fewer messages are useful only if shoppers make suitable purchases more often. This needs authoritative specifications and supported check types. [Constructor Product Insights](https://docs.constructor.com/docs/products-ai-shopping-agents-learn-about-product-insights-agent), [Gorgias Shopping Assistant](https://docs.gorgias.com/en-US/shopping-assistant-explained-1216108)

### 4. Turn an unanswered question into a reusable supplier fact request

When no source establishes a needed fact, ask a merchant specialist for a precise piece of evidence: an internal measurement, connector photo or documented product revision. Resume the shopper's saved comparison when the answer arrives. Equivalent later questions can reuse the product fact with version checks; private customer context cannot be reused.

Intercom already supports pausing a procedure for teammate input and continuing afterward. The possible advantage is pooling equivalent requests and requiring suitable evidence, instead of initiating a full support conversation each time. Randomize product-question clusters so a published answer does not contaminate control. Count all requesters, waiting time and specialist labor. The claim fails if labor falls without more retained purchases or if incorrect reuse causes returns. [Fin teammate approvals](https://www.intercom.com/help/en/articles/14468561-human-in-the-loop-approvals-for-fin-procedures)

### 5. Route failed assistance to the specialist who can finish the purchase task

Route a failed installation, compatibility or quote task to the relevant human skill. Pass the selected products, attempted checks and unresolved question. Explicit requests for a human are always honored; the experiment concerns optional proactive routing.

Intercom already detects repetitive loops, so detecting frustration is not the innovation. The hypothesis is that task-based skill matching makes better use of the same staffing budget. Test with capacity-aware assignment so treatment does not consume all of control's expert time. Include human-assisted orders: Gorgias's documented assistant attribution excludes handovers, which would give the wrong endpoint for this experiment. Queue delays and total contribution decide whether the policy is worthwhile. [Fin procedures](https://www.intercom.com/help/en/articles/13449439-building-fin-procedures), [Gorgias metric definitions](https://helpcenter.gorgias.com/en-US/how-metrics-are-calculated-ai-and-automation-5666070)

### 6. Check that a project basket can actually complete the shopper's task

For a bounded DIY or technical category, validate a minimum workable set against the shopper's stated goal and equipment they already own. Check compatibility, quantities and missing dependencies. Explain necessary repairs; leave optional additions off.

Constructor already recommends multi-item sets, and Instacart already turns lists into shopping paths. The distinct proposal is checking whether the basket works as a whole. Compare it with the current goal-based recommendations, measuring both retained task orders and all merchant purchases to reveal substitution. A smaller, complete basket can be better than a larger incomplete one, so average order value is secondary. Start with one merchant and a category whose compatibility data can be trusted. [Constructor AI Shopping Agent](https://docs.constructor.com/docs/products-ai-shopping-agents-learn-about-ai-shopping-agent), [Instacart shopping lists](https://docs.instacart.com/developer_platform_api/api/products/create_shopping_list_page/)

### 7. Repair a stockout by replacing only the blocked component

When an authoritative stock check fails, preserve the rest of the shopper's choices. Offer a small set of substitutes that satisfy the original hard requirements and remain compatible with the basket. The shopper chooses a named replacement, waiting or stopping; silence supplies no consent.

Instacart already supports specific backups, best-match review and refund preferences. The proposed advantage is constrained repair in complex categories, against the merchant's existing stockout experience. Test at genuine failure events and count fulfilled retained orders, not accepted substitutions. Inventory interference can require warehouse or time clusters. The feature fails commercially if it shifts purchases toward products with worse returns or contribution. [Instacart replacements](https://docs.instacart.com/storefront/learn_about_your_storefront/cart_and_checkout/replacements/)

### 8. Turn a failed delivery check into a customer-approved feasible plan

A failed delivery check should produce an operational next step. Ask authoritative services for valid shipping, pickup or split-shipment options for the actual cart and destination. Present at most two feasible plans with full cost and honest date bounds; apply only the customer's choice.

Shopify already exposes destination-linked delivery options. The added work is repairing an infeasible basket across real operational choices. Randomize against the current checkout error and help flow. The primary outcome is a paid order delivered within the accepted promise and retained afterward. More checkouts followed by missed deadlines would be a failure. This is integration-heavy and depends on live capacity; an estimate must never become an invented delivery promise. [Shopify CartDeliveryGroup](https://shopify.dev/docs/api/storefront/latest/objects/cartdeliverygroup)

### 9. Resume the last unresolved shopping task when the shopper returns

Let the shopper explicitly save a selected set, rejected alternatives and the question they still need to resolve. At their next voluntary return, restore that task and refresh price and stock. Examples include entering a measurement they went away to check or reconsidering a previously rejected option after their requirements changed.

Native agent carts and recovery flows already exist. Compare a saved task with the same saved cart and identical messaging, randomizing at save time rather than only among returners. This isolates the cost of restarting research. Keep notification experiments separate: the retargeting evidence gives no basis for assuming extra contact is beneficial. This can start now, but stale or intrusive saved context could reduce purchases. [Shopify agent carts](https://shopify.dev/docs/agents/carts-and-checkout), [Klaviyo abandoned-cart flows](https://help.klaviyo.com/hc/en-us/articles/115002779411)

### 10. Give a buying team the specific approval tasks that block payment

A B2B researcher may find products with AI but need someone else to confirm a connector, measure installation space or approve the total. Let that buyer create a shareable project brief with those specific tasks. Separate factual confirmation from authority to order; refresh terms before the authorized payer takes the final action.

SparkLayer already provides quote conversations and limited-user approvals, while Shopify supports drafts for merchant review. The hypothesis concerns completing technical work before the order reaches those systems. Randomize buying organizations against their current quote workflow and follow at least two normal buying cycles. Count paid retained orders, never approved drafts. Extra bureaucracy, unauthorized orders or no payment gain would reject the idea. [SparkLayer Quoting Engine](https://docs.sparklayer.io/quoting), [Shopify B2B checkout settings](https://help.shopify.com/en/manual/b2b/checkout-and-orders/checkout-settings)

## Measurement and economics

“AI-origin” must be observed before treatment: a logged partner AI journey or a known AI referral followed by a real shopper action. Merely using an on-site assistant does not establish external AI origin. Keep unknown-origin users in a separate stratum. Do not infer private prompts from referrers or silently substitute synthetic shoppers for humans.

Use persistent assignment, denominators containing every eligible assigned shopper, and purchases through any later merchant path. The default endpoint in the JSON is an order within 14 days that survives cancellation and full refund through day 45; longer decisions have longer windows. Match recruitment to a preregistered purchase-level power calculation. A nominal four- or eight-week test can remain underpowered. Include all merchant purchases to detect product cannibalization; merchant incrementality still does not prove increased purchasing across the whole market.

The controlled tool-response proposal in the shared conversation is useful for checking factual correctness, constraint preservation and which action an assistant chooses. It does not recreate proprietary consumer systems. Repeated simulated shoppers provide stochastic behavior under the chosen model, not independent human demand. Changing result rank measures sensitivity to an assumed rank change; it does not show how to obtain that rank. Live monitoring can check external behavior, but only a controlled merchant or partner experiment tied to actual orders tests these purchase claims.

No idea has a defensible forecast of AI-origin conversion lift. For each, measure eligible volume N, retained-purchase probability difference d, contribution m and total incremental cost C. Extra contribution is N * d * m - C; break-even d is C / (N * m). The proposed GBP 300 to GBP 1,000 monthly prices are unvalidated willingness-to-pay tests, not market evidence. All scenarios allow zero or negative effects.

The secondary cost goal comes after useful purchases: trigger expensive work only on an observed blockage, cache stable facts, use deterministic checks where possible, and allocate specialist time to tasks they can actually finish. Do not turn lower conversation counts, more attributed revenue or better synthetic completion into claims of incremental purchases.
