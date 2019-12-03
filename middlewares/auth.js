const jwt = require('jsonwebtoken')

exports.verifyToken = (req,res,next) => {
    const token = req.headers['authorization']
    if(typeof token !== 'undefined'){
        jwt.verify(token, 'secretkey', (err, auth) => {
            if (err) {
                res.status(403)
                res.json({
                    message: 'NO permission. Bye'
                })
            } else {
                next()
            }
        })       
    } else {
        res.status(403)
        res.send({
            'message': 'Forbidden'
        });
    }

} 