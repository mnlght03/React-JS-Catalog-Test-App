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

  static getProductsBySections(sections: ISection[], productsMap: IProductMap) {
    return sections.flatMap((section) => section.items.map((item) => productsMap[item]));
  }

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
  }

  static getPricesFromSortedProducts(
    products: IProduct[],
    sortingOption: SortingOptions,
    callbackFn: Function
  ) {
    if (products.length === 0) {
      callbackFn(0, 0);
      return [0, 0];
    }

    let min, max;
    switch (sortingOption) {
      case SortingOptions.ByPriceAsc:
        min = products[0].price;
        max = products[products.length - 1]?.price || products[0].price;
        break;
      case SortingOptions.ByPriceDesc:
        min = products[products.length - 1]?.price || products[0].price;
        max = products[0].price;
        break;
      case SortingOptions.ByTitle:
        const prices = products.map((product) => product.price);
        min = prices.reduce((a, b) => Math.min(a, b));
        max = prices.reduce((a, b) => Math.max(a, b));
        break;
    }
    callbackFn(min, max);
    return [min, max];
  }
}
