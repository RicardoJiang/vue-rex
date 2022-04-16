export enum GameConfig {
  ROAD_VELOCITY = 10,
  CLOUD_VELOCITY = 5,
  TREE_VELOCITY = 10,
  CLOUD_COUNT = 2,
  TREE_COUNT = 2,
}

export interface CloudItem {
  cloudTranslateX: number;
  cloudTranslateY: number;
}

export interface TreeItem {
  treeTranslateX: number;
  isBigTree: boolean;
  width: number;
  backgroundPosition: number;
}
