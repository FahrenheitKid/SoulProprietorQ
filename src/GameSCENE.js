/*global Phaser*/
/*global background*/
/*global aps*/
/*global AptManager*/
/*global Player*/
//ap width 445;
//ap height 375;
var GameSCENE = function(game)
{
	this.color = randomColor({hue: "yellow", luminosity: "light"});
	this.background = null;
	this.pAptManager = null;
	this.key = null;
	this.test = null;
	this.rendertest = false;
	this.player = null;
	this.addButtons = [];
	this.tenantMenuOn = false;
	this.fullscreenButton = null;
	this.tenantMenuButton = null;
	this.tenantMenuBg = null;
	this.shopTypes = ['MODEL', 'SOLDIER'];
	this.shopButtonsList = [];
	this.coin = null;
	this.moneyText = null;
	this.yearText = null;
	this.monthText = null;
	this.dayText = null;
	this.dayTimer = null;
	this.dayTimerSeconds = null;
	this.monthTimerSeconds = null;
	this.incomeTimer = null;
	
	this.dayCount = 0;
	this.monthCount = 0;
	this.yearCount = 0;
	this.timerScale = 1.0;
	this.music =
	{
		normal: null,
		danger: null,
	};
	this.varToTest = null;
	this.tenantToAdd = null;
	this.tenantToAddParent = null;
};

