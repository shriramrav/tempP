import Key from './key.js';

export default class Piano {
    keys = [];
    timestamps = [];
    events = new Map();

    constructor() {
        for (let i = 0; i < 88; i++) {
            this.keys.push(new Key());
        }
    }

    key(index) {
        return this.keys[index];
    }

    toggle(index, timestamp) {
        if (this.keys[index].isPressed()) {
            // console.log("hello");
            let note = this.keys[index].release(timestamp);
            this.events.get(note.start_time.toString()).duration = note.duration;
        } else {
            this.events.set(timestamp.toString(), {
                index: index
            });
            this.timestamps.push(timestamp);
            this.keys[index].press(timestamp);
        }
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