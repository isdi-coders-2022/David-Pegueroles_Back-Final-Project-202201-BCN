const Appointment = require("../../database/models/Appointment");
const {
  getDailyAppointments,
  getAppointmentInfo,
} = require("./appointmentsControllers");

jest.mock("../../database/models/Appointment");

beforeEach(() => {
  jest.resetAllMocks();
});

describe("Given a getDailyAppointments controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call res status and json methods with a 200 and a list of appointments respectively", async () => {
      const req = {
        params: {
          date: "2022-03-29",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const status = 200;
      const appointments = [
        {
          name: "Do something",
          description: "This should do",
          date: "2022-03-29",
          hour: "10:00",
          category: "Work",
          location: "C/ Diputació 37, Barcelona",
          id: "624210049666edf108d06d69",
        },
        {
          name: "Do something else",
          description: "This is another thing to do",
          date: "2022-03-29",
          hour: "10:00",
          category: "Work",
          location: "C/ Diputació 37, Barcelona",
          id: "624212b09666edf108d06d6a",
        },
      ];

      Appointment.find = jest.fn().mockReturnValue(appointments);

      await getDailyAppointments(req, res);

      expect(Appointment.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith({ appointments });
    });
  });

  describe("When an error occurs", () => {
    test("Then it should call next with an error with status 400", async () => {
      const req = {
        params: {
          date: "2022-03-29",
        },
      };
      const res = null;
      const next = jest.fn();
      const error = {
        status: 400,
      };

      Appointment.find = jest.fn().mockRejectedValueOnce(error);

      await getDailyAppointments(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a getAppointmentInfo controller", () => {
  describe("When it receives a response", () => {
    test("Then it should call res status and json methods with a 200 and aan appointment respectively", async () => {
      const req = {
        params: {
          idAppointment: "1",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const status = 200;
      const appointment = [
        {
          name: "Do something else",
          description: "This is another thing to do",
          date: "2022-03-31",
          category: "Work",
          location: "C/ Diputació 37, Barcelona",
          hour: "12:00",
          id: "1",
        },
      ];

      Appointment.findById = jest.fn().mockReturnValue(appointment);

      await getAppointmentInfo(req, res);

      expect(Appointment.findById).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith({ appointment });
    });
  });

  describe("When an error occurs", () => {
    test("Then it should call next with an error with status 400", async () => {
      const req = {
        params: {
          idAppointment: "1",
        },
      };
      const res = null;
      const next = jest.fn();
      const error = {
        status: 400,
      };

      Appointment.findById = jest.fn().mockRejectedValueOnce(error);

      await getAppointmentInfo(req, res, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
