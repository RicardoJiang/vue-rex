export enum GameConfig {
  ROAD_VELOCITY = 15,
  CLOUD_VELOCITY = 5,
  TREE_VELOCITY = 15,
  CLOUD_COUNT = 2,
  TREE_COUNT = 2,
  REX_VELOCITY = 15,
  REX_MAX_JUMP = 100,
  REX_X_POSITION = 50,
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

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}
