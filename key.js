export default class Key {
    properties;
    timestamp = -1;


    constructor() {}

    init(properties) {
        this.properties = properties;
    }
   
    press(timestamp) {

        const INCREMENT = 1;
        const OFFSET = 2;

        this.timestamp = timestamp;
        this.note.X = this.properties.X;
        this.note.WIDTH = this.properties.WIDTH;
        this.note.Y = this.properties.Y - OFFSET;
        this.note.HEIGHT = 0;

        this.note.update = () => {

            if (this.note.Y > 0) {
                this.note.Y = Math.max(0, this.note.Y - INCREMENT);
            } 

            if ((this.isPressed()) && (this.note.Y + this.note.HEIGHT < this.properties.Y - OFFSET) && (this.note.Y + this.note.HEIGHT + INCREMENT <=  this.properties.Y - OFFSET)) {
                this.note.HEIGHT += INCREMENT;
            } else if ((!this.isPressed()) && (this.note.Y == 0) && (this.note.HEIGHT > 0)) {
                this.note.HEIGHT = Math.max(0, this.note.HEIGHT - INCREMENT);
            }
        };



        this.note.isFinished = () => {
            return ((!this.isPressed()) && (this.note.Y == 0) && (this.note.HEIGHT == 0));
        }


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

    getNotes() {
        return this.note;
    }


}