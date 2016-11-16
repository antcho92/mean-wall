var users = require('./../controllers/users.js');
var messages = require('./../controllers/messages.js')

module.exports = function(app) {
  app.get('/users', users.index);
  app.post('/users/login', users.login);
  app.get('/users/checkSess', users.checkSess);
  app.get('/users/logout', users.logout),
  app.get('/messages', messages.index),
  app.post('/messages/:id', messages.create)
  app.post('/comments/:id', messages.createComment);
}
