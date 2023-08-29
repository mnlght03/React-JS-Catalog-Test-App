import { useMemo } from "react";
import { IProduct, IProductMap, ISection } from "../types";
import { ISortingSchema, SortingOptions } from "../components/Catalog/Catalog";

const useSortedAndFilteredProducts =  (productsMap: IProductMap, schema: ISortingSchema, callbackFn: Function): IProduct[] => {
  
  const getSectionsProducts = (sections: ISection[], productsMap: IProductMap) => {
    return sections.flatMap((section) => section.items.map((item) => productsMap[item]));
  };

  const getSortedProducts = (products: IProduct[], option: SortingOptions) => {
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

  const getPricesFromSortedProducts = (products: IProduct[], sortingOption: SortingOptions, callbackFn: Function) => {
    if (products.length === 0) {
      callbackFn(0, 0);
      return [0, 0];
    }

    let min, max;
    switch(sortingOption) {
      case SortingOptions.ByPriceAsc:
        min = products[0].price;
        max = products.at(-1)?.price || products[0].price;
        break;
      case SortingOptions.ByPriceDesc:
        min = products.at(-1)?.price || products[0].price;
        max = products[0].price;
        break;
      case SortingOptions.ByTitle:
        const prices = products.map(product => product.price);
        min = prices.reduce((a, b) => Math.min(a, b));
        max = prices.reduce((a, b) => Math.max(a, b));
        break;
    }
    callbackFn(min, max);
    return [min, max];
  }

  const products = useMemo(() => {
    if (!Object.keys(schema).length) return [] as IProduct[];

    const products = getSectionsProducts([...schema.sections], productsMap);
    const sorted = getSortedProducts(products, schema.sortingOption);
    getPricesFromSortedProducts(sorted, schema.sortingOption, callbackFn);
    const sortedAndFiltered = getSortedProducts(
      products.filter(
        (product) =>
          product.price >= schema.minPrice &&
          product.price <= schema.maxPrice
      ),
      schema.sortingOption
    );

    return sortedAndFiltered;
  }, [productsMap, schema]);

  return products;
}

export default useSortedAndFilteredProducts;