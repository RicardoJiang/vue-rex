<template>
  <div class="home">
    <Header />
    <div class="game">
      <img src="@/assets/road.png" :style="roadStyle" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GameConfig } from "@/types/game-types";
import Header from "@/components/Header.vue"; // @ is an alias to /src
@Component({
  components: {
    Header,
  },
})
export default class HomeView extends Vue {
  roadTranslate = 0;
  timer = 0;
  get roadStyle() {
    return { transform: `translateX(${this.roadTranslate}px)` };
  }
  created() {
    this.startGame();
  }

  startGame() {
    this.startGamerInterval();
  }

  startGamerInterval() {
    this.timer = setInterval(() => {
      this.updateGameStatus();
    }, 100);
  }

  updateGameStatus() {
    if (this.roadTranslate <= -600) {
      this.roadTranslate = 0;
    }
    this.roadTranslate -= GameConfig.ROAD_VELOCITY;
  }
}
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
.game-road {
  transform: translate(-700px, 0);
}
</style>
