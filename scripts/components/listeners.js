import components from '../modules/config/components.js'


console.log("from listeners.js");

let mouse_pos = undefined;
let slider_hovered = false;

for (let i = 0; i < components.length; i++) {

    document.getElementById(components[i]).addEventListener("mousedown", (e) => {
        mouse_pos = {
            X: e.clientX,
            Y: e.clientY
        };
    });

    document.getElementById(components[i]).addEventListener("mousemove", (e) => {

        if ((mouse_pos != undefined) && (!slider_hovered)  ) {

            let element = document.getElementById(components[i]);

            let styles = window.getComputedStyle(element);

            element.style.top = (parseInt(styles.getPropertyValue("top").split("px")[0]) - (mouse_pos.Y - e.clientY)).toString() + "px";
            element.style.left = (parseInt(styles.getPropertyValue("left").split("px")[0]) - (mouse_pos.X - e.clientX)).toString() + "px";

            mouse_pos = {
                X: e.clientX,
                Y: e.clientY
            };

        }

    });
}

document.getElementById("slider-obj").addEventListener("mouseenter", e => {
    slider_hovered = true;
});

document.getElementById("slider-obj").addEventListener("mouseleave", e => {
    slider_hovered = false;
});

document.addEventListener("mouseup", (e) => {
    mouse_pos = undefined;
});