import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  AmbientLight,
  TextureLoader,
} from 'three'
import { disposeObject } from '@/utils/disposeUtils'
import skyTexture from '@/assets/images/textures/blue-sky.jpg'

export function useThree() {
  const initThree = (canvasMountId: string) => {
    const canvas = document.getElementById(canvasMountId)! as HTMLCanvasElement
    const scene = new Scene()
    scene.background = new TextureLoader().load(skyTexture)

    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(32, 4, 0)

    camera.lookAt(0, 4, 0)

    const ambientLight = new AmbientLight(0xffffff, 1)
    scene.add(ambientLight)


    const renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    })
    renderer.shadowMap.enabled = true;
    renderer.setClearColor('blue', 0.3);

    return { scene, camera, renderer }
  }
  const cleanUpThree = (scene: Scene, renderer: WebGLRenderer) => {
    disposeObject(scene)
    renderer.dispose()
  }
  return {
    initThree,
    cleanUpThree,
  }
}
