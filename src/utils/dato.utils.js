export const pathToModel = (model = null, slug = '') => {
  if (model === 'basicPage') {
    return `/${slug}`;
  } else if (model === 'work') {
    return `/work/${slug}`;
  } else if (model === 'post') {
    return `/post/${slug}`;
  } else if (model === 'organization') {
    return `/organization/${slug}`;
  } else if (model === 'resource') {
    return `/resources/${slug}`;
  } else if (model === 'form') {
    return `/take-action/${slug}`;
  } else if (model === 'conference') {
    return `/conference/${slug}`;    
  } else {
    return `/${slug}`;
  }
};
