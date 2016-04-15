var theGame = function(game){
	
	color = randomColor({hue: "yellow", luminosity: "light"});
	higher = false;
	model = null;
	score = 0;
	dragPosition = null;
	background = null;
	ap = null;
	model = null;
	result = "drag a sprite";
	dropzone = null;
	bmd  = null;
	text = null;
};

theGame.prototype = {

	

	create: function()
	{

		background = this.game.add.sprite(0, 0, "background");
		ap = this.game.add.sprite(100, 100, "ap");
		//ap.width = 445;
		//ap.height = 375;
		 model = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "model");
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

    bmd = this.game.add.bitmapData(this.game.width,this.game.height);

    //  Black and opaque
    //bmd.fill(0, 0, 0, 1);

    bmd.addToWorld();
    // debugzin
    // oi
  // text = this.game.make.text(0, 0, result, { font: "bold 32px Arial", fill: "#ff0044" });
    //text.anchor.set(0.0);
	
	text = this.game.add.text(30, 470, "- You have clicked -\n0 times !", {
        font: "65px Arial",
        fill: "#ff0044",
        align: "center"
    });

    
    

	},

	update: function() {

		//
		
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
    
    text.setText("sprite x: " + dragPosition.x);
//bmd.draw(text, 10, 420);

 },

 onDragStop: function(sprite, pointer)
 {

    
        if (!sprite.overlap(ap))
        {
        	text.setText("entrou dropzone: " + dragPosition.x);
            this.game.add.tween(sprite).to(
            {
                x: ap.x + ap.width /2,
                y: ap.y + ap.height /2
            }, 500, "Back.easeOut", true);
        }
     
 },

	clickedHigher: function()
	{

		score++;
		this.game.state.start("GameOver", true, false, score);
	},

	render: function()
	{
		//var test = "olgaatgwtwqytwerytewra";
		//game.debug.text(test, 20, 500);
	}
};