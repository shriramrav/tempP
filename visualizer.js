import VirtualPiano from './virtualpiano.js';

let visualizer = document.getElementById("visualizer");
let ctx = visualizer.getContext("2d");
let piano = new VirtualPiano();

function init() {
    resize(19, 18);
    redraw();
    piano.anim(ctx);
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
    if (event.data.length > 1) {
        piano.toggleKey(event.data[1] - 21, event.timeStamp);
    }
}

function resize(x, y) {

    visualizer.width = document.body.clientWidth - x;
    visualizer.height = document.body.clientHeight - y;

}

function redraw() {

    let config = {
        WIDTH: Math.floor(visualizer.width / 52),
        HEIGHT: Math.floor(visualizer.height * 0.15),
        X_SHIFT: 6,
        Y_SHIFT: 3
    };

    {
        let temp = Math.floor(config.WIDTH * 0.5);
        temp -= temp % 2;
        config.BLACK_WIDTH = temp;
    }

    visualizer.width = (config.WIDTH * 52) + (config.X_SHIFT * 2) + 1;

    piano.dimentionalize({
        width: visualizer.width,
        height: visualizer.height
    });

    ctx.shadowBlur = 2;
    ctx.shadowColor = "black";
    let black_ctr = 0;
    let white_ctr = 0;

    let result = drawPattern(white_ctr, config, 1, black_ctr);
    white_ctr += result.white_ctr;
    black_ctr += result.black_ctr;

    for (let i = 0; i < 7; i++) {
        for (let j = 2; j <= 3; j++) {
            result = drawPattern(white_ctr, config, j, black_ctr);
            white_ctr += result.white_ctr;
            black_ctr += result.black_ctr;
        }
    }

    drawPattern(white_ctr, config, 0, black_ctr, 1);
}

function drawPattern(loc, config, MAX_BLACK, PREV_BLACK, MAX_VAL = 6) {

    let mod_ctr = 0;
    let black_ctr = 0;
    let white_ctr = 0;

    for (let i = 0; i < MAX_VAL; i++) {

        if ((mod_ctr % 2 == 0) && (mod_ctr != 0) ) {

            i--;
            initKey(
                i + loc,
                white_ctr + loc + PREV_BLACK + black_ctr - 1, 
                config, 
                true
            );
            black_ctr++;

            if (black_ctr == MAX_BLACK) {
                break;
            }

        } else {

            initKey(
                i + loc,
                white_ctr + loc + PREV_BLACK + black_ctr + (i > 0),
                config,
                false
            );

            white_ctr++;

        }
        mod_ctr++;

    }
    return { white_ctr: white_ctr, black_ctr: black_ctr };
} 

function initKey(i, index, config, isBlack) {

    let props;

    if (isBlack == true) {

        ctx.fillStyle = "black";
        props = {
            X: (i * config.WIDTH) + config.X_SHIFT - (config.BLACK_WIDTH / 2),
            Y: visualizer.height - config.HEIGHT - config.Y_SHIFT,
            WIDTH: config.BLACK_WIDTH, 
            HEIGHT: Math.floor((config.HEIGHT - config.Y_SHIFT) * 0.7),
            isBlack: true
        };

    } else {

        ctx.fillStyle = "white";
        props = {
            X: (i * config.WIDTH) + config.X_SHIFT,
            Y: visualizer.height - config.HEIGHT - config.Y_SHIFT,
            WIDTH: config.WIDTH - 1, 
            HEIGHT: config.HEIGHT - config.Y_SHIFT,
            isBlack: false
        };

    }

    ctx.fillRect(
        props.X,
        props.Y,
        props.WIDTH,
        props.HEIGHT
    );
    
    piano.key(index).init(props);
}

window.addEventListener('resize', () => {
    resize(1, 1);
    redraw();
}); 

function failure() {
    alert('Failed to connect to MIDI device, please check if browser is supported');
}

window.init = init;

