let server = require("./server");
let chai = require("chai");
let chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe("Task API", () => {
  describe("when GET route /task", () => {
    it("should return all tasks", (done) => {
      chai
        .request(server)
        .get("/task")
        .end((_, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.not.be.eq(0);
          done();
        });
    });
  });

  describe("when POST route /task", () => {
    it("should return error if the description is empty", (done) => {
      chai
        .request(server)
        .post("/task")
        .send({ data: { description: "" } })
        .end((_, response) => {
          response.should.have.status(400);
          response.body.should.be.deep.equal({
            error: "Description cannot be empty",
          });
          done();
        });
    });
  });
});
