function info(inputArr = []) {
    let repo = [];

    for (let i = 0; i < inputArr.length; i++) {

        if (inputArr[i].includes("addMovie")) {
            let movie = {};
            movie.name = inputArr[i].split(" ").slice(1).join(" ");

            repo.push(movie);
        }

        else if (inputArr[i].includes('directedBy')) {
            let [movie, movieDirector] = inputArr[i].split(" directedBy ");
            let targetMovie = repo.find(x => x.name == movie);

            if (targetMovie) {
                targetMovie.director = movieDirector;
            }
        }

        else if (inputArr[i].includes('onDate')) {
            let [movie, movieDate] = inputArr[i].split(" onDate ");
            let targetMovie = repo.find(x => x.name == movie);

            if (targetMovie) {
                targetMovie.date = movieDate;
            }
        }
    }
    for (let movie of repo) {
        if (movie.hasOwnProperty('name') && movie.hasOwnProperty('director') && movie.hasOwnProperty('date')) {
            console.log(JSON.stringify(movie));
        }
    }
}

info([
    'addMovie Fast and Furious',
    'addMovie Godfather',
    'Inception directedBy Christopher Nolan',
    'Godfather directedBy Francis Ford Coppola',
    'Godfather onDate 29.07.2018',
    'Fast and Furious onDate 30.07.2018',
    'Batman onDate 01.08.2018',
    'Fast and Furious directedBy Rob Cohen'
])