import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Bell, Search, ChevronDown, Store, 
  LayoutDashboard, ClipboardList, Calendar, 
  ReceiptText, Users, MessageSquare, Package, 
  BarChart3, PlusCircle 
} from 'lucide-react';

const Navbar = () => {
  const [showReportsDropdown, setShowReportsDropdown] = useState(false);

  const mainNavLinks = [
    { name: 'DASHBOARD', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'ENQUIRY', icon: ClipboardList, path: '/enquiry' },
    { name: 'APPOINTMENTS', icon: Calendar, path: '/appointments' },
    { name: 'CLIENTS', icon: Users, path: '/crm' },
    { name: 'FEEDBACKS', icon: MessageSquare, path: '/feedback' },
    { name: 'PRODUCTS', icon: Package, path: '/inventory' },
    { name: 'REPORTS', icon: BarChart3, path: '/reports' },
    { name: 'ADD & MANAGE', icon: PlusCircle, path: '/settings' },
  ];

  const reportSubItems = [
    { name: 'Daily Reports', path: '/reports/daily' },
    { name: 'Day Summary', path: '/reports/summary' },
    { name: 'Billing Reports', path: '/reports/billing' },
    { name: 'Enquiry Reports', path: '/reports/enquiry' },
    { name: 'Service Provider Reports', path: '/reports/provider' },
    { name: 'History', path: '/reports/history' },
    { name: 'Balance Reports', path: '/reports/balance' },
    { name: 'Attendance Report', path: '/reports/attendance' },
  ];



  return (
    <>
      <header style={{
        height: '64px',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#1a1a2e', 
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: 'white' }}>Superadmin (Mission Street)</h2>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Branch Switcher (Apollo/Reference style) */}
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: '8px', 
            padding: '5px 12px', borderRadius: '4px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer'
          }}>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Change branch:</span>
            <span style={{ fontSize: '12px', fontWeight: '600', color: 'white', background: '#3b82f6', padding: '2px 8px', borderRadius: '3px' }}>Mission Street</span>
            <ChevronDown size={14} color="white" />
          </div>

          <div style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '50%' }}>
            <Bell size={18} color="white" />
          </div>

          <div style={{ width: '40px', height: '40px', background: 'white', borderRadius: '4px', padding: '2px' }}>
             <img src="https://crm2025.geteasysoftware.com/jawed_habib_mission/images/logo.png" alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/40x40?text=LB'; }} />
          </div>
        </div>
      </header>

      {/* Secondary Blue Nav Bar */}
      <nav style={{
        height: '48px',
        background: '#0f172a', 
        display: 'flex',
        alignItems: 'center',
        padding: '0 24px',
        zIndex: 99,
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        {mainNavLinks.map(link => (
          <div 
            key={link.name} 
            style={{ position: 'relative', height: '100%' }}
            onMouseEnter={() => {
              if (link.name === 'REPORTS') setShowReportsDropdown(true);
            }}
            onMouseLeave={() => {
              if (link.name === 'REPORTS') setShowReportsDropdown(false);
            }}
          >
            <NavLink
              to={link.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: '100%',
                padding: '0 16px',
                textDecoration: 'none',
                fontSize: '11px',
                fontWeight: '700',
                color: isActive || 
                       (link.name === 'REPORTS' && showReportsDropdown) ? '#fbbf24' : 'white',
                background: isActive ? 'rgba(251,191,36,0.1)' : 'transparent',
                transition: 'all 0.2s',
                letterSpacing: '0.5px'
              })}
            >
              <link.icon size={14} />
              {link.name}
              {link.name === 'REPORTS' && <ChevronDown size={12} style={{ marginLeft: '4px' }} />}
            </NavLink>

            {link.name === 'REPORTS' && showReportsDropdown && (
              <div style={{
                position: 'absolute', top: '100%', left: 0,
                background: 'white', minWidth: '200px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                padding: '8px 0', zIndex: 101, borderRadius: '0 0 4px 4px'
              }}>
                {reportSubItems.map(sub => (
                  <NavLink
                    key={sub.name}
                    to={sub.path}
                    onClick={() => setShowReportsDropdown(false)}
                    style={{
                      display: 'block', padding: '8px 16px', fontSize: '12px', color: '#334155',
                      textDecoration: 'none', transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#f1f5f9'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    {sub.name}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </>
  );
};

export default Navbar;
