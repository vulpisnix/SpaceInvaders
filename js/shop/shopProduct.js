function ShopProduct(name = '', price = 0, type = '', category = '', imagePath = '') {
    this.text = name;
    this.category = category;
    this.type = type;
    this.spritePath = imagePath;
    this.price = price;
    this.isBought = false;

    this.render = function(x,y,w,h) {
        image(getStoreSpriteByName(this.spritePath).sprite, x, y, w, h);
    }
}