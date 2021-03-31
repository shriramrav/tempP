import Piano from './piano.js';

let piano = new Piano();

function init() {
    navigator.requestMIDIAccess({
        sysex: true
    }).then(success, failure);
}

function success(access) {
    for (let input of access.inputs.values()) {
        input.onmidimessage = onUpdate;
    }
}

function onUpdate(event) {
    // if (event.data.length > 1) {
    //     piano.toggle(event.data[1] - 21, event.timeStamp);
    //     if (piano.getTimelineLength() == 10) {
    //         // console.log(piano.getTimeline());
    //     }
    // }
}

function failure() {
    console.log('Could not access your MIDI devices.');
}

window.init = init;

