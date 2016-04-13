

var game = new Phaser.Game(800, 800, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

function preload() {

    game.load.image('diamond', 'assets/diamond.png');
    game.load.image('star', 'assets/star.png');
    game.load.image('aid', 'assets/firstaid.png')

}

var sprite;
var bullet;
var group;
var cursors;
var key1;
var change = false;
var tween;
var diamonds;
var stars;

var velocities = [100, 200,];
var numberOfEnemies = 30;
var dragPosition;
var friction = 0.99;
var speedMult = 0.7;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    //game.physics.startSystem(Phaser.Physics.P2JS);
    game.stage.backgroundColor = '#2d2d2d';

    sprite = game.add.sprite(300, 300, 'aid');
    bullet = game.add.physicsGroup();
    

    //game.physics.arcade.enable(sprite);
    
    group = game.add.physicsGroup();
    key1 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    key1.onUp.add(addBullet, this);
    

 cursors = game.input.keyboard.createCursorKeys();

   
    sprite.inputEnabled = true;
    sprite.input.enableDrag();

    sprite.events.onInputOver.add(onOver, this);
    sprite.events.onInputOut.add(onOut, this);
    sprite.events.onDragStart.add(onDragStart, this);
    sprite.events.onDragStop.add(onDragStop, this);
    
    sprite.savedPosition = new Phaser.Point(sprite.x, sprite.y);
    sprite.isBeingDragged = false;
    sprite.movingSpeed = 0;
    

    dragPosition = new Phaser.Point(sprite.x, sprite.y);
    
    diamonds = game.add.group();
    diamonds.enableBody = true;
    diamonds.physicsBodyType = Phaser.Physics.ARCADE;
    
    stars = game.add.group();
    stars.enableBody = true;
    stars.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < numberOfEnemies; i++)
    {
        var diamond = diamonds.create(game.rnd.between(10, game.world.width - 10), game.rnd.between(1, game.world.height - 10), 'diamond');

        //This allows your sprite to collide with the world bounds like they were rigid objects
        diamond.body.collideWorldBounds = true;
        diamond.body.bounce.setTo(0.9, 0.9);
        diamond.body.velocity.setTo(game.rnd.between(1, velocities[0]), game.rnd.between(1, velocities[0]));
        
        group.add(diamond);
        
        var star = stars.create(game.rnd.between(10, game.world.width - 10), game.rnd.between(1, game.world.height - 10), 'star');

        //This allows your sprite to collide with the world bounds like they were rigid objects
        star.body.collideWorldBounds = true;
        star.body.bounce.setTo(0.9, 0.9);
        star.body.velocity.setTo(game.rnd.between(1, velocities[1]), game.rnd.between(1, velocities[1]));
        
        bullet.add(stars);
    }
    
}


function onOver(sprite, pointer) {

    sprite.tint = 0xff7777;

}

function onOut(sprite, pointer) {

    sprite.tint = 0xffffff;

}

function onDragStart(sprite, pointer) {

    dragPosition.set(sprite.x, sprite.y);
    sprite.isBeingDragged = true;
    
    sprite.movingSpeed = 0;

}

function onDragStop(sprite, pointer) {

sprite.isBeingDragged = false;
    //if (!sprite.overlap(dropZone))
    
     //   game.add.tween(sprite).to( { x: dragPosition.x, y: dragPosition.y }, 500, "Back.easeOut", true);
   

}

function Inertia()
{
     if(sprite.isBeingDragged)
    {
    sprite.savedPosition = new Phaser.Point(sprite.x, sprite.y);
    }
    else
    {
        
        if(sprite.movingSpeed > 0)
        {
            sprite.x+= sprite.movingSpeed * Math.cos(this.sprite.movingangle);
            sprite.y+= sprite.movingSpeed * Math.sin(this.sprite.movingangle);
        
        
         if(sprite.x < game.width - sprite.width)
         {
                         sprite.x = game.width - sprite.width;
            }
                    // keep map within boundaries
                    if(sprite.x > 0)
                    {
                         sprite.x = 0;
                    }
                    // keep map within boundaries
                    if(sprite.y < game.height - sprite.height)
                    {
                         sprite.y = game.height - sprite.height;
                    }
                    // keep map within boundaries
                    if(sprite.y > 0)
                    {
                         sprite.y = 0;
                    }
                    // applying friction to moving speed
                    sprite.movingSpeed *= friction;
                    // save current map position
                    sprite.savedPosition = new Phaser.Point(sprite.x, sprite.y);
        }
        else
        {
            
             // checking distance between current map position and last saved position
                    // which is the position in the previous frame
                    var distance = sprite.savedPosition.distance(sprite.position);
                  
                    // same thing with the angle
                    var angle = sprite.savedPosition.angle(sprite.position);
                  
                    // if the distance is at least 4 pixels (an arbitrary value to see I am swiping)
                    if(distance > 10){
                         // set moving speed value
                         sprite.movingSpeed = distance * speedMult;
                         // set moving angle value
                         sprite.movingangle = angle;
                    }
                    
            
        }
                
    }
}
function update() {

    if (game.physics.arcade.collide(bullet, group, collisionHandler/*, processHandler, this*/))
    {
        console.log('boom');
    }

     game.physics.arcade.overlap(bullet, group, collisionHandler, null, this);

   // sprite.body.velocity.x = 0;
    //sprite.body.velocity.y = 0;
    
    
   
    

    if (cursors.left.isDown)
    {
       // sprite.body.velocity.x = -200;
    }
    else if (cursors.right.isDown)
    {
       // sprite.body.velocity.x = 200;
    }

    if (cursors.up.isDown)
    {
       // sprite.body.velocity.y = -200;
      
    }
    else if (cursors.down.isDown)
    {
       // sprite.body.velocity.y = 200;
    }
    
    
        
        /*
        for(var j = 0; bullet.children.length; j++)
        {
            if(bullet.children[j].y <= 0)
            bullet.children[j].kill();
        }*/
    }


function processHandler (player, veg) {

    return true;

}

function collisionHandler (bala, veg) {

    
        veg.kill();
        bala.kill();
    

}

function addBullet()
{
    // if(cursos.up.is)
   
 }