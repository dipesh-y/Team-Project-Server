import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';    
import helmet from 'helmet';
import connectDB from './config/connectDb.js';
import userRouter from './route/useroute.js'


dotenv.config();

const app = express();


app.use(cors());
// app.options('/*', cors());

app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(helmet({
    crossOriginResourcePolicy: false
}));
  
const PORT  = 8080 || process.env.PORT 

app.get("/", (req, res) => {
    res.json({
        message: `Server is running on port ${process.env.PORT}`
    });
});  

app.use('/api/user',userRouter)
// Connect DB and start server
connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log("✅ Server is running on port", process.env.PORT);
    });
});