import { config } from "./pure-app.config";
import { html } from "lit";
import { PureSPA } from "pure-web/spa";
import { polyfillsLoaded } from "./polyfills/polyfillsLoader";

import {
  debounce,
  enhanceInputWithLabel,
} from "./shared/common";

const root = document.documentElement;

let lastScrollTop;

/**
 * Wraps content in a Modal dialog container - using native <dialog></dialog>
 */
class PureApp extends PureSPA {
  constructor() {
    super();

    this.setupProgressiveEnhancement();
  }

  setupProgressiveEnhancement() {
    this.enhancers.add("[data-label]", enhanceInputWithLabel);
  }

  // get routes from page config.
  static get config() {
    return config;
  }

  async initApp() {
    await polyfillsLoaded;
    return true;
  }

  async beforeInitialize() {
    return await this.initApp();
  }

  async beforeRouting() {}

  render() {
    return html`
      <header>
        <a href="/" class="site-header">
          <h1>Pure Web Starter</h1>
        </a>
      </header>
      <main>${super.render()}</main>
      <footer class="proclaimer">${this.renderFooter()}</footer>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this.hookScrollDirection();
  }

  hookScrollDirection() {
    const scrollElement = window;
    scrollElement.addEventListener(
      "scroll",
      debounce(() => {
        if (window.scrollY === 0) root.removeAttribute("data-scroll");
        else
          root.setAttribute(
            "data-scroll",
            window.scrollY > lastScrollTop ? "down" : "up"
          );

        lastScrollTop = window.scrollY;
      })
    );
  }

  get notFoundPage() {
    return html`<div class="hero error-page flex">
      <img alt="Compact Pure Logo" src="/assets/img/pure-p.svg" width="150px" />
      <h2>age not found</h2>
    </div>`;
  }

  renderFooter() {
    return html`<small>
      Developed using
      <a rel="noopener" href="https://pureweb.dev/manifesto" target="_blank"
        >Pure Manifesto</a
      >

      |

      <a rel="noopener" href="https://pureweb.dev/" target="_blank"
        >Pure Web Foundation</a
      >
    </small>`;
  }

  updated() {
    super.updated();

    setTimeout(() => {
      if (location.pathname !== this.lastPath) this.routeSwitched();

      this.lastPath = location.pathname;
    }, 500);
  }

  routeSwitched() {
    // console.log(location.pathname)
  }
}
customElements.define("pure-app", PureApp);
