const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const expect = chai.expect;
const email = "ade@rise.com";
chai.use(chaiHttp);

//Running the test for the second time may result
//in two 2 of 7 failed test because some data are
//stored in db when it runs and it shouldn't create
// the same data twice.

describe("Register API", () => {
  it("should return success on succcesful registeration", (done) => {
    const credentials = {
      fullname: "Ade",
      email: email,
      password: "secret",
    };

    chai
      .request(app)
      .post("/api/v1/register")
      .send(credentials)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property(
          "message",
          "User created successfully"
        );
        done();
      });
  });

  it("should return user already registered when user tries to log in for the second time", (done) => {
    const credentials = {
      fullname: "Ade",
      email: email,
      password: "wrongpassword",
    };

    chai
      .request(app)
      .post("/api/v1/register")
      .send(credentials)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("message", "User already exists");
        done();
      });
  });
});

describe("Login API", () => {
  it("should return success on valid login", (done) => {
    const credentials = {
      email: email,
      password: "secret",
    };

    chai
      .request(app)
      .post("/api/v1/login")
      .send(credentials)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property(
          "message",
          "User logged in successfully"
        );
        done();
      });
  });

  it("should return unauthorized on invalid login", (done) => {
    const credentials = {
      email: email,
      password: "wrongpassword",
    };

    chai
      .request(app)
      .post("/api/v1/login")
      .send(credentials)
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body).to.have.property("message", "Invalid credentials");
        done();
      });
  });
});

describe("Create Folder API", () => {
  let accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkZUByaXNlLmNvbSIsIl9pZCI6IjU4OGI3OGNiLTE4OTYtNDMzMy1iZjkyLTUyOTMxMmEzMTlkNSIsImlhdCI6MTY5Mjk3ODk3OCwiZXhwIjoxNjkzODQyOTc4fQ.Je-WFGhf-HIuxn5mBEoergfQaUh32laf5fA072t-7IE";

  it("should create a new folder for a logged-in user once. If folder already created once, it throws an error", (done) => {
    const newFolder = {
      email: email,
      folderName: "testFolder",
    };

    chai
      .request(app)
      .post("/api/v1/createFolder")
      .set("Authorization", `Bearer ${accessToken}`)
      .send(newFolder)
      .end((err, res) => {
        expect(res).to.have.status(201); // Assuming 201 Created for success
        expect(res.body).to.have.property(
          "message",
          "Folder created successfully"
        );
        done();
      });
  });
});

describe("Upload API", () => {
  let accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkZUByaXNlLmNvbSIsIl9pZCI6IjU4OGI3OGNiLTE4OTYtNDMzMy1iZjkyLTUyOTMxMmEzMTlkNSIsImlhdCI6MTY5Mjk3ODk3OCwiZXhwIjoxNjkzODQyOTc4fQ.Je-WFGhf-HIuxn5mBEoergfQaUh32laf5fA072t-7IE";

  it("should upload a file. The token would have probably expired at the time of testing but will still attempt to download", (done) => {
    const email = "ade@rise.com";
    const filePath = "./testPic/f.png";

    chai
      .request(app)
      .post(`/api/v1/upload/${email}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .attach("file", filePath)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property(
          "message",
          "Response failed with a 401 code"
        );
        done();
      });
  });
});

describe("Download API", () => {
  let accessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkZUByaXNlLmNvbSIsIl9pZCI6IjU4OGI3OGNiLTE4OTYtNDMzMy1iZjkyLTUyOTMxMmEzMTlkNSIsImlhdCI6MTY5Mjk3ODk3OCwiZXhwIjoxNjkzODQyOTc4fQ.Je-WFGhf-HIuxn5mBEoergfQaUh32laf5fA072t-7IE";

  it("should download a file. The token would have probably expired at the time of testing but will still attempt to download", (done) => {
    const email = "ade@rise.com";
    const fileName = "f.png";

    chai
      .request(app)
      .get(`/api/v1/download/${email}/${fileName}`)
      .set("Authorization", `Bearer ${accessToken}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.have.header(
          "content-type",
          "application/json; charset=utf-8"
        );
        //expect(res.body).to.be.an.instanceOf(Buffer);

        done();
      });
  });
});
