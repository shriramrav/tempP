let mod_ctr = 1;
let paused = false;
let playing = false;
let stopped = false;

function toggle() {

    mod_ctr++

    let element = document.getElementById("play");
    element.classList.toggle("play");
    element.classList.toggle("pause");

    if (mod_ctr % 2 == 0) {
        if (!playing) {
            paused = false;
            console.log("paused: " + paused);
            console.log("play: " + playing);
            play();
        } else {
            paused = false;
        }
    } else {
        paused = true;
    }
}


function stop() {
    console.log('sfahs');
    stopped = true;
    paused = false;
}

function play() {

    playing = true;

    try {
        let timeline = JSON.parse(JSON.stringify(piano.getTimeline()));
        let notes = [];
        let min = 0;
        let TIME_SHIFT = timeline[0].timestamp;
        let start_time = undefined;
        let paused_time = 0;
        let prev_elapsed = 0;
    
        let loop = (timestamp) => {
            if (start_time == undefined) {
                start_time = timestamp;
            }
    
            const ELAPSED = timestamp - start_time;
    
            if ((!paused) && (!stopped)) {
                for (let i = min; i < timeline.length; i++ ) {
                    if (TIME_SHIFT + ELAPSED - paused_time >= timeline[i].timestamp) {
                        notes.push({
                            starting_time: ELAPSED,
                            index: timeline[i].note.index,
                            duration: timeline[i].note.duration
                        });
                        piano.toggleKey(timeline[i].note.index, 0, true);
                        min++;
                    } else {
                        break;
                    }
                }
            } else {
                paused_time += ELAPSED - prev_elapsed;
            }
    
            for (let i = 0; i < notes.length; i++) {
                if (ELAPSED  - notes[i].starting_time > notes[i].duration) {
                    piano.toggleKey(notes[i].index, 0, true);
                    notes.splice(i, 1); 
                    if (i <= notes.length) {
                        i--;
                    }
                }
            }
    
            prev_elapsed = ELAPSED;
    
            if ((min != timeline.length) || (notes.length != 0) ) {
                if (!stopped) {
                    requestAnimationFrame(loop);
                } else if (notes.length > 0) {
                    requestAnimationFrame(loop);
                } 
            }
    
        };
    
        requestAnimationFrame(loop);
    } catch (e) {
        console.log("Error: unable to play recording");
        playing = false;
    }
    
    playing = false;



}

window.toggle = toggle;
window.stop = stop;