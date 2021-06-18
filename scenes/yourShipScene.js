class YourShipScene extends Scene {
    constructor() {
        super('YourShipScene');
        this.UPGRADE_VIEW = false;
        this.SELECT_UPGRADE = false;
    }

    awake() {
        super.awake();

        this.UPGRADE_VIEW = false;
        this.SELECT_UPGRADE = false;

        createBackButton();

        player.pos.x = width/2 - player.size.x/2;
        player.pos.y = height/2 - player.size.y/2;
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
        drawTitle(-1, 'Your Ship');

        let ySBoxWidth = 350 * GAME_SCALE;
        let ySBoxHeight = 300 * GAME_SCALE;
        let ySBoxX = width/2 - ySBoxWidth/2;
        let ySBoxY = height/2 - ySBoxHeight/2;
        let ySBoxTS = 40 * GAME_SCALE;

        fill(0, 100);
        rect(ySBoxX, ySBoxY, ySBoxWidth, ySBoxHeight);

        player.renderScaled(2);

        noFill();
        stroke(255);
        strokeWeight(5);
        rect(ySBoxX, ySBoxY, ySBoxWidth, ySBoxHeight);
        noStroke();

        fill(255);
        textSize(ySBoxTS);
        textAlign(CENTER, CENTER);
        text('Your Ship', ySBoxX + ySBoxWidth/2, ySBoxY-(25*GAME_SCALE));


        let upgradeSlotSize = 150*GAME_SCALE;
        let upgradeSlotX = 70*GAME_SCALE;
        let upgradeSlotY = height/3 - upgradeSlotSize/2;


        noStroke();
        fill(255);
        textSize(30*GAME_SCALE);
        textAlign(CENTER, CENTER);
        text('Upgrades', upgradeSlotX+upgradeSlotSize/2, upgradeSlotY - (30*GAME_SCALE));

        for(let i = 0; i < 3; i++) {
            this.drawShipUpgrade(upgradeSlotX, upgradeSlotY, upgradeSlotSize, i);
            upgradeSlotY += upgradeSlotSize + (50 * GAME_SCALE);
        }

        upgradeSlotX = width - upgradeSlotX - upgradeSlotSize;
        upgradeSlotY = height/3 - upgradeSlotSize/2;

        noStroke();
        fill(255);
        textSize(30*GAME_SCALE);
        textAlign(CENTER, CENTER);
        text('Upgrades', upgradeSlotX+upgradeSlotSize/2, upgradeSlotY - (30*GAME_SCALE));

        for(let i = 0; i < 3; i++) {
            this.drawShipUpgrade(upgradeSlotX, upgradeSlotY, upgradeSlotSize, i+3);
            upgradeSlotY += upgradeSlotSize + (50 * GAME_SCALE);
        }


        let powerupRadius = 125*GAME_SCALE;
        let powerupX = width/2 - powerupRadius - powerupRadius/3;
        let powerupY = height - powerupRadius/2 - (50*GAME_SCALE);

        noStroke();
        fill(255);
        textSize(30*GAME_SCALE);
        textAlign(CENTER, CENTER);
        text('Powerups', powerupX + powerupRadius + powerupRadius/3, powerupY - powerupRadius/2 - (30*GAME_SCALE));


        for(let i = 0; i < 3; i++) {
            this.drawShipPowerup(powerupX, powerupY, powerupRadius, i);
            powerupX += powerupRadius + (50 * GAME_SCALE);
        }


        if(this.UPGRADE_VIEW) {
            fill(0, 200);
            rect(0,0,width,height);

            if(this.SELECT_UPGRADE) {

            }
        }
    }


    drawShipUpgrade(x,y,size,index) {
        const shipUpgradeData = shipData.upgrades[index];
        fill(0, 100);
        rect(x, y, size, size);

        noFill();
        stroke(255);
        strokeWeight(5);
        rect(x, y, size, size);
        noStroke();
        let hover = AABB(mouseX, mouseY, 1, 1, x, y, size, size);

        if(this.UPGRADE_VIEW == false) {
            if (shipUpgradeData.unlocked == false) {
                if (!hover) {
                    fill(255);
                    textSize(20 * GAME_SCALE);
                    textAlign(CENTER, CENTER);
                    text('Locked', x + size / 2, y + size / 2);
                } else {
                    let price = 1000;
                    if (index == 1)
                        price = 1200;
                    if (index == 2)
                        price = 1440;
                    if (index == 3)
                        price = 1728;
                    if (index == 4)
                        price = 2074;
                    if (index == 5)
                        price = 2488;

                    noStroke();
                    fill(255);
                    textAlign(CENTER, CENTER);
                    if (credits - price >= 0) {
                        textSize(20 * GAME_SCALE);
                        text('Click to buy', x + size / 2, y + size / 2 - (10 * GAME_SCALE));
                    } else {
                        fill(255, 0, 0);
                        textSize(15 * GAME_SCALE);
                        text('Not enough', x + size / 2, y + size / 2 - (10 * GAME_SCALE));
                    }
                    fill(255);
                    textSize(15 * GAME_SCALE);
                    text(price + ' credits', x + size / 2, y + size / 2 + (10 * GAME_SCALE));

                    if ((credits - price >= 0) && hover && mouseIsPressed) {
                        credits -= price;
                        shipData.upgrades[index].unlocked = true;
                        SaveScores();
                        SaveShip();
                    }
                }
            }
            else {
                if(shipUpgradeData.upgradeName != '') {
                    const upgrade = getStoreSpriteByName(shipUpgradeData.upgradeName);
                    image(upgrade.sprite, x+(5*GAME_SCALE),y+(5*GAME_SCALE),size-(5*GAME_SCALE), size-(5*GAME_SCALE));
                }
                else {
                    fill(255);
                    textSize(18 * GAME_SCALE);
                    text('Click to', x + size / 2, y + size / 2 - (15 * GAME_SCALE));
                    text('select a', x + size / 2, y + size / 2);
                    text('Upgrade', x + size / 2, y + size / 2 + (15 * GAME_SCALE));
                }

                if(hover && mouseIsPressed) {
                    this.UPGRADE_VIEW = true;
                    this.SELECT_UPGRADE = true;
                }
            }
        }
    }
    drawShipPowerup(x,y,r,index) {
        const shipPowerupData = shipData.powerups[index];
        fill(0, 100);
        circle(x, y, r);

        noFill();
        stroke(255);
        strokeWeight(5);
        circle(x, y, r);
        noStroke();
        let hover = collideRectCircle(mouseX, mouseY, 1, 1, x, y, r);

        if(this.UPGRADE_VIEW == false) {
            if (shipPowerupData.unlocked == false) {
                if (!hover) {
                    fill(255);
                    textSize(20 * GAME_SCALE);
                    textAlign(CENTER, CENTER);
                    text('Locked', x, y);
                } else {
                    let price = 1500;
                    if (index == 1)
                        price = 1800;
                    if (index == 2)
                        price = 2160;

                    noStroke();
                    fill(255);
                    textAlign(CENTER, CENTER);
                    if (credits - price >= 0) {
                        textSize(14 * GAME_SCALE);
                        text('Click to buy', x, y - (10 * GAME_SCALE));
                    } else {
                        fill(255, 0, 0);
                        textSize(14 * GAME_SCALE);
                        text('Not enough', x, y - (10 * GAME_SCALE));
                    }
                    fill(255);
                    textSize(13 * GAME_SCALE);
                    text(price + ' credits', x, y + (10 * GAME_SCALE));

                    if ((credits - price >= 0) && hover && mouseIsPressed) {
                        credits -= price;
                        shipData.powerups[index].unlocked = true;
                        SaveScores();
                        SaveShip();
                    }
                }
            }
        }
    }

}