/*global Phaser*/
/*global background*/
/*global aps*/
/*global AptManager*/
/*global Player*/
//ap width 445;
//ap height 375;
var GameSCENE = function(game)
{
	this.color = randomColor({hue: "yellow", luminosity: "light"});
	this.background = null;
	this.pAptManager = null;
	this.key = null;
	this.test = null;
	this.rendertest = false;
	this.player = null;
	this.addButtons = [];
	this.tenantMenuOn = false;
	this.fullscreenButton = null;
	this.tenantMenuButton = null;
	this.tenantMenuBg = null;

	this.music =
	{
		normal: null,
		danger: null,
	};
};

GameSCENE.prototype = {
    
    create: function()
	{
		var tenantMenuBg_width = this.game.cache.getImage("tenantMenu_bg").width;
  		var tenantMenuBg_height = this.game.cache.getImage("tenantMenu_bg").height;
		this.initMusic(this.game);
		this.music.normal.play();
		//this.music.menu.play(true);
		this.test = false;
		this.game.world.setBounds(0, 0, (4 * 445), (5 * 375));
		this.game.camera.setPosition(0, 5 * 375);

		this.player = new Player(this.game);
		this.player.init(this.game, 100);

		
	     //var teste = this.game.add.sprite(100,100, "tenantMenu_Bg");
		//background sprite
		this.background = this.game.add.tileSprite(0, 0, 1440, 900, 'city_dusk');
		this.background.animations.add('run');
	    this.background.animations.play('run', 10, true);
		this.background.fixedToCamera = true;
		
		//create apartments manager game/sizex/sizey
		this.pAptManager = new AptManager(this.game, 5, 5);
		this.pAptManager.init(this.game,this.player);
		//set initial size
        this.pAptManager.CreateApt(this.game, 2, 2);
        //add tenant to manager game/id/type/roomx/roomy
        this.pAptManager.AddTenant(this.game, this.player, 2, 'SOLDIER', 0, 0);
        this.pAptManager.AddTenant(this.game, this.player, 2, 'MODEL', 1, 1);
        
        //this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
	    // Keep original size
	    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
	    // Maintain aspect ratio
	    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
	    // Não pode usar keyobard enquanto fullscreen, limitação de browsers
	     this.fullscreenButton = this.game.add.button(1350, 10, "fullscreen_button", this.gofull, this);
	     this.tenantMenuButton = this.game.add.button(30, 30, "tenantMenu_button" ,this.toggleTenantMenu ,this);
	     //this.tenantMenuButton = this.game.add.button(0 , this.game.world.height - 200, "proprietor" ,this.toggleTenantMenu ,this);

	    
	     this.tenantMenuBg = this.game.add.sprite(0 - tenantMenuBg_width, this.game.world.height - tenantMenuBg_height, "tenantMenu_Bg");
	     //this.tenantMenuBg.fixedToCamera = true;

	     //this.tenantMenuBg = 
		this.fullscreenButton.fixedToCamera = true;
		this.tenantMenuButton.fixedToCamera = true; 
	},
	
	update: function()
	{
	 	this.pAptManager.update(this.game);
	},
	
	render: function()
	{
		if(this.rendertest === false)
		{
		this.game.debug.text("Debug " + this.tenantMenuBg.x, 30, 30);
		this.game.debug.text("Room clicked " + this.pAptManager.room_clicked_x + " " + this.pAptManager.room_clicked_y, 30, 50);
		this.game.debug.text("Check tenant room 0 0: " + this.pAptManager.apts_matrix[0], 30, 70);
		this.game.debug.text("Apt group size: " + this.pAptManager.apts.children.length, 30, 90);
		//this.game.debug.geom(this.pAptManager.tenants_matrix[0].sprite.getBounds());
		}
	},
	
	gofull: function() 
	{
		this.rendertest = true;
	    if (this.game.scale.isFullScreen)
	    {
	        this.game.scale.stopFullScreen();
	    }
	    else
	    {
	        this.game.scale.startFullScreen(false);
		}
	},

	toggleTenantMenu: function()
	{

			if(this.tenantMenuOn === false)
			{
					this.tenantMenuOn = true;
					this.game.add.tween(this.tenantMenuBg).to(
          {
            x: 0,
           // y: 0
          }, 500, "Back.easeOut", true, 100);

			}

			else
			{

				this.game.add.tween(this.tenantMenuBg).to(
          {
            x: 0,
           // y: 0
          }, 500, "Back.easeOut", true, 100);


					this.tenantMenuOn = false;
			}


	},

	initMusic: function(game)
	{
		this.music.normal = game.add.audio("hanging");
		this.music.normal.loop = true;
		this.music.normal.volume = 0.65;
	}
};