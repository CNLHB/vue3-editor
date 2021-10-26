<template>
    <div 
    :data-id="item.id"
    class="ele_box"
    :class="{
      'ele_type_img': item.type === 'img',
      'ele_type_text': item.type === 'text',
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
import { reactive} from 'vue'
import { toRefs } from '@vueuse/shared'
import { renderEleStyle } from '../methods'
export default {
    props:{
       item:Object,
       default:function(){
           return {}
       } 
    },
    setup(props,{emit}){
        const state = reactive({
            eleRef:null
        })
        return {
            ...toRefs(state),
            renderEleStyle
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
  cursor: move;
}
</style>