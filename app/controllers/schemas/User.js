import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  username: {
    type: String,
  },
  password: {
    type: String,
  },
});

let User;

if (models?.User) User = model("User");
else User = model("User", UserSchema);

export default User;
