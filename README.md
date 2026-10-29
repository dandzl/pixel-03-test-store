# Sunny Side Soap Co. demo storefront

A buildless static product page for a handmade oatmeal and honey goat milk soap bar. All brand/product content is fictional. The bag is an in-memory UI demonstration with no checkout, payment collection, or event tracking. Two TikTok Pixel SDKs are initialized separately from the shopping UI.

Live product URL: https://dandzl.github.io/pixel-03-test-store/products/oatmeal-honey-soap/

The product URL accepts `?trialID=...` without changing page behavior. Visiting the root redirects to the product and preserves the query string and fragment when JavaScript is enabled. All artwork is original SVG included in this repository.

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
