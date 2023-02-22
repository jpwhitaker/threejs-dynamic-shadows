import *  as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js"

// SCENE
const scene = new THREE.Scene();

// CAMERA
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

// RENDERER
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.physicallyCorrectLights = true;
// renderer.shadowMap.type = THREE.VSMShadowMap;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


renderer.shadowMap.enabled = true

// CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

// RESIZE HAMDLER
export function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

// INIT CAMERA
camera.position.z = 25;
camera.position.x = 3;
camera.position.y = 6;
camera.lookAt(0, 0, -20)

// INIT HEMISPHERE LIGHT
scene.add(new THREE.AmbientLight( 0xffffff, 0.5 ));

// SCENE
scene.background = new THREE.Color(0xffffff);

// FLOOR
const plane = new THREE.Mesh(new THREE.PlaneGeometry(500, 500, 32), new THREE.MeshPhongMaterial({ color: 0xfab74b}));
plane.rotation.x = - Math.PI / 2
plane.receiveShadow = true
scene.add(plane);

// CONE
const cone = new THREE.Mesh(new THREE.ConeGeometry(2, 5, 64), new THREE.MeshPhongMaterial({ color: 0xdbde40 }));
cone.position.set(7, 2.5, 2.7)
cone.receiveShadow = true
cone.castShadow = true
// scene.add(cone);

// CYLINDER
const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 6, 64), new THREE.MeshPhongMaterial({ color: 0x3ea34c }))
cylinder.position.set(3, 3, 2.7)
cylinder.receiveShadow = true
cylinder.castShadow = true
// scene.add(cylinder)

// TORUS
const torus = new THREE.Mesh(new THREE.TorusGeometry(2, 0.5, 64, 64), new THREE.MeshPhongMaterial({ color: 0x2a7ab0 }))
torus.position.set(-0.5, 2.5, 2.7)
torus.rotateY(2.5)
torus.receiveShadow = true
torus.castShadow = true
// scene.add(torus)

// /**
//  * Open Box
//  */
// var material1 = new THREE.MeshStandardMaterial( { color: 0xffffff, side: THREE.BackSide, shadowSide:THREE.FrontSide  } );
// var material2 = new THREE.MeshStandardMaterial( { color: 0xffffff, side: THREE.BackSide, shadowSide:THREE.FrontSide } );
// var material3 = new THREE.MeshStandardMaterial( { color: 0xffffff, side: THREE.BackSide, shadowSide:THREE.FrontSide } );
// var material4 = new THREE.MeshStandardMaterial( { color: 0xffffff, side: THREE.BackSide, shadowSide:THREE.FrontSide } );
// var material5 = new THREE.MeshStandardMaterial( { color: 0xffffff, side: THREE.BackSide, shadowSide:THREE.FrontSide } );
// var materialTransparent =  new THREE.MeshStandardMaterial( { transparent: true, opacity: 0, wireframe: true, side: THREE.DoubleSide} );

// var geometry = new THREE.BoxGeometry( 2, 1, 1 );
// var materials = [ materialTransparent, material1, material2, material3, material4, material5 ]



// var openBox = new THREE.Mesh( geometry, materials );
// openBox.receiveShadow = true;
// openBox.castShadow = true
// scene.add( openBox );

// openBox.position.y = 1; 

const geometry = new THREE.BoxGeometry( 1, 15, 7 );
const material = new THREE.MeshPhongMaterial( {color: 0xFFFFFF} );
const cube = new THREE.Mesh( geometry, material );
cube.position.y = 7.5; 
cube.position.z = -4.5; 
cube.receiveShadow = true
cube.castShadow = true
// scene.add( cube );

const geometry2 = new THREE.BoxGeometry( 1, 15, 7 );
const material2 = new THREE.MeshPhongMaterial( {color: 0xFFFFFF} );
const cube2 = new THREE.Mesh( geometry2, material2);
cube2.position.y = 7.5;
cube2.position.z = -4.5; 
cube2.position.x = 15; 
cube2.receiveShadow = true
cube2.castShadow = true
// scene.add( cube2 );

const geometry3 = new THREE.BoxGeometry( 1, 15, 15 );
const material3 = new THREE.MeshPhongMaterial( {color: 0xFFFFFF} );
const cube3 = new THREE.Mesh( geometry3, material3);
cube3.position.y = 7.5;
cube3.position.x = 7.5;
cube3.position.z = -7.5 
cube3.rotateY(Math.PI / 2)
cube3.receiveShadow = true
cube3.castShadow = true
// scene.add( cube3 );

