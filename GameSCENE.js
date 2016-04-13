 var game = new Phaser.Game(800, 600, Phaser.AUTO, { preload: preload, create: create, update: update });


 var model;
 var background;
 var dragPosition;

 function preload()
 {

 	game.load.image('background', 'assets/sprites/background.png');
 	game.load.image('model', 'assets/sprites/bosskid.png');

 }

 function create()
 {

 	//Arcade Physics system
 	//game.physics.startSystem(Phaser.Physics.ARCADE);


 	model = game.add.sprite(100, 100, 'model');
 	background = game.add.sprite(0,0,'background');
 	model.inputEnabled = true;
 	model.input.enableDrag();

 	model.events.onInputOver.add(onOver, this);
 	model.events.onInputOut.add(onOut, this);
 	model.events.onDragStart.add(onDragStart, this);
 	model.events.onDragStop.add(onDragStop, this);

 	dragPosition = new Phaser.Point(model.x, model.y);
 }

 function update()
 {
 	//Collision
 	//game.physics.arcade.overlap(bullets, enemies, collisionHandler, null, this);
 }

 function collisionHandler(bullet, enemy)
 {

 }


 function update()
 {

 }

 function onOver(sprite, pointer)
 {

 	sprite.tint = 0xff7777;

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

}