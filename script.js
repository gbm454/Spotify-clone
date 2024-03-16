console.log("Welcome to Spotify");

//initialize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "warriyo - Mortals (feat. Laura Brehm) [NCS Realease]",
    filePath: "./songs/1.mp3",
    coverPath: "cover/cover1.jpg",
  },
  {
    songName: "Cielo - Huma-huma",
    filePath: "./songs/2.mp3",
    coverPath: "cover/2.jpg",
  },
  {
    songName: "DEAF KEV - Invincible [NCS Release]-320k",
    filePath: "./songs/3.mp3",
    coverPath: "cover/3.jpg",
  },
  {
    songName: "Different Heaven & EH!DE",
    filePath: "./songs/4.mp3",
    coverPath: "cover/4.jpg",
  },
  {
    songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release",
    filePath: "./songs/5.mp3",
    coverPath: "cover/5.jpg",
  },
  { songName: "Rabba", filePath: "./songs/6.mp3", coverPath: "cover/6.jpg" },
  {
    songName: "Sakhiyaan",
    filePath: "./songs/7.mp3",
    coverPath: "cover/7.jpg",
  },
  {
    songName: "Bhula Dena",
    filePath: "./songs/8.mp3",
    coverPath: "cover/8.jpg",
  },
  {
    songName: "Tumhari Kasam",
    filePath: "./songs/9.mp3",
    coverPath: "cover/9.jpg",
  },
  {
    songName: "To The Moon",
    filePath: "./songs/10.mp3",
    coverPath: "cover/1.jpg",
  },
];

songItems.forEach((element, i) => {
  // console.log(element,i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

//audioElement.play();

// handel play/pause click
masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
  }
});
//listen to events
audioElement.addEventListener("timeupdate", () => {
  console.log("timeupdate");
  //update seekbar
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  console.log(progress);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-pause-circle");
      element.classList.add("fa-play-circle");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      const isPlaying = e.target.classList.contains("fa-pause-circle");

      // Toggle play/pause icon
      if (isPlaying) {
        // Pause audio
        audioElement.pause();
        e.target.classList.remove("fa-pause-circle");
        e.target.classList.add("fa-play-circle");
        masterPlay.classList.remove("fa-pause-circle");
        masterPlay.classList.add("fa-play-circle");
      } else {
        // Play audio
        // Reset all other icons to play
        makeAllPlays();

        // Set current icon to pause
        e.target.classList.remove("fa-play-circle");
        e.target.classList.add("fa-pause-circle");

        // Set audio source and metadata
        songIndex = parseInt(e.target.id);
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove("fa-play-circle");
        masterPlay.classList.add("fa-pause-circle");
        gif.style.opacity = 1;
      }
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 9) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 9;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `songs/${songIndex + 1}.mp3`;
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});
