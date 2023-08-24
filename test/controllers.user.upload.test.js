const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index')
const expect = chai.expect;

chai.use(chaiHttp);

describe('Upload API', () => {

  it('should upload a file', (done) => {
    const email = 'ayei@gj.com';
    const filePath = './testPic/f.png';

    chai.request(app)
      .post(`/api/v1/upload/${email}`)
      .attach('file', filePath)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'File uploaded successfully!');
        done();
      });
  });

});
