import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const size = {
  width: 800,
  height: 600
};

const cursor = { x: 0, y: 0 };

window.addEventListener('mousemove', (event) => {
  cursor.x = event.clientX / size.width - 0.5;
  cursor.y = event.clientY / size.height - 0.5;
});

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x202020);

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true }) // 'color' not 'Color'
);

scene.add(mesh);

// ✅ Fix: use "size" not "sizes"
const aspectRatio = size.width / size.height;
const camera = new THREE.OrthographicCamera(
  -1 * aspectRatio, // left
  1 * aspectRatio,  // right
  1,                // top
  -1,               // bottom

);

camera.position.z = 3;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(size.width, size.height);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const animate = () => {
  controls.update();
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();

window.addEventListener('resize', () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  const aspect = size.width / size.height;

  // Update orthographic camera bounds properly
  camera.left = -1 * aspect;
  camera.right = 1 * aspect;
  camera.top = 1;
  camera.bottom = -1;
  camera.updateProjectionMatrix();

  renderer.setSize(size.width, size.height);
});