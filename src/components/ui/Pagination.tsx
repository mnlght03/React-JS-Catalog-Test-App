import React, { useEffect, useState } from 'react';
import { ChevronDownSvg } from './icons';

interface PaginationProps {
  page: number;
  totalPages: number;
  pagesVisible?: number;
  setPageFn?: Function;
}

export default function Pagination({
  page,
  totalPages,
  pagesVisible = 5,
  setPageFn = () => {},
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(page);
  const [fraction, setFraction] = useState(0);

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  const setCurrent = (value: number) => {
    if (value < 0) value = 0;
    if (value >= totalPages) value = totalPages - 1;
    setCurrentPage(value);
    setPageFn(value);
  };

  return (
    <div className="pagination">
      <ChevronDownSvg
        className={`pagination__left-arrow ${ fraction !== 0 ? 'svg-stroke-blue' : ''}`}
        onClick={() => {
          setCurrent(currentPage - 1);
          if (fraction > 0 && currentPage - 1 < fraction * pagesVisible) setFraction(fraction - 1);
        }}
      />
      <div className="pagination__buttons-wrapper">
        {fraction !== 0 && (
          <div
            className={`pagination__button mobile-hidden`}
            onClick={() => {
              setFraction(fraction - 1);
              setCurrent(fraction * pagesVisible - 1);
            }}
          >
            ...
          </div>
        )}
        {[...Array(totalPages).keys()].map(
          (i) =>
            i >= fraction * pagesVisible &&
            i < (fraction + 1) * pagesVisible && (
              <div
                className={`pagination__button ${i === currentPage ? 'active' : ''}`}
                onClick={() => setCurrent(i)}
                key={i}
              >
                {i + 1}
              </div>
            )
        )}
        {fraction !== Math.ceil(totalPages / pagesVisible) - 1 && (
          <div
            className={`pagination__button mobile-hidden`}
            onClick={() => {
              setFraction(fraction + 1);
              setCurrent((fraction + 1) * pagesVisible)
            }}
          >
            ...
          </div>
        )}
      </div>
      <ChevronDownSvg
        className={`pagination__right-arrow ${ fraction !== Math.ceil(totalPages / pagesVisible) - 1 ? 'svg-stroke-blue' : 0}`}
        onClick={() => {
          setCurrent(currentPage + 1);
          if (fraction < Math.ceil(totalPages / pagesVisible) - 1 && currentPage + 1 >= (fraction + 1) * pagesVisible) setFraction(fraction + 1);
        }}
      />
    </div>
  );
}
