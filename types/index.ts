export enum Role {
  ADMIN = "ADMIN",
  TEST_ADMIN = "TEST_ADMIN",
  USER = "USER",
}

export interface User {
  id: string;
  firstname: string;
  surname: string;
  email: string;
  password: string;
  role: Role;
  orders?: Order[];
  suggestions?: Suggestion[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  orderItems: OrderItem[];
  user: User;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cloth {
  id: string;
  description: string;
  price: number;
  imageUrl: string;
  altTag: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  cloth: Cloth;
  quantity: number;
  priceAtPurchase: number;
}

export interface Suggestion {
  id: string;
  imageUrl: string;
  description: string;
  user: User;
}

export interface AuthContextType {
  user: User | null;
  login: (formData: FormData) => void;
  logout: () => void;
  hasPermission: (requiredRole: Role) => boolean;
}

export interface ICloth {
  altTag: string;
  price: number;
  description: string;
  image: string;
}

export interface IEditCloth {
  clothId: string;
  altTag?: string;
  price?: number;
  description?: string;
  image?: string;
}