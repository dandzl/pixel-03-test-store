# Sunny Side Soap Co. demo storefront

A buildless demo storefront for a handmade oatmeal and honey goat milk soap bar. All brand/product content is fictional. The cart supports quantities and removal, and checkout creates a simulated order confirmation without payment collection or event tracking. Two TikTok Pixel SDKs are initialized on the product page separately from the shopping UI.

Live product URL: https://dandzl.github.io/pixel-03-test-store/products/oatmeal-honey-soap/

The product URL accepts `?trialID=...`. Internal shopping links preserve that marker. Cart and receipt data use per-tab session storage, with a separate state for each trial ID, and survive navigation and reloads in that tab. Visiting the root redirects to the product and preserves the query string and fragment when JavaScript is enabled. All artwork is original SVG included in this repository, with a PNG export for the product image.

## Demo shopping flow

- Product: `products/oatmeal-honey-soap/` — add up to 20 bars to the cart.
- Cart: `cart/` — update quantities, remove the product, and review totals.
- Checkout: `checkout/` — sample contact/address fields, free demo shipping, and a simulated payment method. Required fields, email format, state abbreviation, and ZIP format are validated in the browser.
- Confirmation: `order-confirmation/` — a demo order reference, item quantity, illustrative total, and zero amount charged. Placing an order clears the cart; the latest receipt survives a refresh in the same tab.

Only quantity, demo order reference, and timestamp are stored. Contact/address inputs are not saved or submitted to a server. Cart, checkout, and confirmation do not load the Pixel SDK or any external scripts. They do not send tracking events. The product page retains its existing base-only Pixel initialization. No emails, shipments, or real orders are generated, and no card details are requested.

## Tracking status

The following user-supplied Pixel IDs are initialized by `pixel-base.js`:

| Pixel | ID |
| --- | --- |
| Sunny-Side-Main | `DBHSTO3C77U4SEFNTBG0` |
| Sunny-Side-Old | `DBHSUIBC77UASCMGSGIG` |

The loader follows [TikTok's base-code documentation](https://ads.tiktok.com/gateway/docs/index?doc_id=1701890973258754&language=ENGLISH), deliberately omitting its page-view invocation. No page-view, product-view, add-to-cart, checkout, purchase, identify, or custom event calls are included. Loading SDKs still makes requests to TikTok; vendor-side configuration controls automatic behavior.

Before using this for the intended scenario, verify both Pixels belong to the intended test advertiser, disable automatic/assisted events and any event-builder rules in the account, and verify the absence of configured/received events in Events Manager. This page alone does not establish the required account state. Do not infer account readiness from this source or the rendered page.

## GitHub Pages

Publish the root of the `main` branch with GitHub Pages. `.nojekyll` keeps this a plain static site; no custom Actions workflow or build dependency is needed. The product lives at `products/oatmeal-honey-soap/index.html`.

For local preview, serve this directory with `python3 -m http.server 8765` and open `http://localhost:8765/products/oatmeal-honey-soap/?trialID=preview`.
