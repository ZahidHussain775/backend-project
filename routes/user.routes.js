const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userModel = require("../models/user.model");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register",
    body('email').trim().isEmail().isLength({ min: 13}),
    body('password').trim().isLength({ min: 5}),
    body('username').trim().isLength({ min: 3}),
    async (req, res) => {
       
     const errors = validationResult(req);

     if(!errors.isEmpty()){
        return res.status(400).json({ 
        errors: errors.array(),
        message: "Validation failed"
    });
    }
        
   const { username, email, password } = req.body;

    const newUser = await userModel.create({
        email,
        password,
        username
    });
    res.json({newUser});


});

module.exports = router;