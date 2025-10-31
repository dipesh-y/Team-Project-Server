import http from 'http';
// const http = require("http");

import nodemailer from 'nodemailer';

//configure the SMPT transporter

const transporter =  nodemailer.createTransport({
    host:'smtp.gmail.com',
    port:465,
    secure : true,
    auth:{
        user: process.env.EMAIL,
        pass:process.env.EMAIL_PASS,
    },
});


//Function to send email
async function sendEmail(to,subject,html){
    try{
        const info = await transporter.sendMail({
            from: process.env.EMAIL,
            to,
            subject,
            html,
        });
        console.log("Emial sent:",info.messageID);
    }
    catch(error){
        console.error("Error sending email:",error);
    }
    }

 
export {sendEmail};

