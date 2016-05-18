/*global Phaser*/
/*global background*/
/*global aps*/
/*global AptManager*/
//ap width 445;
//ap height 375;
var GameSCENE = function(game)
{
	var color = randomColor({hue: "yellow", luminosity: "light"});
	var background;
	var pAptManager;
}

GameSCENE.prototype = {
    
    create: function()
	{
		this.game.world.setBounds(0, 0, (4 * 445), (5 * 375));
		this.game.camera.setPosition(0, 5 * 375);

		//background sprite
		background = this.game.add.tileSprite(0, 0, 1440, 900, 'city_dusk');
		background.animations.add('run');
	    background.animations.play('run', 10, true);
		background.fixedToCamera = true;
		
		//create apartments manager game/sizex/sizey
		pAptManager = new AptManager(this.game, 3, 2);
		//set initial size
        pAptManager.CreateApt(this.game, 0, 0);
        //add tenant to manager game/id/type/roomx/roomy
        pAptManager.AddTenant(this.game, 1, "proprietor", 2, 1);
	},
	
	update: function()
	{
	 
	},
	
	render: function()
	{
		this.game.debug.text("Debug", 30, 30);
		this.game.debug.text("Room Clicked " + pAptManager.room_clicked_x + " " + pAptManager.room_clicked_y, 30, 50);
		this.game.debug.text("Check Tenant " + pAptManager.apts_matrix[4], 30, 70);
		//this.game.debug(aps.children[0], 30, 70);
	}
};