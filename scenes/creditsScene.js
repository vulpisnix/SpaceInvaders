class CreditsScene extends Scene {
    constructor() {
        super('CreditsScene');
    }

    awake() {
        super.awake();
        createBackButton();
    }

    render() {
        super.render();
        drawTitle(-1, 'credits');

        let highlightColour = color(200, 200, 0);
        let textColour = color(255);

        let xPos = 250 * GAME_SCALE;
        let yPos = height/2- (45 * GAME_SCALE);

        textAlign(CENTER,CENTER);
        textSize(40 * GAME_SCALE);
        fill(highlightColour);
        text('visuell & graphics', xPos, yPos);
        textSize(27 * GAME_SCALE);
        fill(textColour);
        text('felix sandhop', xPos, yPos+ (30 * GAME_SCALE));
        text('and', xPos, yPos+ (60 * GAME_SCALE));
        text('conner bangel', xPos, yPos+ (90 * GAME_SCALE));


        xPos = width/2;

        textAlign(CENTER,CENTER);
        textSize(40 * GAME_SCALE);
        fill(highlightColour);
        text('programming', xPos, yPos);
        textSize(27 * GAME_SCALE);
        fill(textColour);
        text('philipp schott', xPos, yPos+ (30 * GAME_SCALE));


        xPos = width-250 * GAME_SCALE;

        textAlign(CENTER,CENTER);
        textSize(40 * GAME_SCALE);
        fill(highlightColour);
        text('sfx & audio', xPos, yPos);
        textSize(27 * GAME_SCALE);
        fill(textColour);
        text('conner bangel', xPos, yPos+ (30 * GAME_SCALE));
        text('and', xPos, yPos+ (60 * GAME_SCALE));
        text('philipp schott', xPos, yPos+ (90 * GAME_SCALE));



        xPos = width/2;
        yPos += 400 * GAME_SCALE;

        textAlign(CENTER,CENTER);
        textSize(30 * GAME_SCALE);
        fill(textColour);
        text('a CriseStudios & HolyGames production', xPos, yPos);

    }

    keyPressed(key) {
        super.keyPressed();
        if(key == 'Escape') {
            ShowScene('MenuScene');
        }
    }
}