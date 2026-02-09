/**
 * React Component Templates
 * Contains all template content for generating React component examples
 */

// ============================================================================
// COMMON STYLES CONSTANTS
// ============================================================================

const COMMON_STYLES = {
  container: {
    padding: '40px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  narrowContainer: {
    padding: '40px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  wideContainer: {
    padding: '40px',
    maxWidth: '1000px',
    margin: '0 auto',
  },
  fullContainer: {
    padding: '40px',
  },
  centeredContainer: {
    padding: '80px',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  appBackground: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  heading: {
    marginBottom: '30px',
  },
  section: {
    marginBottom: '30px',
  },
  flexRow: {
    display: 'flex',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer',
  },
  avatar: {
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: '#e5e7eb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
  },
  relativeContainer: {
    position: 'relative',
    display: 'inline-block',
  },
};

// Helper to convert styles object to inline style string
const styleToString = (styleObj) => {
  return `{{ ${Object.entries(styleObj).map(([key, value]) => `${key}: '${value}'`).join(', ')} }}`;
};

// ============================================================================
// COMPONENT TEMPLATES
// ============================================================================

export const COMPONENT_TEMPLATES = {
  alert: `  return (
    <div className="App" style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>Alert Component Examples</h1>
      
      <{ComponentName} type="success" title="Success!">
        Your changes have been saved successfully.
      </{ComponentName}>
      
      <{ComponentName} type="error" title="Error">
        Something went wrong. Please try again.
      </{ComponentName}>
      
      <{ComponentName} type="warning" title="Warning">
        This action cannot be undone.
      </{ComponentName}>
      
      <{ComponentName} type="info" title="Information">
        Check out our new features!
      </{ComponentName}>
    </div>
  );`,

  badge: `  return (
    <div className="App" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>Badge Component Examples</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Basic Badges</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <{ComponentName} variant="primary">Primary</{ComponentName}>
          <{ComponentName} variant="success">Success</{ComponentName}>
          <{ComponentName} variant="warning">Warning</{ComponentName}>
          <{ComponentName} variant="error">Error</{ComponentName}>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Pill Badges</h2>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <{ComponentName} pill variant="info">New</{ComponentName}>
          <{ComponentName} pill variant="success">Hot</{ComponentName}>
          <{ComponentName} pill variant="warning">Sale</{ComponentName}>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Count Badges</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.375rem' }}>
              Messages
            </button>
            <{ComponentName} count={5} variant="error" size="small" />
          </div>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button style={{ padding: '0.5rem 1rem', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '0.375rem' }}>
              Notifications
            </button>
            <{ComponentName} count={99} variant="primary" size="small" />
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Dot Badges</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
              👤
            </div>
            <{ComponentName} dot variant="success" position="top-right" />
          </div>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>
              👤
            </div>
            <{ComponentName} dot variant="error" position="top-left" />
          </div>
        </div>
      </div>
    </div>
  );`,

  button: `  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <div className="App" style={{ 
      padding: '40px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh'
    }}>
      <h1 style={{ marginBottom: '30px', color: '#333' }}>{ComponentName} Component Examples</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#666' }}>Variants:</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <{ComponentName} variant="primary" onClick={handleClick}>Primary</{ComponentName}>
          <{ComponentName} variant="secondary" onClick={handleClick}>Secondary</{ComponentName}>
          <{ComponentName} variant="success" onClick={handleClick}>Success</{ComponentName}>
          <{ComponentName} variant="danger" onClick={handleClick}>Danger</{ComponentName}>
          <{ComponentName} variant="outline" onClick={handleClick}>Outline</{ComponentName}>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#666' }}>Sizes:</h3>
        <div style={{ display: 'flex', gap: '15px', alignItems: 'center', flexWrap: 'wrap' }}>
          <{ComponentName} size="small" onClick={handleClick}>Small</{ComponentName}>
          <{ComponentName} size="medium" onClick={handleClick}>Medium</{ComponentName}>
          <{ComponentName} size="large" onClick={handleClick}>Large</{ComponentName}>
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ marginBottom: '15px', color: '#666' }}>States:</h3>
        <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
          <{ComponentName} onClick={handleClick}>Normal</{ComponentName}>
          <{ComponentName} disabled>Disabled</{ComponentName}>
        </div>
      </div>
    </div>
  );`,

  card: `  return (
    <div className="App" style={{ padding: '40px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h1 style={{ marginBottom: '30px' }}>{ComponentName} Component</h1>
      <{ComponentName}
        title="Example Card"
        description="This is an example card component with a beautiful design"
        image="https://via.placeholder.com/400x200"
      />
    </div>
  );`,

  counter: `  return (
    <div className="App" style={{ padding: '40px' }}>
      <h1>Counter Component</h1>
      <{ComponentName} 
        initialValue={0}
        min={0}
        max={100}
        onChange={(value) => console.log('Count:', value)}
      />
    </div>
  );`,

  form: `  return (
    <div className="App" style={{ padding: '40px' }}>
      <{ComponentName}
        title="Contact Form"
        fields={[
          { name: 'name', label: 'Name', type: 'text', required: true },
          { name: 'email', label: 'Email', type: 'email', required: true },
        ]}
        onSubmit={(data) => console.log('Form data:', data)}
      />
    </div>
  );`,

  input: `  const [value, setValue] = useState('');

  return (
    <div className="App" style={{ padding: '40px', maxWidth: '400px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>Input Component Examples</h1>
      
      <{ComponentName}
        label="Name"
        placeholder="Enter your name"
        required
      />
      
      <{ComponentName}
        type="email"
        label="Email"
        placeholder="your@email.com"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      
      <{ComponentName}
        label="Search"
        placeholder="Search..."
        icon="🔍"
      />
    </div>
  );`,

  navbar: `  const links = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <div>
      <{ComponentName}
        logo="MyApp"
        links={links}
        onLinkClick={(link) => console.log('Clicked:', link.label)}
      />
      <div style={{ padding: '40px' }}>
        <h1>Scroll down to see sticky navbar</h1>
        <div style={{ height: '2000px' }}>
          <p>Content goes here...</p>
        </div>
      </div>
    </div>
  );`,

  checkbox: `  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="App" style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>Checkbox Component Examples</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Basic Checkbox</h2>
        <{ComponentName}
          label="I agree to the terms and conditions"
          checked={isChecked}
          onChange={setIsChecked}
        />
        <p>Status: {isChecked ? 'Checked' : 'Unchecked'}</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Different Sizes</h2>
        <{ComponentName} label="Small" size="small" />
        <{ComponentName} label="Medium (default)" size="medium" />
        <{ComponentName} label="Large" size="large" />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Different Colors</h2>
        <{ComponentName} label="Primary" checked color="primary" />
        <{ComponentName} label="Success" checked color="success" />
        <{ComponentName} label="Error" checked color="error" />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Disabled State</h2>
        <{ComponentName} label="Disabled unchecked" disabled />
        <{ComponentName} label="Disabled checked" checked disabled />
      </div>
    </div>
  );`,

  dropdown: `  const [selected, setSelected] = useState('');

  const options = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
    { value: 'date', label: 'Date' },
    { value: 'elderberry', label: 'Elderberry' }
  ];

  return (
    <div className="App" style={{ padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>Dropdown Component Examples</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <{ComponentName}
          label="Choose a fruit"
          options={options}
          value={selected}
          onChange={setSelected}
          placeholder="Select a fruit"
        />
        <p>Selected: {selected || 'None'}</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <{ComponentName}
          label="Searchable Dropdown"
          options={options}
          placeholder="Search and select..."
          searchable
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <{ComponentName}
          label="Disabled"
          options={options}
          placeholder="Cannot select"
          disabled
        />
      </div>
    </div>
  );`,

  tooltip: `  return (
    <div className="App" style={{ padding: '80px', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1 style={{ marginBottom: '50px' }}>Tooltip Component Examples</h1>
      
      <div style={{ marginBottom: '50px', display: 'flex', gap: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <{ComponentName} content="This is a top tooltip" position="top">
          <button style={buttonStyle}>Top</button>
        </{ComponentName}>
        
        <{ComponentName} content="This is a bottom tooltip" position="bottom">
          <button style={buttonStyle}>Bottom</button>
        </{ComponentName}>
        
        <{ComponentName} content="This is a left tooltip" position="left">
          <button style={buttonStyle}>Left</button>
        </{ComponentName}>
        
        <{ComponentName} content="This is a right tooltip" position="right">
          <button style={buttonStyle}>Right</button>
        </{ComponentName}>
      </div>

      <div style={{ marginBottom: '50px' }}>
        <{ComponentName} content="Click me to toggle!" trigger="click">
          <button style={buttonStyle}>Click Trigger</button>
        </{ComponentName}>
      </div>

      <div>
       <{ComponentName} 
          content="This is a longer tooltip that demonstrates how it handles more text content."
          maxWidth="300px"
        >
          <button style={buttonStyle}>Long Content</button>
        </{ComponentName}>
      </div>
    </div>
  );

  const buttonStyle = {
    padding: '0.5rem 1rem',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    cursor: 'pointer'
  };`,

  progress: `  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1));
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="App" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>Progress Component Examples</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Basic Progress</h2>
        <{ComponentName} value={25} variant="primary" />
        <{ComponentName} value={50} variant="success" />
        <{ComponentName} value={75} variant="warning" />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>With Percentage</h2>
        <{ComponentName} value={60} variant="primary" showPercentage size="large" />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Animated Progress</h2>
        <div style={{ marginBottom: '0.5rem' }}>Uploading: {progress}%</div>
        <{ComponentName} value={progress} variant="info" striped animated />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Indeterminate (Loading)</h2>
        <{ComponentName} indeterminate variant="primary" />
      </div>
    </div>
  );`,

  switch: `  const [enabled, setEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="App" style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '30px' }}>Switch Component Examples</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Basic Switch</h2>
        <{ComponentName}
          checked={enabled}
          onChange={setEnabled}
          label="Enable notifications"
        />
        <p style={{ marginTop: '0.5rem' }}>Status: {enabled ? 'ON' : 'OFF'}</p>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Sizes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <{ComponentName} size="small" label="Small" />
          <{ComponentName} size="medium" label="Medium (default)" />
          <{ComponentName} size="large" label="Large" />
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Colors</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <{ComponentName} checked color="primary" label="Primary" />
          <{ComponentName} checked color="success" label="Success" />
          <{ComponentName} checked color="error" label="Error" />
        </div>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>With Icons</h2>
        <{ComponentName}
          checked={darkMode}
          onChange={setDarkMode}
          label="Dark mode"
          color="secondary"
          icons={{
            checked: '🌙',
            unchecked: '☀️'
          }}
        />
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>States</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <{ComponentName} label="Normal" />
          <{ComponentName} checked label="Checked" />
          <{ComponentName} disabled label="Disabled" />
          <{ComponentName} loading label="Loading" />
        </div>
      </div>
    </div>
  );`,

  'todo-list': `  return (
    <div className="App" style={{ padding: '40px' }}>
      <h1>Todo List</h1>
      <{ComponentName} />
    </div>
  );`,

  modal: `  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App" style={{ padding: '40px' }}>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      <{ComponentName}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
      >
        <p>This is the modal content</p>
      </{ComponentName}>
    </div>
  );`,
};

// ============================================================================
// REACT IMPORTS MAPPING
// ============================================================================

/**
 * Maps component names to required React imports
 * Key: component name in kebab-case
 * Value: comma-separated list of React imports (e.g., "useState, useEffect")
 */
export const COMPONENT_IMPORTS = {
  modal: 'useState',
  input: 'useState',
  checkbox: 'useState',
  dropdown: 'useState',
  switch: 'useState',
  progress: 'useState, useEffect',
  // Add more as needed
};

// ============================================================================
// HELPER FUNCTION
// ============================================================================

/**
 * Get template content for a component with placeholders replaced
 * @param {string} componentKebab - Component name in kebab-case
 * @param {string} componentName - Component name in PascalCase
 * @returns {string} Template content with placeholders replaced
 */
export function getComponentTemplate(componentKebab, componentName) {
  const template = COMPONENT_TEMPLATES[componentKebab];
  if (!template) {
    return null;
  }
  
  // Replace {ComponentName} placeholder with actual component name
  return template.replace(/\{ComponentName\}/g, componentName);
}

/**
 * Get required React imports for a component
 * @param {string} componentKebab - Component name in kebab-case
 * @returns {string} Comma-separated imports or empty string
 */
export function getComponentImports(componentKebab) {
  return COMPONENT_IMPORTS[componentKebab] || '';
}
