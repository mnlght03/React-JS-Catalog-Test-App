import React from 'react';
import { PlusSvg } from '../ui/icons';
import { IProduct } from '../../types';
import ProductCardParameters from './ProductCardParameters';

export default function ProductCard(product: IProduct) {
  return (
    <a href="#" className="card">
      <img className="card__img" src={import.meta.env.VITE_API_BASE + product.src} />
      <p className="card__name">{product.title}</p>
      {/* <div className="card__discount"> СКИДКА 10% </div> */}
      <ProductCardParameters
        parameters={{ key1: 'value1', key2: 'value2', key3: 'value3' }}
      />
      <div className="price-row">
        <span className="price">
          {product.price} {product.currency}
        </span>
        {/* <p className="old-price">
          <span className="price-format">{product.oldPrice}</span>
        </p> */}
        <div className="add-to-cart-button" onClick={() => {}}>
          <PlusSvg />
        </div>
      </div>
    </a>
  );
}
