import React from 'react';

interface ProductCardParametersProps {
  parameters: Object;
}

export default function ProductCardParameters({
  parameters,
}: ProductCardParametersProps) {
  return (
    <div className="card__parameters-wrapper">
      {Object.entries(parameters).map(([key, value]) => (
        <div className="card-parameter">
          <p className="card__parameters__name">{key}</p>
          <p className="card__parameters__value">{value}</p>
        </div>
      ))}
    </div>
  );
}
