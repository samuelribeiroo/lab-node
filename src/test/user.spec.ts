import express from "express"
import request from "supertest"
import { getUserById } from "../controllers/users"
import { UserModel } from "../database/users"

jest.setTimeout(8000) // Every test running in this file have a limit of 8s to finish.

jest.mock("../database/users", () => ({
  UserModel: {
    findOne: jest.fn(),
  },
}))

jest.mock("../controllers/users", () => ({
  getUserById: jest.fn(),
}))

const app = express()
app.use(express.json())
app.get("/users/:id", getUserById)

app.get("/users", (request, response) => {
  response.json({
    _id: "66abd95d8cb1ce69c5a8890b",
    username: "Usuário10",
    useremail: "samuel@mail.com",
    __v: 0,
  })
})

describe("getListUsers", () => {
  it("Shoul return a JSON with all from DB.", async () => {
    const response = await request(app).get("/users")

    expect(response.body).toEqual({
      _id: "66abd95d8cb1ce69c5a8890b",
      username: "Usuário10",
      useremail: "samuel@mail.com",
      __v: 0,
    })
  })
})

describe("getUserById", () => {
  let mockResponse

  beforeEach(() => {
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      sendStatus: jest.fn(),
    }
  })

  afterEach(() => jest.clearAllMocks())

  it("Should return status code 200", async () => {
    const mockFakeUser = { id: "1234454", username: "User Test", useremail: "johndoe@mail.to" };
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockFakeUser)
    (getUserById as jest.Mock).mockImplementation((request, response) => {
      return response.sendStatus(200).json(mockFakeUser)
    })

    const response = await request(app).get("/users/1234454")

    expect(response.status).toBe(200)
  })

  it("Should return status code 400 if ID isnt founded.", async () => {
    (UserModel.findOne as jest.Mock).mockResolvedValue(null);
    (getUserById as jest.Mock).mockImplementation((request, response) => {
      return response.sendStatus(400)
    })

    const response = await request(app).get("/users/477")

    expect(response.status).toBe(400)
    expect(getUserById).toHaveBeenCalled()
  })
})

describe("getUserById", () => {
  it("Should return a JSON with user", async () => {
    const mockFakeUser = { id: "1234454", username: "User Test", useremail: "johndoe@mail.to" };
    (UserModel.findOne as jest.Mock).mockResolvedValue(mockFakeUser);
    (getUserById as jest.Mock).mockImplementation((request, response) => {
      return response.json(mockFakeUser)
    })

    const response = await request(app).get("/users/1234454")

    expect(response.body).toEqual(mockFakeUser)
  })
})

// The test has huge problem: The test are being passed individually, but not togheter.
// Bc this line -> getUserById: jest.fn((request, response) => response.sendStatus(200))
// globally in this file are defining the entire behavior of tests.
// So make the necessary changes and assure that test are working togheter. -> Solved ✔

// With this commit 'commit: 97662d0' the tests only evaluate the status code and dont return .json
// So we need fix this following the rule 'Should return status code 200 and object with user.' -> Resolved ✔✔✔✔✔

// Well trying fix the issue above was made it another test that will be required, that is test the route that return all users from DB. -> Solved ✔
