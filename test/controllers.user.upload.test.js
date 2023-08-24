const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const expect = chai.expect;

chai.use(chaiHttp);
describe('/api/v1/upload/ayei@gj.com', () => {
  it('should upload a file when email is supplied via params and file is supplied via req.files', (done) => {
    chai.request(app)
      .post('/upload')
      .attach('file', './testPic/f.png')
      .field('email', 'ayei@gj.com') 
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.json.message).to.equal('File uploaded successfully!');
       ;
        done();
      });
  });
});
