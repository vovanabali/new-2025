
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class MenuScene extends Phaser.Scene {

	constructor() {
		super("MenuScene");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		const background = this.add.image(357, 647, "house_1");
		background.scaleX = 1.2;
		background.scaleY = 1.2;

		// startButtonLayer
		const startButtonLayer = this.add.layer();

		// buttonStartPressed
		const buttonStartPressed = this.add.image(350.6666666666667, 1064.4657389322917, "Button_Blue_3Slides_Pressed");
		startButtonLayer.add(buttonStartPressed);

		// buttonStartIdle
		const buttonStartIdle = this.add.image(350.6666666666667, 1064.4657389322917, "Button_Blue_3Slides");
		startButtonLayer.add(buttonStartIdle);

		// startBtnLabel
		const startBtnLabel = this.add.text(351, 1057, "", {});
		startBtnLabel.setOrigin(0.5, 0.5);
		startBtnLabel.text = "Начать";
		startBtnLabel.setStyle({ "fontFamily": "pixel-anchor-jack_0", "fontSize": "25px" });
		startButtonLayer.add(startBtnLabel);

		// ribbon_Blue_3Slides
		const ribbon_Blue_3Slides = this.add.image(371, 114.57666015625, "Ribbon_Blue_3Slides");
		ribbon_Blue_3Slides.scaleX = 2;
		ribbon_Blue_3Slides.scaleY = 2;

		// text_1
		const text_1 = this.add.text(371, 98, "", {});
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "2025";
		text_1.setStyle({ "fontFamily": "pixel-anchor-jack_0", "fontSize": "60px" });

		this.background = background;
		this.buttonStartPressed = buttonStartPressed;
		this.buttonStartIdle = buttonStartIdle;
		this.startBtnLabel = startBtnLabel;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	background;
	/** @type {Phaser.GameObjects.Image} */
	buttonStartPressed;
	/** @type {Phaser.GameObjects.Image} */
	buttonStartIdle;
	/** @type {Phaser.GameObjects.Text} */
	startBtnLabel;

	/* START-USER-CODE */

	// Write your code here

	preload() {
		this.load.pack("pack", "assets/asset-pack.json");
		this.load.scenePlugin('rexuiplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js', 'rexUI', 'rexUI');
	}

	create() {
		this.editorCreate();	
		this.sound.play('menu', {volume: .05})
		this.createButton2();
	}

  createButton2() {
	var buttons = this.rexUI.add.buttons({
	    orientation: 0,
	    buttons: [
	        this.buttonStartIdle,
	        this.buttonStartPressed,
    	    // ...
    	],
    	expand: false,
    	align: undefined,
    	click: {
    	    mode: 'pointerdown',
    	    clickInterval: 100
    	}
	});

	buttons.hideButton(1);
	buttons.on('button.click', () => {
		this.sound.play('button-click', {
			start: 1,
			config: {volume: .5}
		});
		this.startBtnLabel.y += 5;
		buttons.hideButton(0);
		buttons.showButton(1);

		this.time.delayedCall(200, () => {
			this.scene.start("FirstLevel")
		});
	});
  }

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
