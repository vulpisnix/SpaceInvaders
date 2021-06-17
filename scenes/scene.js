class Scene {
    constructor(name) {
        scenes.push(this);
        this.name = name;

        /* --- UI Elements --- */
        this.buttons = [];
        this.uiSliders = [];
        this.checkboxes = [];
        this.keyChangers = [];

        this.animations = [];
    }

    awake() {
        this.cleanUp();
    }
    cleanUp() {
        this.buttons = [];
        this.uiSliders = [];
        this.checkboxes = [];
        this.keyChangers = [];

        this.animations = [];
    }

    dataUpdate() {}
    update() {}
    render() {
        fill(255);
        textAlign(LEFT, CENTER);
        textSize(14 * GAME_SCALE);
        text(round(frameRate()), 10, 15);
    }
    renderAnimations(paused = false) {
        for (let i = this.animations.length - 1; i >= 0; i--) {
            const anim = this.animations[i];
            if (!paused) {
                anim.update();
            }
            anim.render();

            if (anim.isFinished) {
                animations.splice(i, 1);
            }
        }
    }
    renderUI() {
        for (let i = this.buttons.length - 1; i >= 0; i--) {
            const button = this.buttons[i];
            button.update();
            button.render();
        }
        for (let i = this.uiSliders.length - 1; i >= 0; i--) {
            const slider = this.uiSliders[i];
            slider.update();
            slider.render();
        }
        for (let i = this.checkboxes.length - 1; i >= 0; i--) {
            this.checkboxes[i].render();
        }
        for (let i = this.keyChangers.length - 1; i >= 0; i--) {
            this.keyChangers[i].update();
            this.keyChangers[i].render();
        }
    }


    keyPressed(key) {}
    keyReleased(key) {}

    mousePressed() {
        for (let i = this.buttons.length - 1; i >= 0; i--) {
            if(this.buttons[i] != null)
                this.buttons[i].mousePressed();
        }
        for (let i = this.checkboxes.length - 1; i >= 0; i--) {
            this.checkboxes[i].mousePressed();
        }
    }
    mouseReleased() {}

    mouseWheel(event) {}
}