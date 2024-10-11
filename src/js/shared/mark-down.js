import { loadScript } from "./common.js";

customElements.define(
  "mark-down",
  class Markdown extends HTMLElement {
    async getContent() {
      const me = this;
      const src = me.getAttribute("src");
      let text = "";

      loadScript(
        "https://cdn.jsdelivr.net/npm/markdown-it@14.0.0/dist/markdown-it.min.js",
        async () => {
          // eslint-disable-next-line no-undef
          const converter = markdownit();
          if(src){
            const response = await fetch(src);
            text = await response.text();
          }
          else{
            text = me.textContent.trim();
          }

          const htm = Markdown.addTargetBlank(converter.render(text));
          this.innerHTML = /*html*/ `<div class="converted-md">
            ${htm}
          </div>`;
        }
      );
    }

    static addTargetBlank(htmlString) {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlString, "text/html");

      const anchors = doc.querySelectorAll("a");
      anchors.forEach((a) => {
        if (a.hostname !== window.location.hostname) {
          a.setAttribute("target", "_blank");
        }
      });

      return doc.documentElement.outerHTML;
    }

    connectedCallback() {
      this.getContent();
    }
  }
);
