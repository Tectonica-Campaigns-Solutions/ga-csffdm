import React from 'react';
import NarrativeBlock from './NarrativeBlock/NarrativeBlock';
import Accordion from './Accordion/Accordion';
import Logos from './Logos/Logos';
import SimpleText from './SimpleText/SimpleText';
import Video from './Video/Video';
import Table from './Table/Table';
import FormBlock from './FormBlock/FormBlock';
import Share from './Share/Share';
import CalendarBlock from './Calendar/CalendarBlock';
import ResourcesBlock from './Resources/ResourcesBlock';
import UpdatesBlock from './Updates/UpdatesBlock';
import WorkBlock from './Work/WorkBlock';
import ProcessBlock from './Process/ProcessBlock';
import LinksCard from './LinksCard/LinksCard';
import PdfButton from './PdfButton/PdfButton';
import { GatsbyImage } from 'gatsby-plugin-image';
import EmbedIframe from './EmbedIframe/EmbedIframe';
import GenericCardGrid from './GenericCardGrid/GenericCardGrid';
import Cta from '../Global/Cta/Cta';

export default function Blocks({ blocks, usePrimaryHeading = false, fixedCard = true, homePage = true}) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.__typename) {
          case 'DatoCmsNarrativeBlock':
            return <NarrativeBlock block={block} key={block.id} usePrimaryHeading={usePrimaryHeading} anchor={index} />;
          case 'DatoCmsCalendarBlock':
            return <CalendarBlock key={block.id} block={block} />;
          case 'DatoCmsResourcesBlock':
            return <ResourcesBlock key={block.id} block={block} withFixedCard={fixedCard} homePage={homePage} />;
          case 'DatoCmsCta':
            return <Cta key={block.id} cta={block} />;
          case 'DatoCmsUpdatesBlock':
            return <UpdatesBlock key={block.id} block={block} />;
          case 'DatoCmsFormBlock':
            return <FormBlock key={block.id} block={block} />;
          case 'DatoCmsWorkBlock':
            return <WorkBlock key={block.id} block={block} />;
          case 'DatoCmsProcessBlock':
            return <ProcessBlock key={block.id} block={block} />;
          case 'DatoCmsAcordion':
            return <Accordion key={block.id} items={block.items} renderChild={(item) => <div>{item.text}</div>} />;
          case 'DatoCmsLogo':
            return <Logos key={block.id} block={block} />;
          case 'DatoCmsSimpleText':
            return <SimpleText key={block.id} block={block} />;
          case 'DatoCmsTable':
            return <Table key={block.id} content={block} />;
          case 'DatoCmsVideoBlock':
            return <Video key={block.id} content={block} withContainer />;
          case 'DatoCmsShare':
            return <Share key={block.id} block={block} />;
          case 'DatoCmsLinksCard':
            return <LinksCard key={block.id} block={block} />;
          case 'DatoCmsPdfButton':
            return <PdfButton key={block.id} {...block} />;
          case 'DatoCmsEmbedForm':
            return <EmbedIframe key={block.id} content={block} />;
          case 'DatoCmsGenericCardGrid':
            return <GenericCardGrid key={block.id} {...block} />;
          case 'DatoCmsImage':
            return (
              <div className='image-block'>
                <div className='container'>
                  <GatsbyImage key={block.id} image={block.image.gatsbyImageData} alt={block.image.alt}  />
                </div>
              </div>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
