import { PageHome } from "./pages/home";
import { RoutePage } from "./shared/route-page";
import { html } from "lit";

const blogs = {
  "/1": {
    title: "Detail 1",
    body: "Detail 1 body",
  },
  "/2": {
    title: "Detail 2",
    body: "Detail 2 body",
  },
};

export const config = {
  org: {
    domain: "pureweb.dev",
    email: "info@pureweb.dev",
  },
  routes: {
    "/": {
      name: "Home",
      run: PageHome,
    },
    "/master-detail": {
      // example of a master/detail nested route with a named variable (in this case, the blog id)
      run: class PageBlogs extends RoutePage {
        renderContent() {
          return html`<div>
            <p>This is a master/detail page</p>
          </div>`;
        }
        getChildren() {
          return Object.entries(blogs).map(([id, blog]) => {
            return {
              url: `/master-detail${id}`,
              ...blog,
            };
          });
        }
      },
      config: {
        icon: "blog",
      },
      routes: {
        "/:blog": {
          run: class PageSingleBlog extends RoutePage {
            static properties = {
              blog: {
                type: String,
                routeOrigin: "pathname",
              },
            };

            get blogId() {
              return `/${this.blog}`;
            }

            renderContent() {
              return html`${blogs[this.blogId].body}`;
            }

            getChildren() {
              return [];
            }
          },
        },
      },
    },
    "/about": {
      // example of a catch-all route (every sub-path is a match)
      run: class PageAbout extends RoutePage {
        renderTitle() {
          return "About this Project Starter";
        }
        renderContent() {
          if (location.pathname === "/about")
            return html`<mark-down src="/assets/md/readme.md"></mark-down>`;

          return html`<div>
            About this site - sub path: ${location.pathname}
          </div>`;
        }
        getChildren() {
          return [
            {
              title: "About - Part 1",
              url: "/about/test1",
            },
            {
              title: "About - Part 2",
              url: "/about/test2",
            },
          ];
        }
      },
      config: {
        icon: "info",
      },
      routes: {
        "/*": {},
      },
    },
  },
};
