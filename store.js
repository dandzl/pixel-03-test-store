'use strict';

// Deliberately browser-local. No event tracking, checkout, or conversion requests.
const quantity = document.querySelector('#quantity');
const count = document.querySelector('#bag-count');
const status = document.querySelector('#cart-status');
const dialog = document.querySelector('#bag-dialog');
const content = document.querySelector('#bag-content');
let items = 0;
const readQuantity = () => Math.min(20, Math.max(1, Number.parseInt(quantity.value, 10) || 1));

document.querySelector('#decrease').addEventListener('click', () => { quantity.value = Math.max(1, readQuantity() - 1); });
document.querySelector('#increase').addEventListener('click', () => { quantity.value = Math.min(20, readQuantity() + 1); });
quantity.addEventListener('change', () => { quantity.value = readQuantity(); });
document.querySelector('#add-form').addEventListener('submit', event => {
  event.preventDefault();
  const added = readQuantity();
  quantity.value = added;
  items += added;
  count.textContent = String(items);
  status.textContent = `${added} ${added === 1 ? 'bar' : 'bars'} added to your demo bag.`;
});
document.querySelector('#open-bag').addEventListener('click', () => {
  content.textContent = items ? `Oatmeal & Honey Bar · ${items} ${items === 1 ? 'bar' : 'bars'} · Demo subtotal $${(items * 9).toFixed(2)} USD` : 'Your bag is empty. A little goodness awaits.';
  dialog.showModal();
});
document.querySelector('#close-bag').addEventListener('click', () => dialog.close());
document.querySelector('#continue-shopping').addEventListener('click', () => dialog.close());
