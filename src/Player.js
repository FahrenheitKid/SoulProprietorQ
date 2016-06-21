/*global Phaser*/

var Player = function(game)
{
    this.score = 0;
    this.money = 100;
    this.game_reference = game;
    this.sprite = null;
};

Player.prototype.init = function(game, money)
{
    
    this.money = money;
    this.game_reference = game;
};

Player.prototype.changeMoney = function(game,value, text)
{
    var style = { font: "45px Arial", fill: "#6dc066", align: "center" };
    
    var before = 0;
    var after = 0;
    before = this.money;
    this.money += value;
    after = this.money;
    
    var sweetText = this.game_reference.add.text(text.x, text.y + 100, "", style);
    
    if(before > after)
    sweetText.setText("+");
    else
    sweetText.setText("-");
    
    	var tweenA = this.game_reference.add.tween(sweetText).to({ y: text.y - 100 }, 250, "Linear", true, 0);
			

			
						tweenA.start();
}