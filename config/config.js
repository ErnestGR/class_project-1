//Bring in the handlebars middleware for express.
const expresshbs = require('express-handlebars');

//Bring all the contents form the /models
//directory and put it inside a global named
//models.
global.models = require('../models');


module.exports = function(app) {
  //Tells the handlebars middleware
  //to create a new instance of the 
  //view engine
  //defaultLayour: What our main layout
  //file will be called.
  //extname: The extension for our 
  //handlebars files
  let hbs = expresshbs.create({
    defaultLayout: 'main',
    extname: '.hbs'
  });
  
  //Tells our server to use handlebars as
  //our view engine and to expect the
  //handlebars files to be .hbs
  app.engine('.hbs', hbs.engine);
  app.set('view engine', '.hbs');

  //Load our routes into the server
  require('./routes')(app);
}