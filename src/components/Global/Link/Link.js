import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import { getCtaUrl } from '../../../utils';

const Link = ({ to, children, ...rest }) => {

  if (typeof to === 'string') {
    return (
      <GatsbyLink to={to} {...rest}>
        {children}
      </GatsbyLink>
    );
  } else if (to?.slug || to?.content?.slug || to?.link?.content) {
    const url = getCtaUrl(to);
    /*
    if (to?.content?.model.apiKey === 'conference_subtopic') {
      console.log('To', to);
      const lnk = '/conference/' + to?.content?.slug + '/' + to?.content?.slug;
      console.log(lnk);
    }
    */
    
    return (
      <GatsbyLink to={url} {...rest}>
        {children}
      </GatsbyLink>
    );
  } else if (to?.externalUrl || to?.link?.externalUrl) {
    if (to?.link?.externalUrl && to?.link?.externalUrl.includes('#section-')) {
      return (
        <GatsbyLink to={to.link.externalUrl} {...rest}>
          {children}
        </GatsbyLink>
      );
    } else {
      return (
        <a href={to?.externalUrl || to.link?.externalUrl} {...rest} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    }
  } else {
    if (to?.content !== undefined) {
      return <a href={`/${to?.content?.content.slug}/?type=${to?.content?.filter}`}>{children}</a>;
    } else {
      return <a {...rest}>{children}</a>;
    }
  }
};

export default Link;
