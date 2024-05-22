require('./src/styles/global.scss');
require('./node_modules/bootstrap/dist/css/bootstrap.min.css');
export const onRouteUpdate = ({ location }) => {
  if (location.action === 'PUSH') {
    window.scrollTo(0, 0);
  }
};