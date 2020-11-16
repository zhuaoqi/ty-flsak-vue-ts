<template>
  <div style="width: 100%; height: 100%">
    <canvas id="gui" v-if="aaa"></canvas>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import * as dat from 'dat.gui';

import init from './assets/gui.js'

@Component
export default class live2D extends Vue {
  private gui: any
  private aaa:boolean = false
  private mounted(){
    this.aaa = true
    this.gui = new dat.GUI();
    this.$nextTick(() =>{
      init(this.gui)
    })
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>