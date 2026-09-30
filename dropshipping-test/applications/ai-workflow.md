# An AI workflow we can actually operate

Use Perry Xie's four videos as a sequence to examine: shortlist a product, investigate the offer, build a page, then test acquisition. Replace the implied shortcut from competitor activity to a "winner" with evidence gates. The useful transfer is faster research and assembly; the videos provide no controlled estimate of conversion lift or typical profitability. His product-research lesson uses ad longevity and estimated traffic, the main lesson builds a selected product, and the speedruns demonstrate selection and advertising heuristics. Keep those roles distinct. [Public main tutorial](https://www.youtube.com/watch?v=b43_Gs64mYM), [selection tutorial](https://www.youtube.com/watch?v=5slU3QjvzI8), [first speedrun](https://www.youtube.com/watch?v=IbObinWjfHg), [second speedrun](https://www.youtube.com/watch?v=oH2r5KUTRzo).

Our first deliverable should be one documented offer and a reviewable draft page. Use existing Codex agents for bounded research, browser inspection for public evidence, local Markdown/CSV/JSON files for records, and an existing Shopify account with a free theme for implementation when authorized. Dawn is free; Shopify itself has a subscription cost. Native discounts and the free Shopify Bundles app can cover a simple fixed offer. A separate builder, ad-intelligence subscription or bundle app needs a measured reason. [Dawn](https://themes.shopify.com/themes/dawn/presets/dawn), [Shopify UK pricing](https://www.shopify.com/uk/pricing), [Shopify Bundles](https://help.shopify.com/en/manual/products/bundles/shopify-bundles).

## Eight stages, with explicit handoffs

Each stage produces a small file another agent can check. The prompts below are original working prompts for us. They do not reproduce the creator's Discord material; this research has no authenticated access to those private prompts.

**1. Selection signals.** Save `candidates.csv` with `candidate_id, exact_item, market, observed_signal, source_url, observed_at, signal_type, sample_check, supply_gap, claim_burden, margin_gap, next_question, decision`. An active ad is an observation; a vendor's performance rank is a proprietary proxy. Neither belongs in a verified-sales column. Shortlist at most two candidates, including reasons to reject them. Do not estimate revenue by multiplying guessed conversion by traffic.

> Inspect these public ads and pages. Record what is directly visible, the observation date and URL. Separate seller claims from evidence. Compare inspectability, delivered-cost uncertainty, returns and substitution. Recommend the next missing fact for each candidate, without calling any a winner.

**2. Primary facts and provenance.** Save `facts.json` per exact variant: `product_id, variant_id, fact_name, value, units, market, source_owner, source_url_or_file, captured_at, verified_by, status, recheck_date, rights_basis`. Use statuses `verified`, `supplier_claim`, `unknown`, `conflicting`. Attach supplier documents and sample notes when available. Resolve material conflicts before public copy. Price, availability and variant information must agree across page, checkout and product data. [Google product data specification](https://support.google.com/merchants/answer/7052112?hl=en).

> Extract exact variant facts from these primary documents. Cite each value. Preserve unknowns and conflicts. List the questions a sample or supplier answer must resolve. Do not infer materials, delivery guarantees, image rights or efficacy from a competitor listing.

**3. Customer hypotheses.** Save `hypotheses.md`: `hypothesis_id, audience, buying_situation, proposed_reason_to_buy, likely_objection, evidence_seen, alternative_explanation, measurable_action, disconfirming_result`. Customer language from public reviews can suggest questions, but belongs to those reviewers and products. Keep a proposed objection distinct from an observed one.

> Using only this fact ledger, write two competing reasons someone might buy at the proposed delivered price. For each, state the objection, competing alternative and evidence that would change our decision. Label all inferred buyer beliefs as hypotheses.

**4. Original page and creative.** Save `page-spec.md` and `creative-register.csv`: `asset_id, version, owner, rights, source_facts, claim_ids, actual_photo_or_synthetic, intended_use`. Analyse competitor section order as a layout hypothesis, then write from our facts. Use our own art and accurate sample photography. Leave absent reviews absent. An AI lifestyle image cannot establish embroidery quality, dimensions or performance. Objective claims need substantiation before publication. [CAP substantiation rules](https://www.asa.org.uk/type/non_broadcast/code_section/03.html).

> Draft a mobile product page from verified facts. Include price, variants, sizing or dimensions, delivery, returns and seller information. Flag missing facts rather than filling them. Suggest two original creative concepts using assets we own; attach every factual claim to its ledger entry.

**5. Mobile checkout QA.** Save `qa.csv`: `case_id, device_viewport, page_version, variant, expected, observed, evidence_file, severity, owner, resolved_at`. Walk product selection, cart quantity, shipping calculation, checkout total, payment errors and confirmation. Check text zoom, keyboard controls, unavailable variants and delivery/returns visibility. Use test mode only when access and implementation are authorized; a screenshot review cannot verify a payment transaction. Reconcile a test order and refund path with events before buying traffic.

> Inspect this draft at narrow mobile width. Compare displayed price, selected variant, stock and delivery with the ledger. Record reproducible failures with screenshots. Distinguish visually inspected steps from actual test transactions. Stop publication for wrong totals, unsupported claims or a broken checkout.

**6. Versioned experiment.** Save `experiment.json`: `id, version, product, audience, channel, page_hash, creative_versions, price, dates, primary_metric, attribution_rule, cash_cap, founder_hour_cap, stop_conditions, interpretation_rules, authorization_status`. Freeze one offer and at most two creative concepts. This research authorizes preparation only. Proposed advertising or customer sessions require their own authorization and a fixed cap; a planning budget is no permission to spend.

> Turn hypothesis H1 into one bounded experiment. Identify what stays fixed, the primary metric and denominators, cash and hour ceilings, failure stops and the weaker conclusion possible with few orders. Do not invent expected CPC, conversion or CAC.

**7. Retained contribution.** Save `orders.csv`: `order_id, experiment_id, paid_amount, discount, tax, payment_fee, fulfilment, refund, replacement, chargeback, variable_labour, acquisition_allocation, status, maturity_date, contribution`. Keep customer identifiers outside research exports. Separate platform-attributed revenue from store orders and mature retained orders. Count failed tests and shared subscriptions in the portfolio ledger.

> Reconcile these anonymised orders with spend. Calculate net receipts minus variable costs and acquisition, marking missing costs and immature orders. Show fixed experiment costs separately. Report gross revenue, retained contribution and uncertainty without describing ROAS as profit.

**8. Learn.** Save `decision.md`: `experiment_id, observed_counts, missing_data, comparison_to_rule, alternative_explanations, stop_or_repeat, next_change, remaining_cash, hours_used`. An inconclusive result is a valid stopping outcome. Repeat only through a separately bounded decision.

> Apply the preregistered rule to the recorded counts and mature economics. Separate evidence from possible explanations. Choose one next action and the smallest missing observation that would justify it. Preserve rejected attempts in the record.

## Ten questions worth resolving

1. Which exact blank or functional SKU are we selling, and which advertised attributes are verified on that variant?
2. What does a physical sample show about stitch quality, fit, capacity or construction that supplier images hide?
3. Which supplier can fulfil UK orders, and what documented handling, shipping and return terms apply?
4. What is the actual landed cost for one order, including the proposed delivery promise?
5. Which comparable alternative makes our delivered price difficult to justify?
6. What specific buying situation could make the original design or functional difference valuable?
7. Which objection requires product proof, and which requires clearer page information?
8. Can a mobile buyer identify the correct variant, total price and expected delivery before paying?
9. Which orders survive refunds and replacements, and what contribution remains after service and acquisition?
10. Does an unrelated merchant have a recurring problem our checker solves better than Shopify's native tools, and will they pay for it?

## Where the method transfers

For our original dark-fantasy clothing, prioritise rights, sample appearance, measurements and the proposed £72 delivered price. AI can organise evidence and draft accurate copy; it cannot feel fabric or validate willingness to pay. For a compact organiser, prioritise exact dimensions, a repeatable real demonstration, supplier delivery and price comparison. A useful-looking commodity can still have poor contribution. Bundles need an actual use case and margin comparison, rather than an assumption that customers want multiples.

A synthetic AI harness is a controlled factual check. Store its prompt set, model/version, browsing configuration, source snapshot, output and scoring rubric. Measure contradictions, omissions and unsupported claims. It is neither live ChatGPT shopping search nor a real-buyer proxy. A model asked to read our page has been given access; that does not demonstrate platform indexing, recommendation visibility or buying behaviour. Synthetic examples throughout this workflow are planning material, never tested results. [ChatGPT shopping guidance](https://help.openai.com/en/articles/11128490-shopping-with-chatgpt-search).

Data quality is the practical limit: stale prices, wrong variant joins and unowned images propagate faster when automated. Keep primary-source dates and an accountable reviewer. Do not expose customer records, credentials or private merchant exports in prompts without a permitted processing route. Existing account access does not authorize private Discord retrieval or supplier outreach.

## When another tool earns its bill

Use a measured monthly comparison: `(manual hours - tool hours - extra QA hours) × chosen hourly value - subscription - setup cost allocation`. Hypothetically, saving four hours, adding one QA hour, valuing time at £15/hour and paying £30 yields £15/month before setup. Two setup hours valued at £15 erase the first two months' net saving. These are chosen inputs, not measured savings. Adopt only after the same tasks demonstrate savings without worse factual errors; value cash and founder time separately.

An eventual SaaS opportunity is a permissioned product-fact and mismatch workflow if external merchants repeatedly struggle with it. First compare their existing Shopify product administration, feeds, native automation and current apps. Our own store can expose errors but cannot prove external demand. A credible next gate is a working demonstration followed, when separately authorized, by an independent merchant paying for a recurring outcome. Promise fewer errors or measured time saved only when supported. Do not promise AI ranking gains from a local model check or build a broad scraped database before that paid problem survives the native-platform comparison.
