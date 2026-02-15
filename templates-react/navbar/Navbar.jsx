
import { useState } from 'react';

function Navbar({ 
  logo = 'Logo',
  links = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Contact', href: '#contact' }
  ],
  onLinkClick
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link) => {
    setIsOpen(false);
    if (onLinkClick) {
      onLinkClick(link);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          {logo}
        </div>

        <button 
          className={`navbar-toggle ${isOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          {links.map((link, index) => (
            <li key={index} className="navbar-item">
              <a 
                href={link.href}
                className="navbar-link"
                onClick={() => handleLinkClick(link)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
