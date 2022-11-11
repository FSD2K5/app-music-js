// Declare DomElement
const btnPlay = document.querySelector("#icon-play");
const btnNext = document.querySelector("#icon-next");
const btnPrevious = document.querySelector("#icon-previous");
const btnRandom = document.querySelector("#random");
const audio = document.querySelector(".audio");
const author = document.querySelector(".author");
const inputRange = document.querySelector(".time-song > input");
const avatar = document.querySelector(".thumbnail > img");
const listBtnOpen = document.querySelector(".icon-menu");
const listBtnClose = document.querySelector(".icon-close");
const listMusic = document.querySelector(".wrapper-music");
const repeatBtn = document.querySelector("#icon-repeat");

// Data
const songs = [
    {
        id: 1,
        name: "China Pipa",
        author: "Từ Mộng Viên",
        song: "./assets/music/ChinaPiPa.mp3",
        avatar: "./assets/images/chinapipa-img.jpg",
    },
    {
        id: 2,
        name: "China X",
        author: "Từ Mộng Viên",
        song: "./assets/music/ChinaX.mp3",
        avatar: "./assets/images/chinax-img.jpg",
    },
    {
        id: 3,
        name: "Color X",
        author: "YUAN",
        song: "./assets/music/ColorX.mp3",
        avatar: "./assets/images/colorX-img.jpg",
    },
    {
        id: 4,
        name: "Hanataba",
        author: "Pikasonic",
        song: "./assets/music/Hanataba.mp3",
        avatar: "./assets/images/hanataba-img.jpg",
    },
    {
        id: 5,
        name: "High Score",
        author: "Teminite & Panda Eyes",
        song: "./assets/music/Highscore.mp3",
        avatar: "./assets/images/highscore-img.jpg",
    },
    {
        id: 6,
        name: "Light It Up",
        author: "Robin Hustin x TobiMorrow",
        song: "./assets/music/LightItUp.mp3",
        avatar: "./assets/images/lightitup-img.jpg",
    },
    {
        id: 7,
        name: "Nothing Stopping Me",
        author: "Vicetone",
        song: "./assets/music/NothingStoppingMe.mp3",
        avatar: "./assets/images/nothingstoppingme-img.jpg",
    },
];

// Variable
var isPlay = false;
var currenIndex = 0;

// Animation
const handleCdThumbnail = avatar.animate(
    [
        {
            transform: "rotate(360deg)",
        },
    ],
    {
        duration: 15000,
        iterations: Infinity,
    }
);
const OpenList = listMusic.animate(
    [
        {
            transform: "translateX(100%)",
        },
        {
            transform: "translateX(0)",
        },
    ],
    {
        duration: 500,
        iterations: 1,
    }
);

// Handle Play
const handlePlay = (state) => {
    const iconPlay = btnPlay.querySelector("button");
    if (state) {
        iconPlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
        audio.play();
        handleCdThumbnail.play();
        const state = setInterval(() => {
            if (audio.duration !== audio.currentTime) {
                setTime();
            } else {
                nextSong();
                setInfoSong(currenIndex);
                clearInterval(state);
            }
        }, 1000);
    } else {
        iconPlay.innerHTML = '<i class="fa-solid fa-play"></i>';
        audio.pause();
        handleCdThumbnail.pause();
    }
};
// Handle Action Next/Previous
const nextSong = () => {
    currenIndex++;
    if (currenIndex <= songs.length - 1) {
        setSong(currenIndex);
        handlePlay(true);
    } else {
        currenIndex = 0;
        setSong(currenIndex);
        handlePlay(true);
    }
};
const previousSong = () => {
    currenIndex--;
    if (currenIndex >= 0) {
        setSong(currenIndex);
        handlePlay(true);
    } else {
        currenIndex = songs.length - 1;
        setSong(currenIndex);
        handlePlay(true);
    }
};

// Handle Random Song
const randomSong = (length) => {
    let randomNumber = Math.floor(Math.random() * length);
    currenIndex = randomNumber;
    setSong(currenIndex);
    setInfoSong(currenIndex);
    handlePlay(true);
};

