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
    
    var temp = game.add.sprite(0, game.world.height - 30, 'ground');
    
    for(var i = 0; i < this.apts_sizey; i++)
    {
        for(var j = 0; j < this.apts_sizex; j++)
        {
            //ap width 445;
		    //ap height 375;
		    if(i < size_y_init && j < size_x_init)
		    {
                var ap = game.add.sprite(445 * j + 50, game.world.height - 375 - (375 * i) - 30, 'ap');
                ap.posx = j;
                ap.posy = i;
                ap.inputEnabled = true;
    			ap.events.onInputDown.add(onInputDown, this);
    			
    			//add object to group
    			this.apts.create(ap);
    			//start apartment matrix ids
    			this.apts_matrix.push(1);
		    }
		    else
		    {
		        var ap = game.add.sprite(445 * j + 50, game.world.height - 375 - (375 * i) - 30, 'apTrans');
                ap.posx = j;
                ap.posy = i;
                ap.inputEnabled = true;
    			ap.events.onInputDown.add(onInputDown, this);
    			
    			//add object to group
    			this.apts.create(ap);
    			//start apartment matrix ids
    			this.apts_matrix.push(0);
		    }
        }
        
        //aps.forEach(function(ap){},this);
    }
    
    function onInputDown(ap, pointer)
    {
        if(this.apts_matrix[ap.posy * this.apts_sizey + ap.posx] == 1)
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
        else if(this.apts_matrix[ap.posy * this.apts_sizey + ap.posx] == 0)
        {
            //add new ap to group and update matrix
            var newAp = game.add.sprite(445 * ap.posx + 50, game.world.height - 375 - (375 * ap.posy) - 30, 'ap');
            newAp.posx = ap.posx;
            newAp.posy = ap.posy;
            newAp.inputEnabled = true;
			newAp.events.onInputDown.add(onInputDown, this);
			
			ap.destroy();
			this.apts.create(newAp);
			this.apts_matrix[ap.posy * this.apts_sizey + ap.posx] = 1;
        }
    }
}

AptManager.prototype.AddTenant = function(game, tenant_id, tenant_type, roomx, roomy)
{
    var tnt = game.add.sprite((445 * roomx) + 225.5 + 50, game.world.height - 187.5 - (375 * roomy) - 30, 'soldier_sheet');
    tnt.anchor.setTo(0.5, 0.5);
    this.pTenants.create(tnt);
    this.apts_matrix[roomy * this.apts_sizey + roomx] = tenant_id;
}