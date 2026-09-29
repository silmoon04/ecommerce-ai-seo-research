Measurement and experimentation ideas, 29 September 2026

The opportunity is to make better release decisions from the proposed controlled search proxy. None of the ten ideas below has a demonstrated purchase-lift percentage for this product. They are hypotheses about how a decision process could earn more real orders at the same budget. The accompanying [measurement.json](measurement.json) supplies the full intervention, comparator, data requirements, cost controls, failure modes, falsifier and source registry for every idea.

I read the full saved shared conversation. Its recommendation ladders are illustrations, and moving a product from fourth to second position is an oracle sensitivity test until a deployable merchant intervention achieves that movement. Fifty runs of one invented shopper measure variation in a model's output; they do not create fifty independent human customers or intentions. A proxy experiment can establish what happened inside that proxy. It cannot establish current ChatGPT recommendation rates or incremental human purchases. Research with an older model found substantial problems when substituting model outputs for human experimental participants; that is a reason to validate the bridge, not a measured failure rate for current shopping models. [Park, Schoenegger and Zhu](https://arxiv.org/abs/2302.07267)

Competition is already substantial. [Shopify SimGym](https://help.shopify.com/en/manual/online-store/simgym) compares AI shoppers' theme add-to-cart ratios and explicitly cautions that real behavior may differ. Beyond the monthly allowance, its listed prices are USD 0.75 for one theme and USD 1.50 for a comparison. [Shopify Rollouts](https://help.shopify.com/en/manual/markets/rollouts/rollout-types) provides treatment/control experiments on Grow and higher plans. [Lily Max](https://www.lily.ai/how-it-works/) describes enrichment, controlled tests, holdouts, difference-in-differences and approved winner deployment. This rules out claiming that simulation followed by testing is itself a new category.

The endpoint rules matter as much as the model. For a public product-source change, use paid-order counts per fixed assigned product-family or merchant-time unit. Dividing by visitors who arrive after treatment can condition on a population that the treatment changed. For landing or checkout changes assigned after a genuine AI referral arrives, paid orders per preassigned unique shopper is a suitable downstream endpoint. Keep repeat visits in the same arm. Capture order-origin evidence consistently, report unattributed orders separately, and avoid calling all-channel lift AI-origin lift. If source evidence is incomplete, name the endpoint “detected AI-origin orders” and report coverage and sensitivity; do not imply complete attribution.

Every enabling idea needs two levels of validation. First, does it correctly assess the concrete merchant intervention? Second, does using its decision rule improve cumulative purchases over the merchant's competent existing workflow, including orders lost during testing and delayed rollout? Randomize independent portfolios or merchant groups for the second comparison where possible. Small cluster counts may prevent a reliable conclusion. Model reruns cannot repair that lack of information.

1. **Admit a simulator only after it predicts purchase-winning interventions.**

   Collect a registry of the same candidate changes evaluated in both a frozen simulation and independent merchant trials. Include nulls, harms and randomly explored candidates rather than only selected winners. Learn whether simulator deltas improve the ranking of interventions beyond defect type, traffic and an operator's judgement. Hold out merchants, intervention families and future periods; abstain where the evidence does not support transfer.

   The product earns its place if that ranking puts better changes into the limited live-test queue and yields more orders. Randomize portfolios to calibrated or current selection with equal budgets, then compare cumulative purchases. Prediction accuracy is a diagnostic. It is not a conversion rate. Formal transportability research requires explicit assumptions about differences between populations, and does not license replacing a human purchase outcome with a synthetic recommendation. [Pearl and Bareinboim](https://arxiv.org/abs/1503.01603)

   Kill this idea if the calibrated selector does not improve real purchase decisions on unseen merchants. A GBP 1,000 monthly portfolio pilot is an unvalidated price test, justified only by measured contribution beyond the fee.

2. **Plan catalogue trials around propagation and stable assignment.**

   A factual source edit is public and persistent. Group variant families, canonical duplicates and tightly linked pages before randomizing, and keep assignment stable while engines crawl or ingest the changes. Use propagation pilots to set the observation window. Retain unpropagated treated clusters in the primary analysis; starting only after successful treatment ingestion selects on a treatment outcome.

   [Statsig already supports URL-level SEO experiments](https://docs.statsig.com/experiments/types/seo-testing), indexing diagnostics and conversion guardrails. [DataFeedWatch already distributes title variants across product IDs](https://www.datafeedwatch.com/blog/ab-testing-product-titles). The proposed edge is better product-family assignment, actual propagation evidence and purchase decisions compared with those workflows.

   Compare the chosen releases from this design with the existing design policy across independent portfolios. Longer trials must prevent enough wrong decisions to repay the orders lost while waiting. A short switchback is inappropriate when a previous source version may persist beyond the assumed washout; switchback validity depends on carryover. [Bojinov, Simchi-Levi and Zhao](https://arxiv.org/abs/2009.00148)

3. **Reject false winners with predeclared falsification controls.**

   Add bounded A/A checks, assignment-ratio checks, pre-period placebos and intervention-specific negative controls. A semantic-preserving sham can test the offline harness without publishing false product facts. A control outcome must have a defensible reason to remain unaffected; substitute-product demand is often a poor choice because real spillovers may affect it.

   Negative controls can detect bias under conditions, but passing them is not proof of causality. [Lipsitch, Tchetgen Tchetgen and Cohen](https://dash.harvard.edu/entities/publication/73120379-21f6-6bd4-e053-0100007fdf3b) Microsoft already treats sample-ratio checks as a gate before interpreting effects, so generic diagnostics are established practice. [Microsoft Research](https://www.microsoft.com/en-us/research/articles/diagnosing-sample-ratio-mismatch-in-a-b-testing/)

   Begin in shadow mode, then compare the additional release gate with existing competent quality checks across portfolios. Fix known broken instrumentation in both arms. The purchase mechanism is avoided harmful releases and better use of recovered implementation capacity. Reject the feature if false alarms and delay cost more orders than it preserves. More warnings are not success.

4. **Test complementary funnel repairs before funding the biggest drop.**

   A simulated funnel's largest drop does not identify the most valuable causal bottleneck. A verified delivery-cutoff fact in a retrieved product source may help only when the landing page preserves that promise with an accurate location-aware delivery calculation. Test source repair, landing repair, both and neither in a prespecified 2x2 product-family cluster trial.

   Measure main and interaction effects on orders across all assigned clusters. For purchase probabilities p00, p10, p01 and p11, the interaction is p11 - p10 - p01 + p00. The paired package's gain is p11 - p00; it is not the sum of selected funnel percentages. Even a positive interaction can accompany a harmful total package. [NIST's factorial guidance](https://itl.nist.gov/div898/handbook/pri/section5/pri594.htm)

   Shopify already permits combined rollout changes and Lily already prepares test variants. The commercial hypothesis is that selecting complementary source-to-destination repairs beats choosing the largest funnel drop or testing one change at a time. Power the interaction, not just the main effects, and validate the selected package on a fresh deployment cohort.

5. **Reuse randomized shopping logs to reject weak retrieval policies.**

   This applies where the merchant controls the assistant's retrieval or offer routing. Log pre-action context, the allowed action set, the selected action and its exact probability, plus mature paid orders. Evaluate supported candidate policies with doubly robust methods, cross-fitting and uncertainty bounds. Reject unsupported actions and pathological weights rather than inventing their rewards.

   [Vowpal Wabbit already implements offline policy evaluation](https://vowpalwabbit.org/docs/vowpal_wabbit/python/latest/tutorials/off_policy_evaluation.html). Its methods cannot recover unobserved action probabilities from proprietary ChatGPT or Google behavior. [Doubly robust evaluation](https://arxiv.org/abs/1103.4601) supplies a useful estimator, while [research on adaptive logging](https://arxiv.org/abs/2106.02029) explains why inference still requires care.

   The gain would come from skipping weak live tests and deploying verified good policies sooner, net of safe exploration loss. Randomize assistant deployments to this screen or current candidate selection, then validate finalists on fresh real shoppers. Keep the same total budget. If offline rankings fail prospective purchase calibration, stop using them for release selection.

6. **Measure whether AI wins add orders or only move them between products.**

   Build a pre-treatment graph of substitute products and shared stock or delivery capacity. Randomize sufficiently separate demand clusters to no treatment, partial treatment or full treatment. Randomize products within partially treated clusters. The outcome is total cluster purchases, including untreated substitutes.

   Two-stage designs can separate direct and spillover effects under a no-interference-between-groups assumption. [Hudgens and Halloran](https://pmc.ncbi.nlm.nih.gov/articles/PMC2600548/) Marketplace research has tested cluster designs empirically, but a lodging pricing result does not forecast ecommerce AI lift. [Airbnb pricing meta-experiment](https://pubsonline.informs.org/doi/10.1287/mnsc.2020.01157)

   The release rule should prefer changes that increase the merchant's whole order pool. If treated-product orders rise by G, internal displacement is C and capacity losses are S, merchant incremental orders are G - C - S. Check merchant totals for cross-cluster displacement. Statsig already offers cannibalization diagnostics; the new claim needs to be better full-rollout decisions. Abandon it where clusters cannot be separated or the variance penalty makes the decision unusable.

7. **Spend experiment budget where a decision can still create orders.**

   Allocate test traffic, engineering time and simulator calls against a finite selling horizon. For each candidate, consider effect uncertainty, inventory, remaining demand, implementation cost and reversibility. The next action can be another batch, a bounded release, retaining control or abandonment. Use sequentially valid inference and pre-treatment variance reduction only when their assumptions fit the design. [Johari and colleagues](https://pubsonline.informs.org/doi/10.1287/opre.2021.2135), [Microsoft CUPED explanation](https://www.microsoft.com/en-us/research/group/experimentation-platform-exp/articles/deep-dive-into-variance-reduction/)

   [Statsig already offers sequential testing](https://docs.statsig.com/experiments/advanced-setup/sequential-testing). Faster statistical decisions alone are not the edge. Randomize portfolios to the allocator or existing queue at equal all-in cost and compare cumulative orders before the selling horizon ends.

   A chosen sensitivity example shows the economics: 20,000 eligible users monthly, a true 0.1 percentage-point purchase improvement and release seven days earlier produce about 4.67 extra orders before mistake costs. At an assumed GBP 25 contribution per order, that alone does not cover a GBP 500 monthly fee. The example is arithmetic, not a forecast.

8. **Protect release decisions from simulator-specific overfitting.**

   Separate candidate creation, tuning and final evaluation by merchant, intent family and future period. Freeze finalists before an independent evaluator sees locked tasks. Retire a holdout after material adaptive use. Merely hiding individual prompts while repeatedly revealing scores can still leak the distribution.

   Adaptive data analysis research shows why reusable validation needs protection. Ordinary splitting does not inherit the formal guarantees of a specially designed reusable holdout. [Dwork and colleagues](https://pubmed.ncbi.nlm.nih.gov/26250683/) Require a truthful deployable change before graduation; artificial rank promotion can remain a sensitivity probe.

   Test protected graduation against the existing screening policy with equal generation and live-test budgets, then measure subsequent real orders. The benefit must exceed evaluation delay and false rejection of unusual good ideas. Keep records portable: the current [OpenAI Evals guide](https://developers.openai.com/api/docs/guides/evals) announces read-only access on 31 October 2026 and shutdown on 30 November 2026. This operational dependency is separate from the scientific value of evals.

9. **Let fast proxies earn a limited role through mature purchase evidence.**

   Maintain an intervention-specific register of whether early signals predict mature randomized purchase effects on held-out trials. A promising proxy can authorize bounded provisional exposure while a persistent randomized control continues. When paid orders mature, reconsider the release. Keep cancellations, returns and contribution visible rather than quietly redefining purchases.

   [Surrogate-index research](https://www.nber.org/papers/w26463) requires strong surrogacy and comparability assumptions. A high cart-purchase correlation does not meet them by itself. [Statsig already charts cross-experiment metric correlations](https://docs-legacy.statsig.com/experimentation/meta-analysis/), and [Eppo already supports cumulative holdouts](https://docs.geteppo.com/feature-flagging/concepts/holdout-config/).

   The proposed product is a validated provisional release rule with an expiry, not another correlation chart. Compare it with decisions that wait for mature outcomes, measuring all purchases over the same complete horizon. Extra orders from earlier true winners must exceed loss from provisional mistakes. Reject the policy when new intervention families break the proxy relationship.

10. **Pool comparable merchant trials without hiding who benefits.**

    An opt-in cooperative can apply one narrow intervention protocol across stores too small to resolve useful effects alone. Harmonize purchase windows and treatment versions, preserve the correct randomization unit, share aggregate summaries where feasible, and estimate both average effects and heterogeneity. Limit borrowing and validate on untouched merchants.

    Hierarchical analysis across randomized studies is established. [Meager's seven-study analysis](https://www.aeaweb.org/articles?id=10.1257/app.20170299) illustrates the method; it does not establish that merchants are exchangeable. Statsig has a knowledge bank, and Lily says it learns across tests, so the differentiator must be a governed cooperative that improves purchases for underserved low-traffic stores.

    Randomize merchant groups to cooperative or isolated decision policies at equal total budget. Report total orders and merchant-specific harm, since a positive portfolio effect can hide losses at smaller members. Never call a pooled estimate a directly observed effect for a store with little data. A proposed GBP 100 per-merchant monthly price is unvalidated; several months of real outcomes may be needed before any credible claim.

These ideas should not be added together as independent uplift. Calibration, protected evaluation and negative controls can prevent the same bad release. A program-level randomized comparison or persistent holdout is needed to establish their combined order value. The most distinct product bets are purchase-calibrated selection, complementary funnel repair selection, full-catalogue interference decisions, finite-horizon budget allocation and carefully bounded low-traffic pooling. The remaining ideas are useful enabling work only if their decision-value tests pass.
