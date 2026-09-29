(function () {
  "use strict";

  const data = window.deepDiveData || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const text = (value) => (value == null ? "" : String(value));
  const esc = (value) => text(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
  const asList = (value) => Array.isArray(value) ? value : value == null || value === "" ? [] : [value];

  function safeLink(raw) {
    try {
      const url = new URL(raw, document.baseURI);
      if (!["http:", "https:"].includes(url.protocol)) return null;
      return url.href;
    } catch (_) { return null; }
  }

  function richText(value) {
    return asList(value).map((item) => {
      if (typeof item !== "string") return `<p>${esc(JSON.stringify(item))}</p>`;
      const link = item.match(/^\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)$/);
      if (link) {
        const href = safeLink(link[2]);
        if (href) return `<p><a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(link[1])}</a></p>`;
      }
      return `<p>${esc(item)}</p>`;
    }).join("");
  }

  function fieldSection(title, value, list = false) {
    const items = asList(value);
    if (!items.length) return "";
    return `<section class="product-assessment"><h4>${esc(title)}</h4>${list
      ? `<ul>${items.map((item) => `<li>${esc(typeof item === "string" ? item : JSON.stringify(item))}</li>`).join("")}</ul>`
      : richText(value)}</section>`;
  }

  const fields = [
    ["What it does well", "strengths", true],
    ["Where the offer is limited", "limitations", true],
    ["What merchants report", "merchantEvidence", true],
    ["Where costs could bite", "profitPressure", true],
    ["What could improve", "improvements", true],
    ["Ideas to borrow", "borrow", true],
    ["What to avoid", "avoid", true],
    ["Opportunity to test", "opportunity", false],
    ["What would disprove it", "test", false],
    ["What is known about profit", "financialEvidence", false]
  ];

  function renderProducts() {
    const list = $("#product-list");
    const groupSelect = $("#product-group");
    const search = $("#product-search");
    const count = $("#product-count");
    if (!list || !groupSelect || !search || !count) return;
    const products = Array.isArray(data.products) ? data.products : [];
    const groups = [...new Set(products.map((product) => text(product.group)).filter(Boolean))].sort((a, b) => a.localeCompare(b));
    groupSelect.replaceChildren(new Option("All groups", ""), ...groups.map((group) => new Option(group, group)));

    const searchable = (product) => JSON.stringify(product).toLocaleLowerCase();
    const render = () => {
      const query = search.value.trim().toLocaleLowerCase();
      const group = groupSelect.value;
      const visible = products.filter((product) => (!group || product.group === group) && (!query || searchable(product).includes(query)));
      count.textContent = `${visible.length} of ${products.length} products`;
    list.innerHTML = visible.length ? visible.map((product) => {
        const sections = fields.map(([heading, key, isList]) => fieldSection(heading, product[key], isList)).join("");
        const sources = asList(product.sources).map((source) => {
          const href = safeLink(source && source.url);
          return href ? `<li><a href="${esc(href)}" target="_blank" rel="noopener noreferrer">${esc(source.label || source.url)}</a></li>` : "";
        }).join("");
        return `<details class="product-card" id="product-${esc(product.id)}"><summary><span class="product-category">${esc(product.group)}</span><h3>${esc(product.name)}</h3><p class="product-price">${esc(product.priceSummary)}</p><span class="expand-label">Read the assessment +</span></summary><div class="product-body">${sections}${sources ? `<section class="product-assessment"><h4>Sources</h4><ul>${sources}</ul></section>` : ""}</div></details>`;
      }).join("") : `<p class="empty-state">No products match those filters. Try another search or group.</p>`;
    };
    search.addEventListener("input", render);
    groupSelect.addEventListener("change", render);
    function revealHashTarget() {
      let id;
      try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { return; }
      const product = products.find((entry) => `product-${entry.id}` === id);
      if (!product) return;
      if (groupSelect.value && product.group !== groupSelect.value) groupSelect.value = "";
      if (search.value && !searchable(product).includes(search.value.trim().toLocaleLowerCase())) search.value = "";
      render();
      const detail = document.getElementById(id);
      if (detail) { detail.open = true; detail.scrollIntoView({ block: "start" }); }
    }
    window.addEventListener("hashchange", revealHashTarget);
    document.addEventListener("click", (event) => {
      const link = event.target.closest('a[href^="#product-"]');
      if (link && link.getAttribute("href") === location.hash) revealHashTarget();
    });
    render();
    if (location.hash) revealHashTarget();

    list.addEventListener("toggle", (event) => {
      const detail = event.target.closest("details.product-card");
      if (!detail || !event.target.matches("details.product-card")) return;
      const label = $(".expand-label", detail);
      if (label) label.textContent = detail.open ? "Close assessment −" : "Read the assessment +";
    }, true);
  }

  function renderOpportunities() {
    const list = $("#opportunity-list");
    if (!list) return;
    const opportunities = Array.isArray(data.opportunities) ? data.opportunities : [];
    list.innerHTML = opportunities.length ? opportunities.map((item) => {
      const keys = ["buyer", "trigger", "workflow", "alternatives", "gap", "recurringValue", "borrow", "risks", "experiment", "stop"];
      const headings = { buyer: "Likely buyer", trigger: "When the need appears", workflow: "Proposed workflow", alternatives: "Current alternatives", gap: "Possible gap", recurringValue: "Repeat value", borrow: "Useful patterns", risks: "Risks", experiment: "First test", stop: "Stop if" };
      const body = keys.map((key) => fieldSection(headings[key], item[key], Array.isArray(item[key]))).join("");
      return `<details class="opportunity-card" id="opportunity-${esc(item.id)}"${item.priority === "Test first" ? " open" : ""}><summary><span class="opportunity-priority">${esc(item.priority)}</span><h3>${esc(item.title)}</h3><span class="opportunity-toggle">Read the proposal +</span></summary><div class="opportunity-body">${body}</div></details>`;
    }).join("") : `<p class="empty-state">No opportunity assessments are available.</p>`;
    list.addEventListener("toggle", (event) => {
      const detail = event.target;
      if (!detail.matches || !detail.matches("details.opportunity-card")) return;
      const label = $(".opportunity-toggle", detail);
      if (label) label.textContent = detail.open ? "Close the proposal −" : "Read the proposal +";
    }, true);
  }

  // Preserve Markdown structure while escaping raw HTML and allowing only safe links.
  function renderMarkdown(markdown) {
    if (!window.marked || typeof window.marked.parse !== "function") return `<pre>${esc(markdown)}</pre>`;
    const renderer = new window.marked.Renderer();
    renderer.html = (token) => esc(typeof token === "string" ? token : token.text || "");
    const parsed = window.marked.parse(text(markdown), { renderer, gfm: true, breaks: false, headerIds: false, mangle: false });
    const parsedDoc = new DOMParser().parseFromString(parsed, "text/html");
    const allowed = new Set(["P", "H1", "H2", "H3", "H4", "UL", "OL", "LI", "BLOCKQUOTE", "TABLE", "THEAD", "TBODY", "TR", "TH", "TD", "STRONG", "EM", "DEL", "CODE", "PRE", "A", "BR", "HR"]);
    function clean(node) {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) return;
        if (child.nodeType !== Node.ELEMENT_NODE) { child.remove(); return; }
        const element = child;
        const linkHref = element.tagName === "A" ? element.getAttribute("data-safe-href") : null;
        clean(element);
        if (!allowed.has(element.tagName)) { element.replaceWith(...element.childNodes); return; }
        [...element.attributes].forEach((attr) => element.removeAttribute(attr.name));
        if (element.tagName === "A") {
          const href = safeLink(linkHref || "");
          if (href) { element.href = href; element.target = "_blank"; element.rel = "noopener noreferrer"; }
        }
      });
    }
    // Capture candidate link URLs on each anchor before sanitation; only safe protocols survive.
    parsedDoc.querySelectorAll("a").forEach((anchor) => anchor.setAttribute("data-safe-href", anchor.getAttribute("href") || ""));
    clean(parsedDoc.body);
    return parsedDoc.body.innerHTML;
  }

  function renderNotes() {
    const list = $("#note-list");
    const dialog = $("#note-dialog");
    if (!list) return;
    const notes = Array.isArray(data.notes) ? data.notes : [];
    list.innerHTML = notes.length ? notes.map((note) => {
      const href = safeLink(note.file);
      return `<article class="note-card"><h3>${esc(note.title)}</h3><a class="read-note" href="${href ? esc(href) : "#"}" data-note-id="${esc(note.id)}">Read note</a></article>`;
    }).join("") : `<p class="empty-state">No research notes are available.</p>`;
    if (!dialog) return;
    const title = $("#note-title", dialog);
    const content = $("#note-content", dialog);
    const source = $("#note-source", dialog) || $("#download-note", dialog);
    const close = $("#note-close", dialog) || $("#close-note", dialog);
    if (!content || !title || !source || !close || typeof dialog.showModal !== "function") return;
    let opener = null;
    let generation = 0;
    list.addEventListener("click", async (event) => {
      const link = event.target.closest("a[data-note-id]");
      if (!link) return;
      const note = notes.find((entry) => entry.id === link.dataset.noteId);
      if (!note) return;
      // Keep the direct Markdown link useful when fetch/dialog support is unavailable.
      if (!dialog.showModal || !safeLink(note.file)) return;
      event.preventDefault();
      opener = link;
      title.textContent = note.title;
      source.href = safeLink(note.file);
      source.textContent = "Open the Markdown file";
      if (source.id === "download-note") source.download = "";
      content.textContent = "Loading note…";
      const requestGeneration = ++generation;
      dialog.showModal();
      try {
        const response = await fetch(safeLink(note.file), { credentials: "same-origin" });
        if (!response.ok) throw new Error("Note could not be loaded");
        const markdown = await response.text();
        if (requestGeneration !== generation || !dialog.open) return;
        content.innerHTML = renderMarkdown(markdown);
      } catch (_) {
        if (requestGeneration === generation && dialog.open) content.innerHTML = `This note could not be previewed here. <a href="${esc(safeLink(note.file))}" download>Download the Markdown file</a>.`;
      }
    });
    close.addEventListener("click", () => dialog.close());
    dialog.addEventListener("close", () => { generation += 1; });
    dialog.addEventListener("close", () => { if (opener && opener.isConnected) opener.focus(); });
    dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
  }

  function calculate(input) {
    const required = ["price", "target", "labor", "delivery", "churn", "cac", "fee", "share"];
    if (!input || required.some((key) => input[key] == null || String(input[key]).trim() === "")) {
      return { valid: false, error: "Enter every value. Price and labor rate must be above zero; churn and percentages must be 0–100, and payment fee plus revenue share cannot exceed 100%. Other costs cannot be negative." };
    }
    const price = Number(input.price);
    const target = Number(input.target);
    const labor = Number(input.labor);
    const delivery = Number(input.delivery);
    const churn = Number(input.churn);
    const cac = Number(input.cac);
    const fee = Number(input.fee);
    const share = Number(input.share);
    const values = [price, target, labor, delivery, churn, cac, fee, share];
    if (!values.every(Number.isFinite) || price <= 0 || labor <= 0 || delivery < 0 || churn < 0 || churn > 100 || cac < 0 || target < 0 || target > 100 || fee < 0 || fee > 100 || share < 0 || share > 100 || fee + share > 100) {
      return { valid: false, error: "Enter every value. Price and labor rate must be above zero; churn and percentages must be 0–100, and payment fee plus revenue share cannot exceed 100%. Other costs cannot be negative." };
    }
    const feeRate = fee / 100;
    const shareRate = share / 100;
    const targetRate = target / 100;
    const contribution = price * (1 - feeRate - shareRate) - delivery - (churn / 100) * cac;
    const allowance = contribution - price * targetRate;
    return { valid: true, contribution, allowance, minutes: (allowance / labor) * 60 };
  }
  window.deepDiveMath = { calculate };

  function renderEconomics() {
    const economics = data.economics;
    const preset = $("#econ-preset");
    const formIds = ["price", "target", "labor", "delivery", "churn", "cac", "fee", "share"];
    const inputs = Object.fromEntries(formIds.map((key) => [key, $(`#econ-${key}`)]));
    const allowanceEl = $("#econ-allowance");
    const contributionEl = $("#econ-contribution");
    const statusEl = $("#econ-status");
    const explanationEl = $("#econ-explanation");
    const chart = $("#support-chart");
    if (!economics || !preset || !allowanceEl || !contributionEl || !statusEl || !explanationEl || !chart) return;
    const scenarios = Array.isArray(economics.scenarios) ? economics.scenarios : [];
    const initialPreset = preset.value || "1";
    preset.replaceChildren(...scenarios.map((scenario, index) => new Option(scenario.label, String(index))));
    preset.value = scenarios[Number(initialPreset)] ? initialPreset : (scenarios[1] ? "1" : "0");
    const money = (number) => new Intl.NumberFormat(undefined, { style: "currency", currency: economics.currency || "USD", maximumFractionDigits: 2 }).format(number);
    const applyPreset = () => {
      const scenario = scenarios[Number(preset.value)];
      if (!scenario) return;
      if (inputs.delivery) inputs.delivery.value = scenario.deliveryCostUSD;
      if (inputs.churn) inputs.churn.value = (scenario.monthlyLogoChurnRate * 100).toString();
      if (inputs.cac) inputs.cac.value = scenario.allInCACUSD;
      if (inputs.fee) inputs.fee.value = ((economics.shopifyProcessingRate || 0) * 100).toString();
      if (inputs.share) inputs.share.value = ((economics.shopifyRevenueShareRateAssumed || 0) * 100).toString();
    };
    const update = () => {
      const values = Object.fromEntries(formIds.map((key) => [key, inputs[key] ? inputs[key].value : ""]));
      const result = calculate(values);
      if (!result.valid) {
        statusEl.textContent = result.error;
        statusEl.dataset.state = "invalid";
        allowanceEl.textContent = "—";
        contributionEl.textContent = "—";
        explanationEl.textContent = "Correct the inputs to see the estimate.";
        chart.innerHTML = "";
        return;
      }
      const price = Number(values.price);
      const targetDollars = price * Number(values.target) / 100;
      allowanceEl.textContent = result.allowance < 0 ? "Target missed" : `${result.minutes.toFixed(1)} min`;
      contributionEl.textContent = money(result.contribution);
      statusEl.dataset.state = result.allowance < 0 ? "below-target" : "at-target";
      statusEl.textContent = result.allowance < 0 ? `Target missed by ${money(Math.abs(result.allowance))} before extra support.` : `${money(result.allowance)} remains for support while meeting the target.`;
      explanationEl.textContent = `${money(result.contribution)} contribution before extra support against ${money(targetDollars)} required at the selected target margin. This is a hypothetical sensitivity, not a forecast; listed costs only.`;

      const chosen = scenarios[Number(preset.value)];
      const rows = scenarios.map((scenario) => {
        const row = calculate({ ...values, delivery: scenario.deliveryCostUSD, churn: scenario.monthlyLogoChurnRate * 100, cac: scenario.allInCACUSD });
        return { scenario, row };
      });
      const maxMinutes = Math.max(1, ...rows.map(({ row }) => row.valid ? Math.max(row.minutes, 0) : 0));
      chart.innerHTML = rows.map(({ scenario, row }) => {
        if (!row.valid) return "";
        const width = row.minutes > 0 ? Math.min(100, Math.max(1, row.minutes / maxMinutes * 100)) : 0;
        const value = row.allowance < 0 ? `Target missed by ${money(Math.abs(row.allowance))} before extra support` : `${row.minutes.toFixed(1)} support minutes at target`;
        return `<div class="support-row"><div class="support-row-heading"><strong>${esc(scenario.label)}</strong><span>${esc(value)}</span></div><div class="support-track" role="img" aria-label="${esc(scenario.label)}: ${esc(value)}"><span class="support-bar" style="width:${width}%"></span></div><small>${esc(scenario.assumptionsNote)}${chosen === scenario ? " Current preset" : ""}</small></div>`;
      }).join("");
    };
    applyPreset();
    preset.addEventListener("change", () => { applyPreset(); update(); });
    Object.values(inputs).forEach((input) => input && input.addEventListener("input", update));
    update();
  }

  function init() {
    renderProducts();
    renderOpportunities();
    renderNotes();
    renderEconomics();
    const print = $("#print-deep-dive");
    if (print) print.addEventListener("click", () => window.print());
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
