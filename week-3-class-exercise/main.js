import * as THREE from 'three';

document.body.style.margin = '0';
document.body.style.overflow = 'hidden';
document.body.style.backgroundColor = '#202030';
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75, 
  window.innerWidth / window.innerHeight, 
  0.1, 
  1000
);
camera.position.set(0, 5, 10);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true; // enable shadows
document.body.appendChild(renderer.domElement);

const planeGeometry = new THREE.PlaneGeometry(20, 20);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
plane.position.y = 0;
plane.receiveShadow = true;
scene.add(plane);


const heartShape = new THREE.Shape();
heartShape.moveTo(0, 0);
heartShape.bezierCurveTo(0, 0, -0.5, 0, -0.5, 0.5);
heartShape.bezierCurveTo(-0.5, 1, 0, 1.5, 0, 1.5);
heartShape.bezierCurveTo(0, 1.5, 0.5, 1, 0.5, 0.5);
heartShape.bezierCurveTo(0.5, 0, 0, 0, 0, 0);
const heartGeometry = new THREE.ExtrudeGeometry(heartShape, { depth: 1.5, bevelEnabled: true, bevelSize: 0.2, bevelThickness: 0.2, steps: 1 });
const heartMaterial = new THREE.MeshStandardMaterial({ color: 0xff5555, metalness: 0.6, roughness: 0.3 });
const heart = new THREE.Mesh(heartGeometry, heartMaterial);
heart.rotation.x = -Math.PI / 2;
heart.position.set(-4, 1, 0);
heart.castShadow = true;
scene.add(heart);

const octaGeometry = new THREE.OctahedronGeometry(1.5);
const octaMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00, metalness: 0.6, roughness: 0.3 });
const octa = new THREE.Mesh(octaGeometry, octaMaterial);
octa.position.set(0, 1.5, 0);
octa.castShadow = true;
scene.add(octa);

const dodecaGeometry = new THREE.DodecahedronGeometry(1.5);
const dodecaMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff, metalness: 0.6, roughness: 0.3 });
const dodeca = new THREE.Mesh(dodecaGeometry, dodecaMaterial);
dodeca.position.set(4, 1.5, 0);
dodeca.castShadow = true;
scene.add(dodeca);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 10, 5);
pointLight.castShadow = true;
scene.add(pointLight);

const pointLight2 = new THREE.PointLight(0xffaa88, 0.5);
pointLight2.position.set(-5, 5, 5);
scene.add(pointLight2);

function animate() {
  requestAnimationFrame(animate);

  heart.rotation.z += 0.02; 
  octa.rotation.y += 0.01;
  dodeca.rotation.y -= 0.01;

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
