import bcrypt from "bcrypt"
import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  useremail: { type: String, required: true },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
  },
})

export const UserModel = mongoose.model("User", UserSchema)

export const createNewUser = async (values: Record<string, any>) => {
  const salt = await bcrypt.genSalt(12)
  const password = await bcrypt.hash(values.authentication.password, salt)

  values.authentication.salt = salt
  values.authentication.password = password

  return new UserModel(values).save().then(user => user.toObject())
}

export const getUsers = () => UserModel.find()

export const getUserByEmail = (email: string) => UserModel.findOne({ email })

export const deleteUserById = (id: string) => UserModel.findOneAndDelete({ id })

// This file has the main goal set how to data will behavior at DB. Will be created UserSchema and UserModel