import { CategoryModel } from "@/resources/category/category.model";
import { CategoryDocument } from "@/resources/category/category.interface";

export class CategoryService {
  public model = CategoryModel;

  public async create(values: Record<string, any>) {
    try {
      return await this.model.create(values);
    } catch (e) {
      throw new Error("Unable to create new category");
    }
  }

  public async getCategories(page = 1, limit = 30, filter?: object) {
    const options = {
      page,
      limit,
      customLabels: {
        totalDocs: "count",
        docs: "results",
      },
      collation: {
        locale: "en",
      },
    };

    return this.model.paginate(filter, options);
  }

  public async getCategoryById(id: string) {
    return this.model.findById(id);
  }

  public async getCategoriesCount() {
    return this.model.count({});
  }

  public async deleteAllCategories() {
    return this.model.deleteMany({ __v: 0 });
  }
}

// --- utils ---
// --- CREATE CATEGORY ---
export const createCategory = (values: Record<string, any>) =>
  new CategoryModel(values).save().then((category) => category.toObject());

// --- READ CATEGORIES ---
export const getCategories = () => CategoryModel.find();
export const getCategoryById = (id: string) => CategoryModel.findById(id);
export const getCategoriesCount = () => CategoryModel.count({});

// --- UPDATE CATEGORY ---

// --- DELETE CATEGORY ---
export const deleteAllCategories = () => CategoryModel.deleteMany({ __v: 0 });
