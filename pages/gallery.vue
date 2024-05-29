<template lang="pug">
.page
  canvas(id="mountId" width="700" height="500" class="canvas")
  .overlay(v-if="!controlsLocked")
    h3.title(@click="hideControls") Click to start
    q-btn.q-ma-sm(color="primary" to="/") Back
</template>

<script setup lang="ts">
import {
  MeshBasicMaterial,
  type PerspectiveCamera, PlaneGeometry,
  type Scene,
  type WebGLRenderer,
  BoxGeometry,
  Mesh,
  MeshPhysicalMaterial,
  DoubleSide, TextureLoader, Group, MirroredRepeatWrapping, Box3, Vector3, SphereGeometry, Clock,
} from 'three'
import sphereTexture from 'assets/images/sphere-texture.jpg'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls'
import floorTexture from '@/assets/images/textures/gray-parquet.jpg'
import ceilingTexture from '@/assets/images/textures/office-ceiling.jpg'
import wallTexture from '@/assets/images/textures/bricks-white.jpg'
import { useThree } from '@/composables/useThree'
import image1 from '@/assets/images/image1.jpg'
import image2 from '@/assets/images/image2.jpg'
import image3 from '@/assets/images/image3.jpg'
import image4 from '@/assets/images/image4.jpg'
import image5 from '@/assets/images/image5.jpg'

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
const config = {
  movingSpeed: 7,
  floorWidth: 40,
  floorHeight: 40,
}

const animateObject = () => {
  _box.rotation.x += 0.003
  _box.rotation.y += 0.005
}
const renderCube = () => {
  const textureSphere = new TextureLoader().load(sphereTexture)
  const geometry = new SphereGeometry(2, 100, 100)
  const material = new MeshPhysicalMaterial({
    map: textureSphere,
    roughness: 0.1,
    reflectivity: 1,
  })
  _box = new Mesh(geometry, material)
  _box.position.set(-4, 1, 0)
  _scene.add(_box)
}
const renderFloor = () => {
  const textureFloor = new TextureLoader().load(floorTexture)
  textureFloor.wrapS = MirroredRepeatWrapping
  textureFloor.wrapT = MirroredRepeatWrapping
  textureFloor.repeat.set(10, 10)

  const floorPlane = new Mesh(new PlaneGeometry(config.floorWidth + 1, config.floorHeight + 1), new MeshBasicMaterial({ map: textureFloor, side: DoubleSide }))
  floorPlane.rotateX(Math.PI / 2)
  floorPlane.position.set(0, -2, 0)

  _scene.add(floorPlane)
}

const renderCeiling = () => {
  const textureCeiling = new TextureLoader().load(ceilingTexture)
  textureCeiling.wrapS = MirroredRepeatWrapping
  textureCeiling.wrapT = MirroredRepeatWrapping
  textureCeiling.repeat.set(5, 5)

  const ceilingPlane = new Mesh(new PlaneGeometry(config.floorWidth, config.floorHeight), new MeshBasicMaterial({ map: textureCeiling }))
  ceilingPlane.rotateX(Math.PI / 2)
  ceilingPlane.position.set(0, 18, 0)

  _scene.add(ceilingPlane)
}

const wallsGroup = new Group()
const renderWalls = () => {
  _scene.add(wallsGroup)

  const textureWall = new TextureLoader().load(wallTexture)
  textureWall.wrapS = MirroredRepeatWrapping
  textureWall.wrapT = MirroredRepeatWrapping
  textureWall.repeat.set(4, 3)
  const material = new MeshBasicMaterial({ map: textureWall })

  const frontWall = new Mesh(new BoxGeometry(config.floorWidth + 2.1, 24, -2), material)
  frontWall.position.set(0, 7, -(config.floorWidth / 2))

  const backWall = new Mesh(new BoxGeometry(config.floorWidth + 2.1, 24, -2), material)
  backWall.position.set(0, 7, (config.floorWidth / 2))

  const leftWall = new Mesh(new BoxGeometry(config.floorWidth + 2.1, 24, -2), material)
  leftWall.position.set(-(config.floorWidth / 2), 7, 0)
  leftWall.rotateY(Math.PI / 2)

  const rightWall = new Mesh(new BoxGeometry(config.floorWidth + 2.1, 24, -2), material)
  rightWall.position.set((config.floorWidth / 2), 7, 0)
  rightWall.rotateY(Math.PI / 2)

  wallsGroup.add(frontWall, backWall, leftWall, rightWall)

  wallsGroup.children.forEach((wall) => {
    wall.BBox = new Box3()
    wall.BBox.setFromObject(wall)
  })
}

const renderImage = (url: string, width: number, height: number, position: { x: number, y: number, z: number }) => {
  const texture = new TextureLoader().load(url)
  const material = new MeshBasicMaterial({ map: texture })
  const geometry = new PlaneGeometry(width, height, 1, 1)
  const image = new Mesh(geometry, material)
  image.position.set(position.x, position.y, position.z)
  return image
}
const renderImages = () => {
  _scene.add(renderImage(image2, 8, 4, new Vector3(-6, 3, -(config.floorWidth / 2) - 0.9)))
  _scene.add(renderImage(image3, 8, 4, new Vector3(6, 3, -(config.floorWidth / 2) - 0.9)))
  const imageFour = renderImage(image4, 8, 4, new Vector3((config.floorWidth / 2) + 0.9, 3, 0))
  imageFour.rotateY(-Math.PI / 2)
  _scene.add(imageFour)
}

const startControls = () => {
  _controls.lock()
}
const hideControls = () => {
  console.log('hideControls')
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
  console.log('onControlsLock')
  controlsLocked.value = true
}
const onControlsUnlock = () => {
  console.log('onControlsUnlock')
  controlsLocked.value = false
  showControls()
}

const setupScene = () => {
  const { scene, camera, renderer } = initThree('mountId')
  _scene = scene
  _camera = camera
  _renderer = renderer
  _controls = new PointerLockControls(_camera, document.body)

  renderCube()
  renderWalls()
  renderFloor()
  renderCeiling()
  renderImages()

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
  if (checkCollision()) {
    _camera.position.copy(prevPosition)
  }
}
const renderLoop = () => {
  animateObject()
  updateMovement(clock.getDelta())
  _renderer.render(_scene, _camera)
  _renderLoopId = requestAnimationFrame(renderLoop)
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
</style>
