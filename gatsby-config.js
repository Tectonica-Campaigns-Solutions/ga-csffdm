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
  ],
  /*proxy: {
    prefix: "/.netlify/functions",
    url: "http://localhost:8000",
  },*/
};