const geometry4 = new THREE.BoxGeometry( 1, 7, 16 );
const material4 = new THREE.MeshPhongMaterial( {color: 0xFFFFFF} );
const cube4 = new THREE.Mesh( geometry4, material4);
cube4.position.y = 15;
cube4.position.x = 7.5;
cube4.position.z = -4.5 
cube4.rotateY(Math.PI / 2)
cube4.rotateZ(Math.PI / 2)
cube4.receiveShadow = true
cube4.castShadow = true
// scene.add( cube4 );

// var singleGeometry = new THREE.BufferGeometry();
cube.updateMatrixWorld()
cube2.updateMatrixWorld()
cube3.updateMatrixWorld()
cube4.updateMatrixWorld()
cube.geometry.applyMatrix4(cube.matrix);
cube2.geometry.applyMatrix4(cube2.matrix);
cube3.geometry.applyMatrix4(cube3.matrix);
cube4.geometry.applyMatrix4(cube4.matrix);
var mergedGeometry = BufferGeometryUtils.mergeBufferGeometries([cube.geometry, cube2.geometry]);
var mergedGeometry = BufferGeometryUtils.mergeBufferGeometries([mergedGeometry, cube3.geometry]);
var mergedGeometry = BufferGeometryUtils.mergeBufferGeometries([mergedGeometry, cube4.geometry]);

const mergedMaterial = new THREE.MeshPhongMaterial({color: 0xFFFFFF});
const mergedMesh = new THREE.Mesh(mergedGeometry, mergedMaterial);
mergedMesh.position.set(0, 0, 0);
mergedMesh.receiveShadow = true;
mergedMesh.castShadow = true;

// Add the merged mesh to the scene
scene.add(mergedMesh);



// DIRECTIONAL LIGHT
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.x += 20
directionalLight.position.y += 20
directionalLight.position.z += 20
directionalLight.castShadow = true
directionalLight.shadow.mapSize.width = 2056;
directionalLight.shadow.mapSize.height = 2056;
directionalLight.shadow.radius = 5
// directionalLight.shadow.blurSamples = 500
const d = 25;
directionalLight.shadow.camera.near = 0.5
directionalLight.shadow.camera.far = 60
directionalLight.shadow.camera.left = - d;
directionalLight.shadow.camera.right = d;
directionalLight.shadow.camera.top = d;
directionalLight.shadow.camera.bottom = - d;
scene.add(directionalLight);

scene.add( new THREE.CameraHelper( directionalLight.shadow.camera ) );

// SPOT LIGHT
// const spotLight = new THREE.SpotLight( 0xffffff );
// spotLight.position.set( 20, 15, 20 );
// spotLight.castShadow = true;
// spotLight.shadow.mapSize.width = 4096;
// spotLight.shadow.mapSize.height = 4096;
// scene.add(spotLight)

// POINT LIGHT
// const light1 = new THREE.PointLight( 0xff0000, 1, 100 );
// light1.position.set( 20, 20, 20 );
// light1.castShadow = true;
// light1.shadow.mapSize.width = 4096;
// light1.shadow.mapSize.height = 4096;
// scene.add( light1 );

// const light2 = new THREE.PointLight( 0x00ff00, 1, 100 );
// light2.position.set( 20, 20, 20 );
// light2.castShadow = true;
// light2.shadow.mapSize.width = 4096;
// light2.shadow.mapSize.height = 4096;
// scene.add( light2 );


// ANIMATE
function animate() {
    // TARGET
    const time = Date.now() * 0.0005;
    directionalLight.position.x = Math.sin(time * 0.7) * 20;
    directionalLight.position.z = Math.cos(time * 0.7) * 20;

    // spotLight.position.x = Math.sin(time * 0.7) * 20;
    // spotLight.position.z = Math.cos(time * 0.7) * 20;

    // light1.position.x = Math.sin(time) * 20;
    // light1.position.z = Math.sin(time) * 20;
    // light2.position.x = Math.cos(time) * -20;
    // light2.position.z = Math.cos(time) * 20;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
document.body.appendChild(renderer.domElement);
animate();