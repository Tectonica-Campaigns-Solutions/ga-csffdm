import React from 'react';
import NarrativeBlock from './NarrativeBlock/NarrativeBlock';
import Accordion from './Accordion/Accordion';
import Logos from './Logos/Logos';
import SimpleText from './SimpleText/SimpleText';
import Video from './Video/Video';
import Table from './Table/Table';
import ListHighlightEvent from './HighlightEvent/ListHighlightEvent';
import HighlightTools from './HighlightTools/HighlightTools';
import FormBlock from './FormBlock/FormBlock';
import Share from './Share/Share';

export default function Blocks({ blocks, usePrimaryHeading = false }) {
  return (
    <>
      {blocks.map((block, index) => {
        switch (block.__typename) {
          case 'DatoCmsNarrativeBlock':
            return <NarrativeBlock block={block} key={block.id} usePrimaryHeading={usePrimaryHeading} anchor={index} />;
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
          case 'DatoCmsHighlightEvent':
            return <ListHighlightEvent key={block.id} block={block} />;
          case 'DatoCmsHighlightTool':
            return <HighlightTools key={block.id} block={block} />;
          case 'DatoCmsTextHubspotForm':
            return <FormBlock key={block.id} block={block} />;
          case 'DatoCmsShare':
            return <Share key={block.id} block={block} />;

          default:
            return null;
        }
      })}
    </>
  );
}
