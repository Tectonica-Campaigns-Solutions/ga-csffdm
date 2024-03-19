import { graphql } from 'gatsby';

export const DatoCMS = graphql`
  fragment MainNavigation on DatoCmsMenuItem {
    id
    title
    position
    externalUrl
    isButton
    content {
      ... on DatoCmsBasicPage {
        id
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

  fragment BlockNarrativeBlock on DatoCmsNarrativeBlock {
    __typename
    id: originalId
    title
    textContent
    ctas {
      ...BlockCta
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
      ... on DatoCmsWork {
        id
        title
        introduction
        slug
        model {
          apiKey
        }
        icon {
          width
          height
          alt
          url
        }
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
