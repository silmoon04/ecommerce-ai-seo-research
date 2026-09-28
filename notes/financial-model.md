# Ecommerce AI SEO business: editable unit economics

Checked 2026-09-28. This is an assumption-driven scenario calculator, not a forecast or a claim about market benchmarks. The companion [model.csv](model.csv) has editable input cells and spreadsheet formulas. [model-values.csv](model-values.csv) contains independently calculated numeric outputs for the supplied scenarios, so it can be read without a formula engine. All business inputs below are researcher-selected planning assumptions, not user-provided targets or measured market rates.

## Baseline result

The baseline is the £99/month Shopify-billed plan, a £10 monthly service reserve per payer, 30 minutes of outsourced support per payer/month valued at £25/hour, 5% monthly churn, £150 all-in acquisition cost (CAC) per replacement/new payer, £100 fixed operating overhead, a separate £50/month product-validation and research allowance, and a £3,000 founder management/product-pay target. CAC includes the allocated cost of free acquisition audits and sales effort for that acquired cohort. The separate research allowance covers other product-validation work, not those same acquisition audits. Founder pay is separate from outsourced support labor, so support is not counted twice.

- Shopify processing: £99 × 2.9% = £2.871 per successful payment.
- Support: 0.5 hours × £25 = £12.50 per payer/month.
- Contribution before replacement CAC: £99 − £2.871 − £10 − £12.50 = **£73.629 per payer/month**.
- Expected replacement CAC: 5% × £150 = £7.50 per active payer/month.
- Contribution after replacement CAC: **£66.129 per payer/month**.
- Monthly fixed/audit overhead plus founder-pay target: £100 + £50 + £3,000 = £3,150.
- Payers to cover that target: CEILING(£3,150 / £66.129) = **48 payers**.
- At 30 / 100 / 300 payers, residual after fixed overhead, research allowance, replacement CAC, and founder pay is **−£1,166.13 / £3,462.90 / £16,688.70 per month**.

These are pre-tax scenario results. Growth beyond a steady customer count also requires upfront acquisition spend: for example, 10 net new payers at £150 CAC cost £1,500 in that month, on top of expected churn replacement. Recurring results include replacement CAC only.

## Three scenarios

The base scenario uses the planning inputs above. Cautious and upside are explicit sensitivities, not expected outcomes: they vary monthly churn and outsourced support time while retaining £150 CAC, £25/hour, £10 per-payer reserve, Shopify’s 2.9% processing, £100 fixed cost, £50 research allowance, and £3,000 founder target.

| Scenario | Plan | Monthly churn | Support hours/payer | Contribution after replacement CAC/payer | Payers needed | Residual at 30 | Residual at 100 | Residual at 300 |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Cautious | £99 | 12% | 0.75 | £49.379 | 64 | £-1668.63 | £1787.90 | £11663.70 |
| Base | £49 | 5% | 0.50 | £17.579 | 180 | £-2622.63 | £-1392.10 | £2123.70 |
| Base | £99 | 5% | 0.50 | £66.129 | 48 | £-1166.13 | £3462.90 | £16688.70 |
| Base | £199 | 5% | 0.50 | £163.229 | 20 | £1746.87 | £13172.90 | £45818.70 |
| Upside | £99 | 3% | 0.25 | £75.379 | 42 | £-888.63 | £4387.90 | £19463.70 |

The £49 and £199 rows use base assumptions; cautious and upside rows focus on £99 to expose churn and service-load sensitivity.

## Editable model and formulas

In [model.csv](model.csv), baseline rows calculate each plan at 30, 48, 100, and 300 active payers. Additional 100-payer rows test churn/support, two hours of support, 15% Shopify revenue share, and Stripe standard UK card processing plus Stripe Billing. Columns A-N are inputs; columns O-AA contain formulas. Import the CSV into a spreadsheet with formula evaluation enabled. Every formula containing commas is CSV-quoted. The numeric snapshot does not recalculate when inputs change.

Formula definitions:

