# Freemium, distribution, retention, and a six-week validation test

**Research date:** 28 September 2026  
**Scope:** Shopify-oriented AI product discovery / SEO SaaS, especially a free audit that may lead to a paid recurring workflow or an agency pilot.

## Recommendation

Use a **bounded, ungated sample audit as the acquisition and learning surface**, but test paid value directly through a **time-limited, human-assisted agency pilot**. Do not launch unlimited free crawling or make a free-audit-to-paid conversion rate the business case.

The audit should reveal a small set of evidence-backed findings quickly. It can collect opt-in contact details to save a report or receive a follow-up, and structured feedback with separate consent. Treat any resulting dataset as a hypothesis: useful proprietary data would require permissioned, representative observations linked to merchant-approved changes and real outcomes. A pile of URLs, generated scores, or unimplemented recommendations is not a moat.

Paid value needs to recur after the first cleanup: repeated catalogue changes, reliable before/after checks on a clearly stated test protocol, prioritised worklists, multi-store / client reporting for agencies, and safe implementation with merchant approval. If merchants only want a one-off diagnosis, test a paid audit/project rather than assume subscription retention.

## What the benchmark evidence does and does not say

ChartMogul, ProductLed, and Growth Unhinged's February 2026 Conversion Report reports a survey of **200 B2B software products**. Respondents were typically $1–10m ARR, with average revenue per customer of $50–249/month; 34% were under $1m ARR, 55% mostly SaaS, and 39% AI-native or AI/SaaS hybrid. It defines free-to-paid as the share of leads or free signups becoming customers **within six months**. The overall median was 8%, with wide dispersion. Its segment medians are useful as comparisons, not a forecast: conventional freemium “good” is 3–5%, ungated freemium visitor-to-paying conversion is around 0.56% in its illustrative funnel (7% signup × 8% free-to-paid), and no-card trials around 0.36% (4.5% × 8%). Signup friction and the numerator/denominator change the answer materially. The report itself says free trials had slightly higher signup-to-paid conversion but lower signup volume, which erased that advantage at the visitor level. These are self-reported survey and illustrative funnel results, not observed performance for ecommerce merchants or this product. [ChartMogul / ProductLed / Growth Unhinged, 2026 SaaS Conversion Report](https://chartmogul.com/reports/saas-conversion-report/)

ProductLed's 2022 survey write-up (published 2025) says 600+ SaaS businesses were surveyed and reports approximately 9% free-account-to-paid conversion on average, with PQL users converting about three times more often. This is older, vendor-published survey evidence; its summary does not give enough denominator and sampling detail to transfer the rate to a 2026 Shopify app. It does support instrumenting qualifying actions rather than treating all free signups as equal. [ProductLed, Product-Led Growth Benchmarks](https://productled.com/blog/product-led-growth-benchmarks)

These reports do **not** justify a forecast such as “7% of free merchants will pay.” They concern different categories and motions, and a free audit may have one-time value while the paid product is meant to be recurring. Use them only to understand why measuring both visitor-to-paid and free-user-to-paid matters and why a broad benchmark is a poor substitute for a cohort test.

### The ChartMogul AI retention figures

The December 2025 ChartMogul report does substantiate the cited price-bucket figures, with important qualifications:

| AI-native products' monthly price | Median annualized GRR | Median annualized NRR |
| --- | ---: | ---: |
| Under $50 | 23% | 32% |
| $50–$249 | 45% | 61% |
| Above $250 | 70% | 85% |

The study scraped websites for roughly 3,500 software companies, using AI to classify about 2,700 B2B SaaS, 600 B2C SaaS, and 200 AI-native companies. Retention analysis covered businesses with at least $250k ARR; the report says AI-native price buckets become small (about 50 companies per bucket), so the findings are directional, not statistically bulletproof. The data reflects 2025 and the report's annualized revenue-retention methodology. These figures **are not Shopify-app or ecommerce SEO retention benchmarks**. [ChartMogul, The AI Churn Wave (10 December 2025)](https://chartmogul.com/reports/saas-retention-the-ai-churn-wave/)

GRR and NRR are revenue measures, not logo churn. GRR captures retained starting revenue after churn and contraction, excluding expansion; it does not say what percentage of customer accounts cancelled. Therefore, the report neither verifies nor refutes a specific **7% monthly customer churn** assumption for this product. It is a warning that low-price AI products can have weak revenue retention, not a conversion formula for company planning.

