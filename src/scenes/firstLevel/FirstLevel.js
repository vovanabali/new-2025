// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

export default class FirstLevel extends Phaser.Scene {

	constructor() {
		super("FirstLevel");

		/* START-USER-CTR-CODE */
        // Write your code here.
        /* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// father
		this.add.image(544, 834, "father");

		// varia
		this.add.image(179, 980, "varia");

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

    // Write your code here

    create() {

        this.editorCreate();
        this.createTextBox(this, 100, 600, {
            wrapWidth: 500,
            fixedHeight: 100,
            fixedWidth: 300
        }, false)
            .start(this.content, 50);
    }


    content = `Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. Games can be compiled to iOS, Android and native apps by using 3rd party tools. You can use JavaScript or TypeScript for development.`;

    createTextBox(scene, x, y, config, isLeftIdndent) {
        var COLOR_PRIMARY = 0x4e342e;
        var COLOR_LIGHT = 0x7b5e57;
        var COLOR_DARK = 0x260e04;

        var GetValue = Phaser.Utils.Objects.GetValue;
        var wrapWidth = GetValue(config, 'wrapWidth', 0);
        var fixedWidth = GetValue(config, 'fixedWidth', 0);
        var fixedHeight = GetValue(config, 'fixedHeight', 0);
        var textBox = scene.rexUI.add.textBox({
            x: x,
            y: y,
            background: this.createSpeechBubbleShape(scene, isLeftIdndent)
                .setFillStyle(COLOR_PRIMARY, 1)
                .setStrokeStyle(2, COLOR_LIGHT, 1),

            icon: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 20, COLOR_DARK),

            // text: getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight),
            text: this.getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight),

            action: scene.add.image(0, 0, 'nextPage').setTint(COLOR_LIGHT).setVisible(false),

            space: {
                left: 10, right: 10, top: 10, bottom: 25,
                icon: 10,
                text: 10,
            }
        })
            .setOrigin(0, 1)
            .layout();

        textBox
            .setInteractive()
            .on('pointerdown', function () {
                var icon = this.getElement('action').setVisible(false);
                this.resetChildVisibleState(icon);
                if (this.isTyping) {
                    this.stop(true);
                } else {
                    this.typeNextPage();
                }
            }, textBox)
            .on('pageend', function () {
                if (this.isLastPage) {
                    return;
                }

                var icon = this.getElement('action').setVisible(true);
                this.resetChildVisibleState(icon);
                icon.y -= 30;
                var tween = scene.tweens.add({
                    targets: icon,
                    y: '+=30', // '+=100'
                    ease: 'Bounce', // 'Cubic', 'Elastic', 'Bounce', 'Back'
                    duration: 500,
                    repeat: 0, // -1: infinity
                    yoyo: false
                });
            }, textBox)
        //.on('type', function () {
        //})

        return textBox;
    }

    getBuiltInText(scene, wrapWidth, fixedWidth, fixedHeight) {
        return scene.add.text(0, 0, '', {
            fontSize: '20px',
            wordWrap: {
                width: wrapWidth
            },
            maxLines: 3
        })
            .setFixedSize(fixedWidth, fixedHeight);
    }

    getBBcodeText(scene, wrapWidth, fixedWidth, fixedHeight) {
        return scene.rexUI.add.BBCodeText(0, 0, '', {
            fixedWidth: fixedWidth,
            fixedHeight: fixedHeight,

            fontSize: '20px',
            wrap: {
                mode: 'word',
                width: wrapWidth
            },
            maxLines: 3
        })
    }

    createSpeechBubbleShape(scene, isLeftIdndent) {
        return scene.rexUI.add.customShapes({
            create: {lines: 1},
            update: function () {
                var radius = 20;
                var indent = 15;

                var left = 0, right = this.width,
                    top = 0, bottom = this.height, boxBottom = bottom - indent;
                this.getShapes()[0]
                    .lineStyle(this.lineWidth, this.strokeColor, this.strokeAlpha)
                    .fillStyle(this.fillColor, this.fillAlpha)
                    // top line, right arc
                    .startAt(left + radius, top).lineTo(right - radius, top).arc(right - radius, top + radius, radius, 270, 360)
                    // right line, bottom arc
                    .lineTo(right, boxBottom - radius).arc(right - radius, boxBottom - radius, radius, 0, 90)

                // bottom indent
                if (isLeftIdndent) {
                    this.getShapes()[0].lineTo(left + 60, boxBottom).lineTo(left + 50, bottom).lineTo(left + 40, boxBottom)
                } else {
                    this.getShapes()[0].lineTo(right - 40, boxBottom).lineTo(right - 50, bottom).lineTo(right - 60, boxBottom)
                }

                this.getShapes()[0]
                 // bottom line, left arc
                    .lineTo(left + radius, boxBottom).arc(left + radius, boxBottom - radius, radius, 90, 180)
                    // left line, top arc
                    .lineTo(left, top + radius).arc(left + radius, top + radius, radius, 180, 270)
                    .close();

            }
        })
    }

    /* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
