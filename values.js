let MENU = true, GAME = false, SHOP = false, SETTINGS = false, CREDITS = false;
let GAME_STARTED = false, GAME_PAUSE = false, GAME_DEAD = false;
let font;
let GAME_COUNTDOWN = 3;

let playerBullets = [];
let player;

let enemyBullets = [];
let enemys = [];
let enemyStepDown = 0;

let buttons = [];
let animations = [];
let sliders = [];
let checkboxes = [];

let highscore = 0, currentscore = 0;
let bestStage = 0, stage = 0;
let credits = 0, currentcredits = 0;

let settingsOrig = {
    sound: {
        volume: 1,
        fullvolume: 1
    },
    visuell: {
        screenshake: true
    }
}
let settings = JSON.parse(JSON.stringify(settingsOrig));