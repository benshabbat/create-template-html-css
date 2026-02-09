import React, { useState } from 'react';
import Checkbox from './Checkbox';

function CheckboxExample() {
  const [basicChecked, setBasicChecked] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true
  });
  const [selectedColors, setSelectedColors] = useState([]);

  const handleNotificationChange = (key) => (checked) => {
    setNotifications(prev => ({ ...prev, [key]: checked }));
  };

  const handleColorToggle = (color) => (checked) => {
    setSelectedColors(prev => 
      checked 
        ? [...prev, color]
        : prev.filter(c => c !== color)
    );
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Checkbox Component Examples</h1>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Basic Checkbox</h2>
        <Checkbox
          label="I agree to the terms and conditions"
          checked={basicChecked}
          onChange={setBasicChecked}
        />
        <p>Status: {basicChecked ? 'Checked' : 'Unchecked'}</p>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Different Sizes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Checkbox label="Small checkbox" size="small" />
          <Checkbox label="Medium checkbox (default)" size="medium" />
          <Checkbox label="Large checkbox" size="large" />
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Different Colors</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Checkbox label="Primary color" checked color="primary" />
          <Checkbox label="Secondary color" checked color="secondary" />
          <Checkbox label="Success color" checked color="success" />
          <Checkbox label="Error color" checked color="error" />
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>With Helper Text</h2>
        <Checkbox
          label="Subscribe to newsletter"
          helperText="You can unsubscribe at any time"
        />
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Required Field with Error</h2>
        <Checkbox
          label="Accept terms and conditions"
          checked={termsAccepted}
          onChange={setTermsAccepted}
          error={!termsAccepted ? 'You must accept the terms to continue' : ''}
        />
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Disabled State</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Checkbox label="Disabled unchecked" disabled />
          <Checkbox label="Disabled checked" checked disabled />
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Indeterminate State</h2>
        <Checkbox
          label="Select all notifications"
          indeterminate={
            notifications.email !== notifications.sms || 
            notifications.sms !== notifications.push
          }
          checked={notifications.email && notifications.sms && notifications.push}
        />
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Checkbox Group</h2>
        <div style={{ marginLeft: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Notification Preferences</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <Checkbox
              label="Email notifications"
              checked={notifications.email}
              onChange={handleNotificationChange('email')}
            />
            <Checkbox
              label="SMS notifications"
              checked={notifications.sms}
              onChange={handleNotificationChange('sms')}
            />
            <Checkbox
              label="Push notifications"
              checked={notifications.push}
              onChange={handleNotificationChange('push')}
            />
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '2rem' }}>
        <h2>Multiple Selection</h2>
        <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Choose your favorite colors:</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {['Red', 'Blue', 'Green', 'Yellow'].map(color => (
            <Checkbox
              key={color}
              label={color}
              checked={selectedColors.includes(color)}
              onChange={handleColorToggle(color)}
              color={color === 'Red' ? 'error' : color === 'Green' ? 'success' : 'primary'}
            />
          ))}
        </div>
        <p>Selected: {selectedColors.join(', ') || 'None'}</p>
      </section>
    </div>
  );
}

export default CheckboxExample;
