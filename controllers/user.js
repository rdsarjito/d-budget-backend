const { google } = require('googleapis');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');
const User = mongoose.model('users');

const createUserGoogleLogin = async(req, res) => {
  const { code } = req.body;

  const requestOrigin = req.headers.origin || (req.headers.referer ? req.headers.referer.replace(/\/$/, '') : undefined);
  const redirectUri = requestOrigin || 'postmessage';
  const oauth2Client = new google.auth.OAuth2(
    keys.googleClientID,
    keys.googleClientSecret,
    redirectUri
  );

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const oauth2 = google.oauth2({
    version: 'v2',
    auth: oauth2Client
  });

  const getData = await oauth2.userinfo.get();

  const existingUser = await User.findOne({ googleId: getData.data.id });
  if(existingUser) {
    const accesToken = jwt.sign({ userData: existingUser }, process.env.ACCES_TOKEN_SECRET);
    return res.status(200).send({ accesToken });
  };

  const newUser = await new User({ googleId: getData.data.id, picture: getData.data.picture, name: getData.data.name });
  newUser.save();

  const accesToken = jwt.sign({ userData: newUser }, process.env.ACCES_TOKEN_SECRET);
  return res.status(200).send({ accesToken });
};

const getUserGoogleLogin = async(req, res) => {
  const accesToken = req.headers.authorization.split(' ')[1];
  jwt.verify(accesToken, process.env.ACCES_TOKEN_SECRET, (err, user) => {
    if(err) return res.sendStatus(403);
    res.status(200).send(user)      
  });
};

module.exports = {
  createUserGoogleLogin,
  getUserGoogleLogin
}