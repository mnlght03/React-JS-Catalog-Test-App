import React from 'react';
import { PlusSvg } from '../ui/icons';
import { IProduct } from '../../types';


export default function ProductCard(product: IProduct) {
  return (
    <a href="#" className="card">
      <img className="card__img" src={import.meta.env.VITE_API_BASE + product.src} />
      <p className="card__name">{product.title}</p>
      {/* 
      <div className="card__discount">
        СКИДКА 10%
      </div> */}

      {/* <div className="card__parameters-wrapper">
        <div className="card-parameter">
          <p className="card__parameters__name">property name</p>
          <p className="card__parameters__value">property value</p>
        </div>
      </div> */}

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
