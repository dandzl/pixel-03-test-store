'use strict';

// Demo commerce stays in this tab. No checkout API or tracking event calls.
const trialId = new URLSearchParams(location.search).get('trialID') || '';
const storageKey = 'sunny-side-demo:' + (trialId || 'default');
const storeRoot = new URL('.', document.currentScript.src);
const unitPrice = 900;
const maxQuantity = 20;
const money = cents => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(cents / 100);
const validQuantity = value => Number.isInteger(value) && value >= 0 && value <= maxQuantity;
const urlFor = path => {
  const url = new URL(path, storeRoot);
  if (trialId) url.searchParams.set('trialID', trialId);
  return url.href;
};
const validReceipt = receipt => receipt && /^DEMO-[A-F0-9]{8}$/.test(receipt.id) && validQuantity(receipt.quantity) && receipt.quantity > 0;
let state = { quantity: 0, receipt: null };
try {
  const saved = JSON.parse(sessionStorage.getItem(storageKey));
  if (saved && validQuantity(saved.quantity)) {
    state = { quantity: saved.quantity, receipt: validReceipt(saved.receipt) ? saved.receipt : null };
  }
} catch { /* Invalid or unavailable tab storage starts with an empty cart. */ }

function saveState(next) {
  try {
    sessionStorage.setItem(storageKey, JSON.stringify(next));
    state = next;
    return true;
  } catch {
    document.querySelectorAll('[data-store-status]').forEach(element => {
      element.textContent = 'Your browser could not save the demo cart. Allow session storage to continue.';
    });
    return false;
  }
}

document.querySelectorAll('a[data-store-link]').forEach(link => {
  if (trialId) {
    const url = new URL(link.href);
    url.searchParams.set('trialID', trialId);
    link.href = url.href;
  }
});

function renderCart() {
  document.querySelectorAll('[data-cart-count]').forEach(element => { element.textContent = String(state.quantity); });
  document.querySelectorAll('[data-item-count]').forEach(element => { element.textContent = state.quantity + (state.quantity === 1 ? ' bar' : ' bars'); });
  document.querySelectorAll('[data-cart-total]').forEach(element => { element.textContent = money(state.quantity * unitPrice); });
  document.querySelectorAll('[data-cart-body]').forEach(element => { element.hidden = state.quantity === 0; });
  document.querySelectorAll('[data-empty-cart]').forEach(element => { element.hidden = state.quantity !== 0; });
  const cartQuantity = document.querySelector('#cart-quantity');
  if (cartQuantity) cartQuantity.value = state.quantity;
  const decrease = document.querySelector('#cart-decrease');
  const increase = document.querySelector('#cart-increase');
  if (decrease) decrease.disabled = state.quantity <= 1;
  if (increase) increase.disabled = state.quantity >= maxQuantity;
  const placeOrder = document.querySelector('#place-order');
  if (placeOrder) placeOrder.disabled = state.quantity === 0;
}

const productForm = document.querySelector('#add-form');
if (productForm) {
  const quantity = document.querySelector('#quantity');
  const readQuantity = () => Math.min(maxQuantity, Math.max(1, Number.parseInt(quantity.value, 10) || 1));
  document.querySelector('#decrease').addEventListener('click', () => { quantity.value = Math.max(1, readQuantity() - 1); });
  document.querySelector('#increase').addEventListener('click', () => { quantity.value = Math.min(maxQuantity, readQuantity() + 1); });
  quantity.addEventListener('change', () => { quantity.value = readQuantity(); });
  productForm.addEventListener('submit', event => {
    event.preventDefault();
    const added = Math.min(readQuantity(), maxQuantity - state.quantity);
    if (!added) {
      document.querySelector('#cart-status').textContent = 'Your demo cart has reached the 20-bar limit.';
      return;
    }
    if (!saveState({ ...state, quantity: state.quantity + added })) return;
    renderCart();
    document.querySelector('#cart-status').textContent = `${added} ${added === 1 ? 'bar' : 'bars'} added to your cart. Your demo total is ${money(state.quantity * unitPrice)}.`;
    document.querySelector('#view-cart').hidden = false;
  });
}

const cartQuantity = document.querySelector('#cart-quantity');
if (cartQuantity) {
  const updateQuantity = value => {
    const next = Math.min(maxQuantity, Math.max(1, Number.parseInt(value, 10) || 1));
    if (!saveState({ ...state, quantity: next })) return;
    renderCart();
    document.querySelector('#cart-status').textContent = `Cart updated. Demo total ${money(next * unitPrice)}.`;
  };
  cartQuantity.addEventListener('change', () => updateQuantity(cartQuantity.value));
  document.querySelector('#cart-decrease').addEventListener('click', () => updateQuantity(state.quantity - 1));
  document.querySelector('#cart-increase').addEventListener('click', () => updateQuantity(state.quantity + 1));
  document.querySelector('#remove-item').addEventListener('click', () => {
    if (!saveState({ ...state, quantity: 0 })) return;
    renderCart();
    document.querySelector('#cart-status').textContent = 'Oatmeal & Honey Bar removed from your cart.';
    document.querySelector('#empty-cart-title').focus();
  });
}

const checkoutForm = document.querySelector('#checkout-form');
if (checkoutForm) {
  let submitting = false;
  checkoutForm.addEventListener('submit', event => {
    event.preventDefault();
    if (submitting || !state.quantity || !checkoutForm.reportValidity()) return;
    submitting = true;
    document.querySelector('#place-order').disabled = true;
    const id = 'DEMO-' + crypto.randomUUID().slice(0, 8).toUpperCase();
    // Save only the demo receipt and totals; never store form/customer details.
    const receipt = { id, quantity: state.quantity, placedAt: new Date().toISOString() };
    if (!saveState({ quantity: 0, receipt })) {
      submitting = false;
      document.querySelector('#place-order').disabled = false;
      return;
    }
    location.assign(urlFor('order-confirmation/'));
  });
}

if (document.body.dataset.page === 'confirmation') {
  const receipt = state.receipt;
  document.querySelector('#order-confirmed').hidden = !receipt;
  document.querySelector('#no-order').hidden = Boolean(receipt);
  if (receipt) {
    document.querySelector('#order-number').textContent = receipt.id;
    document.querySelector('#order-quantity').textContent = receipt.quantity + (receipt.quantity === 1 ? ' bar' : ' bars');
    document.querySelector('#order-total').textContent = money(receipt.quantity * unitPrice);
  }
}

renderCart();
