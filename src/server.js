import express, { json } from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import colors from 'colors';
import connectDB from './utils/db';

// Route files
import teams from './routes/teams';

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

const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(
    `🚀 Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
