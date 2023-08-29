import axios from 'axios';
import { ISection, IProductMap, ICatalogApiResponse, IProduct } from '../../types';
import { SortingOptions } from './Catalog';

export default class CatalogService {
  static API_URL = import.meta.env.VITE_API_BASE + '/test/json/';

  static async fetchAll(): Promise<ICatalogApiResponse> {
    const res = await axios.get(CatalogService.API_URL);
    return res.data;
  }

  static getProductsFromResponse(data: ICatalogApiResponse) {
    return data.elements;
  }

  static getSectionsFromResponse(data: ICatalogApiResponse) {
    return data.sections;
  }

  static async fetchProducts(): Promise<IProductMap> {
    const res = await axios.get(CatalogService.API_URL);
    return res.data.elements;
  }

  static async fetchSections(): Promise<ISection[]> {
    const res = await axios.get(CatalogService.API_URL);
    return res.data.sections;
  }

  static getSectionsProducts(sections: ISection[], productsMap: IProductMap) {
    return sections.flatMap((section) => section.items.map((item) => productsMap[item]));
  };

  static getSortedProducts(products: IProduct[], option: SortingOptions) {
    switch (option) {
      case SortingOptions.ByPriceAsc:
        return [...products].sort((a: IProduct, b: IProduct) => a.price - b.price);
      case SortingOptions.ByPriceDesc:
        return [...products].sort((a: IProduct, b: IProduct) => b.price - a.price);
      case SortingOptions.ByTitle:
        return [...products].sort((a: IProduct, b: IProduct) =>
          a.title == b.title ? 0 : a.title < b.title ? -1 : 1
        );
    }
  };
}
