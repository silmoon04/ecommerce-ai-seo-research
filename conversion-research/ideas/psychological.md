# Ten psychological experiments for retained AI-origin purchases

Research snapshot: 29 September 2026. This is a divergent set of experiments around human understanding, preferences and confidence after an AI-assisted shopping journey. The complete intervention, data, commercial, experiment and source records are in [psychological.json](psychological.json). None has a measured uplift for this proposed product.

The strongest adjacent purchase evidence concerns useful fit information: randomized apparel field experiments found improved commercial outcomes from virtual fit information. That supports investigating uncertainty, not attaching arbitrary confidence scores to recommendations. [Gallino and Moreno](https://pubsonline.informs.org/doi/pdf/10.1287/msom.2017.0686)

Choice architecture also needs restraint. A meta-analysis covering 50 experiments found an average choice-overload effect close to zero with substantial variation. A smaller shortlist is therefore not a universal prescription. The experiments below change what people can understand or experience, rather than treating fewer options as an automatic sales improvement. [Scheibehenne, Greifeneder and Todd](https://doi.org/10.1086/651235)

All experiments require real shoppers. A controlled search proxy can check factual integrity, intervention exposure and model responses. Fifty model reruns do not supply fifty independent human intentions. Synthetic recommendation frequency cannot validate confidence, regret, comprehension or purchasing behavior. Human surveys can help explain a result; they cannot replace observed purchases and mature returns.

The main trial population is people with an observed AI referral or a separately recruited, consenting AI-shopping journey. Keep those populations separate when referral information is missing. A referral does not reveal an outside assistant's private reasoning or the customer's chat. The merchant asks for the relevant requirement or concern when it needs it. Randomization after arrival estimates the intervention's effect in that cohort; it does not establish that AI caused the visit.

For the ordinary purchase trials, count all assigned eligible people, including those who ignore the intervention. Persist allocation across visits, and measure total-catalog retained purchases so moving sales between SKUs does not masquerade as new demand. Follow the category's actual return window. Duration minima in the JSON are scheduling floors, not claims of adequate power. Use merchant baselines, a meaningful effect threshold and an advance sample-size calculation; the illustrative traffic numbers below are not powered trial sizes.

**01. Let the shopper edit the recommendation's assumptions**

A merchant assistant recommending a laptop might silently prioritize weight over repairability. Expose the assumptions in its own decision model that actually change the result, let the person correct or veto them, and recompute the options. Never pretend to recover an external assistant's hidden reasoning. The proposed mechanism combines useful control with correction of a consequential misunderstanding.

Human forecasting research found greater willingness to use an algorithm when people could adjust its estimates. That is adjacent reliance evidence, not a conversion estimate. ChatGPT already accepts preference feedback and Constructor already supports conversational refinement, so the comparator must be a competent existing assistant. [Dietvorst, Simmons and Massey](https://faculty.wharton.upenn.edu/wp-content/uploads/2016/08/Dietvorst-Simmons-Massey-2018.pdf), [ChatGPT shopping research](https://openai.com/index/chatgpt-shopping-research/), [Constructor](https://docs.constructor.com/docs/products-ai-shopping-agents-learn-about-ai-shopping-agent)

Randomize unique eligible humans between an editable assumption panel and ordinary clarification using the same catalog and recommendation engine. The primary endpoint is a retained purchase within 30 days, after the return window matures. Kill the claim if a powered trial rules out the economic threshold or apparent acceptance produces more unsuitable purchases. This can be built now; unvalidated test price: GBP 500/month.

**02. Show where a choice stays good as preferences vary**

Replace a brittle “best product” verdict with an interactive view of acceptable options across the shopper's uncertain priorities. A buyer can say battery life matters somewhere between “useful” and “essential” rather than inventing an exact weight. Show which products remain suitable throughout that range and when the preferred option changes. Keep the full feasible set accessible.

This is a sensitivity view for human choice, not a claim to know the person's utility precisely. Comparison aids have experimental precedent, and guided selling already exists commercially. The incremental question is whether the sensitivity view improves retained purchasing over the same products in a normal comparison table. [Häubl and Trifts](https://doi.org/10.1287/mksc.19.1.4.15178), [Zoovu](https://www.zoovu.com/)

Hold candidate count, prices and underlying data constant. Randomize shoppers, measure 30-day retained purchases, and separately test whether humans can explain a ranking reversal. An unreadable frontier or a null economic result kills the proposal. Feasible now; unvalidated test price: GBP 500/month. Cache the relevant comparisons rather than spending model tokens on every control movement.

**03. Teach the one specification that blocks the choice**

Build a short optional demonstration of one difficult concept. For USB-C equipment, separate connector shape, charging wattage and data speed, then let a buyer try their own device-and-task combination against sourced rules. The objective is understanding a real purchase constraint. Checkout stays available without taking a quiz.

Research on evaluability shows that how interpretable an attribute is can change product evaluation. It supplies no live sales percentage for this interface. Constructor already combines product knowledge and natural-language questions, so compare the demonstration with an equally informative text answer, not with an unhelpful blank page. [Hsee](https://www.sciencedirect.com/science/article/pii/S0749597896900771/pdf), [Constructor](https://docs.constructor.com/docs/products-ai-shopping-agents-learn-about-ai-shopping-agent)

Randomize novices identified before treatment. Measure retained purchases and incompatibility returns; use an optional research subsample for comprehension because the test itself may alter behavior. If learning improves but purchases do not clear a meaningful threshold, the product claim fails. Feasible now with expert-reviewed rules; unvalidated test price: GBP 300/month per category.

**04. Show the spread of likely ownership outcomes**

For non-apparel products with condition-dependent performance, replace a headline maximum with tested outcome distributions. A power tool or battery product could show runtime under the shopper's chosen load, including the conditions and limits of the evidence. Distinguish variability in real performance from a model's confidence in its own answer. Abstain when the data cannot support a personal estimate.

True Fit already supplies apparel and footwear fit guidance, confidence, outcomes data and governed MCP access. A generic confidence badge or fit passport would collide directly with that offer. This proposal concerns understandable performance variation outside apparel, and its edge remains unproved. [True Fit's July 2026 technical specification](https://www.truefit.com/fit-intelligence-spec)

First validate estimates against held-out real outcomes. Then randomize the display against the current accurate specification presentation, preserving essential conditions in both arms. Measure retained purchasers and performance-related returns. Miscalibration is a stop condition regardless of conversion. This requires data integration; unvalidated test price: GBP 1,000/month excluding tests and licenses.

**05. Rehearse the product's movement in the actual room**

Show whether a cabinet door opens, a chair can be pulled out, or an appliance can be used in the buyer's room. Use verified geometry, operating clearances and measurement tolerances. Offer typed dimensions as well as an optional scan. Unknown obstructions should remain unknown, not disappear inside a convincing rendering.

IKEA Kreativ already supports room scanning, placement, product swapping and sharing; current help also supports room dimensions, doors and windows. Generic room visualization is established. The experiment asks whether operational movement checks add value over a scaled static preview. [IKEA Kreativ](https://www.ikea.com/us/en/newsroom/corporate-news/ikea-launches-new-ai-powered-digital-experience-empowering-customers-to-create-lifelike-room-designs-pub58c94890/), [Current room-building help](https://www.ikea.com/us/en/customer-service/knowledge/articles/9f1ad433-a13a-43b0-bec3-68e75682e8a2.html)

Randomize households before preview exposure and measure 60-day retained purchases, failed deliveries and returns. Reject any implementation that misses known conflicts or adds no purchase value beyond static placement after asset costs. This needs geometry integration; unvalidated test price: GBP 750/month plus bounded setup. Cosmetics AR research is only adjacent evidence, not a room-planning uplift forecast. [Tan, Chandukala and Reddy](https://journals.sagepub.com/doi/abs/10.1177/0022242921995449)

**06. Send the smallest sample that resolves the actual doubt**

When uncertainty is sensory, more explanation cannot replace experience. Offer a comparative two-sample kit chosen to answer the buyer's stated doubt: two relevant fabric textures, for example. Include a neutral trial protocol, true identities, full-product prices, and the option to choose neither.

Samplize and SoPost establish that sampling and its orchestration already exist. The proposed edge is a diagnostic comparative trial rather than a broad promotional sample. Research on in-store sampling reports contextual sales effects, but does not validate this online offer. [Samplize](https://samplize.com/pages/faq), [SoPost](https://sopost.com/solutions/), [Chandukala, Dotson and Liu](https://www.sciencedirect.com/science/article/pii/S0022435917300544)

Randomize the offer to households, not just people who accept a kit. Compare diagnostic and generic kits of equal cost; a separately powered ordinary-page arm can receive the same monetary credit. Only retained full-size purchases count. Shipping delay, kit cost and freebie demand can defeat the economics. Under invented planning assumptions of 10,000 eligible households, 10% take-up, GBP 4 kits, GBP 60 margin and a GBP 500 fee, break-even needs 75 added retained orders. That is a demanding threshold, not a forecast.

**07. Rehearse one ordinary day of ownership**

Give an uncertain shopper a short optional walkthrough of one normal task, such as cleaning a coffee machine after use. Use reviewed steps, actual consumables and sourced effort estimates. Let the buyer compare the routine with a simpler alternative. The proposed advantage is realistic expectations, not a more desirable fantasy.

Mental-simulation research is mixed enough to warrant an explicit negative case. Process thinking can increase decision difficulty and postponement when benefits conflict with effort. A walkthrough could therefore hurt both purchasing and the shopping experience. [Zhao, Hoeffler and Zauberman](https://www-2.rotman.utoronto.ca/facbios/file/JMR%20Time%20and%20MS.pdf), [Thompson, Hamilton and Petrova](https://www.researchgate.net/profile/Rebecca-Hamilton/publication/46553732_When_Mental_Simulation_Hinders_Behavior_The_Effects_of_Process-Oriented_Thinking_on_Decision_Difficulty_and_Performance/links/55af8fc108ae11d31037dbaf/When-Mental-Simulation-Hinders-Behavior-The-Effects-of-Process-Oriented-Thinking-on-Decision-Difficulty-and-Performance.pdf?origin=publication_detail)

Compare a brief rehearsal with a matched-information manual summary or usage video in a shopper-randomized trial. Measure retained catalog purchases, effort-related returns and postponement. More informed non-purchasing alone cannot satisfy the purchase objective. Feasible now for a narrow category; unvalidated test price: GBP 300/month.

**08. Explain why credible reviews disagree**

When a shopper sees an AI recommendation contradicted by reviews, show whether product version or usage conditions explain the disagreement. Present authentic evidence on both sides, the relevant sample size and source links. If the explanation is not supported, preserve the contradiction and offer a factual way to test it.

Amazon already shows product-aspect positive and negative sentiment and source quotations; its current page notes the rename from Rufus to Alexa for Shopping. Basic review summaries are mature competition. The experiment must test conditional explanation against that stronger baseline. [Amazon's shopping tools](https://www.aboutamazon.com/news/retail/amazon-agentic-ai-gen-ai-shopping)

Randomize people in a contradiction cohort defined before treatment. Use the same review corpus in both arms and measure retained purchases, complaints and mismatch returns. Audit against invented reconciliation and selective omission. Research on two-sided messaging concerns conditional communication effects and does not prove this will increase sales. [Eisend](https://www.sciencedirect.com/science/article/pii/S0167811606000267)

This requires review rights and version mapping. An unvalidated GBP 500/month test price excludes licensing. Resolve common contradictions once with human review; do not generate a new unsupported story for every visitor.

**09. Give joint buyers a private veto before negotiating**

For genuinely shared purchases, let each consenting participant privately declare non-negotiable constraints before the group sees a combined shortlist. Reveal only what each participant agrees to share. Show unresolved conflicts rather than forcing a consensus. The buyer sends any invitation; the product does not infer relationships or sensitive preferences.

Shared design and navigation already exist. Laboratory research supports better coordination from shared navigation, but does not show that private elicitation creates additional purchases. The hypothesis is that revealing practical objections early prevents an otherwise abandoned decision or disagreement-driven return. [Zhu, Benbasat and Jiang](https://hub.hku.hk/handle/10722/270326), [IKEA sharing](https://www.ikea.com/us/en/newsroom/corporate-news/ikea-launches-new-ai-powered-digital-experience-empowering-customers-to-create-lifelike-room-designs-pub58c94890/)

Randomize initiating buyers before invitations and persist one allocation per group. Compare private elicitation with an ordinary shared shortlist. Count the shared order once, include groups whose partners never participate, and power on independent groups. Measure 60-day retained purchases and privacy or conflict complaints. This is an integration project; unvalidated test price: GBP 750/month. A useful shared board is not enough if kept purchases do not increase.

**10. Test an honest “keep what you have” recommendation**

A merchant assistant could explicitly advise retaining an existing product when verified facts show it already satisfies every stated requirement. Show the reason and the condition that would make an upgrade useful. Use voluntarily supplied ownership information, preserve choice, and do not manufacture a future deficiency.

This is a reserve frontier experiment. The hypothesis is that useful advice earns later trust and additional retained purchases. Two-sided communication research does not establish that long-term commercial effect, and immediate purchases may fall. General-purpose assistants can already discuss alternatives; the proposed difference is a merchant evaluation contract that tolerates honest abstention. [Eisend](https://www.sciencedirect.com/science/article/pii/S0167811606000267), [ChatGPT shopping research](https://openai.com/index/chatgpt-shopping-research/)

Keep a customer-level holdout for at least 180 days, plus return maturation. The primary outcome is cumulative retained orders per assigned customer across the catalog. Count immediate orders forgone. Trust scores, return-cost savings, and orders merely shifted into a later month do not rescue a purchase failure. An unvalidated GBP 500/month pilot is suitable only for merchants with repeat demand and stable measurement. Exclude it from launch claims until the long-horizon purchase effect is demonstrated.

A practical first test queue would include 01, 03 and 08 because each isolates a specific failure and can be compared with an existing competent experience. Ideas 05, 06 and 09 offer materially different integrations. Idea 04 depends on credible outcome data. Idea 10 should remain a reserve. These are judgments about testability and differentiation, not ranked forecasts of conversion uplift.

The JSON's commercial scenarios are economic break-even sensitivities. The common example uses invented monthly inputs of 10,000 eligible humans, 2% retained purchasing, one order per additional purchaser, GBP 40 contribution per incremental order, a GBP 500 fee and GBP 0.02 serving cost. It requires 17.5 additional retained orders, or 0.175 percentage points, to cover GBP 700. Basket changes, data licenses, setup, displaced sales and returns can change the economics. Every idea permits zero or negative effects.
