import React from 'react';
import { StructuredText, renderNodeRule } from 'react-datocms';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import Accordion from '../../Blocks/Accordion/Accordion';
import EmbedIframe from '../../Blocks/EmbedIframe/EmbedIframe';
import Video from '../Video/Video';
import Table from '../Table/Table';
import PdfButton from '../PdfButton/PdfButton';
import GenericCardGrid from '../GenericCardGrid/GenericCardGrid';
import { buildClient } from '@datocms/cma-client-browser';

const getFiles = async() => {
  const client = buildClient({ apiToken: process.env.GATSBY_DATO_API_TOKEN_CONTENT });

  let files = [];
    
  for await (const upload of client.uploads.listPagedIterator({
      filter: {
        fields: {
          format: {
            eq: "pdf",
          },
          _createdAt: {
            lte: "2024-06-06T14:30:00+00:00"
          },
        },
      },
  })) {
      files.push({
        id: upload.id,
        basename: upload.basename,
        url: upload.url,
      })
  }
  
  return files;
}

const files = await getFiles();

const transformYouTubeUrls = (content, pdfs) => {
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/g;
  const uploadsRegex = /(?:https?:\/\/)?(?:www\.)?(?:csoforffd\.org\/wp-content\/uploads\/)([0-9]{4})\/([0-9]{2})\/([a-zA-Z0-9_-]+)/g;
  const wordpressUrlRegex = /\/\d{4}\/\d{2}\/\d{2}\//;
  
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
        } else if (child.type === 'link') {
          let newUrl = ''
          if (child.url.includes('/uploads')) {
            newUrl = child?.url.replace(uploadsRegex, (match, year, month, file) => {
              // return `https://www.datocms-assets.com/120585/${file}`; // replace uploads urls with datocms urls - DISABLED AS DATO ADS A RANDOM NUMBER AT THE BEGINNING OF THE FILE
              const fileObj = pdfs.find(f => f.basename === file);
              return fileObj !== undefined ? fileObj.url.replace('.pdf', '') : `https://csoforffd.wordpress.com/wp-content/uploads/${year}/${month}/${file}`;
              // return `https://csoforffd.wordpress.com/wp-content/uploads/${year}/${month}/${file}`;
            });
          } else {
            newUrl = child?.url.replace(wordpressUrlRegex, (match) => {
              return `/post/`;
            });
          }
          
          // let newText2 = child?.url.replace('csoforffd.org', 'csoforffd.wordpress.com');
          return { ...child, url: newUrl };
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

  const transformedContent = transformYouTubeUrls(content, files);

  // console.log('transformedContent', transformedContent);
  
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

};

export default StructuredTextDefault;