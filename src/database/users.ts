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

export const getUsers = () => UserModel.find()

export const getUserByEmail = (email: string) => UserModel.findOne({ email })

// This file has the main goal set how to data will behavior at DB. Will be created UserSchema and UserModel
