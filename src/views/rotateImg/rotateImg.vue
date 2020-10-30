<template>
  <div>
    <canvas ref="canvas">系统版本太低</canvas>
    <!-- <div class="img-wrap">
      <img id="t_img">
    </div> -->
    <div class="btn">
        <button type="button" @click="changeDir('left')">往左旋转</button>
        <button type="button" @click="changeDir('right')">往右旋转</button>
        <button type="button" @click="down">导出</button>
    </div>
  </div>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
declare var require: any;

@Component
export default class rotateImg extends Vue {
  private xTimes:number = 0
  private oc:any = null
  private ctx:any = null
  private t_img:any = null
  private image:any = null
  public $request!: any
  private str:string = ''

  private async mounted() {
    this.oc = this.$refs.canvas;
    this.t_img = document.querySelector('#t_img');
    if (this.oc.getContext('2d')) {
      this.ctx = this.oc.getContext('2d');
      this.image = new Image();
      this.$request.common.imgBase64().then((res: any) => {
        this.image.src = 'data:image/png;base64,' + res
        this.image.onload = () => {
          this.oc.width = this.image.width;
          this.oc.height = this.image.height;
          this.ctx.drawImage(this.image, 0, 0);
          this.t_img.src = this.oc.toDataURL('image');
        }
      })
      
    }
  }
  private changeDir(_dir:string) {
    if (_dir === 'left') {
        this.xTimes++


        
    } else {
        this.xTimes--;
    }
    this.ctx.clearRect(0, 0, this.oc.width, this.oc.height);
    
    var temp:any = this.oc.width;
    this.oc.width = this.oc.height;
    this.oc.height = temp;
    
    var center = {
        x: Math.round(this.oc.width / 2),
        y: Math.round(this.oc.height / 2)
    };
    console.log(center);
    this.ctx.translate(center.x, center.y);
    this.ctx.rotate(-90 * this.xTimes * Math.PI / 180);
    
    if (this.xTimes % 2 !== 0) {
        this.ctx.translate(-center.y, -center.x);
    } else {
        this.ctx.translate(-center.x, -center.y);
    }
    
    this.ctx.drawImage(this.image, 0, 0);
    this.t_img.src = this.oc.toDataURL('image');
  }
  private down() {
    var aDom = document.createElement('a');
    aDom.download = "勒是一只猫";
    aDom.href = this.oc.toDataURL('image', 0.7);
    aDom.click();
  }
  private getimgBase64(){
   
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>