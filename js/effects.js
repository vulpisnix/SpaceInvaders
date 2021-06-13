
function createPlayerBullet(x,y,dirY) {
  if(GAME_PAUSE || GAME_DEAD) return;  
  playerBullets.push(new Bullet(x,y,10 * GAME_SCALE,20 * GAME_SCALE,dirY));
}
function createEnemyBullet(x,y,dirY) {
  const bullet = new Bullet(x,y,10 * GAME_SCALE,20 * GAME_SCALE,dirY);
  bullet.bulletSpeed = 5;
  enemyBullets.push(bullet);
}
function createEnemyBomb(x,y,dirY) {
  const bomb = new Bomb(x,y,20 * GAME_SCALE,20 * GAME_SCALE,dirY);
  bomb.bombSpeed = 5;
  enemyBombs.push(bomb);
}
function createExplosion(x,y) {
  var sprites = [];
  for(let i = 0; i <= explosionSprites.length-1; i++) {
    sprites.push(getExplosionSpriteByIndex(i));
  }  
  animations.push(new Animation(x-(25 * GAME_SCALE),y-(25 * GAME_SCALE),50 * GAME_SCALE,50 * GAME_SCALE,3,sprites));

  screenShake();

  const explosionSound = getSoundByName('Explosion');
  if(explosionSound != null)
    explosionSound.play();
}

function screenShake() {
  if(shakeScreen)
    return;
  shakeScreen = true;
  setTimeout(() => {
    shakeScreen = false;
    shakeEffect.x = 0;
    shakeEffect.y = 0;
  }, 500);
}

function createEnemysStageZero() {
  enemys = [];
  playerBullets = [];
  enemyBullets = [];
  enemyBombs = [];

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
          createEnemyBullet(enemy.pos.x, enemy.pos.y, 1);
        }
      }

      enemys.push(enemy);
      enemyX += 75 * GAME_SCALE;
      if(enemyX >= width-(50 * GAME_SCALE)) {
        right = !right;
        enemyX = 0;
        enemyY += 50 * GAME_SCALE;
      }
    }
  }
}
function createEnemysStageOne() {
  enemys = [];
  playerBullets = [];
  enemyBullets = [];
  enemyBombs = [];

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
          createEnemyBullet(enemy.pos.x, enemy.pos.y, 1);
        }
      }
      else if(rand >= 9) {
        enemy.sprite = enemyBomberSprite;
        enemy.credits = 8;
        enemy.score = 27;

        enemy.bulletCooldown = floor(random(100, 200));
        enemy.bulletCooldownCounter = floor(random(0, enemy.bulletCooldown-1));
        enemy.shoot = function() {
          createEnemyBomb(enemy.pos.x, enemy.pos.y, 1);
        }
      }

      enemys.push(enemy);
      enemyX += 75 * GAME_SCALE;
      if(enemyX >= width-(50 * GAME_SCALE)) {
        right = !right;
        enemyX = 0;
        enemyY += 50 * GAME_SCALE;
      }
    }
  }
}
function createEnemysStageTwo() {
  enemys = [];
  playerBullets = [];
  enemyBullets = [];
  enemyBombs = [];

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
          createEnemyBullet(enemy.pos.x, enemy.pos.y, 1);
        }
      }
      else if(rand >= 9) {
        enemy.sprite = enemyBomberSprite;
        enemy.credits = 8;
        enemy.score = 27;

        enemy.bulletCooldown = floor(random(100, 200));
        enemy.bulletCooldownCounter = floor(random(0, enemy.bulletCooldown-1));
        enemy.shoot = function() {
          createEnemyBomb(enemy.pos.x, enemy.pos.y, 1);
        }
      }

      enemys.push(enemy);
      enemyX += 75 * GAME_SCALE;
      if(enemyX >= width-(50 * GAME_SCALE)) {
        right = !right;
        enemyX = 0;
        enemyY += 50 * GAME_SCALE;
      }
    }
  }
}
function createEnemysStageThree_BOSS() {
  enemys = [];
  playerBullets = [];
  enemyBullets = [];
  enemyBombs = [];

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
          createEnemyBullet(enemy.pos.x, enemy.pos.y, 1);
        }
      }
      else {
        enemy.sprite = enemyBomberSprite;
        enemy.credits = 8;
        enemy.score = 27;

        enemy.bulletCooldown = floor(random(100, 200));
        enemy.bulletCooldownCounter = floor(random(0, enemy.bulletCooldown-1));
        enemy.shoot = function() {
          createEnemyBomb(enemy.pos.x, enemy.pos.y, 1);
        }
      }

      enemys.push(enemy);
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
          createEnemyBullet(enemy.pos.x, enemy.pos.y, 1);
        }
      }
      else {
        enemy.sprite = enemyBomberSprite;
        enemy.credits = 8;
        enemy.score = 27;

        enemy.bulletCooldown = floor(random(100, 200));
        enemy.bulletCooldownCounter = floor(random(0, enemy.bulletCooldown-1));
        enemy.shoot = function() {
          createEnemyBomb(enemy.pos.x, enemy.pos.y, 1);
        }
      }

      enemys.push(enemy);
      enemyX2 += 75 * GAME_SCALE;
      if(i == 4) {
        right2 = !right2;
        enemyX2 = width-(6*(75 * GAME_SCALE));
        enemyY2 += 50 * GAME_SCALE;
      }
    }
  }
}