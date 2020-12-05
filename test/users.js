import supertest from 'supertest';
import { expect } from 'chai';

const URL = 'https://gorest.co.in/public-api/';
const TOKEN = '54bc888cacb5831ca31d58d66130397fba876d8ef5f26b4a108996f43e000994';
const request = supertest(URL);

describe('Users', () => {
  it('GET /users', done => {
    request.get(`users?access-token=${ TOKEN }`).end((err, res) => {
      expect(res.body.data).to.not.be.empty;
      // done() prevents Mocha from passing the test before completing asynchronous API call:
      done();
    });
  });
});
