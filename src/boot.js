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


function fixColor(color)
{
	color = parseInt(color.substr(1), 16);
}

function arraymove(arr, fromIndex, toIndex) {
    var element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);
}

function deleteProperties(objectToClean) {
  for (var x in objectToClean) if (objectToClean.hasOwnProperty(x)) delete objectToClean[x];
}

function tweenTint(obj, startColor, endColor, time) {    
// create an object to tween with our step value at 0    
var colorBlend = {step: 0};    
// create the tween on this object and tween its step property to 100    
var colorTween = game.add.tween(colorBlend).to({step: 100}, time);       
 // run the interpolateColor function every time the tween updates, feeding it the   
  // updated value of our tween each time, and set the result as our tint    
  colorTween.onUpdateCallback(function() {      obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);       });        
  // set the object to the start color straight away    
  obj.tint = startColor;            
  // start the tween    
  colorTween.start();
}