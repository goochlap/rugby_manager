import express, { json } from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';

config();

const app = express();

app.use(json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) =>
  res.status(200).send({
    message: 'Server is up'
  })
);

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
