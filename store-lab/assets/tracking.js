/* Optional, memory-only preview audit. This file has no network transport. */
(function (root, factory) {
  const api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.CommerceMetrics = api;
})(typeof window === 'undefined' ? null : window, function (root) {
  'use strict';
  const products = Object.freeze(['market-day', 'museum-key', 'recipe-archive', 'quiz-host', 'touchline', 'fold-street', 'route-story', 'four-bed', 'swatch-repeat', 'companion-print']);
  const names = new Set(['page_view', 'view_item', 'view_item_list', 'select_item', 'add_to_cart', 'remove_from_cart', 'view_cart', 'begin_checkout', 'preview_checkout', 'tool_start', 'tool_complete', 'tool_error', 'experiment_exposure', 'select_content', 'download_output', 'purchase', 'refund']);
  const enums = {
    store: products, product: products, sku: products, tool: products,
    experiment: ['none', 'price-display', 'value-copy', 'format-choice', 'preview-flow', 'catalogue', 'launch-copy'],
    variant: ['control', 'challenger', 'original', 'a', 'b', 'A', 'B'],
    action: ['open', 'close', 'start', 'complete', 'error', 'download', 'reset', 'select', 'add', 'remove', 'checkout', 'accept', 'refuse'],
    page: ['catalogue', 'product', 'cart', 'tool', 'checkout', 'measurement'],
    currency: ['GBP']
  };
  const keys = new Set([...Object.keys(enums), 'value', 'quantity', 'simulated']);
  const cartKey = 'commerce-preview-essential-cart-v1';
  let consent = false;
  let mode = 'local_qa';
  let events = [];
  let cart = [];
  const copy = (value) => JSON.parse(JSON.stringify(value));

  function validate(name, payload) {
    if (!names.has(name)) return { ok: false, reason: 'unknown_event' };
    if (!payload || Object.getPrototypeOf(payload) !== Object.prototype) return { ok: false, reason: 'invalid_payload' };
    if (Reflect.ownKeys(payload).some(key => typeof key !== 'string' || !keys.has(key))) return { ok: false, reason: 'forbidden_field' };
    if (!products.includes(payload.store)) return { ok: false, reason: 'unknown_store' };
    for (const [key, value] of Object.entries(payload)) {
      if (enums[key] && !enums[key].includes(value)) return { ok: false, reason: 'invalid_enum' };
      if (key === 'value' && (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 100000 || Math.abs(value * 100 - Math.round(value * 100)) > 0.000001)) return { ok: false, reason: 'invalid_value' };
      if (key === 'quantity' && (!Number.isInteger(value) || value < 1 || value > 100)) return { ok: false, reason: 'invalid_quantity' };
      if (key === 'simulated' && typeof value !== 'boolean') return { ok: false, reason: 'invalid_simulation_flag' };
    }
    if ('value' in payload && payload.currency !== 'GBP') return { ok: false, reason: 'currency_required' };
    if ((name === 'purchase' || name === 'refund') && payload.simulated !== true) return { ok: false, reason: 'simulation_required' };
    if (payload.product && payload.product !== payload.store) return { ok: false, reason: 'product_store_mismatch' };
    if (payload.sku && payload.sku !== payload.store) return { ok: false, reason: 'sku_store_mismatch' };
    return { ok: true };
  }

  function record(name, payload) {
    const result = validate(name, payload);
    if (!result.ok) return result;
    if (!consent) return { ok: false, reason: 'consent_refused' };
    if (events.length >= 2000) return { ok: false, reason: 'memory_limit' };
    const simulated = mode === 'simulation' || payload.simulated === true;
    const event = { name, ...copy(payload), simulated, environment: simulated ? 'simulation' : 'local_qa', timestamp_utc: new Date().toISOString() };
    events.push(event);
    return { ok: true, event: copy(event) };
  }

  function setConsent(accepted) {
    if (typeof accepted !== 'boolean') throw new TypeError('Consent must be a boolean');
    consent = accepted;
    if (!consent) events = [];
    if (root && typeof root.CustomEvent === 'function') root.dispatchEvent(new root.CustomEvent('commerce:consent', { detail: { accepted } }));
    return consent;
  }

  function validCart(items) {
    if (!Array.isArray(items) || items.length > products.length) return false;
    const seen = new Set();
    return items.every(item => {
      if (!item || Object.getPrototypeOf(item) !== Object.prototype || Reflect.ownKeys(item).length !== 2 || !Object.hasOwn(item, 'sku') || !Object.hasOwn(item, 'quantity')) return false;
      if (!products.includes(item.sku) || seen.has(item.sku) || !Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 100) return false;
      seen.add(item.sku);
      return true;
    });
  }

  function setCart(items) {
    if (!validCart(items)) throw new TypeError('Cart accepts catalogue SKU and quantity only');
    cart = copy(items);
    try { if (root) root.localStorage.setItem(cartKey, JSON.stringify(cart)); } catch (_) { /* The cart still works in memory. */ }
    return copy(cart);
  }

  function getCart() {
    try {
      if (root) {
        const stored = JSON.parse(root.localStorage.getItem(cartKey) || '[]');
        if (validCart(stored)) cart = stored;
        else root.localStorage.removeItem(cartKey);
      }
    } catch (_) { /* Storage can be disabled by the browser. */ }
    return copy(cart);
  }

  return Object.freeze({
    record, validate, setConsent, getConsent: () => consent, setCart, getCart,
    setMode: (next) => { if (!['local_qa', 'simulation'].includes(next)) throw new TypeError('Only local_qa and simulation modes are supported'); mode = next; return mode; },
    clearQA: () => { events = []; },
    exportQA: () => ({ schema_version: 1, scope: 'local_preview_only', consent, network_sink: 'none', attribution: 'unknown', events: copy(events) }),
    catalogue: products
  });
});
