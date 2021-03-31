import Piano from "./piano.js";

let visualizer = document.getElementById("visualizer");
let ctx = visualizer.getContext("2d");
let piano = new Piano();


let init = () => {
    resize(19, 18);
    redraw();
}

window.addEventListener('resize', () => {
    resize(1, 1);
    redraw();
}); 

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

    ctx.shadowBlur = 2;
    ctx.shadowColor = "black";
    let black_ctr = 0;
    let white_ctr = 0;

    let result = drawPattern(white_ctr, config, 1, black_ctr);
    white_ctr += result.white_ctr;
    black_ctr += result.black_ctr;

    for (let i = 0; i < 7; i++) {

        result = drawPattern(white_ctr, config, 2, black_ctr);
        white_ctr += result.white_ctr;
        black_ctr += result.black_ctr;

        result = drawPattern(white_ctr, config, 3, black_ctr);
        white_ctr += result.white_ctr;
        black_ctr += result.black_ctr;

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
            initBlack(i + loc, white_ctr - 1 + loc + PREV_BLACK + black_ctr, config);
            black_ctr++;

            if (black_ctr == MAX_BLACK) {
                break;
            }
        } else {

            initWhite(i + loc, white_ctr + loc + PREV_BLACK + black_ctr + (i > 0), config);
            white_ctr++;
        }
        mod_ctr++;

    }
    return { white_ctr: white_ctr, black_ctr: black_ctr };
} 

function initWhite(i, index, config) {
    ctx.fillStyle = "white";
    let props = {
        X: (i * config.WIDTH) + config.X_SHIFT,
        Y: visualizer.height - config.HEIGHT - config.Y_SHIFT,
        WIDTH: config.WIDTH - 1, 
        HEIGHT: config.HEIGHT - config.Y_SHIFT,
        isBlack: false
    };

    ctx.fillRect(
        props.X,
        props.Y,
        props.WIDTH,
        props.HEIGHT
    );
    
}

function initBlack(i, index, config) {
    ctx.fillStyle = "black";
    ctx.fillRect(
        (i * config.WIDTH) + config.X_SHIFT - (config.BLACK_WIDTH / 2),
        visualizer.height - config.HEIGHT - config.Y_SHIFT,
        config.BLACK_WIDTH, 
        Math.floor((config.HEIGHT - config.Y_SHIFT) * 0.7)
    );
}

window.init = init;