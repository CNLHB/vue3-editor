<!--  -->
<template>
  <div class="pancel_wrap">
      <div class="position_xy">
        <div>x: {{pointerInfo.x}}</div>
        <div>y: {{pointerInfo.y}}</div>
      </div>
  </div>
</template>

<script>
import { reactive, toRefs ,computed} from 'vue'
import { useStore } from 'vuex'

export default {

    setup(props){
      const store = useStore()
      const pointerInfo =  computed(()=>store.state.editor.pointerInfo)
      const state = reactive({

      })
      return {
        ...toRefs(state),
        pointerInfo
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
}
</style>