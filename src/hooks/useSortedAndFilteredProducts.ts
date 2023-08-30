import { useMemo } from 'react';
import { IProduct, IProductMap } from '../types';
import { ISortingSchema } from '../components/Catalog/Catalog';
import CatalogService from '../components/Catalog/CatalogService';

const useSortedAndFilteredProducts = (
  productsMap: IProductMap,
  schema: ISortingSchema,
  callbackFn: Function
): IProduct[] => {
  const products = useMemo(() => {
    if (!Object.keys(schema).length) return [] as IProduct[];

    const products = CatalogService.getProductsBySections(
      [...schema.sections],
      productsMap
    );
    const sorted = CatalogService.getSortedProducts(products, schema.sortingOption);
    CatalogService.getPricesFromSortedProducts(sorted, schema.sortingOption, callbackFn);
    const sortedAndFiltered = sorted.filter(
      (product) => product.price >= schema.minPrice && product.price <= schema.maxPrice
    );

    return sortedAndFiltered;
  }, [productsMap, schema]);

  return products;
};

export default useSortedAndFilteredProducts;
