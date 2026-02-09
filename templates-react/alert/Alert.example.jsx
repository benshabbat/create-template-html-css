import { useState } from 'react';
import Alert from './Alert';

function AlertExample() {
  const [alerts, setAlerts] = useState({
    success: true,
    error: true,
    warning: true,
    info: true
  });

  const handleClose = (type) => {
    set Alerts({ ...alerts, [type]: false });
  };

  const resetAlerts = () => {
    setAlerts({
      success: true,
      error: true,
      warning: true,
      info: true
    });
  };

  return (
    <div style={{ maxWidth: '600px', padding: '2rem' }}>
      <h2>Alert Component Examples</h2>

      <button 
        onClick={resetAlerts}
        style={{
          padding: '0.5rem 1rem',
          marginBottom: '1.5rem',
          background: '#667eea',
          color: 'white',
          border: 'none',
          borderRadius: '0.5rem',
          cursor: 'pointer'
        }}
      >
        Reset Alerts
      </button>

      {/* Success Alert */}
      {alerts.success && (
        <Alert 
          type="success" 
          title="Success!"
          onClose={() => handleClose('success')}
        >
          Your changes have been saved successfully.
        </Alert>
      )}

      {/* Error Alert */}
      {alerts.error && (
        <Alert 
          type="error" 
          title="Error"
          onClose={() => handleClose('error')}
        >
          Something went wrong. Please try again.
        </Alert>
      )}

      {/* Warning Alert */}
      {alerts.warning && (
        <Alert 
          type="warning" 
          title="Warning"
          onClose={() => handleClose('warning')}
        >
          This action cannot be undone. Please proceed with caution.
        </Alert>
      )}

      {/* Info Alert */}
      {alerts.info && (
        <Alert 
          type="info" 
          title="Information"
          onClose={() => handleClose('info')}
        >
          Check out our new features in the latest update!
        </Alert>
      )}

      {/* Alert without title */}
      <Alert type="success">
        Quick success message without a title.
      </Alert>

      {/* Non-dismissible Alert */}
      <Alert type="info" dismissible={false}>
        This alert cannot be closed.
      </Alert>

      {/* Alert with custom icon */}
      <Alert type="success" icon="🎉" title="Celebration!">
        You've reached a new milestone!
      </Alert>
    </div>
  );
}

export default AlertExample;
