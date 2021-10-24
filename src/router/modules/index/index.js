const Index = () => import(/* webpackChunkName:"index" */ '../../../view/editor/index.vue')
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
