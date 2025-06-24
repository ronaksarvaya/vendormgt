// server.js or index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Vendor = require('./models/Vendor');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://ronak_lead:adityagadhvi@cluster0.h5i2dye.mongodb.net/Assignment')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.post('/api/vendors', async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).json({ message: 'Vendor created' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(5000, () => console.log('Server started on port 5000'));
