import { Schema, model, PaginateModel } from "mongoose";
import paginate from "mongoose-paginate-v2";
import { CategoryDocument } from "@/resources/category/category.interface";

const CategoryChildLastSchema: Schema = new Schema({
  name: String,
  slug: String,
  parentId: String,
  children: [],
  tags: [String],
});

const CategoryChildSchema: Schema = new Schema({
  name: String,
  slug: String,
  parentId: String,
  children: [CategoryChildLastSchema],
  tags: [String],
});

const CategorySchema: Schema = new Schema({
  name: String,
  slug: String,
  parentId: String,
  children: [CategoryChildSchema],
  tags: [String],
});

CategorySchema.plugin(paginate);

export const CategoryModel = model<
  CategoryDocument,
  PaginateModel<CategoryDocument>
>("Category", CategorySchema, "category");
