import * as THREE from 'three';
import { FlyControls } from 'three/addons/controls/FlyControls.js';

// Récupération de l'élément HTML qui doit bouger (horizon_mech)
const imageAiguille = document.getElementById('image-aiguille'); // Aiguille de l'horizon artificiel

// Initialisation de la scène Three.js
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB); // Bleu ciel

// Caméra
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 5000);
camera.position.set(0, 100, 500);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('fenetre-de-vol').appendChild(renderer.domElement);

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

// Gestion du redimensionnement
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Fonction pour calculer le pitch et le roll à partir de la caméra
function computePitchAndRoll() {
    const q = camera.quaternion; // Orientation de la caméra

    // Vecteurs de référence
    const forward = new THREE.Vector3(0, 0, -1); // Direction avant de la caméra
    const upWorld = new THREE.Vector3(0, 1, 0);  // Haut du monde
    const rightWorld = new THREE.Vector3(1, 0, 0); // Droite du monde

    // Appliquer la rotation de la caméra aux vecteurs
    const forwardRotated = forward.clone().applyQuaternion(q);
    const rightRotated = rightWorld.clone().applyQuaternion(q);

    // Calcul du pitch (tangage) -> Déplacement vertical
    const pitch = Math.asin(forwardRotated.dot(upWorld)) * 47; 

    // Calcul du roll (roulis) -> Inclinaison latérale
    const roll = Math.atan2(rightRotated.y, rightRotated.x); 

    return { pitch, roll };
}

// Boucle d'animation
renderer.setAnimationLoop(() => {  
    const delta = clock.getDelta();
    controls.update(delta);

    // Calcul dynamique du pitch et du roll en fonction de la caméra
    const { pitch, roll } = computePitchAndRoll();

    // Appliquer uniquement la transformation sur horizon_mech (aiguille)
    imageAiguille.style.transform = `translateY(${pitch * 1.5}%) rotate(${-roll}rad)`;

    renderer.render(scene, camera);
});
