import { NextResponse } from "next/server";
import "../../controllers/db";
import Category from "@/app/controllers/schemas/Category";

export async function POST(req) {
  try {
    const body = await req.formData();
    const categoryFromDB = await Category.findOne({
      name: body.get("category"),
    });

    if (categoryFromDB) {
      const subCategoryIndex = categoryFromDB.subCategory.findIndex(
        (subCat) => subCat.name === body.get("subcategory")
      );

      if (subCategoryIndex !== -1) {
        const subsubCategoryIndex = categoryFromDB.subCategory[
          subCategoryIndex
        ].subsubCategory.findIndex(
          (subsubCat) => subsubCat.name === body.get("subsubcategory")
        );

        if (subsubCategoryIndex === -1) {
          categoryFromDB.subCategory[subCategoryIndex].subsubCategory.push({
            name: body.get("subsubcategory"),
            subsubsubCategory: [
              {
                name: body.get("subsubsubcategory"),
              },
            ],
          });
        } else {
          const subsubsubCategoryIndex = categoryFromDB.subCategory[
            subCategoryIndex
          ].subsubCategory[subsubCategoryIndex].subsubsubCategory.findIndex(
            (subsubsubCat) =>
              subsubsubCat.name === body.get("subsubsubcategory")
          );

          if (subsubsubCategoryIndex === -1) {
            categoryFromDB.subCategory[subCategoryIndex].subsubCategory[
              subsubCategoryIndex
            ].subsubsubCategory.push({
              name: body.get("subsubsubcategory"),
            });
          }
        }
      } else {
        categoryFromDB.subCategory.push({
          name: body.get("subcategory"),
          subsubCategory: [
            {
              name: body.get("subsubcategory"),
              subsubsubCategory: [
                {
                  name: body.get("subsubsubcategory"),
                },
              ],
            },
          ],
        });
      }
      await categoryFromDB.save();
    } else {
      const categories = new Category({
        name: body.get("category"),
        subCategory: [
          {
            name: body.get("subcategory"),
            subsubCategory: [
              {
                name: body.get("subsubcategory"),
                subsubsubCategory: [
                  {
                    name: body.get("subsubsubcategory"),
                  },
                ],
              },
            ],
          },
        ],
      });

      await categories.save();
    }

    return NextResponse.json({ message: "Hello" });
  } catch (error) {
    console.error(error.message);
  }
}

export async function GET() {
  const categories = await Category.find({});
  return NextResponse.json({ message: categories });
}
