export interface productType {
  id: string;
  name: string;
  price: string;
  description: string;
  slug?: string;
}

export interface addProductType {
 name: string;
    description: string;
    images: (string | File)[];
    price: number;
    categoryId: string;
}
