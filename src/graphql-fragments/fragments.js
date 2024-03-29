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
      ...BlockCta
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
      ...BlockCta
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
      ...BlockCta
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
  }

  fragment BlockProcess on DatoCmsProcessBlock {
    __typename
    id: originalId
    headline
    introduction
    cta {
      ...BlockCta
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
    backgroundImage {
      width
      height
      alt
      url
      gatsbyImageData
    }
  }
`;
