import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String },
  username: { type: String },
  category: { type: String },
  subCat: { type: String },
  subsubCat: { type: String },
  subsubsubCat: { type: String },
  agree: { type: Boolean },
});

let UserWithSector;
if (models?.UserWithSector) UserWithSector = model("UserWithSector");
else UserWithSector = model("UserWithSector", UserSchema);

export default UserWithSector;
