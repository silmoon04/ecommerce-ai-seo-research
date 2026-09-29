(function () {
  "use strict";
  const data = window.quietFandomResearch || {};
  const visuals = data.visuals || {};
  const items = [];
  const viewer = document.querySelector("#media-viewer");
  let current = 0;
  let returnFocus = null;

  function url(value) {
    if (typeof value !== "string" || !value.trim()) return null;
    try {
      const result = new URL(value, document.baseURI);
      return ["https:", "http:"].includes(result.protocol) && !result.username && !result.password ? result.href : null;
    } catch (_) { return null; }
  }
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }
  function disclosure(asset) {
    if (asset.kind === "reference") return "Official product photo";
    if (asset.kind === "illustration") return "AI-generated illustration";
    if (asset.kind === "board") return "AI-generated concept board, not a manufactured sample";
    return "AI-generated styling concept";
  }
  function sourceLink(asset, className) {
    const href = url(asset.source);
    if (!href) return null;
    const link = element("a", className, "View the original product");
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
  }

  function figure(asset, variant, eager = false) {
    if (!asset || !url(asset.image)) return null;
    const index = items.length;
    items.push(asset);
    const root = element("figure", `media-figure media-${variant}`);
    if (asset.id) root.id = `visual-${asset.id}`;
    const frame = element("div", "media-frame");
    const width = Number(asset.width) > 0 ? Number(asset.width) : 1200;
    const height = Number(asset.height) > 0 ? Number(asset.height) : 1200;
    frame.style.setProperty("--media-ratio", `${width} / ${height}`);
    const button = element("button", "media-trigger");
    button.type = "button";
    button.setAttribute("aria-label", `Enlarge image: ${asset.title}`);
    const img = document.createElement("img");
    img.alt = asset.alt || asset.title;
    img.width = width;
    img.height = height;
    img.loading = eager ? "eager" : "lazy";
    img.decoding = "async";
    if (eager) img.fetchPriority = "high";
    const error = element("div", "media-error");
    error.hidden = true;
    error.append(element("p", "", "This photo could not load."));
    const fallback = sourceLink(asset, "");
    if (fallback) error.append(fallback);
    img.addEventListener("load", () => { img.classList.add("is-loaded"); });
    img.addEventListener("error", () => { button.hidden = true; error.hidden = false; });
    img.src = url(asset.image);
    const enlarge = element("span", "media-enlarge", "Enlarge");
    enlarge.setAttribute("aria-hidden", "true");
    button.append(img, enlarge);
    button.addEventListener("click", () => openViewer(index, button));
    frame.append(button, error);
    const caption = element("figcaption", "");
    if (asset.subtitle) caption.append(element("p", "media-subtitle", asset.subtitle.replace(/^\d+\s*\/\s*/, "")));
    caption.append(element("h3", "", asset.title));
    if (asset.caption || asset.description) caption.append(element("p", "", asset.caption || asset.description));
    caption.append(element("p", "media-disclosure", disclosure(asset)));
    if (asset.credit) caption.append(element("p", "media-credit", `Photo: ${asset.credit}`));
    const source = sourceLink(asset, "media-source");
    if (source) caption.append(source);
    root.append(frame, caption);
    return root;
  }

  const hero = document.querySelector("#fandom-hero-visual");
  const heroFigure = figure(visuals.hero, "hero", true);
  if (hero && heroFigure) { hero.replaceChildren(heroFigure); hero.hidden = false; }
  const gallery = document.querySelector("#concept-gallery");
  if (gallery && Array.isArray(data.concepts)) {
    gallery.replaceChildren();
    data.concepts.forEach((board, index) => {
      const pair = element("div", "concept-pair");
      const outfit = figure(visuals.lookbook?.[index], "lookbook");
      const concept = figure({ ...board, kind: "board" }, "board");
      if (outfit) pair.append(outfit);
      if (concept) pair.append(concept);
      gallery.append(pair);
    });
  }

  function group(headingId, assets, variant, note) {
    const heading = document.getElementById(headingId);
    if (!heading || !assets?.length) return;
    const wrapper = element("div", `media-group media-${variant}`);
    if (note) wrapper.append(element("p", "media-group-note", note));
    const grid = element("div", `media-grid media-grid-${variant}`);
    assets.forEach(asset => { const media = figure(asset, variant); if (media) grid.append(media); });
    if (!grid.children.length) return;
    wrapper.append(grid);
    heading.after(wrapper);
  }
  group("brands-to-study-and-principles-to-adapt", visuals.references, "references", "Real products from the brands in the comparison. Study placement, silhouette and finish; these are reference products, not our designs.");
  group("buy-samples-for-the-garment-not-the-marketing-adjective", visuals.blanks, "blanks", "The actual supplier photographs help make the garment shortlist concrete. Our own fit and wash checks still need physical samples.");
  group("a-style-with-room-to-develop", visuals.materials, "materials", "Texture and decoration are part of the design. These illustrations show what to investigate with a printer or embroiderer.");
  group("a-small-quality-check-before-launch", visuals.quality ? [visuals.quality] : [], "single", "");
  group("affordable-acquisition-that-fits-the-clothes", visuals.acquisition ? [visuals.acquisition] : [], "single", "");
  group("the-first-collection-and-the-decision-to-continue", visuals.styling ? [visuals.styling] : [], "single", "");

  function renderViewer() {
    const asset = items[current];
    const stage = document.querySelector("#media-viewer-stage");
    const img = document.querySelector("#media-viewer-image");
    const loading = document.querySelector("#media-viewer-loading");
    const fallback = document.querySelector("#media-viewer-fallback");
    const link = document.querySelector("#media-viewer-source");
    const fallbackLink = document.querySelector("#media-viewer-fallback-link");
    document.querySelector("#media-viewer-position").textContent = `Image ${current + 1} of ${items.length}`;
    document.querySelector("#media-viewer-title").textContent = asset.title;
    document.querySelector("#media-viewer-caption").textContent = asset.caption || asset.description || "";
    document.querySelector("#media-viewer-disclosure").textContent = disclosure(asset);
    document.querySelector("#media-viewer-credit").textContent = asset.credit ? `Photo: ${asset.credit}` : "";
    const source = url(asset.source);
    link.hidden = !source;
    fallbackLink.hidden = !source;
    if (source) { link.href = source; fallbackLink.href = source; fallbackLink.target = "_blank"; fallbackLink.rel = "noopener noreferrer"; }
    img.hidden = true;
    fallback.hidden = true;
    loading.hidden = false;
    stage.setAttribute("aria-busy", "true");
    img.onload = () => { img.hidden = false; loading.hidden = true; stage.setAttribute("aria-busy", "false"); };
    img.onerror = () => { img.hidden = true; loading.hidden = true; fallback.hidden = false; stage.setAttribute("aria-busy", "false"); };
    img.alt = asset.alt || asset.title;
    img.src = url(asset.image);
    document.querySelector("#media-viewer-previous").disabled = current === 0;
    document.querySelector("#media-viewer-next").disabled = current === items.length - 1;
  }
  function openViewer(index, trigger) {
    if (!viewer) return;
    current = index;
    returnFocus = trigger;
    renderViewer();
    viewer.showModal();
    document.body.classList.add("media-viewer-open");
    document.querySelector("#media-viewer-close").focus();
  }
  function step(direction) {
    const next = current + direction;
    if (next < 0 || next >= items.length) return;
    current = next;
    renderViewer();
  }
  if (viewer) {
    document.querySelector("#media-viewer-close").addEventListener("click", () => viewer.close());
    document.querySelector("#media-viewer-previous").addEventListener("click", () => step(-1));
    document.querySelector("#media-viewer-next").addEventListener("click", () => step(1));
    viewer.addEventListener("keydown", event => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); step(event.key === "ArrowLeft" ? -1 : 1); }
    });
    viewer.addEventListener("close", () => {
      document.body.classList.remove("media-viewer-open");
      if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    });
  }
})();
