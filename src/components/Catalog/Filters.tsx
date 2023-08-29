import React, { ReactNode } from 'react';
import { CrossSvg } from '../ui/icons';

interface FiltersProps {
  mobileHidden?: boolean;
  children?: ReactNode | ReactNode[];
  callbackFn?: Function;
}

export default function Filters({ mobileHidden = false, children, callbackFn = () => {} }: FiltersProps) {
  return (
    <div className={`filters ${mobileHidden ? 'mobile-hidden' : ''}`}>
      {/* <p id="filters__clear-all-button">Очистить все</p> */}
      <CrossSvg id="filters__close-button-mobile" onClick={() => callbackFn()}/>
      <h3 className="filters__title">Фильтры</h3>
      {children}
      {/* <div id="filters__apply-button" onClick={() => {}}>
        Применить фильтры
      </div> */}
    </div>
  );
}
