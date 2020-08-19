const express = require('express');
const { isLoggedIn } = require('../helpers/middlewares');
const router = express.Router();

const User = require('../models/user')
const Game = require('../models/game');


router.get('/user', isLoggedIn(),async (req,res,next)=>{
    console.log('json')
    try {
        const users = await User.find()
        .populate('arrayScore')
        
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
    }
    
})

router.put('/user/edit-profile',isLoggedIn(), async (req,res,next)=>{
    const userId = req.session.currentUser._id;

 const { username,email,password} = req.body;
        /* console.dir(req.file)
        console.log(req.file.secure_url) */
    let image_url;
 
    if (typeof req.file != 'undefined') {
        image_url= req.file.path;
    } else {
        image_url= '../images/avatar.png';
    } 
    try {
        const updatedUser = await User.findOneAndUpdate({ _id:userId }, {username,password,email,img: image_url}, {new:true})
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