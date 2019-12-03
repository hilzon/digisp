const Admin = require('../models/admin')
const User = require('../models/user')

exports.index = (req, res) => {
  res.render("index")
}


// API ADMIN

exports.dataAdmin = async (req,res) => {
  const data = await Admin.find();
  res.render("data_member", {
    data
  })
  console.log(data) 
}    

exports.login = (req, res) => {
  let message = '';
  res.render('login', { message: message });
};

exports.proses = (req, res) => {
  let data = req.body;
  console.log(data);

  res.send(data);
}; 

exports.addAdmin = (req, res) => {
  res.render('add_admin') 
}
exports.saveAdmin = async (req, res) => {
  const admin = new Admin(req.body);
  await admin.save();
  res.redirect('/data-admin');
}

exports.editAdmin = async(req, res) => {
  const data = await Admin.findById(req.params.id);
  res.render('edit_admin', {
    data
  })
}

exports.updateAdmin = async(req, res) => {
  const { id } = req.params;
  await Admin.update({_id:id}, req.body);
  res.redirect('/data-admin');
}

exports.deleteAdmin = async(req, res) => {
  let { id } = req.params;
  await Admin.remove({_id:id});
  res.redirect('/data-admin');
}

exports.listAdmin = async (req, res) => {
    const data = await Admin.find()
      res.send(JSON.stringify({"status": 200, "error": null, "response": data}))
}

exports.detailAdmin = async (req,res) => {
  const data = await Admin.findById(req.params.id);
  res.send(JSON.stringify({"status": 200, "error": null, "response": data}));
}

exports.tambahAdmin = async (req, res) => {
  const admin = new Admin(req.body);
  const status = await admin.save();
  res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
} 

exports.ubahAdmin = async(req,res) => {
  const { id } = req.params;
  const status = await Admin.update({_id: id}, req.body);
  res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
}

exports.hapusAdmin = async(req,res) => {
  let { id } = req.params;
  const status = await Admin.remove({_id: id});
  res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
}



// User
exports.dataUser = async (req, res) => {
  const data = await User.find()
  res.render('data_user', {
      data
  })
  console.log(data)
}

exports.addUser = async (req, res) => {
  res.render('user')
}

exports.saveUser = async (req, res) => {
  const user = new User(req.body)
  console.log(user)
  await user.save()
  res.redirect('/data-user')
}

exports.editUser = async (req, res) => {
  const data = await User.findById(req.params.id)
  res.render('user', {
      data
  })
}

exports.updateUser = async (req, res) => {
  const { id } = req.params
  await User.update({_id: id}, req.body)
  res.redirect('/data-user')
}

exports.deleteUser = async (req, res) => {
  let { id } = req.params
  await User.remove({_id: id})
  res.redirect('/data-user')
}

// API User

exports.listUser = async (req, res) => {
  const data = await User.find()
  res.send(JSON.stringify({"status": 200, "error": null, "response": data}))
}

exports.detailUser = async (req, res) => {
  const data = await User.findById(req.params.id)
  res.send(JSON.stringify({"status": 200, "error": null, "response": data}))
}

exports.tambahUser = async (req, res) => {
  const user = new User(req.body)
  const status = await user.save()
  res.send(JSON.stringify({"status": 200, "error": null, "response": status}))
}

exports.ubahUser = async (req, res) => {
  let { id } = req.params
  const status = await User.update({_id: id}, req.body)
  res.send(JSON.stringify({"status": 200, "error": null, "response": status}))
}

exports.hapusUser = async (req, res) => {
  let { id } = req.params
  const status = await User.remove({_id: id})
  res.send(JSON.stringify({"status": 200, "error": null, "response": status}))
}
