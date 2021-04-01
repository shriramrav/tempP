import Key from './key.js';
import colors from './colors.js'

export default class Piano {
    dims = {};
    keys = [];
    timestamps = [];
    notes = [];
    events = new Map();

    constructor() {
        for (let i = 0; i < 88; i++) {
            this.keys.push(new Key());
        }
    }

    dimentionalize(dims) {
        this.dims = dims;
    }

    key(index) {
        return this.keys[index];
    }

    toggleKey(index, timestamp) {

        if (this.keys[index].isPressed()) {

            let note = this.keys[index].release(timestamp);
            this.events.get(note.start_time.toString()).duration = note.duration;

        } else {

            this.events.set(timestamp.toString(), {
                index: index
            });
            this.timestamps.push(timestamp);
            this.notes.push(this.keys[index].press(timestamp));
            this.notes.sort((a, b) => {
                return a.isBlack - b.isBlack;
            });
        }

    }

    anim(ctx) {

        let step = () => {

            ctx.shadowBlur = 0;
            ctx.fillStyle = colors.background;
            ctx.fillRect(0, 0, this.dims.width, this.dims.height - this.keys[0].properties.HEIGHT - 7);
            ctx.shadowBlur = 1;

            for (let i = 0; i < this.notes.length; i++) {

                this.notes[i].update();

                if (this.notes[i].isFinished()) {
                    this.notes.splice(i, 1); 
                    i--;
                } else {
                    ctx.fillStyle = this.notes[i].isBlack ? colors.black_key : colors.white_key ;
                    ctx.fillRect(
                        this.notes[i].X,
                        this.notes[i].Y,
                        this.notes[i].WIDTH,
                        this.notes[i].HEIGHT
                    );
                }

            }

            window.requestAnimationFrame(step);
        }
          
        window.requestAnimationFrame(step);

    } 

    getTimeline() {

        let timeline = [];

        for (let i = 0; i < this.timestamps.length; i++) {
            timeline.push({
                timestamp: this.timestamps[i],
                note: this.events.get(this.timestamps[i].toString())
            });
        }
        return timeline;

    }

    getTimelineLength() {
        return this.timestamps.length;
    }
}