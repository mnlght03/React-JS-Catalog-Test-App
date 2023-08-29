import React, { useEffect, useState } from 'react';

export interface SliderInputProps {
  minValue: number;
  maxValue: number;
  initLeftValue?: number;
  initRightValue?: number;
  step?: number;
  minValueDifference?: number;
  callbackFn: Function;
}

export default function SliderInput({
  minValue,
  maxValue,
  initLeftValue = undefined,
  initRightValue = undefined,
  step = 0.1,
  minValueDifference = 0.5,
  callbackFn,
}: SliderInputProps) {
  const [leftValue, setLeftValueState] = useState(initLeftValue || minValue);
  const [rightValue, setRightValueState] = useState(initRightValue || maxValue);
  const [timeoutId, setTimeoutId] = useState(0);

  useEffect(() => {
    setLeftValueState(minValue >= leftValue ? minValue : leftValue);
  }, [minValue]);

  useEffect(() => {
    setRightValueState(maxValue <= rightValue ? maxValue : rightValue);
  }, [maxValue]);

  const setLeftValue = (value: number) => {
    if (value <= minValue) value = minValue;
    else if (value >= maxValue) value = rightValue - minValueDifference;

    if (rightValue - value >= minValueDifference) {
      setLeftValueState(value);
      callbackFn(value, rightValue);
    }
  };

  const setRightValue = (value: number) => {
    if (value <= minValue) value = leftValue + minValueDifference;
    else if (value >= maxValue) value = maxValue;

    if (value - leftValue >= minValueDifference) {
      setRightValueState(value);
      callbackFn(leftValue, value);
    }
  };

  const getSliderPercent = (value: number) => {
    let percents = ((value - minValue) * 100) / (maxValue - minValue);
    if (percents > 100) percents = 100;
    if (percents < 0) percents = 0;
    return percents;
  };

  const handleLeftInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutId);
    const value = parseFloat(event.target.value);
    setLeftValueState(value);
    const timeout = setTimeout(() => {
      setLeftValue(value);
    }, 400);

    setTimeoutId(timeout as unknown as number);
  };

  const handleRightInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutId);
    const value = parseFloat(event.target.value);
    setRightValueState(value);
    const timeout = setTimeout(() => {
      setRightValue(value);
    }, 400);

    setTimeoutId(timeout as unknown as number);
  };

  return (
    <div className="slider-input-wrapper">
      <div className="filter__values-wrapper">
        <input
          type="number"
          name="minValue"
          className="filter__left-value"
          step={step}
          value={leftValue}
          onChange={handleLeftInput}
        />
        <input
          type="number"
          name="maxValue"
          className="filter__right-value"
          step={step}
          value={rightValue}
          onChange={handleRightInput}
        />
      </div>
      <div className="filter__range-slider">
        <span
          className="range__selected"
          style={{
            left: `${getSliderPercent(leftValue)}%`,
            right: `${100 - getSliderPercent(rightValue)}%`,
          }}
        ></span>
      </div>
      <div className="filter__range-input">
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={leftValue}
          step={step}
          onChange={(event) => {
            setLeftValue(parseFloat(event.target.value));
          }}
        />
        <input
          type="range"
          min={minValue}
          max={maxValue}
          value={rightValue}
          step={step}
          onChange={(event) => {
            setRightValue(parseFloat(event.target.value));
          }}
        />
      </div>
    </div>
  );
}
