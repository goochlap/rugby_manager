import colors from 'colors';
import request from 'supertest';
import { expect } from 'chai';
import { config } from 'dotenv';
import api from './utils/api';
import app from '../src/server';

import { connectDB, initDB, resetDB } from './utils/db';

config();

describe('GET /api/v1/check', () => {
  it('it should return 200 status code', async () => {
    const response = await request(api).get('/check');

    expect(response.status).to.eql(200);
    expect(response.text).to.equal('API is running...');
  });
});

describe('Team Flow', () => {
  before(async () => {
    try {
      await connectDB();
      await resetDB();
      await initDB();
    } catch (err) {
      throw new Error(err);
    }
  });

  describe('it should GET all teams', () => {
    it('it should return 200 status code & several teams', async () => {
      const response = await request(api)
        .get('/teams')
        .expect(200)
        .expect('Content-Type', /json/);

      const teams = response.body.data;

      expect(teams).length.to.be.greaterThan(0);
    });

    it('it should have valid teams', async () => {
      const response = await request(api)
        .get('/teams')
        .expect(200)
        .expect('Content-Type', /json/);

      const teams = response.body.data;

      expect(teams).to.be.an('array');

      teams.forEach((team) => {
        expect(team.name).to.be.a('string');
        expect(team.description).to.be.a('string');
        expect(team.address).to.be.a('string');
      });
    });
  });
});
