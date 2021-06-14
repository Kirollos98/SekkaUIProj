const express = require('express');
const cors = require('cors');
const apiRouter = require('./routers/api');
require("./Database/Mongoose.js");
const app = express();

app.use(cors())
//app.use(express.bodyParser());
app.use(express.json());

app.use('/api', apiRouter);

app.listen(3344, () => {
    console.log('started listening on port 3344');
});
