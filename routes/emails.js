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

    //
    // mailData.contacts.forEach(function (aContact) {
    //   contactsArray.push('"'+ aContact.contactname +'" <' +aContact.contactemail+'>');
    // });
    //  console.log(contactsArray);



    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'aquaticsempowered@gmail.com', // Your email id
            pass: process.env.GMAIL_PASS // Your password
        } // end auth
    }); // end createTransport

    //building up the body of the email
    var textEmail = "hello World"
// mailData.babyName + " is " + mailData.months + mailData.monthsText + "!\n";
    var htmlEmail = "<div align='center' style='border: 1px solid black;padding:5px 5px; margin: auto auto;'>"
    htmlEmail += "<h1 align=center> hello world <h1>"
    // "<h1 align='center'>" + mailData.babyName +  " </h1>";
    htmlEmail += "<h2> hello world </h2>"
    // "<h2>" + mailData.months + mailData.monthsText + "</h2>";


    // mailData.aches.forEach( function (indivAch) {
    //   textEmail += indivAch.achievement_completed_date_string + " -- " + indivAch.achievement_completed_text + " -- " + indivAch.achievement_completed_comment;
    //
    //   htmlEmail += "<p style='font-size:1.5em;'>" + indivAch.achievement_completed_date_string + " -- " + indivAch.achievement_completed_text + " -- " + indivAch.achievement_completed_comment + "</p>";
    // });



    //set up options
    //placing it into this object
    var mailOptions = {
      from: "Aquatics Empowered <aquaticsempowered@gmail.com>", // sender address
      // to: contactsArray, //receiver
      to: "rukia.sm.23@gmail.com",

      subject: 'New Facility registered '+ mailData.facilityName  + ' via Aquatics Empowered', //subject line
      text: 'The following facility just registered with Aquatics Empowered, ' + mailData.facilityName, //textEmail, // plain text
      html: 'The following facility just registered with Aquatics Empowered, ' + mailData.facilityName, //htmlEmail, //html
      attachments: [{   // use URL as an attachment
            filename: mailData.photo,
            path: path.join(__dirname,'/../public/', mailData.photo )
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


module.exports = router;
