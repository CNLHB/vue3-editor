<!--  -->
<template>
  <div ref="menuRef" v-if="isContextMenuOpen" class="menu_wrap" :style="renderMenuStyle">
      <!-- :style="{left:pointerInfo.mx+'px',top:pointerInfo.my+'px'}"  -->
      1111222
  </div>
</template>

<script>
import { reactive, toRefs ,toRef,computed, watch} from 'vue'
import { useStore } from 'vuex'
import { GETTERS } from '@commits/editor'
import { useEditorContextMenu } from '../hooks'

export default {

    setup(props){
      const store = useStore()
            const state = reactive({
                menuRef:null
      })
     const { isContextMenuOpen, menuPst, onSelectMenu } = useEditorContextMenu(toRef(state, 'menuRef'))
        const pointerInfo =  computed(()=>store.state.editor.pointerInfo);
        // watch(()=>pointerInfo.value,(current,parent)=>{
        //     // console.log(current);
        // },{deep:true})

        const renderMenuStyle = computed(()=>{
            return {
                left: pointerInfo.value.x + 'px',
                top: pointerInfo.value.y + 'px',
                zIndex:111

            }
        })
      return {
        ...toRefs(state),
        isContextMenuOpen,
        renderMenuStyle,
        pointerInfo
      }
    }
}

</script>
<style lang='less' scoped>
.menu_wrap{
    position: absolute;
    top:0;
    left: 0;
    background-color: red;
}
</style>