import chai from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const expect = chai.expect;

const request = supertest("http://localhost:8080");

describe("Users API", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it("Debería obtener todos los usuarios", async () => {
    const res = await request.get("/api/users");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("Debería crear un usuario nuevo", async () => {
    const newUser = {
      first_name: "Carlos",
      last_name: "Lopez",
      email: `carlos${Date.now()}@example.com`, 
      password: "123456",
    };
    const res = await request.post("/api/users").send(newUser);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("_id");
  });
});
