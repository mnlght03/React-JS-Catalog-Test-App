import { useEffect } from 'react';
import CatalogService from '../components/Catalog/CatalogService';
import { SortingOptions } from '../components/Catalog/Catalog';

const useCatalogSetup = (
  setSections: Function,
  setProductsMap: Function,
  setMinPrice: Function,
  setMaxPrice: Function,
  setSortingSchema: Function
) => {
  const setup = async () => {
    try {
      const data = await CatalogService.fetchAll();
      const sections = CatalogService.getSectionsFromResponse(data);
      const productsMap = CatalogService.getProductsFromResponse(data);
      setSections(sections);
      setProductsMap(productsMap);

      const products = CatalogService.getSectionsProducts(sections, productsMap);
      const sortedProducts = CatalogService.getSortedProducts(
        products,
        SortingOptions.ByPriceAsc
      );

      const minPrice = Number(sortedProducts[0].price);
      const maxPrice = Number(sortedProducts.at(-1)?.price || sortedProducts[0].price);

      setMinPrice(minPrice);
      setMaxPrice(maxPrice);
      setSortingSchema({
        sortingOption: SortingOptions.ByPriceAsc,
        page: 0,
        sections: new Set(sections),
        minPrice: minPrice,
        maxPrice: maxPrice,
      });
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setup();
  }, []);
};

export default useCatalogSetup;
