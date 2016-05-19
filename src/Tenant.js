// Define the Tenant constructor
var Tenant = function(roomx, roomy, typee, idd) {
  
  this.name = "";
  this.room_x = roomx; // posição do quarto
  this.room_y = roomy;

  this.price = 0;
  this.income = 0;
  this.behavior = 
  { // true, false or void
    upleft: 'VOID',
    up: 'VOID',
    upright: 'VOID',
    right: 'VOID',
    downright: 'VOID',
    down: 'VOID',
    downleft: 'VOID',
    left: 'VOID',
  };

  this.neighbors = {


    upleft : { roomx: this.room_x - 1, roomy: this.room_y + 1, id: null},
   up: { roomx: this.room_x, roomy: this.room_y + 1, id: null},
   upright: { roomx: this.room_x + 1, roomy: this.room_y + 1, id: null},
   right: { roomx: this.room_x + 1, roomy: this.room_y, id: null},
   downright: { roomx: this.room_x + 1, roomy: this.room_y - 1, id: null},
   down: { roomx:  this.room_x, roomy: this.room_y - 1, id: null},
   downleft: { roomx: this.room_x - 1, roomy: this.room_y - 1, id: null},
   left: { roomx: this.room_x - 1, roomy: this.room_y, id: null},


  };
  
  
  this.type = typee;
  
  this.stress = 70; // 100
  // x = (room x * ap width + ap width /2 - stress bar width / 2 | y = Iw2DGetSurfaceHeight() - (room_y * g_pResources->getAp()->GetHeight()) - (4 + stressBar->GetImage()->GetHeight());
  //this.stressBar = game.add.sprite((room_x * 445) + (445 / 2) - (455 / 2), game.world.height - (room_y * 375) - (4 + 15), "stressBar1");

  this.damage = 0;
  this.pressed = false; // dedo está pressionado?
  this.selected = false; // está selecionado?
  this.doomed = false; // está marcado para morrer/ser deletado?

  this.sprite = null;
  this.stressLabel = null;

  this.id = idd; // procurar melhor maneira de ID unico

  this.selected_color = randomColor({hue: "blue", luminosity: "light"});
  


};

// Add a couple of methods to Tenant.prototype
Tenant.prototype.idle = function(){
  

  // animacao idle
};

Tenant.prototype.sayHello = function(){
  
  // emite som?
};

