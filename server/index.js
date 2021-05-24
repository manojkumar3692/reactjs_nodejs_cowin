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
app.options('*', cors());

app.use('/', InfoRouter)

const PORT  = process.env.PORT || 3000;

app.listen(PORT, () => {
    return console.log(`${'Sever is running at' + PORT}`)
})