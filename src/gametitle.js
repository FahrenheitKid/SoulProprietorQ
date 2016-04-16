var gameTitle = function(game){

	ghost = null;
	gameTitle = null;
};

gameTitle.prototype = {

	init: function(test)
	{
		this.game.world.setBounds(0, 0, 1280, 708);

	},

	create: function()
	{


		var background = this.game.add.sprite(0, 0, "background_menu");

		var city = this.game.add.tileSprite(0, 0, 1280, 708, 'city');

		city.animations.add('walk');

		city.animations.play('walk', 10, true);

		ghost = this.game.add.sprite(700, 900, 'ghost');

		ghost.animations.add('select');

		ghost.animations.play('select', 5, true);

		ghost.anchor.setTo(0.5, 0.5);

		 gameTitle = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - this.game.world.centerY / 2, "gametitle");
		gameTitle.anchor.setTo(0.5, 0.5);

		gameTitle.fixedToCamera = true;

		var playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + this.game.world.centerY / 2, "start_button", this.playTheGame, this);
		playButton.anchor.setTo(0.5, 0.5);

		playButton.onInputOver.add(this.onOver, this);

		playButton.fixedToCamera = true;

		var optionsButton = this.game.add.button(playButton.x, playButton.y + 65, "options_button", this.playTheGame, this);
		optionsButton.anchor.setTo(0.5, 0.5);
		optionsButton.onInputOver.add(this.onOver, this);

		optionsButton.fixedToCamera = true;
	},

	update: function()
	{

		//this.game.camera.follow(gameTitle);
	},
	playTheGame: function()
	{


		this.game.state.start("TheGame");
	},

	  onOver: function(sprite, pointer)
 {
 	//sprite.tint = 0xffdf53ff;
    ghost.x = sprite.x - 200;
    ghost.y = sprite.y;

 }
};