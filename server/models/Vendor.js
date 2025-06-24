const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  vendorName: { type: String, required: true },
  bankAccount: { type: String, required: true },
  bankName: { type: String, required: true },
  address1: String,
  address2: { type: String, required: true },
  city: String,
  country: String,
  zip: String
});

module.exports = mongoose.model('Vendor', vendorSchema);
