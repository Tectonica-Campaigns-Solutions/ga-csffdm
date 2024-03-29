const path = require(`path`);

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const templates = {
      areasOfWork: path.resolve('./src/templates/AreasOfWork.js'),
      work: path.resolve('./src/templates/Work.js'),
      newsDistributor: path.resolve('./src/templates/NewsDistributor.js'),
      post: path.resolve('./src/templates/Post.js'),
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
        }
      `).then((result) => {
        if (result.errors) {
          reject(result.errors);
        }

        // Create pages
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
      })
    );
  });
};
