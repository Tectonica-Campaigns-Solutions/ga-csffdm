import React from 'react';
import { StructuredText, renderNodeRule } from 'react-datocms';
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
    if ( (node.type === 'paragraph' || node.type === 'list') && node.children) {
      node.children = node.children.map((child) => {
        if ((child.type === 'text') || (child.type === 'span')) {
          let newText = child?.value.replace(youtubeRegex, (match, videoId) => {
            return `<div class="youtube-embed"><iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe></div>`;
          });
          // remove extra line breaks from Wordpress
          newText = newText?.replace(/\n\n\n\n/g, '');
          return { ...child, value: newText };
        } else if ( (child.type === 'listItem') && (child.children[0].children[0].value === "\n") ) {
          // remove extra line breaks for li from Wordpress
          const newText = child.children[0].children[0].value.replace(/\n/g, '')
          return { ...child.children[0].children[0], value: newText };
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

  console.log('transformedContent', transformedContent);
  
  const renderCustomHtml = renderNodeRule(
    (node) => node.type === 'paragraph' && /<\/?[a-z][\s\S]*>/i.test(node.children[0].value),
    ({ node, key }) => {
      const renderChildren = (children) => {
        return children.map((child, index) => {
          if (child.children) {
            return renderChildren(child.children);
          } else {
            return <div key={index} dangerouslySetInnerHTML={{ __html: child.value }} />;
          }
        });
      };
  
      return renderChildren(node.children);
    }
  );

  const renderCustomHtml2 = renderNodeRule(
    (node) => node.type === 'span' && /<\/?[a-z][\s\S]*>/i.test(node.value),
    ({ node, key }) => (
      <div key={key} dangerouslySetInnerHTML={{ __html: node.value }} />
    )
  );
  
  return (
  <div className='rendered'>
    <StructuredText
      data={transformedContent}
      customRules={[renderCustomHtml, renderCustomHtml2]}
      // renderCustomHtml={[renderCustomHtml, renderCustomHtml2]}
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
  </div>);

  /*

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
  );*/
};

export default StructuredTextDefault;
