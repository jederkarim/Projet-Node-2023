require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));


require("./database/Connect");
require('./PassPort/bearer');

app.use((err,req,res,next)=>{
    res.status(422).send({error:err.message})
});

const companyRoute = require('./routes/companyRoute');
const authRoute = require('./routes/authentificat.Route')
const eventRoute = require('./routes/eventRoute')
const tagsRoute = require('./routes/tagsRoute')
const reservationRoute = require('./routes/reservationRoute')





app.use('/api',companyRoute);
app.use('/api',authRoute );
app.use('/api',eventRoute );
app.use('/api',tagsRoute);
app.use('/api',reservationRoute );






const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}!`));