const express = require('express');
const { isLoggedIn } = require('../helpers/middlewares');
const router = express.Router();

const User = require('../models/user')
const Game = require('../models/game');


router.get('/user', isLoggedIn(),async (req,res,next)=>{
    try {
        const users = await User.find().populate('arrayScore')
        users.sort((a,b)=>{
          return Math.max.apply(Math, b.arrayScore.map(function(o) { return o.score;})) - Math.max.apply(Math, a.arrayScore.map(function(o) { return o.score;}))
        })
        const position = users.findIndex(user => user._id == req.session.currentUser._id);
        res.status(200).json({users, position})
    } catch (error) {
        console.log(error)
    }
    
})

router.put('/user/edit-profile',isLoggedIn(), async (req,res,next)=>{
    const userId = req.session.currentUser._id;

 const { username,email,password,img} = req.body;
       
    let image_url;
 
    if (img !== '') {
        image_url= img;
    } else {
        image_url= '../images/avatar.png';
    } 
    try {
        const updatedUser = await User.findOneAndUpdate({ _id:userId }, {username,password,email,img: image_url}, {new:true})
        req.session.currentUser = updatedUser;
        res.status(200).json(updatedUser)
    } catch (error) {
        console.log(error)
    }
})

router.delete('/user/edit-profile/delete',isLoggedIn(),async(req,res,next)=>{
    console.log(req.session.currentUser._id)
    const userId = req.session.currentUser._id;
    try {
         const deletedUser = await User.findByIdAndRemove(userId);
         if (!deletedUser) {
            throw new NotFoundError('user NOT_FOUND with id: ' + userId);
          }
          req.session.destroy();
          return res.status(204).json('user deleted!');
        

        
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;