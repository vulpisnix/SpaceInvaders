
function createPlayerBullet(x,y,dirY) {
  if(GAME_PAUSE || GAME_DEAD) return;  
  playerBullets.push(new Bullet(x,y,10,20,dirY));
}

function createEnemyBullet(x,y,dirY) {
  const bullet = new Bullet(x,y,10,20,dirY);
  bullet.bulletSpeed = 5;
  enemyBullets.push(bullet);
}

function createExplosion(x,y) {
  var sprites = [];
  for(let i = 0; i <= explosionSprites.length-1; i++) {
    sprites.push(getExplosionSpriteByIndex(i));
  }  
  animations.push(new Animation(x-25,y-25,50,50,5,sprites));
}