import Piano from './piano.js';

function init() {
    let p = new Piano();

    p.key(0).init({});
    p.toggle(0, 3);
    p.toggle(0, 6);
    p.toggle(1, 4);
    p.toggle(1, 5);
    console.log(p.getTimeline());
}

window.init = init;