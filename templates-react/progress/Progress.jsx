
import './Progress.css';

function Progress({ 
  value = 0,
  max = 100,
  min = 0,
  variant = 'primary',
  size = 'medium',
  showLabel = false,
  label = null,
  showPercentage = false,
  striped = false,
  animated = false,
  indeterminate = false,
  className = ''
}) {
  const calculatePercentage = () => {
    if (indeterminate) return 100;
    const range = max - min;
    const currentValue = Math.min(Math.max(value, min), max) - min;
    return (currentValue / range) * 100;
  };

  const percentage = calculatePercentage();
  const displayValue = Math.round(percentage);

  const progressClasses = [
    'progress',
    `progress-${size}`,
    indeterminate ? 'progress-indeterminate' : '',
    className
  ].filter(Boolean).join(' ');

  const barClasses = [
    'progress-bar',
    `progress-bar-${variant}`,
    striped ? 'progress-bar-striped' : '',
    animated ? 'progress-bar-animated' : ''
  ].filter(Boolean).join(' ');

  const getLabel = () => {
    if (label) return label;
    if (showPercentage) return `${displayValue}%`;
    if (showLabel) return `${value} / ${max}`;
    return null;
  };

  const displayLabel = getLabel();

  return (
    <div className="progress-container">
      {displayLabel && showLabel && !showPercentage && (
        <div className="progress-label-container">
          <span className="progress-label">{displayLabel}</span>
        </div>
      )}
      <div
        className={progressClasses}
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={typeof label === 'string' ? label : 'Progress'}
      >
        <div
          className={barClasses}
          style={{ width: `${percentage}%` }}
        >
          {(showPercentage || (displayLabel && !showLabel)) && (
            <span className="progress-value">{displayLabel}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Progress;
