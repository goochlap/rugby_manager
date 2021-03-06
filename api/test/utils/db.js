import { readFileSync } from 'fs';
import path from 'path';
import mongoose from 'mongoose';

import { Team } from '../../src/models/Team';
import { Player } from '../../src/models/Player';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      dbName: process.env.MONGODB_DB
    });
  } catch (err) {
    throw err;
  }
};

const initDB = async () => {
  const teams = JSON.parse(
    readFileSync(path.join(__dirname, '../data/teams.json'), 'utf-8')
  );
  const players = JSON.parse(
    readFileSync(path.join(__dirname, '../data/players.json'), 'utf-8')
  );

  try {
    await Team.create(teams);
    await Player.create(players);
  } catch (err) {
    throw err;
  }
};

const resetDB = async () => {
  try {
    await Team.deleteMany();
    await Player.deleteMany();
  } catch (err) {
    throw err;
  }
};

export { connectDB, initDB, resetDB };
