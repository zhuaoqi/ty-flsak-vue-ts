<template lang="pug">
  div
    button(@click="openinitModel") 打开
    div.waifu(v-if="waifu")
        div.waifu-tips
        canvas#live2d.live2d(width="280" height="250")
        div.waifu-tool
          span.fui-home
          span.fui-chat
          span.fui-eye
          span.fui-user
          span.fui-photo
          span.fui-info-circle
          span.fui-cross
    button(@click="requestImg") 请求图片

</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import initModel from './assets/waifu-tips.js';

declare var require: any;
interface SquareConfig {
  readonly color: string;
  readonly width: number;
}
@Component
export default class Live2d extends Vue {
  public $request!: any
  private waifu: boolean = false;
  private created() {
    console.log(this);
  }
  private openinitModel() {
    this.waifu = true;
    this.$nextTick(() => {
      initModel();
    });
  }
  private createSquare(config: SquareConfig): { color: string, area: number} {
    let newSquare = {color: 'white', area: 100};
    if (config.color) {
      newSquare.color = config.color;
    }
    if (config.width) {
      newSquare.area = config.width * config.width;
    }
    return newSquare;

  }
  private requestImg() {
    this.$request.common.imgBase64({a: 4155}).then((res:any) => {
      console.log(res)

    })
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
@import './assets/waifu.css';

</style>