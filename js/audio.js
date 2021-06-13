function Audio(name, sound) {
    this.name = name;
    this.sound = sound;

    this.play = function(loop = false) {
        if(this.sound != null) {
            if(loop) {
                this.sound.loop();
            }
            this.sound.play();
        }
    }
    this.stop = function() {
        if(this.sound != null)
            this.sound.stop();
    }

    this.isPlaying = function() {
        if(this.sound != null)
            return this.sound.isPlaying();
        return false;
    }
}