<template>
  <div class="header">
    <div class="title">Running T-Rex</div>
    <div class="sub-title">
      <strong>T-Rex</strong>来自Google Chrome离线提示页面。<br />按 "Space"
      空格键开始游戏。
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 30px;
  text-align: center;
  font-family: Helvetica;
}

.sub-title {
  margin-top: 5px;
  text-align: center;
  color: #8a8a8a;
  margin-bottom: 80px;
  font-size: 16px;
  line-height: 20px;
  font-family: Georgia;
}
</style>
