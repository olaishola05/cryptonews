const express = require('express');
const { StatusCodes } = require('http-status-codes');
const newsRoute = require('./routes/newsRoute');
const resourceNotFound = require('./middleware/notFound');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());

// root
app.get('/', (req, res) => {
  res.status(StatusCodes.OK).send('<h3><a href="api/v1/news">Crypto news at your fingertips</a></h3>');
});

// API Route
app.use('/api/v1/news', newsRoute);
app.use(resourceNotFound);

// server
const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
