let walker;
let x;
let y;
let vel;
let universe;
let terra;
let lua;

terra = {
  name:'terra',
  m:1001,
  raio:8,
  pos:{x:200,y:200},
  vectorVel:{x:0,y:0}
}

lua = {
  name:'lua',
  m:10,
  raio:2,
  pos:{x:150,y:200},
  vectorVel:{x:0,y:0}
}

let sol = {
  name:'sol',
  m:1.0e20,
  raio:16,
  pos:{x:100,y:210},
  vectorVel:{x:-0.1,y:0}
}

vel = 1;
function make(){
  vel = document.getElementById("vel").value;
}

function setup(){
  
  x = innerWidth
  y = innerHeight
  universe = new Universe();
  universe.makeAstro([terra,sol,lua]);
  //walker = new Walker(random(0,x),random(0,y))
  createCanvas(2*innerWidth,2*innerHeight)
  background(0)
}

function draw(){
  universe.update()
  //walker.update(vel=vel)
  //universe.show()
}