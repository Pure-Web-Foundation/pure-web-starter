/* eslint-disable no-undef */
const esbuild = require("esbuild");
const rebuildNotifyPlugin = require("./lib/esbuild-plugin-rebuild-notify");
const {sassPlugin} = require('esbuild-sass-plugin');
const copyPlugin = require("./lib/esbuild-plugin-copy");

const config = {
  entryPoints: [
    "src/js/app.js",
    "src/js/polyfills/urlpatternPolyfill.js",
  ],
  outdir: "public/assets/js/",
  external: ["*.woff", "*.eot", "*.ttf", "*.svg"],
  bundle: true,
  sourcemap: true,
  loader: { ".json": "json" },
  plugins: [
    sassPlugin(),
    copyPlugin({
      from: 'public/assets/js/app.css',
      to: 'public/assets/css/app.css',
      move: true,
      createPath: true,
    }),
    copyPlugin({
      from: 'public/assets/js/app.css.map',
      to: 'public/assets/css/app.css.map',
      move: true,
      createPath: true,
    }),
    copyPlugin({
      from: './readme.md',
      to: 'public/assets/md/readme.md',
      move: false,
      createPath: true,
    }),
    rebuildNotifyPlugin()
  ],
};

const run = async () => {
  const ctx = await esbuild.context(config);
  await ctx.watch();
};

run();
