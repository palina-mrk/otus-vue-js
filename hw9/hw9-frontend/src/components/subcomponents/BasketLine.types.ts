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
} | undefined;

export type Info = {
  id: string,
  count: string
}