import supertest from 'supertest';
import { expect } from 'chai';

const URL = 'https://gorest.co.in/public-api/';
const request = supertest(URL);

const TOKEN = '54bc888cacb5831ca31d58d66130397fba876d8ef5f26b4a108996f43e000994';

describe('Users', () => {
  let id = 0;
  describe('POST', () => {
    it('/users', () => {
      const data = { email: 'testone@gmail.com', name: 'Test One', gender: 'Male', status: 'Active' };
  
      return request.post('users').set('Authorization', `Bearer ${ TOKEN }`).send(data).then(res => {
        expect(res.body.data).to.deep.include(data);
        id = res.body.data.id;
      });
    });
  });

  describe('PUT', () => {
    it('/users/:id', () => {
      const data = { status: 'Inactive', name: 'Test Two' };
  
      return request.put(`users/${id}`).set('Authorization', `Bearer ${ TOKEN }`).send(data).then(res => {
        expect(res.body.data).to.deep.include(data);
      });
    });
  });

  describe('GET', () => {
    it('/users', done => {
      request.get(`users?access-token=${ TOKEN }`).end((err, res) => {
        expect(res.body.data).to.not.be.empty;
        // done() prevents Mocha from passing the test before completing asynchronous API call:
        done();
      });
    });
  
    it('/users/:id', () => {
      return request.get(`users/${ id }?access-token=${ TOKEN }`).then(res => {
        expect(res.body.data.id).to.be.eq(id);
      });
    });
  
    it('/users with query params', () => {
      const data = { page: 5, gender: 'Female', status: 'Active' };
      const url = `users?access-token=${TOKEN}&page=${data.page}&gender=${data.gender}&status=${data.status}`;
  
      return request.get(url).then(res => {
        expect(res.body.data).to.not.be.empty;
        res.body.data.forEach(item => {
          expect(item.gender).to.eq(data.gender);
          expect(item.status).to.eq(data.status);
        });
      });
    });
  });

  describe('DELETE', () => {
    it('/users/:id', () => {
      return request.delete(`users/${id}`).set('Authorization', `Bearer ${ TOKEN }`).then(res => {
        expect(res.body.data).to.be.eq(null);
      });
    });
  });
});
