var nodemailer = require("nodemailer");
var express = require("express");
var router = express.Router();
var dotenv = require('dotenv').config();
var path = require("path");



router.post('/', function (req, res) {
  console.log('new email',req.body, req.user); // see below

    var mailData = req.body;
    console.log('this is the mailData', mailData);
    // var contactsArray = [req.user.username];
    //taking user and adding their name to contact name



    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'aquaticsempowered@gmail.com', // Your email id
            pass: process.env.GMAIL_PASS // Your password
        } // end auth
    }); // end createTransport

    //building up the body of the email
    var textEmail = "The following facility just registered with Aquatics Empowered, " + mailData.facilityName;
    var htmlEmail = "<div align='center' style='border: 1px solid black;padding:5px 5px; margin: auto auto;'>"
    htmlEmail += "<h1 align=center> The Following facility just registered with Aquatics Empowered: " +''+ "<h1>";
    htmlEmail += "<h1>" + mailData.facilityName + "</h1>"
    htmlEmail += "<h2>" + mailData.facilityName + " is a Level: " + mailData.level + "</h2>";
    htmlEmail += "<h3> Description: " + mailData.facilityDescription + " Located: " + mailData.facilityAddress + "</h3>";
    htmlEmail += "<h4> Contact person: " + mailData.contactPerson + " " + mailData.contacts + "</h4>";
    htmlEmail += "<img src= '" + mailData.photo + "'/>";




    //set up options
    //placing it into this object
    var mailOptions = {
      from: "Aquatics Empowered <aquaticsempowered@gmail.com>", // sender address
      // to: contactsArray, //receiver
      to: "staff.aquatics.empowered@gmail.com",

      subject: 'New Facility registered '+ mailData.facilityName  + ' via Aquatics Empowered', //subject line
      text: textEmail,
      html: htmlEmail,
      attachments: [{   // use URL as an attachment
            filename: mailData.photo,
            path: mailData.photo,
            // path.join(__dirname,'/../public/', mailData.photo )

        }]
    }; // end mailOptions object

    console.log(mailOptions.attachments);

    //send the email
    transporter.sendMail( mailOptions, function(error, message ) {
      //if there was an error, log it
      if (error) {
        console.log(error);
        res.sendStatus(500);
      // else, print success message
      } else {
        console.log('Message %s sent: %s', message.messageId, message.response);
        res.sendStatus(201);
      } // end else
    }); // end sendMail

}); // end post


//cancel email post
router.post('/cancel', function (req, res) {
  console.log('new cancel reservation email',req.body, req.user); // see below

    var mailData = req.body;
    console.log('this is the mailData', mailData);
    // var contactsArray = [req.user.username];
    //taking user and adding their name to contact name


    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'aquaticsempowered@gmail.com', // Your email id
            pass: process.env.GMAIL_PASS // Your password
        } // end auth
    }); // end createTransport

    //building up the body of the email
    var textEmail = "The following facility just cancelled your booking via Aquatics Empowered, " + mailData.facilityName;
    var htmlEmail = "<div align='center' style='border: 1px solid black;padding:5px 5px; margin: auto auto;'>"
    htmlEmail += "<h1 align=center> The Following facility just cancelled your booking via Aquatics Empowered: " +''+ "<h1>";
    htmlEmail += "<h1>" + mailData.facilityName + "</h1>"
    htmlEmail += "<h3>" + mailData.facilityName + " Located at : " + mailData.facilityAddress + "</h3>";
    htmlEmail += "<h4> Please contact: "  + mailData.contactPerson + " " + mailData.contacts + " for more information." + "</h4>";
    htmlEmail += "<p> We're sorry about you cancellation and any inconvenience. Log back into Aquatics Empowered here http://localhost:3000/login to schedule a new reservation <p>";




    //set up options
    //placing it into this object
    var mailOptions = {
      from: "Aquatics Empowered <aquaticsempowered@gmail.com>", // sender address
      // to: contactsArray, //receiver
      to: "ethan.coyne11@gmail.com",

      subject: mailData.facilityName  + ' Cancelled your booking on ' + mailData.cancelledDate + ' at ' + mailData.startTime + ' via Aquatics Empowered ' , //subject line
      text: textEmail,
      html: htmlEmail,
    }; // end mailOptions object


    //send the email
    transporter.sendMail( mailOptions, function(error, message ) {
      //if there was an error, log it
      if (error) {
        console.log(error);
        res.sendStatus(500);
      // else, print success message
      } else {
        console.log('Message %s sent: %s', message.messageId, message.response);
        res.sendStatus(201);
      } // end else
    }); // end sendMail

}); // end post


module.exports = router;
