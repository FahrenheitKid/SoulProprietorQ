

var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update });

var model;
 var background;
 var color;
 var dragPosition;
var bmd;
var text;

 function preload()
 {

    game.load.image('background', 'assets/sprites/background.jpg');
    game.load.image('model', 'assets/sprites/char00.png');

 }
function create() {

  background = game.add.sprite(0,0,'background');
    model = game.add.sprite(100, 100, 'model');
  

    model.inputEnabled = true;
    model.input.enableDrag();

    model.events.onInputOver.add(onOver, this);
    model.events.onInputOut.add(onOut, this);
    model.events.onDragStart.add(onDragStart, this);

    model.events.onDragStop.add(onDragStop, this);

    dragPosition = new Phaser.Point(model.x, model.y);
    color = randomColor({hue: "yellow", luminosity: "light"});
    color = parseInt(color.substr(1), 16);

    bmd = game.add.bitmapData(game.width, game.height);

    //  Black and opaque
    //bmd.fill(0, 0, 0, 1);

    bmd.addToWorld();
    // debugzin
    // oi
    text = game.make.text(0, 0, color, { font: "bold 32px Arial", fill: "#ff0044" });
    text.anchor.set(0.5);

    bmd.draw(text, game.world.randomX, game.world.randomY);

}

function collisionHandler(bullet, enemy)
 {

 }


 function update()
 {

 }

 function onOver(sprite, pointer)
 {

    sprite.tint = color;

 }

 function onOut(sprite, pointer)
 {

    sprite.tint = 0xffffff;

 }

 function onDragStart(sprite, pointer)
 {

    dragPosition.set(sprite.x, sprite.y);

 }

 function onDragStop(sprite, pointer)
 {

    /*
        if (!sprite.overlap(dropZone))
        {
            game.add.tween(sprite).to(
            {
                x: dragPosition.x,
                y: dragPosition.y
            }, 500, "Back.easeOut", true);
        }
    */
 }

 function render () {

    game.debug.text( "This is debug text: ", 100, 380 );
    game.debug.spriteBounds(model);

}