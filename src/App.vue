<template>
  <div id="app">
    <app-layout v-if="$route.meta.fullScreen === undefined" />
    <router-view v-else/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import appLayout from '@/views/main/app-layout.vue';

@Component({ 
  components: {
    appLayout,
  }
})
export default class App extends Vue {
  private onScroll(e:any){
    console.log(e)
  }
}
</script>

<style>
#app {
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
