const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res)=>{
    try{
        //gerar uma senha codificada
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        //criar usuário
        const newUser = new User({
            profilePicture: req.body.profilePicture,
            coverPicture: req.body.coverPicture,
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
       });
       //salvar usuário
        const user = await newUser.save();
        res.status(200).json(user);
    } catch(err){
        res.status(500).json(err);
    }

});

//LOGIN
router.post("/login", async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json("User not found!");
        }
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if(!validPass){
            return res.status(400).json("Invalid password!");
        }
        res.status(200).json(user);
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;