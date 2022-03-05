function isUser() {
   return function (req, res, next) {
      if (req.session.user) {
         next();
      } else {
         res.redirect('/login');
      }
   };
}

function isGuest() {
   return function (req, res, next) {
      if (req.session.user) {
         res.redirect('/');
      } else {
         next();
      }
   };
}

// function isOwner() {
//    return function (req, res, next) {
//       const userId = req.session.user?._id;
//       console.log(`--- user ID motherfuckers ! ${userId}`);
//       // console.log(`----- user id ${req.session.user._id}`);
//       // console.log(`----- owner id of the play ${res.locals.play.owner._id}`);
//       // TODO change property name to match collection
//       if (req.session.user) {
//          if (req.session.user._id == res.locals.play.owner._id) {
//             next();
//          }
//       } else {
//          res.redirect('/')
//       }
//    };
// }

function isOwner() {
   return function (req, res, next) {
      const userId = req.session.user?._id;
      if (res.locals.play.owner._id == userId) {
         next();
      } else {
         res.redirect('/login')
      }
   };
}

module.exports = {
   isUser,
   isGuest,
   isOwner
};