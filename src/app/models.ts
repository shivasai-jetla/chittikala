export type Category = 'All' | 'Sarees' | 'Kurtis' | 'Jewellery' | 'Dresses' | 'Accessories';

export interface Product {
  id: number;
  name: string;
  category: Exclude<Category, 'All'>;
  price: number;
  oldPrice?: number;
  badge?: string;
  description: string;
  image: string;
}

export interface CartLine extends Product {
  quantity: number;
}

export interface CustomerDetails {
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  note?: string;
}
