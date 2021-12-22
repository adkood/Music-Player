console.log('welcome to javascript');

let index = 0;
let audio_element = new Audio('song1.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let songitem = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    { songname: 'song1', filepath: 'songs/1.mp3', coverpath: 'covers/1.jpg' },
    { songname: 'song2', filepath: 'songs/2.mp3', coverpath: 'covers/2.jpg' },
    { songname: 'song3', filepath: 'songs/3.mp3', coverpath: 'covers/3.jpg' },
    { songname: 'song4', filepath: 'songs/4.mp3', coverpath: 'covers/4.jpg' },
    { songname: 'song5', filepath: 'songs/5.mp3', coverpath: 'covers/5.jpg' },
    { songname: 'song6', filepath: 'songs/6.mp3', coverpath: 'covers/6.jpg' },
    { songname: 'song7', filepath: 'songs/7.mp3', coverpath: 'covers/7.jpg' },
    { songname: 'song8', filepath: 'songs/8.mp3', coverpath: 'covers/8.jpg' },
    { songname: 'song9', filepath: 'songs/9.mp3', coverpath: 'covers/9.jpg' },
    { songname: 'song10', filepath: 'songs/10.mp3', coverpath: 'covers/10.jpg' },
]

songitem.forEach((element, i) => {
    element.getElementsByTagName('img')[0].src = songs[i].coverpath;
    element.getElementsByClassName('songname')[0].innerText = songs[i].songname;
});

//handling play/pause clicks and gif opacity
masterplay.addEventListener('click', () => {

    if (audio_element.paused || audio_element.currentTime <= 0) {
        audio_element.play();
        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
        let gf = document.getElementById('gf');
        gf.style.opacity = 1;
    }
    else {
        audio_element.pause();
        masterplay.classList.remove('fa-pause');
        masterplay.classList.add('fa-play');
        let gf = document.getElementById('gf');
        gf.style.opacity = 0;
    }
});

//handling the seekbar and timeupdate
audio_element.addEventListener('timeupdate', () => {

    // updating seekbar
    let progress = parseInt((audio_element.currentTime / audio_element.duration) * 100);
    myprogressbar.value = progress;
});

//alowing seekbar to start song from where user wants to listen
myprogressbar.addEventListener('change', function () {
    audio_element.currentTime = (myprogressbar.value * audio_element.duration) / 100;
});

const makeallplay = () => {
    Array.from(document.getElementsByClassName('songitemplay')).forEach(element => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
}

Array.from(document.getElementsByClassName('songitemplay')).forEach(element => {
    element.addEventListener('click', (e) => {
        makeallplay();
        index = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');

        audio_element.src = `songs/${index + 1}.mp3`;
        audio_element.currentTime = 0;
        audio_element.play();

        masterplay.classList.remove('fa-play');
        masterplay.classList.add('fa-pause');
    });
});

//next song
document.getElementById('next').addEventListener('click', () => {

    if (index == 9) {
        index = 0;
    }
    else {
        index += 1;
    }
    audio_element.src = `songs/${index + 1}.mp3`;
    audio_element.currentTime = 0;
    audio_element.play();

    if(index==0) {
        document.getElementById(`9`).classList.remove('fa-pause');
        document.getElementById(`9`).classList.add('fa-play');
    }
    else
    {
        document.getElementById(`${index-1}`).classList.remove('fa-pause');
        document.getElementById(`${index-1}`).classList.add('fa-play');
    }

    document.getElementById(`${index}`).classList.remove('fa-play');
    document.getElementById(`${index}`).classList.add('fa-pause');

    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})

//previous song
document.getElementById('previous').addEventListener('click', () => {

    if (index == 0) {
        index = 9;
    }
    else {
        index -= 1;
    }
    audio_element.src = `songs/${index + 1}.mp3`;
    audio_element.currentTime = 0;
    audio_element.play();

    if(index == 9)
    {
        document.getElementById(`0`).classList.remove('fa-pause');
        document.getElementById(`0`).classList.add('fa-play');
    }
    else
    {
        document.getElementById(`${index+1}`).classList.remove('fa-pause');
        document.getElementById(`${index+1}`).classList.add('fa-play');
    }

    document.getElementById(`${index}`).classList.remove('fa-play');
    document.getElementById(`${index}`).classList.add('fa-pause');

    masterplay.classList.remove('fa-play');
    masterplay.classList.add('fa-pause');
})