/**
 * This module intended to be included in the main app bundle
 * In case if browser does not need a polyfill, it will return a fulfilled promise
 * See https://developer.chrome.com/articles/urlpattern/ & https://developer.mozilla.org/en-US/docs/Web/API/URL_Pattern_API
 */
async function LoadPolyfillsIfNeeded() {
  window._polyfillState = {};

  if (!(globalThis && "URLPattern" in globalThis)) {
    const path = "/assets/js/polyfills/urlpatternPolyfill.js";
    window._polyfillState.URLPattern = true;
    await import(path);
  }
  if (!(globalThis && "navigation" in globalThis)) {
    const path = "/assets/js/polyfills/navigationPolyfill.js";
    window._polyfillState.navigation = true;
    await import(path);
  }

  if (!("startViewTransition" in document)) {
    const path = "/assets/js/polyfills/viewtransitionPolyfill.js";
    window._polyfillState.startViewTransition = true;
    await import(path)
  }

}

export const polyfillsLoaded = LoadPolyfillsIfNeeded();
