const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const authRouter = require('./Routers/authRouter');


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

app.use('/api/v1/auth', authRouter);

app.use('*', (req, res) => {
    res.status(404).json({ msg: 'not found' });
});

const port = process.env.PORT || 5800;

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}..`);
    });
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });
