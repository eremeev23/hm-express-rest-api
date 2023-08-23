import { NextFunction, Request, Response, Router } from "express";
import { ProductModel } from "@/resources/product/product.model";
import { Controller } from "@/types/utils/controller";
import { ProductService } from "@/resources/product/product.service";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/product/product.validation";
import { HttpException } from "@/utils/exceptions/http.exception";

export class ProductController implements Controller {
  public path: string = "/products";
  public router: Router = Router();
  ProductService: ProductService;

  constructor() {
    this.ProductService = new ProductService();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      `${this.path}`,
      (req: Request, res: Response, next: NextFunction) =>
        this.getProducts(req, res, next),
    );

    this.router.get(
      `${this.path}/:id`,
      (req: Request, res: Response, next: NextFunction) =>
        this.getProductById(req, res, next),
    );

    this.router.post(
      `${this.path}`,
      validationMiddleware(validate.create),
      this.create,
    );
  }

  private async getProducts(req: Request, res: Response, next: NextFunction) {
    const { query } = req;
    const limit = req.query["limit"] || 30;
    const page = req.query["page"] || 1;
    const filter = {};

    for (let key in query) {
      if (key !== "limit" && key !== "page") {
        Object.defineProperty(filter, key, {
          value: query[key],
          enumerable: true,
          configurable: true,
          writable: true,
        });
      }
    }

    try {
      const response = await this.ProductService.getProducts(
        Number(page),
        Number(limit),
        filter,
      );
      res.status(200).json(response);
    } catch (e) {
      next(new HttpException(404, "No results"));
    }
  }

  private async getProductById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const response = await this.ProductService.getProductById(req.params.id);
      res.status(200).json(response);
    } catch (e) {
      next(new HttpException(404, "No results"));
    }
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await this.ProductService.create(req.body);
      res.status(201).json({ product });
    } catch (e) {
      next(new HttpException(400, "Cannot create product"));
    }
  }
}

// --- CREATE PRODUCTS ---
export const createProduct = (values: Record<string, any>) =>
  new ProductModel(values).save().then((user) => user.toObject());

// --- READ PRODUCTS ---
export const getProducts = async (
  limit: number,
  filter: object,
  page: number,
) => {
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

  return ProductModel.paginate(filter, options);
};
export const getProductById = (id: string) => ProductModel.findById(id);
export const getProductsCount = () => ProductModel.count({});

// --- UPDATE PRODUCTS ---

// --- DELETE PRODUCTS ---
export const deleteAllProducts = () => ProductModel.deleteMany({ __v: 0 });
