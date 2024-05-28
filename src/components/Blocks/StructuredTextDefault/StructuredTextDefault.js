import React from 'react';
import { StructuredText } from 'react-datocms';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import Accordion from '../../Blocks/Accordion/Accordion';
import EmbedIframe from '../../Blocks/EmbedIframe/EmbedIframe';
import Video from '../Video/Video';
import Table from '../Table/Table';
import PdfButton from '../PdfButton/PdfButton';
import GenericCardGrid from '../GenericCardGrid/GenericCardGrid';

const transformYouTubeUrls = (content) => {
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/g;

  const traverseAndTransform = (node) => {
    if (node.type === 'paragraph' && node.children) {
      node.children = node.children.map((child) => {
        if ((child.type === 'text') || (child.type === 'span')) {
          const newText = child.value.replace(youtubeRegex, (match, videoId) => {
            return `<div class="youtube-embed"><iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe></div>`;
          });
          return { ...child, value: newText };
        }
        return child;
      });
    }

    if (node.children) {
      node.children = node.children.map(traverseAndTransform);
    }

    return node;
  };

  const transformedContent = { ...content };

  transformedContent.document = content.value.document.children.map(traverseAndTransform);
  return transformedContent;
};


const StructuredTextDefault = ({ content }) => {

  const transformedContent = transformYouTubeUrls(content);

  const renderNode = (node) => {
    if (node.type === 'root' || node.type === 'paragraph') {
      return React.createElement(node.type === 'root' ? 'div' : 'p', { key: node.key }, node.children.map(renderNode));
    }

    console.log('render', node);

    if ((node.type === 'text') || (node.type === 'span')) {

      const youtubeEmbedRegex = /<div class="youtube-embed">[\s\S]*?<\/iframe>\s*<\/div>/g;
      const parts = node.value.split(youtubeEmbedRegex);
      const embeds = node.value.match(youtubeEmbedRegex) || [];

      return (
        <>
          {parts.map((part, index) => (
            <React.Fragment key={index}>
              {part}
              {embeds[index] && <div dangerouslySetInnerHTML={{ __html: embeds[index] }} />}
            </React.Fragment>
          ))}
        </>
      );
    }

    if (node.type === undefined)  {
      console.log('node undefined', node);
      return null;
    }

    return null;
  };
  
  return (
  <div className='rendered'>
    
    {/*transformedContent.document.map(renderNode)*/}

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
            console.log('pdf', record);
            return <PdfButton {...record} key={record.id} />;
          case 'DatoCmsGenericCardGrid':
            return <GenericCardGrid {...record} key={record.id} />;
          default:
            return null;
        }
      }}
    />
  </div>);

  const newStructuredText = transformedContent.document.map(renderNode);

  const renderNodeRules = {
    youtubeEmbed: ({ node }) => (
      <div className="youtube-embed">
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${node.videoId}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    ),
    paragraph: ({ children }) => <p>{children}</p>,
    text: ({ node }) => <>{renderNode(node)}</>,
    span: ({ node }) => { 
      return (
        <>
        { renderNode(node) }
        </>
      )
    },
    undefined: ({ node }) => <span style={{ color: 'red' }}>Undefined node type</span>, // Handle undefined nodes
  };

  return (
    <StructuredText
      data={newStructuredText}
      customNodeRules={renderNodeRules}
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
            console.log('pdf', record);
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
