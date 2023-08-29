import React, { useEffect, useState } from 'react';

import './Catalog.css';
import { Filters, ProductsList } from '.';
import { CheckboxInput, DropDownButton, Pagination, SliderInput } from '../ui';
import CatalogHeader from './CatalogHeader';
import { IProductMap, ISection } from '../../types';
import {
  useCatalogSetup,
  usePageProducts,
  useSortedAndFilteredProducts,
} from '../../hooks';
import FilterItem from '../ui/FilterItem';

interface CatalogProps {
  itemsPerPage?: number;
}

export enum SortingOptions {
  ByPriceAsc = 'Сначала дешёвые',
  ByPriceDesc = 'Сначала дорогие',
  ByTitle = 'По названию',
}

export interface ISortingSchema {
  minPrice: number;
  maxPrice: number;
  sortingOption: SortingOptions;
  sections: Set<ISection>;
  page: number;
}

export default function Catalog({ itemsPerPage = 6 }: CatalogProps) {
  const [sections, setSections] = useState([] as ISection[]);
  const [productsMap, setProductsMap] = useState({} as IProductMap);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const [isFilterMobileVisible, setIsFilterMobileVisible] = useState(false);

  const [throttleTimeout, setThrottleTimeout] = useState(0);

  const [sortingSchema, setSortingSchema] = useState({} as ISortingSchema);

  const updatePrices = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const selectedProducts = useSortedAndFilteredProducts(
    productsMap,
    sortingSchema,
    updatePrices
  );

  const pageProducts = usePageProducts(
    selectedProducts,
    sortingSchema.page,
    itemsPerPage,
    (page: number) => setSortingSchema({ ...sortingSchema, page: page })
  );

  useCatalogSetup(
    setSections,
    setProductsMap,
    setMinPrice,
    setMaxPrice,
    setSortingSchema
  );

  const throttleCallback = (callbackFn: Function, limit: number) => {
    clearTimeout(throttleTimeout);
    const timeout = setTimeout(callbackFn, limit);
    setThrottleTimeout(timeout as unknown as number);
  };

  return (
    <div className="catalog-section">
      <CatalogHeader title={'Каталог'} itemsCount={selectedProducts.length} />
      <div className="filter-and-cards-wrapper">
        <Filters
          mobileHidden={!isFilterMobileVisible}
          callbackFn={() => setIsFilterMobileVisible(false)}
        >
          {(minPrice !== 0 || maxPrice !== 0) && (
            <FilterItem name={'Цена'}>
              <SliderInput
                minValue={minPrice}
                maxValue={maxPrice}
                initLeftValue={sortingSchema.minPrice}
                initRightValue={sortingSchema.maxPrice}
                step={50}
                minValueDifference={100}
                callbackFn={(left: number, right: number) =>
                  throttleCallback(
                    () =>
                      setSortingSchema({
                        ...sortingSchema,
                        minPrice: Number(left),
                        maxPrice: Number(right),
                      }),
                    200
                  )
                }
              />
            </FilterItem>
          )}
          <FilterItem name={'Категории'}>
            {sections.map((section) => (
              <CheckboxInput
                callbackFn={(event: React.ChangeEvent<HTMLInputElement>) =>
                  throttleCallback(() => {
                    const isChecked = event.target.checked;
                    const updatedSections = sortingSchema.sections;

                    if (isChecked) updatedSections.add(section);
                    else if (!isChecked) updatedSections.delete(section);

                    setSortingSchema({ ...sortingSchema, sections: updatedSections });
                  }, 300)
                }
                checked={sortingSchema.sections.has(section)}
                key={section.id}
                name={section.title}
              />
            ))}
          </FilterItem>
        </Filters>

        <div className="cards-wrapper">
          <div className="cards-wrapper__header">
            <div
              id="filter-button-mobile"
              className="mobile-visible"
              onClick={() => setIsFilterMobileVisible(true)}
            >
              <span></span> Фильтры
            </div>
            <DropDownButton
              setOptionFn={(option: SortingOptions) => {
                setSortingSchema({ ...sortingSchema, sortingOption: option });
              }}
              options={Object.values(SortingOptions)}
            />
          </div>

          {pageProducts.length > 0 && <ProductsList products={pageProducts} />}

          <Pagination
            page={sortingSchema.page}
            totalPages={Math.ceil(selectedProducts.length / itemsPerPage)}
            pagesVisible={4}
            setPageFn={(page: number) => {
              setSortingSchema({ ...sortingSchema, page: page });
            }}
          />
        </div>
      </div>
    </div>
  );
}
