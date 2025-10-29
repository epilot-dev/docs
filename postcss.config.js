module.exports = {
  plugins: [
    // Prefix all Mosaic CSS selectors with .entitySchemaViewer to scope them
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('postcss-prefix-selector')({
      prefix: '.stoplight-viewer',
      // Only process CSS files from @stoplight/mosaic
      includeFiles: [/@stoplight\/mosaic\/styles.css/],
      // includeFiles: ['asd'],
      // Don't prefix global selectors - they'll be replaced by the prefix
      transform: (prefix, selector, prefixedSelector) => {
        // Don't double-prefix if already prefixed
        if (selector.includes(prefix)) {
          return selector;
        }

        return prefixedSelector;
      },
    }),
  ],
};
