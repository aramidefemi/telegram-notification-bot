
const controller = require('../../controllers/skills/promotion.controller');

module.exports = (app) => {
  app.get('/skills', controller.getSkills); 
  app.post('/skills', controller.addSkills);  

  
};
