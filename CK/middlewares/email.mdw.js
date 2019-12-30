
var nodemailer = require('nodemailer');

module.exports = {
    send: (receiver, description) => {  
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'auctionwebsiteltw@gmail.com',
              pass: 'admin123!'
            },
            tls: {
                rejectUnauthorized: false
            }
        });
          
        var mailOptions = {
            from: 'auctionwebsiteltw@gmail.com',
            to: receiver,
            subject: 'Sending Email using Node.js',
            text: description
        };
          
        return transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
        });
    }
}