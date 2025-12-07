const audio = document.getElementById("audio");
const playBtn = document.querySelector(".play");
const progress = document.getElementById("progress");
const current = document.getElementById("current");

let playing = false;

playBtn.addEventListener("click", () => {
    if (!playing) {
        audio.play();
        playBtn.textContent = "⏸";
    } else {
        audio.pause();
        playBtn.textContent = "▶";
    }
    playing = !playing;
});

audio.addEventListener("timeupdate", () => {
    const pct = (audio.currentTime / audio.duration) * 100;
    progress.value = pct;

    current.textContent = formatTime(audio.currentTime);
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}