The arithmetic “about 205 customers at £49/month reaches £10k MRR” is correct as a gross-revenue target (£10,000 ÷ £49 = 204.1, so round up). It says nothing about net revenue, contribution margin, acquisition volume, churn, or feasibility. Likewise, with an assumed constant 7% monthly logo churn, 205 customers would require roughly 14 replacements per month just to hold the customer count flat; that is a scenario calculation, not a measured rate. The earlier £560 simple gross-profit lifetime value at £49 × 80% margin ÷ 7% churn also depends entirely on two unverified assumptions (80% margin and 7% monthly churn), and is not a usable forecast. Do not present either number without those labels.

No competitor-specific customer churn or revenue was verified in the reviewed competitor dossier. Public reviews, listed prices, free plans, funding, and install counts do not establish retention or revenue. Keep those fields “unknown” unless a company discloses them or a trustworthy dataset provides them.

## Product and channel design

### Free entry

1. Let a visitor enter a public product or collection URL and show a small audit without signup. Keep the free computation bounded (for example, a few representative URLs/pages per store, one run, cached results, explicit rate limits). A larger catalogue, repeat runs, monitoring, team/client reporting, and assisted implementation can be paid.
2. Make each finding traceable to a page, attribute, and evidence snippet. Distinguish observed fact, missing data, and model-generated hypothesis. Avoid selling an “AI rank” as universal; show the exact engine, query/persona, date, and protocol if a test result is shown.
3. Ask separately for permission to save the report / contact the merchant and for structured research feedback. Collect only fields needed for follow-up and analysis. Do not require an app review or positive review to unlock results.
4. Before building a large “feedback database,” test whether actual users give feedback and whether it changes what gets built. The defensible asset, if one emerges, is a permissioned record of test context, merchant-approved changes, implementation, and observed outcome—not the raw output of a free scan.

A free audit is likely to attract curious visitors. Qualify toward merchants who control a sizeable changing catalogue, have an owner for implementation, and can show a recurring decision. For stores without recurring work, the right monetization may be a one-off service.

### Recurring paid upgrade hypothesis

Only charge monthly for work that repeats and that the buyer can verify:

- catch important catalogue changes or factual gaps as inventory changes;
- rerun a disclosed, repeatable set of agent-shopping tasks and compare results over time;
- prioritize fixes by affected products and evidence, with a record of what changed;
- allow an operator to approve or reject edits and see a rollback trail;
- let an agency manage several client stores and produce client-ready reports.

The first version should make conservative claims. Simulated agents are a product test instrument; a changed test score is not proof that ChatGPT or another live shopping surface will select the product more often, and is not proof of incremental sales. Define the tested surface and distinguish correlation from causality.

### Shopify App Store and review mechanics

If the product is distributed as a public Shopify app, the App Store is a high-intent channel, but listing alone is not distribution. Shopify's own older app-growth guidance says app-store search was central and described competition for visibility; it also recommends partner connections and co-marketing. Treat its historical percentages and testimonials as context, not current channel forecasts. A current Shopify partner directory covers services including SEO, content, and marketing; agencies are a plausible route to bundled workflows and multiple client stores. [Shopify app download guidance](https://www.shopify.com/partners/blog/shopify-app-store-downloads), [Shopify Partner Directory](https://www.shopify.com/partners/directory)

For current rules, follow Shopify's current app requirements and marketing documentation: descriptions and tags must be accurate, and charging apps must correctly implement Shopify App Pricing or Billing. Positive reviews can help visibility, but Shopify weights review quality and trust; ask neutrally, only after the merchant has used the app, and never exchange a discount, free access, or functionality for a review. Incentivized reviews risk removal, ranking demotion, or delisting. [App Store requirements](https://shopify.dev/docs/apps/launch/shopify-app-store/app-store-requirements), [Manage app reviews](https://shopify.dev/docs/apps/launch/marketing/manage-app-reviews), [Marketing your app](https://shopify.dev/docs/apps/launch/marketing)

Shopify's current App Store revenue-share page says developers retain 100% of the first $1m of gross App Store revenue earned from 1 January 2025, then 85% above it, subject to a 2.9% processing fee and applicable taxes; App Store registration has a one-time $19 fee per Partner account. Include platform/payment charges in paid-unit economics, but these terms do not change the cost of free usage. [Shopify App Store revenue share](https://shopify.dev/docs/apps/launch/distribution/revenue-share)

