function Data(location, vel){
    this.location = location;
    this.vel = vel;
};

const dt = 0.001;

//define r(X,Y,Z)
let r = new Data(new THREE.Vector3(50,20,30),new THREE.Vector3(0,0,0));
// let w = new THREE.Vector3(0,0,1);

sphere.position.copy(r.location);

//draw scene
var render = function(){
    renderer.render(scene,camera);
};

var Resis = function(){
    return new THREE.Vector3(-(guiControls_X.b*r.vel.x + guiControls_X.k*r.location.x),-(guiControls_Y.b*r.vel.y + guiControls_Y.k*r.location.y),-(guiControls_Z.b*r.vel.z + guiControls_Z.k*r.location.z));
}
var cori = function(){
    return new THREE.Vector3(-w.x,-w.y,-w.z).cross(r.vel).multiplyScalar(2);
}
var centri = function(){
    return new THREE.Vector3(-w.x,-w.y,-w.z).cross((new THREE.Vector3(w.x,w.y,w.z)).cross(r.location));
}
var Force = function(){
    return (new cori()).add(centri());
}

let Force;

var accel = new THREE.Vector3();

export function motion(){
    r.vel.add(accel.multiplyScalar(dt));

    r.location.add(r.vel);

    sphere.position.copy(r.location);

    Force = Resis();

    accel = Force.multiplyScalar(1/guiMass.m);
}


