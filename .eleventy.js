const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/admin");

  // Date filters
  eleventyConfig.addFilter("dateIso", date => {
    return DateTime.fromJSDate(date).toISO();
  });

  eleventyConfig.addFilter("dateDisplay", date => {
    return DateTime.fromJSDate(date).toLocaleString(DateTime.DATE_FULL);
  });

  // Excerpt filter
  eleventyConfig.addFilter("excerpt", content => {
    if (!content) return '';
    const excerptLength = 200;
    let excerpt = content.replace(/(<([^>]+)>)/gi, ''); // Remove HTML tags
    excerpt = excerpt.substr(0, excerptLength);
    if (excerpt.length === excerptLength) {
      excerpt += '...';
    }
    return excerpt;
  });

  // Collections
  eleventyConfig.addCollection("blog", collection => {
    return collection.getFilteredByGlob("src/blog/*.md").sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection("events", collection => {
    return collection.getFilteredByGlob("src/events/*.md").sort((a, b) => a.date - b.date);
  });

  eleventyConfig.addCollection("teachings", collection => {
    return collection.getFilteredByGlob("src/teachings/*.md").sort((a, b) => b.date - a.date);
  });
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};