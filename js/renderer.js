function renderMenu_Main() {
  drawTitle();
}

function renderMenu_Store() {
  drawTitle();
  fill(255);
  textAlign(CENTER,CENTER);
  textSize(50 * GAME_SCALE);
  text('store', width/2, 120 * GAME_SCALE);

  textSize(40 * GAME_SCALE);
  fill(255, 0, 0);
  text('to be added', width/2, height/2);
}

function renderMenu_Settings() {
  drawTitle();
  fill(255);
  textAlign(CENTER,CENTER);
  textSize(50 * GAME_SCALE);
  text('settings', width/2, 120 * GAME_SCALE);
}

function renderMenu_Credits() {
  drawTitle();
  fill(255);
  textAlign(CENTER,CENTER);
  textSize(50 * GAME_SCALE);
  text('credits', width/2, 120 * GAME_SCALE);

  let highlightColour = color(200, 200, 0);
  let textColour = color(255);

  let xPos = 250 * GAME_SCALE;
  let yPos = height/2- (45 * GAME_SCALE);

  textAlign(CENTER,CENTER);
  textSize(40 * GAME_SCALE);
  fill(highlightColour);
  text('visuell & graphics', xPos, yPos);
  textSize(27 * GAME_SCALE);
  fill(textColour);
  text('felix sandhop', xPos, yPos+ (30 * GAME_SCALE));
  text('and', xPos, yPos+ (60 * GAME_SCALE));
  text('conner bangel', xPos, yPos+ (90 * GAME_SCALE));


  xPos = width/2;

  textAlign(CENTER,CENTER);
  textSize(40 * GAME_SCALE);
  fill(highlightColour);
  text('programming', xPos, yPos);
  textSize(27 * GAME_SCALE);
  fill(textColour);
  text('philipp schott', xPos, yPos+ (30 * GAME_SCALE));


  xPos = width-250 * GAME_SCALE;

  textAlign(CENTER,CENTER);
  textSize(40 * GAME_SCALE);
  fill(highlightColour);
  text('sfx & audio', xPos, yPos);
  textSize(27 * GAME_SCALE);
  fill(textColour);
  text('conner bangel', xPos, yPos+ (30 * GAME_SCALE));
  text('and', xPos, yPos+ (60 * GAME_SCALE));
  text('philipp schott', xPos, yPos+ (90 * GAME_SCALE));

}

function renderMenu_Achievements() {
  drawTitle();
  fill(255);
  textAlign(CENTER,CENTER);
  textSize(50 * GAME_SCALE);
  text('achievements', width/2, 120 * GAME_SCALE);

  textSize(40 * GAME_SCALE);
  fill(255, 0, 0);
  text('to be added', width/2, height/2);
}

