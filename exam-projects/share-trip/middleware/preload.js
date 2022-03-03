// [x]TODO replace with actual service
const tripService = require('../services/trip');

function preload(populate) {
   return async function (req, res, next) {
      const id = req.params.id;

      if (populate) {
         // [x] TODO change property name to match collection
         res.locals.trip = await tripService.getTripAndUsers(id);
      } else {
         res.locals.trip = await tripService.getTripById(id);
      }

      next();
   };
}

module.exports = preload;