Tenant.prototype.init = function(game)
{

//this.type = type;
/*
this.selected_color = randomColor(
		{
			hue: "yellow",
			luminosity: "light"
		}); */
		this.selected_color = parseInt(this.selected_color.substr(1), 16);
		
 console.log("jojoojojojo");
  apwidth = game.cache.getImage("ap").width;
  apheight = game.cache.getImage("ap").height;
  switch (this.type)
  {
    case 'SOLDIER':

     // this.type = type;
      sprite_width = game.cache.getImage("soldier").width;
      sprite_height = game.cache.getImage("soldier").height;
      this.behavior.upleft = 'FALSE'; // VOID = 0, TRUE = +hp, FALSE = -hp
      this.behavior.up = 'FALSE';
      this.behavior.upright = 'FALSE';
      this.behavior.right = 'VOID';
      this.behavior.downright = 'VOID';
      this.behavior.down = 'VOID';
      this.behavior.downleft = 'VOID';
      this.behavior.left = 'VOID';

      this.price = 30;
      this.income = 75;
      // msm q ap so que com width e heights do sprite
      //this.sprite = game.add.sprite((room_x * 445) + (445 / 2) - (111 / 2), game.world.height - (room_y * 375) - (24 + 230), "model");
      //this.sprite = game.add.sprite( 472, 3510, "model");


      tempxx = (this.room_x * apwidth) + (apwidth / 2) - (sprite_height / 2) + 300;
      tempyy = game.world.height - (this.room_y * apheight) - (24 + sprite_height);
      //tempyy = ap.y;


      //text.setText("startou "  + " ten x,y " + tempx + "," + tempy);
      this.sprite = game.add.sprite((445 * this.room_x) + 225.5, game.world.height - 187.5 - (375 * this.room_y), "soldier_sheet");

      this.sprite.animations.add('idle');
      this.sprite.animations.play('idle', 5, true);
      this.sprite.anchor.setTo(0.5, 0.5);

      this.sprite.inputEnabled = true;

      this.sprite.input.enableDrag();


      this.sprite.events.onInputOver.add(this.onOver, this);

      this.sprite.events.onInputOut.add(this.onOut, this);
      this.sprite.events.onDragStart.add(this.onDragStart, this);

     this.sprite.events.onDragStop.add(this.onDragStop, this);

      game.physics.arcade.enable(this);


      break;
      
      case 'MODEL':

     // this.type = type;
      sprite_width = game.cache.getImage("model").width;
      sprite_height = game.cache.getImage("model").height;
      this.behavior.upleft = 'VOID'; // VOID = 0, TRUE = +hp, FALSE = -hp
      this.behavior.up = 'VOID';
      this.behavior.upright = 'VOID';
      this.behavior.right = 'TRUE';
      this.behavior.downright = 'VOID';
      this.behavior.down = 'FALSE';
      this.behavior.downleft = 'VOID';
      this.behavior.left = 'TRUE';

      this.price = 30;
      this.income = 75;
      // msm q ap so que com width e heights do sprite
      //this.sprite = game.add.sprite((room_x * 445) + (445 / 2) - (111 / 2), game.world.height - (room_y * 375) - (24 + 230), "model");
      //this.sprite = game.add.sprite( 472, 3510, "model");


      tempxx = (this.room_x * apwidth) + (apwidth / 2) - (sprite_height / 2) + 300;
      tempyy = game.world.height - (this.room_y * apheight) - (24 + sprite_height);
      //tempyy = ap.y;


      //text.setText("startou "  + " ten x,y " + tempx + "," + tempy);
      this.sprite = game.add.sprite((445 * this.room_x) + 225.5, game.world.height - 187.5 - (375 * this.room_y), "model");

      //this.sprite.animations.add('idle');
      //this.sprite.animations.play('idle', 5, true);
      this.sprite.anchor.setTo(0.5, 0.5);

      this.sprite.inputEnabled = true;

      this.sprite.input.enableDrag();


      this.sprite.events.onInputOver.add(this.onOver, this);

      this.sprite.events.onInputOut.add(this.onOut, this);
      this.sprite.events.onDragStart.add(this.onDragStart, this);

     this.sprite.events.onDragStop.add(this.onDragStop, this);

      game.physics.arcade.enable(this);


      break;
  }
  
};


Tenant.prototype.onOver = function(sprite, pointer)
{
  sprite.tint = this.selected_color;
  
}
Tenant.prototype.onOut = function(sprite, pointer)
{
  sprite.tint = 0xffffff;
  
}
Tenant.prototype.onDragStart = function(sprite, pointer)
{
  
  
}
Tenant.prototype.onDragStop = function(sprite, pointer)
{
  
  
}
// Define the Boss constructor

function Boss(roomx, roomy, type, id, game) {
  // Call the parent constructor, making sure (using Function#call)
  // that "this" is set correctly during the call
  Tenant.call(this, roomx, roomy, type, id, game);

  // Initialize our Boss-specific properties
  this.specialMove = "faco coisas especiais";
}

// Create a Boss.prototype object that inherits from Tenant.prototype.
// Note: A common error here is to use "new Tenant()" to create the
// Boss.prototype. That's incorrect for several reasons, not least 
// that we don't have anything to give Tenant for the "firstName" 
// argument. The correct place to call Tenant is above, where we call 
// it from Boss.
Boss.prototype = Object.create(Tenant.prototype); // See note below

// Set the "constructor" property to refer to Boss
Boss.prototype.constructor = Boss;

// Replace the "sayHello" method
Boss.prototype.sayHello = function(){
  // meu som eh mais legal
};

// Add a "sayGoodBye" method
Boss.prototype.annoy = function(roomx, roomy){
 
 // vou ittirar algum tenant
};