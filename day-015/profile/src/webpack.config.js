module.exports = {
    // other webpack configuration options...
    resolve: {
      fallback: {
        "url": require.resolve("url/"),
      },
    },
  };
  