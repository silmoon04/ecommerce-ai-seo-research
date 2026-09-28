# Ecommerce AI SEO/GEO SaaS: unit-cost model

Checked 2026-09-28. Prices below are vendor-listed prices at research time, not quotes or a promise of access. USD-denominated API prices are kept in USD; Stripe UK and Shopify fees are listed in their published currencies. Recheck vendor prices, actor behavior, and platform rules before setting paid plan limits.

## Cost boundary: answer collection is different from LLM tokens

There are two distinct product jobs:

1. **Collect observations from a real search or answer surface.** A customer provides prompts, and the service queries or scrapes each engine and stores the answers, citations, or SERPs. This is driven by the number of prompt-engine observations. For GEO, an API call to a generic model does not prove what a consumer-facing answer product showed. An Apify ChatGPT Search actor currently lists collection of ChatGPT Search answers and citations; a Google SERP actor returns Google organic listings and rankings. These are separate products/surfaces.
2. **Analyze and summarize collected evidence.** A language model labels brand mentions, sentiment, citations, and changes, or writes a report. This is token-driven. Do not call the same summary model once per observation if a batch summarization job will do; do not count a generated model response as a fresh search-engine observation.

For one-time auditing, charge for the finite onboarding scan. For recurring monitoring, model every scheduled repetition. If audit findings should be refreshed monthly, those are recurring monitoring costs, not part of the one-time audit estimate.

## Public list prices and cost inputs

