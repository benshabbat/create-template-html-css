import React from 'react';
import './Card.css';

/**
 * Card Component
 * A versatile card component for displaying content
 */
const Card = ({ 
  title, 
  description, 
  image, 
  imageAlt = '',
  footer,
  onClick,
  className = '',
  children
}) => {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      {image && (
        <div className="card-image">
          <img src={image} alt={imageAlt} />
        </div>
      )}
      <div className="card-content">
        {title && <h3 className="card-title">{title}</h3>}
        {description && <p className="card-description">{description}</p>}
        {children}
      </div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
