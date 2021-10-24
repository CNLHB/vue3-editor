import { createStore } from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 编辑器模块
import editor from './modules/editor/index'

export default createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {
    editor
  }
})
