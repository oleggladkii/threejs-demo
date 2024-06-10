import type {Model} from "~/interfaces/entities/Model";

export const modelsData: Model[] = [
  {
    id: 1,
    path: 'assets/models/sofa/scene.gltf',
    scale: {
      x: 10,
      y: 10,
      z: 10
    },
    position: {
      x: -24,
      y: 1,
      z: 11.5
    },
    rotateY: 33,
    castShadow: true,
    receiveShadow: true,
    boundingBox: null,
    scene: null,
  },
  {
    id: 2,
    path: 'assets/models/sofa/scene.gltf',
    scale: {
      x: 10,
      y: 10,
      z: 10
    },
    position: {
      x: -24,
      y: 1,
      z: -11.5
    },
    rotateY: 213,
    castShadow: true,
    receiveShadow: true,
    boundingBox: null,
    scene: null,
  }
]
