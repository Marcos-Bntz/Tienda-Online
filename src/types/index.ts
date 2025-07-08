export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  description: string;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  stock: number;
  featured: boolean;
}

export interface Category {
  id: number;
  name: string;
  count: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}