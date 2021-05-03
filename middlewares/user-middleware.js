function ifUserDontEnter(req, res, next) {
   if (req.user) {
      res.redirect('/')
   }

   next()
}

function ifNotUserDontEnter(req, res, next) {
   if (!req.user) {
      res.redirect('/')
   }

   next()
}

module.exports = { ifUserDontEnter, ifNotUserDontEnter }