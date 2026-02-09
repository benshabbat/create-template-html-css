/**
 * Basic UI Component Templates
 * Simple display components without complex state management
 * 
 * @module templates/basic-components-templates
 */

export const BASIC_TEMPLATES = {
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
};
