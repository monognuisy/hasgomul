// import * as dat from './js/dat.gui.min.js'

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x000000);
renderer.setSize( window.innerWidth , window.innerHeight );
document.body.appendChild( renderer.domElement );

//make window be able to be resized sans gene
window.addEventListener( 'resize', function(){
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

var controls = new THREE.OrbitControls( camera, renderer.domElement );

var light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 0,1,1 ).normalize();
scene.add(light);

var geometry = new THREE.SphereGeometry(5,100,100);
var material = new THREE.MeshPhongMaterial({
    color : 0xFE98A0,
    flatShading : true
});
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

//axisHelper
var axesHelper = new THREE.AxesHelper( 100 );
scene.add( axesHelper );


camera.position.z = 100;
camera.position.x = 100;
camera.position.y = 100;
camera.lookAt(scene.position);


//dat.gui objects
var guiControls_X = new function(){
    this.b = 0;
    this.k = 10;
};

var guiControls_Y = new function(){
    this.b = 0;
    this.k = 20;
};

var guiControls_Z = new function(){
    this.b = 0;
    this.k = 30;
};

var guiMass = new function(){
    this.m = 1;
}

var colour =  {
    color: 0xFE98A0
};

var gui = new dat.GUI();
let gui_X = gui.addFolder('X_motion');
let gui_Y = gui.addFolder('Y_motion');
let gui_Z = gui.addFolder('Z_motion');

gui.add(guiMass, 'm' , 0.1, 10);

gui_X.add(guiControls_X, 'b',0,10);
gui_X.add(guiControls_X, 'k',0,100);

gui_Y.add(guiControls_Y, 'b',0,10);
gui_Y.add(guiControls_Y, 'k',0,100);

gui_Z.add(guiControls_Z, 'b',0,10);
gui_Z.add(guiControls_Z, 'k',0,100);

gui.addColor( colour, 'color' ).onChange( function() { sphere.material.color.set( colour.color ); } );


function Data(location, accel, vel){
    this.location = location;
    this.accel = accel;
    this.vel = vel;
};

const dt = 0.025;

//define X,Y,Z
let X = new Data(20,0,0);
let Y = new Data(20,0,0);
let Z = new Data(50,0,0);

sphere.position.set(X.location,Y.location,Z.location);

//draw scene
var render = function(){
    renderer.render(scene,camera);
};

//game loop
var GameLoop = function(){

    requestAnimationFrame(GameLoop);

    X.vel += X.accel*dt;
    sphere.position.x += X.vel * dt;
    X.location = sphere.position.getComponent(0);
    X.accel = -(guiControls_X.b*X.vel + guiControls_X.k*X.location)/guiMass.m;

    Y.vel += Y.accel*dt;
    sphere.position.y += Y.vel * dt;
    Y.location = sphere.position.getComponent(1);
    Y.accel = -(guiControls_Y.b*Y.vel + guiControls_Y.k*Y.location)/guiMass.m;

    Z.vel += Z.accel*dt;
    sphere.position.z += Z.vel * dt;
    Z.location = sphere.position.getComponent(2);
    Z.accel = -(guiControls_Z.b*Z.vel + guiControls_Z.k*Z.location)/guiMass.m;

    render();
}

GameLoop();