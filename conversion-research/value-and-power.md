# Conversion value and experimental power

Research date: 29 September 2026. These methods support the final 50 ideas; they do not supply empirical lift estimates for them. The numerical merchant cohorts below are editable examples, not market averages. No purchase experiment was run for this note.

An idea's expected conversion lift should remain **unknown** until relevant purchase evidence exists. A useful commercial answer is still possible: state the eligible population, the proposed causal mechanism, the effect needed to cover the price, and the experiment needed to establish that effect. With the illustrative middle cohort of 5,000 eligible AI visits a month, 2.5% purchase conversion and £30 retained contribution per completed order, a 10% relative conversion improvement means 12.5 additional orders and £375 additional monthly contribution. A £99 subscription then clears a chosen 3x value-to-cost hurdle before other implementation costs. None of those inputs establishes that an idea can achieve 10%.

## Claims that must remain separate

| Evidence label | What can be reported | What it cannot establish |
| --- | --- | --- |
| Direct measured AI purchase effect | A named intervention, population, AI origin definition, comparator, assignment method, observed purchase effect, uncertainty interval and dates. Identify randomized versus observational evidence. | That another merchant, market, model or intervention receives the same effect. Observational attribution alone cannot establish incrementality. |
| Adjacent experiment or vendor claim | The original outcome and setting, such as paid-shopping orders, general ecommerce conversion, or a vendor's reported A/B result. State missing design information and vendor involvement. | A numeric expected effect for AI-origin purchases. A vendor's causal language is not proof that confounding was controlled. |
| Measured simulation or live monitoring | A reproducible recommendation, citation, retrieval or correctness result for the recorded test distribution. | A consumer purchase effect or the recommendation probability experienced by all production users. |
| Hypothesis or planning scenario | Explicit assumptions, a formula, sensitivities and the break-even target. Include zero and negative outcomes. | An empirical-looking expected range or a willingness-to-pay finding. |

The shared conversation's 12% to 67% recommendation ladder and 18.4% to 31.7% comparison are invented illustrations. Their values must not enter a forecast, prior fitted from evidence, sales claim or price justification. Fifty reruns of one shopper prompt can estimate stochastic variability conditional on that prompt and tool fixture. They do not provide fifty independent shoppers or fifty independent intents.

For each idea, retain both `evidenceClass` and `expectedRelativePurchaseLift`. Set the latter to `null` when unsupported, even when an attractive sensitivity example is available. A source saying a feature exists belongs in mechanism evidence, not in measured-effect evidence. This note has not independently classified every product agent's vendor case; those cases need their own source audit.

## Value is incremental retained contribution

Use a fixed outcome horizon and a population defined before treatment. For an independently assigned person, let `Y(z)` be contribution from **all** their merchant orders during the horizon under assignment `z`, including zero for no orders and subsequent return losses. The average difference in contribution caused by assignment is `E[Y(1) - Y(0)]`. Multiplying by the eligible rollout population gives incremental contribution. Following all linked orders helps capture delayed purchases and substitution between channels instead of rewarding a new attribution label. Count completed orders only when they reach a declared paid-purchase state; a payment authorization or a created checkout is not enough.

For the simpler planning model, define:

| Input | Meaning |
| --- | --- |
| `N` | Monthly visits in the stated AI-origin cohort. Traffic volume is unknown until measured. |
| `e` | Fraction eligible for this intervention, defined using pre-treatment facts. |
| `p0`, `p1` | Completed-order probability per eligible visit under control and treatment. The simple model assumes at most one counted order per visit. |
| `c0`, `c1` | Expected retained contribution per completed order, after cancellations, refunds and variable order costs. |
| `K` | Incremental monthly non-subscription operating costs, including merchant review work, experiment execution, and setup amortized over an explicit horizon. |
| `P` | Monthly subscription price, using a consistent tax basis. |
| `L` | Separately verified monthly value of avoidable or usefully redeployed labor. |

The formulas are:

```text
eligible_visits = N * e
incremental_orders = N * e * (p1 - p0)
incremental_retained_contribution = N * e * (p1*c1 - p0*c0)
merchant_net_value = incremental_retained_contribution + L - K - P

If c1 = c0 = c and u = (p1 - p0) / p0:
incremental_orders = N * e * p0 * u
incremental_retained_contribution = N * e * p0 * u * c
break_even_relative_lift = (P + K - L) / (N * e * p0 * c)
```

