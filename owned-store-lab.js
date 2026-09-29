(function () {
  "use strict";

  const data = window.ownedStoreResearch || {};
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
    article.innerHTML = '<p class="store-fallback">The assessment could not load. Reload this page or read the published research notes below.</p>';
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
  chapterLink("assessment", "The assessment");
  headings.forEach((heading, index) => {
    const slug = heading.textContent.toLowerCase().normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || `section-${index + 1}`;
    let id = slug;
    let suffix = 2;
    while (usedIds.has(id)) id = `${slug}-${suffix++}`;
    heading.id = id;
    usedIds.add(id);
    chapterLink(id, heading.textContent);
  });
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
