var preload = function(game){};

preload.prototype = {
	preload: function()
	{

		

		var loadingBar = this.add.sprite(this.game.width / 2, this.game.height / 2, "loading");
		loadingBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(loadingBar);
		this.game.load.image("model", "assets/sprites/char00.png");
		this.game.load.image("model_icon", "assets/sprites/model_icon.png");
		this.game.load.image("model_card", "assets/sprites/model_card.png");
		this.game.load.image("gametitle", "assets/sprites/SoulProprietor.png");
		this.game.load.image("gameover_title", "assets/sprites/gameover.png");
		this.game.load.image("background", "assets/sprites/background.jpg");
		this.game.load.image("background_menu", "assets/sprites/backgroundMenu.jpg");
		this.game.load.image("background_gameover", "assets/sprites/backgroundGameOver.jpg");
		this.game.load.image("play", "assets/play.png");
		this.game.load.image("higher", "assets/higher.png");
		this.game.load.image("emptyPixel", "assets/sprites/emptyPixel.png");

		//this.game.load.bitmapFont("green_screen_font", "assets/fonts/greenScreen.png", "/assets/fonts/greenScreen.xml");
		this.game.load.bitmapFont("monaco_font", "assets/fonts/Monaco.png", "/assets/fonts/Monaco.xml");

		this.game.load.audio("hanging", "assets/music/hanging.mp3");
		this.game.load.audio("tenant_onOver", "assets/sounds/mouse_over2.wav");
		this.game.load.audio("tenant_goHome", "assets/sounds/bass_deny2.wav");

		this.game.load.spritesheet('city', 'assets/sprites/city_sheet.png', 500, 708);
		this.game.load.spritesheet('city_dusk', 'assets/sprites/cityDusk_sheet.png', 500, 708);
		this.game.load.spritesheet('ghost', 'assets/sprites/ghost_sheet.png', 50, 50);
		
		this.game.load.image("ground", "assets/sprites/ground.png");
		this.game.load.image("ap", "assets/sprites/wall.png");
		this.game.load.image("apTrans", "assets/sprites/wallb.png");
		this.game.load.image("apProprietor", "assets/sprites/walla.png");
		this.game.load.image("apSelected", "assets/sprites/selected.png");
		this.game.load.spritesheet("apExplosion", "assets/sprites/ap_explosion_sheet.png",128,80);

		this.game.load.image("start_button", "assets/sprites/buttonStart.png");
		this.game.load.image("tutorial_button", "assets/sprites/buttonTutorial.png");
		this.game.load.image("try_again_button", "assets/sprites/buttonTryAgain.png");
		this.game.load.image("menu_button", "assets/sprites/buttonMenu.png");
		this.game.load.image("fullscreen_button", "assets/sprites/button_fullscreen2.png");

		this.game.load.image("options_button", "assets/sprites/buttonOptions.png");
		this.game.load.image("pause_button", "assets/sprites/pause.png");
		this.game.load.image("showSets_button", "assets/sprites/set.png");
		this.game.load.image("tenantMenu_bg", "assets/sprites/tenantMenuBg.png");
		this.game.load.image("tenantMenu_button", "assets/sprites/tenantMenu_button.png");
		this.game.load.image("tenantMenu_button", "assets/sprites/tenantMenu_button.png");
		this.game.load.image("tenantCard", "assets/sprites/tenant_card.png");
		this.game.load.image("tenantCardTest", "assets/sprites/tenant_cardtest1.png");
		this.game.load.spritesheet("coin", "assets/sprites/coin.png", 48, 68);


		this.game.load.image("stressBar0", "assets/sprites/stressBar01.png");
		this.game.load.image("stressBar1", "assets/sprites/stressBar01.png");
		this.game.load.image("stressBar2", "assets/sprites/stressBar02.png");
		this.game.load.image("stressBar3", "assets/sprites/stressBar03.png");
		this.game.load.image("stressBarWhite", "assets/sprites/stressBarwhite.png");

		this.game.load.spritesheet("soldier_sheet", "assets/sprites/soldier_sheet.png", 210, 274);
		this.game.load.image("soldier", "assets/sprites/soldier.png");
		this.game.load.audio("soldier_quote_pickup01", "assets/sounds/soldier_quote01.mp3");
		this.game.load.audio("soldier_quote_pickup02", "assets/sounds/soldier_quote02.mp3");
		this.game.load.image("soldier_icon", "assets/sprites/soldier_icon.png");
		this.game.load.image("soldier_card", "assets/sprites/soldier_card.png");
		//setas tem 3 frames cada
		this.game.load.spritesheet("left_arrow_green","assets/sprites/left_arrow_green_sheet.png", 200, 200);
		this.game.load.spritesheet("leftup_arrow_green","assets/sprites/leftup_arrow_green_sheet.png", 284, 284);
		this.game.load.spritesheet("leftdown_arrow_green","assets/sprites/leftdown_arrow_green_sheet.png", 284, 284);
		this.game.load.spritesheet("right_arrow_green","assets/sprites/right_arrow_green_sheet.png", 200, 200);
		this.game.load.spritesheet("rightup_arrow_green","assets/sprites/rightup_arrow_green_sheet.png", 284, 284);
		this.game.load.spritesheet("rightdown_arrow_green","assets/sprites/rightdown_arrow_green_sheet.png", 284, 284);
		this.game.load.spritesheet("up_arrow_green","assets/sprites/up_arrow_green_sheet.png", 200, 200);
		this.game.load.spritesheet("down_arrow_green","assets/sprites/down_arrow_green_sheet.png", 200, 200);

		this.game.load.spritesheet("left_arrow_red","assets/sprites/left_arrow_red_sheet.png", 200, 200);
		this.game.load.spritesheet("leftup_arrow_red","assets/sprites/leftup_arrow_red_sheet.png", 284, 284);
		this.game.load.spritesheet("leftdown_arrow_red","assets/sprites/leftdown_arrow_red_sheet.png", 284, 284);
		this.game.load.spritesheet("right_arrow_red","assets/sprites/right_arrow_red_sheet.png", 200, 200);
		this.game.load.spritesheet("rightup_arrow_red","assets/sprites/rightup_arrow_red_sheet.png", 284, 284);
		this.game.load.spritesheet("rightdown_arrow_red","assets/sprites/rightdown_arrow_red_sheet.png", 284, 284);
		this.game.load.spritesheet("up_arrow_red","assets/sprites/up_arrow_red_sheet.png", 200, 200);
		this.game.load.spritesheet("down_arrow_red","assets/sprites/down_arrow_red_sheet.png", 200, 200);
		
		this.game.load.spritesheet("proprietor", "assets/sprites/proprietor_sheet.png", 207,300);
		this.game.load.image("proprietor_selected", "assets/sprites/proprietorselected.png");

		this.game.load.spritesheet("bosskid", "assets/sprites/bosskididle.png", 158, 187);
		this.game.load.audio("bossComing", "assets/sounds/bossComing.mp3");
		this.game.load.image("elevator", "assets/sprites/elevatoropen.png");
		this.game.load.spritesheet("elevatorDoors_sheet", "assets/sprites/elevatordoors.png", 445,375);

		this.game.load.image("ap_button", "assets/sprites/a_button.png");
		this.game.load.image("elevator_button", "assets/sprites/e_button.png");

		this.game.load.spritesheet("bouncer", "assets/sprites/bouncerIdle.png", 71.5, 171);
		this.game.load.image("bouncer_icon", "assets/sprites/bouncer_icon.png");
		this.game.load.image("bouncer_card", "assets/sprites/cardBouncer.png");

		this.game.load.spritesheet("hero", "assets/sprites/heroIdle.png", 100, 158);
		this.game.load.image("hero_icon", "assets/sprites/hero_icon.png");
		this.game.load.image("hero_card", "assets/sprites/cardHero.png");

		this.game.load.spritesheet("florist", "assets/sprites/floristIdle.png", 93.83, 179);
		this.game.load.image("florist_icon", "assets/sprites/florist_icon.png");
		this.game.load.image("florist_card", "assets/sprites/cardFlorist.png");


		this.game.load.spritesheet("kunoichi", "assets/sprites/kunoichiIdle.png", 91, 170);
		this.game.load.image("kunoichi_icon", "assets/sprites/kunoichi_icon.png");
		this.game.load.image("kunoichi_card", "assets/sprites/cardKunoichi.png");

		this.game.load.spritesheet("medic", "assets/sprites/medicIdle.png", 71.4, 170);
		this.game.load.image("medic_icon", "assets/sprites/medic_icon.png");
		this.game.load.image("medic_card", "assets/sprites/cardMedic.png");

		this.game.load.spritesheet("ninja", "assets/sprites/ninjaIdle.png", 105.3, 157);
		this.game.load.image("ninja_icon", "assets/sprites/ninja_icon.png");
		this.game.load.image("ninja_card", "assets/sprites/cardNinja.png");

		this.game.load.spritesheet("princess", "assets/sprites/princessIdle.png", 97.5, 164);
		this.game.load.image("princess_icon", "assets/sprites/princess_icon.png");
		this.game.load.image("princess_card", "assets/sprites/cardPrincess.png");

		this.game.load.spritesheet("teacher", "assets/sprites/teacherIdle.png", 98, 158);
		this.game.load.image("teacher_icon", "assets/sprites/teacher_icon.png");
		this.game.load.image("teacher_card", "assets/sprites/cardTeacher.png");

		this.game.load.spritesheet("vampire", "assets/sprites/vampire_sheet.png", 244, 226);
		this.game.load.image("vampire_icon", "assets/sprites/vampire_icon.png");
		this.game.load.image("vampire_card", "assets/sprites/cardVampire.png");

/*
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

		
		this.game.load.image("bosskid_set", "assets/sprites/bosskid_set.png");
	*/
	},
	create: function()
	{
		this.game.state.start("GameTitle");
	}
};