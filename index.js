//server creation

//steps


//1.import express using require keyword
const express= require('express')  
const dataService=require('./services/data.service')

//import json webtoken
const jwt=require('jsonwebtoken')

//import cors
const cors=require('cors')

//2.server application creation using express
const app=express()  

//cors use in server app
app.use(cors({
    origin:'http://localhost:4200'   
}))

//Parse JSON data
app.use(express.json())


//application specific middleware
const appMiddleware = (req,res,next)=>{
console.log("application specific middleware")
next()
}
//use middleware
app.use(appMiddleware)

//bank server
const jwtMiddleware=(req,res,next)=>{
    //fetch token
   try{
        token=req.body.token
    //verify token
const data=jwt.verify(token,'supersecretkey12345',)
console.log(data)
next()
}
catch{
    res.status(401).json({
Status:false,
statusCode:401,
message:"please login"
    })
}
}

//Bank server
//register API
app.post('/register',(req,res)=>{
//sollving register request
dataService.register(req.body.username,req.body.acno,req.body.password).then (result=>{
    res.status(result.statusCode).json(result)
})
})


//login API
app.post('/login',(req,res)=>{
    //sollving login request
    dataService.login(req.body.acno,req.body.pswd).then (result=>{
        res.status(result.statusCode).json(result)
    })
    })

//deposit API
app.post('/deposit',jwtMiddleware,(req,res)=>{
    //sollving deposit request
    dataService.deposit(req.body.acno,req.body.password,req.body.amt).then (result=>{
    res.status(result.statusCode).json(result)
    })})


    //withdraw API
app.post('/withdraw',(req,res)=>{
    //sollving withdraw request
    dataService.withdraw(req.body.acno,req.body.password,req.body.amt).then(result=>{
    res.status(result.statusCode).json(result)
    })})

    //getTransactions API
app.post('/transactions',(req,res)=>{
    //sollving getTransactions request
   dataService.getTransactions(req.body.acno).then(result=>{
    res.status(result.statusCode).json(result)
   })})




//4.Resolving user's request
    
     //GET request         //To retrieve data which is already created
app.get('/',(req,res)=>{  //http requset and response :fixed arguments
res.send("GET request")
})  

    //POST request    - To create data
app.post('/',(req,res)=>{
    res.send("POST request")
    })

    //PUT request    - To modify entire data
app.put('/',(req,res)=>{
    res.send("PUT request")
    })

    //PATCH request    - To modify partial data
app.patch('/',(req,res)=>{
    res.send("PATCH request")
    })

     //DELETE request    - To delete data
app.delete('/',(req,res)=>{
    res.send("DELETE request")
    })


//3. set up the port number to the server app. eg: for Angular it is 4200 .
app.listen(3000,()=>{
    console.log("sever started at 3000");
})      