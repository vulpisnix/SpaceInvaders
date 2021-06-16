class GameScene extends Scene {
    constructor() {
        super('GameScene');

        this.enemys = [];
        this.playerBullets = [];
        this.enemyBullets = [];
        this.enemyBombs = [];

        this.enemyStepDown = 0;

        this.currentscore = 0;
        this.currentcredits = 0;
        this.stage = 0;

        this.GAME_COUNTDOWN = 4;
        this.GAME_PAUSE = false;
        this.GAME_DEAD = false;
        this.GAME_STARTED = false;
        this.GAME_NEXT_STAGE = false;
    }

    awake() {
        super.awake();
        this.enemys = [];
        this.playerBullets = [];
        this.enemyBullets = [];
        this.enemyBombs = [];

        this.enemyStepDown = 0;

        this.currentscore = 0;
        this.currentcredits = 0;
        this.stage = 0;

        this.GAME_COUNTDOWN = 4;
        this.GAME_PAUSE = false;
        this.GAME_DEAD = false;
        this.GAME_STARTED = false;
        this.GAME_NEXT_STAGE = false;

        player.pos.x = width/2;
        player.pos.y =  height-player.size.y-(10 * GAME_SCALE);
        player.bulletCooldown = 20;
        player.shipName = 'Level0';
        player.shoot = function() {
            currentScene.createPlayerBullet(player.pos.x+player.size.x/2- (6 * GAME_SCALE), player.pos.y, -1);
        }
        this.createEnemysStageZero();
    }

    render() {
        super.render();
        const GAME_WON = this.enemys.length == 0 && this.stage == 4;

        if(this.GAME_DEAD) {
            image(spriteDeathBackground, 0,0,width,height);
        }

        if(!this.GAME_PAUSE && !this.GAME_DEAD && this.GAME_STARTED) {
            this.enemyStepDown++;
            if(this.enemyStepDown >= 300) {
                this.enemyStepDown = 0;
                for(let i = this.enemys.length-1; i >= 0; i--) {
                    this.enemys[i].pos.y += (50 * GAME_SCALE);
                }
            }
        }

        for(let i = this.enemys.length-1; i >= 0; i--) {
            const enemy = this.enemys[i];
            if(!this.GAME_PAUSE && !this.GAME_DEAD && this.GAME_STARTED) {
                enemy.update();
            }
            enemy.render();

            if((enemy.pos.y+enemy.size) >= height-(150 * GAME_SCALE)) {
                this.GAME_DEAD = true;
            }

            if(enemy.life <= 0) {
                this.enemys.splice(i,1);
            } else {
                for(let j = this.playerBullets.length-1; j >= 0; j--) {
                    const playerBullet = this.playerBullets[j];

                    if(AABB(playerBullet.pos.x, playerBullet.pos.y, playerBullet.size.x, playerBullet.size.y, enemy.pos.x, enemy.pos.y, enemy.size, enemy.size)) {
                        enemy.life -= playerBullet.damage;
                        this.playerBullets.splice(j,1);

                        this.createExplosion(playerBullet.pos.x, playerBullet.pos.y);

                        if(!this.GAME_DEAD) {
                            this.currentscore += enemy.score;
                            this.currentcredits += enemy.credits;
                            credits += enemy.credits;

                            if(this.currentscore > highscore) {
                                highscore = this.currentscore;
                            }
                        }
                    }
                }
            }
        }
        for(let i = this.playerBullets.length-1; i >= 0; i--) {
            const bullet = this.playerBullets[i];
            if(!this.GAME_PAUSE && this.GAME_STARTED) {
                bullet.update();
            }
            bullet.render();

            if(bullet.pos.x <= 0 || bullet.pos.x >= width || bullet.pos.y <= 0 || bullet.pos.y >= height) {
                this.playerBullets.splice(i,1);
            }
        }
        for(let i = this.enemyBullets.length-1; i >= 0; i--) {
            const bullet = this.enemyBullets[i];
            if(!this.GAME_PAUSE && this.GAME_STARTED) {
                bullet.update();
            }
            bullet.render();

            if(bullet.pos.x <= 0 || bullet.pos.x >= width
                || bullet.pos.y <= 0 || bullet.pos.y >= height) {
                this.enemyBullets.splice(i,1);
            }

            if(AABB(player.pos.x, player.pos.y, player.size.x, player.size.y,
                bullet.pos.x, bullet.pos.y, bullet.size.x, bullet.size.y)) {
                this.enemyBullets.splice(i,1);

                this.createExplosion(player.pos.x + player.size/2,player.pos.y + player.size/2);
                SaveScores();
                this.GAME_DEAD = true;
            }
        }
        for(let i = this.enemyBombs.length-1; i >= 0; i--) {
            const bomb = this.enemyBombs[i];
            if(!this.GAME_PAUSE && this.GAME_STARTED) {
                bomb.update();
            }
            bomb.render();

            if(bomb.pos.x <= 0 || bomb.pos.x >= width || bomb.pos.y <= 0 || bomb.pos.y >= height) {
                this.enemyBombs.splice(i,1);
            }

            if(AABB(player.pos.x, player.pos.y, player.size.x, player.size.y, bomb.pos.x, bomb.pos.y, bomb.size.x, bomb.size.y)) {
                this.enemyBombs.splice(i,1);

                this.createExplosion(bomb.pos.x + bomb.size.x/2,bomb.pos.y + bomb.size.y/2);
                SaveScores();
                this.GAME_DEAD = true;
            }
        }

        this.renderAnimations(this.GAME_PAUSE);

        if(player != null) {
            player.render();
        }

        if(this.GAME_COUNTDOWN >= 0 && !this.GAME_STARTED && !this.GAME_DEAD && !this.GAME_PAUSE) {
            fill(255);
            textAlign(CENTER,CENTER);
            textSize(140 * GAME_SCALE);
            text('Stage '+(this.stage == 3 ? this.stage+': BOSS' : this.stage), width/2, height/2-50);
            textSize(120 * GAME_SCALE);
            if(floor(this.GAME_COUNTDOWN) < 4) {
                if(floor(this.GAME_COUNTDOWN) > 0) {
                    text(floor(this.GAME_COUNTDOWN),width/2, height/2+100);
                }
                else {
                    text('go',width/2, height/2+100);
                }
            }

            this.GAME_COUNTDOWN -= deltaTime/1000;

            if(this.GAME_COUNTDOWN <= 0) {
                this.GAME_STARTED = true;
            }
        }

        if(!this.GAME_PAUSE && this.GAME_STARTED && !this.GAME_DEAD && !GAME_WON) {
            player.update();
            player.renderHUD();
        }

        if(this.GAME_PAUSE && !this.GAME_DEAD) {
            fill(color(0,0,0,150));
            rect(0,0,width,height);
            drawTitle();
            fill(255);
            textAlign(CENTER,CENTER);
            textSize(50 * GAME_SCALE);
            text('game paused', width/2, 120 * GAME_SCALE);

            fill(255);
            textSize(30 * GAME_SCALE);
            textAlign(LEFT,CENTER);
            text('Best Stage: '+(bestStage == 3 ? bestStage+' (BOSS)' : bestStage), width/2-(400 * GAME_SCALE), height/2-(150 * GAME_SCALE));
            text('Stage: '+(this.stage == 3 ? this.stage+' (BOSS)' : this.stage), width/2-(400 * GAME_SCALE), height/2-(120 * GAME_SCALE));


            textSize(28 * GAME_SCALE);
            textAlign(LEFT,CENTER);
            text('highscore: '+highscore, width/2-(400 * GAME_SCALE), height/2-(60 * GAME_SCALE));
            text('score: '+this.currentscore, width/2-(400 * GAME_SCALE), height/2-(30 * GAME_SCALE));
            text('total credits: '+credits, width/2-(400 * GAME_SCALE), height/2);
            text('credits: '+this.currentcredits, width/2-(400 * GAME_SCALE), height/2+(30 * GAME_SCALE));


            let bText = 'Resume Game';
            let bWidth = textWidth(bText)+(10*GAME_SCALE);
            let bHeight = 50 * GAME_SCALE;
            let yOffset = 100 * GAME_SCALE;
            let bSpacing = 30 * GAME_SCALE;

            let hoverResumeGameButton = AABB(mouseX, mouseY, 1, 1, width/2 - bWidth/2, height-bHeight-(10*GAME_SCALE) - (bHeight+bSpacing) - yOffset, bWidth, bHeight);
            // Resume Game Button
            fill(hoverResumeGameButton ? 25 : 50);
            rect(width/2 - bWidth/2, height-bHeight-(10*GAME_SCALE) - (bHeight+bSpacing) - yOffset, bWidth, bHeight);
            textAlign(LEFT, CENTER);
            fill(255);
            text(bText, width/2 - bWidth/2 + (5*GAME_SCALE), height-bHeight+(15*GAME_SCALE) - (bHeight+bSpacing) - yOffset);

            // Back to menu Button
            bText = 'Back to menu';
            bWidth = textWidth(bText)+(10*GAME_SCALE);

            let hoverBackToMenuButton = AABB(mouseX, mouseY, 1, 1, width/2 - bWidth/2, height-bHeight-(10*GAME_SCALE) - yOffset, bWidth, bHeight);
            fill(hoverBackToMenuButton ? 25 : 50);
            rect(width/2 - bWidth/2, height-bHeight-(10*GAME_SCALE) - yOffset, bWidth, bHeight);
            textAlign(LEFT, CENTER);
            fill(255);
            text(bText, width/2 - bWidth/2 + (5*GAME_SCALE), height-bHeight+(15*GAME_SCALE) - yOffset);

            if(mouseIsPressed && hoverResumeGameButton) {
                this.GAME_PAUSE = false;
                this.GAME_STARTED = false;
                this.GAME_COUNTDOWN = 4;
            }
            if(mouseIsPressed && hoverBackToMenuButton) {
                ShowScene('MenuScene');
            }
        }

        if(this.GAME_DEAD) {
            fill(color(0,0,0,150));
            rect(0,0,width,height);
            drawTitle();
            fill(255, 0, 0);
            textAlign(CENTER,CENTER);
            textSize(50 * GAME_SCALE);
            text('you died!', width/2, 120 * GAME_SCALE);


            fill(255);
            textSize(30 * GAME_SCALE);
            textAlign(LEFT,CENTER);
            text('Best Stage: '+(bestStage == 3 ? bestStage+' (BOSS)' : bestStage), width/2-(200 * GAME_SCALE), height/2-(150 * GAME_SCALE));
            text('Stage: '+(this.stage == 3 ? this.stage+' (BOSS)' : this.stage), width/2-(200 * GAME_SCALE), height/2-(120 * GAME_SCALE));

            fill(255);
            textSize(28 * GAME_SCALE);
            textAlign(LEFT,CENTER);
            text('highscore: '+highscore, width/2-(200 * GAME_SCALE), height/2-(60 * GAME_SCALE));
            text('score: '+this.currentscore, width/2-(200 * GAME_SCALE), height/2-(30 * GAME_SCALE));
            text('total credits: '+credits, width/2-(200 * GAME_SCALE), height/2);
            text('credits: '+this.currentcredits, width/2-(200 * GAME_SCALE), height/2+(30 * GAME_SCALE));


            let bText = 'Try again';
            let bWidth = textWidth(bText)+(10*GAME_SCALE);
            let bHeight = 50 * GAME_SCALE;
            let yOffset = 100 * GAME_SCALE;
            let bSpacing = 30 * GAME_SCALE;

            let hoverTryAgainButton = AABB(mouseX, mouseY, 1, 1, width/2 - bWidth/2, height-bHeight-(10*GAME_SCALE) - (bHeight+bSpacing) - yOffset, bWidth, bHeight);
            // Try again Button
            fill(hoverTryAgainButton ? 25 : 50);
            rect(width/2 - bWidth/2, height-bHeight-(10*GAME_SCALE) - (bHeight+bSpacing) - yOffset, bWidth, bHeight);
            textAlign(LEFT, CENTER);
            fill(255);
            text(bText, width/2 - bWidth/2 + (5*GAME_SCALE), height-bHeight+(15*GAME_SCALE) - (bHeight+bSpacing) - yOffset);

            // Back to menu Button
            bText = 'Back to menu';
            bWidth = textWidth(bText)+(10*GAME_SCALE);

            let hoverBackToMenuButton = AABB(mouseX, mouseY, 1, 1, width/2 - bWidth/2, height-bHeight-(10*GAME_SCALE) - yOffset, bWidth, bHeight);
            fill(hoverBackToMenuButton ? 25 : 50);
            rect(width/2 - bWidth/2, height-bHeight-(10*GAME_SCALE) - yOffset, bWidth, bHeight);
            textAlign(LEFT, CENTER);
            fill(255);
            text(bText, width/2 - bWidth/2 + (5*GAME_SCALE), height-bHeight+(15*GAME_SCALE) - yOffset);

            if(mouseIsPressed && hoverTryAgainButton) {
                this.awake();
            }
            if(mouseIsPressed && hoverBackToMenuButton) {
                ShowScene('MenuScene');
            }
        }

        if(this.enemys.length == 0 && this.stage <= 3 && this.GAME_STARTED && !this.GAME_NEXT_STAGE && !GAME_WON) {
            this.GAME_NEXT_STAGE = true;
            this.GAME_STARTED = false;
            this.GAME_COUNTDOWN = 4;
            this.stage++;

            if(this.stage == 1)
                this.createEnemysStageOne();
            else
            if(this.stage == 2)
                this.createEnemysStageTwo();
            else
            if(this.stage == 3)
                this.createEnemysStageThree_BOSS();

            this.GAME_NEXT_STAGE = false;

            if(this.stage > bestStage) {
                bestStage = this.stage;
                SaveScores();
            }
        }

        if(GAME_WON) {
            drawTitle();
            fill(255);
            textAlign(CENTER,CENTER);
            textSize(50 * GAME_SCALE);
            text("You've won!", width/2, 120 * GAME_SCALE);

            fill(255);
            textSize(28 * GAME_SCALE);
            textAlign(LEFT,CENTER);
            text('highscore: '+highscore, width/2-(200 * GAME_SCALE), height/2-(60 * GAME_SCALE));
            text('score: '+this.currentscore, width/2-(200 * GAME_SCALE), height/2-(30 * GAME_SCALE));
            text('total credits: '+credits, width/2-(200 * GAME_SCALE), height/2);
            text('credits: '+this.currentcredits, width/2-(200 * GAME_SCALE), height/2+(30 * GAME_SCALE));


            let bText = 'Play again';
            let bWidth = textWidth(bText)+(10*GAME_SCALE);
            let bHeight = 50 * GAME_SCALE;
            let yOffset = 100 * GAME_SCALE;
            let bSpacing = 30 * GAME_SCALE;

            let hoverPlayAgainButton = AABB(mouseX, mouseY, 1, 1, width/2 - bWidth/2, height-bHeight-(10*GAME_SCALE) - (bHeight+bSpacing) - yOffset, bWidth, bHeight);
            // Play again Button
            fill(hoverPlayAgainButton ? 25 : 50);
            rect(width/2 - bWidth/2, height-bHeight-(10*GAME_SCALE) - (bHeight+bSpacing) - yOffset, bWidth, bHeight);
            textAlign(LEFT, CENTER);
            fill(255);
            text(bText, width/2 - bWidth/2 + (5*GAME_SCALE), height-bHeight+(15*GAME_SCALE) - (bHeight+bSpacing) - yOffset);

            // Back to menu Button
            bText = 'Back to menu';
            bWidth = textWidth(bText)+(10*GAME_SCALE);

            let hoverBackToMenuButton = AABB(mouseX, mouseY, 1, 1, width/2 - bWidth/2, height-bHeight-(10*GAME_SCALE) - yOffset, bWidth, bHeight);
            fill(hoverBackToMenuButton ? 25 : 50);
            rect(width/2 - bWidth/2, height-bHeight-(10*GAME_SCALE) - yOffset, bWidth, bHeight);
            textAlign(LEFT, CENTER);
            fill(255);
            text(bText, width/2 - bWidth/2 + (5*GAME_SCALE), height-bHeight+(15*GAME_SCALE) - yOffset);

            if(mouseIsPressed && hoverPlayAgainButton) {
                this.awake();
            }
            if(mouseIsPressed && hoverBackToMenuButton) {
                ShowScene('MenuScene');
            }
        }
    }

    keyPressed() {
        super.keyPressed();
        if(key == 'Escape') {
            this.GAME_PAUSE = !this.GAME_PAUSE;
            this.GAME_STARTED = false;
            this.GAME_COUNTDOWN = 4;
        }
        player.keyPressed(key);
    }

    keyReleased() {
        super.keyReleased();
        player.keyReleased(key);
    }


    createEnemysStageZero() {
        this.enemys = [];
        this.playerBullets = [];
        this.enemyBullets = [];
        this.enemyBombs = [];

        let enemyCols = floor(width / (75 * GAME_SCALE))-1;
        let enemyX = 0;
        let enemyY = 25 * GAME_SCALE;
        let right = false;
        for(let j = 0; j < 5; j++) {
            for(let i = 0; i <= enemyCols; i++) {
                const enemy = new Enemy(enemyX+((75 * GAME_SCALE)/2), enemyY, 50 * GAME_SCALE);
                enemy.moveDir = right ? 1 : -1;
                enemy.sprite = enemyWalkerSprite;

                if(random(0,10) > 9) {
                    enemy.sprite = enemyShooterSprite;
                    enemy.credits = 3;
                    enemy.score = 12;

                    enemy.bulletCooldown = floor(random(80, 140));
                    enemy.bulletCooldownCounter = floor(random(0, enemy.bulletCooldown-1));
                    enemy.shoot = function() {
                        currentScene.createEnemyBullet(enemy.pos.x, enemy.pos.y, 1);
                    }
                }

                this.enemys.push(enemy);
                enemyX += 75 * GAME_SCALE;
                if(enemyX >= width-(50 * GAME_SCALE)) {
                    right = !right;
                    enemyX = 0;
                    enemyY += 50 * GAME_SCALE;
                }
            }
        }
    }
    createEnemysStageOne() {
        this.enemys = [];
        this.playerBullets = [];
        this.enemyBullets = [];
        this.enemyBombs = [];

        let enemyCols = floor(width / (75 * GAME_SCALE))-1;
        let enemyX = 0;
        let enemyY = 25 * GAME_SCALE;
        let right = false;
        for(let j = 0; j < 5; j++) {
            for(let i = 0; i <= enemyCols; i++) {
                const enemy = new Enemy(enemyX+((75 * GAME_SCALE)/2), enemyY, 50 * GAME_SCALE);
                enemy.moveDir = right ? 1 : -1;
                enemy.sprite = enemyWalkerSprite;

                let rand = random(0,10);

                if(rand > 6 && rand < 9) {
                    enemy.sprite = enemyShooterSprite;
                    enemy.credits = 3;
                    enemy.score = 12;

                    enemy.bulletCooldown = floor(random(80, 140));
                    enemy.bulletCooldownCounter = floor(random(0, enemy.bulletCooldown-1));
                    enemy.shoot = function() {
                        currentScene.createEnemyBullet(enemy.pos.x, enemy.pos.y, 1);
                    }
                }
                else if(rand >= 9) {
                    enemy.sprite = enemyBomberSprite;
                    enemy.credits = 8;
                    enemy.score = 27;

                    enemy.bulletCooldown = floor(random(100, 200));
                    enemy.bulletCooldownCounter = floor(random(0, enemy.bulletCooldown-1));
                    enemy.shoot = function() {
                        currentScene.createEnemyBomb(enemy.pos.x, enemy.pos.y, 1);
                    }
                }

                this.enemys.push(enemy);
                enemyX += 75 * GAME_SCALE;
                if(enemyX >= width-(50 * GAME_SCALE)) {
                    right = !right;
                    enemyX = 0;
                    enemyY += 50 * GAME_SCALE;
                }
            }
        }
    }
    createEnemysStageTwo() {
        this.enemys = [];
        this.playerBullets = [];
        this.enemyBullets = [];
        this.enemyBombs = [];

        let enemyCols = floor(width / (75 * GAME_SCALE))-1;
        let enemyX = 0;
        let enemyY = 25 * GAME_SCALE;
        let right = false;
        for(let j = 0; j < 5; j++) {
            for(let i = 0; i <= enemyCols; i++) {
                const enemy = new Enemy(enemyX+((75 * GAME_SCALE)/2), enemyY, 50 * GAME_SCALE);
                enemy.moveDir = right ? 1 : -1;
                enemy.sprite = enemyWalkerSprite;

                let rand = random(0,10);

                if(rand > 6 && rand < 9) {
                    enemy.sprite = enemyShooterSprite;
                    enemy.credits = 3;
                    enemy.score = 12;

                    enemy.bulletCooldown = floor(random(80, 140));
                    enemy.bulletCooldownCounter = floor(random(0, enemy.bulletCooldown-1));
                    enemy.shoot = function() {
                        currentScene.createEnemyBullet(enemy.pos.x, enemy.pos.y, 1);
                    }
                }
                else if(rand >= 9) {
                    enemy.sprite = enemyBomberSprite;
                    enemy.credits = 8;
                    enemy.score = 27;

                    enemy.bulletCooldown = floor(random(100, 200));
                    enemy.bulletCooldownCounter = floor(random(0, enemy.bulletCooldown-1));
                    enemy.shoot = function() {
                        currentScene.createEnemyBomb(enemy.pos.x, enemy.pos.y, 1);
                    }
                }

                this.enemys.push(enemy);
                enemyX += 75 * GAME_SCALE;
                if(enemyX >= width-(50 * GAME_SCALE)) {
                    right = !right;
                    enemyX = 0;
                    enemyY += 50 * GAME_SCALE;
                }
            }
        }
    }
    createEnemysStageThree_BOSS() {
        this.enemys = [];
        this.playerBullets = [];
        this.enemyBullets = [];
        this.enemyBombs = [];

        let enemyX1 = 0, enemyX2 = width-(6*(75 * GAME_SCALE));
        let enemyY1 = 25 * GAME_SCALE, enemyY2 = 25 * GAME_SCALE;
        let right1 = false, right2 = true;
        for(let j = 0; j < 3; j++) {
            for(let i = 0; i < 5; i++) {
                const enemy = new Enemy(enemyX1+((75 * GAME_SCALE)/2), enemyY1, 50 * GAME_SCALE);
                enemy.moveDir = right1 ? 1 : -1;
                let rand = random(0,1);
                if(rand > 0.5) {
                    enemy.sprite = enemyShooterSprite;
                    enemy.credits = 3;
                    enemy.score = 12;

                    enemy.bulletCooldown = floor(random(80, 140));
                    enemy.bulletCooldownCounter = floor(random(0, enemy.bulletCooldown-1));
                    enemy.shoot = function() {
                        currentScene.createEnemyBullet(enemy.pos.x, enemy.pos.y, 1);
                    }
                }
                else {
                    enemy.sprite = enemyBomberSprite;
                    enemy.credits = 8;
                    enemy.score = 27;

                    enemy.bulletCooldown = floor(random(100, 200));
                    enemy.bulletCooldownCounter = floor(random(0, enemy.bulletCooldown-1));
                    enemy.shoot = function() {
                        currentScene.createEnemyBomb(enemy.pos.x, enemy.pos.y, 1);
                    }
                }

                this.enemys.push(enemy);
                enemyX1 += 75 * GAME_SCALE;
                if(i == 4) {
                    right1 = !right1;
                    enemyX1 = 0;
                    enemyY1 += 50 * GAME_SCALE;
                }
            }

            for(let i = 0; i < 5; i++) {
                const enemy = new Enemy(enemyX2+((75 * GAME_SCALE)/2), enemyY2, 50 * GAME_SCALE);
                enemy.moveDir = right2 ? 1 : -1;
                let rand = random(0,1);
                if(rand > 0.5) {
                    enemy.sprite = enemyShooterSprite;
                    enemy.credits = 3;
                    enemy.score = 12;

                    enemy.bulletCooldown = floor(random(80, 140));
                    enemy.bulletCooldownCounter = floor(random(0, enemy.bulletCooldown-1));
                    enemy.shoot = function() {
                        currentScene.createEnemyBullet(enemy.pos.x, enemy.pos.y, 1);
                    }
                }
                else {
                    enemy.sprite = enemyBomberSprite;
                    enemy.credits = 8;
                    enemy.score = 27;

                    enemy.bulletCooldown = floor(random(100, 200));
                    enemy.bulletCooldownCounter = floor(random(0, enemy.bulletCooldown-1));
                    enemy.shoot = function() {
                        currentScene.createEnemyBomb(enemy.pos.x, enemy.pos.y, 1);
                    }
                }

                this.enemys.push(enemy);
                enemyX2 += 75 * GAME_SCALE;
                if(i == 4) {
                    right2 = !right2;
                    enemyX2 = width-(6*(75 * GAME_SCALE));
                    enemyY2 += 50 * GAME_SCALE;
                }
            }
        }
    }

    createPlayerBullet(x,y,dirY) {
        if(this.GAME_PAUSE || this.GAME_DEAD) return;
        this.playerBullets.push(new Bullet(x,y,10 * GAME_SCALE,20 * GAME_SCALE,dirY));
    }
    createEnemyBullet(x,y,dirY) {
        const bullet = new Bullet(x,y,10 * GAME_SCALE,20 * GAME_SCALE,dirY);
        bullet.bulletSpeed = 5;
        this.enemyBullets.push(bullet);
    }
    createEnemyBomb(x,y,dirY) {
        const bomb = new Bomb(x,y,20 * GAME_SCALE,20 * GAME_SCALE,dirY);
        bomb.bombSpeed = 5;
        this.enemyBombs.push(bomb);
    }
    createExplosion(x,y) {
        var sprites = [];
        for(let i = 0; i <= explosionSprites.length-1; i++) {
            sprites.push(getExplosionSpriteByIndex(i));
        }
        this.animations.push(new Animation(x-(25 * GAME_SCALE),y-(25 * GAME_SCALE),50 * GAME_SCALE,50 * GAME_SCALE,3,sprites));

        screenShake();

        const explosionSound = getSoundByName('Explosion');
        if(explosionSound != null)
            explosionSound.play();
    }
}