import { Document } from "mongoose";

export interface CategoryDocument extends Document {
  name: string;
  slug: string;
  parentId: string;
  children: CategoryDocument[];
  tags: string[];
}
