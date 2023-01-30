const mongoose = require('mongoose');

mongoose.connect(process.env.DB).then(() =>
    console.log('Suceessfully connected to database')).catch((error) =>
        console.log(error)
        );
         

mongoose.promise = global.promise;