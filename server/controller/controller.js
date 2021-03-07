let movieDB = require('../model/model');

//get all
exports.find = (req, res) => {
    movieDB.find().then(movie =>{
        res.send(movie)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur sur la lecture des films"
        })
    })
}

//get id
exports.findId = (req, res) => {
    const id = req.params.id;

    movieDB.findById(id).then(data => {
        if(!data){
            res.status(404).send({
                message: "Impossible de trouver le film dont l'id est: " + id
            })
        }else {
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({
            message: "Erreur pour retrouver le film."
        })
    })

}

//create
exports.create = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: "Le contenu ne peut pas être vide"
        });
    }

    const movie = new movieDB({
        title: req.body.title,
        year: req.body.year,
        movieLength: req.body.movieLength,
        category: req.body.category,
        genre: req.body.genre,
        synopsis: req.body.synopsis
    })

    movie.save(movie).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Erreur dans l'écriture du film"
        })
    })

}

//update
exports.update = (req, res) => {
    if(!req.body){
        res.status(400).send({
            message: "Le contenu ne peut pas être vide"
        });
    }

    const id = req.params.id;
    movieDB.findByIdAndUpdate(id, req.body, {
        useFindAndModify:false
    }).then(data => {
        if(!data){
            res.status(404).send({
                message: "Impossible de mettre à jour le film " + id
            })
        }else {
            res.send(data)
        }
    }).catch(err => {
        res.status(500).send({
            message: "Erreur dans la mise à jour du film."
        })
    })

}

//delete
exports.delete = (req, res) => {
    const id = req.params.id;
    movieDB.findByIdAndDelete(id).then(data => {
        if(!data){
            res.status(404).send({
                message: "Impossible de supprimer l'id: " +id
            })
        }else {
            res.send({
                message: "Suppression du film."
            }).catch(err => {
                res.status(500).send({
                    message: "Suppresion du film impossible."
                })
            })
        }
    })
}