# A research workflow we can actually run

Use a tool when it answers a named decision. A longer subscription list does not make the evidence stronger. The first pass can use public sources, a spreadsheet, the existing AI tools and an actual garment sample once that purchase is chosen.

| Question | Tool or source | What to save | What it cannot establish |
|---|---|---|---|
| What do niche creators repeatedly use or recommend? | Public YouTube listings and accessible captions; yt-dlp was used in this dossier | Video ID, date, timestamp, exact product mention, context and sponsorship disclosure if visible | Their viewers' willingness to buy our product; a creator's recommendation is not independent sales evidence |
| Is interest seasonal or changing? | Google Trends | Query or topic, region, window, comparison set and dated screenshot/export | Absolute demand, sales or price acceptance; the index is normalized and sampled |
| What language describes the problem? | Keyword Planner, public marketplace search, original customer conversations | Query, use case, commercial/informational intent, source and uncertainty | Forecast profit from search volume; Planner estimates and account access requirements matter |
| What already solves the job? | Live retailer pages and their published specifications | Delivered price, material, measurements, compatibility, availability and returns | Competitor margin or sales; a listing can be wrong or outdated |
| What repeatedly disappoints buyers? | Public product reviews and permissioned interviews | A short coded observation, purchase context, date, severity and source | Population frequency from a selected review sample; duplicated reviews are one observation |
| What ad concepts are being published? | Meta Ad Library and TikTok Creative Center | Audience promise, first shot, proof, demonstration, offer and landing-page match | The advertiser's profit; a long-running ad is a clue, not an audited result |
| Does someone understand our offer? | A phone, the actual prototype/page and a short observed task | What they tried, where they hesitated, what they expected, exact defect | A conversion lift or the share of all customers with that issue |
| Does the product survive use? | The actual ordered garment, measurements, photographs and a wash log | Exact SKU, size, colour, decoration, before/after measurements and comfort notes | A guarantee from a catalogue GSM number or generated image |
| What did an order really leave? | Shopify order/refund export, supplier invoices and one cost ledger | Initial paid order, retained receipts, delivery, fees, replacements, acquisition and labour | Profit from an advertising dashboard's attributed revenue |
| Where is the page difficult to use? | Direct mobile checks; consent-configured GA4 or Clarity only when justified | A specific failure and reproduction, consent state, affected step and fix | Causation from a replay or heatmap alone |
| Can discovery systems read the correct facts? | Rendered HTML, product structured data, Search Console, Merchant Center and eligible channel diagnostics | Product/variant identity, observed value, source value, timestamp and destination | Guaranteed indexing, recommendation, ranking or AI orders |
| Is the proposed software doing useful work? | A small rights-cleared catalog snapshot, deterministic checks and a reviewed AI extraction | Source span, suggested issue, correct answer, reviewer decision, time and total cost | Real ChatGPT behaviour from a local model replay; generalisation from our one store |

Tool references and limitations are documented in the [Google Trends FAQ](https://support.google.com/trends/answer/4365533?hl=en-GB), [Keyword Planner guidance](https://support.google.com/google-ads/answer/7337243), [Google product structured-data guide](https://developers.google.com/search/docs/appearance/structured-data/product), [Google's AI Search guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide), [Clarity consent guidance](https://learn.microsoft.com/en-us/clarity/setup-and-installation/consent-mode), and [Shopify's catalog mapping documentation](https://help.shopify.com/en/manual/shopify-catalog/mapping). Public research interfaces and permitted access can change. Check the actual account and intended purpose before choosing a paid tool.

## How to use AI without replacing the evidence

Start with a small evidence table. Give every observation a source ID, date, excerpt or timestamp, buyer context and confidence. Ask a research model to extract facts into those fields and leave missing values empty. A separate check should be able to open the source and verify every consequential field. Summaries without provenance are hard to correct later.

Next, ask an application model to propose competing explanations. If five people call a crewneck expensive, they may dislike the price or see an ordinary-looking garment. Poor fit photographs, an unclear design or distrust of the store could also explain it. We may simply have asked the wrong audience. Ask for a cheap test that distinguishes two explanations. Generating twenty new designs immediately may not answer the question.

Use a critical model to challenge the proposed action before spending. Ask it to find the strongest contrary observation and check the arithmetic. It should also say what must happen first and when to stop. Its agreement does not count as another customer opinion. Multiple models reading the same review still have one source.

The useful automation sequence is: collect permitted material, preserve sources, extract, deduplicate, code observations, propose alternatives, choose a bounded test, record the outcome, and update the decision. Use deterministic checks for arithmetic, schemas, duplicate IDs and missing provenance. Spend model calls on interpretation that actually changes what we do.

Tavily and Apify can help with public-source discovery or structured retrieval when ordinary access leaves a specific gap. Existing credentials should stay in the local environment, with result and cost limits set before a run. This channel review used public yt-dlp retrieval for the catalogue and captions; no paid Apify run was needed. Private transcripts remain outside the published site.

## A few small decisions that deserve a human check

For clothing, review one production-size motif on the actual garment before buying another colour. A clean digital mockup cannot tell us whether the backing scratches, fine details disappear or the garment twists after washing.

For an organiser or other functional product, verify the dimensions that decide whether it fits. A persuasive demonstration is only useful if the customer's version works too. Avoid expanding to a dozen compatibility variants before identifying the common case.

For AI-assisted buying, compare an answer against current product facts and distinguish a correct answer from a visit or order. Log missing eligibility and tracking separately; neither is a zero-sales result.

For software, inspect whether a proposed issue is already reported by the merchant's native tools. If it is, the valuable job might be resolving ownership or completing the repair. Another score may add no value.

The tool output should end in a smaller, clearer decision: sample this blank; simplify this stitch; show the delivery price earlier; abandon this compatibility claim; quote this bounded merchant job. If it produces only more research to read, tighten the question.
