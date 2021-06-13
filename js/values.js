let IS_DEVICE_SIZE_OK = false, IS_TOUCH_SUPPORTED = false;
let MENU = true, GAME = false, SHOP = false, SETTINGS = false, CREDITS = false, ACHIEVEMENTS = false;
let GAME_STARTED = false, GAME_PAUSE = false, GAME_DEAD = false, GAME_NEXT_STAGE = false;
let font;
let GAME_SCALE = 1;

let GAME_COUNTDOWN = 3;

let playerBullets = [];
let player;

let enemyBullets = [];
let enemyBombs = [];
let enemys = [];
let enemyStepDown = 0;

let buttons = [];
let animations = [];
let sliders = [];
let checkboxes = [];
let keychangers = [];

let highscore = 0, currentscore = 0;
let bestStage = 0, stage = 0;
let credits = 0, currentcredits = 0;

let shakeEffect;
let shakeScreen = false;

let keyChangerChange = '';

let settingsOrig = {
    sound: {
        musicVolume: 0.15,
        musicFullVolume: 0.15,
        soundsVolume: 0.3,
        soundsFullVolume: 0.3
    },
    visuell: {
        screenshake: true
    },
    controls: {
        movement: {
            up: 'w',
            down: 's',
            left: 'a',
            right: 'd'
        },
        fire: ' ',
        useTouch: false
    }
}
let settings = JSON.parse(JSON.stringify(settingsOrig));

function is_touch_supported() {
    return ('ontouchstart' in window ) ||
        ( navigator.maxTouchPoints > 0 ) ||
        ( navigator.msMaxTouchPoints > 0 );
}