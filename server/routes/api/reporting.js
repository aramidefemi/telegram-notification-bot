
const controller = require('../../controllers/reporting');

module.exports = (app) => {
  app.post('/report/error', controller.errorLogging); 
  app.post('/report/interaction', controller.interaction); 
};
