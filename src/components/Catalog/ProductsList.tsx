import ProductCard from './ProductCard';
import { IProduct } from '../../types';

interface ProductsListProps {
  products: IProduct[]
}

export default function ProductsList({products}: ProductsListProps) {
  return (
    <div className="cards-grid">
      {products.map(product => <ProductCard key={product.id} {...product} />)}
    </div>
  );
}