### Agencies as distribution

Test agencies as a channel and potential buyer, not as a guaranteed multiplier. Shopify's own partner material describes co-marketing, app recommendations in client projects, and partner referrals as possible routes; its Partner Directory lets merchants find SEO, marketing, and content services. Those materials establish that the channel exists, not that an agency will promote this product or that its CAC is low. [Shopify partner app-download guidance](https://www.shopify.com/partners/blog/shopify-app-store-downloads), [Partner Directory services](https://www.shopify.com/partners/directory/services?partnerTiers=tier_select)

Agency hypothesis: the agency buys a 4-week pilot across up to five client stores, uses the reports in its own client work, then renews only if the workflow saves analyst time or creates a paid client deliverable. This is stronger validation than asking for an informal “sounds useful.” In the pilot, track staff time, stores actively used, client-facing deliverables produced, and whether the agency would pay again at the quoted price. Do not assume that adding white-label features creates channel demand.

## Unit economics to measure

Do not use one “AI cost per audit” placeholder. Log the actual variable costs and human time for every free and paid account.

| Cost / measure | Calculation to instrument |
| --- | --- |
| Free audit compute | Fetch/browser/API spend + model input/output tokens + retries + failed runs + storage attributable to one completed audit |
| Support burden | Human minutes by user segment × fully loaded hourly cost; record onboarding, interpretation, and implementation separately |
| Free cost per activated store | Total variable free cost ÷ stores that complete the defined activation action |
| Paid variable cost | Compute + data services + payment/platform fees + support minutes + any agency servicing per paid account |
| Contribution margin | Collected subscription/service revenue less all variable costs above; report by tier and channel |
| CAC by source | Cash spend + attributable acquisition labor ÷ new paying accounts from that source; do not divide by free signups |
| Free-tier liability | Monthly free actives × actual average free cost per active, plus support, less any measurable direct revenue/upgrade contribution |
| Expansion / retention | Logo retention and revenue retention by paid start month; separately mark one-off pilots, monthly plans, and annual plans |

Hard cap free work so the worst-case cost is known. Set a maximum pages, run frequency, model budget, retry count, and support allowance before opening acquisition. Cache repeat URLs and show degraded/partial status instead of retrying expensively forever. Billable services or paid API calls must not silently become “unlimited” in a free plan.

For monthly economics, calculate gross margin at actual tier and compare channel CAC with observed gross profit from retained cohorts. No 6-week pilot can prove long-term retention; it can identify whether customers return for a second cycle, renew a paid pilot, or commit to a recurring plan. Keep a 90/180-day follow-up on any cohort as a later validation step.

## Six-week falsifiable pilot

**Purpose:** decide whether to continue with a bounded free audit plus recurring workflow, shift to a paid one-off audit/service, or stop. Thresholds below are proposed pilot gates, not external benchmarks or revenue forecasts.

### Week 1: Define and instrument

- Pick one ICP: Shopify apparel/accessory stores with a changing catalogue and a named person able to implement product-data changes; separately define SEO/Shopify agencies as the channel/buyer cohort.
- Freeze the sample audit output, report a maximum variable cost per run, and log visits, audit starts/completions, evidence views, report saves, edits, repeat visits, support time, compute, and source.
- Prepare an interview guide. Ask for a recent real example of product data work, what triggered it, current workflow/tool/spreadsheet, who did the work, time/cost, how they judged success, what they paid for, and what would make them reject a recurring product. Ask agencies how they package and bill this work and how many client stores repeat it. Avoid leading with the proposed solution.

### Week 2: Problem interviews

Conduct **at least 8 merchant and 5 agency interviews**; do not count polite feedback or hypothetical willingness as demand. Ask participants to walk through an actual recent task or show a redacted example. Record exact pain, frequency, implementation owner, spend/budget authority, and current alternative.

**Gate:** proceed to product tests only if at least 5 of 8 merchants or 3 of 5 agencies show a repeated task from the last 90 days with an identified owner and meaningful time/cost. If fewer do, narrow the problem or test one-off service. A “yes, interesting” does not pass.

### Week 3: Ungated audit and paid commitment test

