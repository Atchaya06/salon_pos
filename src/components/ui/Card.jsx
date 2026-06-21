import React from 'react';

const Card = ({ children, title, subtitle, extra, style }) => {
  return (
    <div className="glass-card" style={{ padding: '24px', ...style }}>
      {(title || extra) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            {title && <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '4px' }}>{title}</h3>}
            {subtitle && <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{subtitle}</p>}
          </div>
          {extra && <div>{extra}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;
