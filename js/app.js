// 1. SMOOTH CONTINUOUS RAIN LOGIC
const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');

function resize() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
window.onresize = resize; resize();

let drops = [];
function createDrop() { return { x: Math.random() * canvas.width, y: -10, speed: 2 + Math.random() * 3 }; }

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#ff0000'; 
    
    if (drops.length < 150) drops.push(createDrop());
    
    drops.forEach(d => {
        if (d.y > canvas.height) {
            d.y = -10 - Math.random() * 20; 
            d.x = Math.random() * canvas.width;
        } else {
            d.y += d.speed;
            ctx.fillRect(d.x, d.y, 2, 6);
        }
    });
    requestAnimationFrame(animate);
}
animate();

// 2. AUDIO TERMINAL ENGINE
const audioEngine = new Audio();
const volumeSlider = document.getElementById('vol-slider');
const nowPlayingText = document.getElementById('now-playing');
let currentTrackElement = null;

audioEngine.volume = volumeSlider.value;
volumeSlider.addEventListener('input', (e) => {
    audioEngine.volume = e.target.value;
});

document.querySelectorAll('.track').forEach(track => {
    track.addEventListener('click', function() {
        const src = this.getAttribute('data-src');
        const btn = this.querySelector('.play-btn');
        const name = this.querySelector('.track-name').innerText;

        if (currentTrackElement === this && !audioEngine.paused) {
            audioEngine.pause();
            btn.innerText = '[ PLAY ]';
            nowPlayingText.innerText = '> STATUS: PAUSED';
            this.classList.remove('active');
        } 
        else {
            document.querySelectorAll('.track').forEach(t => {
                t.querySelector('.play-btn').innerText = '[ PLAY ]';
                t.classList.remove('active');
            });

            if (currentTrackElement !== this) {
                audioEngine.src = src;
                currentTrackElement = this;
            }

            audioEngine.play();
            btn.innerText = '[ STOP ]';
            nowPlayingText.innerText = `> PLAYING: ${name}`;
            this.classList.add('active');
        }
    });
});

audioEngine.addEventListener('ended', () => {
    if (currentTrackElement) {
        currentTrackElement.querySelector('.play-btn').innerText = '[ PLAY ]';
        currentTrackElement.classList.remove('active');
        nowPlayingText.innerText = '> STATUS: IDLE';
    }
});

// 3. 3D CAMERA PAN LOGIC
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        if (this.target === "_blank") return;
        e.preventDefault();
        const camera = document.getElementById('camera');
        const dir = this.getAttribute('data-dir');
        const url = this.getAttribute('href');
        if (dir) camera.classList.add(dir);
        setTimeout(() => { window.location.href = url; }, 1200);
    });
});

// 4. WALKING TRANSITION TO DARK HOUSE
const homeBtn = document.querySelector('.home-btn');
if (homeBtn) {
    homeBtn.addEventListener('click', function() {
        const viewport = document.getElementById('viewport');
        const mainStack = document.querySelector('.layout-stack');
        const houseScene = document.getElementById('house-scene');

        // 1. Hide the current stack, show the house
        mainStack.style.opacity = '0';
        houseScene.style.display = 'block';

        // 2. Trigger the walking animation
        viewport.classList.add('walking-mode');

        // 3. Redirect after the walk finishes
        setTimeout(() => {
            window.location.href = 'house-page.html';
        }, 2500);
    });
}
