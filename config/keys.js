const dotenv = require('dotenv').config({ path: './.env' }).parsed;

module.exports = {
  accesTokenSecret: dotenv.ACCES_TOKEN_SECRET,
  mongoURI: dotenv.MONGO_URI,
  googleClientID: dotenv.GOOGLE_CLIENT_ID,
  googleClientSecret: dotenv.GOOGLE_CLIENT_SECRET
};