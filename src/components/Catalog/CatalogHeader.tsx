interface CatalogHeaderProps {
  title: string,
  itemsCount: number
}


export default function CatalogHeader({title, itemsCount}: CatalogHeaderProps) {
  const getInclination = (value: number): string => {
    if (value % 100 - value % 10 === 10)
      return 'товаров';
    switch (value % 10) {
      case 1: 
        return 'товар';
      case 2: case 3: case 4:
        return 'товара';
      case 5: case 6: case 7: case 8: case 9: case 0:
        return 'товаров'
      default: return 'товаров'
    } 
  }

  return (
    <div className="catalog-header">
      <h1 className="catalog-header__title">{title}</h1>
      <p className="catalog-header__subtitle">
        {itemsCount} {getInclination(itemsCount)}
      </p>
    </div>
  );
}
