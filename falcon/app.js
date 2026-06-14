const textToRead = "The art of war is the best strategy book of all time. It inspired Napoleon, Machiavelli, Mao Tse Tung and many more historical figures. This two thousand five hundred year old book is one of the most important classic Chinese texts, in which, despite the time elapsed, none of its maxims has become outdated, nor is there a single piece of advice that is not useful today. But the work of General Sun Tzu is not only a book of military practice, but a treatise that teaches the supreme strategy of wisely applying the knowledge of human nature in moments of confrontation.".split(" ");

const display = document.getElementById('rsvp-demo');
const btnPlay = document.getElementById('btn-play');
const btnFaster = document.getElementById('btn-faster');
const btnSlower = document.getElementById('btn-slower');
const wpmBadge = document.querySelector('.wpm-badge');
const progressFill = document.querySelector('.progress-fill');

let isPlaying = false;
let wpm = 400;
let currentIndex = 0;
let intervalId = null;

function updateDisplay() {
    if (currentIndex >= textToRead.length) {
        currentIndex = 0;
        pauseReading();
        return;
    }
    
    // Highlight the middle letter roughly
    const word = textToRead[currentIndex];
    const midIndex = Math.floor(word.length / 2);
    const before = word.slice(0, midIndex);
    const mid = word.charAt(midIndex);
    const after = word.slice(midIndex + 1);
    
    display.innerHTML = `${before}<span style="color: var(--accent);">${mid}</span>${after}`;
    
    progressFill.style.width = `${(currentIndex / textToRead.length) * 100}%`;
    currentIndex++;
}

function startReading() {
    if (intervalId) clearInterval(intervalId);
    const msPerWord = 60000 / wpm;
    intervalId = setInterval(updateDisplay, msPerWord);
    isPlaying = true;
    btnPlay.textContent = '⏸';
}

function pauseReading() {
    clearInterval(intervalId);
    isPlaying = false;
    btnPlay.textContent = '▶';
}

btnPlay.addEventListener('click', () => {
    if (isPlaying) {
        pauseReading();
    } else {
        startReading();
    }
});

btnFaster.addEventListener('click', () => {
    if (wpm < 1500) wpm += 50;
    wpmBadge.textContent = `${wpm} WPM`;
    if (isPlaying) startReading();
});

btnSlower.addEventListener('click', () => {
    if (wpm > 100) wpm -= 50;
    wpmBadge.textContent = `${wpm} WPM`;
    if (isPlaying) startReading();
});

// Init
updateDisplay();
