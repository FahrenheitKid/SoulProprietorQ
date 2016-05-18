/*global Phaser*/
var room_clicked;
var room_clicked_id;
var tenant_clicked_id;
var room_clicked_x;
var room_clicked_y;

function CreateApt(game, sizex, sizey, size_x_init, size_y_init)
{
    room_clicked = false;
    room_clicked_x = 0;
    room_clicked_y = 0;
    //array to return
    var aps = game.add.group();
    for(var i = 0; i < sizex; i++)
    {
        for(var j = 0; j < sizey; j++)
        {
            //ap width 445;
		    //ap height 375;
		    var ap;
            ap = game.add.sprite(445 * i, game.world.height - 375 - (375 * j), "ap");
            ap.enableBody = true;
            ap.physicsBodyType = Phaser.Physics.ARCADE;
            ap.inputEnabled = true;
            ap.posx = i;
            ap.posy = j;
            ap.id = 0;
            ap.events.onInputDown.add(this.onInputDown, this);
			
			//add object to group
            aps.create(ap);
        }
    }
    return aps;
}

function AddTenant(aps, tenant, roomx, roomy)
{
    
}

function onInputDown(ap, pointer)
{
    if(ap.id == 0)
    {
        room_clicked_x = ap.posx;
        room_clicked_y = ap.posy;
        room_clicked_id = ap.id;
        
        if(ap.tint === 0xffffff)
        {
            ap.tint = 0xFFFF66;
            room_clicked = true;
        }
        else if(ap.tint === 0xFFFF66)
        {
            ap.tint = 0xffffff;
            room_clicked = false;
        }
    }
}