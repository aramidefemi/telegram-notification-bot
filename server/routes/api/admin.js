
const controller = require('../../controllers/admin');
const { validateToken } = require('../../middlewares/auth');

module.exports = (app) => {
  app.get('/admin/users/all', controller.getAllUsers);  
};
