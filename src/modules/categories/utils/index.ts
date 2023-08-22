import axios from "axios";
import { createCategory } from "../categories.controller";
import { Category } from "../../../types";

interface BaseCategory {
  name: string;
  slug: string;
  parentId?: string;
  children?: BaseCategory[]
}

export const setAllCategories = async () => {
  const categories = await getCategories();

  categories.forEach((category) => {
    const baseCategory: BaseCategory = {
      name: category.CatName,
      slug: category.CategoryValue,
      children: setCategory(category)
    };
    createCategory(baseCategory);
  })
}

function setCategory(category: Category): BaseCategory[] {
  if (!category.CategoriesArray) {
    return [];
  }

  return category.CategoriesArray.map((child: Category) => ({
    parentId: category.CategoryValue,
    name: child.CatName,
    slug: child.CategoryValue,
    children: setCategory(child)
  }))
}

const config = {
  headers: {
    "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
    "X-RapidAPI-Key": process.env.RAPID_KEY,
  }
}

async function getCategories(): Promise<Category[]> {
  const { data } = await axios.get<Category[]>("https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list", config);
  return data;
}
