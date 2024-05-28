require('./src/styles/global.scss');
require('./node_modules/bootstrap/dist/css/bootstrap.min.css');

export const onRouteUpdate = ({ location }) => {
  if (location.action === 'PUSH') {
    window.scrollTo(0, 0);
  }
};

export const shouldUpdateScroll = ({
  routerProps: { location },
  getSavedScrollPosition
}) => {
  const currentPosition = getSavedScrollPosition(location);
  const queriedPosition = [0, 0];

  window.scrollTo(...(currentPosition || queriedPosition));
  return false;
};
