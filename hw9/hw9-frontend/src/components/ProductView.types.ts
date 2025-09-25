/*
export enum APP_BUTTON_SIZE {
  S = 'S',
  M = 'M',
  L = 'L'
}

export type ValueOf<T extends Record<string, unknown>> = T[keyof T];

export const APP_BUTTON_SIZE = {
  S: 'S',
  M: 'M',
  L: 'L'
} as const;
*/

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