export default class Key {
    properties;
    timestamp = -1;

    constructor() {}

    init(properties) {
        this.properties = properties;
    }
   
    press(timestamp) {
        this.timestamp = timestamp;
        // console.log(this.timestamp);
    }

    isPressed() {
        // console.log("broooo");
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