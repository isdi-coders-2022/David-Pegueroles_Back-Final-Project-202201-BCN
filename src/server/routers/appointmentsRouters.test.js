const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("..");
const databaseConnect = require("../../database/index");
const Appointment = require("../../database/models/Appointment");

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const connectionString = mongoServer.getUri();
  await databaseConnect(connectionString);
});

beforeEach(async () => {
  await Appointment.create({
    name: "Do something",
    description: "This should do",
    date: "2022-03-29T16:00:00.000Z",
    category: "Work",
    location: "C/ Diputació 37, Barcelona",
  });
  await Appointment.create({
    name: "Do something else",
    description: "This is another thing to do",
    date: "2022-03-30T16:00:00.000Z",
    category: "Work",
    location: "C/ Diputació 37, Barcelona",
  });
});

afterEach(async () => {
  await Appointment.deleteMany({});
});

afterAll(() => {
  mongoose.connection.close();
  mongoServer.stop();
});

describe("Given an endpoint /calendar", () => {
  describe("When it receives a request with a GET method", () => {
    test("Then it should respond with status 200 and a list of appointments", async () => {
      const appointmentProperties = [
        "name",
        "description",
        "date",
        "category",
        "location",
      ];

      const expectedResponse = {
        appointments: [
          {
            name: "Do something",
            description: "This should do",
            date: "2022-03-29T16:00:00.000Z",
            category: "Work",
            location: "C/ Diputació 37, Barcelona",
          },
          {
            name: "Do something else",
            description: "This is another thing to do",
            date: "2022-03-30T16:00:00.000Z",
            category: "Work",
            location: "C/ Diputació 37, Barcelona",
          },
        ],
      };

      const { body } = await request(app).get("/calendar").expect(200);

      appointmentProperties.forEach((property) => {
        expect(body.appointments[0]).toHaveProperty(property);
        expect(body.appointments[1]).toHaveProperty(property);

        expect(body.appointments[0].property).toBe(
          expectedResponse.appointments.property
        );
        expect(body.appointments[1].property).toBe(
          expectedResponse.appointments.property
        );
      });
    });
  });
});
