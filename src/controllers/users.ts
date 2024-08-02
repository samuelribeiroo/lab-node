import type express from "express"
import { UserModel, deleteUserById, getUsers } from "../database/users"

export const getListUsers = async (request: express.Request, response: express.Response) => {
  try {
    const users = await getUsers()

    // Only to testing
    // return response.json({ message: "Its working." })

    return response.json(users).sendStatus(200)
  } catch (error) {
    return response.sendStatus(400).json({ error: "Invalid request." })
  }
}

export const getUserById = async (request: express.Request, response: express.Response) => {
  try {
    const { id } = request.params

    const findUserById = await UserModel.findOne({ _id: new Object(id) })

    if (!findUserById) {
      return response.sendStatus(400).end()
    }

    return response.json(findUserById).sendStatus(200)
  } catch (error) {
    return response.sendStatus(400).json({ error: "Register was not founded." })
  }
}

export const updateUser = async (request: express.Request, response: express.Response) => {
  try {
    const { id } = request.params

    const updatedData = request.body

    const findUser = await UserModel.findById(id)

    if (!findUser) {
      return response.json({ error: "User does not exist" }).sendStatus(400)
    }

    const updateUserInfo = await UserModel.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true },
    )

    return response.json(updateUserInfo).sendStatus(200)
  } catch (error) {
    return response.json({ error: `Houve erro durante a requisição: ${error}` }).sendStatus(400)
  }
}

export const deleteUsers = async (request: express.Request, response: express.Response) => {
  try {
    const { id } = request.params

    const deletedUser = await deleteUserById(id)

    return response.sendStatus(204).json(deletedUser)
  } catch (error) {
    return response.sendStatus(400).json({ error: "Invalid request." })
  }
}
