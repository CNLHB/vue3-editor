<!--  -->
<template>
  <div class="pancel_wrap">
          <div class="position_mxmy">
        <div>mx: {{pointerInfo.movePst.x}}</div>
        <div>my: {{pointerInfo.movePst.y}}</div>
      </div>
      <!-- <div class="position_mxmy">
        <div>mx: {{pointerInfo.mX}}</div>
        <div>my: {{pointerInfo.mY}}</div>
      </div> -->
      <div class="position_xy">
        <div>x: {{pointerInfo.cx}}</div>
        <div>y: {{pointerInfo.cy}}</div>
      </div>
  </div>
</template>

<script>
import { reactive, toRefs ,computed} from 'vue'
import { useStore } from 'vuex'
import { GETTERS } from '@commits/editor'

export default {

    setup(props){
      const store = useStore()
      const pointerInfo =  computed(()=>store.state.editor.pointerInfo)
      const hoverEleList =  computed(()=>store.getters[GETTERS.HOVER_ELE_LIST])

      const state = reactive({

      })
      return {
        ...toRefs(state),
        pointerInfo,
        hoverEleList,
      }
    }
}

</script>
<style lang='less' scoped>
.pancel_wrap{
  height: 100%;
  background: #fff;
  .position_xy{
    display: flex;
    justify-content: space-around;
    width: 100%;
    position: absolute;
    bottom: 50px;
  }
  .position_mxmy{
        display: flex;
    justify-content: space-around;
    width: 100%;
    position: absolute;
    bottom: 100px;
  }
}
</style>