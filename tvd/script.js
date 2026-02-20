const textBox = document.getElementById("textBox");
const choiceBox = document.getElementById("choiceBox");
const inputBox = document.getElementById("inputBox");

const bgm = document.getElementById("bgm");
const heart = document.getElementById("heart");

/* =========================
   MUSIC SYSTEM (STABLE)
   ========================= */

let musicStarted = false;

function startMusic(){
    if(!musicStarted){
        musicStarted = true;
        bgm.volume = 0.35;
        bgm.play().catch(()=>{});
    }
}

/* autoplay if coming from lucifer */
window.addEventListener("load", ()=>{
    const permission = sessionStorage.getItem("tvdMusicPermission");
    if(permission === "granted"){
        setTimeout(startMusic, 400);
        sessionStorage.removeItem("tvdMusicPermission");
    }
});

/* fallback first tap */
document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);


/* helper functions */
function show(text, time){
    setTimeout(()=>{
        textBox.innerHTML = text;
        textBox.style.opacity = 1;
    },time);
}

function hide(time){
    setTimeout(()=>{
        textBox.style.opacity = 0;
    },time);
}


/* cinematic intro */
show("Some stories are written by destiny...",1200);
hide(5200);

show("Some... by choice.",6800);
hide(10800);

show("And some... begin with a person you never expected. So what you think about our meeting.",12500);


/* show choices */
setTimeout(()=>{
    choiceBox.classList.remove("hidden");
},16500);


/* choices */
function choice(val){
    choiceBox.classList.add("hidden");
    textBox.style.opacity=0;

    if(!val){
        show("Then this page was not meant for you.",1000);
        hide(5000);
        show("...but you still stayed.",6500);

        setTimeout(()=>{
            textBox.style.opacity=0;
            inputBox.classList.remove("hidden");
        },10000);
    }else{
        inputBox.classList.remove("hidden");
    }
}


/* submit */
function submitAnswer(){

    inputBox.classList.add("hidden");
    textBox.style.opacity=0;

    show("You didn’t need to answer.",1000);
    hide(5000);

    show("Because I already knew.",7000);

    setTimeout(()=>{
        heart.volume=0.6;
        heart.play().catch(()=>{});
    },9000);

    hide(12000);

    show("Every story has a moment...",14000);
    hide(18000);

    show("where you decide whether to walk away...",20000);
    hide(24000);

    show("...or open the door.",26000);


    /* ---------- CINEMATIC TRANSITION ---------- */

    setTimeout(()=>{

        const fade = document.getElementById("fadeScreen");
        fade.classList.add("active");

        /* smooth audio fade out */
        let vol = bgm.volume;
        const audioFade = setInterval(()=>{
            vol -= 0.03;
            if(vol <= 0){
                bgm.pause();
                clearInterval(audioFade);
            }else{
                bgm.volume = vol;
            }
        },60);

        /* RELIABLE redirect */
        setTimeout(()=>{
            window.location.replace("../door/index.html");
        },1200);

    },30000);
}
