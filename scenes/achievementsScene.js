class AchievementsScene extends Scene {
    constructor() {
        super('AchievementsScene');
    }

    awake() {
        super.awake();
        createBackButton();
    }

    render() {
        super.render();
        drawTitle(-1, 'achievements');

        textAlign(CENTER, CENTER);
        textSize(40 * GAME_SCALE);
        fill(255, 0, 0);
        text('to be added', width/2, height/2);
    }

    keyPressed() {
        super.keyPressed();
        if(key == 'Escape') {
            ShowScene('MenuScene');
        }
    }
}