<template>
  <div class="home">
    <Header />
    <div class="game">
      <img
        v-for="(item, index) in cloudItems"
        :key="index"
        src="@/assets/cloud.png"
        class="game-cloud"
        :style="cloudStyle(index)"
      />
      <img src="@/assets/tree.png" class="game-tree" />
      <img src="@/assets/road.png" :style="roadStyle" class="game-road" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CloudItem, GameConfig } from "@/types/game-types";
import { GetRandomNum } from "@/utils/GameUtils";
import Header from "@/components/Header.vue";
@Component({
  components: {
    Header,
  },
})
export default class HomeView extends Vue {
  roadTranslate = 0;
  cloudItems: Array<CloudItem> = [];
  timer = 0;
  get roadStyle() {
    return { transform: `translateX(${this.roadTranslate}px)` };
  }

  cloudStyle(index: number) {
    let cloudTranslateX = this.cloudItems[index].cloudTranslateX;
    let cloudTranslateY = this.cloudItems[index].cloudTranslateY;
    return {
      transform: `translate(${cloudTranslateX}px,${cloudTranslateY}px)`,
    };
  }
  created() {
    this.initGame();
    this.startGame();
  }

  initGame() {
    for (let i = 0; i < GameConfig.CLOUD_COUNT; i++) {
      this.cloudItems.push({
        cloudTranslateX: GetRandomNum(600, 1200),
        cloudTranslateY: GetRandomNum(0, 80),
      });
    }
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
    this.cloudItems.forEach((item) => {
      if (item.cloudTranslateX < 0) {
        item.cloudTranslateX = GetRandomNum(600, 1200);
        item.cloudTranslateY = GetRandomNum(0, 80);
      } else {
        item.cloudTranslateX -= GameConfig.CLOUD_VELOCITY;
      }
    });
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
.game {
  position: relative;
  height: 150px;
}

.game-cloud {
  position: absolute;
  top: 30px;
  left: 30px;
}

.game-road {
  position: absolute;
  bottom: 0;
  left: 0;
}

.game-tree {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
