const express=require('express');
const cors=require('cors');

const app=express();

// app.use(express.json());
// app.use(express.urlencoded({extended:true}));

app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}))

app.get('/Hoy',()=>{
    console.log("Yeea heee")
})

app.listen(3004,()=>{
    console.log("I'm Listening...")
});