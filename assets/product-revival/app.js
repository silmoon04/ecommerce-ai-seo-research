/* The report displays research data; it does not generate source facts. */
(() => {
  'use strict';
  const data = window.REVIVAL_DATA || {};
  const $ = id => document.getElementById(id);
  const esc = value => String(value ?? '').replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]));
  const list = value => Array.isArray(value) ? value : value == null ? [] : [value];
  const label = key => String(key).replace(/_/g, ' ').replace(/\burl\b/gi, 'URL').replace(/\bcac\b/gi, 'CAC');
  const caseMetric = figure => {
    const unit = String(figure.unit || '');
    const value = typeof figure.value === 'number' ? new Intl.NumberFormat('en-GB', {maximumFractionDigits:2}).format(figure.value) : String(figure.value ?? '');
    const bound = /lower_bound_exclusive/.test(unit) ? '>' : /lower_bound/.test(unit) ? '≥' : '';
    if (/^USD/.test(unit)) return `${bound}$${value}${/per_day/.test(unit) ? '/day' : ''}`;
    if (/^GBP/.test(unit)) return `${bound}£${value}`;
    if (unit === 'ratio') return `${value}×`;
    if (unit === 'percent') return `${value}%`;
    return `${bound}${value} ${unit.replace(/_lower_bound(?:_exclusive)?/, '').replace(/_/g, ' ')}`;
  };
  const isObject = value => value && typeof value === 'object' && !Array.isArray(value);
  const safeURL = value => {
    if (typeof value !== 'string') return '';
    try { const parsed = new URL(value, location.href); return ['https:', 'http:'].includes(parsed.protocol) ? parsed.href : ''; } catch { return ''; }
  };
  const link = (url, text = 'Open source') => safeURL(url) ? `<a class="source-link" href="${esc(safeURL(url))}" target="_blank" rel="noopener noreferrer">${esc(text)}</a>` : '';
  const textValue = value => typeof value === 'string' || typeof value === 'number' ? String(value) : '';
  const displayTitle = (value, fallback) => isObject(value) ? textValue(value.name || value.title || value.label || value.brand || value.decision || value.hook) || fallback : textValue(value) || fallback;
  const has = value => value !== undefined && value !== null && value !== '' && (!Array.isArray(value) || value.length > 0);
  const valueHTML = (value, depth = 0) => {
    if (value == null) return '<span class="muted">Not recorded</span>';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (typeof value === 'number') return esc(value);
    if (typeof value === 'string') {
      if (/^https?:\/\//i.test(value.trim())) return link(value.trim(), 'Open source');
      return esc(value).replace(/\n\n/g, '<br><br>').replace(/\n/g, '<br>');
    }
    if (depth > 8) return '<span class="muted">See the linked source for further detail.</span>';
    if (Array.isArray(value)) return value.length ? `<ul>${value.map(item => `<li>${valueHTML(item, depth + 1)}</li>`).join('')}</ul>` : '<span class="muted">Not recorded</span>';
    if (isObject(value)) return `<dl class="object-fields">${Object.entries(value).filter(([, entry]) => has(entry)).map(([key, entry]) => `<div><dt>${esc(label(key))}</dt><dd>${valueHTML(entry, depth + 1)}</dd></div>`).join('')}</dl>`;
    return esc(String(value));
  };
  const block = (title, value) => has(value) ? `<div class="detail-block"><h4>${esc(title)}</h4>${typeof value === 'string' ? `<p>${valueHTML(value)}</p>` : valueHTML(value)}</div>` : '';
  const fields = (object, excluded = []) => isObject(object) ? Object.entries(object).filter(([key, value]) => !excluded.includes(key) && has(value)).map(([key, value]) => block(label(key), value)).join('') : valueHTML(object);
  const empty = message => `<p class="empty-state">${esc(message)}</p>`;
  const searchable = value => JSON.stringify(value || '').toLocaleLowerCase('en-GB');
  const badge = (value, type = '') => has(value) ? `<span class="badge ${esc(type)}">${esc(textValue(value) || displayTitle(value, 'Evidence'))}</span>` : '';
  const evidenceType = value => /reported|creator|self|case|revenue|metadata/i.test(textValue(value)) ? 'reported' : /hypothesis|test|proposed|inference/i.test(textValue(value)) ? 'hypothesis' : /missing|unknown|gap|unverified/i.test(textValue(value)) ? 'missing' : 'source';

  const imageFigure = (image, product, eager = false) => {
    const item = typeof image === 'string' ? {url:image} : image || {};
    const url = safeURL(item.url || item.image_url || item.src);
    const source = item.source_url || item.source || item.url;
    const title = textValue(product.name || product.title) || 'Product reference';
    return `<figure class="reference-figure">${url ? `<a class="reference-image" href="${esc(safeURL(source) || url)}" target="_blank" rel="noopener noreferrer"><img src="${esc(url)}" alt="${esc(item.alt || `${title}, source product reference`)}" loading="${eager ? 'eager' : 'lazy'}" decoding="async" referrerpolicy="no-referrer"><span class="image-fallback" hidden>Source image unavailable. Open the product reference.</span></a>` : '<div class="image-fallback">No source photograph recorded</div>'}<figcaption><strong>${esc(title)}</strong>${link(source, 'Source product photograph')}<small>${esc((item.rights === 'reference_only' ? 'Reference photograph. Advertising reuse rights are not established.' : textValue(item.rights)) || 'Reference photograph. Advertising reuse rights are not established.')}</small></figcaption></figure>`;
  };

  const youtubeID = url => {
    try { const parsed = new URL(url); const host = parsed.hostname.replace(/^www\./, ''); if (host === 'youtu.be') return /^[\w-]{11}$/.test(parsed.pathname.slice(1)) ? parsed.pathname.slice(1) : ''; if (['youtube.com','m.youtube.com','youtube-nocookie.com'].includes(host)) { const id = parsed.searchParams.get('v') || parsed.pathname.split('/').filter(Boolean)[1]; return /^[\w-]{11}$/.test(id || '') ? id : ''; } } catch { /* Source URL is not a YouTube URL. */ } return '';
  };
  const nativeVideoURL = url => safeURL(url) && /\.(mp4|mov|webm)(?:$|[?#])/i.test(url) ? safeURL(url) : '';
  const isVideoSource = value => isObject(value) && Boolean(youtubeID(value.url || value.source_url || value.video_url || value.youtube_url) || nativeVideoURL(value.url || value.source_url || value.video_url || value.youtube_url) || /(?:tiktok\.com\/.*\/video\/|vimeo\.com\/\d)/i.test(value.url || value.video_url || ''));
  const sourceHTML = source => `<article class="source-reference"><h4>${esc(displayTitle(source, 'Primary source'))}</h4>${link(source.url || source.source_url, 'Open original source')}${fields(source, ['id','name','title','label','url','source_url'])}</article>`;
  const videoHTML = (video, fallback = 'Source video') => {
    if (!isObject(video)) return `<div class="video-card">${valueHTML(video)}</div>`;
    const url = video.url || video.source_url || video.video_url || video.youtube_url;
    const id = youtubeID(url);
    const native = nativeVideoURL(url);
    const title = displayTitle(video, fallback);
    const poster = safeURL(video.poster || video.poster_url || video.thumbnail);
    return `<article class="video-card"><div class="video-source">${id || poster ? `<img class="video-poster" src="${esc(poster || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}" alt="Source video thumbnail: ${esc(title)}" loading="lazy" referrerpolicy="no-referrer">` : '<div class="visual-empty">Campaign video at the original source</div>'}<div><h3>${esc(title)}</h3>${badge(video.evidence_type || video.evidence_level, evidenceType(video.evidence_type || video.evidence_level))}${has(video.metrics) ? block('Published figures, source scope', video.metrics) : ''}<div class="video-actions">${link(url, 'Watch original video')}${id || native ? `<button type="button" class="load-video" data-video-id="${esc(id)}" data-media-url="${esc(native)}" data-video-title="${esc(title)}" aria-expanded="false">${id ? 'Load YouTube player' : 'Load source video'}</button>` : ''}</div>${id ? '<p class="small-note">Loading connects to YouTube. The source link works without loading the player.</p>' : native ? '<p class="small-note">Loads the publisher’s original media only when chosen. No autoplay. Research viewing does not establish editing or advertising reuse rights.</p>' : ''}</div></div>${fields(video, ['id','title','name','label','url','source_url','video_url','youtube_url','metrics','evidence_type','evidence_level','poster','poster_url','thumbnail'])}<div class="video-player" hidden></div></article>`;
  };

  const products = list(data.products).filter(isObject);
  const decisions = list(data.decisions).filter(isObject);
  const concepts = list(data.creative_concepts);
  if (data.checked_date) {
    $('checked-date').textContent = textValue(data.checked_date);
    if (/^\d{4}-\d{2}-\d{2}$/.test(data.checked_date)) {
      $('checked-date').dateTime = data.checked_date;
      const checked = new Date(`${data.checked_date}T12:00:00`);
      if (!Number.isNaN(checked.getTime())) $('checked-date').textContent = checked.toLocaleDateString('en-GB', {day:'numeric', month:'long', year:'numeric'});
    }
  } else $('checked-date').textContent = 'Research date not recorded';
  $('summary-content').innerHTML = has(data.summary) ? Array.isArray(data.summary) ? data.summary.map(item => typeof item === 'string' ? `<p>${valueHTML(item)}</p>` : `<div class="detail-block">${valueHTML(item)}</div>`).join('') : typeof data.summary === 'string' ? `<p>${valueHTML(data.summary)}</p>` : fields(data.summary) : empty('The research summary has not loaded. Open the static report below.');
  const photographed = products.filter(product => list(product.images).some(image => safeURL(typeof image === 'string' ? image : image?.url || image?.src)));
  const heroProducts = ['heatless-curl-comfort-kit','adjustable-blackout-sleep-mask','beginner-crochet-gift-kit'].map(id => photographed.find(product => product.id === id)).filter(Boolean);
  $('hero-gallery').innerHTML = heroProducts.length ? heroProducts.map(product => imageFigure(list(product.images)[0], product, true)).join('') : empty('No product photographs are recorded. Product source links remain available below.');
  $('coverage').innerHTML = [
    [products.length, 'Product candidates in this research'],
    [products.filter(product => has(product.price_evidence)).length, 'Candidates with recorded source price evidence'],
    [products.filter(product => has(product.supplier_evidence)).length, 'Candidates with recorded supplier references']
  ].map(([number, description]) => `<div><strong>${number}</strong><span>${esc(description)}</span></div>`).join('');
  const trendImages = {'heatless curls':'heatless','sleep mask':'mask','pilates socks':'socks','crochet kit':'crochet'};
  $('trend-panels').innerHTML = list(data.trends?.summary).map(row => `<figure class="trend-panel"><h3>${esc(row.term)}</h3><img src="assets/product-revival/uk-search-${trendImages[row.term]}.png" alt="Weekly UK relative search interest for ${esc(row.term)} on a shared zero to one hundred scale" width="600" height="350" loading="lazy"><figcaption>Recent 13 complete weeks: <strong>${esc(row.recent_13_complete_week_mean)}</strong>. Previous 13: <strong>${esc(row.previous_13_complete_week_mean)}</strong>. These are mean index points, not searches or buyers.</figcaption></figure>`).join('');

  const populateSelect = (element, values) => [...new Set(values.map(textValue).filter(Boolean))].forEach(value => { const option = document.createElement('option'); option.value = value; option.textContent = value; element.append(option); });
  populateSelect($('product-priority'), products.map(product => product.priority));
  populateSelect($('decision-stage'), decisions.map(decision => decision.stage));
  const renderProduct = product => {
    const images = list(product.images);
    const known = ['id','name','title','buyer','angle','status','priority','images','videos','verdict','next_test','price_evidence','signals','supplier_evidence','cost_gaps','quality_checks','risks'];
    return `<article class="product" id="product-${esc(String(product.id || product.name).replace(/[^a-zA-Z0-9_-]/g,'-'))}">${images.length ? imageFigure(images[0], product) : '<div class="image-fallback">No source photograph recorded for this candidate.</div>'}<div class="product-top"><h3>${esc(displayTitle(product, 'Product candidate'))}</h3>${badge(product.priority, 'hypothesis')}</div>${has(product.buyer) ? `<div class="buyer">${block('Intended buyer', product.buyer)}</div>` : ''}${has(product.angle) ? `<div class="angle">${valueHTML(product.angle)}</div>` : ''}${has(product.status) ? `<p style="margin-top:13px">${badge(product.status, 'missing')}</p>` : ''}${has(product.verdict) ? `<div class="verdict"><strong>Working verdict</strong><div>${valueHTML(product.verdict)}</div></div>` : ''}${has(product.next_test) ? `<div class="next-test"><strong>Next evidence</strong><div>${valueHTML(product.next_test)}</div></div>` : ''}<details><summary>Open evidence, costs and quality checks</summary><div class="detail-content">${block('Source prices and scope', product.price_evidence)}${block('Recorded signals, with their limits', product.signals)}${block('Supplier evidence', product.supplier_evidence)}${block('Costs still to verify', product.cost_gaps)}${block('Physical quality checks', product.quality_checks)}${block('Risks and objections', product.risks)}${images.length > 1 ? `<div class="extra-images">${images.slice(1).map(image => imageFigure(image, product)).join('')}</div>` : ''}${list(product.videos).map(video => videoHTML(video, 'Product source video')).join('')}${fields(product, known)}</div></details></article>`;
  };
  const filterProducts = () => {
    const query = $('product-search').value.trim().toLocaleLowerCase('en-GB');
    const priority = $('product-priority').value;
    const selected = products.filter(product => (!query || searchable(product).includes(query)) && (!priority || textValue(product.priority) === priority));
    $('product-grid').innerHTML = selected.length ? selected.map(renderProduct).join('') : empty(products.length ? 'No product matches these filters. Clear the search or choose all priorities.' : 'The product evidence has not loaded. Open the static research report below.');
    $('product-status').textContent = `${selected.length} of ${products.length} product candidates shown. These are research candidates, not validated launches.`;
  };
  $('product-filters').addEventListener('submit', event => event.preventDefault());
  $('product-search').addEventListener('input', filterProducts);
  $('product-priority').addEventListener('change', filterProducts);
  $('reset-products').addEventListener('click', () => { $('product-filters').reset(); filterProducts(); });
  filterProducts();

  $('case-list').innerHTML = list(data.cases).map((item, index) => {
    if (!isObject(item)) return `<article class="case">${valueHTML(item)}</article>`;
    const title = displayTitle(item, `Source case ${index + 1}`);
    const images = has(item.images) ? list(item.images) : list(item.image_urls).map(url => ({url,source_url:item.url,rights:'Publisher campaign reference. Advertising reuse rights are not established.'}));
    const videos = has(item.videos) ? list(item.videos) : list(item.video_urls).map((url, videoIndex) => ({url,label:`${title} campaign reference ${videoIndex + 1}`,evidence_type:'Publisher campaign media; not our test result'}));
    const excluded = ['id','name','title','label','brand','product','evidence_type','evidence_level','what_it_supports','what_it_does_not_support','images','image_urls','videos','video_urls','url'];
    const highlights = list(item.figures).slice(0,3).map(figure => `<div><strong>${esc(label(figure.metric))}</strong><p>${esc(caseMetric(figure))}</p><small>${esc(textValue(figure.scope))}</small></div>`).join('');
    return `<article class="case"><div class="case-top"><div><h3>${esc(title)}</h3>${has(item.product) ? `<p class="case-scope">${esc(textValue(item.product))}</p>` : ''}</div>${badge(item.evidence_type || item.evidence_level || (/youtube\.com/.test(item.url || '') ? 'Creator-reported case' : 'Publisher-reported case'), 'reported')}</div><p class="small-note case-period">${esc(textValue(item.country))}. ${esc(textValue(item.period))}. Source date: ${esc(textValue(item.date))}. Profit unknown.</p>${images.length ? `<div class="case-media">${imageFigure(images[0], {name:title})}</div>` : ''}${highlights ? `<div class="legend-grid">${highlights}</div>` : ''}${videos.length ? videoHTML(videos[0], `${title} campaign video`) : ''}${block('What this case supports',item.what_it_supports)}${block('What it does not establish',item.what_it_does_not_support)}${link(item.url,'Read the original case')}<details><summary>Open published figures, scope and missing metrics</summary><div class="detail-content">${fields(item,excluded)}${images.length > 1 ? `<div class="extra-images">${images.slice(1).map(image => imageFigure(image,{name:title})).join('')}</div>` : ''}${videos.slice(1).map(video => videoHTML(video, `${title} campaign reference`)).join('')}</div></details></article>`;
  }).join('') || empty('No source cases have loaded.');
  const renderVideoSection = value => {
    if (Array.isArray(value)) return value.map(item => renderVideoSection(item)).join('');
    if (isVideoSource(value)) return videoHTML(value);
    if (isObject(value) && (value.url || value.source_url) && !isVideoSource(value)) return sourceHTML(value);
    if (isObject(value)) return Object.entries(value).filter(([,entry]) => has(entry)).map(([key, entry]) => {
      if (key === 'primary_sources') return `<details class="review-evidence"><summary>Primary source register</summary><div class="source-register">${list(entry).map(item => isObject(item) ? sourceHTML(item) : valueHTML(item)).join('')}</div></details>`;
      if (isVideoSource(entry)) return videoHTML(entry);
      if (Array.isArray(entry) && entry.some(isVideoSource)) return `<div class="detail-block"><h3>${esc(label(key))}</h3>${entry.map(item => isVideoSource(item) ? videoHTML(item) : isObject(item) && (item.url || item.source_url) ? sourceHTML(item) : valueHTML(item)).join('')}</div>`;
      if (['coverage','timestamp_claims','tool_workflow','prompt_review','schema_version'].includes(key)) return key === 'schema_version' ? '' : `<details class="review-evidence"><summary>${esc(label(key))}</summary><div class="detail-content">${valueHTML(entry)}</div></details>`;
      return block(label(key), entry);
    }).join('');
    return valueHTML(value);
  };
  $('video-content').innerHTML = has(data.video) ? renderVideoSection(data.video) : empty('The source video review has not loaded.');
  $('creative-status').textContent = `${concepts.length} creative concepts recorded. Each still needs an actual product, permitted assets and its own test.`;
  $('creative-list').innerHTML = concepts.map((concept, index) => {
    const title = displayTitle(concept, `Creative concept ${index + 1}`);
    const category = isObject(concept) ? textValue(concept.product || concept.product_id || concept.format || concept.angle) : '';
    return `<details class="creative"><summary><span><span class="creative-title">${esc(title)}</span>${category ? `<span class="creative-category">${esc(category)}</span>` : ''}</span></summary><div class="detail-content">${fields(concept, ['id','name','title','label'])}</div></details>`;
  }).join('') || empty('No creative concepts have loaded.');

  const renderDecision = decision => `<details class="decision"><summary><span class="decision-title">${esc(displayTitle(decision, 'Decision'))}</span>${badge(decision.stage, 'hypothesis')}</summary><div class="detail-content">${block('Working default', decision.default)}${block('Options', decision.options)}${block('Evidence and reasoning', decision.evidence)}${block('Measure', decision.metric)}${block('Next test', decision.next_test)}${block('Stop rule', decision.stop_rule)}${block('Can be assisted or automated', decision.automation)}${block('Needs a person or real-world check', decision.human_needed)}${fields(decision, ['id','name','title','label','decision','stage','default','options','evidence','metric','next_test','stop_rule','automation','human_needed'])}</div></details>`;
  const filterDecisions = () => {
    const query = $('decision-search').value.trim().toLocaleLowerCase('en-GB');
    const stage = $('decision-stage').value;
    const selected = decisions.filter(decision => (!query || searchable(decision).includes(query)) && (!stage || textValue(decision.stage) === stage));
    $('decision-list').innerHTML = selected.length ? selected.map(renderDecision).join('') : empty(decisions.length ? 'No decision matches these filters. Clear the search or choose all stages.' : 'The decision evidence has not loaded.');
    $('decision-status').textContent = `${selected.length} of ${decisions.length} decisions shown.`;
  };
  $('decision-filters').addEventListener('submit', event => event.preventDefault());
  $('decision-search').addEventListener('input', filterDecisions);
  $('decision-stage').addEventListener('change', filterDecisions);
  $('reset-decisions').addEventListener('click', () => { $('decision-filters').reset(); filterDecisions(); });
  filterDecisions();
  $('tool-content').innerHTML = has(data.tools) ? fields(data.tools) : '';
  $('review-content').innerHTML = has(data.review) ? `<div class="review-panel">${block('Working decision', data.review.overall_decision)}${block('Buyer hypothesis', data.review.audience_hypothesis)}${block('Check the audience overlap', data.review.audience_gate)}${Object.entries(data.review).filter(([key]) => !['overall_decision','audience_hypothesis','audience_gate','schema_version','status'].includes(key)).map(([key,value]) => `<details class="review-evidence"><summary>${esc(label(key))}</summary><div class="detail-content">${valueHTML(value)}</div></details>`).join('')}</div>` : empty('The critical review has not loaded.');

  document.addEventListener('error', event => {
    if (!(event.target instanceof HTMLImageElement)) return;
    const img = event.target;
    img.hidden = true;
    const fallback = img.parentElement?.querySelector('.image-fallback');
    if (fallback) fallback.hidden = false;
    if (img.classList.contains('video-poster')) { const replacement = document.createElement('div'); replacement.className = 'visual-empty'; replacement.textContent = 'Video thumbnail unavailable. Use the original source link.'; img.replaceWith(replacement); }
  }, true);
  document.addEventListener('click', event => {
    const button = event.target.closest('.load-video');
    if (!button) return;
    const player = button.closest('.video-card').querySelector('.video-player');
    if (!player.hidden) { player.replaceChildren(); player.hidden = true; button.textContent = button.dataset.videoId ? 'Load YouTube player' : 'Load source video'; button.setAttribute('aria-expanded','false'); return; }
    if (button.dataset.mediaUrl) {
      const video = document.createElement('video');
      video.controls = true;
      video.preload = 'none';
      video.playsInline = true;
      video.setAttribute('aria-label',button.dataset.videoTitle || 'Original campaign source video');
      video.src = button.dataset.mediaUrl;
      const fallback = document.createElement('p');
      fallback.textContent = 'Your browser cannot play this format. Use the original video link above.';
      video.append(fallback);
      video.addEventListener('error', () => { player.replaceChildren(); const note = document.createElement('p'); note.className='empty-state'; note.textContent='The publisher’s video could not be played here. Open the original video link above; format and external-host restrictions can prevent embedded playback.'; player.append(note); });
      player.replaceChildren(video); player.hidden = false;
      button.textContent = 'Close source video'; button.setAttribute('aria-expanded','true');
      return;
    }
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${button.dataset.videoId}`;
    iframe.title = button.dataset.videoTitle || 'Source YouTube video';
    iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    player.replaceChildren(iframe); player.hidden = false;
    button.textContent = 'Close YouTube player'; button.setAttribute('aria-expanded','true');
  });

  const money = value => new Intl.NumberFormat('en-GB', {style:'currency',currency:'GBP'}).format(value);
  const costKeys = ['revenue','tax','landed','package','fees','loss','minutes','hourly','acquisition','retained','fixed'];
  let scenario = 'blank';
  const result = (title, value, note, negative = false) => `<div${negative ? ' class="negative"' : ''}><dt>${esc(title)}</dt><dd>${esc(value)}</dd><small>${esc(note)}</small></div>`;
  const calculate = () => {
    const values = {};
    const missing = [];
    const invalid = [];
    costKeys.forEach(key => {
      const input = $(`cost-${key}`);
      const raw = input.value.trim();
      const amount = Number(raw);
      const isMissing = raw === '';
      const bad = !isMissing && (!Number.isFinite(amount) || amount < Number(input.min) || amount > Number(input.max) || input.validity.badInput);
      input.setAttribute('aria-invalid', String(bad));
      if (isMissing) missing.push(key); else if (bad) invalid.push(key); else values[key] = amount;
    });
    if (!missing.length && !invalid.length && values.tax > values.revenue) { invalid.push('tax'); $('cost-tax').setAttribute('aria-invalid','true'); }
    if (missing.length || invalid.length) {
      $('calc-results').innerHTML = ''; $('cost-visual').hidden = true;
      $('calc-status').textContent = invalid.length ? `Check ${invalid.map(label).join(', ')}. Use finite amounts within each input range; tax cannot exceed the payment.` : `Complete ${missing.length} remaining ${missing.length === 1 ? 'field' : 'fields'}. Zero must be entered deliberately. No contribution is calculated yet.`;
      return;
    }
    const time = values.minutes / 60 * values.hourly;
    const pre = values.revenue - values.tax - values.landed - values.package - values.fees - values.loss - time;
    const ceiling = pre - values.retained;
    const contribution = pre - values.acquisition;
    const orders = contribution > 0 ? Math.ceil(values.fixed / contribution) : null;
    const roas = pre > 0 ? values.revenue / pre : null;
    const totals = [time, pre, ceiling, contribution, roas, orders].filter(value => value !== null);
    if (totals.some(value => !Number.isFinite(value))) { $('calc-results').innerHTML = ''; $('cost-visual').hidden = true; $('calc-status').textContent = 'These inputs exceed the calculator range. Reduce them to a finite one-order scenario.'; return; }
    $('calc-results').innerHTML = result('Before acquisition',money(pre),'After entered variable costs and owner time; before fixed costs.',pre < 0) + result('Acquisition ceiling at your retained target',money(ceiling),ceiling < 0 ? 'The retained target is out of reach even at zero acquisition cost.' : `Leaves your chosen ${money(values.retained)} per order before fixed costs.`,ceiling < 0) + result('After acquisition',money(contribution),'Contribution for this scenario. Unentered costs still need funding.',contribution < 0) + result('Break-even revenue ROAS',roas === null ? 'No threshold' : `${roas.toFixed(2)}×`,roas === null ? 'Non-positive pre-acquisition contribution cannot support an acquisition budget.' : 'Zero contribution at this revenue basis, before fixed costs. Not an attainable ROAS forecast.') + result('Orders to recover fixed costs',orders === null ? 'Cannot recover' : new Intl.NumberFormat('en-GB').format(orders),orders === null ? 'Contribution must be positive to recover fixed costs.' : `Rounds up to recover the entered ${money(values.fixed)} fixed costs.`) + result('Owner time allowance',money(time),'This is an assigned cost of time, separate from cash paid.');
    $('calc-status').textContent = `${scenario === 'illustration' ? 'Labelled illustration' : 'Your entered scenario'}. Inputs are assumptions until verified. These outputs do not establish actual profit.`;
    const entries = [['Customer payment', values.revenue, 'payment'],['Tax adjustment',values.tax,''],['Landed product',values.landed,''],['Packaging',values.package,''],['Fees',values.fees,''],['Loss allowance',values.loss,''],['Owner time',time,''],['Acquisition',values.acquisition,'acquisition']];
    const max = Math.max(...entries.map(([,amount]) => amount), 0.01);
    $('cost-bars').innerHTML = entries.map(([title, amount, className]) => `<div class="cost-row ${className}"><span>${esc(title)}</span><div class="cost-track"><div class="cost-fill" style="width:${(amount / max * 100).toFixed(3)}%"></div></div><strong>${esc(money(amount))}</strong></div>`).join('');
    $('cost-visual').hidden = false;
  };
  $('economics-form').addEventListener('submit', event => event.preventDefault());
  $('economics-form').addEventListener('input', event => { if (!event.target.matches('input')) return; scenario = 'custom'; $('scenario-basis').textContent = 'Your entered scenario. Record which inputs are verified and which are chosen assumptions.'; calculate(); });
  $('load-illustration').addEventListener('click', () => {
    const illustration = {revenue:49,tax:0,landed:20,package:1,fees:1.23,loss:3,minutes:10,hourly:15,acquisition:10,retained:15,fixed:40};
    costKeys.forEach(key => { $(`cost-${key}`).value = illustration[key]; });
    scenario = 'illustration';
    $('scenario-basis').textContent = 'Illustration only: £49 payment, £0 tax adjustment, £20 landed product, £1 packaging, £1.23 fees, £3 loss allowance, 10 minutes at £15/hour, £10 acquisition, £15 desired retained contribution and £40 fixed costs. These are arithmetic assumptions, not a market prediction or a supplier quote.';
    calculate();
  });
  $('clear-economics').addEventListener('click', () => { costKeys.forEach(key => { $(`cost-${key}`).value = ''; }); scenario = 'blank'; $('scenario-basis').textContent = 'Blank model. Enter every field to calculate your scenario.'; calculate(); });
  calculate();

  let printStates = [];
  window.addEventListener('beforeprint', () => { printStates = [...document.querySelectorAll('details')].map(element => [element, element.open]); printStates.forEach(([element]) => { element.open = true; }); });
  window.addEventListener('afterprint', () => { printStates.forEach(([element, open]) => { element.open = open; }); printStates = []; });
  $('print-report').addEventListener('click', () => window.print());
})();
