const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const accesToken = req.headers.authorization.split(' ')[1];
  if(accesToken == null) return res.sendStatus(401);

  jwt.verify(accesToken, process.env.ACCES_TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};