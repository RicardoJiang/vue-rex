<template>
  <div class="home">
    <Header />
    <div class="game">
      <img src="@/assets/road.png" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue"; // @ is an alias to /src
@Component({
  components: {
    Header,
  },
})
export default class HomeView extends Vue {}
</script>
<style scoped>
.home {
  box-sizing: border-box;
  font-size: 1em;
  line-height: 1.6em;
  margin: 50px auto 0;
  max-width: 600px;
  width: 100%;
  overflow: hidden;
}
</style>
