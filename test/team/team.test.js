import colors from 'colors';
import request from 'supertest';
import { expect } from 'chai';
import api from '../utils/api';
import app from '../../src/server';

describe('Team Flow', () => {
  // Init datas to reuse in tests
  let id;

  describe('GET /teams', () => {
    it('it should return 200 status code & several teams', async () => {
      const response = await request(api)
        .get('/teams')
        .expect(200)
        .expect('Content-Type', /json/);

      const teams = response.body.data;

      id = teams[0]._id;

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
        expect(team.website).to.be.a('string');
        expect(team.phone).to.be.a('string');
        expect(team.email).to.be.a('string');
        expect(team.budget).to.be.a('number');
      });
    });
  });

  describe('GET /teams/:id', () => {
    it('it should return a single team', async () => {
      const response = await request(api)
        .get(`/teams/${id}`)
        .expect(200)
        .expect('Content-Type', /json/);

      const team = response.body.data;

      expect(team).to.be.an('object');
      expect(team._id).to.equal(id);
      expect(team.name).to.be.a('string');
      expect(team.description).to.be.a('string');
      expect(team.address).to.be.a('string');
      expect(team.website).to.be.a('string');
      expect(team.phone).to.be.a('string');
      expect(team.email).to.be.a('string');
      expect(team.budget).to.be.a('number');
    });
  });

  describe('POST /teams', () => {
    it('it should create a team', async () => {
      const testTeam = {
        name: 'Kenya national rugby union team',
        description:
          "The Kenya national rugby union team is also known as the Simbas (simba is Swahili for 'lion'). Kenya competes in the Africa Cup and is ranked thirty-second in the World Rugby Rankings as of July 2019. Kenya is yet to qualify for the Rugby World Cup.",
        address: 'Ngong Road, Nairobi, Kenya',
        website: 'https://www.kenyarut.com',
        phone: '555 452 456',
        email: 'supporterservices@kenyarut.net',
        budget: 3000000
      };

      const postResponse = await request(api)
        .post('/teams')
        .send(testTeam)
        .expect(201)
        .expect('Content-Type', /json/);

      const teamId = postResponse.body.data._id;
      expect(teamId).to.be.a('string');

      const getResponse = await request(api)
        .get(`/teams/${teamId}`)
        .expect(200)
        .expect('Content-Type', /json/);

      const team = getResponse.body.data;
      expect(team).to.be.an('object');

      expect(team).to.be.an('object');
      expect(team._id).to.equal(teamId);
      expect(team.name).to.equal(testTeam.name);
      expect(team.description).to.equal(testTeam.description);
      expect(team.address).to.equal(testTeam.address);
      expect(team.website).to.equal(testTeam.website);
      expect(team.phone).to.equal(testTeam.phone);
      expect(team.email).to.equal(testTeam.email);
      expect(team.budget).to.equal(testTeam.budget);
    });
  });

  describe('DELETE /teams/:id', () => {
    it('should delete a team', async () => {
      const getResponse = await request(api)
        .get(`/teams/${id}`)
        .expect(200)
        .expect('Content-Type', /json/);

      const team = getResponse.body.data;
      expect(team).to.be.an('object');

      const deleteResponse = await request(api)
        .delete(`/teams/${team._id}`)
        .expect(204);

      expect(deleteResponse.body).to.be.empty;
    });
  });
});
