// import AC from '../components/async_load'
import Home from '../page/Home/index.jsx';
import About from '../page/About/index.jsx';
import NotFound from '../page/NotFound/index.jsx';

const routes = [
  { name: '首页', path: '/', component: Home },
  { name: '关于', path: '/about', component: About },
  { name: '404', path: '/404', component: NotFound },
];
export default routes;
