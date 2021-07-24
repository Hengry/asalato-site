const path = require('path');

module.exports = {
  siteMetadata: {
    title: 'asalato-site',
  },
  plugins: [
    'gatsby-plugin-emotion',
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-typescript',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-root-import',
      options: {
        src: path.join(__dirname, 'src'),
        pages: path.join(__dirname, 'src/pages'),
        themes: path.join(__dirname, 'src/themes'),
        components: path.join(__dirname, 'src/components'),
        interfaces: path.join(__dirname, 'src/interfaces'),
        utils: path.join(__dirname, 'src/utils'),
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'YOUR_GOOGLE_TAGMANAGER_ID',
        includeInDevelopment: false,
        defaultDataLayer: { platform: 'gatsby' },

        // Specify optional GTM environment details.
        // gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
        // gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
        // dataLayerName: "YOUR_DATA_LAYER_NAME",

        // Name of the event that is triggered
        // on every Gatsby route change.
        //
        // Defaults to gatsby-route-change
        routeChangeEventName: 'CHANGE_PAGE',
        // Defaults to false
        enableWebVitalsTracking: true,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/favicons/asalato.svg',
        name: 'Asalato Resolver',
        short_name: 'Asalato Resolver',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        display: 'standalone',
        legacy: true,
      },
    },
    // 'gatsby-plugin-offline',
  ],
};
