import express, { Request, Response } from "express";
import {getProductById, getProducts} from "./products.controller";

export const ProductsRouter = express.Router();
ProductsRouter.get("/", async (request: Request, response: Response) => {
  const { query } = request;
  const limit = request.query["limit"] || 30;
  const filter = {};

  for (let key in query) {
    if (key !== "limit") {
      Object.defineProperty(filter, key, {
        value: query[key],
        enumerable: true,
        configurable: true,
        writable: true });
    }
  }

  try {
    const products = await getProducts(Number(limit), filter);
    response.status(200).send(products);
  } catch (e) {
    response.status(500);
  }
})

ProductsRouter.get("/:id", async (request: Request, response: Response) => {
  const { params } = request;

  try {
    const product = await getProductById(params.id);

    console.log(product);

    if (typeof product === "object") {
      response.status(200).send(product);
    } else {
      response.status(404).send("Not found");
    }
  } catch (e) {
    response.status(500);
  }
})
