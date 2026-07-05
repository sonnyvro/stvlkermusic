// ===============================
// SONNYVRO BUILD 0.2
// ===============================

const title = document.querySelector("header h1");
const body = document.body;

// -------------------------------
// Title Flicker
// -------------------------------

function flickerTitle(){

    const chance = Math.random();

    if(chance < 0.08){

        title.style.opacity = ".45";

        setTimeout(()=>{
            title.style.opacity="1";
        },70);

    }

}

setInterval(flickerTitle,250);

// -------------------------------
// Lightning
// -------------------------------

const flash = document.createElement("div");

flash.style.position="fixed";
flash.style.inset="0";
flash.style.background="white";
flash.style.opacity="0";
flash.style.pointerEvents="none";
flash.style.zIndex="999";

document.body.appendChild(flash);

function lightning(){

    if(Math.random() < .30){

        flash.style.transition="none";
        flash.style.opacity=".18";

        setTimeout(()=>{

            flash.style.transition="opacity .7s";
            flash.style.opacity="0";

        },60);

    }

}

setInterval(lightning,9000);

// -------------------------------
// Button Hover Glow
// -------------------------------

document.querySelectorAll("button").forEach(btn=>{

    btn.addEventListener("mouseenter",()=>{

        btn.style.boxShadow="0 0 25px #ff2a2a";

    });

    btn.addEventListener("mouseleave",()=>{

        btn.style.boxShadow="";

    });

});

// -------------------------------
// Shrine Glow Pulse
// -------------------------------

const shrine = document.getElementById("shrine");

let glow = 18;
let dir = 1;

setInterval(()=>{

    glow += dir;

    if(glow>32) dir=-1;
    if(glow<18) dir=1;

    shrine.style.filter=`drop-shadow(0 0 ${glow}px rgba(255,40,40,.30))`;

},70);
