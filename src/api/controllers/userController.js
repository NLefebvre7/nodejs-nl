const User = require('../models/userModel');

const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
var mongoose = require('mongoose');
require('mongoose-type-email');


exports.create_an_user = (req, res) => {
    

//bcrypt password
bcrypt.hash(req.body.password, 10).then(
        (hash) => {
            const new_user = new User({
                email: req.body.email,
                password: hash
            });
            new_user.save((error, user).then( () => {

        if (error) {
            res.status(500);
            console.log(error);
            res.json({ message: "Erreur serveur."})
        } 

else { res.status(201); res.json({message: `Utilisateur crée : ${user.email} mot de passe! ${user.password}`}) }

        }
    )
            )})
        
}

exports.login_an_user = (req, res) => {
    User.findOne({
        email: req.body.email
    }, (error, user) => {
        if (error) {
            res.status(500);
            console.log(error);
            res.json({
                message: "Erreur serveur."
            })
        } else {
//bcrypt.hash(user.password, 10)
            if (user.password === req.body.password) {
                jwt.sign({
                    email: user.email,
                    role: "user"
                }, process.env.JWT_SECRET, {
                    expiresIn: '30 days'
                }, (error, token) => {
                    if (error) {
                        res.status(400);
                        console.log(error);
                        res.json({
                            message: "Mot de passe ou email erroné."
                        })
                    } else {
                        res.json({
                            token
                        })
                    }
                })
            } else {
                res.status(400);
                console.log(error);
                res.json({
                    message: "Mot de passe ou email erroné."
                })
            }


        }
    })
}