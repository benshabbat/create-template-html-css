import React from 'react';
import Button from './Button';

/**
 * Example usage of Button component
 */
const ButtonExample = () => {
  const handleClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div style={{ padding: '40px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2>Button Component Examples</h2>
      
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <h3 style={{ width: '100%' }}>Variants</h3>
        <Button variant="primary" onClick={handleClick}>Primary Button</Button>
        <Button variant="secondary" onClick={handleClick}>Secondary Button</Button>
        <Button variant="success" onClick={handleClick}>Success Button</Button>
        <Button variant="danger" onClick={handleClick}>Danger Button</Button>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <h3 style={{ width: '100%' }}>Sizes</h3>
        <Button size="small" onClick={handleClick}>Small</Button>
        <Button size="medium" onClick={handleClick}>Medium</Button>
        <Button size="large" onClick={handleClick}>Large</Button>
      </div>

      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <h3 style={{ width: '100%' }}>States</h3>
        <Button onClick={handleClick}>Enabled</Button>
        <Button disabled>Disabled</Button>
      </div>
    </div>
  );
};

export default ButtonExample;
