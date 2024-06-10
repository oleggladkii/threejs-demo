export interface Painting {
  id: number;
  path: string;
  width: number;
  height: number;
  position: Coordinates;
  rotateY: number;
  info: Info;
  lightConfig: LightConfig;
}
interface Coordinates {
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
  position: Coordinates;
  targetPosition: Coordinates;
}

