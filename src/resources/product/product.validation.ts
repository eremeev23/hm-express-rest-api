import Joi from "joi";
import { Article, Marker, Price, ProductImage, Size } from "@/types/data";

const create = Joi.object({
  code: String,
  name: String,
  stock: {
    stockLevel: Number,
  },
});

export default {
  create,
};
