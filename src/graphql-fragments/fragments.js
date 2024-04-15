import { graphql } from 'gatsby';

export const DatoCMS = graphql`
  fragment MainNavigation on DatoCmsMenuItem {
    id
    title
    position
    externalUrl
    isButton
    content {
      ... on DatoCmsResource {
        slug
        model {
          apiKey
        }
      }
      ... on DatoCmsEvent {
        slug
        model {
          apiKey
        }
      }
      ... on DatoCmsWork {
        slug
        model {
          apiKey
        }
      }
      ... on DatoCmsEvent {
        slug
        model {
          apiKey
        }
      }
      ... on DatoCmsPost {
        slug
        model {
          apiKey
        }
      }
      ... on DatoCmsAreasOfWork {
        slug
        model {
          apiKey
        }
      }
      ... on DatoCmsBasicPage {
        slug
        model {
          apiKey
        }
      }
      ... on DatoCmsNews {
        slug
        model {
          apiKey
        }
      }
      ... on DatoCmsGovernance {
        slug
        model {
          apiKey
        }
      }
      ... on DatoCmsResourcesModel {
        slug
        model {
          apiKey
        }
      }
      ... on DatoCmsForm {
        slug
        model {
          apiKey
        }
      }
      ... on DatoCmsConference {
        slug
        model {
          apiKey
        }
      }
    }
    treeChildren {
      ... on DatoCmsMenuItem {
        id
        title
        position
        externalUrl
        content {
          ... on DatoCmsResource {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsEvent {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsWork {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsEvent {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsPost {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsAreasOfWork {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsBasicPage {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsNews {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsGovernance {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsForm {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsConference {
            slug
            model {
              apiKey
            }
          }
        }
      }
    }
  }

  fragment BlockNarrativeBlock on DatoCmsNarrativeBlock {
    __typename
    id: originalId
    title
    textContent
    ctas {
      ... on DatoCmsCta {
        id: originalId
        title
        isButton
        style
        link {
          ... on DatoCmsGlobalLink {
            id
            content {
              ... on DatoCmsBasicPage {
                id
                slug
                model {
                  apiKey
                }
              }
              ... on DatoCmsForm {
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
    stats {
      ...BlockStats
    }
    image {
      width
      height
      alt
      url
      gatsbyImageData
    }
  }

  fragment Tags on DatoCmsTag {
    __typename
    id: originalId
    title
  }

  fragment BlockCta on DatoCmsCta {
    __typename
    id: originalId
    title
    isButton
    style
    link {
      ... on DatoCmsGlobalLink {
        label
        externalUrl
        content {
          ... on DatoCmsConferenceTheme {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsConferenceSubtopic {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsHome {
            model {
              apiKey
            }
          }
          ... on DatoCmsResource {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsEvent {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsWork {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsEvent {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsPost {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsAreasOfWork {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsBasicPage {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsNews {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsGovernance {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsForm {
            slug
            model {
              apiKey
            }
          }
          ... on DatoCmsConference {
            slug
            model {
              apiKey
            }
          }
        }
      }
    }
  }

  fragment BlockStats on DatoCmsStatsBlock {
    __typename
    id: originalId
    title
    value
    icon {
      width
      height
      url
    }
  }

  fragment BlockCalendar on DatoCmsCalendarBlock {
    __typename
    id: originalId
    headline
    introduction
    cta {
      ...BlockCta
    }
    items {
      ... on DatoCmsEvent {
        id
        title
        slug
        introduction
        date
        tags {
          ...Tags
        }
        mainImage {
          width
          height
          alt
          gatsbyImageData
        }
      }
    }
  }

  fragment BlockResources on DatoCmsResourcesBlock {
    __typename
    id: originalId
    headline
    introduction
    fixedCardIntro
    fixedCardTitle
    cta {
      ... on DatoCmsCta {
        id: originalId
        title
        isButton
        style
        link {
          ... on DatoCmsGlobalLink {
            id
            content {
              ... on DatoCmsResourcesModel {
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
    items {
      ... on DatoCmsResource {
        id
        title
        slug
        introduction
        tags {
          ...Tags
        }
      }
    }
  }

  fragment BlockUpdates on DatoCmsUpdatesBlock {
    __typename
    id: originalId
    headline
    cta {
      ... on DatoCmsCta {
        id: originalId
        title
        isButton
        style
        link {
          ... on DatoCmsGlobalLink {
            id
            content {
              ... on DatoCmsNews {
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
    backgroundImage {
      width
      height
      alt
      url
      gatsbyImageData
    }
    items {
      ... on DatoCmsPost {
        id
        title
        slug
        date
        introduction
        tags {
          ...Tags
        }
        mainImage {
          width
          height
          alt
          gatsbyImageData
        }
        model {
          apiKey
        }
      }
    }
  }

  fragment BlockWork on DatoCmsWorkBlock {
    __typename
    id: originalId
    headline
    introduction
    backgroundImage {
      width
      height
      alt
      url
      gatsbyImageData
    }
    items {
      ...BlockWorkItems
    }
  }

  fragment BlockWorkItems on DatoCmsWork {
    __typename
    title
    introduction
    slug
    icon {
      width
      height
      alt
      url
    }
    model {
      apiKey
    }
  }

  fragment BlockProcess on DatoCmsProcessBlock {
    __typename
    id: originalId
    headline
    introduction
    cta {
      ... on DatoCmsCta {
        id: originalId
        title
        isButton
        style
        link {
          ... on DatoCmsGlobalLink {
            id
            content {
              ... on DatoCmsBasicPage {
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
    items {
      id
      title
      introduction
      cta {
        ...BlockCta
      }
    }
  }

  fragment BlockForm on DatoCmsFormBlock {
    __typename
    id: originalId
    title
    backgroundColor
    footerForm
    formType
    backgroundImage {
      width
      height
      alt
      url
      gatsbyImageData
    }
  }

  fragment BlockLinksCard on DatoCmsLinksCard {
    __typename
    id: originalId
    introduction
    title
    links
  }

  fragment BlockAccordion on DatoCmsAcordion {
    __typename
    id: originalId
    items {
      title
      text
    }
  }

  fragment BlockText on DatoCmsSimpleText {
    id: originalId
    __typename
    text
  }

  fragment BlockVideo on DatoCmsVideoBlock {
    __typename
    id: originalId
    video {
      url
      thumbnailUrl
    }
  }

  fragment BlockTable on DatoCmsTable {
    __typename
    id: originalId
    table
  }

  fragment BlockShare on DatoCmsShare {
    __typename
    id: originalId
    title
    socialLinks {
      ... on DatoCmsSocialLink {
        id
        title
        url
        socialNetwork
      }
    }
    ctas {
      ... on DatoCmsCta {
        id: originalId
        title
        isButton
        link {
          ... on DatoCmsGlobalLink {
            id
            content {
              ... on DatoCmsBasicPage {
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
  }
`;
