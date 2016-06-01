// Define the Tenant constructor
var Tenant = function(game, roomx, roomy, typee, idd) 
{
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

  this.neighbors = 
  {
    upleft : { roomx: this.room_x - 1, roomy: this.room_y + 1, tenant: null, id: null},
    up: { roomx: this.room_x, roomy: this.room_y + 1, tenant: null, id: null},
    upright: { roomx: this.room_x + 1, roomy: this.room_y + 1, tenant: null, id: null},
    right: { roomx: this.room_x + 1, roomy: this.room_y, tenant: null, id: null},
    downright: { roomx: this.room_x + 1, roomy: this.room_y - 1, tenant: null, id: null},
    down: { roomx:  this.room_x, roomy: this.room_y - 1, tenant: null, id: null},
    downleft: { roomx: this.room_x - 1, roomy: this.room_y - 1, tenant: null, id: null},
    left: { roomx: this.room_x - 1, roomy: this.room_y, tenant: null, id: null},
  };
  
  this.type = typee;
  this.stress = 30; // 100
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
  
  this.game_reference = game;
  this.firstClick = null;
  this.drag_tenant = false;
  this.dragPosition = new Phaser.Point(0, 0);
  this.ownAp_reference = null;
  this.aptManager_reference = null;
  this.player_reference = null;
  this.stressBar = null;
  this.damage_force = 0;
  this.heal_force = 0;
  this.icon = null;
  
  this.rainbow = new Rainbow();
  
  this.rainbow.setSpectrum('#AEF731','#F9EF27','#FF3F72');
  
  this.stressBarColor = "0x" + this.rainbow.colourAt(this.stress);
  
  this.quotes = 
  {
    pickup: [],
  };
};

// Add a couple of methods to Tenant.prototype
Tenant.prototype.idle = function()
{
  // animacao idle
};

Tenant.prototype.say = function(event)
{
  var chance = new Chance(Math.random);

  switch(event)
  {
    default:
      case 'pickup':
      this.quotes.pickup[chance.integer({min:0, max: this.quotes.pickup.length - 1})].play();
      break;
  }
  // emite som?
};

Tenant.prototype.init = function(game, ap_sprite, player, aptManager)
{
  this.ownAp_reference = null;
  this.ownAp_reference = ap_sprite;
  this.player_reference = player;
  this.aptManager_reference = aptManager;
  //this.type = type;
  /*
  this.selected_color = randomColor(
  {
  hue: "yellow",
  luminosity: "light"
  }); */
  this.selected_color = parseInt(this.selected_color.substr(1), 16);
  // passa pelo switch dos type
  this.initType(game,ap_sprite);
  //passa pelo switch das setas
  this.initBehavior(game,ap_sprite);
  this.damage_force = 3;
  this.heal_force = 2;
};

Tenant.prototype.update = function(game)
{
  this.stressBarColor = "0x" + this.rainbow.colourAt(this.stress);
  this.stressBar.tint = this.stressBarColor;
  
  if(this.stress >=100)
  {
    this.stress = 100;
    this.sprite.tint = "black";
    //this.destroy();
  } 
  // tnt.kill();
  if(this.stress <= 0) this.stress = 0;
  this.updateNeighbors();
};

Tenant.prototype.onOver = function(sprite, pointer)
{
  sprite.tint = this.selected_color;
  this.arrowsVisible(true);

  
};

Tenant.prototype.onOut = function(sprite, pointer)
{
  sprite.tint = 0xffffff;
  this.arrowsVisible(false);
};

Tenant.prototype.onDragStart = function(sprite, pointer)
{
  this.say('pickup');
  
  if (sprite.input.pointerDown(this.game_reference.input.activePointer.id))
  {
    this.firstClick = this.game.input.activePointer.position;
    this.drag_tenant = true;
    //dragged_tenant = sprite;
    //this.game.camera.focusOnXY(pointer.x, pointer.y);
  }
  else
  {
    //do
  }
  this.dragPosition.set(sprite.x, sprite.y);
};

