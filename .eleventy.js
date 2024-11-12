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

  // Sort by date
  eleventyConfig.addFilter("sortByDate", arr => {
    return arr.sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
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
    return collection.getFilteredByGlob("src/blog/*.md");
  });

  eleventyConfig.addCollection("events", collection => {
    return collection.getFilteredByGlob("src/events/*.md");
  });

  eleventyConfig.addCollection("teachings", collection => {
    return collection.getFilteredByGlob("src/teachings/*.md");
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