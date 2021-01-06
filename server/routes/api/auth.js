
const controller = require('../../controllers/auth.controller');

module.exports = (app) => {
  app.post('/signup', controller.signup); 
  app.post('/login', controller.login); 
  app.post('/change-password', controller.changePassword); 

  app.get('/profile', controller.getProfile); 
  app.put('/profile', controller.updateProfile); 
};