Tenant.prototype.onDragStop = function(sprite, pointer)
{
  var ap = this.ownAp_reference;
  var movecost = 10;
  //caso n esteja no proprio ap
  if (!Phaser.Rectangle.containsRect(sprite, ap))
  {
    //this.camera.follow(sprite);
    //text.setText("entrou dropzone: " + dragPosition.x);
    for(var i = 0; i < this.aptManager_reference.apts.children.length; i++)
    {
      var app = this.aptManager_reference.apts.children[i];
      var afford = this.player_reference.money - movecost;
      //faz overlap com todos os aps
      if(Phaser.Rectangle.containsRect(sprite,app))
      {
      // caso ap esteja vago e tenha dinheiro para mover, mova
        if(app.tenant === null && afford >= 0)
        {
          this.game_reference.add.tween(sprite).to(
          {
            x: app.x + app.width /2,
            y: app.y + app.height /2
          }, 500, "Back.easeOut", true, 100);
          
          this.stressBar.x = app.x;
          this.stressBar.y = app.y + app.height - this.stressBar.height;
          
          this.player_reference.money = afford;
          this.room_x = app.posx;
          this.room_y = app.posy;
          app.tenant = this;
          this.ownAp_reference = app;
          ap.tenant = null;
        }
        else
        {
          // caso ap esteja ocupado e tenha dinheiro para mover, de swap nos tenants
          if(app.tenant !== null && app.tenant != 'aptrans' && afford >= 0)
          {
            this.player_reference.money = afford;
            this.game_reference.add.tween(sprite).to(
            {
            x: app.x + app.width /2,
            y: app.y + app.height /2
            }, 500, "Back.easeOut", true, 100);
            
            this.stressBar.x = app.x;
          this.stressBar.y = app.y + app.height - this.stressBar.height;
            
            this.game_reference.add.tween(app.tenant.sprite).to(
            {
            x: ap.x + ap.width /2,
            y: ap.y + ap.height /2
            }, 500, "Back.easeOut", true, 100);
            
            app.tenant.stressBar.x = ap.x;
            app.tenant.stressBar.y = ap.y + ap.height - ap.tenant.stressBar.height;
            ap.tenant = app.tenant;
            app.tenant.ownAp_reference = ap;
            app.tenant.room_x = ap.posx;
            app.tenant.room_y = ap.posy;
            
            this.ownAp_reference = app;
            this.room_x = app.posx;
            this.room_y = app.posy;
            app.tenant = this;
          
          }// caso aptrans ou sem dinheiro
          else if(app.tenant === null || app.tenant == 'aptrans' || afford < 0)
          {
            this.game_reference.add.tween(sprite).to(
            {
            x: ap.x + ap.width /2,
            y: ap.y + ap.height /2
            }, 500, "Back.easeOut", true, 100);
          }
        }
      }
    }
  }
  this.camera.focusOn(sprite);
  this.drag_tenant = false;
};

