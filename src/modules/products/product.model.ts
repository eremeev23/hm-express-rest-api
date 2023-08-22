import mongoose, { Schema } from "mongoose";

const StockSchema: Schema = new Schema({
  stockLevel: Number || String
})

const ImageSchema: Schema = new Schema({
  url: String,
  baseUrl: String,
})

const PriceSchema: Schema = new Schema({
  currencyIso: String,
  value: Number,
  priceType: String,
  formattedValue: String,
  type: String,
})

const ColorSchema: Schema = new Schema({
  code: String,
  text: String,
  filterName: String,
  hybrisCode: String,
})

const MarkerSchema: Schema = new Schema({
  text: String,
  type: String
})

const ArticleSchema: Schema = new Schema({
  code: String,
  name: String,
  images: [ImageSchema],
  pk: String,
  whitePrice: PriceSchema,
  logoPicture: [ImageSchema],
  normalPicture: [ImageSchema],
  markers: [MarkerSchema],
  visible: Boolean,
  numbersOfPieces: Number,
  ticket: String,
  dummy: Boolean,
  ecoTaxValue: Number,
  redirectToPdp: Boolean,
  comingSoon: Boolean,
  color: ColorSchema,
  rgbColor: String,
  genArticle: String,
  turnToSku: String,
})

const SizeSchema: Schema = new Schema({
  orderFilter: Number,
  filterCode: String,
})

const ProductSchema: Schema = new Schema({
  code: String,
  name: String,
  stock: StockSchema,
  price: PriceSchema,
  whitePrice: PriceSchema,
  pk: String,
  colors: [String],
  images: [ImageSchema],
  articles: [ArticleSchema],
  markers: [MarkerSchema],
  visible: Boolean,
  concept: [String],
  numbersOfPieces: Number,
  defaultArticle: ArticleSchema,
  sale: Boolean,
  variantSizes: [SizeSchema],
  swatches: [],
  categories: [],
  articleCodes: [String],
  ticket: String,
  searchEngineProductId: String,
  dummy: String,
  linkPdp: String,
  categoryName: String,
  rgbColors: [String],
  articleColorNames: [String],
  ecoTaxValue: Number,
  swatchesTotal: Number,
  showPriceMarker: Boolean,
  redirectToPdp: Boolean,
  mainCategoryCode: String,
  comingSoon: Boolean,
  brandName: String,
  galleryImages: [ImageSchema]
})

export const ProductModel = mongoose.model("Product", ProductSchema);
