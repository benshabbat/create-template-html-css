import { useState } from 'react';
import Switch from './Switch';

function SwitchExample() {
  const [checked, setChecked] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [settings, setSettings] = useState({
    wifi: true,
    bluetooth: false,
    airplane: false
  });

  const handleSettingChange = (key) => (value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>Switch Component Examples</h1>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Basic Switch</h2>
        <Switch
          checked={checked}
          onChange={setChecked}
          label="Enable feature"
        />
        <p style={{ marginTop: '0.5rem', color: '#666' }}>
          Status: {checked ? 'ON' : 'OFF'}
        </p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Sizes</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Switch size="small" label="Small switch" />
          <Switch size="medium" label="Medium switch (default)" />
          <Switch size="large" label="Large switch" />
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Colors</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Switch checked color="primary" label="Primary" />
          <Switch checked color="secondary" label="Secondary" />
          <Switch checked color="success" label="Success" />
          <Switch checked color="error" label="Error" />
          <Switch checked color="warning" label="Warning" />
          <Switch checked color="info" label="Info" />
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Label Positions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Switch label="Label on right (default)" labelPosition="right" />
          <Switch label="Label on left" labelPosition="left" />
          <Switch />
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>With Icons</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Switch
            checked
            label="Light/Dark mode"
            icons={{
              checked: '🌙',
              unchecked: '☀️'
            }}
          />
          <Switch
            checked
            label="Sound"
            icons={{
              checked: '🔊',
              unchecked: '🔇'
            }}
            color="success"
          />
          <Switch
            label="Notifications"
            icons={{
              checked: '✓',
              unchecked: '✕'
            }}
            color="info"
          />
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>States</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Switch label="Normal switch" />
          <Switch checked label="Checked switch" />
          <Switch disabled label="Disabled off" />
          <Switch checked disabled label="Disabled on" />
          <Switch loading label="Loading state" />
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Settings Panel Example</h2>
        <div style={{
          backgroundColor: '#f9fafb',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: '#111827' }}>
            Connection Settings
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              backgroundColor: 'white',
              borderRadius: '0.375rem'
            }}>
              <div>
                <div style={{ fontWeight: '500', color: '#111827' }}>Wi-Fi</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {settings.wifi ? 'Connected' : 'Disconnected'}
                </div>
              </div>
              <Switch
                checked={settings.wifi}
                onChange={handleSettingChange('wifi')}
                color="success"
              />
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              backgroundColor: 'white',
              borderRadius: '0.375rem'
            }}>
              <div>
                <div style={{ fontWeight: '500', color: '#111827' }}>Bluetooth</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {settings.bluetooth ? 'On' : 'Off'}
                </div>
              </div>
              <Switch
                checked={settings.bluetooth}
                onChange={handleSettingChange('bluetooth')}
                color="info"
              />
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              backgroundColor: 'white',
              borderRadius: '0.375rem'
            }}>
              <div>
                <div style={{ fontWeight: '500', color: '#111827' }}>Airplane Mode</div>
                <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                  {settings.airplane ? 'Enabled' : 'Disabled'}
                </div>
              </div>
              <Switch
                checked={settings.airplane}
                onChange={handleSettingChange('airplane')}
                color="warning"
              />
            </div>
          </div>
        </div>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Preference Toggles</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Switch
            checked={notifications}
            onChange={setNotifications}
            label="Enable notifications"
            color="primary"
            icons={{
              checked: '🔔',
              unchecked: '🔕'
            }}
          />
          
          <Switch
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
        <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '0.375rem' }}>
          <strong>Current Preferences:</strong>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            <li>Notifications: {notifications ? 'Enabled' : 'Disabled'}</li>
            <li>Dark Mode: {darkMode ? 'On' : 'Off'}</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default SwitchExample;
