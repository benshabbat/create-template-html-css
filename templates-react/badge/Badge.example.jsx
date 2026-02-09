import React from 'react';
import Badge from './Badge';

function BadgeExample() {
  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Badge Component Examples</h1>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Basic Badges</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge>Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Sizes</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge size="small" variant="primary">Small</Badge>
          <Badge size="medium" variant="primary">Medium</Badge>
          <Badge size="large" variant="primary">Large</Badge>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Pill Shape</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <Badge pill variant="success">New</Badge>
          <Badge pill variant="info">Beta</Badge>
          <Badge pill variant="warning">Hot</Badge>
          <Badge pill variant="error">Sale</Badge>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Count Badges</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button style={buttonStyle}>
              Messages
            </button>
            <Badge count={5} variant="error" size="small" />
          </div>
          
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button style={buttonStyle}>
              Notifications
            </button>
            <Badge count={99} variant="primary" size="small" />
          </div>
          
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button style={buttonStyle}>
              Inbox
            </button>
            <Badge count={150} maxCount={99} variant="error" size="small" />
          </div>
          
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button style={buttonStyle}>
              Updates
            </button>
            <Badge count={0} showZero variant="info" size="small" />
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Dot Badges</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button style={buttonStyle}>Online</button>
            <Badge dot variant="success" />
          </div>
          
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button style={buttonStyle}>Busy</button>
            <Badge dot variant="error" />
          </div>
          
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button style={buttonStyle}>Away</button>
            <Badge dot variant="warning" />
          </div>
          
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button style={buttonStyle}>Offline</button>
            <Badge dot variant="default" />
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Dot Positions</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={avatarStyle}>👤</div>
            <Badge dot variant="success" position="top-right" />
          </div>
          
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={avatarStyle}>👤</div>
            <Badge dot variant="error" position="top-left" />
          </div>
          
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={avatarStyle}>👤</div>
            <Badge dot variant="warning" position="bottom-right" />
          </div>
          
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={avatarStyle}>👤</div>
            <Badge dot variant="info" position="bottom-left" />
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Use Cases</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Status Labels</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Badge variant="success">Active</Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="error">Inactive</Badge>
              <Badge variant="info">Draft</Badge>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Categories</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Badge pill variant="primary">JavaScript</Badge>
              <Badge pill variant="secondary">React</Badge>
              <Badge pill variant="info">TypeScript</Badge>
              <Badge pill variant="success">Node.js</Badge>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Priority Levels</h3>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <Badge variant="error" size="small">High</Badge>
              <Badge variant="warning" size="small">Medium</Badge>
              <Badge variant="success" size="small">Low</Badge>
            </div>
          </div>
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
  fontSize: '0.875rem'
};

const avatarStyle = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  backgroundColor: '#e5e7eb',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1.5rem'
};

export default BadgeExample;
