const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Sekka', 
{useNewUrlParser: true, useUnifiedTopology: true});