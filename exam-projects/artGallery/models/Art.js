const { Schema, model, Types: { ObjectId } } = require('mongoose');

// TODO* add validations

const URL_PATTERN = /^https?:\/\/(.+)/;
const CERTIFICATE_PATTERN = /^(Yes|No)$/;


const artSchema = new Schema({
   title: { type: String, minlength: [6, 'Title should be a minimum of 6 characters long'] },
   technique: { type: String, required: true, maxlength: [6, 'Painting technique should be a maximum of 15 characters long'] },
   imgUrl: {
      type: String, validate: {
         validator(value) {
            return URL_PATTERN.test(value)
         },
         message: 'Art picture should start with http:// or https://'
      }
   },
   certificate: {
      type: String, validate: {
         validator(value) {
            return CERTIFICATE_PATTERN.test(value)
         },
         message: 'Certificate of authenticity there must be "Yes" or "No"'
      }
   },
   owner: { type: ObjectId, ref: 'User', required: true },
   users: { type: [ObjectId], ref: 'User', default: [] },
});

const Art = model('Art', artSchema);

module.exports = Art;