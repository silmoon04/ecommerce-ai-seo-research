# Testing a shopping harness against real purchase outcomes

The controlled search proxy in the shared conversation can help diagnose shopping failures. A model calls a search function we control; we record its results, change a permitted product representation, replay the task and compare observable decisions. This can help explain whether missing information, retrieval position, an incorrect variant or a broken handoff caused a failure inside the experiment.

Commercial value depends on whether those diagnoses help us choose changes that cause more real orders than the merchant's current workflow. The proxy does not reproduce the private production system behind ChatGPT, Google or another shopping service. An AI agent's recommendation is not evidence of a human purchase.

The shared message's recommendation ladder from 12% to 67%, and its 18.4% to 31.7% example, are illustrative numbers, not results. Repeating one shopper prompt 50 times measures some model variability; it does not sample 50 independent customers. Moving a product up a search list can measure sensitivity to position, but cannot establish that a merchant edit will earn that position in a live engine. [Shared discussion](https://chatgpt.com/s/t_6abb72f6509c8191a0d80d6c1329760d)

## Several services already provide parts of this

Shopify SimGym uses synthetic shoppers to compare live and draft Liquid themes. It measures simulated add-to-cart behavior, and Shopify warns that real shoppers may behave differently. After the monthly allowance, the documented price is $0.75 for a single-theme simulation and $1.50 for a comparison. That is a low-cost alternative to a generic synthetic storefront audit. [SimGym documentation](https://help.shopify.com/en/manual/online-store/simgym)

Shopify Rollouts supports live control and treatment experiments on eligible plans, covering documented theme, checkout/account, catalogue-state and discount changes. Merchants can therefore combine synthetic checks with real experiments inside Shopify. Rollouts does not establish randomization of an external engine's retrieval or ranking. [Rollout types](https://help.shopify.com/en/manual/markets/rollouts/rollout-types)

Lily Max advertises an experiment loop over product information, including variants, holdouts, matched-spend comparisons, difference-in-differences and approved deployment. This directly overlaps the proposal to improve product facts and test which version works. The method and channel matter: a paid-shopping result does not by itself establish an external AI-origin purchase effect, and matching spend alone does not create randomized assignment. [Lily Max workflow](https://www.lily.ai/how-it-works/)

SearchPilot offers GEO tests and Merchant Center changes; its research also explores synthetic shopping conversations. Feedonomics documents product-level enrichment experiments, and DataFeedWatch has established title-testing functionality. The detailed comparison distinguishes commercial features, research demonstrations, advertised early access and methods not found in the reviewed sources. [SearchPilot GEO](https://www.searchpilot.com/ai), [SearchPilot Merchant Center](https://www.searchpilot.com/merchant), [Feedonomics testing](https://docs.feedonomics.com/product/enrichment/ab-testing), [DataFeedWatch title tests](https://www.datafeedwatch.com/blog/ab-testing-product-titles)

This research found capabilities the earlier report missed or described too narrowly. Monitoring vendors also offer actions, commerce analytics and agents. Describing competitors only as visibility dashboards would miss that overlap.

## What could justify another product

A more specific product would investigate purchase failures across the whole route: the product data supplied, recommendation observed, variant opened, offer available, checkout completed and later cancellation or return. Replay would locate a possible cause; a live comparison would test whether fixing it improves conversion.

An assistant may recommend the correct item but open a different size. A delivery promise may fail once the final address is entered, or a checkout retry may lose an otherwise valid purchase. The hypothesis is that fixing a particular class of failure saves more orders than a feed manager, testing platform or support assistant already saves. Possible failures alone do not establish a large market; their presence and frequency need measurement.

The experiment system should help deliver an intervention worth paying for. Recovered purchases, reliable fulfilment promises or less time spent resolving costly faults may justify a fee. Another score or more synthetic sessions may not.

## How the research was organised

Eighteen GPT-6 Astra Max product researchers examined selected commercial, native, workflow and vertical benchmarks, with ten candidate ideas requested from each. Eight separate Astra Max idea researchers explored algorithmic, behavioral, infrastructure, regulatory, psychological, temporal, identity and measurement approaches. Further research covered direct harness competition and the value/power calculations.

Inclusion as a benchmark does not imply proven profitability. Burnish and Geoffy, for example, were included for their documented workflows; private margins and retention are generally unavailable. The product studies record the limits of vendor claims and public documentation, including release restrictions and inconsistent published prices.

The final 50 are screened product hypotheses, not 50 proven conversion improvements or claims of worldwide novelty. Each needs a distinct intervention and purchase mechanism, a named competing approach, practical dependencies, an experiment and a reason to stop. Similar suggestions are merged even when researchers gave them different names. Ideas requiring substantial integration remain in consideration, with their dependencies stated.

## What the numbers can honestly tell us

An empirical expected lift needs a merchant baseline and relevant experiments. A vendor case can establish what that vendor reports for a particular customer, not what our implementation will deliver. This matters especially when the case measured paid traffic, onsite search, attribution or order value instead of new AI-origin purchase events.

We separate source evidence, mechanism-specific sensitivity calculations and a common editable value model. Unknown lift stays unknown. A sensitivity example shows what an intervention would be worth if it achieved a specified change. It is neither a forecast nor a lower bound; a null or negative result remains possible.

The common model uses eligible AI-origin shopping traffic, purchase conversion and contribution per completed order after expected variable costs and returns. These are hypothetical defaults until a merchant supplies measured inputs. It calculates additional orders, contribution, the improvement needed to cover a fee, and a fee ceiling at a chosen value-to-cost multiple. Willingness to pay still needs to be tested.

Traffic may be a tighter constraint than engineering. Small relative changes in a low purchase rate need many independent observations of whether people buy; synthetic shoppers cannot supply them. Product-family experiments, agency cohorts and longer windows can help with suitable designs, but do not remove clustering, interference or differences between merchants.

Start with a small set of measurable interventions and the minimum experiment infrastructure needed to evaluate them. The 50 ideas are options to choose among, not a plan to build all of them or add their possible uplifts together.
