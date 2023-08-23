export interface Price {
  currencyIso: string;
  value: number;
  priceType: string;
  formattedValue: string;
  type: string;
}

export interface ProductImage {
  url: string;
  baseUrl: string;
}

export interface Article {
  code: string;
  name: string;
  images: ProductImage[];
  pk: string;
  whitePrice: Price;
  logoPicture: ProductImage[];
  normalPicture: ProductImage[];
  markers: Marker[];
  visible: boolean;
  numbersOfPieces: number;
  ticket: string;
  dummy: boolean;
  ecoTaxValue: number;
  redirectToPdp: boolean;
  comingSoon: boolean;
  color: Color;
  rgbColor: string;
  genArticle: string;
  turnToSku: string;
}

export interface Color {
  code: string;
  text: string;
  filterName: string;
  hybrisCode: string;
}

export interface Marker {
  text: string;
  type: string;
}

export interface Size {
  orderFilter: number;
  filterCode: string;
}

export interface Product {
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

export interface Category {
  CatName: string;
  CategoryValue: string;
  CategoriesArray?: Category[];
  tagCodes: string[];
}
