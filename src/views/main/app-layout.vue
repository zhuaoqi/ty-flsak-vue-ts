<template>
  <el-container ref="container" @scroll.native="onScroll" class="app-layout">
    <el-header class="app-layout__header" :style="{height: '58px'}">
      <div class="app-layout__header-menu">
        <div id="nav">
          <router-link to="/">Home</router-link> |
          <router-link to="/about">About</router-link> |
          <router-link to="/live2d">live2d</router-link> |
          <router-link to="/rotateImg">rotateImg</router-link> |
          <router-link to="/cet4">cet4Js</router-link>
        </div>
         <div style="position: absolute;right: 30px;top: 14px;">
          <span v-if="userInfo.username">用户名：{{ userInfo.username }}</span>
          <el-button @click="laout">退出</el-button>
        </div>
      </div>
    </el-header>
    <el-container class="app-layout__container" >
      <el-main class="app-layout__main" style="padding: 0">
        <!--<router-view/>-->
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件，比如 page1,page2 -->
          </router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive">
          <!-- 这里是不被缓存的视图组件，比如 page3 -->
        </router-view>
      </el-main>
    </el-container>

  </el-container>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex'

import Utils from '@/lib/utils/utils'
@Component
export default class Main extends Vue {
  get userInfo(){
    return this.$store.state.common.userInfo
  }
  private onScroll(e:any ){
    console.log(e)
  }
  private laout(){
    Utils.clearCookies()
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">

</style>