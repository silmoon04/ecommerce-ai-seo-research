# Bear case: AI commerce visibility and catalogue repair

**Checked:** 28 September 2026  
**Scope:** Paid Shopify/e-commerce product for testing whether shopping agents find, understand, compare and select merchant products; a free-first funnel and proposed data flywheel. This is an independent challenge to the two saved conversations, not a competitor financial census.

## Verdict

Do not build a broad paid “AI SEO score” or promise a universal chatbot rank. The commodity layer is already crowded, platforms are distributing eligible product data themselves, and a synthetic shopper score does not establish extra orders. The free-first plan also risks attracting merchants who want a scan but will not do the catalogue work or renew.

That is a no-go for the product as currently framed, not proof that every adjacent product is bad. A narrower product-data repair workflow could be worth testing if it catches consequential errors in a merchant’s live source data, resolves them safely, and saves enough catalogue-operation work to justify recurring spend. This is a more credible value proposition than “rank higher in AI.” It is still a hypothesis, and competitors are moving into it too.

## What the earlier bear case got right—and overstated

The saved pessimistic conversation is right that Shopify Catalog reduces the value of selling “make your Shopify products available to AI.” Shopify says eligible products are automatically discoverable through its Catalog; this is not a promise that they will appear in a particular answer or rank in a particular position. OpenAI says Shopify product data is already integrated into ChatGPT and merchants need no additional work for that path. [Shopify: Catalog and product discovery](https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts/products), [Shopify: selling on ChatGPT](https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts/chatgpt), [OpenAI: powering product discovery](https://openai.com/index/powering-product-discovery-in-chatgpt/).

Shopify also has a first-party free scanner, which is a direct substitute for a free lead-generation audit: its [Product Page Audit for Agentic Commerce](https://www.shopify.com/agentic-readiness) takes a URL and checks structured data signals that agents may use. The same page markets Shopify Catalog as making products AI-ready by default and has an explicit caveat that the signals do not guarantee an AI agent will surface the product. This strengthens the no-go for a generic free readiness score while reinforcing the distinction between detectable signals and a ranking promise. Shopify’s Agentic admin also has a catalog search preview with listing-quality signals such as description, image, review, variant and policy completeness; Shopify says downstream storefronts may rerank those results, so this is a useful native diagnostic, not a reproduction of each consumer chatbot. [Platform risk note](platform-risk.md), [Shopify: Agentic readiness audit](https://www.shopify.com/agentic-readiness), [Shopify: managing Agentic Storefronts](https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts/agentic-home).

Shopify also publishes separate AI product optimization guidance and provides the free Knowledge Base app for store facts, FAQs and unanswered questions. Third parties now offer scans too: a Shopify App Store listing offers an AI Shopping Readiness scan for $5/month, while SKAW lists an agent-query simulator at $19.99/month. These products establish price and feature competition, not their effectiveness. [Shopify: product optimization guidance](https://help.shopify.com/en/manual/shopify-catalog/optimizing-products), [Shopify Knowledge Base](https://apps.shopify.com/shopify-knowledge-base), [AI Shopping Readiness listing](https://apps.shopify.com/ai-shopping-readiness), [SKAW listing](https://apps.shopify.com/skaw).

The broader conclusion still holds: basic audits and simulation are cheap and reproducible. Shopify provides a URL-based structured-data audit and native catalog-quality preview; one current app explicitly audits product descriptions, images, variants, tags, media and policies, ranks fixes, maintains scan history, and disclaims ranking, traffic or sales promises. SKAW advertises a query simulator and a full-catalog audit at $19.99/month. These offerings establish overlap and price pressure, not product quality, revenue, churn or customer success. [Shopify audit](https://www.shopify.com/agentic-readiness), [AI Shopping Readiness](https://apps.shopify.com/ai-shopping-readiness), [SKAW](https://apps.shopify.com/skaw).

There is also a category nuance. Google says normal SEO fundamentals remain relevant for AI features, with no special AI files or schema required for Google AI Overviews/AI Mode. Shopify and OpenAI have their own catalog/data pathways. “AI SEO” therefore collapses distinct systems—organic search, catalog inclusion, answer citations, model/API simulations and agent checkout—into one score that is hard to interpret and easier to sell than to validate. [Google Search Central: AI features](https://developers.google.com/search/docs/appearance/ai-features), [Google: guide to optimizing for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## The stronger workflow does not escape the problem automatically

“Run realistic shoppers, show why they rejected us, repair the listing, and replay the same tasks” is a better product thesis than generating `llms.txt` or a generic readiness score. It can expose specific failures: missing or contradictory variant data, inaccurate stock/price, invisible returns information, inaccessible product images, unclear measurements, or a product page that cannot support a requested comparison.

But there are two versions of this workflow, and they produce different evidence:

| Workflow | What it can establish | What it cannot establish on its own |
| --- | --- | --- |
| Deterministic catalogue/page check | A required field is missing, stale, malformed or conflicts with the source of truth | That an AI channel would have selected the product, or that the fix adds profit |
| Synthetic shopper replay | A chosen test agent behaved differently on the before/after inputs under this prompt, model, context and date | Production ChatGPT/Gemini shopping rank, a causal change in actual customers’ choices, or incremental sales |
| Actual-channel observation | What a named production surface showed under a recorded test condition | Representative demand, durable ranking, or causality from a merchant edit |
| Controlled live outcome study | Potential evidence that an intervention changed a defined external outcome | Generalization to other stores, products, seasons or AI surfaces without more data |

OpenAI’s product-feed specs make the repair wedge concrete: discovery records require item identity, title, factual description, URL, seller, image, availability and price, with variants and other attributes supported; price, availability and variants need to remain consistent and current. But direct feed onboarding is currently limited to approved partners, while Shopify handles the route for its eligible merchants. A third party should not represent a model API or browser simulation as the production ChatGPT shopping system. [OpenAI: product-feed guide](https://developers.openai.com/commerce/specs/file-upload/products), [OpenAI: getting started](https://developers.openai.com/commerce/guides/get-started), [OpenAI: product discovery](https://openai.com/index/powering-product-discovery-in-chatgpt/).

There is a legitimate workflow insight here: the durable job may be keeping a large, changing catalog correct across source systems and channels—resolving duplicate/missing attributes, mismatched variants, stale stock, bad media links, and policy conflicts—not “improving rank.” A merchant can verify those repairs against its catalog rules even when no AI platform exposes a stable score. Yet Shopify’s own Product Page Audit, Agentic catalog search preview, product guidance and Knowledge Base already cover parts of this job, and general-purpose catalogue/PIM systems own adjacent workflows. A report that identifies missing measurements without sourcing or validating those measurements can simply hand the merchant an expensive queue of manual work.

Fashion raises both value and burden. Fit guidance needs real garment/body distinctions and fit outcomes; a language model cannot infer an unknown inseam from copy. True Fit markets an agent-facing fit service backed by 20 years of purchase-and-return outcomes. This does not prove that a small vertical entrant cannot win, but it shows that the meaningful asset is validated domain data and outcome access, not image prompting alone. [True Fit: fit intelligence for agents](https://www.truefit.com/mcp-fit-intelligence), [True Fit: technical/data spec](https://www.truefit.com/fit-intelligence-spec).

## Fatal assumptions to disprove

1. **Fast category growth means small merchants already have a paying problem.** Adobe reports U.S. retail AI-referred traffic grew 393% year over year in Q1 2026 and says those visits converted 42% better in March. That is good evidence the channel matters, but Adobe also describes the total AI traffic volume as modest versus major channels. Growth off a small base and high conversion do not tell us the share of a particular merchant’s visits, margin after returns, or addressable order lift. [Adobe Q2 2026 AI traffic report](https://business.adobe.com/resources/sdk/.2026-q2-ai-traffic-report/q2-2026-adi-ai-sourced-traffic-insights.pdf), [Adobe Prime Day 2026 report](https://business.adobe.com/blog/2026-prime-day-insights).

2. **More visibility is the merchant’s bottleneck.** A buyer may choose a competitor because its price, availability, delivery promise, reviews, brand trust or product fit is better. Improving copy cannot fix weak assortment or uncompetitive economics. Shopify explicitly warns that Catalog eligibility does not guarantee an appearance or position; platform factors remain. [Shopify Catalog](https://help.shopify.com/en/manual/shopify-catalog).

3. **A controlled before/after score implies a lift on the real surface.** It does not. If the app improves the product representation fed into its own evaluator, the benchmark may reward changes the real channel never ingests or values. A same-agent replay is useful for regression testing, but it is not an A/B test of production ranking or incremental conversion.

4. **Cheap or free audits create cheap customer acquisition.** Free scans can generate curiosity and support requests without a purchase or renewal. Shopify’s App Store gives discoverability but does not publish a new app’s organic install rate or CAC; no current public source here establishes the proposed funnel’s conversion or acquisition cost. Treat CAC as unknown and run a channel test. Do not infer it from an App Store listing or competitor reviews.

5. **A growing database becomes a moat by itself.** Public product pages and ordinary listing facts can be crawled by competitors. Re-running synthetic prompts mostly creates reproducible synthetic observations. The harder dataset would link representative real buyer intent to accurate product ground truth, actual decisions or sales/returns, and the exact intervention that caused a measurable outcome—with merchant permission. Shopify’s Knowledge Base may already see store questions that an outside app cannot observe. [Shopify Knowledge Base: query log and FAQs](https://help.shopify.com/en/manual/promoting-marketing/knowledge-base/managing-faqs).

6. **Low-cost monitoring can be unlimited and profitable.** As one current direct cost marker, OpenAI lists web search at $10 per 1,000 calls ($0.01 per call), before model tokens. At 100 prompts × 5 engines × 3 repeats × 30 days, a hypothetical service that used one billed search call per attempt would incur $450/month for that engine alone; actual agent workflows may make multiple calls per attempt, while other engines have different rates. This is a sensitivity, not a quote for the proposed system. Naridon’s credit-metered $49/$249/$899+ plans and Shopify’s native agentic surfaces show why usage caps and platform integrations are likely. The saved conversation’s unit-cost examples should be replaced with measured per-run costs after a real prototype. [OpenAI API pricing](https://developers.openai.com/api/docs/pricing), [Naridon pricing](https://naridon.com/en/pricing), [Shopify agentic commerce plan](https://www.shopify.com/news/ai-commerce-at-scale).

7. **Implementation and support will stay close to software margins.** Shopify public apps must provide timely merchant support; Shopify does not support third-party apps. App Store apps also need mandatory privacy/compliance webhooks, a linked privacy policy, and ongoing API-version maintenance. Catalog sync, theme/page edge cases, incorrect AI-generated edits and platform changes add operational work. This is documented burden, not evidence that support costs will necessarily be high; the amount must be measured per merchant. [Shopify support requirements](https://shopify.dev/docs/apps/launch/distribution/support-your-customers), [webhook requirements](https://shopify.dev/docs/apps/build/webhooks/subscribe), [privacy requirements](https://shopify.dev/docs/apps/launch/privacy-requirements), [App Store quality checks](https://shopify.dev/docs/apps/launch/app-store-review/app-quality-checks).

8. **Recurring subscription value persists after the initial cleanup.** Churn is not publicly disclosed for the close competitors reviewed; the cited conversations do not provide reliable competitor churn data either. Do not repeat the broad “high churn” claim as established fact. It is a testable risk: after initial fixes, merchants may not have enough new catalog change, channel change, monitoring need or measurable sales impact to justify monthly renewal.

## Merchant payback threshold (illustration only)

Use contribution profit, not revenue attributed to a chatbot. For a $49/month app, suppose AI referrals generate 30 visits/month and convert at 5%: that is 1.5 expected orders before the tool changes anything. Even if a repair doubled that traffic, the gain would be 1.5 orders; at $20 contribution per order, the theoretical monthly contribution lift is $30 before returns, implementation and app costs. The inputs are deliberately hypothetical, not a benchmark. This illustrates why a statistically visible percentage change can be commercially immaterial on a small store. Higher-volume stores, expensive products, costly fit/returns issues, or reduced manual catalog work could reverse the calculation.

Attribution also overstates value if the store would have received the order through Shopify Catalog, organic search, or another channel anyway. “AI referral sales” is not “sales caused by our edits.”

## What would reverse the no-go

I would reopen the case for a narrow product if a small paid pilot—not free interest—showed all of the following:

- **A real defect competitors/native tools miss:** identify repeated, material source-data or transaction-readiness failures in one vertical (not just missing generic metadata), with evidence and a safe correction path.
- **Repair beats diagnosis:** merchant users apply the fix and confirm its truth; the workflow reduces measured time, error rate, support contacts, failed product matches, returns or another costly operational outcome.
- **External validation:** run the same product tests on a named production channel where permitted, then use a pre-registered holdout or other credible comparison to test for incremental outcomes. Keep simulated discovery/selection separate from live traffic and sales.
- **A repeat reason:** paying customers are still using it after 90 and 180 days because new variants, inventory, supplier files, policies or channel requirements keep creating verified work. Report cohort renewal directly; do not substitute review counts.
- **Economics survive service:** measured model/search/API cost, onboarding time, support time, refunds, platform charges and customer acquisition cost leave margin at the price customers actually pay.
- **Data rights and advantage:** merchants consent to any aggregated learning, and the product earns outcomes-rich data not available from public catalogue snapshots alone.

## Decision

Reject the generic paid AI-SEO extension and the unqualified “we improve AI rank” pitch. Keep the product-data repair idea as a narrow validation experiment, especially where data errors have an observable operational cost independent of speculative AI traffic. The next evidence should be paid commitment, confirmed fixes, measured support/cost, and retention—not a larger prompt bank or a bigger synthetic database.

## Primary sources consulted

- Shopify’s current agentic Catalog, selling-on-ChatGPT, product optimization and Knowledge Base documentation (links above).
- OpenAI’s current commerce feed specification, partner-access note, product-discovery announcement and API price sheet (links above).
- Google Search Central’s current guidance on AI search/AI SEO (links above).
- Current Shopify App Store listings for SKAW, AI Shopping Readiness and Shopify Knowledge Base (links above).
- Shopify’s native [Product Page Audit for Agentic Commerce](https://www.shopify.com/agentic-readiness) and [Agentic Storefront management / catalog preview](https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts/agentic-home).
- Adobe Digital Insights’ Q2 2026 traffic report and June 2026 Prime Day report (links above).
- Shopify developer requirements for support, webhooks, privacy and ongoing app quality (links above).
- True Fit’s first-party fit-intelligence materials (links above).

No competitor revenue, churn or CAC is estimated here. Public app pricing, promotional claims, reviews and review counts do not establish those measures. The two saved conversations reviewed in full are [conversation 1](shared-conversation-1.txt) and [conversation 2](shared-conversation-2.txt).
