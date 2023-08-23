import express, { Application } from "express";
import mongoose from "mongoose";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";
import helmet from "helmet";
import { Controller } from "@/types/utils/controller";
import { errorMiddleware } from "@/middleware/error.middleware";

export class App {
  public express: Application;
  public port: number;

  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initDbConnection();
    this.initMiddleware();
    this.initControllers(controllers);
    this.initErrorHandling();
  }

  private initMiddleware(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(cors());
    this.express.use(compression());
    this.express.use(helmet());
    this.express.use(morgan("dev"));
  }

  private initControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.express.use("/api", controller.router);
    });
  }

  private initErrorHandling(): void {
    this.express.use(errorMiddleware);
  }

  initDbConnection(): void {
    const { MONGO_URI } = process.env;

    mongoose.Promise = Promise;
    mongoose.connect(MONGO_URI);

    mongoose.connection.on("error", (error: Error) => console.log(error));
    mongoose.connection.on("connected", async () => {
      console.log("Connected");

      // DB CHECK AND UPDATE UTILS
      // const res = await deleteAllCategories();
      // console.log(res.deletedCount);
      // await setAllCategories();
      // setAllProducts();
      // const res = await deleteAllProducts();
      // console.log(res.deletedCount)
    });
  }

  public listen() {
    this.express.listen(this.port, () => {
      console.log("server is running on 8080");
    });
  }
}
