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

export interface IUser {
  isLoggenIn?: boolean;
  isAdmin?: boolean;
  hasImage?: boolean;
  firstName?: string;
  surname?: string;
  email?: string;
}

export interface IClothes {
  _id: string;
  altTag: string;
  price: number;
  description: string;
  imageUrl: string;
}
