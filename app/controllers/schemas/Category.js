import { Schema, models, model } from "mongoose";

const CategorySchema = new Schema({
  name: { type: String },
  subCategory: [
    {
      name: { type: String },
      subsubCategory: [
        {
          name: { type: String },
          subsubsubCategory: [{ name: { type: String } }],
        },
      ],
    },
  ],
});

let Category;
if (models.Category) Category = model("Category");
else Category = model("Category", CategorySchema);

export default Category;
