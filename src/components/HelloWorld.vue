<script setup>
import { reactive, ref } from 'vue'

defineProps({
  msg: String
})

const state = reactive({
  count:1
})
const add = ()=>{
  console.log('add');
  state.count++
}
</script>

<template>
  <h1 class="title">{{ msg }}{{state.count}}</h1>
  <button @click="add">add1</button>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
<style lang="less" scoped>
.title{

  font-size: @width;
}
</style>