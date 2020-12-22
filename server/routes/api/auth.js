
const controller = require('../../controllers/auth.controller');

module.exports = (app) => {
  app.post('/signup', controller.signup); 
  app.post('/login', controller.login); 
};
