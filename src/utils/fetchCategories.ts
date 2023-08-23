import axios from "axios";
import { createCategory } from "@/resources/category/category.service";
import { Category } from "@/types/data";
import { hmApiConfig } from "@/config/hmApiConfig";

interface BaseCategory {
  name: string;
  slug: string;
  parentId?: string;
  children?: BaseCategory[];
  tags: string[];
}

export const setAllCategories = async () => {
  const categories = await getCategories();

  categories.forEach((category) => {
    const baseCategory: BaseCategory = {
      name: category.CatName,
      slug: category.CategoryValue,
      children: setCategory(category),
      tags: [...category.tagCodes],
    };

    createCategory(baseCategory);
  });
};

function setCategory(category: Category): BaseCategory[] {
  if (!category.CategoriesArray) {
    return [];
  }

  return category.CategoriesArray.map((child: Category) => ({
    parentId: category.CategoryValue,
    name: child.CatName,
    slug: child.CategoryValue,
    children: setCategory(child),
    tags: [...child.tagCodes],
  }));
}

async function getCategories(): Promise<Category[]> {
  const { data } = await axios.get<Category[]>(
    "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/categories/list",
    hmApiConfig,
  );
  return data;
}
