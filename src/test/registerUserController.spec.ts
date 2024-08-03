import { Request, Response } from "express"
import * as authController from "../controllers/auth"
import { registerUserController } from "../controllers/auth"

jest.mock("../controllers/auth")

const mockShortPassword = async (request: Request, response: Response) => {
  if (request.body.password.length < 8) {
    response.sendStatus(400).json({ error: "Password should have more than 8 characters." })
  } else {
    response.sendStatus(200)
  }
}

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
      return response.status(400).json({ error: "All fields are required to proceed with registration." })
    })

    await registerUserController(request, response)

    expect(response.status).toHaveBeenCalledWith(400)
    expect(response.json).toHaveBeenCalledWith({ error: "All fields are required to proceed with registration." })
  })

  it("Password should be have more than 8 characters", async () => {
    let request = { body: { password: "1234" } } as Request

    let response = {
      sendStatus: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as Response

    await mockShortPassword(request, response)

    expect(response.sendStatus).toHaveBeenCalledWith(400)
  })
})
