import supertest from 'supertest';
import constants from '../config/constants';

const request = supertest(constants.URL);
export default request;
