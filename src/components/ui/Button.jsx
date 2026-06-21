import React from 'react';

const Button = ({ children, variant = 'primary', size = 'md', onClick, style, ...props }) => {
  const variants = {
    primary: {
      background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
      color: 'white',
      border: 'none',
      boxShadow: '0 4px 12px var(--primary-glow)'
    },
    secondary: {
      background: 'var(--glass-bg)',
      color: 'white',
      border: '1px solid var(--glass-border)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-muted)',
      border: 'none',
    }
  };

  const sizes = {
    sm: { padding: '6px 12px', fontSize: '13px' },
    md: { padding: '10px 20px', fontSize: '14px' },
    lg: { padding: '14px 28px', fontSize: '16px' }
  };

  return (
    <button
      onClick={onClick}
      style={{
        borderRadius: 'var(--radius-md)',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        ...variants[variant],
        ...sizes[size],
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.filter = 'brightness(1.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.filter = 'brightness(1)';
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
