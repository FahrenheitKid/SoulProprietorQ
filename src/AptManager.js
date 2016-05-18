/*global Phaser*/

var AptManager = function(game, sizex, sizey)
{
    this.room_clicked;
    this.room_clicked_x;
    this.room_clicked_y;
    
    this.tenant_clicked_id;
    
    this.apts_sizex = sizex;
    this.apts_sizey = sizey;
    //group of sprites
    this.apts = game.add.group();
    this.apts_matrix = [];
    
    //group of sprites
    this.pTenants = game.add.group();
}

AptManager.prototype.CreateApt = function(game, size_x_init, size_y_init)
{
    this.room_clicked = false;
    this.room_clicked_x = 0;
    this.room_clicked_y = 0;
    
    for(var i = 0; i < this.apts_sizex; i++)
    {
        for(var j = 0; j < this.apts_sizey; j++)
        {
            //ap width 445;
		    //ap height 375;
            var ap = game.add.sprite(445 * i, game.world.height - 375 - (375 * j), 'ap');
            ap.posx = i;
            ap.posy = j;
            ap.inputEnabled = true;
			ap.events.onInputDown.add(onInputDown, this);
			
			//add object to group
			this.apts.create(ap);
			//start apartment matrix ids
			this.apts_matrix.push(0);
        }
        
        //aps.forEach(function(ap){},this);
    }
    
    function onInputDown(ap, pointer)
    {
        this.room_clicked_x = ap.posx;
        this.room_clicked_y = ap.posy;
        
        if(ap.tint == 0xffffff)
        {
            ap.tint = 0xFFFF66;
            this.room_clicked = true;
        }
        else if(ap.tint == 0xFFFF66)
        {
            ap.tint = 0xffffff;
            this.room_clicked = false;
        }
    }
}

AptManager.prototype.AddTenant = function(game, tenant_id, tenant_type, roomx, roomy)
{
    var tnt = game.add.sprite((445 * roomx) + 225.5, game.world.height - 187.5 - (375 * roomy), 'soldier_sheet');
    tnt.anchor.setTo(0.5, 0.5);
    this.pTenants.create(tnt);
    this.apts_matrix[roomx * this.apts_sizey + roomy] = tenant_id;
}