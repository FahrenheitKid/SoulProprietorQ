var gameTitle = function(game){};

gameTitle.prototype = {
	create: function()
	{

		var background = this.game.add.sprite(0,0,"background_menu");
		var gameTitle = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - this.game.world.centerY / 2,"gametitle");
		gameTitle.anchor.setTo(0.5,0.5);
		var playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY + this.game.world.centerY / 2, "start_button", this.playTheGame, this);
		playButton.anchor.setTo(0.5, 0.5);
	},
	playTheGame: function()
	{


		this.game.state.start("TheGame");
	}
};