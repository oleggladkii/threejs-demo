<template lang="pug">
.page
  canvas(id="mountId" width="700" height="500" class="canvas")
  q-card.info-card(ref="infoCardRef", :class="{'fadeIn': isDisplayImageInfo, 'fadeOut': !isDisplayImageInfo}")
    template(v-if="selectedPainting?.info.price")
      img(:src='selectedPainting?.path')
      q-card-section
        .text-h6 {{ selectedPainting?.info.name }}
        .text-subtitle2 by {{ selectedPainting?.info.author }}
      q-card-section.q-pt-none
        .text-subtitle2 Current BID {{ selectedPainting?.info.price }}
        .text-subtitle2 Click to buy

  .overlay(v-if="!controlsLocked")
    h3.title(@click="hideControls") Click to start
    q-btn.q-ma-sm(color="primary" to="/") Back
</template>

<script setup lang="ts">
  import {
    type PerspectiveCamera,
    PlaneGeometry,
    type Scene,
    type WebGLRenderer,
    BoxGeometry,
    Mesh,
    MeshPhysicalMaterial,
    DoubleSide,
    TextureLoader,
    Group,
    MirroredRepeatWrapping,
    Box3,
    Vector3,
    SphereGeometry,
    Clock,
    SpotLight,
    SpotLightHelper,
    MeshStandardMaterial,
    MathUtils,
  } from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import floorTexture from '@/assets/images/textures/woodfloor1k.jpg'
import ceilingTexture from '@/assets/images/textures/rubber.jpg'
import wallTexture from '@/assets/images/textures/bricks-white.jpg'
import { useThree } from '@/composables/useThree'
import type {Painting} from "@/interfaces/entities/Painting";
import {paintingsData} from "@/utils/data/paintingsData";
import {config} from "@/utils/data/config";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
  import type {Model} from "~/interfaces/entities/Model";
  import {modelsData} from "~/utils/data/modelsData";

definePageMeta({
  layout: 'empty',
})

let _scene: Scene
let _camera: PerspectiveCamera
let _renderer: WebGLRenderer
let _controls: PointerLockControls
let _renderLoopId: number
let _box: Mesh
const { initThree, cleanUpThree } = useThree()
const canvas = computed(() => document.getElementById('mountId') as HTMLCanvasElement)


const animateObject = () => {
  _box.rotation.x += 0.003
  _box.rotation.y += 0.005
}
const renderCube = () => {
  const textureSphere = new TextureLoader().load(wallTexture)
  const geometry = new SphereGeometry(2, 100, 100)
  const material = new MeshPhysicalMaterial({
    map: textureSphere,
    roughness: 0.1,
    reflectivity: 1,
  })
  _box = new Mesh(geometry, material)
  _box.castShadow = true;
  _box.position.set(18, 2.5, 10)
  _scene.add(_box)
}

const createSpotlight = (lightPosition: { x: number, y: number, z: number }, intensity:number, targetPosition: { x: number, y: number, z: number }) => {
  const spotlight = new SpotLight(0xffffff, intensity);
  spotlight.position.set(lightPosition.x, lightPosition.y, lightPosition.z);
  spotlight.castShadow = true;
  spotlight.target.position.copy(new Vector3(targetPosition.x, targetPosition.y, targetPosition.z));
  spotlight.angle = MathUtils.degToRad(50);
  spotlight.penumbra = 1;
  spotlight.distance = 20;

  spotlight.shadow.mapSize.width = 1024;
  spotlight.shadow.mapSize.height = 1024;
  spotlight.shadow.camera.near = 0.5;
  spotlight.shadow.camera.far = 50;

  _scene.add(spotlight);
  _scene.add(spotlight.target);

  // helper for the spotlight
  // const spotlightHelper = new SpotLightHelper(spotlight);
  // _scene.add(spotlightHelper);

  return spotlight;
}

const renderFloor = () => {
  const textureFloor = new TextureLoader().load(floorTexture)
  textureFloor.wrapS = MirroredRepeatWrapping
  textureFloor.wrapT = MirroredRepeatWrapping
  textureFloor.repeat.set(16, 4)

  const floorPlane = new Mesh(new PlaneGeometry(config.floorWidth + 1, config.floorHeight + 1), new MeshStandardMaterial({ map: textureFloor, side: DoubleSide }))
  floorPlane.rotateX(Math.PI / 2)
  floorPlane.position.set(0, -1, 0)
  floorPlane.receiveShadow = true;

  _scene.add(floorPlane)
}

const renderCeiling = () => {
  const textureCeiling = new TextureLoader().load(ceilingTexture)
  textureCeiling.wrapS = MirroredRepeatWrapping
  textureCeiling.wrapT = MirroredRepeatWrapping
  textureCeiling.repeat.set(10, 2)

  const ceilingPlane = new Mesh(new PlaneGeometry(config.floorWidth, config.floorHeight), new MeshStandardMaterial({ map: textureCeiling }))
  ceilingPlane.rotateX(Math.PI / 2)
  ceilingPlane.position.set(0, 20, 0)

  _scene.add(ceilingPlane)
}

