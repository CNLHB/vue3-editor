<template>
    <div 
    :data-id="item.id"
    class="ele_box"
    :class="{
      'ele_type_img': item.type === 'img',
      'ele_type_text': item.type === 'text',
      'ele_selected': item.id === selectId,
      'ele_hovered': item.id === isHover,
    }"
    ref="eleRef"
    :style="renderEleStyle(item)"
    >
        <div class="ele_content">
            <img :src="item.src" alt="">
        </div>
    </div>
</template>
<script>
import { reactive,computed} from 'vue'
import { toRefs } from '@vueuse/shared'
import { renderEleStyle } from '../methods'
import { useStore } from 'vuex'
import { GETTERS } from '@commits/editor'
export default {
    props:{
       item:Object,
       default:function(){
           return {}
       } 
    },
    setup(props,{emit}){
        const store = useStore()
        const selectId =  computed(()=>store.state.editor.selectId)
        const hoverEleList =  computed(()=>store.getters[GETTERS.HOVER_ELE_LIST])
        const isHover =  computed(()=>{
                    if(hoverEleList.value.length===0)return ''
        const {id} = hoverEleList.value[hoverEleList.value.length-1]
        return id
        })

        const state = reactive({
            eleRef:null
        })
        return {
            ...toRefs(state),
            renderEleStyle,
            selectId,
            isHover
        }

    }
    
}

</script>


<style lang="less" scoped>
.ele_box {
  position: absolute;
  box-sizing: border-box;
  user-select: none;
  opacity: 1!important;
}

.ele_type_img {
  img {
    width: 100%;
    height: 100%;
  }
}
.ele_type_text {
  overflow: visible;
}

.ele_selected {
   box-sizing: border-box;
   border: 1px solid @hoverColor;
   cursor: move;
}
.ele_hovered {
   border: 1px solid @hoverColor;
}
</style>