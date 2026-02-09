/**
 * Interactive Component Templates
 * Complex interactive components with navigation, modals, and animations
 * 
 * @module templates/interactive-components-templates
 */

export const INTERACTIVE_TEMPLATES = {
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

  'todo-list': `  return (
    <div className="App" style={{ padding: '40px' }}>
      <h1>Todo List</h1>
      <{ComponentName} />
    </div>
  );`,
};
