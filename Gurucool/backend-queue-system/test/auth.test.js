const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app'); // Your Express app

chai.use(chaiHttp);
const { expect } = chai;

describe('User Authentication', () => {
  it('should authenticate a user and return a JWT token', (done) => {
    chai.request(app)
      .post('/auth/login')
      .send({ username: 'testuser', password: 'testpassword' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});
