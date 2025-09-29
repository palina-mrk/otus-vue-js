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

export type ProductInputType = {
  title: string | undefined,
  price: number | undefined,
  description: string | undefined,
  category: string | undefined,
  image: string | undefined,
};

export type Payload = {
  id: number,
  count: number,
}

export type Basket = {
  [key: string]:  number | undefined,
}