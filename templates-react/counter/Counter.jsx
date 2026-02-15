import { useState } from 'react';
import './Counter.css';

/**
 * Counter Component
 * A simple counter with increment and decrement functionality
 */
const Counter = ({ 
  initialValue = 0,
  min,
  max,
  step = 1,
  onChange
}) => {
  const [count, setCount] = useState(initialValue);

  const handleIncrement = () => {
    const newValue = count + step;
    if (max === undefined || newValue <= max) {
      setCount(newValue);
      onChange?.(newValue);
    }
  };

  const handleDecrement = () => {
    const newValue = count - step;
    if (min === undefined || newValue >= min) {
      setCount(newValue);
      onChange?.(newValue);
    }
  };

  const handleReset = () => {
    setCount(initialValue);
    onChange?.(initialValue);
  };

  return (
    <div className="counter-container">
      <h2 className="counter-title">Counter</h2>
      <div className="counter-display">
        {count}
      </div>
      <div className="counter-controls">
        <button 
          className="counter-btn counter-btn-decrement"
          onClick={handleDecrement}
          disabled={min !== undefined && count <= min}
        >
          -
        </button>
        <button 
          className="counter-btn counter-btn-reset"
          onClick={handleReset}
        >
          Reset
        </button>
        <button 
          className="counter-btn counter-btn-increment"
          onClick={handleIncrement}
          disabled={max !== undefined && count >= max}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Counter;
