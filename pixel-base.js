'use strict';

// TikTok's base loader, initialized for both dedicated fixture Pixels.
// Deliberately omit page-view and all standard/custom event invocations.
(function (w, d, name) {
  w.TiktokAnalyticsObject = name;
  const ttq = w[name] = w[name] || [];
  ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie'];
  ttq.setAndDefer = function (target, method) {
    target[method] = function () {
      target.push([method].concat(Array.prototype.slice.call(arguments, 0)));
    };
  };
  for (const method of ttq.methods) ttq.setAndDefer(ttq, method);
  ttq.instance = function (id) {
    const instance = ttq._i[id] || [];
    for (const method of ttq.methods) ttq.setAndDefer(instance, method);
    return instance;
  };
  ttq.load = function (id, options) {
    const sdk = 'https://analytics.tiktok.com/i18n/pixel/events.js';
    ttq._i = ttq._i || {};
    ttq._i[id] = [];
    ttq._i[id]._u = sdk;
    ttq._t = ttq._t || {};
    ttq._t[id] = +new Date();
    ttq._o = ttq._o || {};
    ttq._o[id] = options || {};
    const script = d.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = sdk + '?sdkid=' + id + '&lib=' + name;
    const firstScript = d.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  };
  ttq.load('DBHSTO3C77U4SEFNTBG0'); // Sunny-Side-Main
  ttq.load('DBHSUIBC77UASCMGSGIG'); // Sunny-Side-Old
})(window, document, 'ttq');
