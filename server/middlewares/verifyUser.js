const jwt = require('jsonwebtoken')

const verifyUser = (req,res,next) => {
    const token = req.header('x-auth')
    jwt.verify(token, 'thisis-a-secret', { algorithms: ['HS256'] }, function (err, payload) {
        // if token alg != RS256,  err == invalid signature
        if(err){
            return res.json({
                err
            })
        } else {
            console.log('verified')
            req.user = payload
            next()
        }
      });
}

module.exports = verifyUser