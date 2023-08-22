import {createProduct} from "../products.controller";
import {Product} from "../../../types";
import axios from "axios";

export const setAllProducts = async () => {
  const products = await getProducts();

  // products.forEach((product) => {
  //   createProduct(product);
  // })

  // console.log("Done!");
  // console.log(products.length);
}

const config = {
  headers: {
    "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
    "X-RapidAPI-Key": process.env.RAPID_KEY,
  }
}

async function getProducts(): Promise<Array<Product>> {
  const resultArr: Product[][] = [];

  // for (let i = 327; i <= 332; i++) {
  //   const { data } = await axios.get<{ results: Array<Product> }>(`https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?currentpage=${i}`, config);
  //   resultArr.push(data.results)
  // }

  return resultArr.flat();
}
