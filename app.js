import express from 'express';
import { PORT } from './config/env.js';
const app = express();
app.get('/',(req,res) => {
    res.send('Hi from API')
});
app.listen(3000,()=>{
    console.log(`API Server running on ${PORT}`);
});
export default app;