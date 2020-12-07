import supertest from 'supertest';

const URL = 'https://gorest.co.in/public-api/';
const request = supertest(URL);

const TOKEN = '54bc888cacb5831ca31d58d66130397fba876d8ef5f26b4a108996f43e000994';

export const createRandomUser = async () => {
  const data = { email: `test${ Math.floor(Math.random() * 9999) }@gmail.com`, name: 'Test', gender: 'Male', status: 'Active' };

  const res = await request.post('users').set('Authorization', `Bearer ${ TOKEN }`).send(data);
  return res.body.data.id;
}

export const deleteUser = async id => {
  await request.delete(`users/${id}`).set('Authorization', `Bearer ${ TOKEN }`);
}
