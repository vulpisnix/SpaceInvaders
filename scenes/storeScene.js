class StoreScene extends Scene {
    constructor() {
        super('StoreScene');
        this.shopPreviews = [];
        this.storeSlideXOffset = 0;
    }

    awake() {
        this.shopPreviews = [];
        super.awake();
        createBackButton();

        let shipProducts = getShopProductsByCategory('shipUpgrades');
        let backgroundProducts = getShopProductsByCategory('backgrounds');

        const shopShipUpgrades = new ShopPreview('Ship Upgrades', shipProducts[floor(random(0,shipProducts.length))]);
        const shopBackgrounds = new ShopPreview('Backgrounds', backgroundProducts[floor(random(0,backgroundProducts.length))]);

        shopShipUpgrades.onClick = function() {
            ShowScene('StoreShipUpgradesScene');
        }
        shopBackgrounds.onClick = function() {
            ShowScene('StoreBackgroundsScene');
        }
    }

    render() {
        super.render();
        drawTitle(-1, 'store');

        fill(255);
        textSize(30 * GAME_SCALE);
        text('Credits: '+credits, width-(300*GAME_SCALE), 175*GAME_SCALE);

        let storeXOffset = 50*GAME_SCALE;
        for (let i = this.shopPreviews.length-1; i >= 0; i--) {
            const preview = this.shopPreviews[i];
            if(preview != null) {
                preview.update(storeXOffset + this.storeSlideXOffset, height / 2 - preview.size.y / 2);
                preview.render();
                storeXOffset += preview.size.x + (50 * GAME_SCALE);
            }
        }

        let mouseScrollX = 1;

        if(this.shopPreviews.length > 0) {
            if (mouseIsPressed || pressedKey != '' || mouseScrollX != 0) {
                if (pmouseX < 0 || pressedKey == 'ArrowRight' || mouseScrollX > 0) {
                    const last = this.shopPreviews[0];
                    if ((last.pos.x + last.size.x) >= width - (20 * GAME_SCALE))
                        this.storeSlideXOffset -= 10;
                }
                if (pmouseX > 0 || pressedKey == 'ArrowLeft' || mouseScrollX < 0) {
                    const first = this.shopPreviews[this.shopPreviews.length - 1];
                    if (first.pos.x <= (20 * GAME_SCALE))
                        this.storeSlideXOffset += 10;
                }
            }
        }
    }

    keyPressed() {
        super.keyPressed();
        if(key == 'Escape') {
            ShowScene('MenuScene');
        }
    }

    mouseWheel(event) {
        super.mouseWheel();
        this.storeSlideXOffset += event.deltaY;
    }
}