const Appointment = require("../../database/models/Appointment");
const { getAppointments } = require("./appointmentsControllers");

jest.mock("../../database/models/Appointment");

describe("Given a getAppointments controller", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe("When it receives a response", () => {
    test("Then it should call res status and json methods with a 200 and a list of appointments respectively", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const status = 200;

      const appointments = [
        {
          name: "Do something",
          description: "This should do",
          date: "2022-03-29T16:00:00.000Z",
          category: "Work",
          location: "C/ Diputació 37, Barcelona",
          id: "624210049666edf108d06d69",
        },
        {
          name: "Do something else",
          description: "This is another thing to do",
          date: "2022-03-30T16:00:00.000Z",
          category: "Work",
          location: "C/ Diputació 37, Barcelona",
          id: "624212b09666edf108d06d6a",
        },
      ];

      Appointment.find = jest.fn().mockReturnValue(appointments);

      await getAppointments(null, res);

      expect(Appointment.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith({ appointments });
    });
  });

  describe("When an error occurs", () => {
    test("Then it should call next with an error with status 400", async () => {
      const req = null;
      const res = null;
      const next = jest.fn();

      const error = {
        status: 400,
      };

      Appointment.find = jest.fn().mockRejectedValueOnce(error);

      await getAppointments(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
