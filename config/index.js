const dotenv = require('dotenv');
dotenv.config({ path: './config/.env' }); 

module.exports = {
  APP_PORT: process.env.APP_PORT,
  DEBUG_MODE: process.env.DEBUG_MODE === 'true',
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  APP_URL: process.env.APP_URL,
};