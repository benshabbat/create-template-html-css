
import Tooltip from './Tooltip';

function TooltipExample() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Tooltip Component Examples</h1>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Basic Tooltips</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <Tooltip content="This is a tooltip!">
            <button style={buttonStyle}>Hover me</button>
          </Tooltip>
          
          <Tooltip content="This tooltip has a longer text to demonstrate how it handles multiple lines of content.">
            <button style={buttonStyle}>Long content</button>
          </Tooltip>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Positions</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '2rem',
          placeItems: 'center',
          minHeight: '200px'
        }}>
          <Tooltip content="Tooltip on top" position="top">
            <button style={buttonStyle}>Top</button>
          </Tooltip>
          
          <Tooltip content="Tooltip on bottom" position="bottom">
            <button style={buttonStyle}>Bottom</button>
          </Tooltip>
          
          <Tooltip content="Tooltip on left" position="left">
            <button style={buttonStyle}>Left</button>
          </Tooltip>
          
          <Tooltip content="Tooltip on right" position="right">
            <button style={buttonStyle}>Right</button>
          </Tooltip>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Different Triggers</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <Tooltip content="Appears on hover (default)" trigger="hover">
            <button style={buttonStyle}>Hover trigger</button>
          </Tooltip>
          
          <Tooltip content="Appears on click" trigger="click">
            <button style={buttonStyle}>Click trigger</button>
          </Tooltip>
          
          <Tooltip content="Appears on focus" trigger="focus">
            <button style={buttonStyle}>Focus trigger</button>
          </Tooltip>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Without Arrow</h2>
        <Tooltip content="Tooltip without arrow" arrow={false}>
          <button style={buttonStyle}>No arrow</button>
        </Tooltip>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Custom Delay</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <Tooltip content="No delay" delay={0}>
            <button style={buttonStyle}>No delay</button>
          </Tooltip>
          
          <Tooltip content="500ms delay" delay={500}>
            <button style={buttonStyle}>Slow (500ms)</button>
          </Tooltip>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Custom Width</h2>
        <Tooltip 
          content="This is a very long tooltip content that demonstrates the custom maxWidth property. You can control how wide the tooltip should be." 
          maxWidth="300px"
        >
          <button style={buttonStyle}>Wide tooltip</button>
        </Tooltip>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Disabled Tooltip</h2>
        <Tooltip content="You won't see me!" disabled>
          <button style={buttonStyle}>Disabled tooltip</button>
        </Tooltip>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>On Different Elements</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Tooltip content="Tooltip on text">
            <span style={{ color: '#3b82f6', textDecoration: 'underline dotted' }}>
              Hover this text
            </span>
          </Tooltip>
          
          <Tooltip content="Helpful information about this icon">
            <span style={{ fontSize: '2rem', cursor: 'help' }}>ℹ️</span>
          </Tooltip>
          
          <Tooltip content="This badge has a tooltip">
            <span style={{
              backgroundColor: '#ef4444',
              color: 'white',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontSize: '0.875rem'
            }}>
              NEW
            </span>
          </Tooltip>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Interactive Example</h2>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span>Username:</span>
          <input 
            type="text" 
            style={{ 
              padding: '0.5rem', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.375rem' 
            }} 
          />
          <Tooltip 
            content="Username must be 3-20 characters long and contain only letters, numbers, and underscores."
            position="right"
            maxWidth="250px"
          >
            <span style={{ fontSize: '1.25rem', cursor: 'help', color: '#6b7280' }}>❓</span>
          </Tooltip>
        </div>
      </section>
    </div>
  );
}

const buttonStyle = {
  padding: '0.5rem 1rem',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '0.375rem',
  cursor: 'pointer',
  fontSize: '0.875rem',
  fontWeight: '500'
};

export default TooltipExample;
