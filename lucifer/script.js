const dialogue = document.getElementById("dialogue");
const inputArea = document.getElementById("inputArea");
const nextStep = document.getElementById("nextStep");
const finalStep = document.getElementById("finalStep");
const userInput = document.getElementById("userInput");

let attempt = 0;

/* ---------- cinematic typing engine ---------- */

let typingTimer = null;
let isTyping = false;

function typeText(text, callback=null){

    // stop any previous typing
    if(typingTimer){
        clearTimeout(typingTimer);
        typingTimer = null;
    }

    isTyping = true;
    dialogue.innerHTML = "";
    dialogue.style.opacity = 1;

    let i = 0;

    function typing(){

        if(i < text.length){

            const char = text.charAt(i);
            dialogue.innerHTML += char;
            i++;

            let delay = 60;

            if(char === "." || char === "!" || char === "?")
                delay = 500;
            else if(char === ",")
                delay = 280;
            else if(char === "…")
                delay = 700;

            typingTimer = setTimeout(typing, delay);
        }
        else{
            isTyping = false;
            typingTimer = null;

            setTimeout(()=>{
                if(callback) callback();
            },1200); // dramatic pause
        }
    }

    typing();
}

/* ---------- opening conversation ---------- */

setTimeout(()=>{
typeText("Hello, Detective.", ()=>{

    typeText("Lucifer Morningstar rarely entertains visitors… yet you found your way here.", ()=>{

        typeText("Tell me… what is it you truly desire?", ()=>{
            inputArea.classList.remove("hidden");
        });

    });

});
},900);


/* ---------- if she stays silent ---------- */

setTimeout(()=>{
    if(!inputArea.classList.contains("hidden") && !isTyping){
        typeText("You can’t just stare at me forever. Even I charge for that.");
    }
},22000);


/* ---------- response logic ---------- */

const neutralReplies = [
    "Interesting. But you're avoiding the real answer.",
    "Humans always start safely.",
    "You're close… but not honest yet.",
    "Try again. I’m very patient.",
    "You didn’t come this far for coincidence."
];

function processInput(){

    if(isTyping) return;

    const answer = userInput.value.toLowerCase().trim();
    attempt++;

    if(answer === ""){
        typeText("Silence? Now that is suspicious.");
        return;
    }

    if(answer.includes("nothing") || answer.includes("idk")){
        typeText("Everyone desires something. You just haven’t named it yet.");
    }
    else if(answer.includes("happy") || answer.includes("happiness")){
        typeText("Happiness is a side effect, not a desire.");
    }
    else if(answer.includes("love")){
        typeText("Ah… the dangerous one.");
    }
    else if(answer.includes("you")){
        typeText("Careful, Detective. Flattery does work on me.");
    }
    else if(answer.includes("answer")){
        typeText("Answers are overrated. The right question… now that's power.");
    }
    else{
        const reply = neutralReplies[Math.floor(Math.random()*neutralReplies.length)];
        typeText(reply);
    }

    nextStep.classList.remove("hidden");
}


/* ---------- next stage ---------- */

function nextStage(){

    if(isTyping) return;

    nextStep.classList.add("hidden");

    typeText("The question was never your desire…", ()=>{

        typeText("It was whether you would stay long enough to see where this leads.", ()=>{

            typeText("Some meetings are accidents.", ()=>{

                typeText("…some are written.", ()=>{

                    setTimeout(()=>{
                        typeText("I believe you call this… a moment.", ()=>{
                            finalStep.classList.remove("hidden");
                        });
                    },2000);

                });

            });

        });

    });
}


/* ---------- proceed ---------- */

function goTVD(){
    window.location.href="../tvd/index.html";
}
