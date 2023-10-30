//-----------------------player.js---------------------
player = {

  init (){
    this.x = 384/2;
    this.y =  106;
    this.radius = 8;
    this.hitRadius = 8;
    this.xvel = 0;
    this.yvel = 0;
    this.xspeed = 80;
    this.yspeed = 80;
    this.drag = .8;
    this.gravity = 8;
    this.maxYvel = 400;
    this.maxXvel = 200;
    this.minYvel = -400;
    this.minXvel = -200;
    this.b = {};
    this.facingLeft = false;
    this.jumping = true;
    this.jumpCooldown = 0;
    this.angle = 0;
    this.mode = HEADMODE;
    this.gunCooldown = 0;
    this.minedFuel = false;
    fuelTimer = 30;
    currentRoom = [20,1]; //

  },

  update (dt) {

    this.updateB();
    this.oldX = this.x;
    this.oldY = this.y;

    this.xvel *= player.drag;

    this.yvel += player.gravity;
    this.yvel = this.yvel.clamp(this.minYvel, this.maxYvel);
    this.xvel = this.xvel.clamp(this.minXvel, this.maxXvel);

    let dx = dt * player.xvel;
    let dy = dt * player.yvel;

    player.x += dx;
    this.updateB();
    if(this.collides()){
      player.x = player.oldX;
      player.xvel = -player.xvel * .4;
    }
    player.y += dy;
    this.updateB();
    if(this.collides()){
      player.y = player.oldY;
      player.yvel = -player.yvel * .4;
    }
    this.updateB();
    if(this.collides()){
        this.collideResolution();
      this.updateB();
      if(this.collides()){
        this.collideResolution();
        this.updateB();
      }
    }
    this.overlapResolution();
    this.updateB();

    if(player.yvel > 0){
      s_step = false;
      if(ram[COLLISION + player.b.x + player.b.bottom * WIDTH] > 0 ||
         ram[COLLISION + player.b.x+4 + player.b.bottom * WIDTH] > 0 ||
         ram[COLLISION + player.b.x-4 + player.b.bottom * WIDTH] > 0
        ){
        this.jumping=false;
      }
      if(player.mode == THRUSTERMODE){
        let i = player.b.width;
        while(i--){
          if(ram[COLLISION + player.b.x + i + player.b.bottom * WIDTH])
          this.jumping=false;
        }

      }
    }
    if(player.yvel < -10){
      splodes.push(new splode(player.x+3+Math.random()*2,player.y+6+Math.random()*2, 7, 1, 19))
      splodes.push(new splode(player.x-3-Math.random()*2,player.y+6+Math.random()*2, 7, 1, 19))
      if(!s_step){
        stepSound = playSound(sounds.step, 1, player.x.map(0, WIDTH, -1, 1), false, 0.25);
        //stepSound.volume = 0.25;
        s_step = true;
      }

    }


    //player movement-----------------------------------------------------------
    switch(player.mode){

      case HEADMODE:
      player.yspeed = 80;
      player.xspeed = 80;
      if(fuelTimer >= 360)fuelTimer = 360;

      if (Key.isDown(Key.d) || Key.isDown(Key.RIGHT)) {
        player.facingLeft = false;
        if(this.jumping){
          player.xvel =  player.xspeed;
        }
        else{player.xvel = 0;}
      }
      if (Key.isDown(Key.a) || Key.isDown(Key.LEFT)){
        this.facingLeft = true;
        if(this.jumping){
          player.xvel =  - player.xspeed;
        }
        else{player.xvel = 0;}
      }
      if(Key.isDown(Key.w) || Key.isDown(Key.UP) || Key.isDown(Key.z) || Key.isDown(Key.SPACE)){
        if(!this.jumping && fuelTimer > 0 && player.jumpCooldown < 0){
          this.jumping = true;
          s_jump = true;
          player.jumpCooldown = 5;
          player.yvel = -player.yspeed;
          playSound(sounds.jump, 2.5, player.x.map(0, WIDTH, -1, 1), false);
        }
      }

      player.angle -= player.xvel / 30;
      if(player.jumping)player.angle -= player.facingLeft? -player.yvel /30 : player.yvel / 30;
      player.jumpCooldown--;
      if(player.yvel > 0 && ram[COLLISION + player.b.x + (player.b.bottom) * WIDTH] > 0)this.jumping=false;
      break;

      case BODYMODE:
      helpSection = 1;

      player.maxXvel = 150;
      player.minYvel = -300;
      player.xspeed = 150;
      player.yspeed = 260;
      if (Key.isDown(Key.d) || Key.isDown(Key.RIGHT)) {
        player.facingLeft = false;
        player.xvel =  player.xspeed;
      }
      if (Key.isDown(Key.a) || Key.isDown(Key.LEFT)){
        this.facingLeft = true;
        player.xvel =  - player.xspeed;
      }
      if(Key.isDown(Key.w) || Key.isDown(Key.UP) || Key.isDown(Key.z) || Key.isDown(Key.SPACE)){
        if(!this.jumping && fuelTimer > 0){
          fuelTimer -= 1;
          this.jumping = true;
          s_jump = true;
          player.yvel = -player.yspeed;
          playSound(sounds.jump, 2.5, player.x.map(0, WIDTH, -1, 1), false);
        }

      }



      break;

      case ARMMODE: //----------------------------------------------------------

      player.maxXvel = 150;
      player.minYvel = -300;
      player.xspeed = 150;
      player.yspeed = 270;
      helpSection = 2;

      if (Key.isDown(Key.d) || Key.isDown(Key.RIGHT)) {
        player.facingLeft = false;
        player.xvel =  player.xspeed;
      }
      if (Key.isDown(Key.a) || Key.isDown(Key.LEFT)){
        this.facingLeft = true;
        player.xvel =  - player.xspeed;
      }
      if(Key.isDown(Key.w) || Key.isDown(Key.UP) ||
       Key.isDown(Key.SPACE) || Key.isDown(Key.z)){
        if(!this.jumping && fuelTimer > 0){
          fuelTimer -= 0.7;
          this.jumping = true;
          s_jump = true;
          player.yvel = -player.yspeed;
          playSound(sounds.jump, 2.5, player.x.map(0, WIDTH, -1, 1), false);
        }
      }
      if(Key.isDown(Key.x)){
        fuelTimer-=0.01;
        splodes.push( new splode(
          player.x + (player.facingLeft ? -16 : 16) + (Math.random()*2-1)|0,
          player.y + (Math.random()*15-8)|0,
          6,5
          )
        )
      renderTarget = COLLISION;
      // if(pget(player.b.x + (player.facingLeft ? -10 : 10), player.b.y) == FUELCRYSTAL){
      //   player.minedFuel = true;
      // }
      fillCircle(player.x + (player.facingLeft ? -10 : 10),
      player.y + (Math.random()*20-15)|0, 10, 0);

      let i = 5;
      while(--i){
        splodes.push( new splode(
          player.x + (player.facingLeft ? -30 + Math.random() * 10 : 30 + Math.random() * 10 ), //x
          player.y + Math.random()*20-10, //y
          10 + Math.random()*10-5, //size
          Math.random()*3, //speed
          27 + (Math.random()*2)|0, //color
          false,
          true )
        );
      }

      if(Key.isDown(Key.DOWN) || Key.isDown(Key.s)){

        splodes.push( new splode(
          player.x + (Math.random()*15-8)|0,
          player.y + 16 + (Math.random()*2-1)|0,
          6,5
          )
        )
        renderTarget = COLLISION;
        // if(pget(player.b.x + (player.facingLeft ? -10 : 10), player.b.y) == FUELCRYSTAL){
        //   player.minedFuel = true;
        // }
        fillCircle(player.x + (Math.random()*20-15)|0,
        player.y + 10, 10, 0);

        let i = 5;
        while(--i){
          splodes.push( new splode(
            player.x + Math.random() * 10, //x
            player.y + 30 + Math.random()*20-10, //y
            10 + Math.random()*10-5, //size
            Math.random()*3, //speed
            27 + (Math.random()*2)|0, //color
            false,
            true )
          );
        }

      }

      if(player.gunCooldown < 0){
        player.gunCooldown = 4;
        playSound(sounds.zapgun, 2.5, player.x.map(0, WIDTH, -1, 1), false);

        redraw(); //update room drawing every 4 frames
      }
    }
    if(player.minedFuel){
      pset(player.x + (player.facingLeft ? -10 : 10), player.y - 5, FUELCELL);
      fuelTimer += 25;
      player.minedFuel=false;

    }
    player.gunCooldown--;
    break;

    case THRUSTERMODE://--------------------------------------------------------
    player.maxXvel = 250;
    player.minYvel = -290;
    player.xspeed = 200;
    player.yspeed = 290;
    fuelTimer = 1200000000;
    helpSection = 3;
    if (Key.isDown(Key.d) || Key.isDown(Key.RIGHT)) {
      player.facingLeft = false;
      player.xvel =  player.xspeed;
    }
    if (Key.isDown(Key.a) || Key.isDown(Key.LEFT)){
      this.facingLeft = true;
      player.xvel =  - player.xspeed;
    }
    if(Key.isDown(Key.w) || Key.isDown(Key.UP) || Key.isDown(Key.Z) || Key.isDown(Key.SPACE)){
      if(!player.jumping){
        //player.jumping = true;
        player.yvel += -player.yspeed * dt * 5;
        //s_jump = true;
        playSound(sounds.jet, 2.5, player.x.map(0, WIDTH, -1, 1), false);
      }

    }

    if(Key.isDown(Key.x)){
      if(Key.isDown(Key.DOWN) || Key.isDown(Key.s)){

        splodes.push( new splode(
          player.x + (Math.random()*15-8)|0,
          player.y + 16 + (Math.random()*2-1)|0,
          6,5
          )
        )
        renderTarget = COLLISION;
        if(pget(player.b.x + (player.facingLeft ? -10 : 10), player.b.y) == FUELCRYSTAL){
          player.minedFuel = true;
        }
        fillCircle(player.x + (Math.random()*20-15)|0,
        player.y + 10, 10, 0);

        let i = 5;
        while(--i){
          splodes.push( new splode(
            player.x + Math.random() * 10, //x
            player.y + 30 + Math.random()*20-10, //y
            10 + Math.random()*10-5, //size
            Math.random()*3, //speed
            27 + (Math.random()*2)|0, //color
            false,
            true )
            );
        }

      }
      else {
      fuelTimer-=0.01;
      splodes.push( new splode(
        player.x + (player.facingLeft ? -16 : 16) + (Math.random()*2-1)|0,
        player.y + (Math.random()*15-8)|0,
        6,5
        )
      )
    renderTarget = COLLISION;
    if( pget(player.b.x + (player.facingLeft ? -10 : 10), player.b.y) == FUELCRYSTAL) player.minedFuel = true;
    fillCircle(player.x + (player.facingLeft ? -10 : 10),
    player.y + (Math.random()*20-15)|0, 10, 0);

    let i = 5;
    while(--i){
      splodes.push( new splode(
        player.x + (player.facingLeft ? -30 + Math.random() * 10 : 30 + Math.random() * 10 ), //x
        player.y + Math.random()*20-10, //y
        10 + Math.random()*10-5, //size
        Math.random()*3, //speed
        27 + (Math.random()*2)|0, //color
        false,
        true )
        );
    }
    }

    if(player.gunCooldown < 0){
      player.gunCooldown = 4;
      playSound(sounds.zapgun, 2.5, player.x.map(0, WIDTH, -1, 1), false);

      redraw(); //update room drawing every 4 frames
    }
  }

player.gunCooldown--;
break;

}


//world wrap for player
if(player.x > WIDTH){
  player.x = 16;
  roomSwitch(RIGHT);
}
if(player.x < 0){
  player.x = WIDTH-16;
  roomSwitch(LEFT);
}
if(player.y > HEIGHT){
  player.y = 16;
  roomSwitch(DOWN);
}
if(player.y < 0){
  player.y = HEIGHT-16;
  roomSwitch(UP);
}

},

draw (dt){

//rect(player.b.x - this.radius, player.b.y - this.radius, this.radius * 2, this.radius * 2, 27);

  switch(player.mode){
    case HEADMODE:
    renderSource = SPRITES;
    rspr(0,0,32,32,player.x, player.y, 1, player.angle);
    break;
    case BODYMODE:
    renderSource = SPRITES;
    spr(32,0,32,32, player.b.x+2-16, player.b.y+5-20); //body
    spr(0,0,32,32, player.b.x-16, player.b.y-20, player.facingLeft); //head

    break;
    case ARMMODE:
    renderSource = SPRITES;
    spr(32,0,32,32, player.b.x+2-16, player.b.y+5-20); //body
    spr(64+32,0,32,32, player.b.x+5-16 + (this.facingLeft ? -12 : 0), player.b.y+3-20, this.facingLeft); //arm
    spr(0,0,32,32, player.b.x-16, player.b.y-20, player.facingLeft); //head

    break;
    case THRUSTERMODE:
    renderSource = SPRITES;
    spr(128,0,32,40, player.b.x+5-16, player.b.y+4-20); //wheel
    spr(32,0,32,32, player.b.x+2-16, player.b.y+5-20); //body
    spr(64,0,32,32, player.b.x+5-16, player.b.y+4-20); //wheel arm
    spr(64+32,0,32,32, player.b.x+5-16 + (this.facingLeft ? -12 : 0), player.b.y+3-20, this.facingLeft); //arm
    spr(0,0,32,32, player.b.x-16, player.b.y-20, player.facingLeft); //head
    break;
  }

},

collides () {
  if(this.b.x + this.hitRadius >= WIDTH-1 && player.xvel > 0){
    this.x = WIDTH + 1;
  }
  for(var i = -this.hitRadius; i < this.hitRadius; i++){
    for(var j = -this.hitRadius; j < this.hitRadius; j++){

      let check = ram[COLLISION + (this.b.x + i) + (this.b.y + j) * WIDTH]
      if(check == WALLS || check == TERRA || check == FUELCRYSTAL){
        //player.jumping = false;
        return true;
      }
    }
  }
  return false;
},

overlaps () {
  for(var i = -this.radius; i < this.radius; i++){
    for(var j = -this.radius * 2; j < this.radius; j++){
      let overlap = ram[COLLISION + (this.b.x + i) + (this.b.y + j) * WIDTH]
      if(overlap){
        return {
          x: this.b.x + i,
          y: this.b.y + j,
          o: overlap
        }
      };
    }
  }
  return false;
},

updateB () {

  this.b = {
    left: this.x-this.hitRadius|0,
    right: this.x+this.hitRadius|0,
    top: this.y-this.hitRadius|0,
    bottom: this.y+this.hitRadius|0,
    width: this.hitRadius * 2,
    height: this.hitRadius * 2,
    x: this.x|0,
    y: this.y|0
  }

},

collideResolution(dt) {  //haha, yeah not really. we're just carving a hole.
  renderTarget = COLLISION;
  fillRect(player.x - 32, player.y - 32, 64,64, 0);
  redraw();
},

overlapResolution(dt){
  let o = player.overlaps()

  switch(o.o){

    case FUELCELL:

    renderTarget = COLLISION;
    ram[COLLISION + o.x + o.y * WIDTH] == 0;
    fillCircle(o.x,o.y,3,0);
    renderTarget = BUFFER;

    splodes.push( new splode(o.x, o.y) );
    playSound(sounds.fuelget, 2, player.x.map(0, WIDTH, -1, 1), false);


    let i = 10;
    while(--i){
      splodes.push( new splode(
        192 + Math.random()*50-25, //x
        14 + Math.random()*4-2, //y
        10 + Math.random()*4-2, //size
        10 + Math.random()*4-2, //speed
        9 + (Math.random()*2-1)|0, //color
        false,
        true )
      );

    }

    fuelTimer += 25;
    //playSound(sounds.jump, 1, player.x.map(0, WIDTH, -1, 1), false); //pan sound based on position

    break;

    case BODY:
    if(player.mode == HEADMODE){
      ram[COLLISION + o.x + o.y * WIDTH] == 0;
      renderTarget = COLLISION;
      fillCircle(o.x,o.y,3,0);
      renderTarget = BUFFER;
      player.mode = BODYMODE;
      messages.push(new message('AUX BOOSTERS ACQUIRED. ENERGY CAPACITY INCREASED.'));
      playSound(sounds.fuelget, 1, player.x.map(0, WIDTH, -1, 1), false);
    }

    break;

    case ARM:
    if(player.mode == BODYMODE){
      ram[COLLISION + o.x + o.y * WIDTH] == 0;
      renderTarget = COLLISION;
      fillCircle(o.x,o.y,3,0);
      renderTarget = BUFFER;
      player.mode = ARMMODE;
      playSound(sounds.fuelget, 1, player.x.map(0, WIDTH, -1, 1), false);
      messages.push(new message('DISINTIGRATE TOOL ACQUIRED. PRESS X TO USE'))
    }

    break;

    case THRUSTER:
    if(player.mode == ARMMODE){
      ram[COLLISION + o.x + o.y * WIDTH] == 0;
      renderTarget = COLLISION;
      fillCircle(o.x,o.y,3,0);
      renderTarget = BUFFER;
      player.mode = THRUSTERMODE;
      playSound(sounds.fuelget, 1, player.x.map(0, WIDTH, -1, 1), false);
      messages.push(new message('WHERE WE ARE GOING, WE DONT NEED WHEELS'));
    }



    break;


  }


},
} //end player
