const nodemailer = require('nodemailer')

// const defaultConfig = 'smtps://tatanahrustaleva79@gmail.com:1597534682555236014646&smtp.gmail.com'

const transporter = nodemailer.createTransport({
    pool: true,
    // maxConnections: 8,
    // maxMessages: 'Infinity',
    // rateLimit: 100,
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465 false for oteher ports
    auth: {
        user: 'tatanahrustaleva79@gmail.com',
        pass: '1597534682555236014646'
    }
}, {
    from: 'Запрос стать сурогатной мамой <tatanahrustaleva79@gmail.com>'
});

transporter.verify((error, sucess) => {
    error ? console.log(error) :
        console.log('Server is ready to take our message:', sucess);
});

  const mailer = message => {
      transporter.sendMail(message, (err, info) => {
          if(err) return console.log(err)
          console.log('Email sent: ', info)
      })
  };

  module.exports = mailer;