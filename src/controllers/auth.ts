import type express from "express"
import { UserModel, createNewUser } from "../database/users"
import { random } from "../helpers/utils"

export const registerUserController = async (request: express.Request, response: express.Response) => {
  try {
    const { username, useremail, password } = request.body

    if (!username || !useremail || !password) {
      return response.sendStatus(400).end()
    }

    if (password.length < 8) {
      return response.json({ error: "Password should have more than 8 characters." }).sendStatus(400)
    }

    const isExistAlready = await UserModel.findOne({ useremail })

    if (isExistAlready) {
      return response.json({ error: "Can't register user. This email alredy exists." }).sendStatus(400)
    }

    const onCreateNewUser = await createNewUser({
      username,
      useremail,
      authentication: {
        salt: random(),
        password,
      },
    })

    return response.json(onCreateNewUser).sendStatus(201)
  } catch (error) {
    console.log(`There some error on your request: ${error}`)
    return response.sendStatus(400).end()
  }
}
