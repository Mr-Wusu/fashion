export enum Role {
  ADMIN = "ADMIN",
  TEST_ADMIN = "TEST_ADMIN",
  USER = "USER",
}


export enum Order_Status {
  PENDING = "PENDING",
  ATTENDING = "ATTENDING",
  FULFILLED = "FULFILLED",
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
}

export interface AuthUser {
  firstname: string;
  surname: string;
  email: string;
  role: Role;
  orders?: Order[];
  suggestions?: Suggestion[];
}

export interface Order {
  id: string;
  userId: string;
  orderItems: OrderItem[];
  user?: User;
  status: Order_Status;
  createdAt: Date;
  updatedAt: Date;
}

export interface Cloth {
  id: string;
  description: string;
  price: number;
  imageUrl: string;
  altTag: string;
}

export interface OrderItem {
  id: string;
  clothId: string;
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
  user: AuthUser | null;
  login: (formData: FormData) => void;
  logout: () => void;
  hasPermission: (requiredRole: Role) => boolean;
}

export interface IEditCloth {
  clothId: string;
  altTag?: string;
  price?: number;
  description?: string;
  image?: string;
}
