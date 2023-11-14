document.getElementById('start-button').addEventListener('click', function() {
    window.open('gamepage/index.html', '_self');
});

let cartoon = document.getElementById('cartoon');
let runspeed = 0;
var audio = document.getElementById("audio");
    audio.volume = 0.12;

function animateCartoon() {
    runspeed += 0.28;
    
    if (runspeed >= window.innerWidth) {
        runspeed = 0;
    }

    cartoon.style.left = runspeed + 'px';
    requestAnimationFrame(animateCartoon);
}

animateCartoon();