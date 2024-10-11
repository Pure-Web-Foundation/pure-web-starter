# Pure Web Starter

This is a Pure Web Starter

The Site was built with the [Pure Web Manifest](https://medium.com/cto-as-a-service/the-pure-manifesto-for-web-standards-based-design-systems-d46f400853eb) in mind.


## Ideal Configuration

- VSCode with extensions
  - lit-html
  - lit-plugin
  - ESLint (eslint)
  - Live Sass Compiler (glenn2223.live-sass)
  - Live Server (ritwickdey.liveserver)
  - SVG Viewer (dheovani.svg-viewer)

## Debugging (using Live Server)

```sh
> npm run dev
```

## Building

TypeScript is being used for *one single purpose*: build the `.d.ts` files needed for code intellisense, from *JSDoc Code Comments*.

```sh
> npm run build
```

## Components

Yes, this site uses an NPM package, but one we wholeheartedly support: [pure-web](https://www.npmjs.com/package/pure-web) 😎.

The `pure-web` package contains generic building blocks you can use in ANY Vanilla-based project, and only stuff that is using the same PURE principles.

- pure-web/spa (Modern Web Router)
- pure-web/ac (Versatile, accessible, multi-source AutoComplete on any input)
- pure-web/common (common utility methods for daily use)

## Site Structure

### SPA Pages

See `pure-app.config.js` for the nested `pure-web/spa` router configuration.

The spa config file declares all routes, and their corresponding (Lit) page components, in a nested object structure.

Here's the basic structure:

```js
  import { PageHome } from "./pages/home.js";
  import { PageBlogs } from "./pages/blogs.js";
  import { PageBlog1 } from "./pages/blog1.js";
  import { PageBlog2 } from "./pages/blog2.js";

  export const config = {
    routes: {
      "/": {
        name: "Home",
        run: PageHome,
      },
      "/blogs": {
        run: PageBlogs,
        routes: {
          "/blog1": {
            run: PageBlog1,
          }
          "/blog2": {
            run: PageBlog2,
          }
        }
      }
    }
  }



