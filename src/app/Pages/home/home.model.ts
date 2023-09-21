export type TISProduct = {
  products:TProduct[],
  loading:boolean,
  cart:{
    products:TCartProduct[]
  }
};

export const ISProduct: TISProduct = {
  products:[],
  loading:true,
  cart: {
    products:[]
  }
};

export type TProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: TRating;
}
export type TCartProduct = TProduct & {count:number}
export type TRating  ={
  rate: number;
  count: number;
}
