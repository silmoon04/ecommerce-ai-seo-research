/* The dossier data is kept separate so every displayed count has a source. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const array = value => Array.isArray(value) ? value : [];
  const words = value => typeof value === 'string' || typeof value === 'number' ? String(value) : '';
  const textOf = value => words(value) || words(value?.description || value?.summary || value?.text || value?.action);
  const money = value => new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP' }).format(value);
  const number = value => new Intl.NumberFormat('en-GB').format(value);
  const node = (tag, className, text) => { const element = document.createElement(tag); if (className) element.className = className; if (text !== undefined) element.textContent = words(text); return element; };
  const safeUrl = value => { if (typeof value !== 'string' || !value.trim()) return ''; try { const url = new URL(value, location.href); return ['http:', 'https:'].includes(url.protocol) ? url.href : ''; } catch { return ''; } };
  const link = (label, url) => { const anchor = node('a', '', label); const href = safeUrl(url); if (href) { anchor.href = href; if (new URL(href).origin !== location.origin) { anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; } } return anchor; };
  const addParagraph = (parent, value, className = '') => { const text = textOf(value); if (text) parent.append(node('p', className, text)); };
  const note = (id, text) => $(id).replaceChildren(node('p', 'data-status', text));
  const labels = { clothing: 'Original clothing', physical: 'Other physical products', ai_commerce: 'AI-assisted shopping', saas: 'Ecommerce SaaS' };
  const priorities = ['now', 'next', 'later', 'reject'];
  const domainLabels = { product: 'Product selection', brand: 'Brand and offer', pricing: 'Pricing and economics', creative: 'Creative and content', distribution: 'Distribution', store: 'Store and conversion', measurement: 'Measurement', operations: 'Operations', 'ai-commerce': 'AI commerce', saas: 'Ecommerce SaaS' };
  const domainOf = decision => decision.domain || decision.area;
  const storageKey = 'fieldnotes:profit-playbook:2026-09-30:shortlist:v1';
  const data = window.profitPlaybook;
  let decisions = [], selected = new Set(), records = [], storageAvailable = true;
  try { selected = new Set(array(JSON.parse(localStorage.getItem(storageKey) || '[]')).filter(id => typeof id === 'string')); } catch { storageAvailable = false; }
  if (!storageAvailable) $('storage-note').textContent = 'Browser storage is unavailable. The shortlist works for this visit and can still be exported.';
  const reviewOf = decision => { const review = decision.review || decision.reviewed; return review && typeof review === 'object' ? review : {}; };
  const priorityOf = decision => { const review = reviewOf(decision); const priority = review.final_priority || decision.final_priority || decision.priority; return priorities.includes(priority) ? priority : 'unassigned'; };
  const finalRecommendation = decision => { const review = reviewOf(decision); return words(review.final_decision || review.recommendation || review.decision || decision.final_decision || decision.decision); };
  const fieldSection = (parent, title, content) => { if (!textOf(content)) return; const section = node('div', 'record-section'); section.append(node('h4', '', title), node('p', '', textOf(content))); parent.append(section); };
  const evidenceList = (parent, evidence) => { if (!array(evidence).length) return; const list = node('ul', 'record-evidence'); evidence.forEach(item => { const li = node('li'); li.append(link(item.label || item.title || item.url || textOf(item), item.url)); if (item.type) li.append(node('span', 'evidence-type', item.type)); list.append(li); }); parent.append(list); };
  function saveSelected() { try { localStorage.setItem(storageKey, JSON.stringify([...selected])); } catch { storageAvailable = false; $('storage-note').textContent = 'The shortlist is kept for this visit. Browser storage could not be updated; export it to keep a copy.'; } }
  function renderOverview() {
    const overview = data.overview;
    const intro = typeof overview === 'string' ? [overview] : array(overview?.paragraphs).length ? overview.paragraphs : overview?.summary ? [overview.summary] : [];
    if (intro.length) { $('overview-content').replaceChildren(); intro.forEach((p, i) => addParagraph($('overview-content'), p, i ? '' : 'lead')); }
    array(overview?.takeaways).forEach(item => addParagraph($('overview-takeaways'), item));
    array(overview?.limitations || data.meta?.limitations).forEach(item => addParagraph($('methodology-extra'), item));
    if (Number.isFinite(data.meta?.catalogue_count)) addParagraph($('methodology-extra'), `Collection snapshot: ${number(data.meta.catalogue_count)} catalogue entries and ${number(array(data.videos).length)} reviewed video digests. Long-form videos and Shorts have different coverage; use the catalogue and channel notes to inspect that scope.`);
    const date = data.meta?.as_of || data.meta?.date;
    if (date && /^\d{4}-\d{2}-\d{2}$/.test(date)) { $('research-date').dateTime = date; $('research-date').textContent = new Date(`${date}T12:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }); }
  }
  function renderChannels() {
    const channels = array(data.channels);
    if (!channels.length) { note('channel-list', 'Channel coverage has not been supplied. No catalogue or review count is inferred.'); return; }
    $('channel-list').replaceChildren();
    channels.forEach(channel => {
      const card = node('article', 'channel-card'), heading = node('div', 'channel-heading');
      heading.append(node('h3', '', channel.name || channel.label || 'Channel evidence'));
      if (channel.url || channel.videos_tab_url) heading.append(link('Open the channel', channel.url || channel.videos_tab_url));
      card.append(heading); addParagraph(card, channel.description || channel.summary);
      const fetched = channel.fetched ?? channel.flat_entries_fetched ?? channel.catalogue_count;
      const reviewed = channel.reviewed ?? channel.transcripts_reviewed ?? channel.reviewed_count;
      const failed = channel.failed ?? channel.failed_count;
      const total = channel.total ?? channel.playlist_reported_count ?? fetched;
      [['Fetched records', fetched, ''], ['Reviewed videos', reviewed, ''], ['Failed retrievals', failed, 'failed']].forEach(([label, value, className]) => {
        if (!Number.isFinite(value)) return;
        const row = node('div', `coverage-line ${className}`), track = node('span', 'track'), fill = node('i');
        fill.style.width = `${total > 0 ? Math.min(100, value / total * 100) : 0}%`; track.append(fill);
        row.append(node('span', '', label), track, node('span', '', number(value))); card.append(row);
      });
      addParagraph(card, channel.coverage_note || (Number.isFinite(total) ? `Bar scale: ${number(total)} records in this reported catalogue. Retrieval and review are different steps.` : 'Catalogue total unavailable; no coverage percentage is inferred.'), 'coverage-basis');
      addParagraph(card, channel.limitations || channel.caveat, 'small-note'); $('channel-list').append(card);
    });
  }
  function renderVideos() {
    const videos = array(data.videos); $('video-count').textContent = videos.length ? `${number(videos.length)} records` : 'No records supplied';
    if (!videos.length) { note('video-list', 'Video digests have not been supplied. Use the full report for the available evidence.'); return; }
    videos.forEach(video => {
      const card = node('article', 'video-card');
      const id = words(video.video_id || video.id);
      const verified = video.verified === true || video.verified_id === true || video.metadata_verified === true;
      if (verified && /^[A-Za-z0-9_-]{11}$/.test(id)) {
        const imageLink = link('', video.url || `https://www.youtube.com/watch?v=${id}`), img = node('img');
        img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; img.alt = `YouTube thumbnail: ${video.title || id}`; img.loading = 'lazy'; img.width = 480; img.height = 270;
        img.addEventListener('error', () => imageLink.remove(), { once: true }); imageLink.append(img); card.append(imageLink);
      }
      const title = node('h3'); title.append(link(video.title || id || 'Video source', video.url)); card.append(title);
      const meta = [words(video.channel), words(video.published || video.upload_date), Number.isFinite(video.views) ? `${number(video.views)} views at collection` : ''].filter(Boolean).join(' / ');
      if (meta) card.append(node('div', 'video-meta', meta));
      addParagraph(card, video.evidence_type || video.type || video.access, 'video-evidence');
      if (video.summary) addParagraph(card, video.summary);
      else array(video.principles).forEach(item => addParagraph(card, item));
      addParagraph(card, video.takeaway || video.application);
      addParagraph(card, video.caveat || video.limitations, 'video-caveat');
      const timestamps = array(video.timestamps || video.timestamp_evidence);
      if (timestamps.length) {
        const detail = node('details', 'small-note'); detail.append(node('summary', '', 'Timestamped evidence'));
        const list = node('ul'); timestamps.forEach(item => { const stamp = item.timestamp || item.time; const li = node('li'); const parts = words(stamp).split(':').map(Number); const seconds = parts.reduce((sum, n) => sum * 60 + n, 0); const url = safeUrl(video.url); if (url && Number.isFinite(seconds)) { const timed = new URL(url); timed.searchParams.set('t', String(seconds)); li.append(link(stamp, timed.href)); } else li.append(node('span', '', stamp)); li.append(document.createTextNode(` ${words(item.claim || item.evidence || item.label || item.description)}`)); list.append(li); }); detail.append(list); card.append(detail);
      }
      $('video-list').append(card);
    });
  }
  function renderPrinciples() {
    const principles = array(data.principles); $('principle-list').replaceChildren();
    if (!principles.length) { note('principle-list', 'The applied principles have not been supplied. The decision library records the available recommendations.'); return; }
    principles.forEach(item => {
      const article = node('article'); article.append(node('h3', '', item.title || item.principle || textOf(item))); addParagraph(article, item.description || item.rationale || item.summary);
      const detail = node('details', 'principle-detail'); detail.append(node('summary', '', 'Applications, question and test'));
      fieldSection(detail, 'Creator teaching', item.creator_teaching); fieldSection(detail, 'Our adaptation', item.our_adaptation);
      const apps = node('div', 'record-section record-grid'); Object.entries(labels).forEach(([key, label]) => { if (!item[key]) return; const application = node('div'); application.append(node('h4', '', label), node('p', '', textOf(item[key]))); apps.append(application); }); if (apps.childElementCount) detail.append(apps);
      fieldSection(detail, 'The question to ask', item.question); fieldSection(detail, 'A test you can run', item.application || item.test); fieldSection(detail, 'The trap', item.trap);
      if (array(item.evidence).length) evidenceList(detail, item.evidence);
      else if (array(item.source_urls).length) { const list = node('ul', 'record-evidence record-section'); item.source_urls.forEach((url, index) => { const li = node('li'); li.append(link(item.source_video_ids?.[index] ? `Original video ${item.source_video_ids[index]}` : 'Original source', url)); list.append(li); }); detail.append(list); }
      addParagraph(detail, item.evidence_status, 'small-note'); if (array(item.decision_ids).length) addParagraph(detail, `Related decisions: ${item.decision_ids.join(', ')}`, 'small-note'); article.append(detail); $('principle-list').append(article);
    });
  }
  const humanLabel = value => words(value).replace(/_/g, ' ').replace(/^./, letter => letter.toUpperCase());
  function renderStrategy() {
    const detail = data.roadmap_detail || {};
    if (array(detail.portfolio).length) {
      const routes = $('portfolio-routes'); routes.append(node('h3', '', 'Choose a commercial route'));
      addParagraph(routes, 'These are alternative paths. Use the route that fits your objective and access, then resolve its first gate before starting another business.', 'small-note');
      detail.portfolio.forEach(route => { const row = node('article', 'portfolio-route'); row.append(node('h4', '', humanLabel(route.route)), node('span', 'route-verdict', humanLabel(route.verdict))); addParagraph(row, route.objective); addParagraph(row, route.condition, 'route-condition'); routes.append(row); });
    }
    const budget = detail.budget;
    if (budget) {
      const panel = $('funding-plan'); panel.append(node('h3', '', 'One shared funding limit'));
      if (Number.isFinite(budget.hypothetical_first_round_cash_ceiling)) panel.append(node('p', 'funding-amount', money(budget.hypothetical_first_round_cash_ceiling)));
      addParagraph(panel, 'Hypothetical first-round cash ceiling, not permission to spend. Alternative routes share this limit. Protected operating float is cash held aside, not an expense.', 'small-note'); addParagraph(panel, budget.scope);
      if (array(budget.allocations).length) {
        const figure = node('figure', 'budget-chart'), bar = node('div', 'budget-bar');
        bar.setAttribute('aria-hidden', 'true');
        budget.allocations.forEach((allocation, index) => { const segment = node('span', `budget-segment segment-${index}`); segment.style.flexGrow = Math.max(0, allocation.ceiling || 0); segment.title = `${humanLabel(allocation.name)}: ${money(allocation.ceiling || 0)}`; bar.append(segment); });
        figure.append(bar, node('figcaption', '', 'Each segment is proportional to its allocation below. The dark green half is working and refund cash held aside; it is not a marketing budget.'));
        panel.append(figure);
      }
      if (array(budget.allocations).length) { const list = node('dl', 'funding-allocations'); budget.allocations.forEach(allocation => { const row = node('div'); row.append(node('dt', '', humanLabel(allocation.name)), node('dd', '', Number.isFinite(allocation.ceiling) ? money(allocation.ceiling) : textOf(allocation.ceiling))); addParagraph(row, allocation.release); list.append(row); }); panel.append(list); }
      addParagraph(panel, budget.zero_sales, 'funding-loss'); addParagraph(panel, budget.service_success_reallocation, 'small-note');
    }
    const concurrency = detail.concurrency;
    if (concurrency) { const panel = $('funding-plan'); const limit = node('div', 'concurrency-note'); limit.append(node('h4', '', 'Limit work in progress')); const settings = []; if (Number.isFinite(concurrency.commercial_experiments)) settings.push(`${concurrency.commercial_experiments} active commercial experiment`); if (Number.isFinite(concurrency.supporting_checks)) settings.push(`${concurrency.supporting_checks} supporting check`); if (Number.isFinite(concurrency.supporting_check_hours_cap)) settings.push(`${concurrency.supporting_check_hours_cap} hours maximum for that check`); addParagraph(limit, settings.join('; ') + '.'); addParagraph(limit, concurrency.rule); panel.append(limit); }
    const work = array(detail.shared_work_products);
    if (work.length) {
      const panel = node('details', 'shared-work'); panel.append(node('summary', '', 'Reuse the same work across related decisions'));
      addParagraph(panel, 'These decisions share evidence or an experiment. Combine the work and count its spend once; the full decision records remain available for review.', 'small-note');
      work.forEach(group => { const row = node('div', 'record-section'); row.append(node('h4', '', group.title || group.name || (group.owner ? `Shared work led by ${group.owner}` : humanLabel(group.product || group.work_product || group.id)))); addParagraph(row, group.description || group.artifact || group.action || group.purpose || group.deliverable); const ids = array(group.decision_ids || group.ids || group.members); if (ids.length) addParagraph(row, `Related decisions: ${ids.join(', ')}`, 'small-note'); if (group.canonical_id || group.owner) addParagraph(row, `Shared test: ${group.canonical_id || group.owner}`, 'small-note'); panel.append(row); }); $('funding-plan').append(panel);
    }
    array(detail.interpretation_rules).forEach(rule => addParagraph($('methodology-extra'), rule));
  }
  function renderRoadmap() {
    const stages = array(data.roadmap?.stages || data.roadmap); $('stage-flow').replaceChildren();
    if (!stages.length) { const empty = node('li', 'data-status', 'The experiment sequence has not been supplied. Use decision dependencies to identify the next test.'); empty.dataset.stage = '?'; $('stage-flow').append(empty); return; }
    let branch = '', branchIndex = 0;
    stages.forEach((stage, index) => {
      const nextBranch = /^STRAT-R/.test(stage.id) ? 'Optional clothing route' : /^STRAT-P/.test(stage.id) ? 'Other physical product admission' : 'Merchant route and portfolio choice';
      if (stage.id && nextBranch !== branch) { branch = nextBranch; branchIndex = 0; const divider = node('li', 'stage-branch-note'); divider.append(node('h3', '', branch)); if (branch !== 'Merchant route and portfolio choice') addParagraph(divider, 'An alternative commercial path. Start it only when the main experiment is paused or complete, or when you choose this route first.'); $('stage-flow').append(divider); }
      branchIndex++; const li = node('li'); li.dataset.stage = String(branchIndex); li.append(node('h3', '', humanLabel(stage.title || stage.name || stage.stage) || `Stage ${index + 1}`)); addParagraph(li, stage.action || stage.description); addParagraph(li, stage.gate || stage.pass_rule || stage.success || stage.continue, 'stage-gate'); if (stage.stop_rule || stage.stop) addParagraph(li, `Stop or reconsider: ${textOf(stage.stop_rule || stage.stop)}`, 'stage-stop'); if (stage.cost_note || stage.ceiling || stage.spend_ceiling || Number.isFinite(stage.cash_cap)) addParagraph(li, `Spend boundary: ${Number.isFinite(stage.cash_cap) ? money(stage.cash_cap) : textOf(stage.cost_note || stage.ceiling || stage.spend_ceiling)}`, 'stage-stop'); if (stage.window) addParagraph(li, humanLabel(stage.window), 'stage-ids'); if (array(stage.depends_on).length) addParagraph(li, `Depends on: ${stage.depends_on.join(', ')}`, 'stage-ids'); if (array(stage.decision_ids).length) addParagraph(li, `Related decisions: ${stage.decision_ids.join(', ')}`, 'stage-ids'); $('stage-flow').append(li);
    });
  }
  function renderDecision(decision, index) {
    const review = reviewOf(decision), priority = priorityOf(decision);
    const record = node('details', 'decision-record'); record.id = `decision-${index}`; record.dataset.id = decision.id;
    const summary = node('summary'), heading = node('div', 'decision-heading'), tags = node('div', 'decision-tags');
    tags.append(node('span', 'priority-tag ' + priority, priority.charAt(0).toUpperCase() + priority.slice(1)), node('span', '', decision.id), node('span', '', decision.area));
    if (review.verdict) tags.append(node('span', '', `Review: ${review.verdict}`));
    heading.append(tags, node('h3', '', decision.question || finalRecommendation(decision)), node('p', 'decision-preview', finalRecommendation(decision))); summary.append(heading); record.append(summary);
    const body = node('div', 'decision-body'), selectLabel = node('label', 'decision-select'), checkbox = node('input'); checkbox.type = 'checkbox'; checkbox.checked = selected.has(decision.id); checkbox.setAttribute('aria-label', `Add ${decision.id} to my shortlist`);
    selectLabel.append(checkbox, document.createTextNode('Add to my working shortlist')); body.append(selectLabel);
    checkbox.addEventListener('change', () => { if (checkbox.checked) selected.add(decision.id); else selected.delete(decision.id); saveSelected(); filterDecisions(); });
    if (decision.duplicate_of) {
      const duplicate = node('p', 'duplicate-note'); duplicate.append(document.createTextNode('Shared test: '));
      const canonicalIndex = decisions.findIndex(item => item.id === decision.duplicate_of);
      if (canonicalIndex >= 0) { const anchor = node('a', '', decision.duplicate_of); anchor.href = `#decision-${canonicalIndex}`; anchor.addEventListener('click', () => { $('decision-filters').reset(); filterDecisions(); records[canonicalIndex].open = true; }); duplicate.append(anchor); }
      else duplicate.append(document.createTextNode(decision.duplicate_of));
      duplicate.append(document.createTextNode('; not an extra spend. Use the canonical decision for the combined experiment.')); body.append(duplicate);
    }
    fieldSection(body, 'Recommendation', finalRecommendation(decision));
    if (finalRecommendation(decision) !== decision.decision) fieldSection(body, 'Original recommendation', decision.decision);
    fieldSection(body, 'Why this decision', decision.rationale);
    if (array(decision.alternatives).length) { const section = node('div', 'record-section'); section.append(node('h4', '', 'Alternatives considered')); const list = node('ul'); decision.alternatives.forEach(item => list.append(node('li', '', textOf(item)))); section.append(list); body.append(section); }
    const applications = node('div', 'record-section'); applications.append(node('h4', '', 'Apply it to the business')); const grid = node('div', 'record-grid');
    Object.entries(labels).forEach(([key, title]) => { if (!textOf(decision.applications?.[key])) return; const application = node('div'); application.dataset.business = key; application.append(node('h4', '', title), node('p', '', textOf(decision.applications[key]))); grid.append(application); }); applications.append(grid); body.append(applications);
    const experiment = decision.experiment || {}, experimentSection = node('div', 'record-section'); experimentSection.append(node('h4', '', 'The bounded experiment')); const fields = node('dl', 'experiment-fields');
    [['action', 'Action'], ['metric', 'Measure'], ['guardrail', 'Guardrail'], ['cost_note', 'Cost / spend ceiling'], ['stop_rule', 'Stop rule']].forEach(([key, label]) => { if (textOf(experiment[key])) fields.append(node('dt', '', label), node('dd', '', textOf(experiment[key]))); }); experimentSection.append(fields); body.append(experimentSection);
    const reviewBlock = node('div', `review-block ${review.verdict === 'reject' ? 'reject' : ''}`); reviewBlock.append(node('h4', '', review.verdict ? `Critical review: ${review.verdict}` : 'Critical review pending'));
    addParagraph(reviewBlock, review.reason || review.rationale || (review.verdict ? '' : 'No critical review is supplied for this record. Treat the original recommendation as provisional.'));
    if (Array.isArray(review.changes)) review.changes.forEach(item => addParagraph(reviewBlock, item, 'review-change')); else addParagraph(reviewBlock, review.changes, 'review-change');
    if (review.final_priority) addParagraph(reviewBlock, `Final priority: ${review.final_priority}.`);
    if (review.spend_ceiling) addParagraph(reviewBlock, `Review spend ceiling: ${textOf(review.spend_ceiling)}.`);
    body.append(reviewBlock); fieldSection(body, 'What remains uncertain', decision.uncertainty);
    if (array(decision.evidence).length) { const section = node('div', 'record-section'); section.append(node('h4', '', 'Evidence and its level')); evidenceList(section, decision.evidence); body.append(section); }
    const foot = node('div', 'decision-foot'); if (decision.confidence) foot.append(node('span', '', `Confidence: ${decision.confidence}`)); if (decision.reversibility) foot.append(node('span', '', `Reversibility: ${decision.reversibility}`)); if (array(decision.depends_on).length) foot.append(node('span', '', `Depends on: ${decision.depends_on.join(', ')}`)); body.append(foot); record.append(body); return record;
  }
  function filterDecisions() {
    const query = $('decision-search').value.trim().toLowerCase(), area = $('decision-area').value, priority = $('decision-priority').value, business = $('decision-business').value, shortlistOnly = $('decision-shortlist').checked;
    let visible = 0;
    decisions.forEach((decision, index) => { const record = records[index]; const matches = (!query || JSON.stringify(decision).toLowerCase().includes(query)) && (area === 'all' || domainOf(decision) === area) && (priority === 'all' || priorityOf(decision) === priority) && (business === 'all' || !!textOf(decision.applications?.[business])) && (!shortlistOnly || selected.has(decision.id)); record.hidden = !matches; if (matches) visible++; record.querySelectorAll('[data-business]').forEach(application => { application.hidden = business !== 'all' && application.dataset.business !== business; application.classList.toggle('application-active', business !== 'all'); }); });
    $('decision-status').textContent = decisions.length ? `${number(visible)} of ${number(decisions.length)} decisions shown. ${number(selected.size)} shortlisted.${visible ? '' : ' No matches. Try a broader search or reset the filters.'}` : 'No decision records are available. Read the full Markdown report for the current evidence.';
    $('export-decisions').disabled = !selected.size;
  }
  function renderDecisions() {
    decisions = array(data.decisions).filter(item => item && typeof item === 'object' && typeof item.id === 'string');
    const ids = new Set(decisions.map(item => item.id)); selected = new Set([...selected].filter(id => ids.has(id)));
    [...new Set(decisions.map(domainOf).filter(Boolean))].sort().forEach(area => { const option = node('option', '', domainLabels[area] || humanLabel(area)); option.value = area; $('decision-area').append(option); });
    priorities.forEach(priority => { const count = decisions.filter(item => priorityOf(item) === priority).length, item = node('span'); item.append(node('b', '', number(count)), document.createTextNode(priority.charAt(0).toUpperCase() + priority.slice(1))); $('priority-counts').append(item); });
    const missing = decisions.filter(item => priorityOf(item) === 'unassigned').length; if (missing) { const item = node('span'); item.append(node('b', '', number(missing)), document.createTextNode('Unassigned')); $('priority-counts').append(item); }
    const fragment = document.createDocumentFragment(); records = decisions.map(renderDecision); records.forEach(record => fragment.append(record)); $('decision-list').append(fragment); filterDecisions();
  }
  function renderSources() {
    const sources = array(data.sources); $('source-count').textContent = sources.length ? `${number(sources.length)} entries` : 'No entries supplied';
    if (!sources.length) { $('source-list').append(node('li', '', 'The source register has not been supplied. See the full Markdown report.')); return; }
    sources.forEach(source => { const li = node('li'); li.append(link(source.label || source.title || source.url, source.url)); const notes = [source.type, source.note, source.accessed ? `Accessed ${source.accessed}` : ''].filter(Boolean).join('. '); if (notes) li.append(node('small', '', notes)); $('source-list').append(li); });
  }
  const defaultProducts = { crew: { label: 'Changer crew', price: 72, production: 31.53, shipping: 3.78, label_cost: 0 }, tee: { label: 'Freestyler tee', price: 45, production: 19.69, shipping: 2.88, label_cost: 1.51 } };
  const defaultInputs = { fee_percent: 2, fee_fixed: 0.25, refund_percent: 8, replacement_percent: 2, labor_per_order: 2.5, cac: 10, fixed_costs: 300 };
  function economicConfig() {
    const supplied = data?.economics || {}, sources = supplied.source_inputs || {}, assumptions = supplied.assumptions || {};
    const input = key => sources[key]?.value;
    const products = { crew: { ...defaultProducts.crew }, tee: { ...defaultProducts.tee } };
    const sourceKeys = { crew: ['changer_crew', 'changer_crew_product_and_one_decoration_gbp_incl_vat', 'inkthreadable_uk_shipping_crew_101_699g_gbp_incl_vat'], tee: ['freestyler_tee', 'freestyler_tee_product_and_one_decoration_gbp_incl_vat', 'inkthreadable_uk_shipping_tee_0_100g_gbp_incl_vat'] };
    Object.entries(sourceKeys).forEach(([key, [priceKey, productionKey, shippingKey]]) => { const p = products[key]; if (Number.isFinite(assumptions.physical_product_prices_gbp_delivered?.[priceKey])) p.price = assumptions.physical_product_prices_gbp_delivered[priceKey]; if (Number.isFinite(input(productionKey))) p.production = input(productionKey); if (Number.isFinite(input(shippingKey))) p.shipping = input(shippingKey); Object.assign(p, supplied.products?.[key] || {}); });
    if (Number.isFinite(input('tee_printed_neck_label_gbp_incl_vat'))) products.tee.label_cost = input('tee_printed_neck_label_gbp_incl_vat');
    const defaults = { ...defaultInputs, ...(supplied.defaults || {}) }; if (Number.isFinite(assumptions.full_refund_probability)) defaults.refund_percent = assumptions.full_refund_probability * 100; if (Number.isFinite(assumptions.replacement_probability_separate)) defaults.replacement_percent = assumptions.replacement_probability_separate * 100;
    return { products, defaults };
  }
  const economicFields = { price: 'model-price', production: 'model-production', shipping: 'model-shipping', extras: 'model-extras', fee_percent: 'model-fee-percent', fee_fixed: 'model-fee-fixed', refund_percent: 'model-refund', replacement_percent: 'model-replacement', labor_per_order: 'model-labor', cac: 'model-cac', fixed_costs: 'model-fixed' };
  const config = economicConfig();
  function resetEconomics() { const product = config.products[$('model-product').value] || config.products.crew; const values = { ...config.defaults, ...product, extras: product.label_cost ?? product.extras ?? 0 }; Object.entries(economicFields).forEach(([key, id]) => { $(id).value = String(values[key] ?? 0); }); calculate(); }
  function calculate() {
    const values = {}; let valid = true;
    Object.entries(economicFields).forEach(([key, id]) => { const input = $(id); const value = Number(input.value); const isPercent = key.endsWith('_percent'); const ok = input.value.trim() !== '' && Number.isFinite(value) && value >= 0 && (!isPercent || value <= 100); input.setAttribute('aria-invalid', String(!ok)); values[key] = value; if (!ok) valid = false; });
    const status = $('economics-status'); status.classList.toggle('is-error', !valid);
    if (!valid) { $('result-contribution').textContent = 'Check inputs'; $('result-break-even').textContent = 'Check inputs'; $('result-cac-ceiling').textContent = 'Check inputs'; status.textContent = 'Enter non-negative numbers; percentage scenarios must be between 0 and 100.'; $('cost-bars').replaceChildren(); return; }
    const fulfillment = values.production + values.shipping + values.extras, fees = values.price * values.fee_percent / 100 + values.fee_fixed, refunds = values.price * values.refund_percent / 100, replacements = fulfillment * values.replacement_percent / 100;
    const beforeCAC = values.price - fulfillment - fees - refunds - replacements - values.labor_per_order, contribution = beforeCAC - values.cac;
    $('result-contribution').textContent = money(contribution); $('result-contribution').className = contribution < 0 ? 'is-negative' : '';
    $('result-break-even').textContent = contribution > 0 ? number(Math.ceil(values.fixed_costs / contribution)) : values.fixed_costs === 0 ? 'No fixed cost entered' : 'Cannot cover fixed costs'; $('result-break-even').className = contribution <= 0 ? 'is-message' : '';
    $('result-cac-ceiling').textContent = beforeCAC > 0 ? money(beforeCAC) : 'No acquisition room'; $('result-cac-ceiling').className = beforeCAC <= 0 ? 'is-message' : '';
    status.textContent = contribution > 0 ? 'Positive expected contribution in this scenario. Customer demand and actual costs still need evidence.' : 'This scenario leaves no positive contribution to fund fixed costs. Change the offer or cost assumptions before funding acquisition.';
    const bars = [['Customer payment', values.price, '#202723'], ['Production', values.production, '#dd845d'], ['Shipping', values.shipping, '#e7b78e'], ['Extras / label', values.extras, '#c7b891'], ['Payment fees', fees, '#b9c8c0'], ['Expected refunds', refunds, '#d89573'], ['Replacements', replacements, '#b8aa8b'], ['Labour allowance', values.labor_per_order, '#8b9a83'], ['Acquisition cash', values.cac, '#88a8af'], ['Contribution', contribution, contribution < 0 ? '#a53b25' : '#28636a']];
    const scale = Math.max(1, ...bars.map(([, amount]) => Math.abs(amount))); $('cost-bars').replaceChildren(); bars.forEach(([label, amount, color]) => { const row = node('div', 'cost-row'), track = node('span', 'track'), fill = node('i'); fill.style.width = `${Math.abs(amount) / scale * 100}%`; fill.style.setProperty('--bar-color', color); track.append(fill); row.append(node('span', '', label), track, node('span', '', money(amount))); $('cost-bars').append(row); });
    $('cost-caption').textContent = `Bar scale: ${money(scale)}. Negative contribution is shown in red. Refund and replacement amounts change when price or fulfilment costs change.`;
  }
  $('economics-form').addEventListener('submit', event => event.preventDefault()); $('economics-form').addEventListener('input', event => { if (event.target.id !== 'model-product') calculate(); }); $('model-product').addEventListener('change', resetEconomics); $('reset-economics').addEventListener('click', resetEconomics); resetEconomics();
  $('decision-filters').addEventListener('submit', event => event.preventDefault()); $('decision-filters').addEventListener('input', filterDecisions); $('decision-filters').addEventListener('change', filterDecisions);
  $('reset-filters').addEventListener('click', () => { $('decision-filters').reset(); filterDecisions(); });
  $('export-decisions').addEventListener('click', () => { const payload = { report: 'Small decisions, real profit', report_date: data?.meta?.date || '2026-09-30', exported_at: new Date().toISOString(), note: 'User shortlist; selection does not endorse or alter the research.', decisions: decisions.filter(item => selected.has(item.id)) }; const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' }), url = URL.createObjectURL(blob), anchor = node('a'); anchor.href = url; anchor.download = 'profit-playbook-shortlist.json'; document.body.append(anchor); anchor.click(); anchor.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000); });
  let printState = [];
  function preparePrint() { if (printState.length) return; printState = [...document.querySelectorAll('details')].map(detail => ({ detail, open: detail.open, hidden: detail.hidden })); printState.forEach(({ detail }) => { detail.open = true; detail.hidden = false; }); document.querySelectorAll('[data-business]').forEach(application => { application.hidden = false; }); }
  function restorePrint() { printState.forEach(({ detail, open, hidden }) => { detail.open = open; detail.hidden = hidden; }); printState = []; filterDecisions(); }
  window.addEventListener('beforeprint', preparePrint); window.addEventListener('afterprint', restorePrint); $('print-report').addEventListener('click', () => { preparePrint(); window.print(); });
  if (!data || typeof data !== 'object') { ['channel-list', 'principle-list', 'stage-flow'].forEach(id => note(id, 'The research data could not be loaded. Reload this page or open the full Markdown report.')); $('decision-status').textContent = 'The research data could not be loaded. The assumptions calculator remains available; open the full Markdown report for the decisions.'; }
  else { try { renderOverview(); renderChannels(); renderVideos(); renderPrinciples(); renderStrategy(); renderRoadmap(); renderDecisions(); renderSources(); } catch (error) { $('decision-status').textContent = 'Some report data could not be displayed. Open the full Markdown report for complete records.'; console.error('Profit playbook rendering failed', error); } }
  if ('IntersectionObserver' in window) { const links = [...document.querySelectorAll('.chapter-rail nav a')], observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) links.forEach(anchor => anchor.classList.toggle('active', anchor.hash === '#' + entry.target.id)); }); }, { rootMargin: '-10% 0px -70% 0px' }); document.querySelectorAll('.chapter').forEach(section => observer.observe(section)); }
})();
