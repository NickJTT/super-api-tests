import supertest from 'supertest';
import { expect } from 'chai';
import { createRandomUser, deleteUser } from '../helpers/userHelper';

const URL = 'https://gorest.co.in/public-api/';
const request = supertest(URL);

const TOKEN = '54bc888cacb5831ca31d58d66130397fba876d8ef5f26b4a108996f43e000994';

describe('User Posts', () => {
  let id = 0;
  let userID = 0;

  before(async () => {
    userID = await createRandomUser();
  });

  describe('POST', () => {
    it('/posts', async () => {
      const data = { user_id: userID, title: 'Title', body: 'Hello, World!' };
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

  after(async () => {
    await deleteUser(userID);
  });
});
