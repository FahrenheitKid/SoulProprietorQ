/*global Phaser*/

var Player = function(game, apt, gamesc)
{
    this.score = 0;
    this.money = 100;
    this.game_reference = game;
    this.sprite = null;
    this.spriteSelected = false;
    this.posx =  0;
    this.posy = 0;
    this.destination = null;
    this.speed = 8;
    this.isMoving = false;
    
    this.aptManager_reference = apt;
    this.gameScene_reference = gamesc;
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
        this.destination = null;
       
         this.sprite.tint = 0xffffff;
        }
    }
    
    
    if(this.destination !== null)
    {
        //if(this.destination.posx == this.posx && this.destination.posy == this.posy)
        //this.isMoving = false;
    
        if(this.posy == this.destination.posy && this.isMoving === false) // mesmo andar
        {
            this.isMoving = true;
            var distance = Math.abs(this.destination.posx - this.posx);
            	var tweenA = this.game_reference.add.tween(this.sprite).to({ 
            	    x: this.destination.x + this.destination.width / 2, y : this.destination.y + this.destination.height / 2 }, 250 * distance, "Linear", true, 0);
			    
			
						tweenA.start()
           
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