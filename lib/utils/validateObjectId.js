const mongoose = require('mongoose');

function validateObjectId(id) {
  if (!id) {
    return false;
  }
  return mongoose.Types.ObjectId.isValid(id);
}

module.exports = validateObjectId;

