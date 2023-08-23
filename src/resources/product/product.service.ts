import { ProductModel } from "@/resources/product/product.model";

export class ProductService {
  public model = ProductModel;

  public async getProducts(page: number, limit: number, filter: object) {
    const options = {
      page,
      limit: limit,
      customLabels: {
        totalDocs: "count",
        docs: "results",
      },
      collation: {
        locale: "en",
      },
    };

    try {
      return this.model.paginate(filter, options);
    } catch (e) {
      throw new Error("No results");
    }
  }

  public async getProductById(id: string) {
    return ProductModel.findById(id);
  }

  public async create(values: Record<string, any>) {
    try {
      return await this.model.create(values);
    } catch (e) {
      throw new Error("Unable to create new product");
    }
  }
}
