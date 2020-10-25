const express = require('express');
var cors = require('cors');
const app = express();
const swaggerUi =require('swagger-ui-express');
const swaggerDocument =require('./swagger.json');
const bodyParser = require('body-parser');
const user = require('./routes/user.route');
const tutor = require('./routes/tutor.route');
const events = require('./routes/events.route');
const addQuestion = require('./routes/addQuestion.route');
const config = require('./config.json');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/OrderManagmentSystem');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/testServer', function(req, res){
   res.json({
      "Tutorial": `LEARNING HORIZON is running`
   });
});
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(cors())
app.use('/student', user);
app.use('/tutor', tutor);
app.use('/Questions', addQuestion);   //events
app.use('/Events', events); 
app.listen(config.port, function(){
   console.log(`LEARNING HORIZON is running on Port ${config.port}` );
});



