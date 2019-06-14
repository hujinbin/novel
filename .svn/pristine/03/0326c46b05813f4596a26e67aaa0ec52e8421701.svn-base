import AC from './components/async_load'

export default [
  {
    name: '首页',
    icon: 'home',
    path: '/',
    component: AC(() => import('./views/home'))
  },
  {
    name: '详情页',
    path: '/detail/:id',
    component: AC(() => import('./views/movie/detail'))
  },
  {
    name: '类型列表页',
    path: '/list/:type',
    component: AC(() => import('./views/home'))
  },
  {
    name: '年份列表页',
    path: '/year/:year',
    component: AC(() => import('./views/home'))
  },
  {
    name: '后台入口',
    icon: 'admin',
    path: '/admin',
    component: AC(() => import('./views/login'))
  },
  {
    name: '后台列表页面',
    icon: 'admin',
    path: '/admin/list',
    component: AC(() => import('./views/admin'))
  }
]
