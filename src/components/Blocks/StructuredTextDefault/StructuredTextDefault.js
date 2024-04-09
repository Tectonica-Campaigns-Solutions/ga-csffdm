import React from 'react';
import { StructuredText } from 'react-datocms';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import Accordion from '../../Blocks/Accordion/Accordion';
import EmbedIframe from '../../Blocks/EmbedIframe/EmbedIframe';
import Video from '../Video/Video';
import Table from '../Table/Table';
import PdfButton from '../PdfButton/PdfButton';
import GenericCardGrid from '../GenericCardGrid/GenericCardGrid';

const StructuredTextDefault = ({ content }) => {
  return (
    <StructuredText
      data={content}
      renderBlock={({ record }) => {
        switch (record.__typename) {
          case 'DatoCmsImage':
            return <ImageWrapper image={record.image} key={record.id} />;
          case 'DatoCmsEmbedIframe':
            return <EmbedIframe content={record} key={record.id} />;
          case 'DatoCmsTableBlock':
            return <Table content={record} key={record.id} />;
          case 'DatoCmsVideoBlock':
            return <Video content={record} key={record.id} />;
          case 'DatoCmsAcordion':
            return <Accordion items={record.items} key={record.id} />;
          case 'DatoCmsPdfButton':
            return <PdfButton {...record} key={record.id} />;
          case 'DatoCmsGenericCardGrid':
            return <GenericCardGrid {...record} key={record.id} />;

          default:
            return null;
        }
      }}
    />
  );
};

export default StructuredTextDefault;
