const { notFoundError } = require("./errors");

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
