/*global Phaser*/

var Player = function(game)
{
    this.score = 0;
    this.money = 100;
    this.game_reference = game;
    this.sprite = null;
    this.spriteSelected = false;
    this.posx =  0;
    this.posy = 0;
    this.destination = {
        x: null,
        y: null
    }
    
};

Player.prototype.init = function(game, money)
{
    
    this.money = money;
    this.game_reference = game;
};

Player.prototype.update = function()
{
    if(this.sprite != null)
    {
        if(this.spriteSelected)
        {
        this.sprite.tint = 0xDDB435;
        
         }
        else
        {
         this.sprite.tint = 0xffffff;
        }
    }
    
    
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