Tenant.prototype.initType = function(game, ap_sprite)
{
  apwidth = game.cache.getImage("ap").width;
  apheight = game.cache.getImage("ap").height;
  var barheight = game.cache.getImage("stressBarWhite").height;

  this.stressBar = game.add.sprite(ap_sprite.x , ap_sprite.y + apheight - barheight, "stressBarWhite");
  var stressColor = randomColor({hue: 'green'});
  stressColor = parseInt(stressColor.substr(1), 16);
  stressColor = "0x" + this.rainbow.colourAt(this.stress);
  this.stressBar.tint = this.stressBarColor;

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
      this.stress = 50;
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
      
      this.quotes.pickup.push(game.add.audio("soldier_quote_pickup01"));
      this.quotes.pickup.push(game.add.audio("soldier_quote_pickup02"));
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

Tenant.prototype.arrowsVisible = function(bool)
{
  if (bool === true)
  {
    for (var i = 0; i < this.sprite.children.length; i++)
    {
      this.sprite.getChildAt(i).visible = true;
    }
  }
  else if (bool === false)
  {
    for (var i = 0; i < this.sprite.children.length; i++)
    {
      this.sprite.getChildAt(i).visible = false;
    }
  }
};

Tenant.prototype.initBehavior = function(game, ap_sprite)
{
  var parent = this.sprite;
  var arrows_offset = 
  {
    left: { x: -parent.width - 10, y: 0},
    leftup: { x: -parent.width - 10, y: -parent.height / 2},
    leftdown: { x: -parent.width - 10, y: parent.height / 2},
    right: { x: +parent.width + 10, y: 0},
    rightup: { x: parent.width + 10, y: -parent.height / 2},
    rightdown: { x: parent.width + 10, y: parent.height / 2},
    up: { x: 0, y: (-parent.height - 10) / 1.3 },
    down: { x: 0, y: (parent.height + 10) / 1.3 },
  };

  var child;
  //this.sprite.addChild(child);
  switch (this.behavior.left)
  {
    case 'TRUE':
      child = game.add.sprite(arrows_offset.left.x, arrows_offset.left.y, "left_arrow_green");
      child.scale.set(0.5, 0.5);
      child.anchor.set(0.5,0.5);
      child.animations.add('idle');
      child.animations.play('idle', 5, true);
      parent.addChild(child);
      break;

    case 'FALSE':
      child = game.add.sprite(arrows_offset.left.x, arrows_offset.left.y, "left_arrow_red");
      child.scale.set(0.5, 0.5);
      child.anchor.set(0.5,0.5);
      child.animations.add('idle');
      child.animations.play('idle', 5, true);
      parent.addChild(child);
      break;

    case 'VOID':
    default:
      break;
  }

  switch (this.behavior.downleft)
  {
    case 'TRUE':
      child = game.add.sprite(arrows_offset.leftdown.x, arrows_offset.leftdown.y, "leftdown_arrow_green");
      child.scale.set(0.5, 0.5);
      child.anchor.set(0.5,0.5);
      child.animations.add('idle');
      child.animations.play('idle', 5, true);
      parent.addChild(child);
      break;

    case 'FALSE':
      child = game.add.sprite(arrows_offset.leftdown.x, arrows_offset.leftdown.y, "leftdown_arrow_red");
      child.scale.set(0.5, 0.5);
      child.anchor.set(0.5,0.5);
      child.animations.add('idle');
      child.animations.play('idle', 5, true);
      parent.addChild(child);
      break;

    case 'VOID':
    default:
      break;
  }

  switch (this.behavior.upleft)
  {
    case 'TRUE':
      child = game.add.sprite(arrows_offset.leftup.x, arrows_offset.leftup.y, "leftup_arrow_green");
      child.scale.set(0.5, 0.5);
      child.anchor.set(0.5,0.5);
      child.animations.add('idle');
      child.animations.play('idle', 5, true);
      parent.addChild(child);
      break;

    case 'FALSE':
      child = game.add.sprite(arrows_offset.leftup.x, arrows_offset.leftup.y, "leftup_arrow_red");
      child.scale.set(0.5, 0.5);
      child.anchor.set(0.5,0.5);
      child.animations.add('idle');
      child.animations.play('idle', 5, true);
      parent.addChild(child);
      break;

    case 'VOID':
    default:
      break;
  }

  switch (this.behavior.right)
  {
    case 'TRUE':
      child = game.add.sprite(arrows_offset.right.x, arrows_offset.right.y, "right_arrow_green");
      child.scale.set(0.5, 0.5);
      child.anchor.set(0.5,0.5);
      child.animations.add('idle');
      child.animations.play('idle', 5, true);
      parent.addChild(child);
      break;

    case 'FALSE':
      child = game.add.sprite(arrows_offset.right.x, arrows_offset.right.y, "right_arrow_red");
      child.scale.set(0.5, 0.5);
      child.anchor.set(0.5,0.5);
      child.animations.add('idle');
      child.animations.play('idle', 5, true);
      parent.addChild(child);
      break;

    case 'VOID':
    default:
      break;
  }

  switch (this.behavior.upright)
  {
    case 'TRUE':
      child = game.add.sprite(arrows_offset.rightup.x, arrows_offset.rightup.y, "rightup_arrow_green");
      child.scale.set(0.5, 0.5);
      child.anchor.set(0.5,0.5);
      child.animations.add('idle');
      child.animations.play('idle', 5, true);
      parent.addChild(child);
      break;

    case 'FALSE':
      child = game.add.sprite(arrows_offset.rightup.x, arrows_offset.rightup.y, "rightup_arrow_red");
      child.scale.set(0.5, 0.5);
      child.anchor.set(0.5,0.5);
      child.animations.add('idle');
      child.animations.play('idle', 5, true);
      parent.addChild(child);
      break;

    case 'VOID':
    default:
      break;

  }

  switch (this.behavior.downright)
  {
    case 'TRUE':
      child = game.add.sprite(arrows_offset.rightdown.x, arrows_offset.rightdown.y, "rightdown_arrow_green");
      child.scale.set(0.5, 0.5);
      child.anchor.set(0.5,0.5);
      child.animations.add('idle');
      child.animations.play('idle', 5, true);
      parent.addChild(child);
      break;

    case 'FALSE':
      child = game.add.sprite(arrows_offset.rightdown.x, arrows_offset.rightdown.y, "rightdown_arrow_red");
      child.scale.set(0.5, 0.5);
      child.anchor.set(0.5,0.5);
      child.animations.add('idle');
      child.animations.play('idle', 5, true);
      parent.addChild(child);
      break;

    case 'VOID':
    default:
      break;

  }

  switch (this.behavior.up)
  {
    case 'TRUE':
      child = game.add.sprite(arrows_offset.up.x, arrows_offset.up.y, "up_arrow_green");
      child.scale.set(0.5, 0.5);
      child.anchor.set(0.5,0.5);
      child.animations.add('idle');
      child.animations.play('idle', 5, true);
      parent.addChild(child);
      break;

    case 'FALSE':
      child = game.add.sprite(arrows_offset.up.x, arrows_offset.up.y, "up_arrow_red");
      child.scale.set(0.5, 0.5);
      child.anchor.set(0.5,0.5);
      child.animations.add('idle');
      child.animations.play('idle', 5, true);
      parent.addChild(child);
      break;

    case 'VOID':
    default:
      break;
  }

  switch (this.behavior.down)
  {
    case 'TRUE':
      child = game.add.sprite(arrows_offset.down.x, arrows_offset.down.y, "down_arrow_green");
      child.scale.set(0.5, 0.5);
      child.anchor.set(0.5,0.5);
      child.animations.add('idle');
      child.animations.play('idle', 5, true);
      parent.addChild(child);
      break;

    case 'FALSE':
      child = game.add.sprite(arrows_offset.down.x, arrows_offset.down.y, "down_arrow_red");
      child.scale.set(0.5, 0.5);
      child.anchor.set(0.5,0.5);
      child.animations.add('idle');
      child.animations.play('idle', 5, true);
      //child.visible = false;
      parent.addChild(child);
      break;

    case 'VOID':
    default:
      break;
  }
  this.arrowsVisible(false);
};

Tenant.prototype.updateNeighbors = function()
{
  this.neighbors = 
  {
    upleft : { roomx: this.room_x - 1, roomy: this.room_y + 1, tenant: null, id: null},
    up: { roomx: this.room_x, roomy: this.room_y + 1, tenant: null, id: null},
    upright: { roomx: this.room_x + 1, roomy: this.room_y + 1, tenant: null, id: null},
    right: { roomx: this.room_x + 1, roomy: this.room_y, tenant: null, id: null},
    downright: { roomx: this.room_x + 1, roomy: this.room_y - 1, tenant: null, id: null},
    down: { roomx:  this.room_x, roomy: this.room_y - 1, tenant: null, id: null},
    downleft: { roomx: this.room_x - 1, roomy: this.room_y - 1, tenant: null, id: null},
    left: { roomx: this.room_x - 1, roomy: this.room_y, tenant: null, id: null},
  };

  for (var i = 0; i < this.aptManager_reference.apts.children.length; i++)
  {
    var tnt = this.aptManager_reference.apts.children[i];
    var nei = this.neighbors;
    if (nei.upleft.roomx == tnt.posx && nei.upleft.roomy == tnt.posy)
    {
      nei.upleft.tenant = tnt.tenant;
    }

    if (nei.up.roomx == tnt.posx && nei.up.roomy == tnt.posy)
    {
      nei.up.tenant = tnt.tenant;
    }

    if (nei.upright.roomx == tnt.posx && nei.upright.roomy == tnt.posy)
    {
      nei.upright.tenant = tnt.tenant;
    }

    if (nei.right.roomx == tnt.posx && nei.right.roomy == tnt.posy)
    {
      nei.right.tenant = tnt.tenant;
    }

    if (nei.downright.roomx == tnt.posx && nei.downright.roomy == tnt.posy)
    {
      nei.downright.tenant = tnt.tenant;
    }

    if (nei.down.roomx == tnt.posx && nei.down.roomy == tnt.posy)
    {
      nei.down.tenant = tnt.tenant;
    }

    if (nei.downleft.roomx == tnt.posx && nei.downleft.roomy == tnt.posy)
    {
      nei.downleft.tenant = tnt.tenant;
    }

    if (nei.left.roomx == tnt.posx && nei.left.roomy == tnt.posy)
    {
      nei.left.tenant = tnt.tenant;
    }
  }
};

Tenant.prototype.doDamageHeal = function(dmg, heal)
{
  var nei = this.neighbors;
  if (nei.left.tenant !== null && nei.left.tenant != 'aptrans')
  {
    switch (this.behavior.left)
    {
      case 'TRUE':
        nei.left.tenant.damage -= heal;
        break;

      case 'FALSE':
        nei.left.tenant.damage += dmg;
        break;

      case 'VOID':
        default:
          break;
    }
  }

  if (nei.downleft.tenant !== null && nei.downleft.tenant != 'aptrans')
  {
    switch (this.behavior.downleft)
    {
      case 'TRUE':
        nei.downleft.tenant.damage -= heal;
        break;

      case 'FALSE':
        nei.downleft.tenant.damage += dmg;
        break;

      case 'VOID':
        default:
          break;
    }
  }

  if (nei.upleft.tenant !== null && nei.upleft.tenant != 'aptrans')
  {
    switch (this.behavior.upleft)
    {
      case 'TRUE':
        nei.upleft.tenant.damage -= heal;
        break;

      case 'FALSE':
        nei.upleft.tenant.damage += dmg;
        break;

      case 'VOID':
        default:
          break;
    }
  }

  if (nei.right.tenant !== null && nei.right.tenant != 'aptrans')
  {
    switch (this.behavior.right)
    {
      case 'TRUE':
        nei.right.tenant.damage -= heal;
        break;

      case 'FALSE':
        nei.right.tenant.damage += dmg;
        break;

      case 'VOID':
        default:
          break;
    }
  }

  if (nei.upright.tenant !== null && nei.upright.tenant != 'aptrans')
  {
    switch (this.behavior.upright)
    {
      case 'TRUE':
        nei.upright.tenant.damage -= heal;
        break;

      case 'FALSE':
        nei.upright.tenant.damage += dmg;
        break;

      case 'VOID':
        default:
          break;
    }
  }

  if (nei.downright.tenant !== null && nei.downright.tenant != 'aptrans')
  {
    switch (this.behavior.downright)
    {
      case 'TRUE':
        nei.downright.tenant.damage -= heal;
        break;

      case 'FALSE':
        nei.downright.tenant.damage += dmg;
        break;

      case 'VOID':
        default:
          break;
    }
  }

  if (nei.up.tenant !== null && nei.up.tenant != 'aptrans')
  {
    switch (this.behavior.up)
    {
      case 'TRUE':
        nei.up.tenant.damage -= heal;
        break;

      case 'FALSE':
        nei.up.tenant.damage += dmg;
        break;

      case 'VOID':
        default:
          break;
    }
  }

  if (nei.down.tenant !== null && nei.down.tenant != 'aptrans')
  {
    switch (this.behavior.down)
    {
      case 'TRUE':
        nei.down.tenant.damage -= heal;
        break;

      case 'FALSE':
        nei.down.tenant.damage += dmg;
        break;
        
      case 'VOID':
        default:
          break;
    }
  }
};

Tenant.prototype.destroy = function()
{
   var manager = this.aptManager_reference;
   
   
   for(var i = 0; i < manager.apts.children.length; i++)
   {
       var ap = manager.apts.children[i];
       if(ap.tenant == this)
       {
           ap.tenant = null;
       }
   }
    
    for(var i = 0; i < manager.tenants_matrix.length; i++)
   {
       var tnt = manager.tenants_matrix[i];
       
       if(tnt == this)
       {
           this.sprite.destroy();
           this.stressBar.destroy();
           this.damage_force = 0;
           this.heal_force = 0;
           this.income = 0;
           
           //arraymove(manager.tenants_matrix,i,0);
          // manager.tenants_matrix.shift();
           //deleteProperties(this);
       }
       
   }
   
};

// Define the Boss constructor
function Boss(roomx, roomy, type, id, game) 
{
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
Boss.prototype.annoy = function(roomx, roomy)
{
 // vou ittirar algum tenant
};