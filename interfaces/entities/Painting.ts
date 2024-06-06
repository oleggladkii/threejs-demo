export interface Painting {
  id: number;
  path: string;
  width: number;
  height: number;
  position: Position;
  rotateY: number;
  info: Info;
  lightConfig: LightConfig;
}
interface Position {
  x: number;
  y: number;
  z: number;
}

interface Info {
  name: string;
  author: string;
  price: string;
}

interface LightConfig {
  position: Position;
  targetPosition: Position;
}

