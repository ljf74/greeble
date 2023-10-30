rooms = [
  //0
  {

    draw: function(dt){

    },

    specials: function(dt){

    }
  },

  //1
  {
    draw: function(dt){
      fillTriangle(H3,V2, H5,V3, H1,V3,  WALLS);
      fillTriangle(H5,V3, H3,V2,H1,V3,  WALLS);
      fillTriangle(H3,V2, H1,V3, H5,V3,   WALLS);
      fillRect(0, V3, WIDTH, V1, WALLS);

    },
    specials: function(dt){
      drawHorizon();
      drawHeads(0,V3, WIDTH, V1-10, 20);
    }
  },

  //2
  {
    draw: function(dt){
      drawBlocks([
      0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,0,0,
      1,1,1,1,1,1,1,1,1,1,1,1 ]);

      pset(25+Math.random()*325, HEIGHT-36, FUELCELL);
      pset(25+Math.random()*325, HEIGHT-36, FUELCELL);
    },

    specials: function(dt){

      drawHorizon();

    }
  },

  //3
  {
    draw: function(dt){
      drawBlocks([
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,2,0,
        1,1,1,1,1,1,1,1,1,0,0,0
      ])
    },

    specials: function(dt){
      drawHorizon();

    }
  },
  //4
  {
    draw: function(dt){
      drawBlocks([
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,2,0,0,0,2,0,0,0,0,
        1,1,1,1,0,0,0,0,1,1,1,1
      ])
    },
    specials: function(dt){
      drawHorizon();

    }
  },
  //5
  {
    draw: function(dt){
      drawBlocks([
        1,1,1,1,0,0,0,0,1,1,1,1,
        0,1,1,1,0,0,0,0,1,1,1,0,
        0,0,1,1,0,0,0,0,1,1,0,0,
        0,0,0,1,0,0,0,0,1,0,0,0,
        0,0,0,2,0,0,0,0,2,0,0,0,
        0,0,0,1,0,0,0,0,1,0,0,0,
        0,1,1,1,0,0,0,0,1,1,0,0,
        1,1,1,1,0,0,0,0,1,1,1,1,
      ])
    },
    specials: function(dt){
      drawUnderground();

    }
  },
  //6
  {
    draw: function(dt){
      drawBlocks([
        1,1,1,1,0,0,0,0,1,1,1,1,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,1,1,1,1,1,1,1,1,0,0
      ]);
      pset(Math.random()*200+70, HEIGHT-40, BODY);


    },
    specials: function(dt){
      drawUnderground();
      drawHorizon();
    }
  },

  //7
  {
    draw: function(dt){

      drawBlocks([
        0,1,1,1,0,0,0,0,1,1,1,1,
        0,1,1,1,0,0,0,0,1,1,1,1,
        0,1,1,1,2,0,0,0,0,0,2,0,
        0,1,1,1,1,1,1,1,1,1,1,1,
        0,1,1,1,1,1,1,1,1,1,1,1,
        0,0,0,2,0,0,0,0,1,1,1,1,
        1,1,1,1,0,0,0,0,1,1,1,1,
        1,1,1,1,0,0,0,0,1,1,1,1,
      ])



    },
    specials: function(dt){
      drawUnderground();
    }
  },
  //8
  {
    draw: function(dt){
      drawBlocks([
        1,0,0,0,0,0,0,0,0,0,0,0,
        1,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,0,0,0,0,0,0,0,0,
        1,1,0,1,1,1,1,1,0,0,0,0,
        1,1,1,1,1,1,1,1,1,1,0,0,
        1,1,1,1,1,0,1,1,1,0,0,0,
        1,1,1,1,1,1,1,1,1,1,1,1
      ])
    },

    specials: function(dt){
      drawUnderground();
    }
  },
  //9
  {
    draw: function(dt){
      drawBlocks([
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        1,1,1,1,1,1,1,1,1,1,1,1
      ])
    },

    specials: function(dt){
      drawHorizon(0,27);
    }
  },

  //10
  {
    draw: function(dt){
      drawBlocks([
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,1,1,
        0,0,0,0,0,0,0,1,1,0,1,0,
        0,0,0,0,1,2,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,0,1,0,
        1,1,1,1,1,1,1,1,1,1,1,1
      ])
    },

    specials: function(dt){
      drawUnderground();
    }
  },

  //11 --is 10 flipped
  {
    draw: function(dt){
      drawBlocks([
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,1,1,
        0,0,0,0,0,0,0,1,1,0,1,0,
        0,0,0,0,1,2,0,0,0,0,1,0,
        0,0,0,0,0,0,0,0,0,0,1,0,
        1,1,1,1,1,1,1,1,1,1,1,1
      ], true)
    },

    specials: function(dt){
      drawUnderground();
    }
  },

  //12 --is 7 flipped
  {
    draw: function(dt){

      drawBlocks([
        0,1,1,1,0,0,0,0,1,1,1,1,
        0,1,1,1,0,0,0,0,1,1,1,1,
        0,1,1,1,2,0,0,0,0,0,2,0,
        0,1,1,1,1,1,1,1,1,1,1,1,
        0,1,1,1,1,1,1,1,1,1,1,1,
        0,0,0,2,0,0,0,0,1,1,1,1,
        1,1,1,1,0,0,0,0,1,1,1,1,
        1,1,1,1,0,0,0,0,1,1,1,1,
      ], true)



    },
    specials: function(dt){
      drawUnderground();
    }
  },
  //13
  {
    draw: function(dt){

      drawBlocks([
        1,0,0,0,0,0,0,0,0,2,1,1,
        1,0,0,0,0,0,0,0,0,1,1,1,
        1,0,0,0,0,0,0,0,1,1,1,1,
        1,0,0,0,0,0,0,2,0,0,0,1,
        1,0,0,0,0,0,1,1,1,0,0,1,
        0,0,0,0,0,0,0,0,0,0,0,1,
        0,0,0,0,0,0,0,0,1,1,1,0,
        1,1,1,1,1,1,1,1,1,1,1,1,

      ],)



    },
    specials: function(dt){
      drawUnderground();
    }
  },
  //14
  {
    draw: function(dt){

      drawBlocks([
        1,1,2,0,0,0,0,0,0,0,0,1,
        1,1,1,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,1,1,1,0,0,0,1,
        1,0,0,0,0,0,0,2,0,0,0,1,
        1,0,0,0,0,0,0,1,1,0,0,1,
        1,0,0,0,0,0,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,0,0,1,1,

      ],)



    },
    specials: function(dt){
      drawUnderground();
    }
  },
  //15
  {
    draw: function(dt){

      drawBlocks([
        1,1,1,1,0,0,0,0,0,0,0,1,
        1,1,1.1,1,1,0,0,0,0,0,1,
        1,0,0,0,0,0,1,0,0,0,0,1,
        1,0,0,0,0,0,0,2,0,0,0,1,
        1,0,0,0,0,2,0,0,1,0,0,1,
        1,0,0,0,1,1,0,0,0,0,0,1,
        1,0,0,0,0,0,0,0,1,1,1,1,
        1,1,0,0,0,0,0,0,0,0,0,1,

      ],)



    },
    specials: function(dt){
      drawUnderground();
    }
  },

  //16
  {
    draw: function(dt){

      drawBlocks([
        1,1,1,1,0,0,0,0,0,0,0,1,
        1,0,1,1,0,0,0,0,0,0,0,1,
        1,2,1,1,1,1,0,0,0,0,0,1,
        1,2,1,0,0,0,0,0,1,0,0,1,
        1,2,1,0,0,0,0,0,7,0,0,1,
        1,2,1,0,0,0,1,1,1,1,1,0,
        1,2,1,0,0,0,0,0,0,1,1,0,
        1,1,1,1,0,0,0,0,0,0,0,1,

      ],)



    },
    specials: function(dt){
      drawUnderground();
    }
  },

  //17
  {
    draw: function(dt){

      drawBlocks([
        1,1,1,1,0,0,0,0,0,0,0,1,
        0,0,0,0,0,0,0,0,0,0,0,1,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,0,2,0,0,
        1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,0,0,0,0,0,0,0,1,

      ],)



    },
    specials: function(dt){
      drawUnderground();
    }
  },

  //18
  {
    draw: function(dt){

      drawBlocks([
        1,1,1,1,0,0,0,0,0,0,0,1,
        0,0,0,0,0,0,0,0,0,0,0,1,
        0,0,0,0,0,0,0,0,0,0,0,0,
        0,0,0,0,0,1,1,1,0,0,0,0,
        0,0,0,0,0,1,0,1,0,0,0,0,
        0,0,0,1,1,1,0,1,1,0,0,0,
        0,0,1,1,1,1,8,1,1,1,0,0,
        1,1,1,1,1,1,1,1,1,1,1,1,

      ],)



    },
    specials: function(dt){
      drawUnderground();
    }
  },

    //19
    {
      draw: function(dt){
        let x = roomNG.nextIntRange(100,300);
        let y = roomNG.nextIntRange(50,200);
        let rad = roomNG.nextIntRange(30,50);
        fillCircle(x, y, rad, WALLS);
        fillCircle(x, y, rad-5, 0);
        //archi(x,y-20,20);
        fillRect(0,200,WIDTH,20,WALLS);
        fillRect(170,200,100,20,0);
        fillRect(0,0,WIDTH,20,WALLS);
      },
      specials: function(dt){
        drawUnderground();
        credits = true;
        helpSection = 4;
      }
  },



] // end rooms;