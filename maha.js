const audio = document.getElementById('audio');
const playPauseButton = document.getElementById('play-pause');
const prevTrackButton = document.getElementById('prev-track');
const nextTrackButton = document.getElementById('next-track');
const trackListItems = document.querySelectorAll('.track-list li');

const tracks = [
    "music/song1.mp3",
    "music/song2.mp3",
    "music/song3.mp3",
    "music/song4.mp3",
    "music/song5.mp3",
    "music/song6.mp3",
    "music/song7.mp3"
];

let currentTrackIndex = 0;
let isPlaying = false;

function loadTrack(index) {
    audio.src = tracks[index];
    if (isPlaying) {
        audio.play();
    }
    updateActiveTrack();
}

function updateActiveTrack() {
    trackListItems.forEach((item, index) => {
        item.classList.toggle('active', index === currentTrackIndex);
    });
}

function togglePlayPause() {
    if (isPlaying) {
        audio.pause();
        playPauseButton.querySelector('img').src = 'next/play.jpg';
    } else {
        audio.play();
        playPauseButton.querySelector('img').src = 'next/pause.jpg';
    }
    isPlaying = !isPlaying;
}

playPauseButton.addEventListener('click', togglePlayPause);

prevTrackButton.addEventListener('click', () => {
    currentTrackIndex = currentTrackIndex > 0 ? currentTrackIndex - 1 : tracks.length - 1;
    loadTrack(currentTrackIndex);
});

nextTrackButton.addEventListener('click', () => {
    currentTrackIndex = currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : 0;
    loadTrack(currentTrackIndex);
});

trackListItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        currentTrackIndex = index;
        loadTrack(currentTrackIndex);
        if (!isPlaying) togglePlayPause();
    });
});

audio.addEventListener('ended', () => {
    currentTrackIndex = currentTrackIndex < tracks.length - 1 ? currentTrackIndex + 1 : 0;
    loadTrack(currentTrackIndex);
});

loadTrack(currentTrackIndex);
