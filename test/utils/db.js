import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

import { Team } from '../../src/models/Team';

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
    fs.readFileSync(
      `/home/gautier/code/goochlap/rugby_manager_api/test/data/teams.json`,
      'utf-8'
    )
  );

  try {
    await Team.create(teams);
  } catch (err) {
    throw err;
  }
};

const resetDB = async () => {
  try {
    await Team.deleteMany();
  } catch (err) {
    throw err;
  }
};

export { connectDB, initDB, resetDB };
