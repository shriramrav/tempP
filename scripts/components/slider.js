import Key from "../modules/key.js";

function slid() {
    Key.INCREMENT = Number(document.getElementById("slider-obj").value);
}

window.slid = slid;
