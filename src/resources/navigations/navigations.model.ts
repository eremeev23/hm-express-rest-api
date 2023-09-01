import { Schema, model, PaginateModel } from "mongoose";
import { FooterDocument } from "@/resources/navigations/navigations.interface";

const CustomersLink: Schema = new Schema({
  href: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const FooterNavLink: Schema = new Schema({
  href: {
    type: String,
    required: true,
  },
  iconName: {
    type: String,
    required: true,
  },
});

const FooterSchema: Schema = new Schema(
  {
    for_customers: [CustomersLink],
    links: [FooterNavLink],
  },
  {
    timestamps: true,
  },
);

export const FooterModel = model<FooterDocument>(
  "Footer",
  FooterSchema,
  "footer",
);