function renderGame() {
  const GAME_WON = enemys.length == 0 && stage == 4;

  if(GAME_COUNTDOWN >= 0 && !GAME_STARTED && !GAME_DEAD && !GAME_PAUSE) {
      fill(255);
      textAlign(CENTER,CENTER);
    textSize(140 * GAME_SCALE);
      text('Stage '+(stage == 3 ? stage+': BOSS' : stage), width/2, height/2-50);
      textSize(120 * GAME_SCALE);
      if(floor(GAME_COUNTDOWN) < 4) {
        if(floor(GAME_COUNTDOWN) > 0) {
          text(floor(GAME_COUNTDOWN),width/2, height/2+100);
        }
        else {
          text('go',width/2, height/2+100);
        }
      }
      
      GAME_COUNTDOWN -= deltaTime/1000;
      
      if(GAME_COUNTDOWN <= 0) {
        GAME_STARTED = true;
      }
    }

  if(!GAME_PAUSE && !GAME_DEAD && GAME_STARTED) {
    enemyStepDown++;
    if(enemyStepDown >= 300) {
      enemyStepDown = 0;
      for(let i = enemys.length-1; i >= 0; i--) {
        enemys[i].pos.y += (50 * GAME_SCALE);
      }
    }
  }

  for(let i = enemys.length-1; i >= 0; i--) {
    const enemy = enemys[i];
    if(!GAME_PAUSE && !GAME_DEAD && GAME_STARTED) {
      enemy.update();
    }
    enemy.render();

    if((enemy.pos.y+enemy.size) >= height-(150 * GAME_SCALE)) {
      GAME_DEAD = true;
    }

    if(enemy.life <= 0) {
      enemys.splice(i,1);
    } else {    
      for(let j = playerBullets.length-1; j >= 0; j--) {
        const playerBullet = playerBullets[j];

        if(AABB(playerBullet.pos.x, playerBullet.pos.y, playerBullet.size.x, playerBullet.size.y, enemy.pos.x, enemy.pos.y, enemy.size, enemy.size)) {
          enemy.life -= playerBullet.damage;
          playerBullets.splice(j,1);

          createExplosion(playerBullet.pos.x, playerBullet.pos.y);

          if(!GAME_DEAD) {
            currentscore += enemy.score;
            currentcredits += enemy.credits;
            credits += enemy.credits;

            if(currentscore > highscore) {
              highscore = currentscore;
            }
          }
        }
      }
    }
  }

  for(let i = playerBullets.length-1; i >= 0; i--) {
    const bullet = playerBullets[i];
    if(!GAME_PAUSE && GAME_STARTED) {
      bullet.update();
    }
    bullet.render();

    if(bullet.pos.x <= 0 || bullet.pos.x >= width
       || bullet.pos.y <= 0 || bullet.pos.y >= height) {
      playerBullets.splice(i,1);
    }
  }

  for(let i = enemyBullets.length-1; i >= 0; i--) {
    const bullet = enemyBullets[i];
    if(!GAME_PAUSE && GAME_STARTED) {
      bullet.update();
    }
    bullet.render();

    if(bullet.pos.x <= 0 || bullet.pos.x >= width
        || bullet.pos.y <= 0 || bullet.pos.y >= height) {
      enemyBullets.splice(i,1);
    }

    if(AABB(player.pos.x, player.pos.y, player.size.x, player.size.y,
        bullet.pos.x, bullet.pos.y, bullet.size.x, bullet.size.y)) {
      enemyBullets.splice(i,1);

      createExplosion(player.pos.x + player.size/2,
          player.pos.y + player.size/2);
      if(!GAME_DEAD) {
        backgroundToDrawName = 'background_dead';
      }
      SaveScores();
      GAME_DEAD = true;
    }
  }

  for(let i = enemyBombs.length-1; i >= 0; i--) {
    const bomb = enemyBombs[i];
    if(!GAME_PAUSE && GAME_STARTED) {
      bomb.update();
    }
    bomb.render();

    if(bomb.pos.x <= 0 || bomb.pos.x >= width || bomb.pos.y <= 0 || bomb.pos.y >= height) {
      enemyBombs.splice(i,1);
    }

    if(AABB(player.pos.x, player.pos.y, player.size.x, player.size.y, bomb.pos.x, bomb.pos.y, bomb.size.x, bomb.size.y)) {
      enemyBombs.splice(i,1);

      createExplosion(bomb.pos.x + bomb.size.x/2,bomb.pos.y + bomb.size.y/2);
      if(!GAME_DEAD) {
        backgroundToDrawName = 'background_dead';
      }
      SaveScores();
      GAME_DEAD = true;
    }
  }

  player.render();
  player.dataUpdate();
  if(!GAME_PAUSE && GAME_STARTED && !GAME_DEAD && !GAME_WON) {
    player.update();
    player.renderHUD();
  }

  if(GAME_PAUSE && !GAME_DEAD) {
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
    text('Best Stage: '+(stage == 3 ? stage+' (BOSS)' : stage), width/2-(400 * GAME_SCALE), height/2-(150 * GAME_SCALE));
    text('Stage: '+(stage == 3 ? stage+' (BOSS)' : stage), width/2-(400 * GAME_SCALE), height/2-(120 * GAME_SCALE));


    textSize(28 * GAME_SCALE);
    textAlign(LEFT,CENTER);
    text('highscore: '+highscore, width/2-(400 * GAME_SCALE), height/2-(60 * GAME_SCALE));
    text('score: '+currentscore, width/2-(400 * GAME_SCALE), height/2-(30 * GAME_SCALE));
    text('total credits: '+credits, width/2-(400 * GAME_SCALE), height/2);
    text('credits: '+currentcredits, width/2-(400 * GAME_SCALE), height/2+(30 * GAME_SCALE));


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
      GAME_PAUSE = false;
      GAME_STARTED = false;
      GAME_COUNTDOWN = 4;
    }
    if(mouseIsPressed && hoverBackToMenuButton) {
      createMenu();
    }
  }

  if(GAME_DEAD) {
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
    text('Best Stage: '+(stage == 3 ? stage+' (BOSS)' : stage), width/2-(200 * GAME_SCALE), height/2-(150 * GAME_SCALE));
    text('Stage: '+(stage == 3 ? stage+' (BOSS)' : stage), width/2-(200 * GAME_SCALE), height/2-(120 * GAME_SCALE));

    fill(255);
    textSize(28 * GAME_SCALE);
    textAlign(LEFT,CENTER);
    text('highscore: '+highscore, width/2-(200 * GAME_SCALE), height/2-(60 * GAME_SCALE));
    text('score: '+currentscore, width/2-(200 * GAME_SCALE), height/2-(30 * GAME_SCALE));
    text('total credits: '+credits, width/2-(200 * GAME_SCALE), height/2);
    text('credits: '+currentcredits, width/2-(200 * GAME_SCALE), height/2+(30 * GAME_SCALE));


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
      createGame();
    }
    if(mouseIsPressed && hoverBackToMenuButton) {
      createMenu();
    }
  }
  
  if(enemys.length == 0 && stage <= 3 && GAME_STARTED && !GAME_NEXT_STAGE && !GAME_WON) {
    GAME_NEXT_STAGE = true;
    GAME_STARTED = false;
    GAME_COUNTDOWN = 4;
    stage++;
    print('NEXT STAGE ('+stage+')');

    if(stage == 1)
      createEnemysStageOne();
    else
    if(stage == 2)
      createEnemysStageTwo();
    else
    if(stage == 3)
      createEnemysStageThree_BOSS();

    GAME_NEXT_STAGE = false;

    if(stage > bestStage) {
      bestStage = stage;
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
    text('score: '+currentscore, width/2-(200 * GAME_SCALE), height/2-(30 * GAME_SCALE));
    text('total credits: '+credits, width/2-(200 * GAME_SCALE), height/2);
    text('credits: '+currentcredits, width/2-(200 * GAME_SCALE), height/2+(30 * GAME_SCALE));


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
      createGame();
    }
    if(mouseIsPressed && hoverBackToMenuButton) {
      createMenu();
    }
  }
}