const wallsGroup = new Group()
const renderWalls = () => {
  _scene.add(wallsGroup)

  const textureWall = new TextureLoader().load(wallTexture)
  textureWall.wrapS = MirroredRepeatWrapping
  textureWall.wrapT = MirroredRepeatWrapping
  textureWall.repeat.set(4, 3)
  const material = new MeshStandardMaterial({ map: textureWall })

  const frontWall = new Mesh(new BoxGeometry(config.floorWidth, 24, 0.1), material)
  frontWall.position.set(0, 10, -(config.floorHeight / 2))
  frontWall.castShadow = true;
  frontWall.receiveShadow = true;

  const backWall = new Mesh(new BoxGeometry(config.floorWidth, 24, 0.1), material)
  backWall.position.set(0, 10, (config.floorHeight / 2))
  backWall.castShadow = true;
  backWall.receiveShadow = true;

  const leftWall = new Mesh(new BoxGeometry(config.floorHeight, 24, 0.1), material)
  leftWall.position.set(-(config.floorWidth / 2), 10, 0)
  leftWall.rotateY(Math.PI / 2)
  leftWall.castShadow = true;
  leftWall.receiveShadow = true;

  const rightWall = new Mesh(new BoxGeometry(config.floorHeight, 24, 0.1), material)
  rightWall.position.set((config.floorWidth / 2), 10, 0)
  rightWall.rotateY(Math.PI / 2)
  rightWall.castShadow = true;
  rightWall.receiveShadow = true;

  wallsGroup.add(frontWall, backWall, leftWall, rightWall)

  wallsGroup.children.forEach((wall) => {
    wall.BBox = new Box3()
    wall.BBox.setFromObject(wall)
  })
}


const renderImage = (painting: Painting) => {
  const texture = new TextureLoader().load(painting.path)
  const material = new MeshStandardMaterial({ map: texture })
  const geometry = new PlaneGeometry(painting.width, painting.height)
  const image = new Mesh(geometry, material)
  image.position.set(painting.position.x, painting.position.y, painting.position.z)
  if (painting.rotateY) {
    image.rotateY(painting.rotateY)
  }
  image.castShadow = true;
  image.receiveShadow = true;

  return image
}
const renderImages = () => {
  paintingsData.forEach(painting => _scene.add(renderImage(painting)));
  paintingsData.forEach(painting => createSpotlight(painting.lightConfig.position, 150, painting.lightConfig.targetPosition));
}

const startControls = () => {
  _controls.lock()
}
const hideControls = () => {
  document.addEventListener('click', startControls)
}
const showControls = () => {
  document.removeEventListener('click', startControls)
}
const setControls = () => {
  _controls = new PointerLockControls(_camera, document.body)
  _controls.addEventListener('lock', onControlsLock)
  _controls.addEventListener('unlock', onControlsUnlock)
}
const controlsLocked = ref(false)
const onControlsLock = () => {
  controlsLocked.value = true
}
const onControlsUnlock = () => {
  controlsLocked.value = false
  showControls()
}

const setupScene = () => {
  const { scene, camera, renderer } = initThree('mountId')
  _scene = scene
  _camera = camera
  _renderer = renderer
  _controls = new PointerLockControls(_camera, document.body)

  // renderCube()
  renderWalls()
  renderFloor()
  renderCeiling()
  renderImages()
  load3dModels()

  setControls()
  _renderLoopId = requestAnimationFrame(renderLoop)
}

const keysPressed = {
  ArrowRight: false,
  KeyD: false,
  ArrowLeft: false,
  KeyA: false,
  ArrowUp: false,
  KeyW: false,
  ArrowDown: false,
  KeyS: false,
  Space: false,
  ShiftLeft: false,
} as { [key: string]: boolean }
const onKeyDown = (event: KeyboardEvent) => {
  if (controlsLocked.value && event.code in keysPressed) {
    keysPressed[event.code] = true
  }
}
const onKeyUp = (event: KeyboardEvent) => {
  if (controlsLocked.value && event.code in keysPressed) {
    keysPressed[event.code] = false
  }
}
document.addEventListener('keydown', onKeyDown)
document.addEventListener('keyup', onKeyUp)
const clock = new Clock()
const checkCollision = (): boolean => {
  const boundingBox = new Box3()
  const worldPosition = new Vector3()
  _camera.getWorldPosition(worldPosition)
  boundingBox.setFromCenterAndSize(
    worldPosition,
    new Vector3(1, 1, 1),
  )
  return !!wallsGroup.children.filter((wall) => boundingBox.intersectsBox(wall.BBox)).length
}
const checkCollisionForModels = (): boolean => {
  return models.some(m => {
    if (!m.boundingBox || !m.scene) {
      return false
    }
    m.boundingBox.setFromObject(m.scene);
    const boundingBox = new Box3()
    const worldPosition = new Vector3()
    _camera.getWorldPosition(worldPosition)
    boundingBox.setFromCenterAndSize(
        worldPosition,
        new Vector3(1, 1, 1),
    )
    return boundingBox.intersectsBox(m.boundingBox);;
  })
}
const updateMovement = (delta: number) => {
  let speed = config.movingSpeed * delta
  const prevPosition = _camera.position.clone()
  if (keysPressed.ShiftLeft) {
    speed = (config.movingSpeed * 2) * delta
  }
  if (keysPressed.ArrowRight || keysPressed.KeyD) {
    _controls.moveRight(speed)
  }
  if (keysPressed.ArrowLeft || keysPressed.KeyA) {
    _controls.moveRight(-speed)
  }
  if (keysPressed.ArrowUp || keysPressed.KeyW) {
    _controls.moveForward(speed)
  }
  if (keysPressed.ArrowDown || keysPressed.KeyS) {
    _controls.moveForward(-speed)
  }
  if (checkCollisionForModels() || checkCollision()) {
    _camera.position.copy(prevPosition)
  }
}

