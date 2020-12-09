// faker is used for generating random data:
import faker from 'faker';
import request from '../config/request';
require('dotenv').config();

const TOKEN = process.env.TOKEN;

export const createRandomUser = async () => {
  // email: `test${ Math.floor(Math.random() * 9999) }@gmail.com`
  const data = { email: faker.internet.email(), name: faker.name.firstName(), gender: 'Male', status: 'Active' };
  const res = await request.post('users').set('Authorization', `Bearer ${ TOKEN }`).send(data);
  return res.body.data.id;
}

export const deleteUser = async id => {
  await request.delete(`users/${id}`).set('Authorization', `Bearer ${ TOKEN }`);
}
