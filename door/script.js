/* ---------- PAGE LOAD (FIX BACK/FORWARD CACHE) ---------- */

window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
        window.location.reload();
    }
});

/* ---------- DOOR FADE IN ---------- */

window.addEventListener("load", ()=>{
    const fade = document.getElementById("doorFade");
    if(fade){
        setTimeout(()=>{
            fade.style.opacity = 0;
        },200);
    }
});


document.addEventListener("DOMContentLoaded", function(){

const bgm = document.getElementById("bgm");
const enterBtn = document.getElementById("enterBtn");

/* ---------------- MUSIC ---------------- */

let musicStarted=false;

function startMusic(){
    if(!musicStarted){
        musicStarted=true;
        bgm.volume=0.35;
        bgm.play().catch(()=>{});
    }
}

document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);


/* ---------------- STARS ---------------- */

const starContainer = document.getElementById("stars");

for(let i=0;i<80;i++){
    let s=document.createElement("div");
    s.className="star";
    s.style.left=Math.random()*100+"vw";
    s.style.top=Math.random()*100+"vh";
    s.style.animationDuration=(2+Math.random()*5)+"s";
    starContainer.appendChild(s);
}


/* ---------------- FIREFLIES ---------------- */

for(let i=0;i<18;i++){
    let f=document.createElement("div");
    f.className="firefly";
    f.style.left=Math.random()*100+"vw";
    f.style.top=Math.random()*100+"vh";
    f.style.animationDuration=(6+Math.random()*8)+"s";
    f.style.zIndex="2";
    document.getElementById("stars").appendChild(f);
}


/* ---------------- DOOR LOGIC ---------------- */

enterBtn.addEventListener("click", checkAnswer);

function checkAnswer(){

    const input=document.getElementById("answer").value.trim().toLowerCase();
    const msg=document.getElementById("message");
    const light=document.getElementById("openLight");
    const door=document.getElementById("door");
    const sound=document.getElementById("openSound");

    msg.innerText="...";
    msg.style.opacity=1;

    setTimeout(()=>{

        if(input==="mellon"){

            msg.innerText="The doors of Durin open for you...";

            bgm.pause();

            if(sound){
                sound.currentTime=0;
                sound.play().catch(()=>{});
            }

            door.classList.add("awakening");

            setTimeout(()=>{
                light.classList.add("show");
            },2800);

            setTimeout(()=>{
                window.location.replace("../final/index.html");
            },5200);

        }else{
            msg.innerText="Nothing happens...";
        }

    },1000);
}

});