Recruit a small, permissioned sample from the interview pool. Provide a bounded audit with three to five evidence-backed findings. A visitor can see a sample without signup; only saving a report or requesting follow-up asks for email. Ask a separate opt-in question before retaining structured feedback. No review request is part of this exchange.

Start audits early in week 3 and carry the seven-day action check into week 4. Get **at least 15 completed audits** from qualified stores. Track source, visitor-to-start, start-to-complete, cost per completion, whether findings are correct/useful, and whether users take one action. Review every false positive with the merchant.

**Gate:** continue only if at least 8 of 15 users confirm one finding is materially useful and at least 5 either implement, assign, or save a specific action within seven days. Apply the gate once those users have had seven days. If audit completions are fewer than 15, treat it as a distribution/recruitment failure and do not read a low conversion rate as product rejection.

Offer a concrete, scope-limited **three-week agency pilot for $250 (or local-currency equivalent) covering up to five stores**, with a clear deliverable and a paid start/deposit. This timing leaves the following weeks for baseline, intervention, repeat check, and renewal. Also show single-store buyers a clearly priced **$49/month** recurring option for repeat checks/workflow; this is a price probe, not an established market price. State what the tool can and cannot demonstrate. Record objections verbatim. A letter of intent, survey answer, or free trial is not a sale.

**Gate:** seek at least 2 paid agency pilots or 3 paid single-store starts among 10 qualified buying conversations. If buyers accept only a one-off audit, test that model. If none pays, do not infer that a lower price automatically fixes it; determine whether the problem, outcome, trust, or buyer is wrong.

### Week 4: Deliver the baseline and first intervention

Deliver pilots manually where needed, but time every intervention. Each buyer must see a baseline, approve one or more changes, and return to a second check/report. Record completion, repeat use, recommendations rejected, false claims, merchant edits, staff minutes, variable cost, and usefulness.

**End-of-week-5 gate:** at least 70% of paid pilots should complete one customer-approved change and a second check, with at least 60% of findings judged accurate/actionable. These are proposed operational quality bars, not forecast conversion rates. If support time overwhelms price, narrow scope or reprice.

### Week 5: Repeat check and measure workflow value

Run the second check after an approved change. Ask the buyer to use the report in the normal merchant or client workflow. Record whether it was used, staff minutes, client-facing deliverables produced, recommendations rejected, false claims, variable cost, and usefulness.

### Week 6: Renewal and decision

Offer renewal at the previously shown recurring price with no artificial discount tied to reviews or feedback. Ask buyers to pay/renew, not merely to state intent. Interview paid and unpaid participants about the last workflow and what they did after the report.

**Continue the recurring product only if:** (a) paid willingness thresholds are met, (b) buyers actually complete a second cycle, (c) contribution is positive after support and platform/API costs at the price offered, and (d) at least two buyers describe an ongoing trigger for next month.  
**Switch to service/audit if:** buyers pay for the diagnosis but no repeat cycle occurs.  
**Stop or redesign if:** the majority cannot identify a recurring job, findings are not trusted/actionable, or expected delivery cost exceeds willingness to pay.

Report the funnel both as (1) qualified visitors → completed audit → paid, and (2) completed audits → paid, with cohort windows and channel separated. At small counts, show raw counts and interview evidence; do not headline a percentage as a stable conversion rate.

## Sources

- [ChartMogul, The SaaS Conversion Report (February 2026)](https://chartmogul.com/reports/saas-conversion-report/)
- [ChartMogul, The AI Churn Wave (10 December 2025)](https://chartmogul.com/reports/saas-retention-the-ai-churn-wave/)
- [ProductLed, Product-Led Growth Benchmarks](https://productled.com/blog/product-led-growth-benchmarks)
- [Shopify App Store requirements](https://shopify.dev/docs/apps/launch/shopify-app-store/app-store-requirements)
- [Shopify, Manage app reviews](https://shopify.dev/docs/apps/launch/marketing/manage-app-reviews)
- [Shopify, Marketing your app](https://shopify.dev/docs/apps/launch/marketing)
- [Shopify, App Store revenue share](https://shopify.dev/docs/apps/launch/distribution/revenue-share)
- [Shopify Partner Directory](https://www.shopify.com/partners/directory)
- [Shopify, How to Get More App Downloads](https://www.shopify.com/partners/blog/shopify-app-store-downloads)

