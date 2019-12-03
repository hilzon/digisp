const User = require('../models/user') 

const joi = require('joi');

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
    'message': `${email.username} has been registered`
  });
};

exports.getLogin = (req, res) => {
  let message = '';
  res.render('Login', {message: message});
};

exports.postLogin = async (req, res) => {
  let {email, password} = req.body;

  await User.findOne({
    email: email
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
          email: doc.email
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
    const data = await User.find()
      res.send(JSON.stringify({"status": 200, "response": data}));
  }
  
  exports.tambahUser = async (req, res) => {
    if (req.files) {
        let pic = req.files.image_user
        let path = `./public/image/user/${pic.name}`
        pic.mv(path, async (error) => {
          if (error) {
            console.log('err')
          } else {
            const userData = {
              nama_user: req.body.nama_user,
              email_user: req.body.email_user,
              password_user: req.body.password_user,
              hp_user: req.body.hp_user,
              alamat_user: req.body.alamat_user,
              tagihan_user: req.body.tagihan_user,
              image_user: pic.name,
              status_user: {
                  type: Boolean,
                  default: true
              }
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
    const { id } = req.params
    if(req.files){
      let pic = req.files.image_user
      let path = `./public/image/user/${ pic.name }`

      pic.mv(path, async (err) => {
        if (!err){
          req.body.image_user = pic.name
          const status = await User.update({_id: id}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
        } else{
          console.log(err)
        }
      })
    } else{
      const status = await User.update({_id: id}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
    }
  }

  
  exports.hapusUser = async (req,res) => {
    const { id } = req.params;
    if(req.files){
      let pic = req.files.image_user
      let path = `./public/image/user/${ pic.name }`

      pic.mv(path, async (err) => {
        if (!err){
          req.body.image_user = pic.name
          const status = await User.remove({_id: id}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
        } else{
          console.log(err)
        }
      })
    } else{
      const status = await User.remove({_id: id}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
    }

    const status = await User.remove({_id: id});
        res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  }