Apply the simplified formula only when its assumptions fit. Discounts may increase orders and reduce `c1`; bad fit recommendations may increase returns. Both can make a conversion win an economic loss. Estimate contribution from the order ledger after a declared return window, or disclose the provisional reserve and reconcile it when outcomes mature.

Here **£30 means expected contribution per completed order after returns**, not revenue, gross merchandise value, gross margin percentage or contribution conditional on keeping an order. Its underlying ledger includes sales net of discounts and applicable sales taxes, less net cost of goods, payment fees, fulfillment and shipping subsidy, expected refunds, cancellation loss, reverse logistics and nonrecoverable return loss, with recovered goods credited consistently. Do not deduct the same refund or cost a second time. No separately invented return-rate assumption is needed for the tables because its effect is already inside £30. Report the number of retained orders separately from completed orders; these tables calculate additional completed orders and their expected retained contribution.

Attribution answers which recorded source receives credit. Incrementality asks what would have happened without the intervention. An increase in AI-attributed revenue may be channel substitution, a tracking change, demand growth or seasonality. Keep attributed orders as a descriptive measure alongside the experimental difference and total merchant contribution.

## Eligibility, acquisition and overlap

An idea fixing delivery ambiguity on 20% of relevant visits cannot receive the full-store example by default. With 5,000 AI visits, `e=0.20`, `p0=0.025`, `u=0.10` and `c=£30`, the conditional scenario is 2.5 extra orders and £75 contribution, giving a £25 ceiling at the 3x value-to-cost hurdle when other costs are zero. Eligibility is traffic-weighted, not simply the percentage of catalogue SKUs with a defect. The eligible group's baseline may differ from the whole store's baseline; measure it.

For discovery interventions, the intervention changes arrivals. A descriptive funnel can be written as `eligible AI shopping opportunities * probability of merchant visit * purchase probability given a visit`. The first denominator will often be unavailable without platform cooperation. Do not invent it from a prompt panel. Where nested stages are genuinely observed, expand visit probability into conditional discovery and click probabilities; each stage needs its own denominator. A recommendation is a diagnostic stage, not a required step for every purchase.

If traffic changes by `a` and conditional conversion changes by `b`, a scenario with a comparable population gives order change `(1+a)*(1+b)-1`, including the interaction. It is not `a+b`. More seriously, comparing conversion only among the users an acquisition change caused to arrive selects on a post-treatment event. Randomize eligible catalogue or market clusters before acquisition and compare outcomes for those fixed clusters, or use a platform experiment that assigns eligible shopping opportunities before exposure. Report AI-attributed orders and all-channel orders together to detect substitution. State when the design can identify total sales effects but cannot identify the AI-origin component.

Two ideas fixing the same failure can recover the same order. Do not add their standalone lifts or price ceilings. Use a bundle experiment, an adequately powered factorial design, or estimate the second idea's marginal effect after the first. Even independent stages compound rather than add. The final 50 ideas form alternative bets and possible combinations, not a 50-row revenue sum.

## Three editable merchant scenarios

All inputs below are chosen for arithmetic. `e=1`, `p0=2.5%`, `c=£30`, `K=£0`, and `L=£0`. Traffic counts are monthly eligible AI visits. Each merchant must replace them with its own measured cohort. The baseline monthly completed-order counts are 25, 125 and 500. Fractional orders are expected values over repeated periods.

| Relative conversion change | Treatment conversion | 1,000 visits: extra orders / contribution | 5,000 visits: extra orders / contribution | 20,000 visits: extra orders / contribution |
| --- | --- | --- | --- | --- |
| -10% stress case | 2.250% | -2.5 / -£75 | -12.5 / -£375 | -50 / -£1,500 |
| 0% | 2.500% | 0 / £0 | 0 / £0 | 0 / £0 |
| +1% | 2.525% | 0.25 / £7.50 | 1.25 / £37.50 | 5 / £150 |
| +5% | 2.625% | 1.25 / £37.50 | 6.25 / £187.50 | 25 / £750 |
| +10% | 2.750% | 2.5 / £75 | 12.5 / £375 | 50 / £1,500 |
| +20% | 3.000% | 5 / £150 | 25 / £750 | 100 / £3,000 |

A 10% **relative** lift moves 2.5% to 2.75%, an increase of 0.25 percentage points. It does not move conversion to 12.5%. The positive sensitivity values are not a confidence interval, probability distribution or claimed expected range; they are arbitrary planning points. Effects below zero remain possible.

## Test prices and a clear return hurdle

