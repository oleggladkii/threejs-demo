import { PerspectiveCamera, Scene, WebGLRenderer, SpotLight, AmbientLight, DirectionalLight } from 'three'
import { disposeObject } from '@/utils/disposeUtils'

export function useThree() {
  const initThree = (canvasMountId: string) => {
    const canvas = document.getElementById(canvasMountId)! as HTMLCanvasElement
    const scene = new Scene()

    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 2000)
    camera.position.set(38, 1, 0)
    camera.lookAt(0, 0, 0)

    // const spotLight = new SpotLight('white', 2);
    // spotLight.position.set(0.1, -1, 3);
    // const ambientLight = new AmbientLight(0x101010, 1.0);
    // ambientLight.position.set(0, 0, 0,);
    const directionalLight = new DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(0.1, 0.1, 3)

    scene.add(directionalLight)

    const renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    })
    renderer.setClearColor('blue', 0.3)

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
