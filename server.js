const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://rlima:macacoazul@cluster0.9ogabjd.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB: ', err);
  });

// Middlewares
app.use(bodyParser.json());

// Routes
const itemRoutes = require('./routes/itemRoute');
const orderRoutes = require('./routes/orderRoute');
app.use('/items', itemRoutes);
app.use('/orders', orderRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
