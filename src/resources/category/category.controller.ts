import { Router, Request, Response, NextFunction } from "express";
import { Controller } from "@/types/utils/controller";
import { HttpException } from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "@/resources/category/category.validation";
import { CategoryService } from "@/resources/category/category.service";

export class CategoryController implements Controller {
  public path: string = "/categories";
  public router: Router = Router();
  CategoryService: CategoryService;

  constructor() {
    this.CategoryService = new CategoryService();
    this.initRoutes();
  }

  private initRoutes() {
    this.router.get(
      `${this.path}`,
      (req: Request, res: Response, next: NextFunction) =>
        this.getAllCategories(req, res, next),
    );

    this.router.get(
      `${this.path}/category/:id`,
      (req: Request, res: Response, next: NextFunction) =>
        this.getCategoryById(req, res, next),
    );

    this.router.get(
      `${this.path}/main`,
      (req: Request, res: Response, next: NextFunction) =>
        this.getMainCategories(req, res, next),
    );

    this.router.post(
      `${this.path}`,
      validationMiddleware(validate.create),
      this.create,
    );

    // this.router.delete(`${this.path}`, this.deleteAllCategories);
  }

  private async getAllCategories(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const categories = await this.CategoryService.getCategories(1, 30);
      res.status(200).json(categories);
    } catch (e) {
      next(new HttpException(404, `Cannot load categories ${this}`));
    }
  }

  private async getCategoryById(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const category = await this.CategoryService.getCategoryById(
        req.params.id,
      );
      res.status(200).json(category);
    } catch (e) {
      next(new HttpException(404, "No category"));
    }
  }

  private async getMainCategories(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const categories = await this.CategoryService.getCategories(1, 3);
      res.status(200).json(categories);
    } catch (e) {
      next(new HttpException(404, "No category"));
    }
  }

  private async create(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await this.CategoryService.create(req.body);
      res.status(201).json({ category });
    } catch (e) {
      next(new HttpException(400, "Cannot create category"));
    }
  }

  private async deleteAllCategories(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const response = await this.CategoryService.deleteAllCategories();
      res.status(200).json(`Deleted ${response.deletedCount}`);
    } catch (e) {
      next(new HttpException(403, "Request is wrong"));
    }
  }
}
