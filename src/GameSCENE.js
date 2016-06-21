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
	this.buttonFontStyle = null;

	this.bossTimers = 
	{
		BOSSKID: null,
		GORILLA: null,
	};

	this.bossSfx = {

		BOSSKID: null,
	};

	this.tenantSfx = {
		onOver: null,
		goHome: null,
	};
};

GameSCENE.prototype = {
    


    create: function()
	{
		var style = { font: "45px Arial", fill: "#ffffff", align: "center" };
		this.defaultInit();
		

		this.buttonFontStyle = {
			font: "70px Helvetica",
			fill: "#000000",
			align: "center"
		};

		var tenantMenuBg_width = this.game.cache.getImage("tenantMenu_bg").width;
		var tenantMenuBg_height = this.game.cache.getImage("tenantMenu_bg").height;


		this.initDayTimers();
		//this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
		// Keep original size
		// game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
		// Maintain aspect ratio

		this.initShop();

		


		this.startBossSpawning("BOSSKID", 10);
		//this.bossTimers.BOSSKID.events[0].delay = 5000;
		
		this.varToTest = this.pAptManager.tenants_matrix[0].isAt.posx;

		
	},
	
	update: function()
	{
	 	this.pAptManager.update(this.game);
	 //	if(this.dayCount % 30 == 0) this.pAptManager.getIncome();
	 	this.moneyText.setText("x " + this.player.money);

		
	 	this.tenantToAddCollision(this.tenantToAdd);

	 	this.moveCameraOnEdges();
	 	
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


	playTenantSfx: function(soundkey)
	{

		switch(soundkey)
		{
			case "onOver":
			this.tenantSfx.onOver.play();
			break;
			case "goHome":
			this.tenantSfx.goHome.play();
			break;

		}
	},
	  defaultInit: function()
    {

    	var style = { font: "45px Arial", fill: "#ffffff", align: "center" };
    	var itself = this;
    	this.initMusic(this.game);
		this.music.normal.play();
		
		this.game.world.setBounds(0, 0, (4 * 445), (5 * 375));
		this.game.camera.setPosition(0, 5 * 375);

		this.player = new Player(this.game);
		this.player.init(this.game, 100);

		this.tenantSfx.onOver = this.game.add.audio("tenant_onOver");
		this.tenantSfx.goHome = this.game.add.audio("tenant_goHome");

		this.background = this.game.add.tileSprite(0, 0, 1440, 900, 'city_dusk');
		this.background.animations.add('run');
	    this.background.animations.play('run', 10, true);
		this.background.fixedToCamera = true;

		//create apartments manager game/sizex/sizey
		this.pAptManager = new AptManager(this.game, 5, 5, itself);
		this.pAptManager.init(this.game,this.player);
		//set initial size
        this.pAptManager.CreateApt(this.game, 2, 2);
        //add tenant to manager game/id/type/roomx/roomy
        this.pAptManager.addTenant(this.game, this.player, 2, 'SOLDIER', 0, 1);
        this.pAptManager.addTenant(this.game, this.player, 2, 'BOUNCER', 1, 1);
         //this.pAptManager.addTenant(this.game, this.player, 2, 'BOSSKID', 0, 0);

         this.bossSfx.BOSSKID = this.game.add.audio("bossComing");

          this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
	     this.tenantMenuBg = this.game.add.sprite(0, 0, "tenantMenu_bg");
	     this.tenantMenuBg.x -= this.tenantMenuBg.width;
	    //this.tenantMenuBg.fixedToCamera = true;
	    this.tenantMenuBg.scale.x = 0.5;
	    // Não pode usar keyobard enquanto fullscreen, limitação de browsers
	    var tenantMenuBgParent = this.game.add.sprite(0,0, "emptyPixel");
		tenantMenuBgParent.fixedToCamera = true;
		tenantMenuBgParent.addChild(this.tenantMenuBg);
	    
		this.createButton(this.fullscreenButton, "fullscreen_button", 1440 - 32 - 30, 10 + 32 + 16, this.gofull, 0.5, 0.5, true,true,true);
		//this.createButton(this.tenantMenuButton, "tenantMenu_button", 60, 60, this.toggleTenantMenu, 0.5, 0.5, false,false);
		
		this.tenantMenuButton = this.game.add.button(60, 60, "tenantMenu_button", this.toggleTenantMenu, this);
		this.tenantMenuButton.anchor.setTo(0.5, 0.5);
		this.tenantMenuButton.fixedToCamera = true;

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
			//console.log('animation complete');
		}, this);

		this.moneyText = this.game.add.text(48 + 20, 0 + 10, "", style);

		this.coin.addChild(this.moneyText);

    },

    initDayTimers: function() // inicializa os textos e timers dos dias
    {
    	var style = { font: "45px Arial", fill: "#ffffff", align: "center" };

    	this.yearText = this.game.add.text(500, 0 + 10, "Y: ", style);
		this.monthText = this.game.add.text(100, 0 + 0, "M: ", style);
		this.dayText = this.game.add.text(100, 0 + 0, "D: ", style);

		this.dayTimer = this.game.time.create(false);
		this.monthTimerSeconds = Phaser.Timer.SECOND * 20;
		this.dayTimerSeconds = this.monthTimerSeconds / 30;
		this.incomeTimer = this.createLoopTimer(this.monthTimerSeconds * this.timerScale,function(){
			//this.player.changeMoney(this,this.pAptManager.getIncome(),this.moneyText);
			this.player.money+= this.pAptManager.getIncome();
			this.sweetValueTextChange(this.moneyText,this.pAptManager.getIncome(),true);
			
		},true, 0);
		
		
		
		this.dayTimer = this.createLoopTimer(this.dayTimerSeconds * this.timerScale, function()
		{

			if (this.dayCount > 29)
			{
				this.dayCount = 0;
				this.monthCount++;

				
				if (this.monthCount > 11)
				{
					this.monthCount = 0;
					this.yearCount++;


				}
			}

			this.dayCount++;

			this.dayText.setText("D: " + this.dayCount);
			this.monthText.setText("M: " + this.monthCount);
			this.yearText.setText("Y: " + this.yearCount);


		}, true, 0);
    	
		
		this.yearText.fixedToCamera = true;
		//this.monthText.fixedToCamera = true;
		//this.dayText.fixedToCamera = true;
		
		this.yearText.addChild(this.monthText);
		this.monthText.addChild(this.dayText);

    },


	toggleTenantMenu: function() 
	{
		//this.game.world.bringToTop(this.tenantMenu_Bg);
		//this.game.world.bringToTop(this.tenantMenuButton);
		this.tweenTenantMenu();
			


	},

	moveCameraOnEdges: function()
	{

		if(this.game.input.activePointer.x >= 1350)
	 	{
	 		this.game.camera.x+=15;
	 	}
	 	if(this.game.input.activePointer.x <= 50)
	 	{
	 		this.game.camera.x-=15;
	 	}
	 	if(this.game.input.activePointer.y <= 50)
	 	{
	 		this.game.camera.y-=15;
	 	}
	 	if(this.game.input.activePointer.y >= 850)
	 	{
	 		this.game.camera.y+=15;
	 	}

	},

	createButton: function(button_variable, sprite_key, x,y,click_func, anchorx,anchory, setBasicOver, setBasicOut, fixed) // função para criar botões mais rápido
	{
		 button_variable = this.game.add.button(x, y, sprite_key,click_func, this);
	     button_variable.anchor.setTo(anchorx,anchory);

	     if(fixed)
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
			return button_variable;
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
	
	initShop: function() // inicizaliza a shop baseado no array shopTypes contendo os tenants que estarão a venda
	{
		for(var i = 0; i < this.shopTypes.length; i++)
			{
				
				
					this.createTenantShopButton(this.shopTypes[i]);
				
				
			}
			
			for(var i = 0; i < this.shopButtonsList.length; i++)
			{
				var hold = this.shopButtonsList[i];
				hold.y = this.shopButtonsList[0].y + i * 130;
				hold.scale.y = this.tenantMenuBg.scale.x;
				this.tenantMenuBg.addChild(hold);
			}
			
			
		
	},
	
	initMusic: function(game)
	{
		this.music.normal = game.add.audio("hanging");
		this.music.normal.loop = true;
		this.music.normal.volume = 0.25;
	},
	
	sweetValueTextChange: function(text, value, plus_or_minus) // juiciness pra mudança de money na tela
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

	tenantToAddCollision: function(tenant) // mecanica para checar se o novo tenant a ser adicionado está num ap válido
	{


		if (tenant !== null)
		{
			if (this.game.input.activePointer.isDown)
			{
				//this.tenantToAdd.sprite.x = this.game.input.x;
				//this.tenantToAdd.sprite.y = this.game.input.y;
				tenant.sprite.x = this.game.input.activePointer.x;
				tenant.sprite.y = this.game.input.activePointer.y;
			}
			else
			{



				for (var i = 0; i < this.pAptManager.apts.children.length; i++)
				{
					var app = this.pAptManager.apts.children[i];
					var afford = this.player.money - tenant.price;
					var cost = Math.abs(tenant.price);
					cost = 30;
					//faz overlap com todos os aps

					//this.game.physics.arcade.enable(app);
					//this.game.physics.arcade.enable(tenant.sprite);



					if (app.getBounds().contains(this.game.input.activePointer.x, this.game.input.activePointer.y))
					{

						// caso ap esteja vago e tenha dinheiro para mover, mova
						if (app.tenant === null && afford >= 0)
						{

							this.pAptManager.addTenant(this.game, this.player, 2, tenant.type, app.posx, app.posy);

							this.sweetValueTextChange(this.moneyText, cost, false);
							this.player.money = afford;
							//this.room_x = app.posx;
							//this.room_y = app.posy;
							//app.tenant = this;
							//this.ownAp_reference = app;



						}
					}
				}

				//if(tenant.sprite)


				tenant.sprite.visible = false;
				tenant.sprite.destroy();
				tenant.stressBar.destroy();
				//this.tenantToAdd.sprite.parent.destroy();
				tenant = null;
				this.tenantToAdd = null;
	 		}
	 	}
	},

	createLoopTimer: function(time,ffunction, autostart, delay)
	{

		var timer = this.game.time.create(false);



		timer.loop(time, ffunction, this);

		if (autostart)
			timer.start(delay);

		return timer;
	},

	startBossSpawning: function(boss_type, timeratio) // every how much seconds
		{

		//timeratio*= Phaser.Time.SECOND;
		var chance = new Chance(Math.random);
		var tnt_index = 0;
		var rooms = {
			x: this.pAptManager.tenants_matrix[tnt_index].room_x,
			y: this.pAptManager.tenants_matrix[tnt_index].room_y
		};

		

		var manager = this.pAptManager;

		switch (boss_type)
		{

			case 'BOSSKID':
				this.bossTimers.BOSSKID = this.createLoopTimer(timeratio * 1000, function()
				{
					if (this.pAptManager.tenants_matrix.length >= 2)
		{
			tnt_index = chance.integer(
			{
				min: 0,
				max: this.pAptManager.tenants_matrix.length - 1
			});

			rooms = {
				x: this.pAptManager.tenants_matrix[tnt_index].room_x,
				y: this.pAptManager.tenants_matrix[tnt_index].room_y
			};
		}
		
					//this.varToTest++;
					if (this.pAptManager.tenants_matrix.length >= 1)
					{

						manager.deleteTenant(rooms.x, rooms.y);
						manager.addTenant(this.game, this.player, 0, boss_type, rooms.x, rooms.y);
					}
				}, true, timeratio);
				break;
		}

		//this.createLoopTimer(Phaser.Time.SECOND * timeratio, whichboss(boss_type), true);
		
		},

	createTenantShopButton: function(type)
	{

		var button;
		var char_icon;
		var coin = this.game.add.sprite(485 - 50, 5, "coin");
		//coin.fixedToCamera = true;
		coin.animations.add('idle');
		coin.animations.play('idle', 30, false);
		coin.events.onAnimationComplete.add(function()
		{
			this.game.time.events.add(Phaser.Timer.SECOND * 3, function()
			{
				coin.animations.play('idle', 30, false);
			}, this);
			//console.log('animation complete');
		}, this);

		var color;

		var buttonTenant;
		var tenantToAdd;
		var itself = this;
		switch (type)
		{

			case "MODEL":

				button = this.game.add.button(0, 227, "model_card", function() {}, this);
				char_icon = this.game.add.sprite(27, 75, "model_icon");



				color = randomColor(
				{
					hue: "red",
					luminosity: "light"
				});
				button.tint = parseInt(color.substr(1), 16);



				buttonTenant = new Tenant(this.game, 0, 0, type, 0, itself);
				buttonTenant.init(this.game, this.pAptManager.apts.children[0], this.player, this.pAptManager, true);
				buttonTenant.sprite.x = button.x + 485 + 200;
				buttonTenant.sprite.y = 0 + button.y / 2;

				var init_x = button.x + 485 + 200;
				var init_y = 0 + button.y / 2;
				buttonTenant.arrowsVisible(true);
				button.addChild(buttonTenant.sprite);
				button.addChild(char_icon);
				button.addChild(coin);

				button.children[0].visible = false;


				button.events.onInputOver.add(function()
				{

					button.children[0].visible = true;
					//var buttonTenant = this.game.add

				}, this);



				button.events.onInputOut.add(function()
				{

					button.children[0].visible = false;
					//var buttonTenant = this.game.add

				}, this);

				button.events.onInputDown.add(function()
				{

					this.hideTenantMenu();

					tenantToAdd = new Tenant(this.game, 0, 0, type, 0, itself);
					tenantToAdd.init(this.game, this.pAptManager.apts.children[0], this.player, this.pAptManager, true);
					tenantToAdd.sprite.x = 0;
					tenantToAdd.sprite.y = 0;
					//tenantToAdd.fixedToCamera = true;
					tenantToAdd.arrowsVisible(true);
					//this.game.world.bringToTop(tenantToAdd.sprite);
					//tenantToAdd.sprite.anchor.setTo(0.5,0.5);

					//this.coin.addChild(buttonTenant.sprite);
					var holdpixel = this.game.add.sprite(0, 0, "emptyPixel");
					holdpixel.fixedToCamera = true;
					holdpixel.addChild(tenantToAdd.sprite);
					tenantToAdd.sprite.scale.x = 0.5;
					tenantToAdd.sprite.scale.y = 0.5;

					this.tenantToAdd = tenantToAdd;
					this.tenantToAddParent = holdpixel;
					//this.varToTest = this.tenantToAdd.price;
					//button.removeChildAt(0);
					//holdpixel.sprite.x = this.game.input.x;
					//holdpixel.sprite.y = this.game.input.y;

				}, this);
				//button.anchor.setTo(0.5,0.5);


				this.shopButtonsList.push(button);

				break;

			case "SOLDIER":

				button = this.game.add.button(0, 227, "soldier_card", function() {}, this);
				char_icon = this.game.add.sprite(27, 75, "soldier_icon");



				color = randomColor(
				{
					hue: "green",
					luminosity: "light"
				});
				button.tint = parseInt(color.substr(1), 16);



				buttonTenant = new Tenant(this.game, 0, 0, type, 0, itself);
				buttonTenant.init(this.game, this.pAptManager.apts.children[0], this.player, this.pAptManager, true);
				buttonTenant.sprite.x = button.x + 485 + 200;
				buttonTenant.sprite.y = 0 + button.y / 2;

				var init_x = button.x + 485 + 200;
				var init_y = 0 + button.y / 2;
				buttonTenant.arrowsVisible(true);
				button.addChild(buttonTenant.sprite);
				button.addChild(char_icon);
				button.addChild(coin);

				button.children[0].visible = false;


				button.events.onInputOver.add(function()
				{

					button.children[0].visible = true;
					//var buttonTenant = this.game.add

				}, this);



				button.events.onInputOut.add(function()
				{

					button.children[0].visible = false;
					//var buttonTenant = this.game.add

				}, this);

				button.events.onInputDown.add(function()
				{

					this.hideTenantMenu();

					tenantToAdd = new Tenant(this.game, 0, 0, type, 0, itself);
					tenantToAdd.init(this.game, this.pAptManager.apts.children[0], this.player, this.pAptManager, true);
					tenantToAdd.sprite.x = 0;
					tenantToAdd.sprite.y = 0;
					//tenantToAdd.fixedToCamera = true;
					tenantToAdd.arrowsVisible(true);
					//this.game.world.bringToTop(tenantToAdd.sprite);
					//tenantToAdd.sprite.anchor.setTo(0.5,0.5);

					//this.coin.addChild(buttonTenant.sprite);
					var holdpixel = this.game.add.sprite(0, 0, "emptyPixel");
					holdpixel.fixedToCamera = true;
					holdpixel.addChild(tenantToAdd.sprite);
					tenantToAdd.sprite.scale.x = 0.5;
					tenantToAdd.sprite.scale.y = 0.5;

					this.tenantToAdd = tenantToAdd;
					this.tenantToAddParent = holdpixel;
					//this.varToTest = this.tenantToAdd.price;
					//button.removeChildAt(0);
					//holdpixel.sprite.x = this.game.input.x;
					//holdpixel.sprite.y = this.game.input.y;

				}, this);
				//button.anchor.setTo(0.5,0.5);


				this.shopButtonsList.push(button);
				break;
		}
	}
};