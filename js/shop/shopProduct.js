function ShopProduct(name = '', price = 0, type = '', category = '', imagePath = '') {
    shopProducts.push(this);
    this.text = name;
    this.category = category;
    this.type = type;
    this.spritePath = imagePath;
    this.price = price;
    this.isBought = false;

    this.buyClickOrSelect = function() {
        if(!this.isBought) {
            if (credits - this.price < 0) return;
            credits -= this.price;
            if (this.category == 'backgrounds') {
                storeBought.backgrounds.push(this.spritePath);
            } else if (this.category == 'shipUpgrades') {
                storeBought.shipUpgrades.push(this.spritePath);
            }
            this.isBought = true;
            SaveStore();
        }
        else {
            if(this.category == 'backgrounds')
                settings.visuell.selectedBackground = this.spritePath;
            SaveSettings();
        }
    }

    this.update = function() {
        if(this.category == 'backgrounds')
            this.isBought = storeBought.backgrounds.includes(this.spritePath);
        else if(this.category == 'shipUpgrades')
            this.isBought = storeBought.shipUpgrades.includes(this.spritePath);
    }

    this.render = function(x,y,w,h) {
        image(getStoreSpriteByName(this.spritePath).sprite, x, y, w, h);
    }
}