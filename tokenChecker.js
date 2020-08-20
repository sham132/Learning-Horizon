const jwt = require('jsonwebtoken')
const config = require('./config')

module.exports = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['token']

  var decoded = jwt.decode(token, config.secret);
  console.log("decoded : " +JSON.stringify(decoded)); //=> { foo: 'bar' }


 // console.log("decodedJwt : " + decodedJwt)
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    return res.json({ success: false, message: 'Please add token header in the request.' });
  }
}