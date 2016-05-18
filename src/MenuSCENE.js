/*global player*/
/*global city*/
/*global ghost*/
var gameTitle = function(game){

	var ghost = null;
	var gameTitle = null;
	var player = null;
};

gameTitle.prototype = {

	init: function(pl)
	{
		this.game.world.setBounds(0, 0, 1280, 708);
		player = pl;

	},

	create: function()
	{
		player = { score: 0, money: 100, cash: 0 };

		var background = this.game.add.sprite(0, 0, "background_menu");

		var city = this.game.add.tileSprite(0, 0, 1440, 900, 'city');
		city.animations.add('walk');
		city.animations.play('walk', 10, true);

		ghost = this.game.add.sprite(700, 900, 'ghost');
		ghost.animations.add('select');
		ghost.animations.play('select', 5, true);
		ghost.anchor.setTo(0.5, 0.5);

		gameTitle = this.game.add.sprite(this.game.world.width/2, this.game.world.centerY - this.game.world.centerY / 2, "gametitle");
		gameTitle.anchor.setTo(0.5, 0.5);

		gameTitle.fixedToCamera = true;

		var playButton = this.game.add.button(this.game.world.width/2 + this.game.cache.getImage("start_button").width/4, this.game.world.height  - this.game.world.height / 4, "start_button", this.playTheGame, this);
		playButton.anchor.setTo(0.5, 0.5);
		playButton.onInputOver.add(this.onOver, this);
		playButton.fixedToCamera = true;

		var optionsButton = this.game.add.button(this.game.world.width/2 + this.game.cache.getImage("options_button").width/4, playButton.y + 65, "options_button", this.playTheGame, this);
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
		this.game.state.start("TheGame", true, false, player);
	},

	  onOver: function(sprite, pointer)
 {
 	//sprite.tint = 0xffdf53ff;
    ghost.x = sprite.x - 200;
    ghost.y = sprite.y;

 }
};