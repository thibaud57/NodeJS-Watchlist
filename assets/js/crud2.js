let url = window.location;
let movieId = url.pathname.substring(8);
const movieDetail = document.querySelector('#movieDetail');
const update_movie = document.querySelector('#update_movie');
const title = document.getElementById("title");
const year = document.getElementById("year");
const movieLength = document.getElementById("movieLength");
const genre = document.getElementById("genre");
const synopsis = document.getElementById("synopsis");

//get one movie
function getMovie(){
    let myHeaders = new Headers();
    let opt = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };


    fetch(`/api/movies/${movieId}`, opt)
        .then((res) => {
            return res.json();
        })
        .then((response) => {
            addOneLine(response);
        })
        .catch((err) => {
            console.log('Error : ' + err);
        })
}
getMovie();

//writes movie in the dom
function addOneLine(data) {
    if(movieDetail){
        title.innerText = data.title;
        year.innerText = data.year;
        movieLength.innerText = data.movieLength;
        genre.innerText = data.genre;
        synopsis.innerText = data.synopsis;
    }
    if(update_movie){
        title.value = data.title;
        year.value = data.year;
        movieLength.value = data.movieLength;
        genre.value = data.genre;
        synopsis.value = data.synopsis;
    }
}

function updateMovie(){
    let tmp = {
        title: title.value,
        year: year.value,
        movieLength: movieLength.value,
        genre: genre.value,
        synopsis: synopsis.value
    }
    let opt2 = {
        method: 'PUT',
        body: JSON.stringify(tmp),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    fetch(`/api/movies/${movieId}`, opt2)
        .then((res) => {
            return res.json();
        })
        .then((response) => {
            if(!response.title || !response.year || !response.movieLength || !response.genre || !response.synopsis){
                window.alert("Des éléments sont manquants. Vérifiez le formulaire")
            }else {
                window.alert("Modifié avec succès.")
                window.location.href = '/';
            }
        })
        .catch((res) => {
            console.log(res);
        })
}

if(btn){
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        updateMovie();
    });
}
