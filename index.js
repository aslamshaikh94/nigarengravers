const express = require('express')
const nodemailer = require('nodemailer')
const path = require('path')
const app = express()
app.use(express.json())

app.use(express.static(path.join(__dirname, '/build')))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/build', 'index.html'))
})

app.post('/mail', (req, res) => {
  const { name, email, mobile, message } = req.body
  let transporter = nodemailer.createTransport({
    host: 'mail.nigarengravers.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false
    }
  })

  let mailOptions = {
    from: process.env.EMAIL,
    to: process.env.EMAIL,
    subject: 'Get in Touch',
    html: `<h4>${name}</h4> <p>${email}</p> <p>${mobile}</p> <p>${message}</p>`
  }

  transporter.sendMail(mailOptions, (error, success) => {
    if (error) {
      res.status(400).json({ message: error })
    } else {
      res.status(200).json({
        message: `An email has been sent to ${email} please check your inbox`
      })
    }
  })
})

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '/build', 'index.html'))
})

// Server setup
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log('Server is running ' + PORT)
})
