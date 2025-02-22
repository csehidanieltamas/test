// Initialize the scene, camera, and renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0); // Set the scene's background to light gray color

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000); // Adjust far clipping plane
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('viewer').appendChild(renderer.domElement);

// Orbit controls to allow rotation and zoom
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true;

// Add a basic ambient light and a directional light to illuminate the model
const light = new THREE.AmbientLight(0x404040, 1); // Ambient light
scene.add(light);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

// Set camera position
camera.position.set(0, 1, 10); // Move the camera farther back

// Check if scene is rendering (axes helper to visualize the scene)
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// Load the 3D model (Joe.glb)
const loader = new THREE.GLTFLoader();
loader.load('models/joe.glb', function(gltf) {
  console.log("Model loaded successfully!");
  
  const model = gltf.scene;
  
  // Scale and position the model
  model.scale.set(1, 1, 1);  // Adjust scaling as needed
  model.position.set(0, 0, 0);  // Center the model (or adjust it based on the model's position)
  
  scene.add(model); // Add the loaded model to the scene
}, undefined, function(error) {
  console.error("Error loading the model:", error);
});

// Render the scene
function animate() {
  requestAnimationFrame(animate);
  controls.update(); // Update the controls for rotation/zoom
  renderer.render(scene, camera); // Render the scene with the camera
}
animate();

// Resize the canvas when the window is resized
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
