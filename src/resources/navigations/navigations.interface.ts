import { Document } from "mongoose";
import { Link, LinkWithIcon } from "@/types/data";

export interface FooterDocument extends Document {
  for_customers: Link[];
  links: LinkWithIcon[];
}
