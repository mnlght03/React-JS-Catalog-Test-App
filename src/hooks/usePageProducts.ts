import { useMemo } from "react";
import { IProduct } from "../types";

const usePageProducts = (products: IProduct[], page: number, perPage: number, callbackFn: Function) => {
  return useMemo(() => {
    if (products.length === 0)  return products;
    if (page * perPage >= products.length) {
      let lastPage = Math.floor((products.length - 1) / perPage);
      callbackFn(lastPage > 0 ? lastPage : 0);
    }
    return products.slice(page * perPage, page * perPage + perPage);
  }, [products, page, perPage]);
}

export default usePageProducts;