
function createPlayerBullet(x,y,dirY) {
  if(GAME_PAUSE || GAME_DEAD) return;  
  playerBullets.push(new Bullet(x,y,10 * GAME_SCALE,20 * GAME_SCALE,dirY));
}

function createEnemyBullet(x,y,dirY) {
  const bullet = new Bullet(x,y,10 * GAME_SCALE,20 * GAME_SCALE,dirY);
  bullet.bulletSpeed = 5;
  enemyBullets.push(bullet);
}

function createExplosion(x,y) {
  var sprites = [];
  for(let i = 0; i <= explosionSprites.length-1; i++) {
    sprites.push(getExplosionSpriteByIndex(i));
  }  
  animations.push(new Animation(x-(25 * GAME_SCALE),y-(25 * GAME_SCALE),50 * GAME_SCALE,50 * GAME_SCALE,3,sprites));

  const explosionSound = getSoundByName('Explosion');
  if(explosionSound != null)
    explosionSound.sound.play();
}