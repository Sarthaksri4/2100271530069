const express=require('express');
const api=require("./routes/products.js");
const app=express();
const cors=require('cors');
const env=require('dotenv');
env.config();

app.use(cors({

    origin: 'http://localhost:4000'
}));

app.use(express.json());
app.use('/categories',api);

const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{

    console.log(`server is running`);
})