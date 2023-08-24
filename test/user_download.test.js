const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index')
const expect = chai.expect;

chai.use(chaiHttp);

describe('Download API', () => {
  let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5ZXlpaW9AcmlzZS5jb20iLCJfaWQiOiI1MDFlZmI0MS04ODMzLTRkYWMtOTNmZS01YzEwNGQwMWRkYTYiLCJpYXQiOjE2OTI5MDMzODMsImV4cCI6MTY5Mzc2NzM4M30.juNIzwnal9Z0PdtZGEGNOS7aR_XB6eXdmZXDaOVMV5k'

  it('should download a file', (done) => {
    const email = 'ayei@gj.com';
    const fileName = 'f.png';

    chai.request(app)
    .get(`/api/v1/download/${email}/${fileName}`)
    .set('Authorization', `Bearer ${accessToken}`)
    .end((err, res) => {
      expect(res).to.have.status(200);
      expect(res).to.have.header('content-type', 'application/octet-stream');
      //expect(res.body).to.be.an.instanceOf(Buffer);

            done()
      });
  });

});
