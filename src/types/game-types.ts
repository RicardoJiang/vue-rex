export enum GameConfig {
  ROAD_VELOCITY = 10,
  CLOUD_VELOCITY = 5,
  TREE_VELOCITY = 10,
  CLOUD_COUNT = 2,
  TREE_COUNT = 2,
  REX_VELOCITY = 10,
  REX_MAX_JUMP = 100,
<<<<<<< HEAD
=======
  REX_X_POSITION = 50,
>>>>>>> 75342ea (ADD: rex animation)
}

export enum GameStatus {
  WAIT,
  RUNNING,
  END,
}

export interface CloudItem {
  cloudTranslateX: number;
  cloudTranslateY: number;
}

export interface TreeItem {
  treeTranslateX: number;
  isBigTree: boolean;
  width: number;
  height: number;
  backgroundPosition: number;
}

export interface REXItem {
  rexTranslateY: number;
  rexVelocity: number;
  rexBackgroundPostion: number;
  isInJump: boolean;
}
