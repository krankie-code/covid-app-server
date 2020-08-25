const express = require('express');
const User = require('../models/user');
const Game = require('../models/game');
const router = express.Router();
const { isNotLoggedIn, validationLoggin } = require('../helpers/middlewares');


router.post('/result', (req,res,next) =>{
    isNotLoggedIn(),
    validationLoggin()
    const userId = req.session.currentUser._id
    const {score }= req.body;
    const newGame = {score, userId}
    try {
        Game.create(newGame)
        .then((newScore) =>{
            console.log('new score added succesfully');
            User.findByIdAndUpdate(userId,{$push:{arrayScore:newScore._id}}, {new:true} )
            .then((updatedUser)=>{
                req.session.currentUser = updatedUser;
                console.log(req.session.currentUser)
                res.json(updatedUser)})
        })

    } catch (error) {
        console.log(error)
    }
})

module.exports = router;