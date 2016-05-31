/*global Phaser*/
/*global background*/
/*global aps*/
/*global AptManager*/
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
}

GameSCENE.prototype = {
    
    create: function()
	{
		this.test = false;
		this.game.world.setBounds(0, 0, (4 * 445), (5 * 375));
		this.game.camera.setPosition(0, 5 * 375);

		//background sprite
		this.background = this.game.add.tileSprite(0, 0, 1440, 900, 'city_dusk');
		this.background.animations.add('run');
	    this.background.animations.play('run', 10, true);
		this.background.fixedToCamera = true;
		
		//create apartments manager game/sizex/sizey
		this.pAptManager = new AptManager(this.game, 5, 5);
		//set initial size
        this.pAptManager.CreateApt(this.game, 2, 2);
        //add tenant to manager game/id/type/roomx/roomy
        this.pAptManager.AddTenant(this.game, 2, 'SOLDIER', 0, 0);
        this.pAptManager.AddTenant(this.game, 2, 'MODEL', 0, 1);
        
        //this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

	    // Keep original size
	    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
	
	    // Maintain aspect ratio
	    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
	    
	    // Não pode usar keyobard enquanto fullscreen, limitação de browsers
	    var fullscreenButton = this.game.add.button(1350, 10, "fullscreen_button", this.gofull, this);
		fullscreenButton.fixedToCamera = true;
	},
	
	update: function()
	{
	 	
	},
	
	render: function()
	{
	
		if(this.rendertest == false)
		{
		this.game.debug.text("Debug " + this.pAptManager.tenants_matrix[0].ownAp_reference.width, 30, 30);
		this.game.debug.text("Room clicked " + this.pAptManager.room_clicked_x + " " + this.pAptManager.room_clicked_y, 30, 50);
		this.game.debug.text("Check tenant room 0 0: " + this.pAptManager.apts_matrix[0], 30, 70);
		this.game.debug.text("Apt group size: " + this.pAptManager.apts.children.length, 30, 90);
		//this.game.debug(aps.children[0], 30, 70);
		}
		
	},
	
	gofull: function() 
	{

		 //this.test = true;
		 //this.pAptManager.apts.children[1].posx = 5;
		// this.pAptManager.CreateApt(this.game, 2, 2);
		 this.rendertest = true;
	    if (this.game.scale.isFullScreen)
	    {
	        this.game.scale.stopFullScreen();
	       
	    }
	    else
	    {
	        this.game.scale.startFullScreen(false);
		}
	}
};