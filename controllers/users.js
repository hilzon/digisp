const JWT = require('jsonwebtoken');
const User = require('../models/user')
const { JWT_SECRET } = require('../configuration');
const bcrypt = require('bcryptjs');

signToken = user => {
    return JWT.sign({
      iss: 'babahome',
      sub: user.id,
      iat: new Date().getTime(), // current time
      exp: new Date().setDate(new Date().getDate() + 1) // 
    }, JWT_SECRET)
  }
  
  module.exports = {
    signup: async (req, res, next) => {
      console.log('userController.signup() called!');
  
      const { email, password } = req.value.body;

      // Check if there is user with same email
      const foundUser = await User.findOne({ email });
      if (foundUser) { 
        return res.status(403).send({ error: 'Email is already in use'})
    }
  
      // Create a new user
      const newUser = new User({ email, password });
      await newUser.save();
      
      // Generate the token
      const token = signToken(newUser);
  
      // Respond with token
      res.status(200).json({ token });
    },
  
    signIn: async (req, res, next) => {
      // Generate token
      const token = signToken(req.user);
      res.status(200).json({ token });
    },
  
    secret: async (req, res, next) => {
      console.log('IN');
      res.json({ secret: "resource" });
    }
  }