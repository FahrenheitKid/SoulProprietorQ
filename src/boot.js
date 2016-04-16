var boot = function(game){
	console.log("%cStarting my awesome game", "color:white; background:red");
};
  
boot.prototype = {
	preload: function()
	{
		this.game.load.image("loading", "assets/sprites/loadingbar.png");
		
	},
	create: function()
	{
		//this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//this.scale.pageAlignHorizontally = true;
		//this.scale.setScreenSize();
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.state.start("Preload");
	}
};