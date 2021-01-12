
const controller = require('../../controllers/skills/promotion.controller');
const { validateToken } = require('../../middlewares/auth');

module.exports = (app) => {
  app.get('/skills-category',validateToken, controller.getSkills); 
  app.post('/skills-category',validateToken, controller.addSkills);  

  app.post('/offer-service',validateToken, controller.offerService);  
  app.delete('/service',validateToken, controller.deleteOfferedService);  
  app.put('/service',validateToken, controller.editOfferedService);  
  app.get('/services',validateToken, controller.getServices);  
};
