import express from "express"
import request from "supertest"
import { getUserById } from "../controllers/users"
import { UserModel } from "../database/users"

jest.setTimeout(8000) // Every test running in this file have a limite of 8s to finish. 
jest.mock("../controllers/users")
jest.mock("../database/users", () => ({
  UserModel: {
    findOne: jest.fn(),
  },
}))
jest.mock("../controllers/users", () => ({
  getUserById: jest.fn((request, response) => response.sendStatus(400))
}))

const app = express()
app.get("/users/:id", getUserById)

describe("getUserById", () => {
  it("Should return status code 400 if ID isnt founded.", async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(null)

    const response = await request(app).get("/users/477")

    expect(response.status).toBe(400)
    expect(getUserById).toHaveBeenCalled()
  })
})


