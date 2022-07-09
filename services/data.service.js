//import jsonWEBtoken

const jwt=require('jsonwebtoken')

//import db
const db=require('./db')


// //DATABASE
// db = {
//     1000: { "acno": 1000, "username": "Neer", "password": 1000, "balance": 5000,transactions:[]},
//     1001: { "acno": 1001, "username": "Laisha", "password": 1001, "balance": 5000 ,transactions:[]},
//     1002: { "acno": 1002, "username": "Vypm", "password": 1002, "balance": 3000,transactions:[]}
//   }

//Register
const register=(username, acno, password) =>{    //copy it from ts file of BankApplication ,then convert function to arrow function
    //asynchronous
    return db.User.findOne({
      acno
    }).then (user=>{
    console.log(user)  
    if (user){
      return{
        status:false,
        message:"Already registered ! please login!!!",
        statusCode:401
      }
    }
    else{
    const newUser = new db.User({
        acno,
        username,
        password,
        balance:0,
        transactions:[]
      })
      newUser.save()
      return{
        status:true,
        message:"Registered successfully",
        statusCode:200

      }
    }
    })
  }
   
//login
 const login=(acno, pswd) =>{
 return db.User.findOne({
acno,
password:pswd
 }).then(user=>{
   if(user){
     console.log(user)
     currentUser=user.username
     currentAcno=acno
      //Token generation
      token=jwt.sign({
        currentAcno:acno             //store  account number inside the token
      },'supersecretkey12345')
   
  return{
         status:true,
         message:"login successful",
         statusCode:200,
         currentUser,
         currentAcno,
         token
       } 
   } 
  else{
  return{
    status:false,
    message:"invalid account number or password",
    statusCode:401
  }
}
}
)} 
//deposit
  const deposit=(acno,passsword, amt) => {

    var amount = parseInt(amt)
    return db.User.findOne({
      acno,passsword
    }).then(user=>{
      if(user){
        user.balance+=amount
        user.transactions.push({
          type:"CREDIT",
          amount:amount
        })
        user.save()
        return {
       status:true,
       message:amount+"credited successfully .. New balance is " + user.balance,
      statusCode:200
      }
      }
     else {
      return{
        status:false,
        message:"Invalid account number or password",
        statusCode:401
    }
    }
  })}
  

     

  //withdraw
  const withdraw=(acno, passsword, amt)=> {

    var amount = parseInt(amt)
    return db.User.findOne({
      acno,passsword
    }).then(user=>{
      if(user){
      if(user.balance>amount){
        user.balance-=amount
        user.transactions.push({
          type:"DEBIT",
          amount :amount
        })
      user.save()
      return  {
        status:true,
        message:amount + " debited successfully.New balance is " +user.balance,
        statusCode:200
       }
       } else  {
          return{
            status:false,
            message:"insufficient balance",
            statusCode:401
        }
        }
       } 
       else{
         return{
           satus:false,
          message:"invalid account number or password",
          statusCode:401
         }
       }})}
 
  //transactions
 const getTransactions=(acno)=>{
   return db.User.findOne({
     acno
   }).then(user=>{
     if(user){
       return{
         status:true,
        statusCode:200,
      transactions:user.transactions
     }
     }
     else{
       return{
         status:false,
         message:"user does not exist!!!",
         statusCode:401
       }
     }
   })
 }

  //Export
  module.exports={
    register,
    login,
    deposit,
    withdraw,
    getTransactions
    
}