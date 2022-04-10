<template>
  <div class="t_right">
    <el-button type="primary">下载</el-button>
  </div>
</template>

<script>
import {reactive,toRefs} from 'vue'
export default {
  name: "tool-right",
  setup(props) {
    const state = reactive({
    })
    return {
        ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="less">
.t_right{
  justify-self: flex-end;
}
</style>