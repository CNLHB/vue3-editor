<!--  -->
<template>
  <div ref="menuRef" class="menu_wrap">
      1111222
  </div>
</template>

<script>
import { reactive, toRefs ,computed} from 'vue'
import { useStore } from 'vuex'
import { GETTERS } from '@commits/editor'
import { useEditorContextMenu } from '../hooks'

export default {

    setup(props){
      const store = useStore()
     const { isContextMenuOpen, menuPst, onSelectMenu } = useEditorContextMenu(toRef(state, 'menuRef'))
      const state = reactive({

      })
      return {
        ...toRefs(state),
      }
    }
}

</script>
<style lang='less' scoped>
.menu_wrap{
    position: absolute;
    background-color: #fff;
}
</style>