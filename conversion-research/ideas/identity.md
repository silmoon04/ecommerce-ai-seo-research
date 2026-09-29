# Ten identity mechanisms for AI-origin ecommerce purchases

Research snapshot: 29 September 2026. These are divergent product hypotheses, with existing native capabilities treated as the baseline.

The strongest near-term starting points are a measured product-ID collision, an exact-model accessory lookup, or a reproducible cart/account recovery failure. Each has a visible defect, an authoritative source of truth and a purchase endpoint. The household and gift ideas require more participant adoption and are explicitly frontier proposals.

Product identity, seller identity, wearer identity, account identity, organization authority and agent identity are different things. A correct GTIN does not establish reseller authorization; an authenticated agent does not establish permission to purchase; the purchaser need not be the wearer. The proposed product should preserve these distinctions rather than construct a covert universal identity graph.

UCP documents consented identity linking. Shopify already supplies buyer-linked Shop tokens, long-running carts and checkout handoffs. True Fit already offers fit intelligence through MCP, with confidence and controlled access. The opportunity is a specific remaining failure in an actual merchant integration, not the existence of account linking, fit profiles or shared carts. The current UCP page identifies version 2026-08-25. Integration availability still depends on the merchant and consuming platform. [UCP identity linking](https://ucp.dev/2026-08-25/specification/common/identity-linking/), [Shopify buyer-linked tokens](https://shopify.dev/docs/agents/profiles/buyer-linked-tokens), [Shopify carts](https://shopify.dev/docs/agents/carts-and-checkout), [True Fit specification](https://www.truefit.com/fit-intelligence-spec).

The shared conversation's custom search proxy is useful for controlled fault injection and response replay. It cannot reproduce consumer ChatGPT's private ranking or prove current recommendation rates. Its numerical examples are invented. Repeating one synthetic shopper 50 times measures model variation around one intent, not 50 independent consumers. Rank manipulation can reveal sensitivity but does not establish a deployable improvement. Here, offline tests diagnose identity failures; randomized merchant experiments measure actual purchases; live engine observations check transfer without being relabelled causal.

All ten purchase effects are hypotheses. No source supports a portable conversion percentage for these exact interventions. Use the same truthful product and commercial terms in both arms wherever the intervention permits. Count retained paid orders, not tool calls, recommendations, reservations or drafts. A model recommendation and its downstream order must not be counted as separate gains. Consent refusal stays in the assigned denominator. A merchant may gain by winning business from another seller; that is merchant incrementality, not evidence of more market-wide consumption.

The JSON companion holds the full schema, including falsifiers, data requirements, dependencies and break-even models. Every model leaves traffic, fault prevalence and treatment effect unknown. The test fees below are proposed GBP prices, not observed willingness to pay or forecasts.

| ID | Purchase stage | Feasibility |
| --- | --- | --- |
| identity-01 | Exact product/variant resolution | now |
| identity-02 | Seller trust during offer comparison | integration-heavy |
| identity-03 | Sizing and retained purchases | integration-heavy |
| identity-04 | Compatible part selection | integration-heavy |
| identity-05 | Budget qualification and offer redemption | integration-heavy |
| identity-06 | Account recovery and checkout continuation | now |
| identity-07 | B2B quote approval and paid order | integration-heavy |
| identity-08 | Joint shortlist agreement | frontier |
| identity-09 | Gift substitution after unavailable stock | frontier |
| identity-10 | Verified agent access to cart | integration-heavy |

## identity-01: Repair cross-channel product identity collisions before checkout

An AI agent can identify the intended product family but resolve a different edition, pack size or regional variant when it follows an offer into checkout. Actual prevalence must be audited. Selection-to-cart: preserve the exact trade item across discovery and handoff, preventing an apparent match from becoming a wrong-item landing or abandoned cart. Product identity is separate from seller and shopper identity.

Build: Create a contradiction-aware crosswalk among manufacturer model/GTIN, merchant variant ID and offer ID. A resolver returns an exact match only when region, edition and pack quantity agree; otherwise it requests one discriminating choice. Test the ID chain at search, product, cart and order boundaries.

Existing competition: OpenAI already models product/variant/offer identifiers; GS1 already verifies identifier ownership. Generic catalog mapping overlaps. The remaining hypothesis is cross-channel contradiction detection and repair, not generating more identifiers. [Products](https://developers.openai.com/commerce/specs/file-upload/products), [Verified by GS1 | Barcode GTIN GLN Company Lookup Verification](https://www.gs1.org/services/verified-by-gs1).

Test: First replay known ID collisions and honest unknowns offline. Then randomize eligible users of a merchant-owned AI shopping flow to the existing resolver or the contradiction-aware resolver, keeping factual inventory/prices equal. Primary endpoint is paid, non-cancelled purchases retained at 30 days. Plan 6 to 8 weeks of enrollment, extend only under a pre-set power rule; protect latency and wrong-item returns. External engine monitoring is a separate transfer check.

Measure: Retained purchases per all randomized eligible shoppers, with one stable first-party assignment per shopper where consent permits; otherwise session-level inference is labelled. Count all merchant purchases to detect SKU substitution, and separately report exact-item success.

The edge remains conditional: A focused resolver can rescue observed wrong-variant handoffs that clean feeds and native variant grouping still leave unresolved. Kill the claim if: A sampled audit finds negligible resolvable identity errors, or a powered trial excludes the merchant's break-even retained-purchase effect.

Feasibility: now. Unvalidated value-based test: GBP 400 per merchant per month after an observed collision audit; charge only if retained contribution can plausibly cover the fee. Cost control: Use deterministic key checks first, cache manufacturer mappings by version and send only genuine contradictions for manual review.

## identity-02: Bind an authorized seller claim to the exact regional offer

A legitimate retailer's AI offer can be indistinguishable from an unverified seller or can inherit a warranty claim that applies to a different country. A valid GTIN alone does not answer this. Comparison-to-purchase: source-backed seller identity and applicable support terms remove a specific unresolved trust question before the buyer abandons or chooses a different retailer.

Build: Publish a dated evidence record linking brand confirmation, legal seller, selling domain, product scope and territory. Show the applicable warranty source beside the actual offer and recheck changes. Use brand attestations or authoritative dealer records; never treat an absent record as proof of counterfeiting.

Existing competition: Bose already publishes authorized-dealer lookup and counterfeit guidance. GS1 verifies identifier/company ownership, which is a different check. Seller badges alone are established; a maintained offer-level evidence link is the proposed addition. [Verified by GS1 | Barcode GTIN GLN Company Lookup Verification](https://www.gs1.org/services/verified-by-gs1), [Authorized Dealers & Resellers Hub | Bose](https://www.bose.com/support/authdealers), [Counterfeit Products | Bose](https://www.bose.com/legal/be-aware-of-counterfeit-products).

Test: Randomize consenting merchant AI sessions expressing an authorization/warranty requirement to existing offer presentation or the sourced seller/territory explanation. Both receive accurate material terms. Primary endpoint is 30-day retained purchases per assigned session. Use a 6 to 10 week planning window with sample size based on observed traffic; guard against inaccurate endorsements, lower margin and delayed cancellations.

Measure: Difference in retained purchase probability across all assigned qualifying sessions, plus contribution after returns. Revenue moving between a merchant's authorized offers is not automatically incremental.

The edge remains conditional: For queries that explicitly care about authorization or local warranty, attaching the evidence to the purchasable offer reduces uncertainty more than a generic trust badge. Kill the claim if: Shoppers rarely have unresolved seller questions, or an accurate source-linked explanation fails to beat the merchant's existing dealer badge.

Feasibility: integration-heavy. Unvalidated test: GBP 500 per month for a specialist retailer or brand-authorized dealer network; validate willingness against verified retained contribution. Cost control: Refresh on dealer or policy changes, reuse verified brand-domain relationships, and reserve human work for changed or conflicting records.

## identity-03: Keep each cart line attached to its actual wearer

A signed-in buyer is not necessarily the person wearing every garment. Account-level fit context can contaminate a mixed-person basket; whether a given fit provider already solves this must be checked. Sizing-to-purchase: resolving wearer identity for each line prevents a confident recommendation for the wrong person, increasing purchases that survive the return window.

Build: Add a wearer selector with explicit permission for each invited adult. Bind an opaque wearer reference, provider recommendation and product version to each cart line; recompute only the affected line when the wearer changes. Keep raw measurements inside the selected provider and do not overwrite the purchaser's default profile.

Existing competition: True Fit already offers MCP, fit confidence, controlled access, stock filtering and exchange guidance. The comparator uses that existing intelligence. Public documentation checked here does not settle support for mixed-wearer cart identity, so the idea proceeds only after an integration audit. [Fit Intelligence Technical Spec, Data & MCP | True Fit](https://www.truefit.com/fit-intelligence-spec).

Test: Recruit consenting multi-wearer shopping sessions and randomize at buyer-group level to the current fit-provider integration or explicit line-level wearer binding. Primary endpoint is paid orders with no fit-related return at 45 days; report total retained orders as a second purchase endpoint. Plan 8 to 12 weeks plus follow-up, with power based on actual group count. Guard profile leakage, extra prompts and mistaken wearer switches.

Measure: Retained orders per randomized multi-wearer group, with line-level wrong-wearer recommendations as a diagnostic. Do not compare voluntary fit users with non-users as if randomized.

The edge remains conditional: A missing line-to-wearer binding, if observed, is a narrower and more valuable defect to repair than another fit passport. Kill the claim if: Provider audit shows no missing wearer binding, or a controlled trial shows no economically useful increase in retained orders.

Feasibility: integration-heavy. Unvalidated test: GBP 300 per month above existing fit-provider fees, conditional on an observed mixed-wearer defect and adequate traffic. Cost control: Reuse a fit provider; cache by wearer, garment version and permission expiry, and avoid copying underlying body data.

## identity-04: Resolve the exact owned appliance before suggesting accessories

A shopper asks for a part for 'my mixer' or a familiar model name, while compatibility depends on a suffix or production revision. Prior purchase identity may be missing because the appliance came from another retailer. Need-to-selection: a user-confirmed equipment identity makes a compatible accessory purchasable without a long search or a wrong-part return. Ownership context is voluntarily supplied, never inferred from browsing.

Build: Let the shopper select an existing saved appliance or submit its model plate/receipt for this task. Extract only the necessary model/revision, ask the user to confirm it, and resolve compatible parts against manufacturer evidence. Save a reusable item card only with separate permission; purchase history is not required.

Existing competition: Bosch already provides E-Nr-based parts lookup, and Shopify agents already support reorder. The remaining test is cross-retailer recovery of a precise equipment identity inside the AI discovery flow, with manufacturer-backed compatibility rather than generic recommendations. [Kitchen Machine Spare Parts | Bosch UK](https://www.bosch-home.co.uk/customer-service/spare-parts/kitchen_machines), [Shopify Help Center | Shop app customer experience](https://help.shopify.com/en/manual/online-sales-channels/shop/customer-experience).

Test: Randomize qualifying AI-origin accessory shoppers before requesting model information to the existing model-lookup flow or the task-scoped equipment card. Primary endpoint is a paid compatible-part order retained at 30 days. Use 6 to 10 weeks plus return maturation and a pre-set power target. Guard extraction error, unsafe unsupported compatibility claims and document retention.

Measure: Retained compatible-part orders per all randomized qualifying shoppers, including those who decline sharing. Track basket contribution and wrong-part return rates; model capture rate is secondary.

The edge remains conditional: Preserving the confirmed model suffix into the AI search and cart will outperform repeating a manual model lookup on the merchant site. Kill the claim if: Existing lookup already resolves the need with little abandonment, or the new path does not improve retained compatible purchases.

Feasibility: integration-heavy. Unvalidated test: GBP 400 per month for an accessory merchant; data licensing or manufacturer integration priced separately and included in break-even. Cost control: Prefer typed/scanned model numbers, perform deterministic compatibility joins, and expire source documents after confirmed extraction.

## identity-05: Apply verified eligibility before an agent rejects the price

The public price can fail a shopper's stated budget before the shopper reaches an existing eligibility offer. Verification and coupon activation can also become disconnected from the chosen cart. Budget screening-to-checkout: with explicit shopper permission, an applicable verified benefit produces an accurate final quote early enough for an affordable offer to remain in consideration.

Build: Offer a voluntary 'check my existing eligibility' action only where a real merchant program exists. Reuse its verification flow, bind the result to that program and cart, and retrieve a live net quote. The agent receives eligibility/quote outputs, not identity documents. Keep public-price browsing available and request fresh verification when required.

Existing competition: SheerID already provides verification, offer codes and conversion tracking; UCP supports identity-linked benefits. The proposed edge is quote timing and cart-specific redemption continuity, tested against the merchant's current program, not a new identity network. [Secure Verification Creation - SheerID Developer Center](https://developer.sheerid.com/tutorials/secure-verification-creation), [Setting Up Webhooks - SheerID Developer Center](https://developer.sheerid.com/tutorials/verifications/webhooks), [Conversion Tracking - SheerID Developer Center](https://developer.sheerid.com/tutorials/conversion-tracking), [Identity Linking - Universal Commerce Protocol (UCP)](https://ucp.dev/2026-08-25/specification/common/identity-linking/).

Test: Randomize relevant AI shopping entrants to the existing discount-discovery path or an optional early eligibility check; maintain the same offer and verification standard in both arms. Primary endpoint is 30-day retained purchases per entrant. Plan 6 to 10 weeks and power using actual eligible-intent traffic. Include opt-outs and failed verification in intention-to-treat; guard margin, subsidy to would-have-bought customers, access errors and verification burden.

Measure: Retained-purchase risk difference for all assigned entrants, plus incremental contribution after discount and verification fees. Verified-user conversion alone is selection-biased; coupon redemptions are not incremental purchases.

The edge remains conditional: Showing a validated eligible total before budget filtering recovers purchases otherwise lost during AI comparison without increasing discount leakage. Kill the claim if: Eligibility is already applied before comparison, or incremental retained contribution remains below verification and product cost.

Feasibility: integration-heavy. Unvalidated test: GBP 500 per month plus disclosed verification costs; merchant must evaluate contribution after discounts. Cost control: Recheck a valid program-scoped result where permitted, call verification only after opt-in, and avoid storing identity evidence in the shopping layer.

## identity-06: Recover an account switch without losing the selected cart

Native long-running carts exist, but an integration can drop buyer context, selected variants or discounts while replacing cart state or recovering an expired account link. The correct account must be confirmed before private data returns. Handoff-to-purchase: preserve the buyer's selections through a legitimate reauthentication boundary, then recompute account-dependent terms, so a repairable account failure does not require rebuilding the basket.

Build: Add a server-side cart checkpoint and transition assertions around reauthentication/account switching. Retain non-sensitive selections, clear previous-account fields, relink through the supported flow, retrieve current full cart state before replacement updates, and show the buyer any price or entitlement change before continuation.

Existing competition: Shopify already has buyer-linked Shop tokens, logged-in checkoutUrl, long-running carts and continue_url. Cart MCP replacement semantics can remove omitted fields. This is a fault-specific recovery layer for an observed integration defect, not a new shared-cart feature. [Create a buyer-linked token](https://shopify.dev/docs/agents/profiles/buyer-linked-tokens), [Carts and checkout for agents](https://shopify.dev/docs/agents/carts-and-checkout), [Create and update a cart with the Storefront API](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/cart/manage), [Identity Linking - Universal Commerce Protocol (UCP)](https://ucp.dev/2026-08-25/specification/common/identity-linking/).

Test: Use authorized test accounts to replay expiry, logout and replacement-update cases. In live eligible recovery sessions, randomize users to the currently approved fallback or repaired recovery; never relax authentication. Primary endpoint is retained paid purchase within 7 days, matured for 30-day returns. Plan 4 to 8 weeks but enroll until the pre-specified rare-failure power target or stop as underpowered. Guard cross-account disclosure and duplicate orders.

Measure: Retained purchases per all randomized eligible failed-handoff shoppers, plus overall purchase effect weighted by the separately measured natural fault rate. Synthetic failure frequency is not the population baseline.

The edge remains conditional: A verified stale-link or wrong-account recovery defect can be fixed without adding a second authentication step to successful journeys. Kill the claim if: No meaningful natural failure cohort exists, the vendor's latest native adapter already repairs it, or the repaired flow fails the retained-purchase break-even test.

Feasibility: now. Unvalidated test: GBP 500 per month for a merchant integration with observed failures; no fee case if the native flow already works. Cost control: Run deterministic transition checks, retain short-lived minimal checkpoints, and focus testing on observed failing paths instead of replaying every cart.

## identity-07: Bind a professional purchase to the right organization and approver

The logged-in contact may act for several legal or company locations. A quote for the wrong location, price list or approver can become an abandoned or rejected order even when the selected products are correct. Quote-to-purchase: explicit purchasing authority and location produce a usable draft; the authorized approver receives the same product/version/price context, reducing quote reconstruction and rejection.

Build: Require the buyer to select an authorized purchasing location and project. Carry that context into native drafts, bind approval to a specific quote version, and recompute after material price/quantity changes. Use existing organization roles and a user-authorized handoff; do not infer employment or send messages without explicit user action.

Existing competition: Shopify already supports B2B context, purchasing entities and draft orders for approval. The remaining defect to test is losing location or quote identity across an AI-to-human approval handoff. Native support may already cover a merchant's flow. [Headless with B2B](https://shopify.dev/docs/storefronts/headless/bring-your-own-stack/b2b), [Use draft orders](https://shopify.dev/docs/apps/build/b2b/draft-orders), [Attribute B2B orders](https://shopify.dev/docs/apps/build/orders-fulfillment/order-management-apps/attribute-b2b-orders).

Test: Randomize at organization-location purchasing-project level to existing B2B draft approval or context-preserving handoff, avoiding spillover between requester and approver. Primary endpoint is paid, non-cancelled orders within the merchant's normal buying cycle, with accepted purchase orders only a secondary leading measure. Plan a 10 to 16 week enrollment pilot and power by organization clusters. Guard unauthorized commitments, quote changes and purchase concentration.

Measure: Paid retained orders per assigned qualified purchasing project; attribute using purchasingEntity and project rather than personal contact. Report total account purchases to detect timing shifts or internal substitution.

The edge remains conditional: Where cross-system handoffs lose purchasing context, maintaining quote-bound authority converts more valid requests into paid orders without changing commercial terms. Kill the claim if: Native quote workflows preserve the full context already, or improved draft completion produces no increase in paid orders over a full buying cycle.

Feasibility: integration-heavy. Unvalidated test: GBP 1500 per month for a B2B merchant with sufficient lost quotes; procurement integration costs must enter the value test. Cost control: Reuse native company roles and drafts, cache only valid policy versions, and ask an approver again only when their actual authorization no longer covers the quote.

## identity-08: Resolve a household veto before generating the final shortlist

A single shopper's AI conversation may omit a consenting co-buyer whose dimensions, budget or material requirements later rule out the shortlist. Shared browsing history is not permission to infer a household. Shortlist-to-purchase: explicitly collecting each participant's required constraints reduces late rejection and repeated search, allowing the group to choose a purchase that all decision-makers accept.

Build: Create a voluntary, task-limited buying project. Each invited adult supplies chosen constraints and decides what other participants can see. Resolve conflicts through explicit edits or trade-offs, then show only products satisfying agreed requirements and preserve the approved decision into checkout. Invitations occur only through a participant's explicit action.

Existing competition: Pinterest already supports collaborative boards, favorites and permissions; shared wishlists are established. The proposed addition is agreed constraint resolution tied to purchasable inventory and measured orders, not another shared board. [Create and manage group boards | Pinterest help](https://help.pinterest.com/en/article/group-boards).

Test: Recruit AI-origin projects with two or more self-declared adult decision-makers, then randomize the whole project to a usual shareable shortlist or the constraint-resolution flow. Primary endpoint is a paid order retained at 45 days. Plan 8 to 12 weeks plus returns, power by independent projects and keep invitations identical where possible. Guard participation burden, private preference leakage and coerced agreement.

Measure: Retained orders per all randomized projects, including projects where the invite is declined. Multiple participants or model reruns do not increase the independent sample count.

The edge remains conditional: For purchases with a real second decision-maker, surfacing a concrete conflicting constraint before the shortlist beats passing links between people after selection. Kill the claim if: Late household vetoes are uncommon in consented research, or the flow improves shortlist agreement without increasing retained purchases.

Feasibility: frontier. Unvalidated merchant test: GBP 400 per month; consumer willingness is not assumed and collaboration should remain optional. Cost control: Use a structured constraint solver, query inventory only when constraints change, and avoid permanent household graphs or cross-session inference.

## identity-09: Use recipient-approved substitutions when a gift-list item is unavailable

A wish-list item can be unavailable, while the buyer lacks permission or enough context to choose a substitute. Inferring the recipient's interests from public profiles would be a poor substitute for explicit preference sharing. Unavailable selection-to-purchase: a recipient-approved alternative policy lets a giver find an acceptable in-stock gift without exposing private recipient data or abandoning the task.

Build: Let an adult recipient opt into a limited substitution policy for a list item, such as approved product families, colors, maximum duplicates and forbidden alternatives. A permissioned resolver returns only acceptable available choices. Use reservation expiry and merchant-confirmed purchase events to prevent duplicate gifts; keep delivery information with the merchant.

Existing competition: Giftster already has group visibility and reservation/purchased states. A basic private wishlist is not new. This idea tests recipient-authorized substitute selection and reliable completed-purchase reconciliation; a public Giftster API or missing feature is not assumed. [Share a wish list - Giftster Help](https://help.giftster.com/article/40-how-to-share-a-wish-list).

Test: Randomize at gift occasion/list cluster after a genuine unavailable-item trigger, comparing existing wishlist fallback with the approved-substitution flow. Keep the original recipient requirements equally visible where permission allows. Primary endpoint is a paid gift order retained at 30 days; duplicate purchases and recipient rejection are guardrails. Plan 8 to 12 weeks across enough independent occasions, account for seasonality and avoid mixing treatment within one list.

Measure: Retained gift purchases per randomized failed-item occasion, plus total occasion spending and duplication. Reservation clicks are not purchases and fewer duplicate purchases can lower gross orders while improving retained value.

The edge remains conditional: When the exact listed item fails, a bounded recipient-approved alternative can convert a stalled gift session more reliably than a generic recommendation or asking the recipient again. Kill the claim if: Recipients rarely authorize substitutes, or a controlled trial does not improve retained purchases after a failed wish-list item.

Feasibility: frontier. Unvalidated test: GBP 400 per month for a registry merchant; platform adoption and any integration fee remain unknown. Cost control: Evaluate simple approved substitution rules before using a model, cache public product equivalence, and release stale reservations deterministically.

## identity-10: Recover verified shopping agents blocked between discovery and cart

An agent may authenticate successfully at one commerce endpoint and lose the recognized identity path at a redirect, proxy or protected cart endpoint. A signed agent is not automatically a user-authorized purchaser. Access-to-purchase: repair a proven identity-verification interruption for permitted shopping actions so legitimate purchase intent can reach a valid cart, while leaving consumer authorization and payment checks intact.

Build: Trace an approved agent through merchant-controlled entry, redirect and cart endpoints using test identities. Locate where trusted signature verification or recognized endpoint routing fails; implement the vendor-supported configuration repair. If trust cannot be established, offer a normal human continuation with selected items. Never whitelist by user-agent text or bypass a legitimate denial.

Existing competition: Visa Trusted Agent Protocol and Cloudflare already provide signed-agent recognition. The remaining product is fault-specific diagnosis and conversion validation across a merchant's actual integration, not an invented agent identity standard. [Specifications - Trusted Agent Protocol](https://developer.visa.com/capabilities/trusted-agent-protocol/trusted-agent-protocol-specifications), [Securing agentic commerce: helping AI Agents transact with Visa and Mastercard](https://blog.cloudflare.com/secure-agentic-commerce/), [Carts and checkout for agents](https://shopify.dev/docs/agents/carts-and-checkout).

Test: Replay known authorized and denied cases in a merchant-controlled environment. Then randomize verified, policy-eligible agent shopping sessions between the existing safe fallback and the repaired route. Primary endpoint is paid orders retained at 30 days; fraud, chargebacks, denied-request acceptance and resource abuse are hard guardrails. Plan 6 to 10 weeks, with power based on natural false-block traffic. Do not manufacture or probe failures on third-party systems.

Measure: Retained orders per randomized verified eligible shopping session, with effects weighted by the independently measured natural block prevalence for an all-traffic estimate. A fall in challenge rate alone is not conversion lift.

The edge remains conditional: Merchants with verified false blocks can recover retained orders through narrow supported configuration fixes without increasing abuse losses. Kill the claim if: No reproducible permitted identity interruption exists, the edge vendor fixes it within current support, or incremental retained contribution is erased by abuse and operating cost.

Feasibility: integration-heavy. Unvalidated test: GBP 1000 per month for a merchant with enough verified lost purchases; compare against its existing edge vendor's included troubleshooting. Cost control: Fix repeatable configuration faults rather than buying repeated simulated purchases; use sampled request traces and deterministic verification diagnostics.

## Evidence and limits

No merchant production system, account or payment flow was accessed. These notes compare official documentation and vendor-described workflows. Vendor descriptions establish documented capabilities and adjacent competition; they do not independently validate performance. Unlocated functionality remains unknown, particularly mixed-wearer fit handling, registry APIs and any proprietary identity recovery logic.

A deployment should begin with a merchant-approved audit of natural fault prevalence. If the observed native flow already works, do not build an extra identity layer. Public AI-origin referral data will miss some journeys, so preserve the known-entry cohort definition and disclose missing attribution. Each proposed trial must set its minimum detectable contribution effect, cluster structure and stopping rule before enrollment; the planning windows are not promises of adequate statistical power.
