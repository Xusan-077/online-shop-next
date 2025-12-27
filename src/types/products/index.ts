export interface IApiRespons<T> {
  limit: number;
  products: T;
  skip: number;
  total: number;
}

interface IDimensions {
  width: number;
  height: number;
  depth: number;
}

interface IReview {
  id: number;
  user: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface IMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

interface IReview {
  reviewerName: string;
  reviewerEmail: string;
  rating: number;
  comment: string;
  date: string;
}

export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  tags: string[];
  images: string[];
  thumbnail: string;
  availabilityStatus: string;
  dimensions: IDimensions;
  minimumOrderQuantity: number;
  returnPolicy: string;
  shippingInformation: string;
  sku: string;
  warrantyInformation: string;
  reviews: IReview[];
  meta: IMeta;
  weight: number;
}
