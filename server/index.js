import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

// Routers
import InfoRouter from './routes/InfoRoute.js'



const app = express();
app.use(cors());
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });
app.options('*', cors());


app.use('/', InfoRouter)

const PORT  = process.env.PORT || 5000;

app.listen(PORT, () => {
    return console.log(`${'Sever is running at' + PORT}`)
})