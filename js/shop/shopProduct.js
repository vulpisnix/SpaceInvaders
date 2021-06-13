function ShopProduct(name = '', category = '', imagePath = '', price = 0) {
    this.text = name;
    this.category = category;
    this.spritePath = imagePath;
    this.price = price;
    this.isBought = false;

    this.render = function(x,y,w,h) {
        image(getStoreSpriteByName(this.spritePath).sprite, x, y, w, h);
    }
}