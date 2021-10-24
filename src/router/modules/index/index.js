const Index = () => import(/* webpackChunkName:"index" */ '../../../views/editor/index.vue')
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
