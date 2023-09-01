import "module-alias/register";
import "dotenv/config";
import { App } from "./app";
import { validateEnv } from "@/utils/validateEnv";
import { CategoryController } from "@/resources/category/category.controller";
import { ProductController } from "@/resources/product/product.controller";
import { NavigationsController } from "@/resources/navigations/navigations.controller";

validateEnv();

const controller = [
  new CategoryController(),
  new ProductController(),
  new NavigationsController(),
];

const app = new App(controller, Number(process.env.PORT));

app.listen();
