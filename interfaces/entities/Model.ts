import type {Box3} from "three";
import type {GLTF} from "three/examples/jsm/loaders/GLTFLoader";

export interface Model {
  id: number;
  group: string;
  path: string;
  scale: Coordinates;
  position: Coordinates;
  rotateY: number;
  castShadow: boolean;
  receiveShadow: boolean;
  boundingBox: Box3 | null;
  scene: GLTF.scene | null;
}
interface Coordinates {
  x: number;
  y: number;
  z: number;
}

