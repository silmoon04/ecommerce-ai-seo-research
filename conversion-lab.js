(function () {
  "use strict";

  const data = window.conversionResearch || {};
  const $ = (selector, context = document) => context.querySelector(selector);
  const string = (value) => value == null ? "" : String(value);
  const escape = (value) => string(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);
  const array = (value) => Array.isArray(value) ? value : value == null ? [] : [value];
  const isPresent = (value) => value !== undefined && value !== null && value !== "";
  const products = array(data.products).filter((item) => item && typeof item === "object");
  const ideas = array(data.ideas).filter((item) => item && typeof item === "object");
  const productEntries = [];
  const ideaEntries = [];
  const candidateEntries = new Map();
  const usedIds = new Set();
  const labels = {
    id: "Record ID", name: "Product", benchmarkType: "Benchmark type", winningEvidence: "Why this is a benchmark, and what the evidence establishes",
    currentOffer: "Current offer", conversionMechanism: "How it could change purchases", strengths: "What it does well", limits: "Where the evidence or offer stops",
    improve: "What could improve", harness: "Testing and measurement capabilities", financialSuccessLimits: "Limits of the evidence for commercial success",
    financialEvidence: "What is known about the business", financialsuccesslimits: "Limits of the evidence for commercial success", financialLimits: "Limits of the financial evidence",
    title: "Idea", lens: "Mechanism lens", stage: "Purchase stage", priority: "Editorial priority", horizon: "Build horizon", buyer: "Who would buy it",
    problem: "The problem", intervention: "What changes", implementation: "What to build", mechanism: "How the change could cause a purchase",
    overlap: "What already exists", competitorOverlap: "What competitors already do", edge: "The advantage to test", edgeHypothesis: "The advantage to test",
    evidence: "Evidence and its limits", impactEvidence: "Evidence and its limits", experiment: "The first experiment", metric: "What to measure",
    dependency: "What this depends on", dependencies: "What this depends on", falsifier: "What would disprove the claim", impactScenario: "Conditional impact scenario",
    valueScenario: "Conditional value scenario", willingnessToPay: "A price to test, and its basis", costControl: "Cost control (secondary)", feasibility: "Build horizon",
    dataNeeded: "Data needed", failureMode: "How it could fail or harm conversion", sourceIds: "Source references", sources: "Sources", candidateIds: "Underlying candidate records",
    offlineSimulation: "Offline simulation", liveMonitoring: "Live monitoring", randomizedExperiment: "Randomized experiment", purchaseMeasurement: "Purchase measurement",
    details: "What the documentation says", status: "Status", baseline: "Assumed baseline", calculation: "Calculation", range: "Range and conditions"
  };

  function label(key) {
    return labels[key] || string(key).replace(/([a-z])([A-Z])/g, "$1 $2").replace(/[_-]/g, " ").replace(/^./, (letter) => letter.toUpperCase());
  }

  function human(value) {
    const result = string(value).replace(/[_-]/g, " ");
    return result ? result.charAt(0).toUpperCase() + result.slice(1) : "Unspecified";
  }

  function recordId(prefix, raw, index) {
    const base = `${prefix}-${string(raw || index + 1).replace(/[^a-zA-Z0-9_.:-]/g, "-")}`;
    let id = base;
    let suffix = 2;
    while (usedIds.has(id)) id = `${base}-${suffix++}`;
    usedIds.add(id);
    return id;
  }

  function safeHref(raw, base = document.baseURI) {
    if (typeof raw !== "string" || !raw.trim()) return null;
    try {
      const url = new URL(raw, base);
      if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) return null;
      return url.href;
    } catch (_) { return null; }
  }

  function externalAttributes(href) {
    try { return new URL(href).origin !== location.origin ? ' target="_blank" rel="noopener noreferrer"' : ""; }
    catch (_) { return ""; }
  }

  function safeNoteHref(raw) {
    const href = safeHref(raw);
    if (!href) return null;
    try { return new URL(href).origin === location.origin ? href : null; }
    catch (_) { return null; }
  }

  function markdown(value, base = document.baseURI, headingBase = 3) {
    if (!window.marked || typeof window.marked.parse !== "function") return `<p>${escape(value).replace(/\n/g, "<br>")}</p>`;
    const renderer = new window.marked.Renderer();
    renderer.html = (token) => escape(typeof token === "string" ? token : token.text || "");
    let parsed;
    try { parsed = window.marked.parse(string(value), { renderer, gfm: true, breaks: false }); }
    catch (_) { return `<p>${escape(value)}</p>`; }
    const fragment = new DOMParser().parseFromString(parsed, "text/html");
    const allowed = new Set(["P", "H1", "H2", "H3", "H4", "H5", "H6", "UL", "OL", "LI", "BLOCKQUOTE", "TABLE", "THEAD", "TBODY", "TFOOT", "TR", "TH", "TD", "STRONG", "EM", "DEL", "CODE", "PRE", "A", "BR", "HR"]);
    function clean(parent) {
      [...parent.childNodes].forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) return;
        if (child.nodeType !== Node.ELEMENT_NODE) { child.remove(); return; }
        const tag = child.tagName;
        const href = tag === "A" ? safeHref(child.getAttribute("href"), base) : null;
        const align = child.getAttribute("align");
        const start = tag === "OL" ? child.getAttribute("start") : null;
        clean(child);
        if (!allowed.has(tag)) { child.replaceWith(...child.childNodes); return; }
        [...child.attributes].forEach((attribute) => child.removeAttribute(attribute.name));
        if (tag === "A") {
          if (!href) { child.replaceWith(...child.childNodes); return; }
          child.setAttribute("href", href);
          if (new URL(href).origin !== location.origin) {
            child.setAttribute("target", "_blank");
            child.setAttribute("rel", "noopener noreferrer");
          }
        }
        if (tag === "TH") child.setAttribute("scope", "col");
        if (["TH", "TD"].includes(tag) && ["left", "right", "center"].includes(align)) child.setAttribute("data-align", align);
        if (tag === "OL" && /^\d{1,6}$/.test(start || "")) child.setAttribute("start", start);
        if (/^H[1-6]$/.test(tag)) {
          const level = Math.min(6, headingBase + Math.max(0, Number(tag.slice(1)) - 2));
          const heading = fragment.createElement(`h${level}`);
          heading.append(...child.childNodes);
          child.replaceWith(heading);
        }
      });
    }
    clean(fragment.body);
    fragment.querySelectorAll("table").forEach((table, index) => {
      const wrapper = fragment.createElement("div");
      wrapper.className = "conversion-table-scroll";
      wrapper.tabIndex = 0;
      wrapper.setAttribute("role", "region");
      const firstHeader = table.querySelector("th");
      wrapper.setAttribute("aria-label", firstHeader ? `Scrollable table: ${firstHeader.textContent.trim()}` : `Scrollable table ${index + 1}`);
      table.replaceWith(wrapper);
      wrapper.append(table);
    });
    return fragment.body.innerHTML;
  }

  function renderValue(value, headingBase = 5) {
    if (value === null) return '<p class="unspecified">Not specified.</p>';
    if (Array.isArray(value)) {
      if (!value.length) return '<p class="unspecified">None recorded.</p>';
      return `<ul>${value.map((item) => `<li>${renderValue(item, headingBase)}</li>`).join("")}</ul>`;
    }
    if (typeof value === "object" && value) {
      return `<dl class="object-fields">${Object.entries(value).map(([key, item]) => `<div><dt>${escape(label(key))}</dt><dd>${renderValue(item, headingBase)}</dd></div>`).join("")}</dl>`;
    }
    return `<div class="research-markdown">${markdown(string(value), document.baseURI, headingBase)}</div>`;
  }

  function field(key, value, level = 4, className = "") {
    if (value === undefined) return "";
    return `<section class="record-section ${className}"><h${level}>${escape(label(key))}</h${level}>${renderValue(value, Math.min(level + 1, 6))}</section>`;
  }

  function sourceList(sources, level = 4) {
    const entries = array(sources);
    if (!entries.length) return "";
    const content = entries.map((source) => {
      if (!source || typeof source !== "object") return `<li>${escape(source)}</li>`;
      const href = safeHref(source.url);
      const title = source.title || source.label || source.url || "Source";
      const link = href ? `<a href="${escape(href)}"${externalAttributes(href)}>${escape(title)}</a>` : `<span>${escape(title)}</span>`;
      const meta = [source.id, source.type && human(source.type)].filter(isPresent).map(escape).join(" · ");
      const extras = Object.entries(source).filter(([key]) => !["id", "type", "title", "label", "url", "claim"].includes(key));
      return `<li>${link}${meta ? `<span class="source-meta">${meta}</span>` : ""}${source.claim ? `<div class="research-markdown">${markdown(source.claim, document.baseURI, 6)}</div>` : ""}${extras.map(([key, value]) => `<div class="source-meta"><strong>${escape(label(key))}:</strong> ${escape(typeof value === "object" ? JSON.stringify(value) : value)}</div>`).join("")}</li>`;
    }).join("");
    return `<section class="record-section"><h${level}>Sources</h${level}><ul class="source-list">${content}</ul></section>`;
  }

  function sourceReferences(ids, sources, level = 5) {
    if (!Array.isArray(ids)) return field("sourceIds", ids, level);
    const links = ids.map((id) => {
      const source = array(sources).find((item) => item && item.id === id);
      const href = source && safeHref(source.url);
      return href ? `<li><a href="${escape(href)}"${externalAttributes(href)} title="${escape(source.title || source.url)}">${escape(id)}</a></li>` : `<li>${escape(id)}</li>`;
    }).join("");
    return `<section class="record-section"><h${level}>Source references</h${level}><ul class="source-id-list">${links || "<li>None recorded.</li>"}</ul></section>`;
  }

  function candidateReferences(ids) {
    if (!Array.isArray(ids)) return field("candidateIds", ids);
    return `<section class="record-section"><h4>Underlying candidate records</h4><ul class="source-id-list">${ids.map((id) => {
      const record = candidateEntries.get(string(id));
      return record ? `<li><a href="#${escape(record.id)}">${escape(id)}</a></li>` : `<li>${escape(id)}</li>`;
    }).join("") || "<li>None recorded.</li>"}</ul></section>`;
  }

  function metadata(record, selected = false) {
    const fields = selected ? ["lens", "stage", "priority", "horizon"] : ["benchmarkType"];
    return `<div class="record-meta">${fields.filter((key) => isPresent(record[key])).map((key, index) => `<span class="${index === 0 ? "meta-type" : key === "priority" ? "meta-priority" : ""}" title="${escape(label(key))}">${escape(human(record[key]))}</span>`).join("")}${isPresent(record.id) ? `<span class="record-id">${escape(record.id)}</span>` : ""}</div>`;
  }

  function toolsMarkup(id, labelText) {
    return `<div class="record-tools"><span>${escape(labelText)}</span><a href="#${escape(id)}">Link to this section</a></div>`;
  }

  function harnessMarkup(harness) {
    if (!harness || typeof harness !== "object" || Array.isArray(harness)) return field("harness", harness);
    const statuses = { documented: "Documented", not_found: "Not found in reviewed sources", unclear: "Unclear in reviewed sources" };
    return `<section class="record-section harness-readout"><h4>Testing and measurement capabilities</h4><dl class="object-fields">${Object.entries(harness).map(([key, value]) => {
      const status = typeof value === "string" && statuses[value];
      return `<div${key === "details" ? ' class="harness-detail"' : ""}><dt>${escape(label(key))}</dt><dd>${status ? `<span class="harness-status${value === "documented" ? "" : " unknown"}">${escape(status)}</span>` : renderValue(value)}</dd></div>`;
    }).join("")}</dl><p class="harness-explanation">“Not found” describes the source search. It does not establish that the product lacks the capability.</p></section>`;
  }

  function candidateBody(candidate, productSources, id) {
    const order = ["buyer", "problem", "intervention", "implementation", "mechanism", "competitorOverlap", "edgeHypothesis", "dataNeeded", "impactEvidence", "experiment", "metric", "impactScenario", "willingnessToPay", "costControl", "dependencies", "failureMode", "falsifier"];
    const omitted = new Set(["id", "title", "lens", "feasibility", "sources", "sourceIds", ...order]);
    return toolsMarkup(id, "Candidate hypothesis from this product assessment")
      + order.filter((key) => Object.hasOwn(candidate, key)).map((key) => field(key, candidate[key], 6, key === "impactEvidence" ? "evidence-section" : key === "falsifier" ? "decision-section" : "")).join("")
      + Object.entries(candidate).filter(([key]) => !omitted.has(key)).map(([key, value]) => field(key, value, 6)).join("")
      + (Object.hasOwn(candidate, "sourceIds") ? sourceReferences(candidate.sourceIds, productSources, 6) : "")
      + sourceList(candidate.sources, 6);
  }

  function productBody(entry) {
    const product = entry.record;
    const primary = ["winningEvidence", "currentOffer", "conversionMechanism"];
    const paired = ["strengths", "limits"];
    const rest = ["improve", "financialSuccessLimits", "financialsuccesslimits", "financialLimits", "financialEvidence"];
    const omitted = new Set(["id", "name", "benchmarkType", "harness", "ideas", "sources", ...primary, ...paired, ...rest]);
    const candidateMarkup = entry.candidates.map((candidateEntry) => {
      const candidate = candidateEntry.record;
      return `<details class="candidate-idea" id="${escape(candidateEntry.id)}"><summary><div class="record-meta"><span class="meta-type">${escape(human(candidate.lens))}</span>${isPresent(candidate.feasibility) ? `<span>${escape(human(candidate.feasibility))}</span>` : ""}<span class="record-id">${escape(candidate.id || "")}</span></div><h5>${escape(candidate.title || "Untitled candidate")}</h5></summary><div class="candidate-body"></div></details>`;
    }).join("");
    return toolsMarkup(entry.id, "Product assessment from public sources")
      + primary.filter((key) => Object.hasOwn(product, key)).map((key) => field(key, product[key], 4, key === "winningEvidence" ? "evidence-section" : "")).join("")
      + `<div class="record-pair">${paired.filter((key) => Object.hasOwn(product, key)).map((key) => field(key, product[key])).join("")}</div>`
      + (Object.hasOwn(product, "harness") ? harnessMarkup(product.harness) : "")
      + rest.filter((key) => Object.hasOwn(product, key)).map((key) => field(key, product[key])).join("")
      + Object.entries(product).filter(([key]) => !omitted.has(key)).map(([key, value]) => field(key, value)).join("")
      + `<section class="candidate-section"><h4>${entry.candidates.length} candidate ideas from this product</h4><p class="candidate-intro">Open each idea for its full mechanism, evidence, experiment, value assumptions and failure conditions. These are research hypotheses.</p>${candidateMarkup || '<p class="library-empty">No candidate ideas are included in this record.</p>'}</section>`
      + sourceList(product.sources);
  }

  function ideaBody(entry) {
    const idea = entry.record;
    const order = ["buyer", "problem", "intervention", "implementation", "mechanism", "overlap", "edge", "evidence", "experiment", "metric", "dependency", "costControl", "falsifier", "impactScenario", "valueScenario"];
    const omitted = new Set(["id", "title", "lens", "stage", "priority", "horizon", "sources", "candidateIds", ...order]);
    return toolsMarkup(entry.id, "Screened hypothesis; priority is an editorial judgment")
      + order.filter((key) => Object.hasOwn(idea, key)).map((key) => field(key, idea[key], 4, key === "evidence" ? "evidence-section" : key === "falsifier" ? "decision-section" : "")).join("")
      + Object.entries(idea).filter(([key]) => !omitted.has(key)).map(([key, value]) => field(key, value)).join("")
      + (Object.hasOwn(idea, "candidateIds") ? candidateReferences(idea.candidateIds) : "")
      + sourceList(idea.sources);
  }

  function ensureProduct(entry) {
    if (entry.populated) return;
    $(".record-body", entry.element).innerHTML = productBody(entry);
    entry.candidates.forEach((candidate) => { candidate.element = document.getElementById(candidate.id); });
    entry.populated = true;
  }

  function ensureCandidate(entry) {
    if (entry.populated) return;
    ensureProduct(entry.product);
    const body = $(".candidate-body", entry.element);
    body.innerHTML = candidateBody(entry.record, entry.product.record.sources, entry.id);
    entry.populated = true;
  }

  function ensureIdea(entry) {
    if (entry.populated) return;
    $(".record-body", entry.element).innerHTML = ideaBody(entry);
    entry.populated = true;
  }

  function populateOptions(select, entries, key, defaultLabel) {
    const values = [...new Set(entries.map((entry) => string(entry.record[key])).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    select.replaceChildren(new Option(defaultLabel, ""), ...values.map((value) => new Option(human(value), value)));
  }

  function setupFilter({ entries, searchId, selects, countId, clearId, containerId, noun }) {
    const search = $(searchId);
    const count = $(countId);
    const reset = $(clearId);
    const container = $(containerId);
    const selectEntries = selects.map(([id, key, placeholder]) => {
      const element = $(id);
      populateOptions(element, entries, key, placeholder);
      return { element, key };
    });
    const empty = document.createElement("p");
    empty.className = "library-empty";
    empty.textContent = `No ${noun} match those filters. Try another search or clear the filters.`;
    empty.hidden = true;
    container.append(empty);
    function apply() {
      const query = search.value.trim().toLocaleLowerCase();
      let visible = 0;
      entries.forEach((entry) => {
        const matches = (!query || entry.searchText.includes(query)) && selectEntries.every(({ element, key }) => !element.value || string(entry.record[key]) === element.value);
        entry.element.hidden = !matches;
        if (matches) visible += 1;
      });
      count.textContent = `${visible} of ${entries.length} ${noun}`;
      empty.hidden = visible > 0 || entries.length === 0;
      reset.hidden = !query && selectEntries.every(({ element }) => !element.value);
      container.dispatchEvent(new CustomEvent("research-filter-change"));
    }
    function clear() {
      search.value = "";
      selectEntries.forEach(({ element }) => { element.value = ""; });
      apply();
    }
    search.addEventListener("input", apply);
    selectEntries.forEach(({ element }) => element.addEventListener("change", apply));
    reset.addEventListener("click", () => { clear(); search.focus(); });
    apply();
    return { clear, apply };
  }

  function renderMechanismChart(filter) {
    if (!ideas.length) return;
    const list = $("#idea-list");
    const lensSelect = $("#idea-lens");
    const counts = new Map();
    ideas.forEach((idea) => {
      const lens = string(idea.lens);
      if (lens) counts.set(lens, (counts.get(lens) || 0) + 1);
    });
    if (!counts.size) return;
    const entries = [...counts.entries()].sort(([first], [second]) => first.localeCompare(second));
    const maximum = Math.max(...entries.map(([, count]) => count));
    const chart = document.createElement("section");
    chart.className = "mechanism-chart";
    chart.setAttribute("aria-labelledby", "mechanism-chart-title");
    chart.innerHTML = `<div class="mechanism-chart-heading"><h3 id="mechanism-chart-title">${ideas.length} ideas by mechanism</h3><button class="mechanism-reset" type="button" aria-pressed="true">All ideas</button></div><p id="mechanism-chart-help">Counts across the full set, not scores. Choose a bar to filter by lens; search and horizon filters still apply.</p><div class="mechanism-bars" role="group" aria-describedby="mechanism-chart-help">${entries.map(([lens, count]) => `<button class="mechanism-bar-button" type="button" data-lens="${escape(lens)}" aria-pressed="false" aria-label="${escape(human(lens))}: ${count} of ${ideas.length} ideas. Filter by this lens."><span class="mechanism-label">${escape(human(lens))}</span><span class="mechanism-track" aria-hidden="true"><span style="width:${count / maximum * 100}%"></span></span><span class="mechanism-count" aria-hidden="true">${count}</span></button>`).join("")}</div>`;
    list.before(chart);
    const reset = $(".mechanism-reset", chart);
    const bars = [...chart.querySelectorAll(".mechanism-bar-button")];
    function sync() {
      bars.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.lens === lensSelect.value)));
      reset.setAttribute("aria-pressed", String(!lensSelect.value && !$("#idea-search").value.trim() && !$("#idea-horizon").value));
    }
    bars.forEach((button) => button.addEventListener("click", () => {
      lensSelect.value = button.dataset.lens;
      lensSelect.dispatchEvent(new Event("change", { bubbles: true }));
    }));
    reset.addEventListener("click", () => filter.clear());
    list.addEventListener("research-filter-change", sync);
    sync();
  }

  function renderLibraries() {
    const productList = $("#product-list");
    const ideaList = $("#idea-list");
    products.forEach((product, index) => {
      const entry = { record: product, id: recordId("product", product.id, index), searchText: JSON.stringify(product).toLocaleLowerCase(), candidates: [] };
      entry.candidates = array(product.ideas).filter((item) => item && typeof item === "object").map((candidate, candidateIndex) => {
        const record = { record: candidate, id: recordId("candidate", candidate.id || `${product.id}-${candidateIndex + 1}`, candidateIndex), product: entry };
        if (!candidateEntries.has(string(candidate.id))) candidateEntries.set(string(candidate.id), record);
        return record;
      });
      productEntries.push(entry);
    });
    ideas.forEach((idea, index) => { ideaEntries.push({ record: idea, id: recordId("idea", idea.id, index), searchText: JSON.stringify(idea).toLocaleLowerCase() }); });
    productList.innerHTML = productEntries.length ? productEntries.map((entry) => `<details class="product-analysis" id="${escape(entry.id)}"><summary>${metadata(entry.record)}<h3>${escape(entry.record.name || "Untitled product")}</h3><span class="summary-instruction"><span class="when-closed">Read the assessment and ${entry.candidates.length} ideas</span><span class="when-open">Close the assessment</span></span></summary><div class="record-body"></div></details>`).join("") : '<p class="data-unavailable">The product analyses are not available in this copy of the report.</p>';
    ideaList.innerHTML = ideaEntries.length ? ideaEntries.map((entry) => `<details class="selected-idea" id="${escape(entry.id)}"><summary>${metadata(entry.record, true)}<h3>${escape(entry.record.title || "Untitled hypothesis")}</h3><span class="summary-instruction"><span class="when-closed">Read the mechanism, evidence and test</span><span class="when-open">Close the hypothesis</span></span></summary><div class="record-body"></div></details>`).join("") : '<p class="data-unavailable">The selected ideas are not available in this copy of the report.</p>';
    productEntries.forEach((entry) => { entry.element = document.getElementById(entry.id); });
    ideaEntries.forEach((entry) => { entry.element = document.getElementById(entry.id); });
    if (products.length) document.querySelectorAll("[data-product-total]").forEach((node) => { node.textContent = products.length; });
    if (ideas.length) document.querySelectorAll("[data-idea-total]").forEach((node) => { node.textContent = ideas.length; });
    const productFilter = setupFilter({ entries: productEntries, searchId: "#product-search", selects: [["#product-type", "benchmarkType", "All types"]], countId: "#product-count", clearId: "#clear-products", containerId: "#product-list", noun: "products" });
    const ideaFilter = setupFilter({ entries: ideaEntries, searchId: "#idea-search", selects: [["#idea-lens", "lens", "All lenses"], ["#idea-horizon", "horizon", "All horizons"]], countId: "#idea-count", clearId: "#clear-ideas", containerId: "#idea-list", noun: "ideas" });
    renderMechanismChart(ideaFilter);
    productList.addEventListener("toggle", (event) => {
      if (!event.target.open) return;
      if (event.target.classList.contains("product-analysis")) {
        const entry = productEntries.find((record) => record.id === event.target.id);
        if (entry) ensureProduct(entry);
      } else if (event.target.classList.contains("candidate-idea")) {
        const entry = [...candidateEntries.values()].find((record) => record.id === event.target.id);
        if (entry) ensureCandidate(entry);
      }
    }, true);
    ideaList.addEventListener("toggle", (event) => {
      if (!event.target.open || !event.target.classList.contains("selected-idea")) return;
      const entry = ideaEntries.find((record) => record.id === event.target.id);
      if (entry) ensureIdea(entry);
    }, true);
    function revealHash() {
      let id;
      try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
      const product = productEntries.find((entry) => entry.id === id);
      const idea = ideaEntries.find((entry) => entry.id === id);
      const candidate = [...candidateEntries.values()].find((entry) => entry.id === id);
      let element;
      if (product) {
        if (product.element.hidden) productFilter.clear();
        ensureProduct(product);
        product.element.open = true;
        element = product.element;
      } else if (idea) {
        if (idea.element.hidden) ideaFilter.clear();
        ensureIdea(idea);
        idea.element.open = true;
        element = idea.element;
      } else if (candidate) {
        if (candidate.product.element.hidden) productFilter.clear();
        ensureProduct(candidate.product);
        candidate.product.element.open = true;
        ensureCandidate(candidate);
        candidate.element.open = true;
        element = candidate.element;
      }
      if (element) requestAnimationFrame(() => element.scrollIntoView({ block: "start" }));
    }
    window.addEventListener("hashchange", revealHash);
    document.addEventListener("click", (event) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest('a[href^="#"]');
      if (link && link.getAttribute("href") === location.hash) revealHash();
    });
    if (location.hash) revealHash();
  }

  function renderSections() {
    const sections = [["#overview-content", "overviewMarkdown", "The overview"], ["#harness-content", "harnessMarkdown", "The experiment design"], ["#matrix-content", "matrixMarkdown", "The competitor comparison"]];
    sections.forEach(([selector, key, name]) => {
      $(selector).innerHTML = data[key] ? markdown(data[key]) : `<p class="data-unavailable">${name} is not available in this copy of the report.</p>`;
    });
    if (data.date) {
      const dateElement = $("#research-date");
      const raw = string(data.date);
      const iso = raw.match(/^\d{4}-\d{2}-\d{2}/);
      const parsed = iso ? new Date(`${iso[0]}T12:00:00Z`) : null;
      if (parsed && !Number.isNaN(parsed.getTime())) {
        dateElement.dateTime = iso[0];
        dateElement.textContent = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(parsed);
      } else { dateElement.textContent = raw; dateElement.removeAttribute("datetime"); }
    }
  }

  function renderNotes() {
    const notes = array(data.notes).filter((note) => note && typeof note === "object");
    const list = $("#note-list");
    list.innerHTML = notes.length ? notes.map((note, index) => {
      const href = safeNoteHref(note.file);
      return `<article><h3>${escape(note.title || "Research note")}</h3>${href ? `<div><a href="${escape(href)}" data-note-index="${index}">Read the note</a><a class="note-file" href="${escape(href)}" target="_blank" rel="noopener noreferrer">Markdown file</a></div>` : '<p class="data-pending">The note file is not available.</p>'}</article>`;
    }).join("") : '<p class="data-unavailable">No research notes are linked in this copy of the report.</p>';
    const dialog = $("#note-dialog");
    const content = $("#note-content");
    const title = $("#note-title");
    const source = $("#note-source");
    const close = $("#note-close");
    if (typeof dialog.showModal !== "function") return;
    let opener = null;
    let controller = null;
    let generation = 0;
    list.addEventListener("click", async (event) => {
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[data-note-index]");
      if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      const note = notes[Number(link.dataset.noteIndex)];
      const href = note && safeNoteHref(note.file);
      if (!href) return;
      event.preventDefault();
      if (controller) controller.abort();
      controller = new AbortController();
      const request = ++generation;
      opener = link;
      title.textContent = note.title || "Research note";
      source.href = href;
      content.innerHTML = '<p class="data-pending" role="status">Loading the research note.</p>';
      dialog.showModal();
      close.focus();
      try {
        const response = await fetch(href, { credentials: "same-origin", signal: controller.signal });
        if (!response.ok) throw new Error("The note could not be loaded.");
        const value = await response.text();
        if (request !== generation || !dialog.open) return;
        content.innerHTML = markdown(value, href, 2);
        content.scrollTop = 0;
      } catch (error) {
        if (request !== generation || !dialog.open || error.name === "AbortError") return;
        content.innerHTML = `<p>This note could not be previewed. <a href="${escape(href)}" target="_blank" rel="noopener noreferrer">Open its Markdown file</a> to read the source.</p>`;
      }
    });
    close.addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => {
      generation += 1;
      if (controller) controller.abort();
      if (opener && opener.isConnected) opener.focus();
    });
    dialog.addEventListener("click", (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  }

  const decimal = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 2 });
  const precise = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 4 });
  const whole = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });
  const money = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function perArm(p1, p2) {
    if (!(p1 > 0 && p1 < 1 && p2 > 0 && p2 < 1) || Math.abs(p2 - p1) < Number.EPSILON) return null;
    const mean = (p1 + p2) / 2;
    const numerator = 1.95996 * Math.sqrt(2 * mean * (1 - mean)) + .841621 * Math.sqrt(p1 * (1 - p1) + p2 * (1 - p2));
    const sample = Math.ceil((numerator * numerator) / ((p2 - p1) * (p2 - p1)));
    return Number.isFinite(sample) && Number.isSafeInteger(sample) && Number.isSafeInteger(sample * 2) ? sample : null;
  }

  function setupCalculator() {
    const fields = { visits: $("#calc-visits"), eligible: $("#calc-eligible"), cvr: $("#calc-cvr"), contribution: $("#calc-contribution"), uplift: $("#calc-uplift"), price: $("#calc-price"), multiple: $("#calc-multiple") };
    const outputIds = ["#result-baseline", "#result-orders", "#result-contribution", "#result-breakeven", "#result-ceiling", "#result-benefit", "#power-arm", "#power-total", "#power-months"];
    const status = $("#calc-status");
    const powerStatus = $("#power-status");
    const set = (selector, value) => { $(selector).textContent = value; };
    function invalid(message) {
      status.textContent = message;
      status.dataset.state = "invalid";
      outputIds.forEach((id) => set(id, "Not available"));
      set("#eligible-visits", "Check the inputs");
      set("#value-explanation", "The calculations resume when all assumptions are valid.");
      set("#power-status", "The sample-size estimate needs valid traffic and conversion assumptions.");
      $("#sensitivity-body").innerHTML = '<tr><td colspan="3">Check the inputs above to compare the scenarios.</td></tr>';
    }
    function update() {
      const values = {};
      for (const [key, input] of Object.entries(fields)) {
        if (!input.value.trim() || !Number.isFinite(input.valueAsNumber)) { invalid("Enter a number in every assumption field."); return; }
        values[key] = input.valueAsNumber;
      }
      const { visits, eligible, cvr, contribution, uplift, price, multiple } = values;
      if (visits < 0 || contribution < 0 || price < 0 || multiple <= 0) { invalid("Visits, contribution and fee must be zero or greater. The value / fee multiple must be greater than zero."); return; }
      if (eligible < 0 || eligible > 100 || cvr < 0 || cvr > 100 || uplift < -100) { invalid("Eligibility and baseline conversion must be between 0% and 100%. Relative change cannot be below −100%."); return; }
      const p1 = cvr / 100;
      const p2 = p1 * (1 + uplift / 100);
      if (p2 > 1 || p2 < 0) { invalid("These inputs would put the resulting conversion rate outside 0% to 100%. Adjust the baseline or relative change."); return; }
      const eligibleVisits = visits * eligible / 100;
      const baselineOrders = eligibleVisits * p1;
      const extraOrders = baselineOrders * uplift / 100;
      const extraContribution = extraOrders * contribution;
      const baselineContribution = baselineOrders * contribution;
      const benefit = extraContribution - price;
      if (![eligibleVisits, baselineOrders, extraOrders, extraContribution, baselineContribution, benefit].every(Number.isFinite)) { invalid("The assumptions are too large for a reliable calculation. Use smaller values."); return; }
      set("#eligible-visits", `${decimal.format(eligibleVisits)} / month`);
      set("#result-baseline", decimal.format(baselineOrders));
      set("#result-orders", decimal.format(extraOrders));
      set("#result-contribution", money.format(extraContribution));
      set("#result-breakeven", price === 0 ? "0%" : baselineContribution > 0 ? `${decimal.format(price / baselineContribution * 100)}%` : "Not reachable");
      set("#result-ceiling", extraContribution > 0 ? money.format(extraContribution / multiple) : "No positive fee");
      set("#result-benefit", money.format(benefit));
      const pp = (p2 - p1) * 100;
      status.textContent = `Assumed eligible-cohort conversion: ${precise.format(cvr)}% to ${precise.format(p2 * 100)}%, a ${precise.format(Math.abs(pp))} percentage-point ${pp < 0 ? "decrease" : "increase"}.`;
      status.dataset.state = extraContribution < 0 ? "negative" : "valid";
      const ceiling = extraContribution / multiple;
      set("#value-explanation", extraContribution > 0
        ? `${decimal.format(eligibleVisits)} eligible visits produce ${decimal.format(extraOrders)} extra expected orders under this assumption. At a ${decimal.format(multiple)}× value / fee target, ${money.format(ceiling)} is the arithmetic monthly ceiling. The proposed ${money.format(price)} fee ${price <= ceiling ? "fits" : "exceeds"} that target. Payment and conversion lift remain unproven.`
        : `${extraContribution < 0 ? "The assumed effect reduces order contribution" : "The assumed effect creates no extra order contribution"}, so this scenario supports no positive fee for incremental orders. The merchant benefit after the proposed fee is ${money.format(benefit)}.`);
      const rows = [1, 5, 10, 20].map((lift) => {
        const valid = p1 * (1 + lift / 100) <= 1;
        const orders = baselineOrders * lift / 100;
        return { lift, orders, amount: orders * contribution, valid };
      });
      const maximum = Math.max(0, ...rows.filter((row) => row.valid).map((row) => row.amount));
      $("#sensitivity-body").innerHTML = rows.map((row) => `<tr><td>${row.lift}%</td>${row.valid ? `<td>${decimal.format(row.orders)}</td><td><span class="sensitivity-amount">${money.format(row.amount)}</span><span class="sensitivity-track" aria-hidden="true"><span class="sensitivity-bar" style="width:${maximum > 0 ? Math.max(0, Math.min(100, row.amount / maximum * 100)) : 0}%"></span></span></td>` : '<td colspan="2" class="sensitivity-unavailable">Would exceed 100% conversion</td>'}</tr>`).join("");
      const n = perArm(p1, p2);
      if (n === null) {
        ["#power-arm", "#power-total", "#power-months"].forEach((id) => set(id, "Not estimable"));
        powerStatus.textContent = p1 === p2 ? "Zero assumed change has no finite sample-size estimate in this model." : "This approximation requires two different conversion rates strictly between 0% and 100%, and a sample size within the calculator's numeric range.";
      } else {
        set("#power-arm", whole.format(n));
        set("#power-total", whole.format(n * 2));
        set("#power-months", eligibleVisits > 0 ? decimal.format(n * 2 / eligibleVisits) : "No eligible traffic");
        powerStatus.textContent = `${whole.format(n)} independent eligible observations in each arm would be needed to detect the assumed ${decimal.format(Math.abs(uplift))}% relative ${uplift < 0 ? "decrease" : "increase"} under this approximation. ${eligibleVisits > 0 ? `The time estimate divides the total by ${decimal.format(eligibleVisits)} eligible visits per month.` : "With no eligible monthly traffic, this test cannot accumulate observations."}`;
      }
    }
    Object.values(fields).forEach((input) => input.addEventListener("input", update));
    update();
  }

  function setupNavigation() {
    const links = [...document.querySelectorAll('.chapter-rail nav a[href^="#"]')];
    const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
    let scheduled = false;
    function update() {
      scheduled = false;
      let current = sections[0];
      sections.forEach((section) => { if (section.getBoundingClientRect().top <= 150) current = section; });
      links.forEach((link) => {
        const active = current && link.getAttribute("href") === `#${current.id}`;
        link.classList.toggle("active", Boolean(active));
        if (active) link.setAttribute("aria-current", "location");
        else link.removeAttribute("aria-current");
      });
    }
    window.addEventListener("scroll", () => {
      if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
    }, { passive: true });
    update();
    $("#print-report").addEventListener("click", () => window.print());
  }

  renderSections();
  renderLibraries();
  renderNotes();
  setupCalculator();
  setupNavigation();
})();
