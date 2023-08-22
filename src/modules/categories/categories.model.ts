import mongoose, { Schema } from "mongoose";

const CategoryChildLastSchema: Schema = new Schema({
  name: String,
  slug: String,
  parentId: String,
  children: []
})

const CategoryChildSchema: Schema = new Schema({
  name: String,
  slug: String,
  parentId: String,
  children: [CategoryChildLastSchema]
})

const CategorySchema: Schema = new Schema({
  name: String,
  slug: String,
  parentId: String,
  children: [CategoryChildSchema]
})

export const CategoryModel = mongoose.model("Category", CategorySchema)
