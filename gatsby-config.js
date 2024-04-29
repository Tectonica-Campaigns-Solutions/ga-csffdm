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
      resolve: 'gatsby-plugin-netlify',
      options: {
        functionsSrc: `${__dirname}/src/api`,
        functionsOutput: `${__dirname}/functions`,
      },
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
          endpoint: 'https://tectonica.us18.list-manage.com/subscribe/post?u=b1d4f912bb0367fed3628a0ea&amp;id=00b1bc7a6a&amp;f_id=00d03ee1f0', // string; add your MC list endpoint here; see instructions below
          timeout: 3500, // number; the amount of time, in milliseconds, that you want to allow mailchimp to respond to your request before timing out. defaults to 3500
      },
    },
  ],
  /*proxy: {
    prefix: "/.netlify/functions",
    url: "http://localhost:8000",
  },*/
};
