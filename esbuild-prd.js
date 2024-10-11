/* eslint-disable no-undef */
const esbuild = require("esbuild");
const copyPlugin = require('./lib/esbuild-plugin-copy');
const {sassPlugin} = require('esbuild-sass-plugin');
const config = {
  entryPoints: [
    "src/js/app.js",
    "src/js/polyfills/urlpatternPolyfill.js",
  ],
  outdir: "public/assets/js/",
  external: ["*.woff", "*.eot", "*.ttf", "*.svg"],
  bundle: true,
  minify: true,
  loader: { ".json": "json" },
  sourcemap: true,
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
  ]
};

const build = async () => {
  await esbuild.build(config);
};

build().then(() => {
  console.log("Build ready.");
});
