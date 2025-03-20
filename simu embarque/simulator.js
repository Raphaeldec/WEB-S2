import * as THREE from 'three';
import { FlyControls } from 'three/addons/controls/FlyControls.js';

// Récupération des éléments HTML
const view = document.getElementById('fenetre-de-vol');
const imageFond = document.getElementById('image-fond'); // Image de fond
const imageCadran = document.getElementById('image-cadran'); // Cadran

// Initialisation de la scène Three.js
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Bleu ciel

// Caméra
const camera = new THREE.PerspectiveCamera(60, view.clientWidth / view.clientHeight, 0.1, 5000);
camera.position.set(0, 100, 500);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas: view, antialias: true });
renderer.setSize(view.clientWidth, view.clientHeight);

// Sol
const groundGeometry = new THREE.PlaneGeometry(10000, 10000);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Lumières
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(500, 1000, 500);
scene.add(directionalLight);
scene.add(new THREE.AmbientLight(0xffffff, 0.5));

// Contrôles de vol
const controls = new FlyControls(camera, renderer.domElement);
controls.dragToLook = true;
controls.rollSpeed = 0.5;
controls.movementSpeed = 200;
const clock = new THREE.Clock();

// Gestion du redimensionnement de l'écran
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Boucle d'animation
renderer.setAnimationLoop(() => {  
    const delta = clock.getDelta();
    controls.update(delta);

    // Tangage (pitch) et roulis (roll)
    const pitch = 1.41; // Déplacement vertical en pourcentage
    const roll = Math.PI / 12; // Rotation en radians

    // Appliquer les transformations aux instruments de vol
    imageFond.style.transform = `translateY(${pitch}%) rotate(${roll}rad)`;
    imageCadran.style.transform = `rotate(${roll}rad)`;

    renderer.render(scene, camera);
});
