import express, { Request, Response } from "express";
import { getCategories } from "@/resources/category/category.service";

export const CategoriesRouter = express.Router();
CategoriesRouter.get("/", async (request: Request, response: Response) => {
  try {
    const categories = await getCategories();
    response.status(200).send(categories);
  } catch (e) {
    response.status(500);
  }
});
