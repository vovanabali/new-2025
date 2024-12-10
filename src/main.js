import FirstLevel from "./scenes/firstLevel/FirstLevel.js";
import Preload from "./scenes/Preload.js";
import MenuScene from "./scenes/menu/MenuScene.js";

window.addEventListener('load', function () {

	var game = new Phaser.Game({
		width: 720,
		height: 1280,
		type: Phaser.AUTO,
        backgroundColor: "#242424",
		audio: {
			disableWebAudio: false	
		},
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH
		}
	});

	game.scene.add("Preload", Preload);
	game.scene.add("FirstLevel", FirstLevel);
	game.scene.add("Menu", MenuScene);
	game.scene.add("Boot", Boot, true);
});

class Boot extends Phaser.Scene {

	preload() {
		this.load.pack("pack", "assets/preload-asset-pack.json");
	}

	create() {

		this.scene.start("Preload");
	}
}