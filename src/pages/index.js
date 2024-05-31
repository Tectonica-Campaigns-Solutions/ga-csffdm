import * as React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import Blocks from '../components/Blocks/Blocks';
import HomeHero from '../components/Global/HomeHero/HomeHero';
import WrapperLayout from '../components/Layout/WrapperLayout/WrapperLayout';

const IndexPage = ({ data: { page, favicon } }) => {
  const { seo, heroTitle, subtitle, heroImage, mobileHeroImage, ctas = [], blocks = [] } = page;

  return (
    <Layout>
      {seo && <SeoDatoCMS seo={seo} favicon={favicon} homepage />}

      <WrapperLayout variant="white">
        <HomeHero title={heroTitle} subtitle={subtitle} image={heroImage} mobileImage={mobileHeroImage} ctas={ctas} />

        {blocks && <Blocks blocks={blocks} />}
      </WrapperLayout>
    </Layout>
  );
};

export default IndexPage;

export const Head = () => <title>Home Page</title>;

export const HomeQuery = graphql`
  query Home {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    page: datoCmsHome {
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      id
      title
      heroTitle
      subtitle
      heroImage {
        gatsbyImageData
      }
      ctas {
        ...BlockCta
      }
      mobileHeroImage {
        gatsbyImageData
      }
      blocks {
        ... on DatoCmsNarrativeBlock {
          ...BlockNarrativeBlock
        }
        ... on DatoCmsCalendarBlock {
          ...BlockCalendar
        }
        ... on DatoCmsResourcesBlock {
          ...BlockResources
        }
        ... on DatoCmsUpdatesBlock {
          ...BlockUpdates
        }
        ... on DatoCmsWorkBlock {
          ...BlockWork
        }
        ... on DatoCmsFormBlock {
          ...BlockForm
        }
        ... on DatoCmsProcessBlock {
          ...BlockProcess
        }
      }
    }
  }
`;
