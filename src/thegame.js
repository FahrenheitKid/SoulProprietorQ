var theGame = function(game){
	
	color = randomColor({hue: "yellow", luminosity: "light"});
	higher = false;
	model = null;
	score = 0;
	dragPosition = null;
	background = null;
};

theGame.prototype = {

	

	create: function()
	{

		background = this.game.add.sprite(0, 0, "background");
		var model = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "model");
		model.anchor.setTo(0.5, 0.5);
		var higherButton = this.game.add.button(160, 100, "tutorial_button", this.clickedHigher, this);
		higherButton.anchor.setTo(0.5, 0.5);

		model.inputEnabled = true;
		model.input.enableDrag();

		model.events.onInputOver.add(this.onOver, this);

		model.events.onInputOut.add(this.onOut, this);
		model.events.onDragStart.add(this.onDragStart, this);

		model.events.onDragStop.add(this.onDragStop, this);

		dragPosition = new Phaser.Point(model.x, model.y);
    color = randomColor({hue: "yellow", luminosity: "light"});
    color = parseInt(color.substr(1), 16);

	},

	update: function() {

	},

  onOver: function(sprite, pointer)
 {

    sprite.tint = color;

 },

 onOut: function(sprite, pointer)
 {

    sprite.tint = 0xffffff;

 },

 onDragStart: function(sprite, pointer)
 {

    dragPosition.set(sprite.x, sprite.y);

 },

 onDragStop: function(sprite, pointer)
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
 },

	clickedHigher: function()
	{

		score++;
		this.game.state.start("GameOver", true, false, score);
	}
};