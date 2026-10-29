# Sunny Side Soap Co. demo storefront

A buildless static product page for a handmade oatmeal and honey goat milk soap bar. All brand/product content is fictional. The bag is an in-memory UI demonstration with no checkout, payment collection, storage, or analytics.

Live product URL: https://dandzl.github.io/pixel-03-test-store/products/oatmeal-honey-soap/

The product URL accepts `?trialID=...` without changing page behavior. Visiting the root redirects to the product and preserves the query string and fragment when JavaScript is enabled. All artwork is original SVG included in this repository.

## Tracking status

**Pending real Pixel IDs.** No TikTok tracking code is installed, and no events are emitted. This page alone does not establish a two-Pixels-without-events account fixture.

Before using this for the intended scenario, connect the two real Pixel base codes for Sunny Side Main and Sunny Side Old in the intended test advertiser. Do not add page, product-view, add-to-cart, checkout, purchase, or custom events. Disable automatic events and any event-builder rules in the account. Verify the two Pixels and their absence of configured/received events in Events Manager; do not infer account readiness from this source or the rendered page.

## GitHub Pages

Publish the root of the `main` branch with GitHub Pages. `.nojekyll` keeps this a plain static site; no custom Actions workflow or build dependency is needed. The product lives at `products/oatmeal-honey-soap/index.html`.

For local preview, serve this directory with `python3 -m http.server 8765` and open `http://localhost:8765/products/oatmeal-honey-soap/?trialID=preview`.
