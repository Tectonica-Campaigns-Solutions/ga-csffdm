const path = require(`path`);
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const templates = {
      areasOfWork: path.resolve('./src/templates/AreasOfWork.js'),
      work: path.resolve('./src/templates/Work.js'),
      newsDistributor: path.resolve('./src/templates/NewsDistributor.js'),
      post: path.resolve('./src/templates/Post.js'),
      page: path.resolve('./src/templates/page.js'),
      governance: path.resolve('./src/templates/Governance.js'),
      organization: path.resolve('./src/templates/Organization.js'),
      conference: path.resolve('./src/templates/Conference.js'),
      conferenceTheme: path.resolve('./src/templates/ConferenceTheme.js'),
    };

    resolve(
      graphql(`
        {
          areasOfWork: datoCmsAreasOfWork {
            id
            title
            slug
          }
          works: allDatoCmsWork {
            edges {
              node {
                id
                slug
                title
              }
            }
          }

          newsDistributor: datoCmsNews {
            id
            title
            slug
          }
          posts: allDatoCmsPost {
            edges {
              node {
                id
                slug
                title
              }
            }
          }
          pages: allDatoCmsBasicPage {
            edges {
              node {
                id
                slug
                title
              }
            }
          }
          governance: datoCmsGovernance {
            id
            title
            slug
          }
          organizations: allDatoCmsOrganization {
            edges {
              node {
                id
                slug
                title
              }
            }
          }

          conferences: allDatoCmsConference {
            edges {
              node {
                id
                slug
                title
                themes {
                  ... on DatoCmsConferenceTheme {
                    id
                    slug
                    model {
                      apiKey
                    }
                  }
                }
              }
            }
          }
        }
      `).then((result) => {
        if (result.errors) {
          reject(result.errors);
        }

        // Create pages
        const governance = result.data.governance;
        if (governance) {
          createPage({
            path: governance.slug,
            component: templates.governance,
            context: {
              slug: governance.slug,
            },
          });
        }

        const organizations = result.data.organizations.edges;
        for (const org of organizations) {
          createPage({
            path: '/organization/' + org.node.slug,
            component: templates.organization,
            context: {
              slug: org.node.slug,
              id: org.node.id,
            },
          });
        }

        const areasOfWork = result.data.areasOfWork;
        if (areasOfWork) {
          createPage({
            path: areasOfWork.slug,
            component: templates.areasOfWork,
            context: {
              slug: areasOfWork.slug,
            },
          });
        }

        const works = result.data.works.edges;
        for (const work of works) {
          createPage({
            path: '/work/' + work.node.slug,
            component: templates.work,
            context: {
              slug: work.node.slug,
              id: work.node.id,
            },
          });
        }

        const newsDistributor = result.data.newsDistributor;
        if (newsDistributor) {
          createPage({
            path: newsDistributor.slug,
            component: templates.newsDistributor,
            context: {
              slug: newsDistributor.slug,
            },
          });
        }

        const posts = result.data.posts.edges;
        for (const post of posts) {
          createPage({
            path: '/post/' + post.node.slug,
            component: templates.post,
            context: {
              slug: post.node.slug,
              id: post.node.id,
            },
          });
        }

        const pages = result.data.pages.edges;
        for (const page of pages) {
          createPage({
            path: page.node.slug,
            component: templates.page,
            context: {
              slug: page.node.slug,
              id: page.node.id,
            },
          });
        }

        const conferences = result.data.conferences.edges;
        for (const conference of conferences) {
          createPage({
            path: '/conference/' + conference.node.slug,
            component: templates.conference,
            context: {
              slug: conference.node.slug,
              id: conference.node.id,
            },
          });

          // Create sub-pages
          for (const theme of conference.node.themes) {
            createPage({
              path: '/conference/' + conference.node.slug + '/' + theme.slug,
              component: templates.conferenceTheme,
              context: {
                slug: theme.slug,
                id: theme.id,
                parentId: conference.node.id,
              },
            });
          }
        }
      })
    );
  });
};

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    plugins: [
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order. Following module has been added:/,
      }),
    ],
  });
};
