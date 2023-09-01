import axios from "axios";
import { createCategory } from "@/resources/category/category.service";
import { Category } from "@/types/data";
import { hmApiConfig } from "@/config/hmApiConfig";

interface BaseCategory {
  uid: string;
  name: string;
  slug: string;
  parentId?: string;
  children?: BaseCategory[];
  tags: string[];
  order?: number;
  image?: string;
}

export const setAllCategories = async () => {
  const orders: { [key: string]: number } = {
    men: 1,
    ladies: 2,
    kids: 3,
    sport: 4, // categoryName: SPORTSWEAR,Men ; Ladies,SPORTSWEAR
    home: 5, // categoryName: Home All
    baby: 6,
    beauty: 7,
    giftguide: 8,
    divided: 9, // concept: ["BASICS,DIVIDED"]
    outlet: 10,
    sale: 11, // sale=true
  };

  const images: { [key: string]: undefined | string } = {
    men: "https://image.hm.com/assets/hm/cb/01/cb01d3837943a7cb9eb108cbdb7e8df7bddfa280.jpg",
    ladies:
      "https://image.hm.com/assets/hm/21/ad/21adb011ff8d780635422ba2445a71b0a1c0c3c7.jpg",
    kids: "https://image.hm.com/assets/hm/21/40/2140129f8ebe2785959eba74a7cbc1e458b64551.jpg",
    sport: undefined,
    home: undefined,
    baby: undefined,
    beauty: undefined,
    giftguide: undefined,
    divided: undefined,
    outlet: undefined,
    sale: undefined,
  };

  const categories = await getCategories();

  for (const category of categories) {
    const baseCategory: BaseCategory = {
      uid: Date.now().toString(36) + Math.random().toString(36).substr(2),
      name: category.CatName,
      slug: category.CategoryValue,
      children: setCategory(category),
      tags: [...category.tagCodes],
      order: orders[category.CategoryValue],
      image: images[category.CategoryValue],
    };

    await createCategory(baseCategory);
  }
};

function setCategory(category: Category): BaseCategory[] {
  if (!category.CategoriesArray) {
    return [];
  }

  return category.CategoriesArray.map((child: Category) => {
    const obj: BaseCategory = {
      uid: Date.now().toString(36) + Math.random().toString(36).substr(2),
      parentId: category.CategoryValue,
      name: child.CatName,
      slug: child.CategoryValue,
      children: setCategory(child),
      tags: [...child.tagCodes],
    };

    createCategory(obj);

    return obj;
  });
}

async function getCategories(): Promise<Category[]> {
  const { data } = await axios.get<Category[]>(
    "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list",
    hmApiConfig,
  );
  return data;
}
