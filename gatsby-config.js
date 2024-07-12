require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `CSFFDM`,
    siteUrl: `https://csoforffd.org`,
  },
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-source-datocms',
      options: {
        apiToken: process.env.DATO_API_TOKEN,
        previewMode: process.env.NODE_ENV !== 'production',
        disableLiveReload: false,
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-react-helmet',
     {
        resolve: 'gatsby-plugin-mailchimp',
        options: {
            endpoint: 'https://sidint.us17.list-manage.com/subscribe/post?u=1ba8e4790b637950a94f17b25&amp;id=0d1ec580c7&amp;f_id=00ad2ee1f0', // string; add your MC list endpoint here; see instructions below
            timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
        },
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        redirects: [
          {
            fromPath: '^/([0-9]{4})/([0-9]{2})/([0-9]{2})/(.+)$',
            toPath: '/post/$4',
            statusCode: 301,
            force: true,
          },
          // {
          //   fromPath: '^/wp-content/uploads/([0-9]{4})/([0-9]{2})/(.+)$',
          //   toPath: 'https://www.datocms-assets.com/120585/$3',
          //   statusCode: 301,
          // },
        ],
      },
    },
  ],
};
