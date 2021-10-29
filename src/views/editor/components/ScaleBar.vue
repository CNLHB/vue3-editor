<!--  -->
<template>
  <div class="scalebar" @mousemove="handleMouseMove" @click="handleClick">
    <div class="count">-</div>
    <div
      class="text"
      tabindex="0"
      aria-describedby="el-popper-5168"
    >
      <span class="text_cnt" >100%</span>
      <div class="el-icon-crop text_icon"></div>
    </div>
    <!--teleport start--><!--teleport end-->
    <div class="count">+</div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'

export default {
  components: {},
  setup(props, { emit }) {
    const state = reactive({})
    function handleClick(event){
        event.stopPropagation();
        
    }
    function handleMouseMove(event){
        event.stopPropagation();
        
    }
    
    return {
      ...toRefs(state),
      handleClick,
      handleMouseMove
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
  &:hover {
    color: #2354f4
  }
}
</style>