import { Schema, model, models } from "mongoose";

const SubSubCategorySchema = new Schema({
  name: { type: String },
});

const SubCategorySchema = new Schema({
  name: { type: String },
  subSubCategories: [{ type: Schema.Types.ObjectId, ref: "SubSubCategory" }],
});

const CategorySchema = new Schema({
  name: { type: String },
  subCategories: [{ type: Schema.Types.ObjectId, ref: "SubCategory" }],
});

let Category;
let SubCategory;
let SubSubCategory;

if (models?.Category) Category = model("Category");
else Category = model("Category", CategorySchema);

if (models?.SubCategory) SubCategory = model("SubCategory");
else SubCategory = model("SubCategory", SubCategorySchema);

if (models?.SubSubCategory) SubSubCategory = model("SubSubCategory");
else SubSubCategory = model("SubSubCategory", SubSubCategorySchema);

export { Category, SubCategory, SubSubCategory };
