export interface IProduct {
  name: string;
  price: string;
  description: string;
  images: string[];
  extra_info: any;
  _id: string;
}

export interface CreateProductDto {
  name: string;
  price: string;
  description: string;
  images: string;
}