GameSCENE.prototype = {
    
    create: function()
	{

		var style = { font: "45px Arial", fill: "#ffffff", align: "center" };

    	

		var tenantMenuBg_width = this.game.cache.getImage("tenantMenu_bg").width;
  		var tenantMenuBg_height = this.game.cache.getImage("tenantMenu_bg").height;
		this.initMusic(this.game);
		this.music.normal.play();
		//this.music.menu.play(true);
		this.test = false;
		this.game.world.setBounds(0, 0, (4 * 445), (5 * 375));
		this.game.camera.setPosition(0, 5 * 375);

		this.player = new Player(this.game);
		this.player.init(this.game, 100);

		


		
	     //var teste = this.game.add.sprite(100,100, "tenantMenu_Bg");
		//background sprite
		this.background = this.game.add.tileSprite(0, 0, 1440, 900, 'city_dusk');
		this.background.animations.add('run');
	    this.background.animations.play('run', 10, true);
		this.background.fixedToCamera = true;
		
		//create apartments manager game/sizex/sizey
		this.pAptManager = new AptManager(this.game, 5, 5);
		this.pAptManager.init(this.game,this.player);
		//set initial size
        this.pAptManager.CreateApt(this.game, 2, 2);
        //add tenant to manager game/id/type/roomx/roomy
        this.pAptManager.AddTenant(this.game, this.player, 2, 'SOLDIER', 0, 0);
        this.pAptManager.AddTenant(this.game, this.player, 2, 'MODEL', 1, 1);
        
        //this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
	    // Keep original size
	    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
	    // Maintain aspect ratio
	    this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
	     this.tenantMenuBg = this.game.add.sprite(0 - tenantMenuBg_width, this.game.world.height - tenantMenuBg_height, "tenantMenu_bg");
	    
	    this.tenantMenuBg.scale.x = 0.5;
	    // Não pode usar keyobard enquanto fullscreen, limitação de browsers
	    
		this.createButton(this.fullscreenButton, "fullscreen_button", 1440 - 32 - 30, 10 + 32 + 16, this.gofull, 0.5, 0.5, true,true);
		//this.createButton(this.tenantMenuButton, "tenantMenu_button", 60, 60, this.toggleTenantMenu, 0.5, 0.5, false,false);
		
		this.tenantMenuButton = this.game.add.button(60, 60, "tenantMenu_button", this.toggleTenantMenu, this);
		this.tenantMenuButton.anchor.setTo(0.5, 0.5);
		this.tenantMenuButton.fixedToCamera = true;
		
		this.initShop();

		//this.tenantMenuButton = this.game.add.button(0 , this.game.world.height - 200, "proprietor" ,this.toggleTenantMenu ,this);

		this.coin = this.game.add.sprite(1150, 30, "coin");
		this.coin.fixedToCamera = true;
		this.coin.animations.add('idle');
		this.coin.animations.play('idle', 30, false);
		this.coin.events.onAnimationComplete.add(function()
		{
			this.game.time.events.add(Phaser.Timer.SECOND * 3, function()
			{
				this.coin.animations.play('idle', 30, false);
			}, this);
			console.log('animation complete');
		}, this);


		this.moneyText = this.game.add.text(48 + 20, 0 + 10, "", style);
		
		this.yearText = this.game.add.text(500, 0 + 10, "Y: ", style);
		this.monthText = this.game.add.text(100, 0 + 0, "M: ", style);
		this.dayText = this.game.add.text(100, 0 + 0, "D: ", style);
		
		
		this.dayTimer = this.game.time.create(false);
		this.monthTimerSeconds = Phaser.Timer.SECOND * 20;
		this.dayTimerSeconds = this.monthTimerSeconds / 30;
		
		this.incomeTimer = this.game.time.create(false);
		
		this.incomeTimer.loop(this.monthTimerSeconds * this.timerScale, function(){
			//this.player.changeMoney(this,this.pAptManager.getIncome(),this.moneyText);
			this.player.money+= this.pAptManager.getIncome();
			this.sweetValueTextChange(this.moneyText,this.pAptManager.getIncome(),true);
			
		}, this);
		
		this.incomeTimer.start();
		
    	this.dayTimer.loop(this.dayTimerSeconds * this.timerScale, function(){
    			
    			if(this.dayCount > 29)
    			{
    				this.dayCount = 0;
    				this.monthCount++;
    				
    				if(this.monthCount > 11)
    				{
    					this.monthCount = 0;
    					this.yearCount++;
    					
    					
    				}
    			}
    			
    			this.dayCount++;
    			this.dayText.setText("D: " + this.dayCount);
    			this.monthText.setText("M: " + this.monthCount);
    			this.yearText.setText("Y: " + this.yearCount);
    			
    		
    	}, this);
    	this.dayTimer.start();
		
		this.yearText.fixedToCamera = true;
		//this.monthText.fixedToCamera = true;
		//this.dayText.fixedToCamera = true;
		
		this.yearText.addChild(this.monthText);
		this.monthText.addChild(this.dayText);
		//this.moneyText.fixedToCamera = true;
		this.coin.addChild(this.moneyText);
		//this.tenantMenuBg.fixedToCamera = true;

		//this.tenantMenuBg = 
		//this.fullscreenButton.fixedToCamera = true;

				
		
	},
	
	update: function()
	{
	 	this.pAptManager.update(this.game);
	 //	if(this.dayCount % 30 == 0) this.pAptManager.getIncome();
	 	this.moneyText.setText("x " + this.player.money);

	 	this.tenantToAddCollision(this.tenantToAdd);
	 	
	},
	
	render: function()
	{
		if(this.rendertest === false)
		{
		this.game.debug.text("Debug " + this.varToTest, 30, 30);
		this.game.debug.text("Room clicked " + this.pAptManager.room_clicked_x + " " + this.pAptManager.room_clicked_y, 30, 50);
		this.game.debug.text("Check tenant room 0 0: " + this.pAptManager.apts_matrix[0], 30, 70);
		this.game.debug.text("Apt group size: " + this.pAptManager.apts.children.length, 30, 90);
		//this.game.debug.geom(this.pAptManager.tenants_matrix[0].sprite.getBounds());
		}
	},
	
	gofull: function() 
	{
		this.rendertest = true;
	    if (this.game.scale.isFullScreen)
	    {
	        this.game.scale.stopFullScreen();
	    }
	    else
	    {
	        this.game.scale.startFullScreen(false);
		}
	},

	toggleTenantMenu: function()
	{
		this.tweenTenantMenu();
			


	},

	createButton: function(button_variable, sprite_key, x,y,click_func, anchorx,anchory, setBasicOver, setBasicOut)
	{
		 button_variable = this.game.add.button(x, y, sprite_key,click_func, this);
	     button_variable.anchor.setTo(anchorx,anchory);
	     button_variable.fixedToCamera = true;

	     //this.fullscreenButton.events.onInputOver.add(this.basicButtonOver(this.fullscreenButton),this);


		if (setBasicOver === true)
		{
			button_variable.events.onInputOver.add(function()
			{
				this.basicButtonOver(button_variable);

			}, this);
		}

		if (setBasicOut === true)
		{
			button_variable.events.onInputOut.add(function()
			{
				this.basicButtonOut(button_variable);

			}, this);

		}

	},

	basicButtonOver: function(button)
	{

		var tweenA = this.game.add.tween(button.scale).to({ x: 1.5, y: 1.5 }, 250, "Circ", true, 0);
			

			
						tweenA.start();

	},

	basicButtonOut: function(button)
	{

		
			var tweenB = this.game.add.tween(button.scale).to({ x: 1, y: 1 }, 250, "Circ", true, 100);

			
						tweenB.start();

	},

	tweenTenantMenu: function()
	{
		var tweenA = this.game.add.tween(this.tenantMenuButton.scale).to({ x: 1.5, y: 1.5 }, 250, "Linear", true, 0);
			var tweenB = this.game.add.tween(this.tenantMenuButton.scale).to({ x: 1, y: 1 }, 250, "Linear", true, 100);

			tweenA.chain(tweenB);
						tweenA.start();

			if(this.tenantMenuOn === false)
			{
					this.tenantMenuOn = true;
					//tweenTint(this.tenantMenuButton, 0xFFFFFF, 0x000000, 250);
					this.tenantMenuButton.tint ='black';
					//tweenA.start();
					//this.game.add.tween(this.tenantMenuButton.scale).to({ x: 2, y: 2 }, 500, "Back.easeOut", true, 500);
					//tweenA.start();
					//this.tenantMenuButton.moveUp();
					this.game.add.tween(this.tenantMenuBg).to(
          {
            x: 0,
           // y: 0
          }, 500, "Circ", true, 100);

			
			
			

			}
			else
			{
				
				this.hideTenantMenu();
				
			}

	},
	
	
	hideTenantMenu:  function()
	{
		this.game.add.tween(this.tenantMenuBg).to(
          {
            x:  0 - this.tenantMenuBg.width,
           // y: 0
          }, 500, "Circ", true, 100);

				
				
					this.tenantMenuButton.tint = 0xffffff;
					this.tenantMenuOn = false;
		
	},
	
	initShop: function()
	{
		for(var i = 0; i < this.shopTypes.length; i++)
			{
				
				if(this.shopTypes[i] == 'MODEL')
				{
					var button;
					button = this.game.add.button(0,227, "tenantCardTest",function(){}, this);
					
					
					
					var color = randomColor({hue: "green", luminosity: "light"});
					button.tint = parseInt(color.substr(1), 16);
				
					
					
					
					var buttonTenant = new Tenant(this.game, 0,0, 'MODEL', 0);
					buttonTenant.init(this.game, this.pAptManager.apts.children[0],this.player,this.pAptManager, true);
					buttonTenant.sprite.x = button.x + 485 + 200;
					buttonTenant.sprite.y = 0 + button.y / 2;
					
					var init_x = button.x + 485 + 200;
					var init_y = 0 + button.y / 2;
					buttonTenant.arrowsVisible(true);
					button.addChild(buttonTenant.sprite);
					
					button.children[0].visible = false;
					
					
					button.events.onInputOver.add(function(){
						
						button.children[0].visible = true;
						//var buttonTenant = this.game.add
						
					}, this);
					
					
					
					button.events.onInputOut.add(function(){
						
						button.children[0].visible = false;
						//var buttonTenant = this.game.add
						
					}, this);
					
						button.events.onInputDown.add(function(){
						
						this.hideTenantMenu();
						
					var tenantToAdd = new Tenant(this.game, 0,0, 'MODEL', 0);
					tenantToAdd.init(this.game, this.pAptManager.apts.children[0],this.player,this.pAptManager, true);
					tenantToAdd.sprite.x = 0;
					tenantToAdd.sprite.y = 0 ;
					//tenantToAdd.fixedToCamera = true;
					tenantToAdd.arrowsVisible(true);
					//this.game.world.bringToTop(tenantToAdd.sprite);
					//tenantToAdd.sprite.anchor.setTo(0.5,0.5);
					
					//this.coin.addChild(buttonTenant.sprite);
					var holdpixel = this.game.add.sprite(0, 0, "emptyPixel");
					holdpixel.fixedToCamera = true;
					holdpixel.addChild(tenantToAdd.sprite);
					//tenantToAdd.sprite.scale.x = 0.5;
					//tenantToAdd.sprite.scale.y = 0.5;
					
					this.tenantToAdd = tenantToAdd;
					this.tenantToAddParent = holdpixel;
					this.varToTest = this.tenantToAddParent.x;
						//button.removeChildAt(0);
						//holdpixel.sprite.x = this.game.input.x;
						//holdpixel.sprite.y = this.game.input.y;
						
					}, this)
	    			//button.anchor.setTo(0.5,0.5);
					
					
					this.shopButtonsList.push(button);
				}
				
			}
			
			for(var i = 0; i < this.shopButtonsList.length; i++)
			{
				var hold = this.shopButtonsList[i];
				hold.scale.y = this.tenantMenuBg.scale.x;
				this.tenantMenuBg.addChild(hold);
			}
			
			
		
	},
	
	initMusic: function(game)
	{
		this.music.normal = game.add.audio("hanging");
		this.music.normal.loop = true;
		this.music.normal.volume = 0.65;
	},
	
	sweetValueTextChange: function(text, value, plus_or_minus)
	{
		 var style = { font: "45px Tahoma", fill: "#ffffff", align: "center" };
		var sweetText = this.game.add.text(0, 0, "65958916", style);
		//sweetText.fixedToCamera = true;
		this.moneyText.addChild(sweetText);
		var tweenvalue = 100;
    
    if(plus_or_minus)
    {
    sweetText.setText("+" + value);
    style.fill = "#0be57d";
    sweetText.setStyle(style);
    tweenvalue = 100;
    }
    else
    {
    sweetText.setText("-" + value);
    style.fill = "#ff014e";
    sweetText.setStyle(style);
    tweenvalue = -100;
    }
    
    	var tweenA = this.game.add.tween(sweetText).to({ y: sweetText.y + tweenvalue, alpha: 0}, 7000, "Circ", true, 0);
			

			
						tweenA.start();
		
	},

	tenantToAddCollision: function(tenant)
	{
		if(tenant !== null)
	 	{
	 		if(this.game.input.activePointer.isDown)
	 		{
	 			//this.tenantToAdd.sprite.x = this.game.input.x;
	 			//this.tenantToAdd.sprite.y = this.game.input.y;
	 			tenant.sprite.x = this.game.input.activePointer.x;
	 			tenant.sprite.y = this.game.input.activePointer.y;
	 		}
	 		else
	 		{
	 			
	 			tenant.sprite.visible = false;
	 			tenant.sprite.destroy();
	 			tenant.stressBar.destroy();
	 			//this.tenantToAdd.sprite.parent.destroy();
	 			tenant = null;
	 			this.tenantToAdd = null;


	 			
	 		}
	 	}
	}
};