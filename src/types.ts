export interface IPhoto {
  id: number;
  src: string;
}

export interface IProduct {
  id: number;
  title: string;
  src: string;
  price: number;
  currency: string;
  photo: IPhoto[];
}

export interface IProductMap {
  [key: number]: IProduct;
}

export interface ISection {
  id: number;
  title: string;
  items: number[];
}

export interface ICatalogApiResponse {
  sections: ISection[];
  elements: IProductMap;
}


export type timeoutType = ReturnType<typeof setTimeout>