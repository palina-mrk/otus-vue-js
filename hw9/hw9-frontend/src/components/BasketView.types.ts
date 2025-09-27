export type Product = {
  id: string,
  title: string,
  price: number,
  description: string,
  category: string,
  image: string,
  rating: { 
    rate: number, 
    count: number
  }
};

export type Info = {
  id: string,
  count: string
};

export type Basket = {
  [key: string]:  number | undefined,
};