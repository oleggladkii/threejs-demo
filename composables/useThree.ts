import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  AmbientLight,
} from 'three'
import { disposeObject } from '@/utils/disposeUtils'

export function useThree() {
  const initThree = (canvasMountId: string) => {
    const canvas = document.getElementById(canvasMountId)! as HTMLCanvasElement
    const scene = new Scene()

    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(38, 3, 0)
    camera.lookAt(0, 0, 0)

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
