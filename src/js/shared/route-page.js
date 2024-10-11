import { PureSPA } from "pure-web/spa";
import { html, nothing } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { kebabToWords } from "./common";

export class RoutePage extends PureSPA.Page {
  connectedCallback() {
    super.connectedCallback();
    this.init();
  }

  static get properties() {
    return {
      data: { type: Object },
      html: {
        type: String,
      },
      exampleId: {
        type: String,
      },
    };
  }

  async init() {
    this.initialized();
  }

  initialized() {
    // for subclassing
  }

  render() {
    return html`
      ${this.renderBreadCrumbs()}
      <div class="page-title">
        <h2>${this.renderTitle()}</h2>
      </div>
      <svg-icon
        id="page-icon"
        icon="${this.options.config?.icon ?? ""}"
      ></svg-icon>
      <div class="page-content">${this.renderContent()}</div>
      ${this.renderChildren()}
    `;
  }

  get options() {
    return app.activeRoute?.options ?? {};
  }

  get title() {
    const options = this.options.parentRoute
      ? app.config.routes[this.options.parentRoute]
      : this.options;
    return options.config?.title ?? kebabToWords(options.name);
  }

  renderTitle() {
    return html`${this.title}`;
  }

  renderContent() {
    return html``;
  }

  getChildren() {
    const route = app.config.routes[location.pathname];
    return Object.keys(route.routes ?? {}).map((key) => {
      const path = location.pathname + key;
      const subRoute = app.config.routes[path];

      return {
        title: this.getPageShortName(subRoute),
        url: path,
        icon: subRoute?.config?.icon,
      };
    });
  }

  renderChildren() {
    return html`
      <section class="route-children">
        <ul class="tiles page-children">
          ${repeat(
            this.getChildren(),
            (item) => html`<li>${this.renderSingleChild(item)}</li>`
          )}
        </ul>
      </section>
    `;
  }

  getLinkTitle(item) {
    return (
      item.config?.shortName ??
      item.config?.title ??
      item.title ??
      item.id ??
      item.itemKey
    );
  }

  renderSingleChild(item) {
    return html`
      <a
        href="${item.url}"
        class="${item.img ? "img-tile" : ""}"
        style="--img: url(${item.img})"
      >
        ${this.renderIcon(item)}
        <span>${this.getLinkTitle(item)}</span>
      </a>
    `;
  }

  getPageTitle(page) {
    return page.config?.title ?? kebabToWords(page.name);
  }

  getPageShortName(page) {
    return (
      page.config?.shortName ??
      this.getPageTitle(page) ??
      kebabToWords(page.name)
    );
  }

  renderIcon(item) {
    const icon = item.icon ?? item.config?.icon;
    if (icon) return html`<svg-icon icon="${icon}"></svg-icon>`;
  }

  renderBreadCrumbs() {
    if (!app.activeRoute) return nothing;

    if (app.activeRoute.options?.path === "/") return nothing;

    const breadcrumbs = app.getBreadCrumbs(app.activeRoute);

    return html`
      <span id="breadcrumbs">
        ${this.renderHomeLinkIfNeeded()}
        ${repeat(breadcrumbs, (item, index) => {
          const page = app.config.routes[item.url];
          return html`<a href=${item.url}>${this.getPageShortName(page)}</a>
            ${index < breadcrumbs.length - 1 ? "/" : ""}`;
        })}
      </span>
    `;
  }

  renderHomeLinkIfNeeded() {
    if (this.activeRoute?.path === "/") return nothing;
    return html`<a href="/">${app.config.routes["/"].name}</a>/`;
  }
}
