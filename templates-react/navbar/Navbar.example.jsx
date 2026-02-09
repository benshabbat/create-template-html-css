import Navbar from './Navbar';

function NavbarExample() {
  const customLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleLinkClick = (link) => {
    console.log('Clicked:', link.label);
  };

  return (
    <div>
      {/* Basic usage */}
      <Navbar />

      {/* With custom logo and links */}
      <Navbar 
        logo="MyApp"
        links={customLinks}
        onLinkClick={handleLinkClick}
      />

      {/* With logo as component */}
      <Navbar 
        logo={<img src="/logo.png" alt="Logo" style={{ height: '30px' }} />}
        links={customLinks}
      />
    </div>
  );
}

export default NavbarExample;