Use a **3x value-to-cost hurdle** for the main price calculation: verified benefits must be at least three times all incremental customer costs. This is a chosen commercial policy, not observed willingness to pay. At this hurdle, the customer's net ROI is 200%. If "3x ROI" means 300% net ROI, use a 4x value-to-cost hurdle instead.

```text
3x value-to-cost condition: contribution + L >= 3 * (P + K)
subscription_ceiling_at_3x = max(0, (contribution + L)/3 - K)
literal_300_percent_net_ROI_ceiling = max(0, (contribution + L)/4 - K)
relative_lift_needed_at_3x = (3*(P+K) - L) / (N*e*p0*c)
```

The clamp to zero means no positive subscription is justified; it does not erase negative merchant value. If contribution is unknown, the evidence-supported ceiling is unknown, not the positive result of a scenario. Replace hypothetical contribution with a conservative decision estimate once data exist, show its uncertainty, and disclose how that estimate was chosen. Do not silently turn a scenario into a sales guarantee.

At the four illustrative prices below, the monthly extra-order break-even values are 1.63, 3.30, 6.63 and 16.63. Since actual orders are discrete, at least 2, 4, 7 and 17 additional orders would cover those fees at exactly £30 each. Neither statement includes other customer costs.

| Monthly test price | Lift to break even: 1,000 visits | 5,000 visits | 20,000 visits | Lift to meet 3x hurdle: 1,000 visits | 5,000 visits | 20,000 visits |
| --- | --- | --- | --- | --- | --- | --- |
| £49 | 6.53% | 1.31% | 0.33% | 19.60% | 3.92% | 0.98% |
| £99 | 13.20% | 2.64% | 0.66% | 39.60% | 7.92% | 1.98% |
| £199 | 26.53% | 5.31% | 1.33% | 79.60% | 15.92% | 3.98% |
| £499 | 66.53% | 13.31% | 3.33% | 199.60% | 39.92% | 9.98% |

Every percentage in this price table is a required **relative** conversion change. A required change is not a plausible change. Recalculate feasibility when `p0*(1+u)>1`, contribution is nonpositive, or the eligible population is zero.

| Hypothetical achieved lift | Maximum monthly fee at 3x: 1,000 visits | 5,000 visits | 20,000 visits |
| --- | --- | --- | --- |
| +1% | £2.50 | £12.50 | £50 |
| +5% | £12.50 | £62.50 | £250 |
| +10% | £25 | £125 | £500 |
| +20% | £50 | £250 | £1,000 |

£49, £99, £199 and £499 are unvalidated test prices, not surveyed demand or recommendations for all merchants. Published competitor prices can establish an available alternative; they cannot establish what a customer will pay for our effect. Test a concrete offer with measured eligibility and a buyer who owns that budget, then observe paid acceptance and retention.

Labor savings are secondary and separately reported: verified hours avoided times fully loaded hourly cost times the share actually saved or productively redeployed, less new review work. If those costs are already in `K`, do not subtract them again. A tool that saves labor but produces fewer incremental retained orders has failed the primary objective. Use cost per additional retained order only when the denominator is positive and measured. Hold purchase outcomes and data quality to a declared non-inferiority standard before claiming a cheaper process is equally effective.

## Purchase tests need much more traffic than prompt tests

