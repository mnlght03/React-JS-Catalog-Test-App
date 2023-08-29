import { useState } from 'react';
import { CheckWhiteSvg } from './icons';

export interface CheckboxInputProps {
  name: string;
  checked?: boolean;
  callbackFn: Function;
}

export default function CheckboxInput({
  name,
  checked = false,
  callbackFn,
}: CheckboxInputProps) {
  const [isChecked, setIsChecked] = useState(checked);
  return (
    <div className="checkbox-input-wrapper">
      <label>
        <input
          type="checkbox"
          className="checkbox"
          checked={isChecked}
          onChange={(event) => {
            setIsChecked(event.target.checked);
            callbackFn(event);
          }}
          value={name}
        />
        <div className="checkbox-content">
          <CheckWhiteSvg className="checkbox-image" />
        </div>
        <span>{name}</span>
      </label>
    </div>
  );
}