const onBuyPainting = () => {
  infoCardRef.value?.$el.classList.add('expanded')
}

const infoCardRef = ref<HTMLDivElement | null>(null)
const isDisplayImageInfo = ref(false)
const displayImageInfo = () => {
  document.addEventListener('click', onBuyPainting)
  isDisplayImageInfo.value = true;
}
const hideImageInfo = () => {
  document.removeEventListener('click', onBuyPainting)
  isDisplayImageInfo.value = false;
}

const selectedPainting = ref<Painting | null>(null)
const renderLoop = () => {
  // animateObject()
  let isSelectedPainting = false;
  paintingsData.forEach(painting => {
    const distanceAllowed = 7;
    const distanceToPainting = _camera.position.distanceTo(painting.position)
    if (distanceToPainting < distanceAllowed) {
      selectedPainting.value = painting;
      isSelectedPainting = true;
    }
  })
  isSelectedPainting ? displayImageInfo() : hideImageInfo();
  updateMovement(clock.getDelta())
  _renderer.render(_scene, _camera)
  _renderLoopId = requestAnimationFrame(renderLoop)
}

const loader = new GLTFLoader();
const load3dModel = (model: Model) => {
  loader.load( model.path, ( gltf ) => {
    const scene = gltf.scene;
    model.scene = gltf.scene;
    scene.castShadow = model.castShadow;
    scene.receiveShadow = model.receiveShadow;
    scene.scale.set(model.scale.x, model.scale.y, model.scale.z);
    scene.position.set(model.position.x, model.position.y, model.position.z);
    scene.rotateY(MathUtils.degToRad(model.rotateY));
    model.boundingBox = new Box3().setFromObject(scene);
    _scene.add(gltf.scene);
  });
}
const models = modelsData;
const load3dModels = () => {
  models.forEach(model => {
    load3dModel(model)
  })
}

onMounted(() => {
  if (canvas.value) {
    setupScene()
  }
})
onBeforeUnmount(() => {
  cancelAnimationFrame(_renderLoopId)
  cleanUpThree(_scene, _renderer)
  document.removeEventListener('click', startControls)
  _controls.removeEventListener('lock', onControlsLock)
  _controls.removeEventListener('unlock', onControlsUnlock)
  document.removeEventListener('keydown', onKeyDown)
  document.removeEventListener('keyup', onKeyUp)
})
</script>

<style lang="scss" scoped>
  .page {
    position: relative;
    width: 100vw;
    height: 100vh;
  }
  .overlay,
  .canvas {
    width: 100vw;
    height: 100vh;
    position: absolute;
    inset: 0;
    margin: auto;
  }
  .overlay {
    background-color: rgb(0,0,0, .6);
    z-index: 2;
  }
  .title {
    position: absolute;
    text-align: center;
    color: #fff;
    font-weight: 500;
    height: fit-content;
    margin: 0;
    width: auto;
    left: 0;
    right: 0;
    top: 40%;
    cursor: pointer;
  }
  .info-card {
    position: fixed;
    right: 10px;
    width: 350px;
    transition: .3s ease-in;
    &.fadeIn {
      top: 10px;
      opacity: 0.8;
      animation: cardFadeIn 0.3s ease-in;
    }
    &.fadeOut {
      top: 0;
      opacity: 0;
      animation: cardFadeOut 0.3s ease-out;
    }
  }
  @keyframes cardFadeIn {
    0% {
      top:0;
      opacity: 0;
    }
    100% {
      top: 10px;
      opacity: 0.8;
    }
  }
  @keyframes cardFadeOut {
    0% {
      top: 10px;
      opacity: 0.8;
    }
    100% {
      top: 0;
      opacity: 0;
    }
  }
</style>
