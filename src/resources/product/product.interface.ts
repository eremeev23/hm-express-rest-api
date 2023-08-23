import { Document } from "mongoose";
import { Article, Marker, Price, ProductImage, Size } from "@/types/data";

export interface ProductDocument extends Document {
  code: string;
  name: string;
  stock: {
    stockLevel: number;
  };
  price: Price;
  images: ProductImage[];
  categories: [];
  pk: string;
  whitePrice: Price;
  articles: Article[];
  markers: Marker[];
  visible: boolean;
  concept: string[];
  numbersOfPieces: number;
  defaultArticle: Article;
  sale: boolean;
  variantSizes: Size[];
  swatches: [];
  articleCodes: string[];
  ticket: string;
  searchEngineProductId: string;
  dummy: boolean;
  linkPdp: string;
  categoryName: string;
  rgbColors: string[];
  articleColorNames: string[];
  ecoTaxValue: number;
  swatchesTotal: number;
  showPriceMarker: boolean;
  redirectToPdp: boolean;
  mainCategoryCode: string;
  comingSoon: boolean;
  brandName: string;
  galleryImages: ProductImage[];
}
