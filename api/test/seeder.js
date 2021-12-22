import colors from 'colors';
import { config } from 'dotenv';
import fs from 'fs';

config();

import { connectDB } from './utils/db';

import { Team } from '../src/models/Team';
import { Player } from '../src/models/Player';
import { User } from '../src/models/User';

connectDB();

const teams = JSON.parse(fs.readFileSync(`${__dirname}/data/teams.json`, 'utf-8'));
const players = JSON.parse(
  fs.readFileSync(`${__dirname}/data/players.json`, 'utf-8')
);

const importData = async () => {
  try {
    await Team.create(teams);
    await Player.create(players);

    console.log('Data imported...'.brightGreen);
  } catch (err) {
    throw err;
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Team.deleteMany();
    await Player.deleteMany();
    await User.deleteMany();

    console.log('Data destroyed...'.brightRed);
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
