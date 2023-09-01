import { Router, Request, Response, NextFunction } from "express";
import { Controller } from "@/types/utils/controller";
import { HttpException } from "@/utils/exceptions/http.exception";
import { NavigationsService } from "@/resources/navigations/navigations.service";

export class NavigationsController implements Controller {
  public path: string = "/navigations";
  public router: Router = Router();
  NavigationsService: NavigationsService;

  constructor() {
    this.NavigationsService = new NavigationsService();
    this.initRoutes();
    // this.deleteData();
  }

  private initRoutes() {
    this.router.get(
      `${this.path}/footer`,
      (req: Request, res: Response, next: NextFunction) =>
        this.getFooter(req, res, next),
    );
    this.router.post(
      `${this.path}/footer`,
      (req: Request, res: Response, next: NextFunction) =>
        this.createFooter(req, res, next),
    );
  }

  private async getFooter(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.NavigationsService.getFooter();
      res.status(200).json(response[0]);
    } catch (e) {
      next(new HttpException(404, "Cannot find footer data"));
    }
  }

  private async createFooter(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.NavigationsService.create(req.body);
      res.status(201).json(response);
    } catch (e) {
      next(new HttpException(400, "Cannot create product"));
    }
  }

  private async deleteData() {
    const ids = [
      "64f2035d858938bc52da3809",
      "64f2039a858938bc52da380c",
      "64f203b2858938bc52da380e",
    ];

    try {
      for (let i = 0; i < ids.length; i++) {
        const res = await this.NavigationsService.deleteData(ids[i]);
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
