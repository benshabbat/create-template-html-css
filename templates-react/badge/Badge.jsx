
import './Badge.css';

function Badge({ 
  children,
  variant = 'default',
  size = 'medium',
  dot = false,
  pill = false,
  position = 'top-right',
  count = null,
  maxCount = 99,
  showZero = false,
  className = ''
}) {
  const getBadgeContent = () => {
    if (dot) return null;
    if (count !== null) {
      if (count === 0 && !showZero) return null;
      if (count > maxCount) return `${maxCount}+`;
      return count;
    }
    return children;
  };

  const badgeContent = getBadgeContent();
  const isEmpty = badgeContent === null;

  if (isEmpty && !dot) return null;

  const badgeClasses = [
    'badge',
    `badge-${variant}`,
    `badge-${size}`,
    pill ? 'badge-pill' : '',
    dot ? 'badge-dot' : '',
    position ? `badge-${position}` : '',
    className
  ].filter(Boolean).join(' ');

  return <span className={badgeClasses}>{badgeContent}</span>;
}

export default Badge;
