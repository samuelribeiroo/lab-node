import type express from "express"
import { UserModel, deleteUserById, getUsers } from "../database/users"

export const getListUsers = async (request: express.Request, response: express.Response) => {
  try {
    const users = await getUsers()

    return response.status(200).json(users)
  } catch (error) {
    return response.status(400).json({ error: "Invalid request." })
  }
}

export const getUserById = async (request: express.Request, response: express.Response) => {
  try {
    const { id } = request.params

    const findUserById = await UserModel.findOne({ _id: new Object(id) })

    if (!findUserById) {
      return response.sendStatus(400)
    }

    return response.status(200).json(findUserById)
  } catch (error) {
    return response.status(400).json({ error: "Register was not founded." })
  }
}

export const updateUser = async (request: express.Request, response: express.Response) => {
  try {
    const { id } = request.params

    const updatedData = request.body

    const findUser = await UserModel.findById(id)

    if (!findUser) {
      return response.status(400).json({ error: "User does not exist" })
    }

    const updateUserInfo = await UserModel.findByIdAndUpdate(
      id,
      { $set: updatedData },
      { new: true, runValidators: true },
    )

    return response.status(200).json(updateUserInfo)
  } catch (error) {
    return response.status(400).json({ error: `Houve erro durante a requisição: ${error}` })
  }
}

export const deleteUsers = async (request: express.Request, response: express.Response) => {
  try {
    const { id } = request.params

    const deletedUser = await deleteUserById(id)

    return response.status(204).json(deletedUser)
  } catch (error) {
    return response.status(400).json({ error: "Invalid request." })
  }
}