| Cost input | Published price used | How to apply it | Source |
|---|---:|---|---|
| GPT-5 mini text API | $0.25 / million input tokens; $0.025 cached input; $2 / million output | `input_tokens × 0.25 / 1,000,000 + output_tokens × 2 / 1,000,000`. Only for generated analysis/content in this model. | [OpenAI model pricing](https://developers.openai.com/api/docs/models/gpt-5-mini) |
| Tavily Search API | 1 credit for basic/fast/ultra-fast; 2 for advanced. PAYG is $0.008 / credit; free allowance is 1,000 credits/month. | $0.008 basic or $0.016 advanced per search at PAYG. This is web research/search, not a documented capture of a particular consumer LLM's answer. | [Tavily Search docs](https://docs.tavily.com/documentation/api-reference/endpoint/search), [Tavily pricing](https://www.tavily.com/pricing) |
| Apify ChatGPT Search Scraper | Per successful search: Free $200 / 1,000; Starter $5 / 1,000; Scale $4 / 1,000; Business $3 / 1,000. Actor Start is $0.00005; platform usage is included for this actor. | The headline “from $3” is only Business tier. Use the applicable plan rate, e.g. `$0.005 × successful ChatGPT Search observations` for Starter, plus any actor starts. It returns answer text, citations, URLs, and follow-up queries. | [Actor details](https://apify.com/apify/chatgpt-search-scraper), [pricing tab](https://apify.com/apify/chatgpt-search-scraper/pricing) |
| Apify Simple SERP API | $0.0005 / successfully loaded result page on paid plans, plus $0.0006 / actor run | Google SERP cost is `0.0005 × successful pages + 0.0006 × runs` at the listed paid-plan price. It returns classic SERP data, not AI answers. | [Apify Simple SERP API](https://apify.com/curly/simple-serp-api) |
| Apify platform plans | Free $0/month with $5 usage; Starter $19/month with $19 usage; Scale $199/month with $199 usage. Compute unit prices: $0.20 Free/Starter, $0.16 Scale, $0.13 Business. Credits expire monthly. | Treat the $19 Starter subscription as the paid-account cash floor if a paid plan is needed. Its prepaid balance covers eligible usage up to that amount; do not count the same usage twice. Check whether each Actor's event price includes platform usage. | [Apify pricing](https://apify.com/pricing) |
| Supabase Pro | $25/month, including $10 compute credits, enough for one Micro instance; extra project Micro compute starts at about $10/month | A lean paid database/auth floor can be modeled at $25/month for one project. Additional project instances or usage can raise it. | [Supabase pricing](https://supabase.com/pricing), [billing FAQ](https://supabase.com/docs/guides/platform/billing-faq) |
| Vercel Pro | $20/month with $20 included usage credit | A lean paid web hosting floor is $20/month, before usage beyond credits. The account credit is shared across team projects. | [Vercel pricing](https://vercel.com/pricing), [Pro pricing update](https://vercel.com/changelog/included-pro-usage-is-now-credit-based) |
| Stripe UK online card payments | Standard UK cards: 1.5% + £0.20; premium UK cards: 2.8% + £0.20; EEA: 2.5% + £0.20; other international: 3.15% + £0.20. Currency conversion adds 2%. | For a UK standard-card monthly subscription of price `P` GBP, use `0.015P + £0.20` per successful charge. Stripe Billing pay-as-you-go adds 0.7% of Billing volume if that Stripe Billing product is used. Standard processing fees are not returned on refunds. | [Stripe UK pricing](https://stripe.com/gb/pricing), [Stripe Billing pricing](https://stripe.com/gb/billing/pricing) |
| Shopify App Store billing | Eligible developers retain 100% of the first US$1m of qualifying gross App Store revenue (from 2025); 15% revenue share above that; a separate 2.9% processing fee plus applicable sales tax. Standard pricing exceptions apply to larger developers. Public App Store apps must use Shopify-provided billing. | Do not also model Stripe card processing on those Shopify-billed subscription sales. Include the one-time $19 USD Partner account registration fee if relevant. See Shopify eligibility, aggregation, and large-developer exceptions before relying on 0%. | [Shopify billing](https://shopify.dev/docs/apps/launch/billing), [Shopify revenue share](https://shopify.dev/docs/apps/launch/distribution/revenue-share) |

No public GPT-6 Luna API price was used. OpenAI's developer pricing pages list GPT-5 mini as a cost-sensitive API model; GPT-6 Luna being available in the Codex/ChatGPT product does not establish API availability or API pricing.

**Apify price refresh:** The live official plan page checked 2026-09-28 shows Starter at $19/month and $0.20/CU. Older indexed pricing snippets showed $39/$0.40, so they are stale and are not used here. The ChatGPT scraper's headline “from $3/1,000” also needs its tier table: Free $200, Starter $5, Scale $4, Business $3 per 1,000 successful searches. API rates and credits are in USD, before FX or tax.

## Transparent formulas

Let:

- `P` = number of tracked prompts per customer.
- `E` = number of separately queried engines/surfaces.
- `R` = repetitions per prompt-engine pair during each monitoring interval (for example, repeat samples to reduce answer variance).
- `F` = number of intervals in the billing month (use 4 for a simple weekly month or 30 for daily; use actual scheduled count in production).
- `n_j` = observations sent to provider/actor `j`; `c_j` = its per-observation price.
- `I`, `O` = total input/output tokens used in batched analysis or content generation.

Then:

```text
monthly_observations = P × E × R × F
collection_usage_value = Σ(n_j × c_j) + per-run/start fees + separately billed platform usage
token_cost_USD = I × 0.25 / 1,000,000 + O × 2 / 1,000,000  # GPT-5 mini list price
monthly_cash_COGS = fixed_stack_floor + max(0, Apify actor/platform usage - $19 included usage) + token_cost + other usage
fixed_stack_floor = Supabase Pro $25 + Vercel Pro $20 + Apify Starter $19 = $64/month (USD)
```

`E` is product-specific: a Google SERP page and a ChatGPT Search answer are different units. Do not multiply a single engine price by three and claim three production answer APIs. Substitute a real collector and its live quote for each engine you actually support. The actor price above is a published, changeable list price and does not include a guarantee of parity with every consumer UI or geography.

## Worked usage scenarios

The collection examples below assume an equal split across two source-specific surfaces: one ChatGPT Search observation per prompt and one successfully loaded Google SERP page per prompt. At Apify Starter, ChatGPT Search is $0.005/observation; Google is $0.0005/page. Actor-start charges assume one ChatGPT actor run ($0.00005) and one Google SERP run ($0.0006) per scheduled interval. The LLM cost assumes one batched GPT-5 mini synthesis job per customer per month, not one LLM call per answer. Token quantities are scenario assumptions, not measured telemetry. Collection values below show usage consumed at published rates; Apify's $19 Starter subscription prepays the first $19 of eligible account-level usage. The invoice is $19 minimum, then usage above that balance, not $19 plus all of the included usage again.

| Case | Schedule and workload | Answer/SERP collection | Synthesis assumption | LLM synthesis | Total incremental direct cost/customer/month |
|---|---|---:|---:|---:|---:|
| One-time audit | 20 prompts × 2 surfaces × 1 sample = 40 observations (20 per surface) | 20 × $0.005 + 20 × $0.0005 + one $0.00005 ChatGPT start + one $0.0006 SERP run = **$0.11065** | 30k input + 3k output tokens | $0.0135 | **$0.12415** |
| Small weekly monitor | 20 prompts × 2 surfaces × 1 sample × 4 weekly intervals = 160 observations (80 per surface) | 80 × $0.005 + 80 × $0.0005 + four intervals × $0.00065 in starts = **$0.4426** | 30k input + 3k output tokens | $0.0135 | **$0.4561** |
| Medium weekly monitor | 50 prompts × 2 surfaces × 1 sample × 4 weekly intervals = 400 observations (200 per surface) | 200 × $0.005 + 200 × $0.0005 + four intervals × $0.00065 in starts = **$1.1026** | 100k input + 6k output | $0.0370 | **$1.1396** |
| Broad but bounded daily monitor | 100 prompts × 2 surfaces × 1 sample × 30 daily intervals = 6,000 observations (3,000 per surface) | 3,000 × $0.005 + 3,000 × $0.0005 + 30 intervals × $0.00065 in starts = **$16.5195** | 500k input + 20k output | $0.1650 | **$16.6845** |

These are modest product designs rather than pricing promises: a one-time 20-prompt audit, a 20-prompt weekly watch, a 50-prompt weekly watch, and a 100-prompt daily watch. At paid Starter event rates, the single audit collector consumes about $0.11 of prepaid usage and the modest weekly monitor about $0.44/customer/month before synthesis and shared Apify-plan allocation. For a single account, these usage amounts do not raise the invoice above the $19 Starter floor until combined eligible usage exceeds $19. The free account has a much higher ChatGPT Search event price and only $5 usage. There is no evidence here for a universal multi-engine price. Tavily Basic Search would add $0.008 per call or Advanced $0.016 at PAYG list price; budget that only for actual research/search calls.

### Broad 45,000-run stress case

The reference high-coverage scenario is 100 prompts × 5 engines × 3 repetitions × 30 daily intervals = 45,000 observations per merchant/month. Do not use cheap Google SERP pages as a proxy for AI-answer coverage: that price buys ranking/list data, not AI answers, so it is not a meaningful AI-monitor cost floor. For a sensitivity where all 45,000 observations were ChatGPT Search requests, current tiered event usage is **$225 at Starter**, **$180 at Scale**, or **$135 at Business**. For one account on each plan, expected cash invoices are $225 on Starter ($19 plan commitment plus $206 overage), $199 on Scale (usage fits within its included $199), or $999 on Business (usage fits within its included $999). This is not a quote for five engines: the rates apply to one named ChatGPT Search collector only. Its output is submitted-query answer text, citations, and follow-up queries; it does not prove a reliable autonomous browser trajectory or reproduce a logged-in consumer session. Validate exact coverage, failure/retry behavior, and stability before selling it as measurement. Price each engine separately using `Σ(prompt count × repetitions × frequency × price per supported engine)`; don't plug invented per-run figures for missing vendors. Add retries and analysis tokens separately. A single monthly synthesis of 500k input + 20k output tokens costs $0.165, but could understate analysis when thousands of full answers are sent to the model. For scale only, if all 45,000 observations averaged an assumed 1,000 input tokens each, that is 45M input tokens or $11.25 at GPT-5 mini's published input price, before output; measure actual token volume.

These examples exclude product-crawl volume (crawling/auditing the merchant's product pages), retries, taxes/VAT, customer support labor, email, analytics, observability, chargebacks/refunds, and any collector/API for answer engines other than the two named. They are not a complete “full audit” cost. They also exclude a share of fixed hosting; divide the $64/month Supabase + Vercel + Apify paid-stack floor by paying customers for fully loaded contribution margin. Free credits can lower initial cash outlay but should not be treated as a permanent unit-cost advantage.

## Subscription contribution illustrations

To demonstrate checkout impact without hiding it, assume GBP prices and successful payments on Stripe UK standard cards. Stripe fee is `1.5% × price + £0.20`; if Stripe Billing pay-as-you-go is enabled, add 0.7% of price. This table uses no Stripe Billing fee in its baseline and shows source collection + GPT synthesis at the illustrative USD costs above separately, because a live FX rate is intentionally not assumed.

| Plan illustration | Stripe card fee per month | Approx. before COGS / fixed costs | Example direct usage cost | What still must be allocated |
|---:|---:|---:|---:|---|
| £29 | £0.64 | £28.36 | small weekly monitor consumes about $0.46 in Apify usage, plus $0.014 synthesis | Hosting share, Apify-plan allocation, support, tax, refunds, email, other collectors |
| £79 | £1.39 | £77.62 | medium weekly monitor consumes about $1.10 in Apify usage, plus $0.037 synthesis | Same; the workload-to-plan pairing is only an example |
| £199 | £3.19 | £195.82 | broad bounded daily monitor consumes about $16.52 in Apify usage, plus $0.165 synthesis | Same; add any other engine or generated content usage |

With Stripe Billing's 0.7% add-on, subtract another 0.7% of the plan price (£0.20 / £0.55 / £1.39 at these prices). The resulting examples suggest that a sensible prompt/repetition cap matters much more than the summarized GPT-5 mini tokens at these source rates. They do not prove market willingness to pay or a realized profit margin. A “good profit” calculation still needs support minutes per customer, churn/refunds, acquisition cost, tax/VAT accounting, actual supported answer engines, and observed retry/collection failure rates.

For a Shopify public App Store app, model the Shopify 2.9% processing fee and applicable revenue share from the Shopify source; do not apply both that billing path and Stripe fees to one charge. On the standard eligible tier, the current published revenue share is 0% on the first $1m qualifying gross App Store revenue since Jan 1, 2025, then 15% above that; developer-size exceptions can produce 15% from dollar one. All threshold/currency calculations are USD per Shopify's rules.

## Practical pricing implication

At these list prices, prompt collection plus batched lightweight analysis is not the main margin risk for the low and medium scenarios. Uncapped retries, high-frequency schedules, many answer engines with paid per-query access, large content-generation output, human onboarding/support, and acquisition expense can dominate. Put explicit monthly prompt, engine, repetition, and refresh limits in each tier; charge for overages or move the customer to a higher tier. Measure successful and failed calls separately, record the actual actor/provider charged amount per observation, and refresh the model using usage logs after a small pilot.
