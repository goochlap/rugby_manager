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

  describe('GET /players/:id', () => {
    it('it should return a single player', async () => {
      const response = await request(api)
        .get(`/players/${id}`)
        .expect(200)
        .expect('Content-Type', /json/);

      const player = response.body.player;

      expect(player).to.be.an('object');
      expect(player._id).to.equal(id);
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

  describe('POST /players', () => {
    it('it should create a player', async () => {
      const testPlayer = {
        firstName: 'Rémi',
        lastName: 'Lamerat',
        nickName: 'winemaker',
        position: 'outside centre',
        salary: 320000,
        height: 184,
        weight: 105,
        birthday: '1990-01-14',
        birthplace: 'Sainte-Foy-la-Grande',
        biography:
          "Rémi Lamerat, né le 14 janvier 1990, est un joueur international français de rugby à XV évoluant au poste de centre. Formé au Stade toulousain, il ne s'impose pas et quitte le club pour rejoindre le Castres olympique afin d'avoir plus de temps de jeu tout en restant au sein de l'élite du rugby hexagonal."
      };

      const postResponse = await request(api)
        .post('/teams/5d713995b721c3bb38c1f002/players')
        .send(testPlayer)
        .expect(201)
        .expect('Content-Type', /json/);

      const playerId = postResponse.body.player._id;
      expect(playerId).to.be.a('string');

      const getResponse = await request(api)
        .get(`/players/${playerId}`)
        .expect(200)
        .expect('Content-Type', /json/);

      const player = getResponse.body.player;
      id = player._id;

      expect(player).to.be.an('object');
      expect(player._id).to.equal(playerId);
      expect(player.firstName).to.equal(testPlayer.firstName);
      expect(player.lastName).to.equal(testPlayer.lastName);
      expect(player.nickName).to.equal(testPlayer.nickName);
      expect(player.position).to.equal(testPlayer.position);
      expect(player.salary).to.equal(testPlayer.salary);
      expect(player.height).to.equal(testPlayer.height);
      expect(player.weight).to.equal(testPlayer.weight);
      expect(player.birthday).to.equal(testPlayer.birthday);
      expect(player.birthplace).to.equal(testPlayer.birthplace);
      expect(player.team._id).to.be.equal('5d713995b721c3bb38c1f002');
    });
  });

  describe('PUT /players/:id', async () => {
    it('should update a player', async () => {
      const testPlayer = {
        firstName: 'Rémi 2.0',
        lastName: 'Lamerat 2.0',
        nickName: 'winedrinker',
        position: 'inside centre',
        salary: 357000,
        height: 184,
        weight: 109,
        birthday: '1990-01-14',
        birthplace: 'Sainte-Foy-la-Grande',
        biography:
          "Rémi Lamerat, né le 14 janvier 1990, est un joueur international français de rugby à XV évoluant au poste de centre. Formé au Stade toulousain, il ne s'impose pas et quitte le club pour rejoindre le Castres olympique afin d'avoir plus de temps de jeu tout en restant au sein de l'élite du rugby hexagonal."
      };

      const putResponse = await request(api)
        .put(`/players/${id}`)
        .send(testPlayer)
        .expect(200)
        .expect('Content-Type', /json/);

      const updatedPlayer = putResponse.body.player;
      expect(updatedPlayer._id).to.equal(id);

      const getResponse = await request(api)
        .get(`/players/${id}`)
        .expect(200)
        .expect('Content-Type', /json/);

      const player = getResponse.body.player;

      expect(player).to.be.an('object');
      expect(player._id).to.equal(id);
      expect(player.firstName).to.equal(testPlayer.firstName);
      expect(player.lastName).to.equal(testPlayer.lastName);
      expect(player.nickName).to.equal(testPlayer.nickName);
      expect(player.position).to.equal(testPlayer.position);
      expect(player.salary).to.equal(testPlayer.salary);
      expect(player.height).to.equal(testPlayer.height);
      expect(player.weight).to.equal(testPlayer.weight);
      expect(player.birthday).to.equal(testPlayer.birthday);
      expect(player.birthplace).to.equal(testPlayer.birthplace);
    });
  });
});
