const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index')
const expect = chai.expect;

chai.use(chaiHttp);

describe('Login API', () => {
  it('should return success on valid login', (done) => {
    const credentials = {
      email: 'ayei@gj.com',
      password: 'aaa1e11',
    };

    chai.request(app)
      .post('/api/v1/login')
      .send(credentials)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'User logged in successfully');
        done();
      });
  });

  it('should return unauthorized on invalid login', (done) => {
    const credentials = {
      email: 'user@example.com',
      password: 'wrongpassword',
    };

    chai.request(app)
      .post('/api/v1/login')
      .send(credentials)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property('message', 'Invalid credentials');
        done();
      });
  });
});
