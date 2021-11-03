<!--  -->
<template>
  <div class="scalebar" @mousemove="handleMouseMove" @click="handleClick">
    <div class="count" @click="handleScale('')">-</div>
     <el-tooltip :append-to-body="true" effect="dark" :content="tipsText" placement="top" :offset="20">
     <div
     @click="switchScale"
      class="text"
      tabindex="0"
      aria-describedby="el-popper-5168"
    >
      <span class="text_cnt" >{{scale}}%</span>
        <div v-if="scale != 100" class="el-icon-full-screen text_icon"></div>
        <div v-else class="el-icon-crop text_icon"></div>
    </div>

      <!-- <div class="text" :class="isHover ? 'on': ''"
        @click="switchScale"
        @mouseenter="handleHover"
        @mouseleave="handleLeave">
        <span class="text_cnt">{{numText}}%</span>
        <div v-if="numText !== 100" class="el-icon-full-screen text_icon"></div>
        <div v-else class="el-icon-crop text_icon"></div>
      </div> -->
    </el-tooltip>

    <!--teleport start--><!--teleport end-->
    <div class="count" @click="handleScale('add')">+</div>
  </div>
</template>

<script>
import { reactive, toRefs,computed } from 'vue'
import { useStore } from 'vuex'
import { COMMITS } from '../../../store/const/editor'
import { useEditorSizeInit } from '../hooks'

export default {
  components: {},
  setup(props, { emit }) {
    const store = useStore()
    const {initSize} = useEditorSizeInit()
    const scale =  computed(()=>{
      return parseInt(store.state.editor.canvasScaleRatio * 100)
    })
     const tipsText = computed(() => {
      if (scale.value === 100) {
        return '适应屏幕'
      }

      return '实际大小'
    })
    const state = reactive({
      scale,
      tipsText
    })

    function handleClick(event){
        event.stopPropagation();
        
    }
    function handleMouseMove(event){
        event.stopPropagation();
        
    }
    function handleScale(type){
      let s = scale.value
      if(type==='add'){
        s = Math.min(s+15,400)
      }else{
          s = Math.max( s - 15,15)
      }
      store.commit(COMMITS.SET_CANVAS_SCALE_RATIO,parseFloat(s/100))
    }
    function switchScale(){
      if (scale.value === 100) {
        initSize()
      } else {
        store.commit(COMMITS.SET_CANVAS_SCALE_RATIO, 1)
      }
    }
    return {
      ...toRefs(state),
      handleClick,
      handleMouseMove,
      handleScale,
      switchScale
    }
  },
}
</script>
<style lang='less' scoped>
.scalebar {
  position: absolute;
  right: 20px;
  bottom: 30px;
  height: 40px;
  display: flex;
  align-items: center;
  border: 1px solid rgba(0,0,0,.08);
  background: rgba(238,242,248,.9);
  border-radius: 6px;
  padding: 0 10px;
  z-index: 10;
}
.desc {
  font-size: 14px;
}
.text {
  min-width: 42px;
  position: relative;
  margin: 0 15px;
  cursor: pointer;
  text-align: center;
  .text_cnt {
    transition: all .35s;
  }
  .text_icon {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    opacity: 0;
    transition: all .35s;
  }
  &.on {
    .text_cnt {
      opacity: 0;
    }
    .text_icon {
      opacity: 1;
    }
  }
}
.count {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    color: #2354f4
  }
}
</style>