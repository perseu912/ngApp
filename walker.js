'use strict'

class Walker{
  constructor(x,y){
    this.pos = createVector(x,y);
  }
  update(vel=1){
    this.pos.x += random(-2,2)*vel;
    this.pos.y += random(-2,2)*vel;
    console.log(this.pos.y/this.pos.x)
    this.pos.x = (this.pos.x >= innerWidth)? innerWidth : this.pos.x;
    this.pos.y = (this.pos.y >= innerHeight)? innerHeight : this.pos.y;
    
  }
  show(){
    stroke(300,200);
    strokeWeight(1.5);
    ellipse(this.pos.x,this.pos.y,3);
  }
}


class Universe{
  constructor(G=6.67*1.0e-2,c=3*1.0e1){
    this.G = G;
    this.c = c;
    this.nAstro = 0;
    this.dataAstros = [];
    this.force = [];
    this.time = 0;
  }
  makeAstro(dataAstro){
    //forcesIte:[],vectorAll:[]}
    this.dataAstros = dataAstro;
    print(this.dataAstros.length)
    for(let i=0;i<this.dataAstros.length;i++){
      this.dataAstros[this.dataAstros[i].name]
      this.dataAstros[i].vectorForces = [];
      this.dataAstros[i].vectorDist = [];
    }
    //this.force[this.nAstro] = dataAtro.g;
  }
  forceGravity(m,d){
    let force;
    force = (m*this.G)/d**2;
    return force;
  }
  iterations(){
    let M;
    let m;
    let posX;
    let posY;
    let dx;
    let dy;
    let forceXM;
    let forceYM;
    let forceYm;
    let forceXm
    let gY;
    let gX;
    let velY;
    let velX;
    let name;
    let g;
    let force;
    let vel;
    let d;
    let pos;
    
    for(let i=0; i<this.dataAstros.length;i++){
      
      posX = this.dataAstros[i].pos.x;
      posY = this.dataAstros[i].pos.y
      m = this.dataAstros[i].m;
      
      for(let c=0;c<this.dataAstros.length;c++){
       
        name = this.dataAstros[i].name
        M = this.dataAstros[c].m;
        
        dx = posX - this.dataAstros[c].pos.x;
        dx = (dx==0)? 0.000001 : dx;
        
        dy = posY - this.dataAstros[c].pos.y;
        dy = (dy==0)? 0.000001 : dy;
        
        forceYM = this.forceGravity(M, dy)
        forceXM = this.forceGravity(M, dx)
        
      }
      forceXm = this.forceGravity(m,dx)
      forceYm = this.forceGravity(m,dy)
      
      gX = forceXm - forceXM
      gY = forceYm - forceYM
      
      velX = this.dataAstros[i].vectorVel.x;
      velY = this.dataAstros[i].vectorVel.y;
      
      

      posX += velX + gX;
      posY += velX + gY;
      
      posX = (posX >= innerWidth) ? innerWidth - 10 : posX;
      posY = (posY >= innerHeight) ? innerHeight - 10 : posY;
      
      this.dataAstros[i].pos.x = posX;
      this.dataAstros[i].pos.y = posY;
      
      g = hipotenusa([gX,gY]);
     // force = hipotenusa([g,forceY]);
      
      print(`${name}: force:${g}`)
      
     this.dataAstros[1].pos.x = 300
     this.dataAstros[1].pos.y = 300
    }
    
  }
  update(){
    //this.time += 0.1;
    this.iterations();
    this.show()
    }
    show(){
      let raio;
      let x;
      let y;
      
      for(let i=0; i<this.dataAstros.length;i++){
        //stroke(200,200);
        //strokeWeight(10);
        raio = this.dataAstros[i].raio
        x = this.dataAstros[i].pos.x;;
        y = this.dataAstros[i].pos.y;
        ellipse(x,y,raio);
      }
    }
    
}