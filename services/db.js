//db connection



//import mongoose
const mongoose= require ('mongoose')

//Connect server and database 
mongoose.connect('mongodb://localhost:27017/BankApp',
                {useNewUrlParser:true})

                
//model defnition
const User = mongoose.model('User',
                            {
                                acno: Number, 
                                username: String,
                                password: String,
                                balance: Number,
                                transactions:[]   
                            })

//export model name
 module.exports={User}                           