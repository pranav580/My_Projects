import  express  from 'express';
import bodyParser from 'body-parser';
import Mongoose  from 'mongoose';
import cors from 'cors';

const app = express();

app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors());

const CONNECTION_URL = 'mongodb+srv://pranav:P123456789@cluster0.vvhuo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT