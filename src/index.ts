import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression"
import cors from "cors";
import mongoose from "mongoose";
import { CategoriesRouter } from "./modules/categories/categories.router";
import { ProductsRouter } from "./modules/products/products.router";
import dotenv from "dotenv";
// import { deleteAllProducts, getProductsCount } from "./modules/products/products.controller";
// import { getCategoriesCount } from "./modules/categories/categories.controller";
// import { setAllCategories } from "./modules/categories/utils";

const app = express();
dotenv.config();

app.use(cors({
  credentials: true
}))

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/categories", CategoriesRouter)
app.use("/api/products", ProductsRouter)

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("server is running on 8080");
})

const MONGO_URI = process.env.MONGO_URI;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URI);

mongoose.connection.on("error", (error: Error) => console.log(error));
mongoose.connection.on("connected", async () => {
  console.log("Connected");

  // DB UTILS
  // const res = await deleteAllCategories();
  // console.log(res.deletedCount);
  // await setAllCategories();
  // setAllProducts();
  // const res = await deleteAllProducts();
  // console.log(res.deletedCount)
});
