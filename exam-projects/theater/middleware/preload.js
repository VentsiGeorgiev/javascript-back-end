// [ ] TODO replace with actual service
const playService = require('../services/play');

function preload(populate) {
   return async function (req, res, next) {
      const id = req.params.id;

      if (populate) {
         // [x] TODO change property name to match collection
         res.locals.play = await playService.getPlayAndUsers(id);
      } else {
         res.locals.play = await playService.getPlayById(id);
      }

      next();
   };
}

module.exports = preload;