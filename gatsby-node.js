const path = require(`path`);
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const webpack = require('webpack');

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
      resources: path.resolve('./src/templates/Resources.js'),
      resource: path.resolve('./src/templates/Resource.js'),
      form: path.resolve('./src/templates/Form.js'),
      meeting: path.resolve('./src/templates/UNMeeting.js'),
      pressReleases: path.resolve('./src/templates/PressReleases.js'),
      eventsDistributor: path.resolve('./src/templates/EventsDistributor.js'),
      event: path.resolve('./src/templates/Event.js'),
      ffdChronicleDistributor: path.resolve('./src/templates/ChronicleDistributor.js'),
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
                tag
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
                tags {
                  title
                }
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
                    subtopics {
                      ... on DatoCmsConferenceSubtopic {
                        id
                        title
                        slug
                        subItems {
                          ... on DatoCmsConferenceSubtopic {
                            id
                            title
                            slug
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          resources: datoCmsResourcesModel {
            id
            title
            slug
          }

          resourceItems: allDatoCmsResource {
            edges {
              node {
                id
                title
                slug
                typeOfResource
              }
            }
          }

          forms: allDatoCmsForm {
            edges {
              node {
                id
                title
                slug
              }
            }
          }

          meetings: allDatoCmsUnMeeting {
            edges {
              node {
                id
                title
                slug
              }
            }
          }

          pressReleases: datoCmsPressReleasesModel {
            id
            title
            slug
          }

          eventsDistributor: datoCmsEventsModel {
            id
            title
            slug
          }
          events: allDatoCmsEvent {
            edges {
              node {
                id
                slug
                title
                tags {
                  title
                }
              }
            }
          }
          ffdChronicleDistributor: datoCmsFfdChronicle {
            id
            title
            slug
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
              tag: work.node.tag,
              today: new Date().toISOString().split('T')[0],
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
          const tags = post.node.tags.map((tag) => tag.title); 
          createPage({
            path: '/post/' + post.node.slug,
            component: templates.post,
            context: {
              slug: post.node.slug,
              id: post.node.id,
              tags: tags,
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
          const slug = '/conference/' + conference.node.slug;
          createPage({
            path: slug,
            component: templates.conference,
            context: {
              slug: conference.node.slug,
              id: conference.node.id,
            },
          });

          // Create sub-pages
          for (const theme of conference.node.themes) {
            // Create topics
            for (const topic of theme.subtopics) {
              const topicSlug = '/conference/' + conference.node.slug + '/' + theme.slug + '/' + topic.slug;
              createPage({
                path: topicSlug,
                component: templates.conferenceTheme,
                context: {
                  fullSlug: topicSlug,
                  slug: topic.slug,
                  id: topic.id,
                  parentId: conference.node.id,
                },
              });

              // Create subtopics
              for (const subtopic of topic.subItems) {
                const subtopicSlug = '/conference/' + conference.node.slug + '/' + theme.slug + '/' + subtopic.slug;
                createPage({
                  path: subtopicSlug,
                  component: templates.conferenceTheme,
                  context: {
                    fullSlug: subtopicSlug,
                    slug: subtopic.slug,
                    id: subtopic.id,
                    parentId: conference.node.id,
                  },
                });
              }
            }
          }
        }

        const resources = result.data.resources;
        if (resources) {
          createPage({
            path: resources.slug,
            component: templates.resources,
            context: {
              slug: resources.slug,
            },
          });
        }

        const resourcesItems = result.data.resourceItems.edges;
        for (const resource of resourcesItems) {
          createPage({
            path: '/resources/' + resource.node.slug,
            component: templates.resource,
            context: {
              slug: resource.node.slug,
              id: resource.node.id,
              type: resource.node.typeOfResource,
            },
          });
        }

        const forms = result.data.forms.edges;
        for (const form of forms) {
          createPage({
            path: '/take-action/' + form.node.slug,
            component: templates.form,
            context: {
              slug: form.node.slug,
              id: form.node.id,
            },
          });
        }

        const meetings = result.data.meetings.edges;
        for (const meeting of meetings) {
          createPage({
            path: meeting.node.slug,
            component: templates.meeting,
            context: {
              slug: meeting.node.slug,
              id: meeting.node.id,
            },
          });
        }

        const pressReleases = result.data.pressReleases;
        if (pressReleases) {
          createPage({
            path: pressReleases.slug,
            component: templates.pressReleases,
            context: {
              slug: pressReleases.slug,
              id: pressReleases.id,
            },
          });
        }

        const eventsDistributor = result.data.eventsDistributor;
        if (eventsDistributor) {
          createPage({
            path: eventsDistributor.slug,
            component: templates.eventsDistributor,
            context: {
              slug: eventsDistributor.slug,
            },
          });
        }

        const events = result.data.events.edges;
        for (const event of events) {
          const tags = event.node.tags.map((tag) => tag.title); 
          createPage({
            path: '/event/' + event.node.slug,
            component: templates.event,
            context: {
              slug: event.node.slug,
              id: event.node.id,
              tags: tags,
            },
          });
        }

        const ffdChronicleDistributor = result.data.ffdChronicleDistributor;
        if (ffdChronicleDistributor) {
          createPage({
            path: ffdChronicleDistributor.slug,
            component: templates.ffdChronicleDistributor,
            context: {
              slug: ffdChronicleDistributor.slug,
            },
          });
        }

      })
    );
  });
};

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  actions.setWebpackConfig({
    plugins: [
      new FilterWarningsPlugin({
        exclude: /mini-css-extract-plugin[^]*Conflicting order. Following module has been added:/,
      }),
    ],
  });
};
