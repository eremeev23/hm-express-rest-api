import { CategoryModel } from "./categories.model";


// --- CREATE CATEGORY ---
export const createCategory = (values: Record<string, any>) => new CategoryModel(values)
  .save()
  .then((category) => category.toObject());

// --- READ CATEGORIES ---
export const getCategories = () => CategoryModel.find();
export const getCategoryById = (id: string) => CategoryModel.findById(id);
export const getCategoriesCount = () => CategoryModel.count({});

// --- UPDATE CATEGORY ---

// --- DELETE CATEGORY ---
export const deleteAllCategories = () => CategoryModel.deleteMany({ __v: 0 })



