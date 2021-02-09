
const controller = require('../../controllers/auth.controller');
const { validateToken } = require('../../middlewares/auth');

module.exports = (app) => {
  app.post('/signup',  controller.signup); 
  app.post('/login', controller.login); 
  app.post('/change-password', controller.changePassword); 

  app.get('/me', validateToken, controller.me); 
  app.get('/profile/:id', validateToken, controller.getProfile); 
  app.put('/profile', validateToken, controller.updateProfile); 
  app.put('/updateProfileImage', validateToken, controller.updateProfileImage); 
};
