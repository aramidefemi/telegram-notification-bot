
const controller = require('../../controllers/skills/promotion.controller');
const { validateToken } = require('../../middlewares/auth');

module.exports = (app) => {
  app.get('/skills-category',validateToken, controller.getSkills); 
  app.post('/skills-category',validateToken, controller.addSkills);  

  app.post('/offer-service',validateToken, controller.offerService);  
  app.delete('/service',validateToken, controller.deleteOfferedService);  
  app.put('/service',validateToken, controller.editOfferedService);  
  app.get('/services/:category_id',validateToken, controller.getServices);
  app.get('/services/search/:search',validateToken, controller.searchServices);

  app.get('/review/:service',validateToken, controller.getServiceReviews);
  app.post('/review',validateToken, controller.reviewService);
  app.get('/like/:id',validateToken, controller.likeService);
  
  
};
