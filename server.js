const express = require('express')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/user.model.js')
require(`dotenv`).config()
const dbuser = process.env.DB_USER
const dbpass = process.env.DB_PASS

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', async(req, res) => {
  const {email, password} = req.body
  
  if (!email) {
    return res.status(422).json({ msg: "Campo e-mail obrigatorio!" })
  }
  if (!password) {
    return res.status(422).json({ msg: "Campo senha obrigatorio!" })
  }

  const user = new User({
    email,
    password,
  })

  try {
    await user.save()
    res.status(201)
  } catch (error) {
    console.log(error)
    res.status(500)
  }
});

mongoose
  .connect(`mongodb+srv://${dbuser}:${dbpass}@clusterfacebookfishing.gfibctu.mongodb.net/`)
  .then(() => {
    app.listen(3000, () => {
      console.log('Server running on port 3000')
    });
    console.log('conectou ao banco')
}).catch((err) => console.log(err))
