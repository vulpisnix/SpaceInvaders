class StoreBackgroundsScene extends Scene {
    constructor() {
        super('StoreBackgroundsScene');
        this.shopPreviews = [];
        this.storeSlideXOffset = 0;
        this.pressedKey = '';
    }

    awake() {
        this.storeSlideXOffset = 0;
        this.shopPreviews = [];
        super.awake();
        createBackButton('StoreScene');

        let backgroundProducts = getShopProductsByCategory('backgrounds');
        for(let i = backgroundProducts.length-1; i >= 0; i--) {
            const bgP = backgroundProducts[i];
            const background = new ShopPreview(bgP.text, bgP, true);
            background.onClick = function () {
                background.product.buyClickOrSelect();
            }
        }
    }

    update() {
        super.update();

        if(this.pressedKey == 'ArrowLeft')
            this.storeScroll(-1, 2);
        if(this.pressedKey == 'ArrowRight')
            this.storeScroll(1, 2);
    }

    render() {
        super.render();
        drawTitle(-1, 'store: backgrounds');
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
    }

    keyPressed() {
        super.keyPressed();
        this.pressedKey = key;
        if(key == 'Escape') {
            ShowScene('StoreScene');
        }
    }
    keyReleased() {
        super.keyReleased();
        this.pressedKey = '';
    }

    mouseWheel(event) {
        super.mouseWheel(event);
        const scroll = constrain(event.delta, -1, 1);
        this.storeScroll(scroll, 5);
    }

    storeScroll(dir, speed) {
        if(dir > 0) {
            const last = this.shopPreviews[0];
            if ((last.pos.x + last.size.x) >= width - (20 * GAME_SCALE))
                this.storeSlideXOffset -= 10 * speed;
        }
        if(dir < 0) {
            const first = this.shopPreviews[this.shopPreviews.length-1];
            if (first.pos.x <= (20 * GAME_SCALE))
                this.storeSlideXOffset += 10 * speed;
        }
    }
}