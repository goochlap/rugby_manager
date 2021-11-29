import colors from 'colors';
import request from 'supertest';
import { expect } from 'chai';
import { config } from 'dotenv';
import api from './utils/api';
import app from '../src/server';

config();

describe('GET /api/v1/check', () => {
  it('it should return 200 status code', async () => {
    const response = await request(api).get('/check');

    expect(response.status).to.eql(200);
    expect(response.text).to.equal('API is running...');
  });
});
