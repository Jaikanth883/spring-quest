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
    else if(answer.includes("freedom") || answer.includes("independence")){
    typeText("Freedom is rarely about leaving… it's about being chosen and still staying.");
}

else if(answer.includes("peace") || answer.includes("calm")){
    typeText("Peace is what people ask for when their heart is tired of pretending.");
}

else if(answer.includes("trust")){
    typeText("Trust… the most expensive thing a human gives. And the easiest to lose.");
}

else if(answer.includes("attention")){
    typeText("Ah, attention. Not from everyone… from one person in particular.");
}

else if(answer.includes("care")){
    typeText("You don’t want care from the world. You want it from someone specific.");
}

else if(answer.includes("understand") || answer.includes("understanding")){
    typeText("To be understood… now that is rarer than love.");
}

else if(answer.includes("someone") || answer.includes("person")){
    typeText("Interesting. So it was never a *what*… it was always a *who*.");
}

else if(answer.includes("future")){
    typeText("The future worries you because you already see someone inside it.");
}

else if(answer.includes("stay") || answer.includes("together")){
    typeText("Humans fear many things. But the strongest fear… is someone leaving.");
}

else if(answer.includes("memory") || answer.includes("memories")){
    typeText("Memories are dangerous. They mean a moment mattered.");
}

else if(answer.includes("forget")){
    typeText("If you truly wanted to forget… you wouldn't be here.");
}

else if(answer.includes("miss") || answer.includes("missing")){
    typeText("You don't miss time. You miss how someone made you feel during it.");
}

else if(answer.includes("friend")){
    typeText("Humans often say 'friend' when they are afraid to say something else.");
}

else if(answer.includes("why")){
    typeText("You're not asking why you came here. You're asking why *them*.");
}

else if(answer.includes("destiny") || answer.includes("fate")){
    typeText("Fate is merely a word people use when they already know their choice.");
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
