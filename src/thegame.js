var theGame = function(game){
	
	color = randomColor({hue: "yellow", luminosity: "light"});
	higher = false;
	model = null;
	score = 0;
	dragPosition = null;
	background = null;
	ap = null;
	
	result = "drag a sprite";
	dropzone = null;
	bmd  = null;
	text = null;
	drag_tenant = false;
	city = null;
	player = null;
	mouseWheel = null;

	firstClick = null;
	toScale = 1.0;

	cam_deadzone = new Phaser.Rectangle(50, 50, 1200, 600);
	dragged_tenant = null;
	tempxx = null;
	temyy = null;

	scalable_sprites = null;


};

theGame.prototype = {

	init: function(pl)
	{
		//this.game.kineticScrolling = this.game.plugins.add(Phaser.Plugin.KineticScrolling);

		// carrega o player do outro State
		player = pl;
   	//this.game.world.setBounds(0, 0, 4450, 3750);

	},

	create: function()
	{

		//Changing the world width
		
		

		//  Modify the world and camera bounds
		// this.game.world.setBounds(-1000, -1000, 2000, 2000);

		//this.game.camera.follow(model);

		// this.game.kineticScrolling.start();
		city = this.game.add.tileSprite(0, 0, 1280, 708, 'city_dusk');
		city.animations.add('run');
		city.animations.play('run', 10, true);
		city.fixedToCamera = true;

		this.game.world.setBounds(0, 0, (4 * 445), (5 * 375));


		this.game.camera.setPosition(0, 5 * 375);

		ap = this.game.add.sprite(250, this.game.world.height - 375, "ap");
		//ap.width = 445;
		//ap.height = 375;

		//this.game.world.setBounds(0, 0, 800, 800);
		//model = this.game.add.sprite(ap.x + 500, ap.y, "model");
		//model.anchor.setTo(0.5, 0.5);
		var higherButton = this.game.add.button(150, 100, "options_button", this.clickedHigher, this);
		higherButton.anchor.setTo(0.5, 0.5);

		higherButton.fixedToCamera = true;
/*
		model.inputEnabled = true;
		model.input.enableDrag();

		model.events.onInputOver.add(this.onOver, this);

		model.events.onInputOut.add(this.onOut, this);
		model.events.onDragStart.add(this.onDragStart, this);

		model.events.onDragStop.add(this.onDragStop, this); */

		
		var tenten = new Tenant(0,0, 'SOLDIER',2);
		this.initTenant(tenten);

		scalable_sprites = this.game.add.group();

		scalable_sprites.add(ap);
		scalable_sprites.add(tenten.sprite);
		//scalable_sprites.add(tenten.sprite);
		//scalable_sprites.add(ap);
		//tenten.sprite = this.game.add.sprite( 472, 3510, "model");
		//var apple = new Apple(7);

		//this.game.physics.arcade.enable(model);
		this.game.physics.arcade.enable(ap);


		dragPosition = new Phaser.Point(0, 0);
		color = randomColor(
		{
			hue: "yellow",
			luminosity: "light"
		});
		color = parseInt(color.substr(1), 16);

		bmd = this.game.add.bitmapData(this.game.width, this.game.height);

		//  Black and opaque
		//bmd.fill(0, 0, 0, 1);

		bmd.addToWorld();
		// debugzin
		// oi
		// text = this.game.make.text(0, 0, result, { font: "bold 32px Arial", fill: "#ff0044" });
		//text.anchor.set(0.0);
	
	text = this.game.add.text(30, 180, " Olar", {
        font: "65px Arial",
        fill: "#ff0044",
        align: "center"
    });

    text.setText("startou "  + " ten x,y " + tempxx + "," + tempyy);

  text.fixedToCamera = true;



		mouseWheel = function(event)
		{
			// faz scaling
			text.setText("entrou wheel: " + event.wheelDelta);

			if (event.wheelDelta > 0)
			{
				text.setText(" UP ");

				if (toScale <= 2.1)
					toScale += 0.1;
			}
			else
			{
				text.setText(" Down ");

				if (toScale >= 1.1)
					toScale -= 0.1;
			}



		};

		this.game.input.mouse.mouseWheelCallback = mouseWheel;

		this.game.camera.deadzone = cam_deadzone;
		

	},

	update: function() {

		//
		// move camera only when not moving tenant already
		if (this.game.input.activePointer.isDown && drag_tenant === false)
		{

			if (this.game.origDragPoint)
			{

				//text.setText("mp " + this.game.origDragPoint + " ten x,y " + dragged_tenant.x + "," + dragged_tenant.y);
				// move the camera by the amount the mouse has moved since last update		
				//this.game.camera.x += this.game.origDragPoint.x - this.game.input.activePointer.position.x;
				//this.game.camera.y += this.game.origDragPoint.y - this.game.input.activePointer.position.y;
			}
			// set new drag origin to current position	
			this.game.origDragPoint = this.game.input.activePointer.position.clone();
		}
		else
		{
			if(dragged_tenant !== null)
			{
				var cami = this.game.camera;
				var pointer = this.game.input.activePointer;
				var pointerX = pointer.worldX;
				var pointerY = pointer.worldY;
				var inside = false;
				var ap_visible = false;

				//Phaser.Rectangle.containsPoint(cam_deadzone, this.game.input.activePointer.position);

					inside = cam_deadzone.contains(pointer.position.x, pointer.position.y);
					//ap_visible = cami.view.contains(ap.bottom, ap.right);
					//ap_visible = cami.view.contains(ap.top, ap.left);

				//text.setText("pointer x: " + pointerX + "pointer y:" + pointerY + inside);
				text.setText("mp "  + " ten x,y " + dragged_tenant.x + "," + dragged_tenant.y + "size" + scalable_sprites.length);
				dragged_tenant.x = pointerX;
				dragged_tenant.y = pointerY;

				
					//this.game.camera.focusOnXY(pointerX,pointerY);
					if(inside === false && ap.inCamera)
					{
						//this.game.camera.follow(dragged_tenant, Phaser.Camera.FOLLOW_LOCKON, 0.000001, 0.000001);

						if(cami.view.centerX < pointerX) cami.x+= 20;
				else cami.x--;

				if(cami.view.centerY < pointerY) cami.y+= 20;
				else cami.y--;
					}
					else
					{
						this.game.camera.unfollow();
					}
			}

			var cami = this.game.camera;
				var pointer = this.game.input.activePointer;
				var pointerX = pointer.worldX;
				var pointerY = pointer.worldY;
				var inside = false;
				var ap_visible = false;

				//Phaser.Rectangle.containsPoint(cam_deadzone, this.game.input.activePointer.position);

					inside = cam_deadzone.contains(pointer.position.x, pointer.position.y);
					if(inside === false && ap.inCamera)
					{
						//this.game.camera.follow(dragged_tenant, Phaser.Camera.FOLLOW_LOCKON, 0.000001, 0.000001);

						if(cami.view.centerX < pointerX) cami.x+= 20;
				else cami.x--;

				if(cami.view.centerY < pointerY) cami.y+= 20;
				else cami.y--;
					}

			this.game.origDragPoint = null;
		}

		// scale o ap de acordo com mouseWheel
		//ap.scale.x = toScale;
		//ap.scale.y = toScale;
		
		scalable_sprites.scale.x = toScale;
		scalable_sprites.scale.y = toScale;

	},


initTenant: function(t) //inicia o tenant carregando sprite, pondo nos grupos etc
{
		apwidth = this.game.cache.getImage("ap").width;
		apheight = this.game.cache.getImage("ap").height;
		switch (t.type)
		{

			case 'MODEL':

				sprite_width = this.game.cache.getImage("model").width;
				sprite_height = this.game.cache.getImage("model").height;

				// cada false aumenta o price em 10 e true em 20
				// cada false aumenta o income em 25 e o true 10
				t.behavior.upleft = 'VOID'; // VOID = 0, TRUE = +hp, FALSE = -hp
				t.behavior.up = 'VOID';
				t.behavior.upright = 'VOID';
				t.behavior.right = 'TRUE';
				t.behavior.downright = 'VOID';
				t.behavior.down = 'FALSE';
				t.behavior.downleft = 'VOID';
				t.behavior.left = 'TRUE';

				this.price = 40;
				this.income = 45;
				// msm q ap so que com width e heights do sprite
				//this.sprite = game.add.sprite((room_x * 445) + (445 / 2) - (111 / 2), game.world.height - (room_y * 375) - (24 + 230), "model");
				//this.sprite = game.add.sprite( 472, 3510, "model");
				t.sprite = this.game.add.sprite((t.room_x * apwidth) + (apwidth / 2) - (sprite_height / 2) + 300, this.game.world.height - (t.room_y * apheight) - (24 + sprite_height), "model");
				t.sprite.anchor.setTo(0.5, 0.5);

				t.sprite.inputEnabled = true;

				t.sprite.input.enableDrag();


				t.sprite.events.onInputOver.add(this.onOver, this);

				t.sprite.events.onInputOut.add(this.onOut, this);
				t.sprite.events.onDragStart.add(this.onDragStart, this);

				t.sprite.events.onDragStop.add(this.onDragStop, this);

				this.game.physics.arcade.enable(t);
				

				break;

				case 'SOLDIER':

				sprite_width = this.game.cache.getImage("soldier").width;
				sprite_height = this.game.cache.getImage("soldier").height;

				t.behavior.upleft = 'FALSE'; // VOID = 0, TRUE = +hp, FALSE = -hp
				t.behavior.up = 'FALSE';
				t.behavior.upright = 'FALSE';
				t.behavior.right = 'VOID';
				t.behavior.downright = 'VOID';
				t.behavior.down = 'VOID';
				t.behavior.downleft = 'VOID';
				t.behavior.left = 'VOID';

				this.price = 30;
				this.income = 75;
				// msm q ap so que com width e heights do sprite
				//this.sprite = game.add.sprite((room_x * 445) + (445 / 2) - (111 / 2), game.world.height - (room_y * 375) - (24 + 230), "model");
				//this.sprite = game.add.sprite( 472, 3510, "model");

				
				tempxx = (t.room_x * apwidth) + (apwidth / 2) - (sprite_height / 2) + 300;
				tempyy = this.game.world.height - (t.room_y * apheight) - (24 + sprite_height);
				tempyy = ap.y;

				//text.setText("startou "  + " ten x,y " + tempx + "," + tempy);
				t.sprite = this.game.add.sprite((t.room_x * apwidth) + (apwidth / 2) - (sprite_height / 2) + 300, ap.y , "soldier_sheet");
				
				t.sprite.animations.add('idle');
				t.sprite.animations.play('idle', 5, true);
				t.sprite.anchor.setTo(0.5, 0.5);

				t.sprite.inputEnabled = true;

				t.sprite.input.enableDrag();


				t.sprite.events.onInputOver.add(this.onOver, this);

				t.sprite.events.onInputOut.add(this.onOut, this);
				t.sprite.events.onDragStart.add(this.onDragStart, this);

				t.sprite.events.onDragStop.add(this.onDragStop, this);

				this.game.physics.arcade.enable(t);
				

				break;
		}
},
  onOver: function(sprite, pointer)
 {
    sprite.tint = color;
 },

 onOut: function(sprite, pointer)
 {
    sprite.tint = 0xffffff;
 },

 onDragStart: function(sprite, pointer)
 {

 	// test if the pointer is down over the sprite		
		if (sprite.input.pointerDown(this.game.input.activePointer.id))
		{

			firstClick = this.game.input.activePointer.position;
			drag_tenant = true;

			dragged_tenant = sprite;

			//this.game.camera.focusOnXY(pointer.x, pointer.y);
		}
		else
		{
			//
		}

    dragPosition.set(sprite.x, sprite.y);
    


    text.setText("sprite width: " + this.game.cache.getImage("model").width);

//bmd.draw(text, 10, 420);

 },

 onDragStop: function(sprite, pointer)
 {

    /*
        if (!sprite.overlap(ap))
        {
        	text.setText("entrou dropzone: " + dragPosition.x);
            this.game.add.tween(sprite).to(
            {
                x: ap.x + ap.width /2,
                y: ap.y + ap.height /2
            }, 500, "Back.easeOut", true, 100);
        }*/

        if (!Phaser.Rectangle.containsRect(sprite, ap))
        {
        	//this.camera.follow(sprite);
        	text.setText("entrou dropzone: " + dragPosition.x);
            this.game.add.tween(sprite).to(
            {
                x: ap.x + ap.width /2,
                y: ap.y + ap.height /2
            }, 500, "Back.easeOut", true, 100);
        }


     this.camera.focusOn(sprite);
     drag_tenant = false;
     dragged_tenant = null;
 },

	clickedHigher: function()
	{

		score++;
		this.game.state.start("GameOver", true, false, score);
	},

	render: function()
	{
		//var test = "olgaatgwtwqytwerytewra";
		//game.debug.text(test, 20, 500);

		//camdea = new Phaser.Rectangle(50, 50, 1200, 600);
		this.game.context.fillStyle = 'rgba(255,0,0,0.1)';
    	this.game.context.fillRect( cam_deadzone.x,  cam_deadzone.y,  cam_deadzone.width,  cam_deadzone.height);
	}
};