import "module-alias/register";
import "dotenv/config";
import { App } from "./app";
import { validateEnv } from "@/utils/validateEnv";
import { CategoryController } from "@/resources/category/category.controller";
import { ProductController } from "@/resources/product/product.controller";

validateEnv();

const controller = [new CategoryController(), new ProductController()];

const app = new App(controller, Number(process.env.PORT));
// removeNotUniqItems();
app.listen();
