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

    it('it should have valid players', async () => {
      const response = await request(api)
        .get('/players')
        .expect(200)
        .expect('Content-Type', /json/);

      const players = response.body.players;

      expect(players).to.be.an('array');

      players.forEach((player) => {
        expect(player.firstName).to.be.a('string');
        expect(player.lastName).to.be.a('string');
        expect(player.nickName).to.be.a('string');
        expect(player.position).to.be.a('string');
        expect(player.salary).to.be.a('number');
        expect(player.height).to.be.a('number');
        expect(player.weight).to.be.a('number');
        expect(player.birthday).to.be.a('string');
        expect(player.birthplace).to.be.a('string');
        expect(player.biography).to.be.a('string');
        expect(player.team._id).to.be.a('string');
      });
    });
  });
});
