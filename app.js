const songs=[
    {
        title:"At My Worst",
        name:"Pink Sweat$",
        source:"At My Worst.mpeg",
        cover:"s1.PNG",
    },
    {
        title:"Chal Wahan Jaate Hain",
        name:"Arijit Singh",
        source: "Chal Wahan Jaate Hain.mpeg",
        cover:"s2.PNG",
    },
    {
        title:"The Nights",
        name:"Avicii",
        source:"The Nights.mpeg",
        cover:"s3.PNG",   
    },
];
const progress = document.getElementById("progress");
const song = document.getElementById("song");
const controlIcon = document.getElementById("controlIcon");
const playPauseButton = document.querySelector(".play-pause-btn");
const forwardButton = document.querySelector(".controls button.forward");
const backwardButton = document.querySelector(".controls button.backward");
const rotatingImage = document.getElementById("rotatingImage");
const songName = document.querySelector(".song-title");
const artistName = document.querySelector(".artist-name");

let rotating = false;
let currentRotation = 0;
let rotationInterval;

function startRotation(){
    if(!rotating){
        rotating = true;
        rotationInterval = setInterval(rotateImage, 50);
    }
}

function pauseRotation(){
    clearInterval(rotationInterval);
    rotating = false;
}

function rotateImage(){
    currentRotation += 1;
    rotatingImage.style.transform = `rotate(${currentRotation}deg)`;
}

let currentSongIndex = 0;

function updateSongInfo(){
    songName.textContent = songs[currentSongIndex].title;
    artistName.textContent = songs[currentSongIndex].name;
    song.src = songs[currentSongIndex].source;
    rotatingImage.src = songs[currentSongIndex].cover;
}

song.addEventListener("loadeddata", function(){

});

song.addEventListener("timeupdate", function(){
    if(!song.paused){
        progress.value = song.currentTime;
    }
});

song.addEventListener("loadedmetadata", function(){
    progress.max = song.duration;
    progress.value = song.currentTime;
});

song.addEventListener("ended", function(){
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSongInfo();
    playPause();
});

function playPause(){
    if (song.paused){
        song.play();
        controlIcon.classList.add("fa-solid", "fa-pause");
        controlIcon.classList.remove("fa-solid", "fa-play");
        startRotation();
    }else{
        song.pause();
        controlIcon.classList.remove("fa-solid", "fa-pause");
        controlIcon.classList.add("fa-solid", "fa-play");
        pauseRotation();
    }
}

playPauseButton.addEventListener("click", playPause);

progress.addEventListener("input", function(){
    song.currentTime = progress.value;
});

progress.addEventListener("change", function(){
    if (song.paused) {
        song.play();
        controlIcon.classList.add("fa-solid", "fa-pause");
        controlIcon.classList.remove("fa-solid", "fa-play");
        startRotation();
    }
});

forwardButton.addEventListener("click", function(){
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    updateSongInfo();
    playPause();
});

backwardButton.addEventListener("click", function(){
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    updateSongInfo();
    playPause();
});

updateSongInfo();
