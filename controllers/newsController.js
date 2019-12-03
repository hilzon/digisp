const News = require('../models/news');

// NEWS
exports.listNews = async (req, res) => {
    const data = await News.find()
      res.send(JSON.stringify({"status": 200, "response": data}));
  }
  
exports.tambahNews = async (req, res) => {
    if (req.files) {
        let pic = req.files.image_news
        let path = `./public/image/news/${pic.name}`
        pic.mv(path, async (error) => {
          if (error) {
            console.log('err')
          } else {
            const newsData = {
              judul_news: req.body.judul_news,
              image_news: pic.name,
              deskripsi_news: req.body.deskripsi_news,
              author_news: req.body.author_news
            }
            const news = new News(newsData);
            const status = await news.save();
            res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
          }
        })
    } else {
        res.sendStatus(403)
    }
  } 
  
exports.ubahNews = async (req, res) => {
    const { id } = req.params
    if(req.files){
      let pic = req.files.image_news
      let path = `./public/image/news/${ pic.name }`

      pic.mv(path, async (err) => {
        if (!err){
          req.body.image_news = pic.name
          const status = await News.update({_id: id}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
        } else{
          console.log(err)
        }
      })
    } else{
      const status = await News.update({_id: id}, req.body)
          res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
    }
  }

  exports.hapusNews = async (req,res) => {
    let { id } = req.params;
    const status = await News.remove({_id: id});
    res.send(JSON.stringify({"status": 200, "error": null, "response": status}));
  }