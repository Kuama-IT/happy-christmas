import * as THREE from "three";
import type { Object3D, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export type ChristmasBasics = {
  renderer: WebGLRenderer;
  camera: PerspectiveCamera;
  scene: Scene;
};

export type ChristmasCarousel = ChristmasBasics & {
  carousel: Object3D;
};

export const getChristmasWorld: () => Promise<ChristmasBasics> = async () => {
  const scene = new THREE.Scene();
  const sceneWidth = window.innerWidth; // Social resolution 1080 * 1.5;
  const sceneHeight = window.innerHeight; // Social resolution 1350 * 1.2;
  const camera = new THREE.PerspectiveCamera(
    75,
    sceneWidth / sceneHeight,
    0.1,
    1000,
  );
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(sceneWidth, sceneHeight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 2;

  camera.position.set(0, 0, 10);
  controls.update();
  function animate() {
    controls.update();
    renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(animate);

  return {
    scene,
    camera,
    renderer,
  };
};

export const addChristmasLights = ({ scene, ...params }: ChristmasBasics) => {
  scene.add(new THREE.AmbientLight(0x666666, 3));

  const light = new THREE.DirectionalLight(0xffffff, 7);
  light.position.set(200, 450, 500);

  light.castShadow = true;

  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 512;

  light.shadow.camera.near = 100;
  light.shadow.camera.far = 1200;

  light.shadow.camera.left = -1000;
  light.shadow.camera.right = 1000;
  light.shadow.camera.top = 350;
  light.shadow.camera.bottom = -350;

  scene.add(light);

  return {
    scene,
    ...params,
  };
};

export const addChristmasCarousel = async ({
  scene,
  ...params
}: ChristmasBasics): Promise<ChristmasCarousel> => {
  try {
    const loader = new GLTFLoader();

    const model = await loader.loadAsync("/christmas_carousel.glb");

    const mesh = model.scenes[0];
    const box = new THREE.Box3().setFromObject(mesh);
    box.getCenter(mesh.position);
    mesh.position.multiplyScalar(-1);
    const pivot = new THREE.Group();
    scene.add(pivot);
    pivot.add(mesh);

    return {
      carousel: pivot,
      scene,
      ...params,
    };
  } catch (error) {
    console.error("Error loading the model:", error);
    return {
      carousel: new THREE.Group(),
      scene,
      ...params,
    };
  }
};

export const showTheWorldToTheChildren = ({
  renderer,
  ...params
}: ChristmasCarousel): ChristmasCarousel => {
  document
    .querySelector<HTMLDivElement>(".christmas-scene")
    ?.appendChild(renderer.domElement);

  return {
    renderer,
    ...params,
  };
};
