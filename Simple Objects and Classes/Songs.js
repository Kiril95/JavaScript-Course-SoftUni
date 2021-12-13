function song(inputArr = []) {
    class Song {
        constructor(playList, name, time) {
            this.playList = playList;
            this.name = name;
            this.time = time;
        }
    }
    let musicPlayer = [];
    let numSongs = inputArr.shift();
    let album = inputArr.pop();

    for (let i = 0; i < inputArr.length; i++) {
        let currentArray = inputArr[i].split('_');
        let song = new Song(currentArray[0], currentArray[1], currentArray[2]);

        musicPlayer.push(song);
    }

    if (album === 'all') {
        musicPlayer.forEach(x => console.log(x.name));
    } else {
        let filtered = musicPlayer.filter(x => x.playList == album);
        filtered.forEach(x => console.log(x.name));
    }
}

song([3, 'favourite_DownTown_3:14', 'favourite_Kiss_4:16', 'favourite_Smooth Criminal_4:01', 'favourite'])