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
    draggable="false"

    ref="eleBoxRef"
    :style="renderEleStyle(item)"
    >
        <div class="ele_content">
            <img v-if="item.props && item.type === 'img'" :src="item.src" draggable="false" alt="">
            <div class="editor_ele_text_box"
            :class="{
              'editor_ele_text_box_editing': isEditing
            }"
            v-if="item.props && item.type === 'text'"
            draggable="false"
            ref="eleRef"
          >
          <pre ref="textRef" class="editor_ele_text" :style="renderTextStyle(item)">{{item.props.textContent ||'双击编辑文本'}}</pre>
        </div>            
        </div>
    </div>
</template>
<script>
import { reactive,computed} from 'vue'
import { toRefs } from '@vueuse/shared'
import { renderEleStyle, renderTextStyle } from '../methods'
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
        const isDagger =  computed(()=>store.state.editor.isDagger)
        const hoverEleList =  computed(()=>store.getters[GETTERS.HOVER_ELE_LIST])
        const isHover =  computed(()=>{
            if(hoverEleList.value.length===0)return ''
            const {id} = hoverEleList.value[hoverEleList.value.length-1]
            return !isDagger.value&&id
        })

        const state = reactive({
          eleBoxRef:null,
            eleRef:null,
            isEditing:false
        })
        return {
            ...toRefs(state),
            renderEleStyle,
            renderTextStyle,
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
  &::before{
       height: 100%;
      width: 100%;
          box-sizing: border-box;
  }
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
  .editor_ele_text_box {
  padding: 3px 10px;
  word-break: break-all;
  word-wrap: break-word;
  &.editor_ele_text_box_editing {
    visibility: hidden;
  }
  pre {
    display: block;
    margin: 0;
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
  }
}
.ele_selected {
  //  box-sizing: border-box;
  //  border: 1px solid @hoverColor;
   cursor: move;
   height: 100%;
    width: 100%;
   &::before{
     display: block;
     content: '';
     position: absolute;
     border: 1px solid @hoverColor;
   }
}
.ele_hovered {
  //  border: 1px solid @hoverColor;
  //  box-sizing: border-box;

      &::before{
     display: block;
     content: '';
     position: absolute;
     border: 1px solid @hoverColor;
   }
}
</style>