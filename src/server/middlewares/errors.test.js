const { notFoundError, generalError } = require("./errors");

describe("Given a notFoundError handler", () => {
  describe("When it receives a response", () => {
    test("Then it should call res methods status with 404 status code & json with an error and the message 'Resource not found'", () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const error = { error: true, message: "Resource not found" };
      const status = 404;

      notFoundError(null, res);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith(error);
    });
  });
});

describe("Given a generalError handler", () => {
  describe("When it receives an empty error and a response", () => {
    test("Then it should call res methods status with 500 status code & json with an error and the message 'General Error'", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const err = {};

      const errorMessage = { error: true, message: "General Error" };
      const status = 500;

      await generalError(err, null, res, null);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith(errorMessage);
    });
  });

  describe("When it receives an error with properties code: 401 & message: 'This is an error' and a response", () => {
    test("Then it should call methods status with the received status code & json with the received error", async () => {
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const err = { code: 401, message: "This is an error" };

      const errorMessage = { error: true, message: "This is an error" };
      const status = 401;

      await generalError(err, null, res, null);

      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith(errorMessage);
    });
  });
});
