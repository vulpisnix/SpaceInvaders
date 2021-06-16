class MenuScene extends Scene {
    constructor() {
        super('MenuScene');

        this.yourShipBox = {
            width: 350 * GAME_SCALE,
            height: 300 * GAME_SCALE,
            x: width-(0)-(100*GAME_SCALE),
            y: 250 * GAME_SCALE,
            tS: 40 * GAME_SCALE
        }
        this.yourShipBox.x = width-(this.yourShipBox.width)-(100*GAME_SCALE);
    }

    awake() {
        super.awake();

        let bHeight = 50 * GAME_SCALE;
        let bFS = 50 * GAME_SCALE;
        let bX = 10*GAME_SCALE;
        let bY = height - bHeight - 10*GAME_SCALE;
        let bSpacing = 20 * GAME_SCALE;

        const achievementsButton = new Button(bX, bY, bHeight, bFS, 'achievements');
        const settingsButton = new Button(bX, bY -= (bHeight + bSpacing), bHeight, bFS, 'settings');
        const creditsButton = new Button(bX, bY -= (bHeight + bSpacing), bHeight, bFS, 'credits');
        const storeButton = new Button(bX, bY -= (bHeight + bSpacing), bHeight, bFS, 'store');
        const playButton = new Button(bX, bY - (bHeight + bSpacing), bHeight, bFS, 'play');

        playButton.textAlign = 'LEFT';
        storeButton.textAlign = 'LEFT';
        creditsButton.textAlign = 'LEFT';
        settingsButton.textAlign = 'LEFT';
        achievementsButton.textAlign = 'LEFT';

        playButton.action = function() {
            ShowScene('GameScene');
        }
        storeButton.action = function() {
            ShowScene('StoreScene');
        }
        settingsButton.action = function() {
            ShowScene('SettingsScene');
        }
        creditsButton.action = function() {
            ShowScene('CreditsScene');
        }
        achievementsButton.action = function() {
            ShowScene('AchievementsScene');
        }

        player.pos.x = width-(350*GAME_SCALE)-(100*GAME_SCALE)+(350*GAME_SCALE/2)-player.size.x/2;
        player.pos.y = (250 * GAME_SCALE) + (250 * GAME_SCALE/2);
    }

    dataUpdate() {
        super.dataUpdate();
        player.dataUpdate();
    }

    update() {
        super.update();
    }

    render() {
        super.render();

        drawTitle();

        let ySBoxWidth = this.yourShipBox.width;
        let ySBoxHeight = this.yourShipBox.height;
        let ySBoxX = this.yourShipBox.x;
        let ySBoxY = this.yourShipBox.y;
        let ySBoxTS = this.yourShipBox.tS;

        fill(0, 100);
        rect(ySBoxX, ySBoxY, ySBoxWidth, ySBoxHeight);
        player.renderScaled(2);

        let ySBoxHover = AABB(mouseX, mouseY, 1, 1, ySBoxX, ySBoxY, ySBoxWidth, ySBoxHeight);
        if(ySBoxHover) {
            fill(0, 150);
            rect(ySBoxX, ySBoxY, ySBoxWidth, ySBoxHeight);

            fill(255);
            textAlign(CENTER, CENTER);
            textSize(ySBoxTS - (15 * GAME_SCALE));
            text('Click to edit', ySBoxX + ySBoxWidth/2, ySBoxY + ySBoxHeight/2);
        }

        noFill();
        stroke(0);
        strokeWeight(5);
        rect(ySBoxX, ySBoxY, ySBoxWidth, ySBoxHeight);
        noStroke();

        fill(255);
        textSize(ySBoxTS);
        textAlign(CENTER, CENTER);
        text('Your Ship', ySBoxX + ySBoxWidth/2, ySBoxY);
    }

    mousePressed() {
        super.mousePressed();
        let yourShipBoxHover = AABB(mouseX, mouseY, 1, 1, this.yourShipBox.x, this.yourShipBox.y, this.yourShipBox.width, this.yourShipBox.height);
        if(yourShipBoxHover) {
            ShowScene('YourShipScene');
        }
    }
}