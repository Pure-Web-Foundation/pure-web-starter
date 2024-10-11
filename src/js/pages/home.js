import { html } from "lit";
import { repeat } from "lit/directives/repeat.js";
import { RoutePage } from "../shared/route-page";

export class PageHome extends RoutePage {
  static get properties() {
    return {
      handles: {
        type: Object,
      },
      tags: {
        type: Array,
      },
    };
  }

  constructor() {
    super();
    this.readStart = new Date();
  }

  renderTitle() {}

  renderContent() {
    const me = this;

    return html`
      <section>
        <blockquote class="hero">A Pure Web Starter</blockquote>

        <div>
          <h2>Go frameworkless!</h2>
          <p>
            This starter app is a <b>frameworkless</b> web app. It uses
            <a
              rel="noopener"
              target="_blank"
              href="https://www.npmjs.com/package/pure-web"
              ><em>pure-web/spa</em></a
            >
            as a router.
          </p>

          <blockquote>
            The 
            
            <a
            rel="noopener"
            target="_blank"
            href="https://pureweb.dev"
            ><b>Pure Web Foundation</b></a
          >
             was created to
            <em>change the narrative</em>
            that you can't possibly create a professional site or app without a
            framework.
          </blockquote>

          <hr />

          
        </div>
      </section>

      <nav id="entry-points">
        <ul class="tiles">
          ${repeat(this.getEntryLevelPages(), (page) => {
            return html`
              <li data-persona="${page.config.persona}">
                <a href="${page.route}" title="${page.name}"
                  ><svg-icon icon="${page.config.icon}"></svg-icon>
                  <span>${me.getPageShortName(page)}</span>
                </a>
              </li>
            `;
          })}
        </ul>
      </nav>
    `;
  }

  renderChildren() {}

  getEntryLevelPages() {
    return app.config.pages.filter((p) => {
      return p.path !== "/" && !p.parentRoute && !p.hidden && p.config?.icon;
    });
  }
}