For planning, use an equal-allocation two-arm comparison of independent binary purchase outcomes, two-sided `alpha=0.05`, power `0.80`, baseline `p0=0.025`, no continuity correction, no interim looks and no multiplicity adjustment. These are normal-approximation sample sizes, not exact finite-sample binomial calculations. The formula uses a pooled variance under the null and separate variances under the alternative; this matches the assumptions documented by [statsmodels' two-proportion power routine](https://www.statsmodels.org/stable/generated/statsmodels.stats.proportion.power_proportions_2indep.html). Its [explicit sample-size routine](https://www.statsmodels.org/stable/generated/statsmodels.stats.proportion.samplesize_proportions_2indep_onetail.html) describes the negligible opposite-tail approximation used in the closed form.

```text
p1 = p0 * (1 + relative_lift)
p_bar = (p0 + p1) / 2
delta = p1 - p0
z_alpha = inverse_standard_normal(1 - alpha/2) = 1.9599639845
z_power = inverse_standard_normal(power) = 0.8416212336

n_per_arm = ceil(
  [z_alpha*sqrt(2*p_bar*(1-p_bar))
   + z_power*sqrt(p0*(1-p0) + p1*(1-p1))]^2 / delta^2
)
```

| Detectable relative lift | Treatment purchase rate | Absolute change | Independent users per arm | Total users |
| --- | --- | --- | --- | --- |
| +10% | 2.75% | +0.25 percentage points | 64,199 | 128,398 |
| +20% | 3.00% | +0.50 percentage points | 16,792 | 33,584 |
| +50% | 3.75% | +1.25 percentage points | 3,041 | 6,082 |

The arithmetic was independently calculated with Python's standard library and checked by evaluating both rejection tails of the normal approximation at the rounded sample sizes. The resulting powers are approximately 0.800003, 0.800013 and 0.800096. The distinction between including and ignoring the opposite tail is also described in [R's `power.prop.test` documentation](https://www.stat.ethz.ch/R-manual/R-devel/library/stats/html/power.prop.test.html). Reproduction code:

```python
from math import ceil, sqrt
from statistics import NormalDist

normal = NormalDist()
za, zb, p0 = normal.inv_cdf(0.975), normal.inv_cdf(0.80), 0.025
for lift in (0.10, 0.20, 0.50):
    p1 = p0 * (1 + lift)
    pbar, delta = (p0 + p1) / 2, p1 - p0
    v0 = 2 * pbar * (1 - pbar)
    v1 = p0 * (1 - p0) + p1 * (1 - p1)
    n = ceil((za * sqrt(v0) + zb * sqrt(v1)) ** 2 / delta ** 2)
    s0, s1 = sqrt(v0 / n), sqrt(v1 / n)
    power = (1 - normal.cdf((za*s0-delta)/s1)
             + normal.cdf((-za*s0-delta)/s1))
    print(lift, n, 2*n, power)
```

If every monthly visit were a different eligible person, all traffic were enrolled, and there were no clustering or missing outcomes, minimum enrollment times would be:

| Target relative lift | 1,000 independent users/month | 5,000/month | 20,000/month |
| --- | --- | --- | --- |
| +10% | 128.40 months | 25.68 months | 6.42 months |
| +20% | 33.58 months | 6.72 months | 1.68 months |
| +50% | 6.08 months | 1.22 months | 0.30 months |

These are division results, not recommended durations or promises. Repeated visitors, narrower eligibility, missing identity links, delayed orders and a return window make them longer. At multi-year durations, a stable treatment and traffic distribution are implausible assumptions. At short durations, a full buying cycle and outcome maturation can still dominate. The 50% row is a sensitivity calculation, not a claim such large effects are likely. Eighty percent power means the planned test detects the specified true effect about 80% of the time under its assumptions; it is not an 80% probability that the idea works.

This table powers **any completed purchase per unique assigned user**. The economic visit model can use the same numbers only under the simplifying one-visit, at-most-one-order assumption. For repeated purchases, per-order contribution, refunds or retention, use the observed outcome variance and the intended user or cluster estimator; the binary table does not guarantee power for those endpoints.

## Assignment and analysis rules for this product

For a post-arrival merchant change, randomize a persistent visitor or consented account at first eligible entry and retain that assignment across visits. Measure all assigned users, including those who never trigger a later step. For catalogue changes that become public and are crawled or cached, ordinary visitor A/B assignment cannot isolate what a third-party engine saw. Choose independently assignable catalogue, geographic or merchant clusters with pre-treatment stratification and enough clusters, or obtain a platform-supported experiment. A time switchback is only credible if recrawl delays, caching, shopping memory and other carryover can be bounded. A simple before/after period is not a randomized experiment.

Clustering reduces effective information. For equally sized clusters of `m` members and intracluster correlation `rho`, the approximate design effect is `1+(m-1)*rho`. An illustrative `m=50`, `rho=0.02` gives `1.98`, nearly doubling the independent-user requirement. These values are chosen examples. Unequal cluster sizes, few clusters, repeated time blocks and heterogeneous effects need design-specific power calculations and analysis at the assignment level. The design effect and need to account for correlation are set out in the [CONSORT extension for cluster randomized trials](https://www.bmj.com/content/345/bmj.e5661).

Catalogue clusters can contaminate each other when products are substitutes, feed attributes propagate across variants, recommendations compare both arms, or purchases move to untreated SKUs. A higher treated-SKU count can coincide with no merchant-wide gain. Record these paths, consider broader clusters and measure portfolio contribution. Cluster-robust standard errors alone do not repair an experiment with the wrong interference assumptions.

For synthetic tests, randomize interventions within independent, held-out intent families and product sets. Repeated runs are nested within those units. Preserve model version, tool fixture, result order, prompt, locale, date and seed where available. Bootstrap or aggregate at the independent intent or cluster level. Holding everything fixed and moving a product's rank measures sensitivity to supplied rank; it does not establish a deployable method to obtain that rank. Validate promising simulated interventions against live observation and then purchases, measuring how often the simulator's predicted direction transfers.

## Fifty ideas do not imply fifty uncorrected success claims

Predeclare the purchase endpoint, minimum effect worth shipping, randomization unit, analysis horizon, exclusions, treatment exposure rules and guardrails. Use an A/A or equivalent assignment audit, deduplicate order IDs, and check the allocated sample ratio before interpreting effects. Microsoft's [account of sample ratio mismatch](https://www.microsoft.com/en-us/research/articles/diagnosing-sample-ratio-mismatch-in-a-b-testing/) explains why assignment or logging faults can invalidate apparent wins.

Select candidates with exploratory diagnostics, then test a small shortlist on untouched merchant traffic. Preserve unsuccessful tests. If all 50 independent null hypotheses were tested at 5%, the probability of at least one false positive would be `1-0.95^50 = 92.31%`. Independence is an illustrative assumption; the actual tests may be correlated. For a confirmatory family of 50 claims, Bonferroni would use `alpha=0.001` per comparison, as an application of [NIST's description of the Bonferroni principle](https://www.itl.nist.gov/div898/handbook/prc/section4/prc463.htm). Under the same +10% scenario, this raises the planning requirement to 139,661 users per arm, 279,322 total. Preplanned Holm adjustment or an appropriate shared-control design may be less conservative. Repeatedly checking an ordinary fixed-horizon p-value also requires a valid sequential design or a fixed stopping rule.

Do not turn an underpowered nonsignificant estimate into evidence of no effect. Report its interval and whether it rules out the minimum useful effect. An inconclusive merchant test may contribute to a planned multi-merchant study, but partial pooling cannot manufacture local evidence. Preserve merchant, platform and market heterogeneity, specify the population for the pooled claim, and validate on held-out merchants. Planning sample size around a large desired lift does not make that lift probable.

## Events and cohort ledger

Capture assignments and orders in a first-party ledger with a stable schema, lawful identity linkage and data minimization. Keep independent rows for `merchant_id`, `commerce_platform`, `ai_origin`, `market`, `locale`, `currency`, `device_class`, `new_or_returning`, eligibility rule version, experiment and variant, assignment unit and time, catalogue version, and observation window. Record AI engine and model version only where actually known; do not infer a consumer model version from a referral domain. Unknown origin stays `unknown`.

Record `eligible`, `assigned`, `exposed`, `landing`, `product_view`, `cart`, `checkout_started`, `purchase`, `cancel`, `refund` and final contribution reconciliation, linking orders by a unique transaction ID and product/variant IDs. Offline `discovered`, `understood`, `shortlisted` and `recommended` events belong in a separate dataset with an explicit `simulation` provenance flag. Google documents purchase and refund events and the transaction ID used to connect them in its [ecommerce measurement guide](https://developers.google.com/analytics/devguides/collection/ga4/ecommerce). Use the merchant ledger as the financial source of truth and reconcile analytics coverage against it.

OpenAI documents `utm_source=chatgpt.com` on referral URLs in its [publisher FAQ](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq). That supports classification of those observed referrals. It does not identify every AI-influenced purchase or establish that tagging caused an order. Keep observed referral, declared origin, authenticated platform handoff and unknown origin as distinct evidence types. Measure missingness and report coverage; never gross up to an imagined total AI market using an unsupported multiplier.

Before choosing the first live tests, fill a cohort table with actual eligible users, visits, purchases, retained orders, contribution, returns, unknown-origin share and independently assignable clusters for each merchant, commerce platform, AI engine and market. These quantities are currently **unknown**. The hypothetical 1,000/5,000/20,000 visits do not assert demand, event availability, regional feature availability or an addressable market.

## What would earn a commercial advantage

A credible advantage is a reproducible increase in incremental retained contribution, or a demonstrably cheaper way to obtain the same increase, against the merchant's native tooling and a competent lower-cost workflow. Choose that comparator before the test. Price against the difference that our product adds, not against the entire value of fixing the store. A simulator gains commercial credibility by rejecting bad interventions cheaply and predicting live purchase direction on held-out merchants; it does not gain it merely by producing precise scores.

For each final idea, show its evidence label, eligible defect or intent population, causal purchase endpoint, unknown or measured effect, a conditional contribution calculation, an unvalidated test price and required lift, incremental delivery cost, comparator, and falsifier. If the mechanism stops at visibility or recommendation, say what downstream evidence is still needed. Leave the empirical lift field blank until that evidence arrives.
