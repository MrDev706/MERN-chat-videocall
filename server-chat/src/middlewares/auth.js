const jwt = require('jsonwebtoken')


const auth = async function(req, res, next){
    let data = req.Headers('authorization')
    if(!data.startsWith('Bearear ')){
        res.send({status: false, error: "Auth header not present"})
    }

    let token = data.split(" ")[1]

    let decode = jwt.verify(token, "Debu-chat-app")
    if(!decode) return res.send({status: true, error: "Invalid token"})

    req.decodeToken = decode
    next()
}

module.exports = auth


