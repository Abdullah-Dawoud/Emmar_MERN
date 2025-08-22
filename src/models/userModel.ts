import mongoose, {Schema,Document } from "mongoose";
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<IUser>({
    firstName: {type: String, requried :true},
    lastName: {type: String, requried :true},
    email: {type: String, requried :true},
    password: {type: String, requried :true},
})

export const userModel = mongoose.model<IUser>("User", userSchema);