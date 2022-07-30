


// Importing required libraries
// const cron = require("node-cron");
const nodemailer = require("nodemailer");
const schedule = require('node-schedule');

const admin_info = require("../model/Admin_model");
const Mail_model = require("../model/Mail_model");

  exports.sendsingleemailtocust = function(req, res)
  {
    // res.send("ok")
  

const job = schedule.scheduleJob(' 59 17  * * * *', function(){

  async function  check(params) 
  {

    let email ={ email: req.body.email };
    // let bcc = req.body.bcc ;
    // let cc =req.body.cc ;
    // let name =req.body.name ;
    // let mgs = req.body.mgs ;
    // let subject = req.body.subject ;


    const user = await admin_info.findOne(email);


    if (!user)
    {
     res.send({ message: "Invalid Email" });

    }

    else
    {
      // res.send("yes")
      var path = "http://localhost:3000/Sendmsgform/"+user.email;
      var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,  
        service: 'Gmail',
        auth: {
          user: 'kharemani22@gmail.com',
          pass: 'gpjgibiibxglzrgi' }
          });

        var mailOptions = {
          
        from: user.email,
        to: user.email,
        // subject: subject,
        text: 'Your text is here',
        html: `
                  <p>Email: ${user.email}</p>
               
                  <p>path:${path}</p>` 
                  } 

       var status = transporter.sendMail(mailOptions, function(error)
       {

        if (error) 
        {
          console.log(error);       
        } 
        else 
        {
          res.send("success"); 
          console.log("email send")
                
        }
        });
     }


  }

check();
console.log('The answer to life, the universe, and everything!');
 });
  
    
  }




  exports.sendemailtoMulcust =function(req,res)
  {

    const job = schedule.scheduleJob('  59 17 * * * *', function(){
    async function   check(params) 
    {

    

      let email = req.body ;
     const ids =  email ;
    console.log(ids)
    //  let bcc = req.body.bcc ;
    //  let cc =req.body.cc ;
    //  let mgs = req.body.mgs ;
    //  let subject = req.body.subject ;
   
     const user = await admin_info.find({ 'email' : ids  });
      console.log(user)
    
      for(var i=0;i<user.length;i++)
      {
        var path = "http://localhost:3000/Sendmsgform/"+user.email;
       
          var transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,  
            service: 'Gmail',
            auth: {
                user: 'kharemani22@gmail.com',
                pass: 'gpjgibiibxglzrgi' }
                });
              
              var mailOptions = {
                
               from: user[i].email,
               to: user[i].email,
              //  subject: subject,
               text: 'Your text is here',
               html: `
               <p>Email: ${user.ids}</p>
             
               <p>path:${path}</p>
             `
                      
              }
              
             var status = transporter.sendMail(mailOptions, function(error)
             {
              
                if (error) 
                {
                   console.log(error);       
                } 
                else 
                {
                   res.send("success"); 
                   console.log("email send")
                  
                  //  res.send({token:user.token} );
                       
               }
              });
            
      }

   }

    check();
    console.log(' Mutiple Email Send');
  });

  }


 
    exports.sendinsert=async function(req,res)
    {
      const Employees = new Mail_model(req.body)
      try{
          await Employees.save()
          res.status(201).json({
              status: 'Success',
              data : {
                  Employees
              }
          })
      }catch(err){
          res.status(500).json({
              status: 'Failed',
              message : err
          })
      }
    }


exports.sendremainingmail=function(req,res)
{
  var sendEmployeesemail = [];
  var recievedEmployeesemail = [];


  Mail_model.find((error, data) => {
    if (error) {
      res.json({Mail_model:error})
    } 
    else {

  
      // console.log(doc)
      var arr_raw = data.map(function(obj) {
      return obj.email;
          });
    
    // res.send(arr_raw);
    // console.log(arr_raw);
    recievedEmployeesemail=arr_raw;
    // console.log(recievedEmployeesemail)
    }
     
    
    // console.log(arr_raw);// var newData = {
      //   "Order_id":++oderId,
      // }
  })
  // console.log(recievedEmployeesemail)
  // res.send("ok");
  admin_info.find((error, data) => {
    if (error) {
      res.json({Mail_model:error})
    } 
    else {

  
      // console.log(doc)
      var arr_raw = data.map(function(obj) {
      return obj.email;
          });
    
    // res.send(arr_raw);
    // console.log(arr_raw);
    sendEmployeesemail=arr_raw;
    // console.log(sendEmployeesemail)



    }
    
    for(var i=0;i<sendEmployeesemail.length;i++)
    for(var j=0;j<recievedEmployeesemail.length;j++)
   
    if(sendEmployeesemail[i].email ==recievedEmployeesemail[j] .email){
     
      console.log("match")
      console.log(recievedEmployeesemail[i].email)
    
    
     


      // var arr_3days = recievedEmployeesemail.reduce((arr_3days, thing) => {
      //   if (threedaysago<thing.date_r.toLocaleString()) {
      //     arr_3days.push(thing.RM1,thing.RM2,thing.RM3);
      //   }
      //   return arr_3days;
      //   }, []);
        { break; }
    }
    
   
})

      // else{
      //   console.log("unmatch")
      // }
     
   



}