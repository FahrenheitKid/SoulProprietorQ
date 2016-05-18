/*global Phaser*/

var AptManager = function(game)
{
this.room_clicked;
this.room_clicked_id;
this.tenant_clicked_id;
this.room_clicked_x;
this.room_clicked_y;
this.aps = game.add.group();
//this.aps.enableBody = true;

//this.aps.physicsBodyType = Phaser.Physics.ARCADE;
this.tenants_group = game.add.group();

}


AptManager.prototype.CreateApt = function(game, sizex, sizey, size_x_init, size_y_init)
{
    this.room_clicked = false;
    this.room_clicked_x = 0;
    this.room_clicked_y = 0;
    //array to return
    
    for(var i = 0; i < sizex; i++)
    {
        for(var j = 0; j < sizey; j++)
        {
            //ap width 445;
		    //ap height 375;
		    
            var ap = game.add.sprite(445 * i, game.world.height - 375 - (375 * j), 'ap');
           
            //ap.events.onInputDown.add(onInputDown, this);
			//ap.tint = 0xffff66;
			this.aps.create(ap);
			
			//add object to group
            
            
        }
    
        this.aps.forEach(function(ap)
        {
            //ap.id = 0;
            ap.inputEnabled = true;
			ap.events.onInputDown.add(onInputDown, this);
        },this); 
        //aps.forEach(function(ap){},this);
    }
    
    function onInputDown(ap, pointer)
{
    console.log("jiji");
    if(ap.id == 0)
    {
        
        this.room_clicked_x = ap.posx;
        this.room_clicked_y = ap.posy;
        this.room_clicked_id = ap.id;
        
        if(ap.tint == 0xffffff)
        {
            console.log("jojo");
            ap.tint = 0xFFFF66;
            ap.x = 1000;
            this.room_clicked = true;
        }
        else if(ap.tint == 0xFFFF66)
        {
            ap.tint = 0xffffff;
            this.room_clicked = false;
        }
    }
}
    //return aps;
}

AptManager.prototype.AddTenant = function(tenant_id, tenant_type, roomx, roomy)
{
    
}