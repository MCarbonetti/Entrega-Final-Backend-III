import chai from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const expect = chai.expect;

const request = supertest("http://localhost:8080");

describe("Sessions API", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  const testUser = {
    first_name: "Test",
    last_name: "User",
    email: "testuser@example.com",
    password: "123456",
  };

  it("Debería registrar un usuario", async () => {
    const res = await request.post("/api/sessions/register").send(testUser);
    expect(res.status).to.be.oneOf([200, 201]);
    expect(res.body).to.have.property("_id");
  });

  it("Debería loguear un usuario", async () => {
    const res = await request.post("/api/sessions/login").send({
      email: testUser.email,
      password: testUser.password,
    });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property("token");
  });
});
