export interface ICloth {
  altTag: string;
  price: number;
  description: string;
  imageUrl: string;
}

export interface IErrors {
  image?: File;
  tag?: string;
  required?: string;
  general?: string;
}
