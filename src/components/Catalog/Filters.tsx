import React, { ReactNode } from 'react';
import { CrossSvg } from '../ui/icons';
import { CheckboxInput, SliderInput } from '../ui';
import FilterItem from '../ui/FilterItem';

interface FiltersProps {
  children?: ReactNode | ReactNode[];
}

export default function Filters({ children }: FiltersProps) {
  return (
    <div className="filters mobile-hidden">
      {/* <p id="filters__clear-all-button">Очистить все</p> */}
      {/* <CrossSvg id="filters__close-button-mobile" className="mobile-visible" /> */}
      <h3 className="filters__title">Фильтры</h3>
      {children}
      {/* <div id="filters__apply-button" onClick={() => {}}>
        Применить фильтры
      </div> */}
    </div>
  );
}
