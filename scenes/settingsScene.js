class SettingsScene extends Scene {
    constructor() {
        super('SettingsScene');
        this.keyChangerChange = {
            target: null,
            name: ''
        };
    }

    awake() {
        super.awake();
        const musicVolumeSlider = new Slider('Music Volume', 15 * GAME_SCALE, 175 * GAME_SCALE);
        musicVolumeSlider.sliderPos = (settings.sound.musicFullVolume * (musicVolumeSlider.size.x-(20*GAME_SCALE)))+(20*GAME_SCALE);
        musicVolumeSlider.onChange = function(percentage) {
            settings.sound.musicVolume = map(floor(percentage*100), 0, 100, 0, 1);
            settings.sound.musicFullVolume = percentage;
            UpdateMusicVolume();
            SaveSettings();
        }

        const soundsVolumeSlider = new Slider('Effects Volume', 15 * GAME_SCALE, 250 * GAME_SCALE);
        soundsVolumeSlider.sliderPos = (settings.sound.soundsFullVolume * (soundsVolumeSlider.size.x-(20*GAME_SCALE)))+(20*GAME_SCALE);
        soundsVolumeSlider.onChange = function(percentage) {
            settings.sound.soundsVolume = map(floor(percentage*100), 0, 100, 0, 1);
            settings.sound.soundsFullVolume = percentage;
            UpdateSoundVolume();
            SaveSettings();
        }

        const screenshakeCheckbox = new Checkbox('Screenshake', 15 * GAME_SCALE, 325 * GAME_SCALE);
        screenshakeCheckbox.value = settings.visuell.screenshake;
        screenshakeCheckbox.onChange = function(value) {
            settings.visuell.screenshake = value;
            SaveSettings();
        }

        const useTouchControlsCheckbox = new Checkbox('Touch Controls', 15 * GAME_SCALE, 400 * GAME_SCALE);
        useTouchControlsCheckbox.value = settings.controls.useTouch;
        if(!IS_TOUCH_SUPPORTED) {
            useTouchControlsCheckbox.value = false;
            useTouchControlsCheckbox.disabled = true;
            useTouchControlsCheckbox.disabledText = 'Touch not supported';
        }
        useTouchControlsCheckbox.onChange = function(value) {
            settings.controls.useTouch = value;
            SaveSettings();
        }

        const resetSettingsButton = new Button(width-80, height-25, 50 * GAME_SCALE, 40 * GAME_SCALE,'Reset');
        resetSettingsButton.action = function () {
            ResetSettings();

            musicVolumeSlider.sliderPos = (settings.sound.musicFullVolume * (musicVolumeSlider.size.x-20))+20;
            soundsVolumeSlider.sliderPos = (settings.sound.soundsFullVolume * (soundsVolumeSlider.size.x-20))+20;
            screenshakeCheckbox.value = settings.visuell.screenshake;

            UpdateSoundVolume();
            UpdateMusicVolume();
            SaveSettings();
        }


        const keyChangerMovementUp = new KeyChanger(width-(300*GAME_SCALE)-(15 * GAME_SCALE), (175 * GAME_SCALE),'Movement: up', 'Key: '+getKeyName(settings.controls.movement.up));
        const keyChangerMovementDown = new KeyChanger(width-(300*GAME_SCALE)-(15 * GAME_SCALE), (175 * GAME_SCALE)+(75*GAME_SCALE),'Movement: down', 'Key: '+getKeyName(settings.controls.movement.down));
        const keyChangerMovementLeft = new KeyChanger(width-(300*GAME_SCALE)-(15 * GAME_SCALE), (175 * GAME_SCALE)+(150*GAME_SCALE),'Movement: left', 'Key: '+getKeyName(settings.controls.movement.left));
        const keyChangerMovementRight = new KeyChanger(width-(300*GAME_SCALE)-(15 * GAME_SCALE), (175 * GAME_SCALE)+(225*GAME_SCALE),'Movement: right', 'Key: '+getKeyName(settings.controls.movement.right));
        const keyChangerControlsFire = new KeyChanger(width-(300*GAME_SCALE)-(15 * GAME_SCALE), (175 * GAME_SCALE)+(300*GAME_SCALE),'Controls: fire', 'Key: '+getKeyName(settings.controls.fire));

        keyChangerMovementUp.onClick = function() {
            currentScene.keyChangerChange.target = keyChangerMovementUp;
            currentScene.keyChangerChange.name = 'movementUP';
            setTimeout(() => {
                currentScene.keyChangerChange.target = null;
                currentScene.keyChangerChange.name = '';
            }, 3000);
        }
        keyChangerMovementDown.onClick = function() {
            currentScene.keyChangerChange.target = keyChangerMovementDown;
            currentScene.keyChangerChange.name = 'movementDOWN';
            setTimeout(() => {
                currentScene.keyChangerChange.target = null;
                currentScene.keyChangerChange.name = '';
            }, 3000);
        }
        keyChangerMovementLeft.onClick = function() {
            currentScene.keyChangerChange.target = keyChangerMovementLeft;
            currentScene.keyChangerChange.name = 'movementLEFT';
            setTimeout(() => {
                currentScene.keyChangerChange.target = null;
                currentScene.keyChangerChange.name = '';
            }, 3000);
        }
        keyChangerMovementRight.onClick = function() {
            currentScene.keyChangerChange.target = keyChangerMovementRight;
            currentScene.keyChangerChange.name = 'movementRIGHT';
            setTimeout(() => {
                currentScene.keyChangerChange.target = null;
                currentScene.keyChangerChange.name = '';
            }, 3000);
        }
        keyChangerControlsFire.onClick = function() {
            currentScene.keyChangerChange.target = keyChangerControlsFire;
            currentScene.keyChangerChange.name = 'controlsFIRE';
            setTimeout(() => {
                currentScene.keyChangerChange.target = null;
                currentScene.keyChangerChange.name = '';
            }, 3000);
        }

        createBackButton();
    }

    update() {
        super.update();
    }

    render() {
        super.render();
        drawTitle(-1, 'settings');

        if(this.keyChangerChange.name != '') {
            fill(color(0, 0, 0, 175));
            rect(0, 0, width, height);

            fill(255);
            textAlign(CENTER,CENTER);
            textSize(75*GAME_SCALE);
            text('Change Key', width/2, height/2 - (25*GAME_SCALE));
            textSize(40*GAME_SCALE);
            text('Press a key to change the key', width/2, height/2 + (25*GAME_SCALE));
        }
    }

    mousePressed() {
        super.mousePressed();
    }

    keyPressed() {
        super.keyPressed();
        if(currentScene.keyChangerChange.name != '') {
            if(key == 'Escape') {
                currentScene.keyChangerChange.target = null;
                currentScene.keyChangerChange.name = '';
                return;
            }

            if(currentScene.keyChangerChange.name == 'movementUP') {
                currentScene.keyChangerChange.target.subtext = 'Key: '+getKeyName(settings.controls.movement.up);
                settings.controls.movement.up = key;
            }
            if(currentScene.keyChangerChange.name == 'movementDOWN') {
                currentScene.keyChangerChange.target.subtext = 'Key: '+getKeyName(settings.controls.movement.down);
                settings.controls.movement.down = key;
            }
            if(currentScene.keyChangerChange.name == 'movementLEFT') {
                currentScene.keyChangerChange.target.subtext = 'Key: '+getKeyName(settings.controls.movement.left);
                settings.controls.movement.left = key;
            }
            if(currentScene.keyChangerChange.name == 'movementRIGHT') {
                currentScene.keyChangerChange.target.subtext = 'Key: '+getKeyName(settings.controls.movement.right);
                settings.controls.movement.right = key;
            }
            if(currentScene.keyChangerChange.name == 'controlsFIRE') {
                currentScene.keyChangerChange.target.subtext = 'Controls: '+getKeyName(settings.controls.fire);
                settings.controls.fire = key;
            }
            currentScene.keyChangerChange.target = null;
            currentScene.keyChangerChange.name = '';
            SaveSettings();
        }
        else if(key == 'Escape') {
            ShowScene('MenuScene');
        }
    }
}