/*global Phaser*/
/*global Tenant*/
var AptManager = function(game, sizex, sizey) 
{
    this.room_clicked = null;
    this.room_clicked_x = null;
    this.room_clicked_y = null;

    this.tenant_clicked_id = null;

    this.apts_sizex = sizex;
    this.apts_sizey = sizey;
    
    //group of sprites
    this.apts = game.add.group();
    this.apts_matrix = []; // ids

    //group of sprites
    this.pTenants = game.add.group();
    this.tenants_matrix = [];
    this.player_reference = null;
};


AptManager.prototype.init = function(game, play) 
{
    this.player_reference = play;
    game.time.events.loop(Phaser.Timer.SECOND, this.doDamage, this);
};

AptManager.prototype.doDamage = function() 
{
    for (var i = 0; i < this.tenants_matrix.length; i++) 
    {
        var tnt = this.tenants_matrix[i];
        tnt.doDamageHeal(tnt.damage_force, tnt.heal_force);
    }
    this.takeDamage();
};

AptManager.prototype.takeDamage = function() 
{
    for (var i = 0; i < this.tenants_matrix.length; i++) 
    {
        var tnt = this.tenants_matrix[i];
        tnt.stress += tnt.damage;
        tnt.damage = 0;
    }
};

AptManager.prototype.getIncome = function() 
{
    var amount = 0;
    for (var i = 0; i < this.tenants_matrix.length; i++) 
    {
        var tnt = this.tenants_matrix[i];
        amount += tnt.income;
        //tnt.sprite.tint = "black";
    }
    
    this.player_reference.money += amount;
    //.player_reference.money = amount;
};

AptManager.prototype.CreateApt = function(game, size_x_init, size_y_init) 
{
    this.room_clicked = false;
    var temp = game.add.sprite(0, game.world.height - 30, 'ground');

    for (var i = 0; i < this.apts_sizey; i++) 
    {
        for (var j = 0; j < this.apts_sizex; j++) 
        {
            //ap width 445;
            //ap height 375;
            if (i < size_y_init && j < size_x_init) 
            {
                //add object to group
                this.apts.create(445 * j + 50, game.world.height - 375 - (375 * i) - 30, 'ap');
                //modify
                var ap_ref = this.apts.getTop();
                ap_ref.posx = j;
                ap_ref.posy = i;
                ap_ref.tenant = null;
                ap_ref.inputEnabled = true;
                ap_ref.events.onInputDown.add(onInputDown, this);

                //start apartment matrix ids
                this.apts_matrix.push(1);
            }
            else 
            {
                //add object to group
                this.apts.create(445 * j + 50, game.world.height - 375 - (375 * i) - 30, 'apTrans');
                //modify
                var ap_ref = this.apts.getTop();
                ap_ref.posx = j;
                ap_ref.posy = i;
                ap_ref.tenant = 'aptrans';
                ap_ref.inputEnabled = true;
                ap_ref.events.onInputDown.add(onInputDown, this);

                //start apartment matrix ids
                this.apts_matrix.push(null);
            }
        }
    }

    function onInputDown(ap, pointer) 
    {
        if (ap.tenant === null) {
            this.room_clicked_x = ap.posx;
            this.room_clicked_y = ap.posy;

            if (ap.tint == 0xffffff) {
                ap.tint = 0xFFFF66;
                this.room_clicked = true;
            }
            else if (ap.tint == 0xFFFF66) {
                ap.tint = 0xffffff;
                this.room_clicked = false;
            }
        }
        else if (ap.tenant == 'aptrans') 
        {
            //add new ap to group and update matrix
            /*
            //hold aqui
            this.apts.create(445 * ap.posx + 50, game.world.height - 375 - (375 * ap.posy) - 30, 'ap');
            var newAp = this.apts.getTop();
            newAp.posx = ap.posx;
            newAp.posy = ap.posy;
            ap_ref.tenant = null;
            newAp.inputEnabled = true;
			newAp.events.onInputDown.add(onInputDown, this);
			//send to first layer
			newAp.sendToBack();
			//move above background
			newAp.moveUp();
			
			ap.destroy();
			this.apts_matrix[ap.posy * this.apts_sizey + ap.posx] = 1;
            */

            ap.loadTexture('ap');
            ap.tenant = null;
        }
    }
};

AptManager.prototype.AddTenant = function(game, playerr, tenant_id, tenant_type, roomx, roomy) 
{
    /*
    var tnt = game.add.sprite((445 * roomx) + 225.5, game.world.height - 187.5 - (375 * roomy), 'soldier_sheet');
    tnt.anchor.setTo(0.5, 0.5);
    this.pTenants.create(tnt);
    this.apts_matrix[roomx * this.apts_sizey + roomy] = tenant_id;
    */
    var tnt = new Tenant(game, roomx, roomy, tenant_type, tenant_id);
    var spriteref;
    for (var i = 0; i < this.apts.length; i++) 
    {
        if (this.apts.getChildAt(i).posx == roomx && this.apts.getChildAt(i).posy == roomy)
            spriteref = this.apts.getChildAt(i);
    }
    tnt.init(game, spriteref, playerr, this, false);

    this.apts.forEach(function(ap) 
    {
        if (ap.posx == roomx && ap.posy == roomy) 
        {
            ap.tenant = tnt;
        }
    });
    this.tenants_matrix.push(tnt);
    this.apts_matrix[roomy * this.apts_sizey + roomx] = tenant_id;
};


AptManager.prototype.update = function(game) 
{
    for (var i = 0; i < this.tenants_matrix.length; i++) 
    {
        this.tenants_matrix[i].update(game);
    }
    
    for (var i = 0; i < this.tenants_matrix.length; i++) 
    {
        if(this.tenants_matrix[i].stress >= 100)
        {
           // deleteProperties(this.tenants_matrix[i]);
           this.tenants_matrix[i].destroy();
           deleteProperties(this.tenants_matrix[i]);
            this.tenants_matrix[i] = {};
            arraymove(this.tenants_matrix,i,0);
            this.tenants_matrix.shift();
            
        }
    }
};

