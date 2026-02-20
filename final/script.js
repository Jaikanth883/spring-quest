// STAR SKY
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

let stars = [];
for(let i=0;i<120;i++){
    stars.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        r: Math.random()*1.5 + 0.3
    });
}

function drawStars(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

    for(let s of stars){
        s.x += 0.05;   // slow drift
        if(s.x > canvas.width) s.x = 0;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
        ctx.fillStyle = "rgba(255,255,255," + (0.5 + Math.random()*0.5) + ")";
        ctx.fill();
    }
}

// 30 FPS constant update (not paused by Chrome)
setInterval(drawStars, 33);



// LETTER + MUSIC
const envelope = document.getElementById("envelope");
const letter = document.getElementById("letter");
const text = document.getElementById("text");
const music = document.getElementById("bgmusic");

let opened = false;
let i = 0;

const message = `Hey…
If you’re reading this, it means you opened the door and found my letter.
Maybe this is something I should have said in person.
But sometimes feelings are easier to write than to speak — because when I’m around you, my thoughts don’t come in proper sentences.
I don’t know the exact moment it started.
But somewhere after Valentine’s Day… you stayed in my mind longer than you were supposed to.
I genuinely enjoyed that day.
After a long time, you made me smile — not the polite smile I show the world, but a real one. The kind I forgot I still had.
I’m usually a person who keeps everything inside. Even if I like someone, I don’t say it. You already saw that… yet somehow you made me comfortable enough to admit I wanted to date you that day. I don’t normally do things like that. "You make me vulnerable"
You have this funny little smile, your humour, and this light, joyful energy around you… it’s honestly impossible not to notice. It almost feels illegal that one person can hold that much cuteness and warmth and still act like it’s normal.
Somewhere along the way, being around you became the most comfortable place for me.
And I keep thinking about how strange it all is — Satish sir calling us for your project data collection instead of Madhan sir… you walking into the lab that day… three days of random conversations… then meeting again on the 14th. The butterfly effect is real I guess.
Maybe coincidences exist. But sometimes they feel a little too well timed.
We like the same movies, the same kind of music, Lana… the same small things. And I started wondering how a person who was a stranger suddenly became someone I wait to talk to.
There’s a line I once heard:
“It’s never been about who likes you, or who wants you. It's about who's willing to risk it all-To pursue you intentionally, Consistently, And with the courage to choose you every single day.”
I don’t know where this will lead, but I'm willing to risk it all to choose you and I know feelings don’t appear perfectly in a few meetings. So I’m not asking for an answer right away. Take your time. Truly.
But I wanted to be honest with you.
I miss you a little more after every time we meet.
And there hasn’t really been a day I didn’t think about you.
If I ever tried to be Damon, I’d want you to be my Elena.
If I’m Lucifer, I’d want you as my detective.
And if I were Aragorn, walking into impossible battles, I’d still hope my ending is with you, my Arwen.
Somewhere along the way… you stopped being just my friend to me.
I’m starting to fall for you.
And I think… I might be in love with you.
I’ll ask you to open this on March 19th. The next day is the first day of spring March 20 — a season of new beginnings. And maybe… this can be the beginning of something new for us too.`;   // TEMPORARY (we'll replace later)

envelope.addEventListener("click", () => {

    if(opened) return;
    opened = true;

    if(music){
        music.volume = 0.35;
        music.play().catch(()=>{});
    }

    letter.classList.add("open");

    setTimeout(typeWriter, 1500);
});

function typeWriter(){
    if(i < message.length){
        text.innerHTML += message.charAt(i);
        i++;
        setTimeout(typeWriter, 75);
    }
}
