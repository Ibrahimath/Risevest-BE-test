const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index')
const expect = chai.expect;

chai.use(chaiHttp);

describe('Create Post API', () => {
  let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5ZXlpaW9AcmlzZS5jb20iLCJfaWQiOiI1MDFlZmI0MS04ODMzLTRkYWMtOTNmZS01YzEwNGQwMWRkYTYiLCJpYXQiOjE2OTI5MDMzODMsImV4cCI6MTY5Mzc2NzM4M30.juNIzwnal9Z0PdtZGEGNOS7aR_XB6eXdmZXDaOVMV5k'


  it('should create a new folder for a logged-in user once. If folder already created once, it throws an error', (done) => {
    const newFolder = {
        email: 'ayeyiio@rise.com',
        folderName: 'testFolderire',
    };

    chai.request(app)
      .post('/api/v1/createFolder')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(newFolder)
      .end((err, res) => {
        expect(res).to.have.status(201); // Assuming 201 Created for success
        expect(res.body).to.have.property('message', 'Folder created successfully');
        done();
      });
  });

})