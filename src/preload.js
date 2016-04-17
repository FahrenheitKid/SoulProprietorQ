var preload = function(game){};

preload.prototype = {
	preload: function()
	{

		

		var loadingBar = this.add.sprite(this.game.width / 2, this.game.height / 2, "loading");
		loadingBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(loadingBar);
		this.game.load.image("model", "assets/sprites/char00.png");
		this.game.load.image("gametitle", "assets/sprites/SoulProprietor.png");
		this.game.load.image("gameover_title", "assets/sprites/gameover.png");
		this.game.load.image("background", "assets/sprites/background.jpg");
		this.game.load.image("background_menu", "assets/sprites/backgroundMenu.jpg");
		this.game.load.image("background_gameover", "assets/sprites/backgroundGameOver.jpg");
		this.game.load.image("play", "assets/play.png");
		this.game.load.image("higher", "assets/higher.png");

		this.game.load.spritesheet('city', 'assets/sprites/city_sheet.png', 500, 708);
		this.game.load.spritesheet('city_dusk', 'assets/sprites/cityDusk_sheet.png', 500, 708);
		this.game.load.spritesheet('ghost', 'assets/sprites/ghost_sheet.png', 50, 50);
		
		this.game.load.image("ap", "assets/sprites/wall.png");
		this.game.load.image("apProprietor", "assets/sprites/walla.png");
		this.game.load.image("apTrans", "assets/sprites/wallb.png");
		this.game.load.image("apSelected", "assets/sprites/selected.png");

		//this.game.load.image("backgroundMenu", "assets/sprites/backgroundMenu.jpg");
		this.game.load.image("start_button", "assets/sprites/buttonStart.png");
		this.game.load.image("tutorial_button", "assets/sprites/buttonTutorial.png");

		//this.game.load.image("backgroundGameOver", "assets/sprites/backgroundGameOver.jpg");
		this.game.load.image("try_again_button", "assets/sprites/buttonTryAgain.png");
		this.game.load.image("menu_button", "assets/sprites/buttonMenu.png");

		this.game.load.image("options_button", "assets/sprites/buttonOptions.png");
		this.game.load.image("pause_button", "assets/sprites/pause.png");
		this.game.load.image("showSets_button", "assets/sprites/set.png");

		this.game.load.image("stressBar0", "assets/sprites/stressBar01.png");
		this.game.load.image("stressBar1", "assets/sprites/stressBar01.png");
		this.game.load.image("stressBar2", "assets/sprites/stressBar02.png");
		this.game.load.image("stressBar3", "assets/sprites/stressBar03.png");

		this.game.load.spritesheet("soldier_sheet", "assets/sprites/soldier_sheet.png", 210, 274);
		this.game.load.image("soldier", "assets/sprites/soldier.png");
/*		
		this.game.load.image("proprietor", "assets/sprites/proprietor.png");
		this.game.load.image("proprietor_selected", "assets/sprites/proprietorselected.png");

		this.game.load.image("model", "assets/sprites/char00.png");
		this.game.load.image("model_set", "assets/sprites/model_set.png");
		this.game.load.image("model_selected", "assets/sprites/char00selected.png");
		this.game.load.image("model_button", "assets/sprites/buttonChar00.png");

		this.game.load.image("singer", "assets/sprites/char01.png");
		this.game.load.image("singer_set", "assets/sprites/singer_set.png");
		this.game.load.image("singer_selected", "assets/sprites/char01selected.png");
		this.game.load.image("singer_button", "assets/sprites/buttonChar01.png");

		this.game.load.image("muchalucha", "assets/sprites/char07.png");
		this.game.load.image("muchalucha_set", "assets/sprites/muchalucha_set.png");
		this.game.load.image("muchalucha_selected", "assets/sprites/char07selected.png");
		this.game.load.image("muchalucha_button", "assets/sprites/buttonChar07.png");

		this.game.load.image("jumpman", "assets/sprites/char08.png");
		this.game.load.image("jumpman_set", "assets/sprites/jumpman_set.png");
		this.game.load.image("jumpman_selected", "assets/sprites/char08selected.png");
		this.game.load.image("jumpman_button", "assets/sprites/buttonChar08.png");

		this.game.load.image("boleiro", "assets/sprites/char06.png");
		this.game.load.image("boleiro_set", "assets/sprites/boleiro_set.png");
		this.game.load.image("boleiro_selected", "assets/sprites/char06selected.png");
		this.game.load.image("boleiro_button", "assets/sprites/buttonChar06.png");

		this.game.load.image("florist", "assets/sprites/char03.png");
		this.game.load.image("florist_set", "assets/sprites/florist_set.png");
		this.game.load.image("florist_selected", "assets/sprites/char03selected.png");
		this.game.load.image("florist_button", "assets/sprites/buttonChar03.png");

		this.game.load.image("dog", "assets/sprites/char04.png");
		this.game.load.image("dog_set", "assets/sprites/dog_set.png");
		this.game.load.image("dog_selected", "assets/sprites/char04selected.png");
		this.game.load.image("dog_button", "assets/sprites/buttonChar04.png");

		this.game.load.image("cat", "assets/sprites/char02.png");
		this.game.load.image("cat_set", "assets/sprites/cat_set.png");
		this.game.load.image("cat_selected", "assets/sprites/char02selected.png");
		this.game.load.image("cat_button", "assets/sprites/buttonChar02.png");

		this.game.load.image("latino", "assets/sprites/latino.png");
		this.game.load.image("latino_set", "assets/sprites/latino_set.png");

		this.game.load.image("bosskid", "assets/sprites/bosskid.png");
		this.game.load.image("bosskid_set", "assets/sprites/bosskid_set.png");
	*/
	},
	create: function()
	{
		this.game.state.start("GameTitle");
	}
};