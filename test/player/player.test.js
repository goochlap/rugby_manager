import colors from 'colors';
import request from 'supertest';
import { expect } from 'chai';
import api from '../utils/api';
import app from '../../src/server';

describe('Player Flow', () => {
  // Init datas to reuse in tests
  let id;

  describe('GET /players', () => {
    it('it should return 200 status code & several players', async () => {
      const response = await request(api)
        .get('/players')
        .expect(200)
        .expect('Content-Type', /json/);

      const players = response.body.players;

      id = players[0]._id;

      expect(players).length.to.be.greaterThan(0);
    });
  });
});
