// [x] TODO replace with actual service and change play...
const xService = require('../services/x');

function preload(populate) {
   return async function (req, res, next) {
      const id = req.params.id;

      if (populate) {
         // [x] TODO change property name to match collection
         res.locals.realEstate = await xService.getXAndUsers(id);
      } else {
         res.locals.realEstate = await xService.getXById(id);
      }

      next();
   };
}

module.exports = preload;