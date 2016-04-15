var preload = function(game){};

preload.prototype = {
	preload: function()
	{
		var loadingBar = this.add.sprite(160, 240, "loading");
		loadingBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(loadingBar);
		this.game.load.image("model", "assets/sprites/char00.png");
		this.game.load.image("gametitle", "assets/sprites/soulproprietor.png");
		this.game.load.image("gameover_title", "assets/sprites/gameover.png");
		this.game.load.image("background", "assets/sprites/background.jpg");
		this.game.load.image("background_menu", "assets/sprites/backgroundMenu.jpg");
		this.game.load.image("background_gameover", "assets/sprites/backgroundGameOver.jpg");
		this.game.load.image("play", "assets/play.png");
		this.game.load.image("higher", "assets/higher.png");
		
	},
	create: function()
	{
		this.game.state.start("GameTitle");
	}
};