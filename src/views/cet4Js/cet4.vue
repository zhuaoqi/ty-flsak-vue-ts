<template lang="pug">
  #holloWord
    h1 {{ msg }}
    .box
      div.block(v-for="item of dataList" :key="item._id")
        span 姓名：{{ item.name }} 
        span 年龄：{{ item.age }} 
    button(@click="onClack") 按钮 
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
/// <reference path="./js/cte4.d.ts"/>
import cet4 from './js/cet4';

@Component
export default class HelloWorld extends Vue {
  private msg: string = 'HelloWorld!';
  private dataList: object[] = [
    { name: '小明', age: 20, _id: 0 },
    { name: '小孩', age: 21, _id: 1 },
    { name: '小红', age: 22, _id: 2 },
    { name: '小熊', age: 23, _id: 3 },
  ];

  private onClack() {
    console.log('点击了。');
    cet4.cet4Install();
    console.log(cet4);
  }
  private destroyed() {
    console.log('销毁');
    cet4.uncet4();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.class_1
  font-size 20px
.box
  width 80%
  margin 0 auto
  display flex
  justify-content space-between
  align-content center
  .block
    width 200px
</style>