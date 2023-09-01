import {
  createProduct,
  getProductsCount,
} from "@/resources/product/product.controller";
import { Product } from "@/types/data";
import axios from "axios";
import { hmApiConfig } from "@/config/hmApiConfig";

export const setAllProducts = async () => {
  for (let i = 22; i <= 33; i++) {
    const products = await getProducts(i);

    products.forEach((product) => {
      createProduct(product);
    });

    const productsCount = await getProductsCount();

    console.log(`Done! page ${i}`); // 221
    console.log(productsCount);
  }
};

async function getProducts(time: number): Promise<Array<Product>> {
  const resultArr: Product[][] = [];

  let start = 10 * time;
  let finish = start + 9;

  for (let i = start; i <= finish; i++) {
    const { data } = await axios.get<{ results: Array<Product> }>(
      `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?currentpage=${i}`,
      hmApiConfig,
    );
    resultArr.push(data.results);
  }

  return resultArr.flat();
}
