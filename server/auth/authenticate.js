const cookieParser = require('cookie-parser');

var jwt = require('jsonwebtoken');
const SECRET='ANUBHAV1602';

const authenticatejwt = (req, res, next) => {
    const token = req.headers.authorization.replace('Bearer ', '');
    if (token) {
      jwt.verify(token, SECRET, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        req.user = user;
        next();
      });
    } else {
      res.sendStatus(401);
    }
  };
module.exports={
    authenticatejwt,SECRET
}