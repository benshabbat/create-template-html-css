import React from 'react';
import Counter from './Counter';

/**
 * Example usage of Counter component
 */
const CounterExample = () => {
  const handleChange = (value) => {
    console.log('Counter value changed to:', value);
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ marginBottom: '40px', textAlign: 'center' }}>Counter Component Examples</h2>
      
      <div style={{ display: 'grid', gap: '40px', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
        <div>
          <h3 style={{ textAlign: 'center' }}>Basic Counter</h3>
          <Counter onChange={handleChange} />
        </div>

        <div>
          <h3 style={{ textAlign: 'center' }}>Counter with Limits</h3>
          <Counter 
            initialValue={5}
            min={0} 
            max={10} 
            onChange={handleChange} 
          />
        </div>

        <div>
          <h3 style={{ textAlign: 'center' }}>Counter with Custom Step</h3>
          <Counter 
            initialValue={0}
            step={5}
            onChange={handleChange} 
          />
        </div>
      </div>
    </div>
  );
};

export default CounterExample;
