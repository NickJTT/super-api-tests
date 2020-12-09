import { expect } from 'chai';
import faker from 'faker';
import request from '../config/request';
import { createRandomUser, deleteUser } from '../helpers/userHelper';
require('dotenv').config();

const TOKEN = process.env.TOKEN;

describe('User Posts', () => {
  let id = 0;
  let userID = 0;

  before(async () => {
    userID = await createRandomUser();
  });

  describe('POST', () => {
    it('/posts', async () => {
      const data = { user_id: userID, title: faker.lorem.sentence(), body: faker.lorem.paragraph() };
      const res = await request.post('posts').set('Authorization', `Bearer ${TOKEN}`).send(data);
      expect(res.body.data).to.deep.include(data);
      id = res.body.data.id;
    });
  });

  describe('GET', () => {
    it('/posts/:id', async () => {
      await request.get(`posts/${id}`).set('Authorization', `Bearer ${TOKEN}`).expect(200);
    });
  });

  describe('Negative Tests', () => {
    it('Throws 401 Authentication failed', async () => {
      const data = { user_id: userID, title: faker.lorem.sentence(), body: faker.lorem.paragraph() };
      const res = await request.post('posts').send(data);

      expect(res.body.code).to.eq(401);
      expect(res.body.data.message).to.eq('Authentication failed');
    });

    it('Throws 422 Validation failed', async () => {
      const data = { user_id: userID, title: faker.lorem.sentence() };
      const res = await request.post('posts').set('Authorization', `Bearer ${TOKEN}`).send(data);

      expect(res.body.code).to.eq(422);
      expect(res.body.data[0].field).to.eq('body');
      expect(res.body.data[0].message).to.eq('can\'t be blank');
    });
  });

  after(async () => {
    await deleteUser(userID);
  });
});
