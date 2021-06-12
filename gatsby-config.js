module.exports = {
  siteMetadata: {
    title: 'asalato-site',
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-resolve-src',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'asalato-site',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
  ],
};
