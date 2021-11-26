import express, { json } from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import connectDB from './utils/db';
import errorHandler from './middleware/error';

// Route files
import teams from './routes/teams';
import players from './routes/players';

config();

// Connect to the DB
connectDB();

const app = express();

app.use(json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/teams', teams);
app.use('/api/v1/players', players);

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.get('/api/v1/check', (req, res) => res.status(200).send('API is running...'));

app.listen(
  PORT,
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

export default app;
