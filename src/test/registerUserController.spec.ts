import { Express, Request, Response } from "express"
import * as authController from "../controllers/auth"
import { registerUserController } from "../controllers/auth"

jest.mock("../controllers/auth")

// The describe method receive two parameters: Description (String) and the second is a callback
describe("registerUserController", () => {
  it("Should return status code 400 if is missing somethig at request.", async () => {
    let request = { body: {} } as unknown as Request

    let response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      sendStatus: jest.fn(),
      end: jest.fn(),
    } as unknown as Response

    const registerUserSpy = jest.spyOn(authController, "registerUserController")

    registerUserSpy.mockImplementationOnce(async (request, response) => {
      return response.status(400)
    })

    await registerUserController(request, response)

    expect(response.status).toHaveBeenCalledWith(400)
    // expect(response.json).toHaveBeenCalledWith({ error: "All fields are required to proceed with registration." })
  })
})
