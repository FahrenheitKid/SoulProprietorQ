/*global Phaser*/

var Player = function(game)
{
    this.score = 0;
    this.money = 100;
};

Player.prototype.init = function(game, money)
{
    
    this.money = money;
};
