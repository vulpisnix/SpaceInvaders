function ShipUpgrade(name, imagePath) {
    shipUpgrades.push(this);
    this.name = name;
    this.spritePath = imagePath;

    this.updateData = function() {}

    this.render = function(x,y,w,h) {
        image(getShipUpgradeBySpitePath(this.spritePath).sprite, x,y,w,h);
    }
    this.renderScaled = function(x,y,w,h, scale = 1) {
        image(getShipUpgradeBySpitePath(this.spritePath).sprite, x-(w/scale),y-(h/scale),w*scale,h*scale);
    }

}