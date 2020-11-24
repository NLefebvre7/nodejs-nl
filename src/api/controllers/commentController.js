const comment = require('../models/commentModel');

exports.list_all_comments = (req, res) => {
    comment.find({}, (error, comments) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json(comments)
        }
    })
}

exports.create_a_comment = (req, res) => {
    let new_comment = new comment(req.body);

    new_comment.save((error, comment) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(201);
            res.json(comment)
        }
    })
}

exports.get_a_comment = (req, res) => {
    // comment.find({_id: req.params.comment_id}, (error, comment) => {
    comment.findById(req.params.comment_id, (error, comment) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json(comment)
        }
    })
}

exports.update_a_comment = (req, res) => {
    comment.findByIdAndUpdate(req.params.comment_id, req.body, {new: true}, (error, comment) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json(comment)
        }
    })
}

exports.delete_a_comment = (req, res) => {
    // comment.remove({_id: req.params.comment_id}, (error, comment) => {
    comment.findByIdAndRemove(req.params.comment_id, (error, comment) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
            res.status(200);
            res.json({message: "Article supprimé !"})
        }
    })
}