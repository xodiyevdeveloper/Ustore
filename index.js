const path = require('path')
const fs = require('fs')
const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const authMiddleware = require('./middlewares/auth-middleware')

const app = express()

app.set('view engine', 'ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/public', express.static('public'))
app.use(cookieParser())
app.use(authMiddleware)

const pathToRoutes = path.join(__dirname, 'routes')
fs.readdir(pathToRoutes, ((err, files) => {
   files.forEach(file => {
      const router = require(path.join(pathToRoutes, file))
      app.use(router.path, router.router)
   })
}))

const PORT =3000
;(async _ => {
   try {
      await mongoose.connect('mongodb://localhost/ustore', { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: true })
      app.listen(PORT, () => {
         console.log(`Server is running on http://localhost:${PORT}`)
      })
   } catch (e) {
      console.log(e)
   }
})()