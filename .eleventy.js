const { toISOString, toAbsoluteUrl } = require("./11ty/filters");
const dir = require("./11ty/constants/dir");
const imageShortcode = require("./11ty/shortcodes/image");
const faviconShortcode = require("./11ty/shortcodes/favicon");

// Template language for the site: https://www.11ty.dev/docs/languages/liquid/
const TEMPLATE_ENGINE = 'liquid';

module.exports = (eleventyConfig) => {
  // eleventyConfig.setServerOptions({
  //   module: "@11ty/eleventy-server-browsersync",
  //
  //   watch: "**/*",
  //
  //   // Default Browsersync options shown:
  //   port: 8080,
  //   open: false,
  //   notify: true,
  //   ui: false,
  //   ghostMode: true,
  //
  //   files: [ '_site', 'about' ],
  //   server:{
  //     baseDir:'_site',
  //     directory: true
  //   },
  //
  //   // Opt-out of the Browsersync snippet
  //   snippet: false,
  // });

  // Watch targets
  eleventyConfig.addWatchTarget(`${dir.input}/assets/styles`);
  // // eleventyConfig.addWatchTarget(`${dir.input}/`);
  // eleventyConfig.addWatchTarget(`src`);

  // Custom shortcodes
  eleventyConfig.addShortcode('image', imageShortcode);
  eleventyConfig.addShortcode('favicon', faviconShortcode);

  // pass-through copy folders
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/CNAME");

  // Custom filters
  eleventyConfig.addFilter('toAbsoluteUrl', toAbsoluteUrl);
  eleventyConfig.addFilter('toIsoString', toISOString);
  eleventyConfig.addFilter('toJson', JSON.stringify);
  eleventyConfig.addFilter('fromJson', JSON.parse);
  eleventyConfig.addFilter('keys', Object.keys);
  eleventyConfig.addFilter('values', Object.values);
  eleventyConfig.addFilter('entries', Object.entries);

  return {
    dir,
    dataTemplateEngine: TEMPLATE_ENGINE,
    markdownTemplateEngine: TEMPLATE_ENGINE,
    htmlTemplateEngine: TEMPLATE_ENGINE,
    templateFormats: ['html', 'md', TEMPLATE_ENGINE],
  };
};
