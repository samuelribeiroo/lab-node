import bcrypt from "bcrypt"
import type express from "express"
import { UserModel, createNewUser } from "../database/users"
import { random } from "../helpers/utils"

export const registerUserController = async (request: express.Request, response: express.Response) => {
  try {
    const { username, useremail, password } = request.body

    if (!username || !useremail || !password) {
      return response.status(400).json({ error: "All fields are required to proceed with registration." })
    }

    if (password.length < 8) {
      return response.status(400).json({ error: "Password should have more than 8 characters." })
    }

    const isExistAlready = await UserModel.findOne({ $or: [{ username }, { useremail }] })

    if (isExistAlready) {
      return response.status(400).json({ error: "Can't register user. This email alredy exists." })
    }

    const onCreateNewUser = await createNewUser({
      username,
      useremail,
      authentication: {
        salt: random(),
        password,
      },
    })

    return response.status(201).json(onCreateNewUser)
  } catch (error) {
    return response.sendStatus(400) 
  }
}

export const loginUserController = async (request: express.Request, response: express.Response) => {
  try {
    const { useremail, password } = request.body

    if (!useremail || !password) {
      return response.json({ error: "Login informations doesnt match." })
    }

    const verifyUserInformation = await UserModel.findOne({ useremail }).select("+authentication.password")

    if (!verifyUserInformation) {
      return response.json({ error: "User dont exist." })
    }

    const { authentication: { password: hashedPassword } } = verifyUserInformation

    const isValidPassword = await bcrypt.compare(password, hashedPassword)

    if (!isValidPassword) {
      return response.json({ error: "Password or Email incorrect" })
    }

    return response.sendStatus(200) 
  } catch (error) {
    return response.status(400).json({ error: "Login failed." })
  }
}
