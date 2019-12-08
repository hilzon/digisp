const Admin = require('../models/admin')
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const joi = require('joi');

exports.validate_admin = (req, res, next) => {
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

// exports.getRegister = (req, res) => {
//   let message = '';
//   res.render('register', {message: message});
// };

// exports.postRegister = async (req, res) => {
//   let pass = bcrypt.genSaltSync(10)
//   let admin = new Admin(req.body)
//   password_admin.password = bcrypt.hashSync(password_admin.password, pass)

//   await admin.save()

//   res.json({
//     'status': 200,
//     'message': `${email_admin.nama_admin} has been registered`
//   });
// };

// exports.getLogin = (req, res) => {
//   let message = '';
//   res.render('Login', {message: message});
// };

// exports.postLogin = async (req, res) => {
//   let {email_admin, password_admin} = req.body;

//   await Admin.findOne({
//     email_admin: email_admin 
//   }, (err, doc) => {
//     if (err) {
//       res.status(500)
//       res.json({
//         'status': 500,
//         'message': err,
//       })
//     }

//     if (doc == null) {
//       res.status(404)
//       res.json({
//         'status': 404,
//         'message': 'User not found',
//       })
//     } else {
//       let check = bcrypt.compare(password_admin, doc.password);
//       if (check) {
//         jwt.sign({
//           email_admin: doc.email_admin
//           // nama_admin: doc.nama_admin
//         }, 'secretkey', (err, token) => {
//           res.json({
//             token
//           })
//         })
//       } else {
//         res.status(400)
//         res.json({
//           'status': 400,
//           'message': 'Wrong password',
//         })
//       }
//     }
//   }).lean()
  
// };




 // ADMIN
exports.listAdmin = async (req, res) => {
    const data = await Admin.findOne({ email_admin : req.body.email_admin})
    if (data == null) {
      res.status(404)
      res.json({
        'status': 404,
        'message': 'User not found',
      })
    } else {
      let check = bcrypt.compare(req.body.password_admin, data.password_admin)
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
  
  exports.tambahAdmin = async (req, res) => {
    if (req.files) {
        let pic = req.files.foto_admin
        let path = `./public/image/admin/${pic.name}`
        const salt = bcrypt.genSaltSync(10)
        const pw = await bcrypt.hash("babastudio", salt)
        pic.mv(path, async (error) => {
          if (error) {
            console.log('err')
          } else {
            const adminData = {
              nama_admin: req.body.nama_admin,
              email_admin: req.body.email_admin,
              password_admin: pw,
              foto_admin: pic.name,
            }
            const admin = new Admin(adminData);
            const status = await admin.save();
            res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
          }
        })
    } else {
        res.sendStatus(403)
    }
  } 
  
  exports.ubahAdmin = async (req, res) => {
    const { email_admin } = req.params
    if(req.files){
      let pic = req.files.foto_admin
      let path = `./public/image/admin/${ pic.name }`

      pic.mv(path, async (err) => {
        if (!err){
          req.body.foto_admin = pic.name
          const status = await Admin.update({_id: email_admin}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
        } else{
          console.log(err)
        }
      })
    } else{
      const status = await Admin.update({_id: email_admin}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
    }
  }

  
  // exports.hapusAdmin = async (req,res) => {
  //   const { email_admin } = req.params;
  //   if(req.files){
  //     let pic = req.files.foto_admin
  //     let path = `./public/image/admin/${ pic.name }`

  //     pic.mv(path, async (err) => {
  //       if (!err){
  //         req.body.foto_admin = pic.name
  //         const status = await Admin.remove({_id: email_admin}, req.body)
  //         res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  //       } else{
  //         console.log(err)
  //       }
  //     })
  //   } else{
  //     const status = await Admin.remove({_id: email_admin}, req.body)
  //         res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  //   }

  //   const status = await Admin.remove({_id: email_admin});
  //       res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  // }