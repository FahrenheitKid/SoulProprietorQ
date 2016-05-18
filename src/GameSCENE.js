/*global Phaser*/
/*global background*/
/*global aps*/
/*global CreateApt*/
//ap width 445;
//ap height 375;
var GameSCENE = function(game)
{
	var color = randomColor({hue: "yellow", luminosity: "light"});
	var background;
	var aps;
	var tenants;
};

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
		
		//create array of apartments
        aps = CreateApt(this.game, 3, 2, 0, 0);
        tenants = CreateTenants(this.game, 0, 0);
        //add tenant - array aps/tenant id/roomx/roomy
        //-----------ARRUMAR
        AddTenant(aps, 3, 0, 0);
	},
	
	update: function()
	{
	 
	},
	
	render: function()
	{
		this.game.debug.text("Debug", 30, 30);
		this.game.debug.text("Room Clicked " + room_clicked_x + " " + room_clicked_y + " ID " + aps.children[0].id, 30, 50);
		//this.game.debug(aps.children[0], 30, 70);
	}
};