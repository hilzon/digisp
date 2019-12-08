const User = require('../models/user') 
const joi = require('joi');
// const JWT = require('jsonwebtoken');
// const { JWT_SECRET } = require('../configuration');
const bcrypt = require('bcryptjs');

// signToken = user => {
//     return JWT.sign({
//       iss: 'babahome',
//       sub: user.id,
//       iat: new Date().getTime(), // current time
//       exp: new Date().setDate(new Date().getDate() + 1) // 
//     }, JWT_SECRET)
//   }
  
  // module.exports = {
  //   signup: async (req, res, next) => {
  //     console.log('userController.signup() called!');
  
  //     const { email_user, password_user } = req.value.body;

  //     // Check if there is user with same email
  //     const foundUser = await User.findOne({ email_user });
  //     if (foundUser) { 
  //       return res.status(403).send({ error: 'Email is already in use'})
  //   }
  
  //     // Create a new user
  //     const newUser = new User({ email_user, password_user });
  //     await newUser.save();
      
  //     // Generate the token
  //     const token = signToken(newUser);
  
  //     // Respond with token
  //     res.status(200).json({ token });
  //   },
  
  //   signIn: async (req, res) => {
  //     // Generate token
  //     const token = signToken(req.user);
  //     res.status(200).json({ token });
  //   },
  
  //   secret: async (req, res) => {
  //     console.log('IN');
  //     res.json({ secret: "resource" });
  //   }
  // }


exports.validate_user = (req, res, next) => {
  let schema = joi.object().keys({
    nama_user: joi
      .string()
      .required()
      .max(10),
    password_user: joi
      .string()
      .required()
      .min(3)
  });

  joi
    .validate(req.body, schema)
    .then(validated => {
      next();
    })
    .catch(err => {
      res.redirect('/')
    });
};


exports.getRegister = (req, res) => {
  let message = '';
  res.render('register', {message: message});
};

exports.postRegister = async (req, res) => {
  let pass = bcrypt.genSaltSync(10)
  let user = new User(req.body)
  password_user.password = bcrypt.hashSync(password_user.password, pass)

  await user.save()

  res.json({
    'status': 200,
    'message': `${email_user.nama_user} has been registered`
  });
};

exports.getLogin = (req, res) => {
  let message = '';
  res.render('Login', {message: message});
};

exports.postLogin = async (req, res) => {
  let {email_user, password_user} = req.body;

  await User.findOne({
    email_user: email_user
  }, (err, doc) => {
    if (err) {
      res.status(500)
      res.json({
        'status': 500,
        'message': err,
      })
    }

    if (doc == null) {
      res.status(404)
      res.json({
        'status': 404,
        'message': 'User not found',
      })
    } else {
      let check = bcrypt.compare(password_user, doc.password);
      if (check) {
        jwt.sign({
          email_user: doc.email_user
          // nama_admin: doc.nama_admin
        }, 'secretkey', (err, token) => {
          res.json({
            token
          })
        })
      } else {
        res.status(400)
        res.json({
          'status': 400,
          'message': 'Wrong password',
        })
      }
    }
  }).lean()
  
};

// USER
exports.listUser = async (req, res) => {
  const data = await User.findOne({ email_user : req.body.email_user})
  if (data == null) {
    res.status(404)
    res.json({
      'status': 404,
      'message': 'User not found',
    })
  } else {
    let check = bcrypt.compare(req.body.password_user, data.password_user)
    if (check) {
      res.send(JSON.stringify({"status": 200, "response": data}))
    } else{
      res.status(404)
    res.json({
      'status': 404,
      'message': 'Password no right',
    })
    }
  }
}

exports.tambahUser = async (req, res) => {
  if (req.files) {
      let pic = req.files.image_user
      let path = `./public/image/user/${pic.name}`
      const salt = bcrypt.genSaltSync(10)
      const pw = await bcrypt.hash("studio", salt)
      pic.mv(path, async (error) => {
        if (error) {
          console.log('err')
        } else {
          const userData = {
            nama_user: req.body.nama_user,
            email_user: req.body.email_user,
            password_user: pw,
            alamat_user: req.body.nama_user,
            tagihan_user: req.body.tagihan_user,
            image_user: pic.name,
            status_user: req.body.status_user
          }
          const user = new User(userData);
          const status = await user.save();
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
        }
      })
  } else {
      res.sendStatus(403)
  }
} 

exports.ubahUser = async (req, res) => {
  const { email_user } = req.params
  if(req.files){
    let pic = req.files.image_user
    let path = `./public/image/user/${ pic.name }`

    pic.mv(path, async (err) => {
      if (!err){
        req.body.image_user = pic.name
        const status = await User.update({_id: email_user}, req.body)
        res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
      } else{
        console.log(err)
      }
    })
  } else{
    const status = await User.update({_id: email_user}, req.body)
        res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  }
}
  
  exports.hapusUser = async (req,res) => {
    const { email_user } = req.params;
    if(req.files){
      let pic = req.files.image_user
      let path = `./public/image/user/${ pic.name }`

      pic.mv(path, async (err) => {
        if (!err){
          req.body.image_user = pic.name
          const status = await User.remove({_id: email_user}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
        } else{
          console.log(err)
        }
      })
    } else{
      const status = await User.remove({_id: email_user}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
    }

    const status = await User.remove({_id: email_user});
        res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  }