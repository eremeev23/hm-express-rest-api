import { ProductModel } from "./product.model";

// --- CREATE PRODUCTS ---
export const createProduct = (values: Record<string, any>) => new ProductModel(values)
  .save()
  .then((user) => user.toObject());

// --- READ PRODUCTS ---
export const getProducts = (limit: number, filter: object) => {
  return ProductModel.find(filter).limit(limit);
};
export const getProductById = (id: string) => ProductModel.findById(id);
export const getProductsCount = () => ProductModel.count({});

// --- UPDATE PRODUCTS ---

// --- DELETE PRODUCTS ---
export const deleteAllProducts = () => ProductModel.deleteMany({ __v: 0 });

