import express, { Request, Response } from "express";
import { ProductsRouter } from "./products.router";
import { getProducts } from "@/resources/product/product.controller";

export const MainPageRouter = express.Router();

ProductsRouter.get("/", async (request: Request, response: Response) => {
  const page = request.query["page"] || 1;

  try {
    const slides = await getProducts(5, {}, Number(page));
  } catch (e) {
    response.status(500);
  }
});
