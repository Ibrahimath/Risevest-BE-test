const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index')
const expect = chai.expect;

chai.use(chaiHttp);

describe('Register API', () => {
    it('should return success on succcesful registeration', (done) => {
      const credentials = {
        fullname: "Ade",
        email: 'ade@rise.com',
        password: 'secret',
      };
  
      chai.request(app)
        .post('/api/v1/register')
        .send(credentials)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message', 'User created successfully');
          done();
        });
    });
  
    it('should return user already registered when user tries to log in for the second time', (done) => {
      const credentials = {
        email: 'ade@rise.com',
        password: 'wrongpassword',
      };
  
      chai.request(app)
        .post('/api/v1/register')
        .send(credentials)
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res.body).to.have.property('message', 'User already exists');
          done();
        });
    });
  });
  

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
  