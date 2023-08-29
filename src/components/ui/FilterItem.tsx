import { ReactNode, useState } from 'react';
import { ChevronDownSvg } from './icons';

interface FilterItemProps {
  name: string;
  children?: ReactNode | ReactNode[];
}

export default function FilterItem({ name, children }: FilterItemProps) {
  const [isOpened, setIsOpened] = useState(true);
  return (
    <div className='filter'>
      <p className="filter__header" onClick={() => setIsOpened(!isOpened)}>
        <span>{name}</span>
        <ChevronDownSvg
          style={{
            transform: `rotate(${isOpened ? 180 : 0}deg)`,
          }}
        />
      </p>
      {isOpened && children}
      {/* {isOpened && <p className="filter__clear-button">Очистить</p>} */}
    </div>
  );
}
