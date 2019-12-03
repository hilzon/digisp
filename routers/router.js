// const authController = require('../controllers/authController');
const sliderController = require('../controllers/sliderController');
const addonController = require('../controllers/addonController');
const fasilitasController = require('../controllers/fasilitasController');
const paketController = require('../controllers/paketController');
const promoController = require('../controllers/promoController');
const kategoriController = require('../controllers/kategoriController');
const newsController = require('../controllers/newsController');
const kontakController = require('../controllers/kontakController');
const userController = require('../controllers/userController');
const adminController = require('../controllers/adminController');
const middleware = require('../middlewares/middleware');
const verifyToken = require('../middlewares/auth');

module.exports = app => {
  //API Slider
  app.get('/api/slider', sliderController.listSlider)
  app.post('/api/slider', sliderController.tambahSlider)
  app.put('/api/slider/:id', sliderController.ubahSlider)
  app.delete('/api/slider/:id', sliderController.hapusSlider)
  
  //API Addon
  app.get('/api/addon', addonController.listAddon)
  app.post('/api/addon', addonController.tambahAddon)
  app.put('/api/addon/:id', addonController.ubahAddon)
  app.delete('/api/addon/:id', addonController.hapusAddon)

  //API Fasilitas
  app.get('/api/fasilitas', fasilitasController.listFasilitas)
  app.post('/api/fasilitas', fasilitasController.tambahFasilitas)
  app.put('/api/fasilitas/:id', fasilitasController.ubahFasilitas)
  app.delete('/api/fasilitas/:id', fasilitasController.hapusFasilitas)

  //API Paket
  app.get('/api/paket', paketController.listPaket)
  app.post('/api/paket', paketController.tambahPaket)
  app.put('/api/paket/:id', paketController.ubahPaket)
  app.delete('/api/paket/:id', paketController.hapusPaket)

  //API Promo
  app.get('/api/promo', promoController.listPromo)
  app.post('/api/promo', promoController.tambahPromo)
  app.put('/api/promo/:id', promoController.ubahPromo)
  app.delete('/api/promo/:id', promoController.hapusPromo)

  //API Kategori
  app.get('/api/kategori', kategoriController.listKategori)
  app.post('/api/kategori', kategoriController.tambahKategori)
  app.put('/api/kategori/:id', kategoriController.ubahKategori)
  app.delete('/api/kategori/:id', kategoriController.hapusKategori)

  //API News
  app.get('/api/news', newsController.listNews)
  app.post('/api/news', newsController.tambahNews)
  app.put('/api/news/:id', newsController.ubahNews)
  app.delete('/api/news/:id', newsController.hapusNews)

  //API Kontak
  app.get('/api/kontak', kontakController.listKontak)
  app.post('/api/kontak', kontakController.tambahKontak)
  app.put('/api/kontak/:id', kontakController.ubahKontak)
  app.delete('/api/kontak/:id', kontakController.hapusKontak)



// API ADMIN
app.get('/api/admin', adminController.listAdmin)
app.post('/api/admin', adminController.tambahAdmin)
app.put('/api/admin/:id', adminController.ubahAdmin)
app.delete('/api/admin/:id', adminController.hapusAdmin)

// API USER
app.get('/api/user', userController.listUser)
app.post('/api/user', userController.tambahUser)
app.put('/api/user/:id', userController.ubahUser)
app.delete('/api/user/:id', userController.hapusUser)


// API adminlogin
  app.post('/api/register', middleware.postRegister)
  app.get('/api/login', middleware.postLogin)
  app.post('/api/login', middleware.postLogin)
};
 



  // //API userlogin
  // app.post('/api/register', middleware.postRegister)
  // app.get('/api/userlogin', middleware.postLogin)
  // app.post('/api/userlogin', middleware.postLogin)



