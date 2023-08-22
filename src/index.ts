import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression"
import cors from "cors";
import mongoose from "mongoose";
import { CategoriesRouter } from "./modules/categories/categories.router";
import { ProductsRouter } from "./modules/products/products.router";

// import { deleteAllProducts, getProductsCount } from "./modules/products/products.controller";
// import { getCategoriesCount } from "./modules/categories/categories.controller";
// import { setAllCategories } from "./modules/categories/utils";

const app = express();

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

const MONGO_URL = "mongodb+srv://eremeev23:eremeev32@cluster0.pv1awcw.mongodb.net/?retryWrites=true&w=majority"

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);

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
