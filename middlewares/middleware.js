exports.validate_user = (req, res, next) => {
    let schema = joi.object().keys({
      email_admin: joi
        .string()
        .required()
        .max(10),
      password_admin: joi
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
    let admin = new Admin(req.body)
    password_admin.password = bcrypt.hashSync(password_admin.password, pass)
  
    await admin.save()
  
    res.json({
      'status': 200,
      'message': `${email_admin.nama_admin} has been registered`
    });
  };
  
  exports.getLogin = (req, res) => {
    let message = '';
    res.render('Login', {message: message});
  };
  
  exports.postLogin = async (req, res) => {
    let {email_admin, password_admin} = req.body;
  
    await Admin.findOne({
      email_admin: email_admin
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
        let check = bcrypt.compare(password_admin, doc.password);
        if (check) {
          jwt.sign({
            email_admin: doc.email_admin
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

