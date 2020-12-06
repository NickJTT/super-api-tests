import supertest from 'supertest';
import { expect } from 'chai';

const URL = 'https://gorest.co.in/public-api/';
const request = supertest(URL);

const TOKEN = '54bc888cacb5831ca31d58d66130397fba876d8ef5f26b4a108996f43e000994';
const ID = 1;

describe('Users', () => {
  it('GET /users', done => {
    request.get(`users?access-token=${ TOKEN }`).end((err, res) => {
      expect(res.body.data).to.not.be.empty;
      // done() prevents Mocha from passing the test before completing asynchronous API call:
      done();
    });
  });

  it('GET /users/:id', () => {
    return request.get(`users/${ ID }?access-token=${ TOKEN }`).then(res => {
      expect(res.body.data.id).to.be.eq(ID);
    });
  });

  it('GET /users with query params', () => {
    const page = 5;
    const gender = 'Female';
    const status = 'Active';
    const url = `users?access-token=${TOKEN}&page=${page}&gender=${gender}&status=${status}`;

    return request.get(url).then(res => {
      expect(res.body.data).to.not.be.empty;
      res.body.data.forEach(item => {
        expect(item.gender).to.eq(gender);
        expect(item.status).to.eq(status);
      });
    });
  });
});
