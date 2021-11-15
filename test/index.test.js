import request from 'supertest';
import { expect } from 'chai';
import { config } from 'dotenv';
import api from './utils/api';

config();

describe('GET /api/v1/check', () => {
  it('it should return 200 status code', async () => {
    const response = await request(api).get('/api/v1/check');

    expect(response.status).to.eql(200);
    expect(response.text).to.equal('API is running...');
  });
});