- Shopify fee = price × 2.9%.
- Stripe sensitivity fee = price × (1.5% standard UK card processing + 0.7% Stripe Billing) + £0.20 per successful charge. Remove the 0.7% only if that Billing product is not used.
- Support cost = support hours per payer × £25/hour.
- Contribution before replacement CAC = price − payment fee − revenue share − service reserve − support cost.
- Expected monthly replacements = active payers × churn rate; replacement CAC = expected replacements × CAC per new payer.
- Residual after founder target = active payers × (contribution before replacement CAC − churn rate × CAC) − fixed overhead − research allowance − founder target.
- Payers needed = CEILING((fixed overhead + research allowance + founder target) / (contribution before replacement CAC − churn rate × CAC), 1).

Expected replacement-customer counts and replacement spend use fractional expected values. Actual sales are whole customers and vary month to month. The required-payer formula includes replacement acquisition for a flat customer base, not net growth acquisition. Initial acquisition outlay is shown separately and excluded from the recurring surplus.

## Free audits and first-customer acquisition

A separate acquisition sensitivity in [assessment.md](assessment.md) assumes 100 free audits at £0.50 direct cost each and, where needed, ten minutes of assistance at £25/hour. The cohort then costs £50 without assistance or £466.67 with assistance. At 1%, 3%, 5%, and 10% conversion, the assisted acquisition cost per converted payer is £466.67, £155.56, £93.33, and £46.67. Marketing and additional sales effort are excluded. These are hypothetical inputs, not measured rates. Fold actual acquisition-audit costs into observed CAC; do not add them again after using an all-in CAC input. The separate £50 research allowance in the recurring model is for different product-validation work.

## Upfront implementation

One-time implementation is excluded from the recurring CSV. For example, four hours of onboarding at an assumed £25/hour adds £100 delivery cost per new customer. If bundled free, acquiring and onboarding the first 100 customers at £150 CAC would require £25,000 before ongoing operating costs: £15,000 acquisition plus £10,000 implementation. A setup fee can recover some of this. These effort and price inputs are illustrative.

## Merchant ROI threshold

Merchant value must be measured as incremental contribution profit or verified labor savings, not gross channel revenue. For an illustrative £25 contribution per genuinely incremental order, the £49 / £99 / £199 plans require 2 / 4 / 8 additional orders (rounded up) before implementation. At £25/hour of verified labor savings they require 1.96 / 3.96 / 7.96 hours saved monthly. These are illustrations; substitute measured merchant economics. These merchant ROI examples are separate from the supplier-profit CSV.

Merchant net benefit = incremental orders × contribution per order + saved labor hours × fully loaded hourly labor cost − subscription price − implementation cost allocated to period.

Use baseline and comparison periods and account for seasonality, promotions, stock, pricing, and native platform discovery. AI-referred sales alone do not establish that this product caused the sale.

## Payment-cost source and limits

Stripe’s official UK pricing page currently lists 1.5% + 20p for standard UK cards ([Stripe UK pricing](https://stripe.com/gb/pricing)); Stripe Billing PAYG adds 0.7% where used ([Billing pricing](https://stripe.com/gb/billing/pricing)). Other card categories have different rates. The CSV applies Stripe only in its explicit sensitivity row. The baseline uses Shopify App Store billing: the [unit-cost note](unit-costs.md) cites Shopify’s official [billing](https://shopify.dev/docs/apps/launch/billing) and [revenue-share](https://shopify.dev/docs/apps/launch/distribution/revenue-share) pages and reports 2.9% processing plus applicable revenue share. Eligible-tier 0% and 15% share sensitivity rows are included; eligibility and USD thresholds must be checked. Never apply both processing paths to one charge.

The £10 service reserve is an arbitrary planning value, not measured provider cost. The saved [unit-cost note](unit-costs.md) gives source-specific API examples in USD; they do not price a multi-engine product and have not been converted here. The model excludes VAT/income/corporation tax, refunds, failed payments, chargebacks, annual discounts, and provider costs above the reserve. Replace assumptions with actual operating data before making a business decision.
