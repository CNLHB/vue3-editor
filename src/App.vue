<template>
  <router-view />
</template>

<script>
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'App',
  setup () {
    const route = useRoute()

    watchEffect(() => {
      document.title = route.meta.title || '编辑器'
    })
  }
}
</script>

<style>
html,body{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}
</style>