// Handle Set Up Song
const setSong = (index) => {
    let src = songs[index].song;
    audio.setAttribute("src", src);
};
const setInfoSong = (index) => {
    let nameSong = document.querySelector(".name-song");
    let author = document.querySelector(".author");
    nameSong.innerHTML = songs[index].name;
    author.innerHTML = songs[index].author;
    let srcImg = songs[index].avatar;
    avatar.setAttribute("src", srcImg);
};
const formatTime = (sec_num) => {
    let hours = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - hours * 3600) / 60);
    let seconds = Math.floor(sec_num - hours * 3600 - minutes * 60);
    hours = hours < 10 ? (hours > 0 ? "0" + hours : 0) : hours;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return (hours !== 0 ? hours + ":" : "") + minutes + ":" + seconds;
};
const setTime = () => {
    let currentTime = audio.currentTime;
    let durationTime = audio.duration;
    let currentTimeDisplay = document.querySelector(".current-time");
    let timeOfSong = document.querySelector(".time");
    if (durationTime) {
        let percent = Math.floor((currentTime / durationTime) * 100);
        inputRange.value = percent;
        currentTimeDisplay.textContent = formatTime(currentTime);
        timeOfSong.textContent = formatTime(durationTime);
    }
};

// Handle Render List Song
const renderListSongs = (listMusics) => {
    let list = document.querySelector(".list-music");
    let html = listMusics.map((item) => {
        return `
            <li>
                <p class="name-music">${item.name}</p>
                <p class="author-music">${item.author}</p>
            </li>`;
    });
    list.innerHTML = html.join("");
    const musics = document.querySelectorAll(".list-music li");
    musics.forEach((item, index) => {
        item.onclick = () => {
            musics.forEach((ele) => {
                ele.style.color = "var(--bs-gray)";
            });
            currenIndex = index;
            setInfoSong(currenIndex);
            setSong(index);
            handlePlay(true);
            definteSong(musics);
            listMusic.classList.add("hidden");
        };
    });
    definteSong(musics);
};
// Definte song is playing
const definteSong = (list) => {
    list.forEach((ele) => {
        ele.style.color = "var(--bs-gray)";
    });
    list[currenIndex].style.color = "#02c8c8";
};

// Handle Repeat
const handleRepeat = (s) => {
    currenIndex = currenIndex;
    setInfoSong(currenIndex);
    setSong(currenIndex);
    handlePlay(true);
};

// Event
window.addEventListener("load", (e) => {
    e.preventDefault();
    renderListSongs(songs);
    handleCdThumbnail.pause();
});
btnPlay.addEventListener("click", (e) => {
    e.preventDefault();
    isPlay = !isPlay;
    handlePlay(isPlay);
});
btnNext.addEventListener("click", (e) => {
    e.preventDefault();
    nextSong();
    setInfoSong(currenIndex);
    const musics = document.querySelectorAll(".list-music li");
    definteSong(musics);
});
btnPrevious.addEventListener("click", (e) => {
    e.preventDefault();
    previousSong();
    setInfoSong(currenIndex);
    const musics = document.querySelectorAll(".list-music li");
    definteSong(musics);
});
btnRandom.addEventListener("click", (e) => {
    e.preventDefault();
    randomSong(songs.length);
    const musics = document.querySelectorAll(".list-music li");
    definteSong(musics);
});
inputRange.addEventListener("change", (e) => {
    let timeDuration = audio.duration;
    let sec = Math.floor((e.target.value * timeDuration) / 100);
    let percent = Math.floor((sec / timeDuration) * 100);
    audio.currentTime = sec;
    inputRange.value = percent;
});
listBtnClose.addEventListener("click", (e) => {
    e.preventDefault();
    listMusic.classList.add("hidden");
});
listBtnOpen.addEventListener("click", (e) => {
    e.preventDefault();
    listMusic.classList.remove("hidden");
    OpenList.play();
});
repeatBtn.addEventListener("click", (e) => {
    e.preventDefault();
    handleRepeat();
});
