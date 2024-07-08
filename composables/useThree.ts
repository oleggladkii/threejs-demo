import {
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  AmbientLight,
} from 'three'
import {disposeObject, disposeSpotLight} from '@/utils/disposeUtils'

export function useThree() {
  let canvas: HTMLCanvasElement;
  const scene = new Scene();
  const initThree = (canvasMountId: string) => {
    canvas = document.getElementById(canvasMountId)! as HTMLCanvasElement
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(36, 6, 0)
    camera.lookAt(0, 6, 0)

    const renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    })
    renderer.shadowMap.enabled = true;

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    toggleTimeOfDay()
    return { scene, camera, renderer }
  }

  let ambientLight: AmbientLight | undefined;
  const toggleTimeOfDay = () => {
    if (!ambientLight) {
      ambientLight = new AmbientLight(0xffffff, 1)
      scene.add(ambientLight)
    } else {
      disposeSpotLight(scene, [ambientLight])
      ambientLight = new AmbientLight(0xffffff, 0.4)
      scene.add(ambientLight)
      ambientLight = undefined
    }
  }

  const cleanUpThree = (scene: Scene, renderer: WebGLRenderer) => {
    disposeObject(scene)
    renderer.dispose()
  }
  return {
    initThree,
    cleanUpThree,
    toggleTimeOfDay
  }
}
