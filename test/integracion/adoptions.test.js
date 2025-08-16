import chai from "chai";
import supertest from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const expect = chai.expect;

const request = supertest("http://localhost:8080");

describe("Adoptions API", () => {
  before(async () => {
    await mongoose.connect(process.env.MONGO_URI_TEST);
  });

  after(async () => {
    await mongoose.connection.close();
  });

  it("Debería obtener todas las adopciones", async () => {
    const res = await request.get("/api/adoptions");
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array");
  });

  it("Debería crear una adopción (usuario + pet)", async () => {
    // suponemos que ya existen IDs válidos en la base de datos de prueba
    const adoption = {
      owner: "64eac3d2e5c1c2a3f8a7b001", // <-- cambia por un user válido en tu DB de test
      pet: "64eac3d2e5c1c2a3f8a7b002",   // <-- cambia por un pet válido en tu DB de test
    };

    const res = await request.post("/api/adoptions").send(adoption);
    expect(res.status).to.be.oneOf([200, 201]);
    expect(res.body).to.have.property("_id");
  });
});
