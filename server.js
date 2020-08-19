const express = require('express');
var cors = require('cors');
const app = express();
const swaggerUi =require('swagger-ui-express');
const swaggerDocument =require('./swagger.json');
const bodyParser = require('body-parser');
const user = require('./routes/user.route');
const tutor = require('./routes/tutor.route');
/*  ---------------admin-----------------*/


/*  ---------------order-----------------*/
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/OrderManagmentSystem');
const PORT = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/test', function(req, res){
   res.json({
      "Tutorial": "Server is running"
   });
});
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(cors())
app.use('/student', user);
app.use('/tutor', tutor);

app.listen(PORT, function(){
   console.log('Server is running on Port',PORT);
});