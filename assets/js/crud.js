const btn = document.querySelector('#btn');
const myList = document.querySelector('#myList');

// get all
function getMovies(){
    let myHeaders = new Headers();
    let opt = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    fetch('/api/movies', opt)
        .then((res) => {
            return res.json();
        })
        .then((response) => {
            response.forEach(elt => {
                addOneLine(elt);
            });
        })
        .catch((err) => {
            console.log('Error : ' + err);
        });
}
getMovies();


//writes movies in the dom
function addOneLine(data) {
    let newLine = document.createElement('tr');
    newLine.innerHTML = `
    <td>${data.title}</td>
    <td>${data.year}</td>
    <td>${data.movieLength}</td>
    <td>${data.genre}</td>
    <td>${data.synopsis.substring(0, 25)}...</td>
    <td>
        <a href="/update-${data._id}" class="btn shadow-sm  bg-white rounded update" id="update${data._id}">
            <span><i class="fas fa-pencil-alt"></i></span>
        </a>
        <a href="#" class="btn shadow-sm  bg-white rounded" id="delete${data._id}">
            <span><i class="fas fa-trash-alt"></i></span>
        </a>
    </td>
  `;
    if(myList){
        myList.appendChild(newLine);

        // routing to movie detail when a line is clicked
        newLine.addEventListener('click', () => {
            window.location.href = '/movies-'+data._id;
        })

        //programming the delete button
        let delBtn = document.querySelector('#delete' + data._id);
        delBtn.addEventListener('click', () => {
            if (confirm("Voulez vous vraiment supprimer cette entité ?")){
                deleteMovie(data._id);
            }
        });
    }


}

//add movie
function addMovie(){
    let title = document.querySelector('#title');
    let year = document.querySelector('#year');
    let movieLength = document.querySelector('#movieLength');
    let genre = document.querySelector('#genre');
    let synopsis = document.querySelector('#synopsis');

    let tmp = {
        title: title.value,
        year: year.value,
        movieLength: movieLength.value,
        genre: genre.value,
        synopsis: synopsis.value
    }

    let opt = {
        method: 'POST',
        body: JSON.stringify(tmp),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    fetch('/api/movies', opt)
        .then((res) => tmp)
        .then((response) => {
            if(!response.title || !response.year || !response.movieLength || !response.genre || !response.synopsis){
                window.alert("Des éléments sont manquants. Vérifiez le formulaire")
            }else {
                window.alert("Enregistré avec succès.")
                window.location.href = '/';
            }

        })
        .catch((res) => {
            console.log(res);
        })

}

//delete a movie
function deleteMovie(tmp) {
    let myHeaders = new Headers();
    let opt = {
        method: 'DELETE',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };

    fetch('/api/movies/' + tmp, opt)
        .then(() => {
            window.location.href = '/';
        })
        .catch((err) => {
            console.log('Error ' + err);
        })
}

if(btn){
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        addMovie();
    });
}

