const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//update
router.put("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch(err){
                return res.status(400).json(err)
            }
        }
        try{
            //pequeno bug, ele ta salvando, mas como ta deprecated, ta dando badrequest
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },{
                new: true, useFindAndModify: false
            });
            re.status(200).json("Account has been updated!")
        } catch(err){
            return res.status(400).json(err);
        }
    } else {
        return res.status(403).json("Cannot update!")
    }
})
//delete
router.delete("/:id", async (req, res) => {
    if(req.body.userId === req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Your account has been deleted!")
        } catch(err){
            return res.status(400).json(err);
        }
    } else {
        return res.status(403).json("You cannot delete another account!")
    }
})
//get user
router.get("/", async (req, res) =>{
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user = userId 
        ? await User.findById(userId)
        : await User.findOne({username: username});
        const { password, updatedAt, ...other } = user._doc
        res.status(200).json(other)
    } catch(err){
        return res.status(400).json(err)
    }
})

//get friends
router.get("/friends/:userId", async (req, res) => {
    try{
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map(followerId => {
                return User.findById(followerId);
            })
        )
        let friendList = [];
        friends.map(friend => {
            const { _id, username, profilePicture } = friend;
            friendList.push({_id, username, profilePicture})
        });
        return res.status(200).json(friendList);
    } catch(err){
        return res.status(500).json(err);
    }
})

//follow a user
router.put("/:id/follow", async (req, res) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: {followers:req.body.userId}});
                await currentUser.updateOne({$push: {followings:req.params.id}});
                return res.status(200).json("User has been followed!");
            } else {
                return res.status(403).json("User is already followed by you!")
            }
        } catch(err){
            res.status(400).json(err)
        }
    } else {
        res.status(400).json("You cant follow yourself!")
    }
})
//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
    if(req.body.userId !== req.params.id){
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: {followers:req.body.userId}});
                await currentUser.updateOne({$pull: {followings:req.params.id}});
                return res.status(200).json("User has been unfollowed!");
            } else {
                return res.status(403).json("You dont follow this user!")
            }
        } catch(err){
            res.status(400).json(err)
        }
    } else {
        res.status(400).json("You cant unfollow yourself!")
    }
})

module.exports = router;