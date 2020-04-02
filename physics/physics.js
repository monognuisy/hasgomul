var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth , window.innerHeight );
document.body.appendChild( renderer.domElement );

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

// var material = new THREE.MeshBasicMaterial({color:0x0066FF, wireframe: false})
var material = new THREE.MeshPhongMaterial({
    color : 0x0066FF,
    flatShading : true
});


var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

var axesHelper = new THREE.AxesHelper( 100 );
scene.add( axesHelper );

camera.position.z = 100;

// var ambientLight = new THREE.AmbientLight( 0xFFFFFF, 5.0);

function Data(location, accel, vel, b, m, k){
    this.location = location;
    this.accel = accel;
    this.vel = vel;
    this.b = b;
    this.m = m;
    this.k = k;
};

const dt = 0.025;

var X = new Data(20,0,0,1,1,10);
var Y = new Data(20,0,0,1,1,20);
var Z = new Data(50,0,0,1,1,30);

sphere.position.set(X.location,Y.location,Z.location);

// var update = function(Cord){
//     Cord.vel += Cord.accel*dt;
//     sphere.position.x += Cord.vel * dt;
//     Cord.location = sphere.position.getComponent(0);
//     Cord.accel = -(Cord.b*Cord.vel + Cord.k*Cord.location)/Cord.m
// };

//draw scene
var render = function(){
    renderer.render(scene,camera);
};

//game loop
var GameLoop = function(){

    requestAnimationFrame(GameLoop);

    // update(X);
    // update(Y);

    X.vel += X.accel*dt;
    sphere.position.x += X.vel * dt;
    X.location = sphere.position.getComponent(0);
    X.accel = -(X.b*X.vel + X.k*X.location)/X.m;

    Y.vel += Y.accel*dt;
    sphere.position.y += Y.vel * dt;
    Y.location = sphere.position.getComponent(1);
    Y.accel = -(Y.b*Y.vel + Y.k*Y.location)/Y.m;

    Z.vel += Z.accel*dt;
    sphere.position.z += Z.vel * dt;
    Z.location = sphere.position.getComponent(2);
    Z.accel = -(Z.b*Z.vel + Z.k*Z.location)/Z.m;

    render();
}

GameLoop();