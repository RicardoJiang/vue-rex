<template>
  <div class="home">
    <Header />
    <div class="game">
      <img
        v-for="(item, index) in cloudItems"
        :key="`${index}cloud`"
        src="@/assets/cloud.png"
        class="game-cloud"
        :style="cloudStyle(index)"
      />
      <div
        v-for="(item, index) in treeItems"
        :key="`${index}tree`"
        :style="treeStyle(index)"
        :class="treeClass(index)"
      />
      <div class="rex" :style="rexStyle" />
      <img src="@/assets/road.png" :style="roadStyle" class="game-road" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  CloudItem,
  GameConfig,
  GameStatus,
  Rect,
  REXItem,
  TreeItem,
} from "@/types/game-types";
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
  treeItems: Array<TreeItem> = [];
  rexItem: REXItem = {
    rexTranslateY: 0,
    rexVelocity: 0,
    rexBackgroundPostion: 0,
    isInJump: false,
  };
  gameStatus = GameStatus.WAIT;
  timer = 0;
  get roadStyle() {
    return { transform: `translateX(${this.roadTranslate}px)` };
  }

  get rexStyle() {
    return {
      transform: `translateY(${this.rexItem.rexTranslateY}px)`,
      "background-position": `${this.rexItem.rexBackgroundPostion}px 0`,
    };
  }

  cloudStyle(index: number) {
    let cloudTranslateX = this.cloudItems[index].cloudTranslateX;
    let cloudTranslateY = this.cloudItems[index].cloudTranslateY;
    return {
      transform: `translate(${cloudTranslateX}px,${cloudTranslateY}px)`,
    };
  }
  treeStyle(index: number) {
    const item = this.treeItems[index];
    return {
      transform: `translateX(${item.treeTranslateX}px)`,
      width: `${item.width}px`,
      "background-position": `${item.backgroundPosition}px 0`,
    };
  }

  treeClass(index: number): string {
    const item = this.treeItems[index];
    if (item.isBigTree) {
      return "game-tree-big";
    } else {
      return "game-tree";
    }
  }

  submit(event: KeyboardEvent) {
    if (event.code === "Space") {
      if (
        this.gameStatus === GameStatus.WAIT ||
        this.gameStatus === GameStatus.END
      ) {
        this.gameStatus = GameStatus.RUNNING;
        this.initGame();
        this.startGame();
      } else if (this.gameStatus === GameStatus.RUNNING) {
        if (this.rexItem.rexTranslateY === 0) {
          if (this.rexItem.isInJump === false) {
            this.rexItem.isInJump = true;
            this.rexItem.rexVelocity = GameConfig.REX_VELOCITY;
          }
        }
      }
    }
  }

  created() {
    window.addEventListener("keyup", this.submit);
  }

  initGame() {
    this.cloudItems = [];
    for (let i = 0; i < GameConfig.CLOUD_COUNT; i++) {
      this.cloudItems.push({
        cloudTranslateX: GetRandomNum(600, 1200),
        cloudTranslateY: GetRandomNum(0, 60),
      });
    }
    this.treeItems = [];
    for (let i = 0; i < GameConfig.TREE_COUNT; i++) {
      const isBigTree = GetRandomNum(0, 100) % 2 ? true : false;
      const itemWidth = isBigTree ? 25 : 17;
      const itemHeight = isBigTree ? 50 : 35;
      const itemCount = GetRandomNum(1, 3);
      const offsetPosition = GetRandomNum(0, 2);
      this.treeItems.push({
        treeTranslateX: GetRandomNum(600, 1200),
        isBigTree: isBigTree,
        width: itemWidth * itemCount,
        height: itemHeight,
        backgroundPosition: -itemWidth * offsetPosition,
      });
    }
  }

  startGame() {
    this.startGamerInterval();
  }

  startGamerInterval() {
    clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.gameStatus === GameStatus.RUNNING) {
        this.updateGameStatus();
      }
    }, 50);
  }

  updateGameStatus() {
    if (this.roadTranslate <= -600) {
      this.roadTranslate = 0;
    }
    this.roadTranslate -= GameConfig.ROAD_VELOCITY;
    this.cloudItems.forEach((item) => {
      if (item.cloudTranslateX < 0) {
        item.cloudTranslateX = GetRandomNum(600, 1200);
        item.cloudTranslateY = GetRandomNum(0, 60);
      } else {
        item.cloudTranslateX -= GameConfig.CLOUD_VELOCITY;
      }
    });
    this.treeItems.forEach((item) => {
      if (item.treeTranslateX < 0) {
        const isBigTree = GetRandomNum(0, 100) % 2 ? true : false;
        const itemWidth = isBigTree ? 25 : 17;
        const itemHeight = isBigTree ? 50 : 35;
        const itemCount = GetRandomNum(1, 3);
        const offsetPosition = GetRandomNum(0, 2);
        item.treeTranslateX = GetRandomNum(600, 1200);
        item.isBigTree = isBigTree;
        item.width = itemWidth * itemCount;
        item.height = itemHeight;
        item.backgroundPosition = -itemWidth * offsetPosition;
      } else {
        item.treeTranslateX -= GameConfig.TREE_VELOCITY;
      }
    });

    if (this.rexItem.isInJump) {
      this.rexItem.rexTranslateY -= this.rexItem.rexVelocity;

      if (this.rexItem.rexTranslateY <= -GameConfig.REX_MAX_JUMP) {
        this.rexItem.rexVelocity = -GameConfig.REX_VELOCITY;
      } else if (this.rexItem.rexTranslateY >= 0) {
        this.rexItem.isInJump = false;
        this.rexItem.rexTranslateY = 0;
        this.rexItem.rexVelocity = 0;
      }
    } else {
      if (this.rexItem.rexBackgroundPostion <= -220) {
        this.rexItem.rexBackgroundPostion = 0;
      } else {
        this.rexItem.rexBackgroundPostion -= 44;
      }
    }

    for (let item of this.treeItems) {
      if (
        this.isOverlap(
          { x: 50, y: this.rexItem.rexTranslateY, width: 24, height: 30 },
          {
            x: item.treeTranslateX,
            y: 0,
            width: item.width / 2,
            height: item.height / 2,
          }
        )
      ) {
        this.endGame();
      }
    }
  }

  endGame() {
    if (this.gameStatus === GameStatus.RUNNING) {
      this.gameStatus = GameStatus.END;
    }
  }

  isOverlap(rect1: Rect, rect2: Rect) {
    const startX1 = rect1.x;
    const startY1 = rect1.y;
    const endX1 = startX1 + rect1.width;
    const endY1 = startY1 + rect1.height;

    const startX2 = rect2.x;
    const startY2 = rect2.y;
    const endX2 = startX2 + rect2.width;
    const endY2 = startY2 + rect2.height;

    return !(
      endY2 < startY1 ||
      endY1 < startY2 ||
      startX1 > endX2 ||
      startX2 > endX1
    );
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
  background-repeat: no-repeat;
  height: 35px;
  background-image: url("@/assets/tree.png");
}

.game-tree-big {
  position: absolute;
  bottom: 0;
  left: 0;
  background-repeat: no-repeat;
  height: 50px;
  background-image: url("@/assets/tree-big.png");
}

.rex {
  position: absolute;
  bottom: 0;
  left: 50px;
  background-repeat: no-repeat;
  width: 44px;
  height: 47px;
  background-image: url("@/assets/rex.png");
}
</style>
