(function () {
  "use strict";

  const data = window.quietFandomResearch || {};
  const article = document.querySelector("#assessment");
  const string = (value) => value == null ? "" : String(value);
  const escape = (value) => string(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[character]);

  function safeHref(raw, base = document.baseURI) {
    if (typeof raw !== "string" || !raw.trim()) return null;
    try {
      const url = new URL(raw, base);
      if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) return null;
      return url.href;
    } catch (_) { return null; }
  }

  function markdown(value) {
    if (!window.marked || typeof window.marked.parse !== "function") return `<p>${escape(value).replace(/\n/g, "<br>")}</p>`;
    const renderer = new window.marked.Renderer();
    renderer.html = (token) => escape(typeof token === "string" ? token : token.text || "");
    let parsed;
    try { parsed = window.marked.parse(string(value), { renderer, gfm: true, breaks: false }); }
    catch (_) { return `<p>${escape(value)}</p>`; }
    const fragment = new DOMParser().parseFromString(parsed, "text/html");
    if (fragment.body.firstElementChild?.tagName === "H1") fragment.body.firstElementChild.remove();
    const allowed = new Set(["P", "H1", "H2", "H3", "H4", "H5", "H6", "UL", "OL", "LI", "BLOCKQUOTE", "TABLE", "THEAD", "TBODY", "TFOOT", "TR", "TH", "TD", "STRONG", "EM", "DEL", "CODE", "PRE", "A", "BR", "HR"]);
    function clean(parent) {
      [...parent.childNodes].forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) return;
        if (child.nodeType !== Node.ELEMENT_NODE) { child.remove(); return; }
        const tag = child.tagName;
        const href = tag === "A" ? safeHref(child.getAttribute("href")) : null;
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
        if (tag === "H1") {
          const heading = fragment.createElement("h2");
          heading.append(...child.childNodes);
          child.replaceWith(heading);
        }
      });
    }
    clean(fragment.body);
    fragment.querySelectorAll("table").forEach((table, index) => {
      const wrapper = fragment.createElement("div");
      wrapper.className = "store-table-scroll";
      wrapper.tabIndex = 0;
      wrapper.setAttribute("role", "region");
      const firstHeader = table.querySelector("th");
      wrapper.setAttribute("aria-label", firstHeader ? `Scrollable table: ${firstHeader.textContent.trim()}` : `Scrollable table ${index + 1}`);
      table.replaceWith(wrapper);
      wrapper.append(table);
    });
    return fragment.body.innerHTML;
  }

  if (typeof data.assessmentMarkdown === "string" && data.assessmentMarkdown.trim()) {
    article.innerHTML = markdown(data.assessmentMarkdown);
  } else {
    article.innerHTML = '<p class="store-fallback">The research could not load. Reload this page or read the published research notes below.</p>';
  }

  const date = typeof data.date === "string" ? data.date.slice(0, 10) : "";
  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const parsed = new Date(`${date}T12:00:00Z`);
    if (!Number.isNaN(parsed.getTime())) {
      const time = document.querySelector("#research-date");
      time.dateTime = date;
      time.textContent = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(parsed);
    }
  }

  const nav = document.querySelector("#chapter-links");
  const usedIds = new Set([...document.querySelectorAll("[id]")].map((element) => element.id));
  const headings = [...article.querySelectorAll("h2")];
  nav.replaceChildren();
  function chapterLink(id, title) {
    const link = document.createElement("a");
    link.href = `#${id}`;
    link.textContent = title;
    nav.append(link);
  }
  chapterLink("concepts", "The visual directions");
  chapterLink("assessment", "The research");
  headings.forEach((heading, index) => {
    const slug = heading.textContent.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `section-${index + 1}`;
    let id = slug;
    let suffix = 2;
    while (usedIds.has(id)) id = `${slug}-${suffix++}`;
    heading.id = id;
    usedIds.add(id);
    chapterLink(id, heading.textContent);
  });
  chapterLink("economics", "The order economics");
  chapterLink("notes", "Full research notes");

  const notes = Array.isArray(data.notes) ? data.notes : [];
  const noteList = document.querySelector("#note-list");
  noteList.replaceChildren();
  notes.forEach((note, index) => {
    if (!note || typeof note !== "object") return;
    const href = safeHref(note.file);
    if (!href || new URL(href).origin !== location.origin) return;
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = href;
    const number = document.createElement("span");
    number.className = "note-number";
    number.setAttribute("aria-hidden", "true");
    number.textContent = String(index + 1).padStart(2, "0");
    const title = document.createElement("strong");
    title.textContent = string(note.title || "Research note");
    const format = document.createElement("span");
    format.className = "note-format";
    format.textContent = "Read Markdown";
    link.append(number, title, format);
    item.append(link);
    noteList.append(item);
  });
  if (!noteList.children.length) {
    const item = document.createElement("li");
    item.className = "data-pending";
    item.textContent = "The note links could not load. Reload this page to try again.";
    noteList.append(item);
  }

  const gallery = document.querySelector("#concept-gallery");
  const concepts = Array.isArray(data.concepts) ? data.concepts : [];
  gallery.replaceChildren();
  concepts.forEach((concept, index) => {
    if (!concept || typeof concept !== "object") return;
    const figure = document.createElement("figure");
    figure.className = "concept-figure";
    const href = safeHref(concept.image);
    const title = string(concept.title || `Concept ${index + 1}`);
    if (href && new URL(href).origin === location.origin) {
      const link = document.createElement("a");
      link.className = "concept-image-link";
      link.href = href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.setAttribute("aria-label", `View full concept: ${title} (opens in a new tab)`);
      const image = document.createElement("img");
      image.src = href;
      image.alt = string(concept.alt || title);
      image.loading = index === 0 ? "eager" : "lazy";
      image.decoding = "async";
      const hint = document.createElement("span");
      hint.className = "concept-zoom";
      hint.textContent = "View full concept";
      hint.setAttribute("aria-hidden", "true");
      link.append(image, hint);
      figure.append(link);
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "concept-image-link";
      const message = document.createElement("p");
      message.className = "concept-missing";
      message.textContent = "The concept image is unavailable.";
      placeholder.append(message);
      figure.append(placeholder);
    }
    const caption = document.createElement("figcaption");
    const subtitle = document.createElement("p");
    subtitle.className = "concept-subtitle";
    subtitle.textContent = string(concept.subtitle);
    const heading = document.createElement("h3");
    heading.textContent = title;
    const description = document.createElement("p");
    description.className = "concept-description";
    description.textContent = string(concept.description);
    const disclosure = document.createElement("small");
    disclosure.textContent = "AI-generated concept board, not a manufactured sample";
    caption.append(subtitle, heading, description, disclosure);
    figure.append(caption);
    gallery.append(figure);
  });
  if (!gallery.children.length) {
    const message = document.createElement("p");
    message.className = "data-pending";
    message.textContent = "The concept images could not load. Reload this page to try again.";
    gallery.append(message);
  }

  function calculateContribution(values, fees) {
    const paymentFee = values.price * fees.percent / 100 + fees.fixed;
    const rawContribution = values.price - values.production - values.shipping - paymentFee - values.reserve - values.acquisition;
    const contribution = Number(rawContribution.toFixed(8)) || 0;
    return {
      paymentFee,
      contribution,
      breakEven: contribution > 0 ? Math.ceil(values.fixed / contribution) : null
    };
  }

  const economics = data.economics && typeof data.economics === "object" ? data.economics : {};
  const inputNames = ["price", "production", "shipping", "reserve", "acquisition", "fixed"];
  const inputs = inputNames.map((name) => document.querySelector(`#cash-${name}`));
  const finiteNonnegative = (value) => typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 1000000;
  const defaultsReady = inputNames.every((name) => finiteNonnegative(economics[name])) && finiteNonnegative(economics.feePct) && economics.feePct <= 100 && finiteNonnegative(economics.feeFixed);
  const fees = { percent: economics.feePct, fixed: economics.feeFixed };
  const currency = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const count = new Intl.NumberFormat("en-GB", { maximumFractionDigits: 0 });
  const feeAssumptions = document.querySelector("#fee-assumptions");
  const contributionOutput = document.querySelector("#result-contribution");
  const breakEvenOutput = document.querySelector("#result-break-even");
  const status = document.querySelector("#economics-status");
  const form = document.querySelector("#economics-form");
  const reset = document.querySelector("#reset-economics");
  const composition = document.querySelector("#cash-composition");
  const compositionTrack = document.querySelector("#cash-composition-track");
  const compositionCaption = document.querySelector("#cash-composition-caption");
  const paymentMarker = document.querySelector("#cash-payment-marker");
  const lossRange = document.querySelector("#cash-loss-range");

  function updateComposition(values, result) {
    const costs = {
      production: values.production,
      shipping: values.shipping,
      paymentFee: result.paymentFee,
      reserve: values.reserve,
      acquisition: values.acquisition,
      contribution: Math.max(0, result.contribution)
    };
    const totalCost = values.production + values.shipping + result.paymentFee + values.reserve + values.acquisition;
    const scale = Math.max(values.price, totalCost);
    const loss = Math.max(0, -result.contribution);
    composition.hidden = false;
    composition.classList.toggle("is-loss", loss > 0);
    Object.entries(costs).forEach(([key, value]) => {
      composition.querySelector(`[data-cost-segment="${key}"]`).style.width = `${scale > 0 ? value / scale * 100 : 0}%`;
      composition.querySelector(`[data-cost-value="${key}"]`).textContent = currency.format(value);
    });
    compositionTrack.style.setProperty("--cash-payment-position", `${scale > 0 ? values.price / scale * 100 : 0}%`);
    paymentMarker.hidden = scale === 0;
    lossRange.hidden = loss === 0;
    document.querySelector("#cash-composition-totals").textContent = `Payment ${currency.format(values.price)} / variable costs ${currency.format(totalCost)}`;
    const scaleNote = "The line marks customer payment. The bar scales to the larger of payment or variable costs.";
    compositionCaption.textContent = loss > 0
      ? `Costs exceed payment by ${currency.format(loss)}. The dashed area shows the shortfall. ${scaleNote}`
      : scale === 0 ? "No customer payment or variable costs are entered." : scaleNote;
    compositionTrack.setAttribute("aria-label", `Customer payment ${currency.format(values.price)}. Production ${currency.format(costs.production)}, outbound shipping ${currency.format(costs.shipping)}, payment fee ${currency.format(costs.paymentFee)}, loss reserve ${currency.format(costs.reserve)}, acquisition ${currency.format(costs.acquisition)}, positive contribution ${currency.format(costs.contribution)}.${loss > 0 ? ` Costs exceed payment by ${currency.format(loss)}.` : ""}`);
  }

  function showResults(contribution, breakEven, isMessage = false, isNegative = false) {
    contributionOutput.textContent = contribution;
    breakEvenOutput.textContent = breakEven;
    contributionOutput.parentElement.classList.toggle("is-message", isMessage);
    contributionOutput.parentElement.classList.toggle("is-negative", isNegative);
    breakEvenOutput.parentElement.classList.toggle("is-message", typeof breakEven !== "string" || !/^[\d,]+$/.test(breakEven));
  }

  function updateEconomics() {
    if (!defaultsReady) return;
    const values = {};
    const invalid = [];
    inputs.forEach((input) => {
      const valid = input.value !== "" && input.validity.valid && Number.isFinite(input.valueAsNumber);
      input.setAttribute("aria-invalid", String(!valid));
      if (valid) values[input.name] = input.valueAsNumber;
      else invalid.push(input);
    });
    status.classList.toggle("is-error", invalid.length > 0);
    if (invalid.length) {
      composition.hidden = true;
      showResults("Enter assumptions", "Enter assumptions", true);
      status.textContent = "Enter an amount from £0 to £1,000,000, with no more than two decimal places, in every field.";
      feeAssumptions.textContent = `Payment fee assumption: ${fees.percent}% + ${currency.format(fees.fixed)} per order.`;
      return;
    }
    const result = calculateContribution(values, fees);
    updateComposition(values, result);
    const orders = result.breakEven === null ? "No break-even at these inputs" : count.format(result.breakEven);
    showResults(currency.format(result.contribution), orders, false, result.contribution < 0);
    feeAssumptions.textContent = `Payment fee assumption: ${fees.percent}% + ${currency.format(fees.fixed)} per order. Calculated fee: ${currency.format(result.paymentFee)}.`;
    if (result.contribution < 0) {
      status.textContent = `Each order uses ${currency.format(-result.contribution)} of cash before monthly fixed costs and founder labour. More orders increase that shortfall at these inputs.`;
    } else if (result.contribution === 0) {
      status.textContent = "Each order leaves £0.00 toward monthly fixed costs or founder labour. There is no break-even at these inputs.";
    } else if (values.fixed === 0) {
      status.textContent = `Each order leaves ${currency.format(result.contribution)} before founder labour. No monthly fixed costs are entered; this does not establish business profitability.`;
    } else {
      status.textContent = `${currency.format(result.contribution)} contribution per order. ${count.format(result.breakEven)} orders cover the ${currency.format(values.fixed)} monthly fixed costs entered, before founder labour.`;
    }
  }

  function resetEconomics() {
    if (!defaultsReady) return;
    inputs.forEach((input) => { input.value = economics[input.name]; });
    updateEconomics();
  }
  form.addEventListener("submit", (event) => event.preventDefault());
  form.addEventListener("input", updateEconomics);
  reset.addEventListener("click", resetEconomics);
  if (defaultsReady) {
    resetEconomics();
  } else {
    inputs.forEach((input) => { input.disabled = true; });
    reset.disabled = true;
    feeAssumptions.textContent = "The payment fee assumptions could not load.";
    showResults("Unavailable", "Unavailable", true);
    status.classList.add("is-error");
    status.textContent = "The calculator assumptions could not load. Reload this page or consult the economics research notes.";
  }

  const menu = document.querySelector("#chapter-menu");
  const compact = window.matchMedia("(max-width: 800px)");
  const fitMenu = () => { menu.open = !compact.matches; };
  fitMenu();
  compact.addEventListener("change", fitMenu);
  nav.addEventListener("click", (event) => {
    if (compact.matches && event.target.closest("a")) menu.open = false;
  });

  const links = [...nav.querySelectorAll("a")];
  const targets = links.map((link) => document.getElementById(link.hash.slice(1))).filter(Boolean);
  let framePending = false;
  function updateActiveChapter() {
    framePending = false;
    let active = targets[0];
    targets.forEach((target) => { if (target.getBoundingClientRect().top <= 120) active = target; });
    links.forEach((link) => {
      const current = link.hash === `#${active?.id}`;
      link.classList.toggle("active", current);
      if (current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  window.addEventListener("scroll", () => {
    if (!framePending) { framePending = true; requestAnimationFrame(updateActiveChapter); }
  }, { passive: true });
  updateActiveChapter();
  document.querySelector("#print-report").addEventListener("click", () => window.print());

  if (location.hash) {
    let id;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (_) { id = ""; }
    const target = document.getElementById(id);
    if (target) requestAnimationFrame(() => target.scrollIntoView());
  }
})();
