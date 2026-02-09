/**
 * Form Component Templates
 * Form-related components with input fields and state management
 * 
 * @module templates/form-components-templates
 */

export const FORM_TEMPLATES = {
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
};
