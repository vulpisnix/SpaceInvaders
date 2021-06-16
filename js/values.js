let scenes = [], currentScene = null;

let IS_DEVICE_SIZE_OK = false, IS_TOUCH_SUPPORTED = false, IS_MOBILE_DEVICE = false;
let font;
let GAME_SCALE = 1;

let player;
let highscore = 0, bestStage = 0, credits = 0;

let animations = [];
let shopProducts = [];

let storeBought = {
    backgrounds: ['backgrounds/Normal_Background_0'],
    shipUpgrades: []
};

let shakeEffect;
let shakeScreen = false;

let settingsORIG = {
    sound: {
        musicVolume: 0.15,
        musicFullVolume: 0.15,
        soundsVolume: 0.3,
        soundsFullVolume: 0.3
    },
    visuell: {
        screenshake: true,
        selectedBackground: 'backgrounds/Background_0'
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
let settings = JSON.parse(JSON.stringify(settingsORIG));

let shipDataORIG = {
    shipSprite: 'ships/default',
    upgrades: [
        {
            slot: 0,
            unlocked: false,
            upgradeName: ''
        },
        {
            slot: 1,
            unlocked: false,
            upgradeName: ''
        },
        {
            slot: 2,
            unlocked: false,
            upgradeName: ''
        },
        {
            slot: 3,
            unlocked: false,
            upgradeName: ''
        },
        {
            slot: 4,
            unlocked: false,
            upgradeName: ''
        },
        {
            slot: 5,
            unlocked: false,
            upgradeName: ''
        }
    ],
    powerups: [
        {
            slot: 0,
            unlocked: false,
            powerupName: ''
        },
        {
            slot: 1,
            unlocked: false,
            powerupName: ''
        },
        {
            slot: 2,
            unlocked: false,
            powerupName: ''
        }
    ]
};
let shipData = JSON.parse(JSON.stringify(shipDataORIG));

function is_touch_supported() {
    return ('ontouchstart' in window ) ||
        ( navigator.maxTouchPoints > 0 ) ||
        ( navigator.msMaxTouchPoints > 0 );
}

function getShopProductsByCategory(category) {
    let array = [];
    for(let i = shopProducts.length-1; i >= 0; i--) {
        if(shopProducts[i].category == category)
            array.push(shopProducts[i]);
    }

    if(array.length == 0) {
        array.push(new ShopProduct("fallback", "fallback", 'fallbackSprite', 0));
    }

    return array;
}

function ShowScene(sceneName) {
    if(currentScene != null) {
        currentScene.cleanUp();
        currentScene = null;
    }
    for(let i = scenes.length-1; i >= 0; i--) {
        if(scenes[i].name === sceneName) {
            if(scenes[i] != null) {
                currentScene = scenes[i];
                currentScene.cleanUp();
                currentScene.awake();
                return;
            }
        }
    }
    if(currentScene != null) {
        currentScene.cleanUp();
        currentScene = null;
    }
    currentScene = null;
}



function getKeyName(key) {
    switch(key) {
        case ' ':
            return 'space';
            break;
        case 'ArrowUp':
            return 'Arrow Up';
            break;
        case 'ArrowDown':
            return 'Arrow Down';
            break;
        case 'ArrowLeft':
            return 'Arrow Left';
            break;
        case 'ArrowRight':
            return 'Arrow Right';
            break;

        default:
            return key;
            break;
    }
}