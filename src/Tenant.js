// Define the Tenant constructor
var Tenant = function(roomx, roomy, type, idd) {
  


  this.name = "";
  this.room_x = roomx; // posição do quarto
  this.room_y = roomy;

  this.price = 0;
  this.income = 0;
  this.behavior = { // true, false or void
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
  
  this.type = type;
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


  


};

// Add a couple of methods to Tenant.prototype
Tenant.prototype.idle = function(){
  

  // animacao idle
};

Tenant.prototype.sayHello = function(){
  
  // emite som?
};





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