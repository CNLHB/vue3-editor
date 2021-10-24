const Index = () => import(/* webpackChunkName:"index" */ '../../../view/editor/index/index.vue')
export default [
  {
    path: '/index',
    component: Index,
    name: 'Index',
    meta: {
      title: '首页'
    }
  },

]
