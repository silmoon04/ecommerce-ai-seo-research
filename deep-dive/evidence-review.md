# Evidence review: competitor deep dive

Read-only adversarial check of selected claims against current first-party pages, 29 September 2026. This is a claim audit, not a general copy edit. The research is appropriately cautious about public profit evidence overall; I found no basis for a blanket claim that competitors are profitable or unprofitable.

## Resolved page-version issues

### Scrunch scope: current direct page confirms the revised enterprise.md figures

An earlier indexed Scrunch pricing matrix returned Core at $250/month with 125 prompts, four engines, one persona and one language. That was a stale/versioned offer, not reliable evidence against the newer draft. The current direct [Scrunch pricing page](https://scrunch.com/pricing/) renders Starter at $250/month annual or $300 month-to-month and Growth at $417 annual or $500 month-to-month. It lists Starter/Growth respectively at 350/700 custom prompts, 1,000/2,500 industry prompts, 3/5 personas, 5/10 page audits, with seven AI platforms; it describes a seven-day Starter trial. The current [enterprise.md] now describes those plans correctly and explicitly separates the old Core matrix. No Scrunch correction remains.

### Profound scope: current enterprise.md now resolves the brand/agency distinction

An earlier audit treated the Trial/Enterprise Brands page and indexed $99/$399 Starter/Growth page as an unexplained contradiction. The current [enterprise.md] accurately reports the live Brands presentation separately from the self-serve Agency Growth offer: 400 credits per client workspace, with $399/workspace pricing sourced to the agency launch post. It identifies old $99/$399 brand tiers as an earlier/alternate presentation, not current brand pricing. The current [Profound pricing page](https://www.tryprofound.com/pricing) supports the Brands Trial/Enterprise view; the credit FAQ and [Agency Growth launch post](https://www.tryprofound.com/blog/agencies-launch-your-aeo-practice-with-profound) support the separately scoped agency offer. Keep these offers segmented; do not collapse agency workspace pricing into current brand pricing.

## Remaining differentiation issue: catalog opportunity undercounts close competitors

The opportunity card says: “Hypothesis: merchants have no single cross-layer view of ‘which source won, where did it render, and did the destination ingest it?’” It lists Shopify mapping, Search Console, feed rules, spreadsheets and bulk editor as alternatives, but omits two close products already covered elsewhere in this research. That weakens the competitive screen even though the hypothesis is explicitly falsifiable.

Burnish already sells a broad diagnose/change/remeasure loop and documents 41 change types, approval defaults for 29, dependency checks, before-state records and one-click rollback. Geoffy verifies claims against merchant catalog data, holds unverified claims for confirmation, and synchronizes visible widget/schema/page content as price or variant data changes. These are evidence that safe repair, approval, reversible change and storefront-side verification are already commercialized. [Burnish product and method](https://useburnish.com/what-it-does/) · [Geoffy product](https://geoffy.ai/) · [Geoffy FAQ](https://geoffy.ai/docs/faq)

This does not disprove the narrower hypothesis: a merchant may still lack a single workflow that traces a conflicting fact from Shopify/PIM/feed source through rendered page/schema to a named external destination’s ingested state. The distinction should be explicit in the alternatives and test: compare against Burnish and Geoffy as well as feed tools, and require a demonstrated destination-ingestion discrepancy that their documented safe repair loops do not close. A verified HTML/page re-fetch alone is not downstream destination-ingestion proof. Do not position provenance, approval, rollback, safe editing, or rendered-page verification alone as novel.

## Claims that survived the check, with boundaries to preserve

### Shopify Catalog Mapping already covers meaningful source-selection work

The opportunity design correctly treats the cross-layer gap as a hypothesis and names Shopify Mapping. Official mapping documentation says merchants can map preferred sources, consolidate variants, and group identical products. This overlaps basic source selection, variant grouping, and Shopify Catalog representation. The proposed distinction must involve a real mismatch beyond Shopify’s own mapping—especially page/schema output and destination state—not mapping alone. [Shopify mapping documentation](https://help.shopify.com/en/manual/shopify-catalog/mapping)

### Review duration is not treated as paid retention

`premium-apps.md` explicitly says review duration does not prove a paid subscription or retention. Its longer Geoffy and StoreRank examples also state that plan/payment, counterfactual, and financial evidence are unavailable. This is a fair characterization of reviewer testimony, not a defect to correct.

### Competitor profitability remains unknown in the reviewed evidence

`profitability-mechanisms.md`, `enterprise.md`, and the product cards consistently separate company-reported ARR, funding, customer counts, pricing, and headcount from profit or margin. Cost drivers are hypotheses and the sensitivity model labels its inputs hypothetical. I found no accepted inference that a named competitor is loss-making, and no vendor profit conclusion should be added from these public indicators.

### Demo and merchant outcome figures remain attributed claims

The checked product cards label vendor case-study lifts and merchant review results as claims, associations, directional measures, or unverified examples; they distinguish scores, attributed revenue, traffic, and causal lift. I found no material instance in this sample where a demo metric was presented as independently established merchant profit. Keep the attribution language close to each figure.

## Action for the research owner

No Scrunch or Profound pricing correction is needed in the updated `enterprise.md`. Tighten the catalog opportunity’s competitor list and falsifier to test the narrow destination-ingestion gap against Burnish and Geoffy; generic safe repair and storefront verification are already covered by current competitors.
