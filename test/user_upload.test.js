const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index')
const expect = chai.expect;

chai.use(chaiHttp);

describe('Upload API', () => {
  let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5ZXlpaW9AcmlzZS5jb20iLCJfaWQiOiI1MDFlZmI0MS04ODMzLTRkYWMtOTNmZS01YzEwNGQwMWRkYTYiLCJpYXQiOjE2OTI5MDMzODMsImV4cCI6MTY5Mzc2NzM4M30.juNIzwnal9Z0PdtZGEGNOS7aR_XB6eXdmZXDaOVMV5k'

  it('should upload a file', (done) => {
    const email = 'ayei@gj.com';
    const filePath = './testPic/f.png';

    chai.request(app)
      .post(`/api/v1/upload/${email}`)
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('file', filePath)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message', 'Response failed with a 401 code');
        done();
      });
  });

});
