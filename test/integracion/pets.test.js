import chai from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const expect = chai.expect;

const request = supertest("http://localhost:8080"); // tu servidor debe estar corriendo

describe("Pets API", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it("Debería obtener todos los pets", async () => {
    const res = await request.get("/api/pets");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("Debería crear un pet nuevo", async () => {
    const newPet = { name: "Firulais", specie: "dog", age: 3 };
    const res = await request.post("/api/pets").send(newPet);
    expect(res.status).to.equal(201);
    expect(res.body).to.have.property("_id");
    expect(res.body.name).to.equal("Firulais");
  });
});
