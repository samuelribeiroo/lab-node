import type express from "express"
import { deleteUserById, getUsers } from "../database/users"

const usersMock = [
  { id: 1, name: "Usuário01" },
  { id: 2, name: "Usuário02" },
  { id: 3, name: "Usuário03" },
]

export const getListUsers = async (request: express.Request, response: express.Response) => {
  try {
    const users = await getUsers()

    // Only to testing
    // return response.json({ message: "Its working." })

    return response.json(users).sendStatus(200)
    
  } catch (error) {
    return response.sendStatus(400).json({ message: "Invalid request." })
  }
}

export const deleteUsers = async (request: express.Request, response: express.Response) => {
  try {
    const { id } = request.params

    const deletedUser = await deleteUserById(id)

    return response.sendStatus(204).json(deletedUser)

  } catch (error) {
    return response.sendStatus(400).json({ message: "Invalid request." })
  }
}
