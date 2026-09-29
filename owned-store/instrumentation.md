# Instrumenting an owned Shopify experiment

Research checked 29 September 2026. This is a proposed measurement design; no store, accounts, pixels or tracking services have been configured.

Owning the store gives us reliable access to our offer, checkout outcomes and operating costs. It does not reveal every shopper's earlier AI conversation. The useful dataset connects a permitted experimental assignment to the offer actually displayed, a paid order, subsequent returns and contribution. Discovery reports and observed referrals supply context; neither proves incremental sales.

**Start with the native baseline.**

| Source | What we can measure now | Boundary that affects this experiment |
| --- | --- | --- |
| Shopify Agentic | Channel-level sales, orders, online-store sessions and session conversion. Sales combine referrals and direct checkout. | Keep Shop separate from ChatGPT and other channels. Headless agentic analytics is not yet available. Catalog search previews show raw results that channels can rerank; listing acceptance and previews are not consumer exposure. [Shopify reporting](https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts/agentic-home) |
| ChatGPT through Shopify | Eligible stores selling to US customers receive discovery referrals to their own checkout, including an in-app browser. Shopify documents no extra channel selling fee beyond ordinary payment processing. | A UK business can qualify, but UK-only selling does not satisfy the stated US-customer requirement. This route does not expose the shopper's private conversation. [ChatGPT channel](https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts/chatgpt) |
| Google Search Console | Dedicated generative-AI reports show impressions by page, country, device and date. Google says worldwide rollout completed on 31 August 2026. | These reports measure visibility, not a visitor-level impression-to-order join. The documented metrics do not include AI clicks, CTR or queries. Low impressions can prevent a report appearing. [Current report documentation](https://support.google.com/webmasters/answer/16984139) |
| Google Merchant Center | AI performance insights show organic shopping visibility, share of voice, terms, attributes and shopping stages. | Currently English-language queries for accounts in Australia, Canada, India, New Zealand and the US; do not assume a UK account qualifies. Low-volume share of voice can display zero, while missing competitor data can produce 100%. [Availability and definitions](https://support.google.com/merchants/answer/17200695?hl=en) |
| Claude | Observe identified referrals when available, plus permitted repeatable live checks. Anthropic documents separate search and user-directed retrieval bots. | A crawler request is evidence of retrieval activity, not a human impression or purchase. The official material reviewed does not document a merchant impression dashboard equivalent to Search Console. [Anthropic crawler roles](https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler) |

Shopify Knowledge Base is already free on all plans and exposes questions routed to its store-information system. Its FAQs improve answer accuracy; Shopify explicitly says they do not increase appearance frequency. Use it before paying for equivalent FAQ management, and do not label its question log as all upstream shopping conversations. [Free availability](https://help.shopify.com/en/manual/promoting-marketing/seo/optimizing-store-for-ai), [Knowledge Base scope](https://help.shopify.com/en/manual/promoting-marketing/knowledge-base)

Google's direct AI Mode/Gemini checkout is rolling out to eligible US-based stores selling to US buyers. Standard client pixels and Google Analytics do not fire there, so a browser-only funnel can miss genuine sales. Storefront discovery and referral eligibility are separate. [Google checkout limitations](https://help.shopify.com/en/manual/online-sales-channels/agentic-storefronts/google)

Shopify's official Google & YouTube channel can connect a GA4 property without Merchant Center. Audit existing event delivery before adding a custom feed, especially purchases. GA4 is a secondary analysis view; the order ledger remains the financial record. [Official GA4 connection](https://help.shopify.com/en/manual/online-sales-channels/marketplaces/google/getting-setup/connect)

**Record ten event types, with explicit provenance.**

Use Shopify Customer Events for its standard browser events. The following names also include proposed internal records; they are not all Shopify APIs. Every row carries an event ID, occurrence/receipt timestamps, producer, schema version, environment and observation status. Add consent/purpose state and a pseudonymous visitor/session identifier only where permitted. Record experiment, assignment and content versions independently of later edits. [Standard events](https://shopify.dev/docs/api/web-pixels-api/standard-events)

| Event | Minimum useful payload and purpose |
| --- | --- |
| `experiment_assigned` | Experiment/version, eligible unit, arm, assignment time and randomization probability. Assign before treatment exposure and retain assignment for the intended unit. |
| `page_viewed` | Canonical landing path, sanitized referrer host, allowlisted UTMs, market and source-evidence category. Do not retain arbitrary URL query strings. |
| `product_viewed` | Product/variant IDs, currency, displayed price, stock state and product-content version. Keep selection changes distinguishable. |
| `offer_exposed` | Custom event identifying the rendered treatment, offer version, shipping/returns promise version and component. Rendering does not prove someone read it. |
| `product_added_to_cart` | Product/variant, quantity, price, discounts and opaque cart linkage where permitted. This is an intermediate action. |
| `checkout_started` | Checkout/cart linkage, merchandise total, delivery charge, discount and currency. Distinguish repeated checkout entries. |
| `checkout_completed` | Browser completion evidence and order linkage when supplied. Keep separate from authoritative paid status. |
| `order_paid` | Server order ID, payment status, line items, tax, shipping, discounts, channel evidence and test flag. This supplies the purchase numerator. |
| `order_adjusted` | Order/line linkage, cancellation, return or refund state, reason category, amount and transaction status. Preserve partial adjustments. |
| `cost_settled` | Order-linked product cost, payment fees, shipping/fulfilment, return handling, recoverable inventory value and attributable variable acquisition/tool costs. Mark estimates explicitly. |

Persist a dated catalog/offer snapshot alongside events so a later rewrite cannot change what an earlier shopper supposedly saw. Verify an explicit assignment-to-cart-to-order join through each checkout route. Report missing joins; do not assume browser identifiers survive every handoff or identify a person across devices.

For our own cooperating assistant, separately record synthetic intent, permitted tool request/output, retrieved candidates and tool/content versions. We control that interface. Replacing tool output there does not establish control over consumer ChatGPT, Claude or Google's retrieval, ranking, memory or personalization.

**Use two purpose-specific analytics paths.**

The ICO's finalized April 2026 guidance permits qualifying statistical analytics without prior PECR consent. Its examples include aggregate referrers and A/B testing. Conditions include service improvement as the sole purpose, clear information, a simple free objection mechanism, aggregation and retaining individual information only as long as needed to aggregate. Personal-data processing still has UK GDPR obligations. This is not an exemption for persistent individual histories, session recordings, profiling or advertising measurement. Third-party providers must act only for the service-improvement purpose. [ICO exception guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/)

Our design therefore has an aggregate service-improvement path, if its configuration meets those conditions, and a separately consented path for durable visitor-to-order research. Do not quietly turn exempt aggregate analytics into an individual journey database. Document the experiment/return follow-up period and delete raw detail when unnecessary. The operational order record has its own purpose and retention policy.

Use Shopify's privacy settings and runtime permission signals to gate pixels and respond to changed choices. A permissive SDK flag is not a legal assessment. [Pixel privacy API](https://shopify.dev/docs/api/web-pixels-api/pixel-privacy)

Collect no card details, passwords, private assistant messages or copied checkout field contents. Start without session recording; if a specific usability question justifies consented recording later, mask all inputs and exclude checkout/account pages. Categorical interaction events usually answer the commercial question with less data.

**Make attribution honest and the ledger reconcilable.**

Preserve separate labels for platform-reported channel, observed AI referrer/UTM, paid campaign, other organic source and unknown. Consent/measurement coverage is a separate dimension. OpenAI documents `utm_source=chatgpt.com` on search referrals. That supports an observed ChatGPT-labelled visit; it does not reveal the original prompt or certify an incremental sale. Copied links, redirects, app transitions and stripped tags can lose or distort source evidence, so retain unknown traffic rather than assigning it to AI. Never relabel all Google organic or direct traffic as AI. [OpenAI referral documentation](https://help.openai.com/en/articles/12627856-publishers-and-developers-faq)

Exclude our simulations, browser QA, staff activity and test orders before computing retail metrics. Use separate environments or explicit test markers and maintain an exclusion audit. Do not count repeated model trials as independent buyers. Keep real customer agents distinct from our own synthetic agents. Annotate our live probing windows where platform aggregates cannot filter out those probes.

Shopify warns that `checkout_completed` may never fire if its destination page fails to load. Reconcile order records independently. Shopify provides paid-order, cancellation, return and refund webhook topics, but refund creation alone does not establish money movement; check associated transaction status. [Completion caveat](https://shopify.dev/docs/api/web-pixels-api/standard-events/checkout_completed), [Webhook topics](https://shopify.dev/docs/api/admin-graphql/latest/enums/WebhookSubscriptionTopic), [Refund semantics](https://shopify.dev/docs/api/admin-graphql/latest/objects/Refund)

Deduplicate webhook deliveries and periodically reconcile against order data. One order must remain one order across browser, Shopify and GA4. GA4 supports full/partial refund events, but verify actual integration coverage instead of assuming all adjustments arrive automatically. [Webhook delivery guidance](https://shopify.dev/docs/apps/build/webhooks/verify-deliveries), [GA4 ecommerce events](https://support.google.com/analytics/answer/12200568?hl=en)

Report paid-order conversion and contribution per eligible randomized unit, with an agreed return-maturity window. Contribution uses net sales excluding tax after refunds, less product, fulfilment, payment, return and variable acquisition costs, without double-counting discounts or recoverable stock. Show missing linkage and provisional costs. A landing experiment estimates performance among eligible arrivals; it cannot by itself prove increased discovery. Keep platform impressions, observed arrivals, paid orders and retained contribution as distinct denominators.
