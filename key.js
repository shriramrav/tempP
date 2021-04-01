export default class Key {
    properties;
    timestamp = -1;
    note;

    constructor() {}

    init(properties) {
        this.properties = properties;
    }
   
    press(timestamp) {

        const INCREMENT = 1.5;
        const OFFSET = 2;

        this.timestamp = timestamp;

        let note = {};


        note.X = this.properties.X;
        note.WIDTH = this.properties.WIDTH;
        note.Y = this.properties.Y - OFFSET;
        note.HEIGHT = 0;
        note.released = false;
        note.isBlack = this.properties.isBlack;

        note.update = () => {

            if (note.Y > 0) {
                note.Y = Math.max(0, note.Y - INCREMENT);
            } 

            if ((note.Y + note.HEIGHT < this.properties.Y - OFFSET) && (note.Y + note.HEIGHT + INCREMENT <=  this.properties.Y - OFFSET) && (!note.released)) {
                note.HEIGHT += INCREMENT;
            } 
            if (!this.isPressed()) {
                note.released = true;
            }
            
            if ((note.released) && (note.Y == 0) && (note.HEIGHT > 0)) {
                note.HEIGHT = Math.max(0, note.HEIGHT - INCREMENT);
            }
        };


        note.isFinished = () => {
            return ((note.released) && (note.Y == 0) && (note.HEIGHT == 0));
        }

        return note;
    }

    isPressed() {
        return (this.timestamp != -1);
    }

    release(timestamp) {

        let data = {
            start_time: this.timestamp,
            duration: timestamp - this.timestamp
        };
        this.timestamp = -1;

        return data;

    }
}