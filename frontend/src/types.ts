export type FormValues = {
  username?: string;
  email: string;
  password: string;
};

export interface UserInfo {
  _id: string;
  username: string;
  email: string;
  isAdmin: boolean;
}

export interface IApiResponse {
  status: number;
  response?: {
    data?: {
      error?: string;
    };
  };
}

export interface ICategory {
  _id: string;
  name: string;
}

export interface ApiResponse {
  status: number;
  data?: any;
  response?: {
    status?: number;
    data?: any;
  };
}

export interface ApiErrorResponse {
  response: {
    status: number;
    data: {
      errorMsg: string;
    };
  };
}

export interface Products {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: any;
}

export interface ProductData {
  product_name: string;
  product_price: string;
  product_quantity: string;
  product_brand: string;
  product_description: string;
  product_count_in_stock: string;
  product_category: string;
  imagePath: string;
}
