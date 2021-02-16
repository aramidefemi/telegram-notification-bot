
const controller = require('../../controllers/messaging.controller');
const { validateToken } = require('../../middlewares/auth');

module.exports = (app) => {
  app.get('/contacts',validateToken, controller.getContactList);  
  app.get('/contact/new/:contact',validateToken, controller.startConversation);  

  app.post('/messages/send/:conversation',validateToken, controller.sendText);  
  app.get('/messages/retrieve/:conversation',validateToken, controller.retrieveMessages);  
};
