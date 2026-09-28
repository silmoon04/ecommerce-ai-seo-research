# Buildability and open-source reuse: Merchant AI Shopper Lab

Research checked 28 September 2026. This note evaluates the idea in `shared-conversation-1.txt`: a merchant supplies a catalogue, repeatable AI shopper intents try to discover/compare/select products, and the product records evidence and suggested catalogue fixes. Effort figures below are engineering judgment for a competent small team, not measured benchmarks.

## Finding

A narrow, read-only demo is buildable. The differentiated work is the experiment design, controlled shopper run, evidence capture, repeatable comparison and merchant-facing interpretation. Open-source SEO and AI-visibility projects can contribute adjacent infrastructure, but none verified here supplies a mature, reliable “simulate actual shopper agents on a merchant store and explain why SKU X lost” product.

Keep the claim precise: an experiment with a chosen model, prompt, tools, catalogue snapshot, geography and timestamp. It does not prove how consumer ChatGPT, Grok or another production surface will rank products, nor that a content change will increase sales.

## Project identity: “OpenSEO”

The exact linked project is [afazhriel/openseo](https://github.com/afazhriel/openseo). GitHub marks it as a fork of [every-app/open-seo](https://github.com/every-app/open-seo), and its README presents the same OpenSEO product and workflow list. So `every-app/open-seo` is the upstream project and `afazhriel/openseo` is the linked fork, not a separate SEO tool. The copied URL includes a tracking query parameter (`utm_source=chatgpt.com`); it does not change the repository identity.

The repo is an actual self-hostable SEO application under the MIT license, with a hosted product at openseo.so. It supports traditional search workflows and advertises AI Visibility, but the available documentation describes SEO/SERP/brand or citation workflows; it does not establish SKU-level autonomous-shopping experiments or explain product selection by agent. Treat it as adjacent reporting/input, not as the lab engine. Keep those metrics separately labelled rather than combining them into a single score.

Self-hosting is not cost-free: its docs require a DataForSEO account/key. The repository says new accounts get $1 test credit and a $50 minimum top-up; it also names an OpenRouter key for certain AI features. Actual ongoing expense depends on requested endpoints/volume. Hosted OpenSEO is optional (repo currently says $10/month); self-hosted usage still incurs upstream API and hosting cost. Docker quickstart sets authentication to `local_noauth`, so it must stay on a private machine/network or behind the operator’s own authentication-protected proxy. Pin and review versions before running it with business data.

There are similarly named projects and products. Do not confuse this OpenSEO fork/upstream with OpenSearch (`opensearch-project/opensearch`) or unrelated repositories named OpenSEO. The Mention Network ecommerce visibility engine is also a separate codebase with a different license.

## The ecommerce-specific engine and Elmo

### Mention Network ecommerce AI Visibility Engine

[MentionNetwork/ecommerce-ai-visibility-engine](https://github.com/MentionNetwork/ecommerce-ai-visibility-engine) is the closest name/description match to the “open-source ecommerce AI-visibility engine” phrase in the copied discussion. Its README proposes product-level prompts, engine answers, named retailer/rank/cited URL extraction, price and stock fact checks, and a report. However, the same README explicitly calls its status “early scaffold (pre-alpha)” and says implementation is in progress. These are intended capabilities, not evidence of a functioning, production-ready engine.

Its [LICENSE.md](https://github.com/MentionNetwork/ecommerce-ai-visibility-engine/blob/main/LICENSE.md) is FSL-1.1-ALv2, not MIT/Apache today. It permits internal use, research, education and professional services for a licensee, but defines commercial products/services with substantially similar functionality as “Competing Use”; a future Apache-2.0 grant applies on each version’s second anniversary. That means it is unsafe to assume it can be forked into a competing paid Merchant AI Shopper Lab now. Get licensing advice/permission or use only independently reimplemented ideas after review. Also, its stated connector/apply workflow must not be read as a verified working integration while the project remains pre-alpha.

### Elmo

[elmohq/elmo](https://github.com/elmohq/elmo) is a different project. It is an MIT-licensed, self-hostable AEO/GEO brand-visibility tracker. It schedules buyer prompts across configured answer engines/providers, stores answers/citations and calculates brand mentions, share of voice and cited URLs. The project says self-hosting is free; hosted Elmo Cloud currently starts at $29/month. Its deployment still needs server/database resources and metered model or scraping-provider calls; “free self-hosted” means no Elmo subscription, not free inference/scraping. The project’s provider comparison and setup docs should be checked for the precise surface/API and price before selecting coverage.

Elmo can be reused or adapted for brand-level monitoring, prompt scheduling, persistence, charts, and citation/source views. It does not claim to simulate a shopper navigating a specific store catalogue, assess variant/stock/shipping/return constraints, produce a controlled SKU shortlist, or establish why a shopper agent selected a competing product. It is therefore a component candidate, not the shopper lab itself. Its measurements are model/provider samples; do not present them as the consumer apps’ definitive rankings.

## Reuse boundary

| Need | Reuse candidate | What remains to build / caveat |
|---|---|---|
| SERP, keyword, backlink and site-audit data | OpenSEO, if traditional search context is useful | External DataForSEO spend; it does not replace shopping-agent evaluation. |
| Prompt schedules, answer/citation storage, brand visibility trends | Elmo, if its schema/API fits | Add product/variant identity, catalog snapshotting and buyer-task outcomes; API/provider calls cost money. |
| Product-level AI visibility concept | Mention Network engine as a design reference only | Pre-alpha; restricted FSL commercial use; do not rely on it as working infrastructure. |
| Shopify catalogue read | Official Shopify GraphQL Admin API, or for a demo a public product feed / supplied CSV | OAuth/install, scope minimization, tenant isolation, pagination and data refresh. |
| Shopper intent benchmark | Small authored set of fixed intents + deterministic runner | Build the experiment protocol, tool boundary, trace/evidence capture, scoring and replay. |
| “Why lost?” explanations | Rule-based observations grounded in captured facts, with optional LLM wording | Distinguish measured facts from hypotheses. The model’s post-hoc rationale is not causal proof. |
| Merchant changes / A/B replay | Start with editable local copy or proposed diff | Real Shopify write access, approval UI, before-image, rollback/audit log, stale-data checks and safeguards are extra work. |

For Shopify specifically, `productUpdate` requires `write_products`; Shopify recommends starting with small scopes and supports optional scopes that can be requested only when a feature needs them. Write scopes are powerful: `write_products` includes read access, and mutations can alter titles, descriptions, status, media, SEO and metafields (with variants managed through separate mutations). Keep the first release read-only. If writes ever arrive, request them only after explicit merchant action, preview the exact changed fields, check the current stored value before applying, save a restorable before-image, and log actor/time/result. Do not let an LLM issue arbitrary admin mutations.

## Narrow MVP and effort (judgment)

**Hackathon demo: roughly 1–3 engineer-days after access to a stable demo catalogue and model/API credentials.** One Shopify development store or CSV snapshot; perhaps 10–30 products in one category; 3–5 fixed intents; one model/provider with a controlled product-search tool; one run records which products were surfaced, selected, rejected by explicit constraints, and which catalogue fields supported the result. Show the raw prompt, catalogue snapshot time, model/provider, tool trace, product evidence and a replay comparison. Make no live writes and no “real ChatGPT/Grok rank” claim. Use one controlled fixture for a dependable demo.

**Useful read-only pilot: roughly 2–4 engineer-weeks.** Add Shopify read-only OAuth, robust product/variant normalization, prompt-set editing, repeatable jobs, storage and replay, evidence-linked findings, error handling and an explicit report of model/provider/location/date. Add a human-reviewed “suggested edit” card that does not publish anything. This remains a measurement product, not proven sales optimization.

**Commercial, multi-merchant service: likely several engineer-months plus ongoing operations (judgment).** Tenant-safe credential handling, access revocation/deletion, retries and rate limits, changing platform APIs, model/provider version changes, scheduling and budget controls, prompt quality/evaluation, observability, abuse control, privacy policies, support, and a genuinely safe write/rollback workflow dominate beyond the first demo. A robust impact claim additionally needs external validation against real recommendation/traffic/order outcomes, not more LLM calls alone.

## Variable costs and operating risks

- Model cost scales with `intents × repetitions × providers × prompt/response tokens`; web search, scraping and geolocation can add provider charges. No stable per-run amount can be quoted without selecting a provider, model, token budget and current rate card. Put a hard per-experiment budget, cap output size and repetitions, cache immutable catalogue inputs and show estimated spend before a batch.
- OpenSEO adds DataForSEO charges and optional OpenRouter usage; its source repo explicitly documents the API dependency and minimum top-up. Elmo self-hosting adds compute/database plus chosen inference/scrape services. The Mention Network scaffold advertises BYOK/OpenRouter or paid cloud services, but as pre-alpha its cost and reliability cannot be treated as settled.
- Different runs can differ because models, search indices, stock, location, prompt formulation, sampling and ranking heuristics change. Report raw runs and sample counts; do not imply a stable universal “AI ranking score.”
- A shopper tool that crawls arbitrary URLs can be used for SSRF or excessive crawling. Restrict destinations, resolve and validate IPs, block private/metadata ranges and redirects into them, set time/response/size limits, and use allow-listed merchant domains. Treat product-page instructions and page content as untrusted prompt-injection input; never expose secrets or permit those pages to expand tool authority.
- On merchant data, begin with read-only catalog fields and least privilege. Protect OAuth tokens, separate stores at every query boundary, validate Shopify webhooks/signatures, encrypt secrets, implement uninstall deletion/revocation, and avoid customer/order data unless a concrete feature needs it. Bad autogenerated claims about materials, fit, stock, delivery or returns can mislead buyers and create merchant liability; report missing data rather than inventing it.
- A synthetic shopper is not the live ChatGPT/Grok consumer surface. Consumer interfaces and official APIs may have different tools, geography, ranking and terms. Use official, permitted APIs/providers or transparently label controlled simulations; do not build an unattended consumer-site scraper as the assumed foundation.
- Agent explanations can sound certain while being post-hoc. Ground findings in captured trace and factual catalogue fields; call unsupported explanations hypotheses. A before/after LLM replay shows only a change in that experiment, not causality or sales lift.

## Primary sources

- [Exact OpenSEO repo linked in the chat (fork of every-app/open-seo)](https://github.com/afazhriel/openseo)
- [License in the exact linked OpenSEO fork](https://github.com/afazhriel/openseo/blob/main/LICENSE)
- [OpenSEO upstream repository and feature/deployment/cost claims](https://github.com/every-app/open-seo)
- [OpenSEO MIT license](https://github.com/every-app/open-seo/blob/main/LICENSE)
- [OpenSEO Docker self-hosting and no-auth warning](https://github.com/every-app/open-seo/blob/main/docs/SELF_HOSTING_DOCKER.md)
- [OpenSEO DataForSEO setup and minimum top-up](https://github.com/every-app/open-seo/blob/main/docs/DATAFORSEO_API_KEY.md)
- [OpenSEO MCP documentation](https://github.com/every-app/open-seo/blob/main/web/content/docs/mcp.md)
- [Mention Network engine README and pre-alpha status](https://github.com/MentionNetwork/ecommerce-ai-visibility-engine/blob/main/README.md)
- [Mention Network FSL-1.1-ALv2 terms](https://github.com/MentionNetwork/ecommerce-ai-visibility-engine/blob/main/LICENSE.md)
- [Elmo repository, capabilities and MIT license](https://github.com/elmohq/elmo)
- [Elmo official site, plans and self-hosting statement](https://www.elmohq.com/)
- [Shopify: manage access scopes and optional scopes](https://shopify.dev/docs/apps/build/authentication-authorization/manage-access-scopes)
- [Shopify `productUpdate` scope and fields](https://shopify.dev/docs/api/admin-graphql/latest/mutations/productUpdate)
- [Shopify protected customer data](https://shopify.dev/docs/apps/launch/protected-customer-data)
- [DataForSEO Google SERP Live Advanced endpoint](https://docs.dataforseo.com/v3/serp/google/organic/live/advanced/)


