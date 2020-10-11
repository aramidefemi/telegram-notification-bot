
const controller = require('../../controllers/products.controller');

module.exports = (app) => {
  app.post('/start_bot', controller.startBot); 
};
