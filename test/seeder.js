import colors from 'colors';
import { config } from 'dotenv';
import fs from 'fs';

config();

import { connectDB } from './utils/db';

import { Team } from '../src/models/Team';

connectDB();

const teams = JSON.parse(
  fs.readFileSync(
    `${__dirname}/data/teams.json`,
    'utf-8'
  )
);

const importData = async () => {
  try {
    await Team.create(teams);

    console.log('Data imported...'.brightGreen);
  } catch (err) {
    throw err;
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Team.deleteMany();

    console.log('Data destroyed'.brightRed);
  } catch (err) {
    throw err;
  }
  process.exit();
};

// To run the seeder.js in the shell ==> npm run seeder [option]
if (process.argv[2] === 'import') {
  importData();
} else if (process.argv[2] === 'delete') {
  deleteData();
}
