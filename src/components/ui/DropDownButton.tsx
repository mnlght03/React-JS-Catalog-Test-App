import React, { useState } from 'react';
import { CheckBlueSvg, ChevronDownSvg } from './icons';

interface DropDownButtonProps {
  options: string[];
  setOptionFn: Function;
  defaultOption?: number;
}

export default function DropDownButton({
  options,
  setOptionFn,
  defaultOption = 0,
}: DropDownButtonProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [selected, setSelected] = useState(defaultOption);
  return (
    <div
      className={`sorter ${isOpened ? 'active' : ''}`}
      onClick={() => setIsOpened(!isOpened)}
    >
      <p className="sorter__chosen-option">{options[selected]}</p>
      {isOpened && (
        <div className="sorter__options-wrapper">
          {options.map((option, i) => (
            <p
              className={`sorter__option ${i === selected ? 'active' : ''}`}
              key={i}
              onClick={() => {
                setSelected(i);
                setOptionFn(option);
              }}
            >
              {option}
              <CheckBlueSvg />
            </p>
          ))}
        </div>
      )}
      <ChevronDownSvg className="sorter__chevron" />
    </div>
  );
}
