export type PizzaFetchParams = {
    sortBy: string,
    category: string,
    search:string
}

export type PizzaItems = {
    id: string,
    category: number,
    title: string,
    rating: number,
    price: number,
    imageUrl: string,
    sizes: number[],
    types: number[]
}

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'completed',
    ERROR = 'error',
  }
  

export interface PizzaState {
    items: PizzaItems[],
    status: Status
}