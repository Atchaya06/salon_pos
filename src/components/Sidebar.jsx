import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Calendar, 
  Users, 
  Package, 
  UserCircle, 
  Settings,
  Scissors,
  QrCode,
  ReceiptText,
  BarChart3,
  ClipboardList,
  MessageSquare
} from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
     { name: 'Enquiry', icon: ClipboardList, path: '/enquiry' },
      { name: 'Appointments', icon: Calendar, path: '/appointments' },
        { name: 'Clients', icon: Users, path: '/crm' },
        { name: 'Feedbacks', icon: MessageSquare, path: '/feedback' },
    { name: 'POS', icon: ShoppingCart, path: '/pos' },
    
   
   
    { name: 'Reports', icon: BarChart3, path: '/reports' },
    
    { name: 'Inventory', icon: Package, path: '/inventory' },
    { name: 'Staff', icon: UserCircle, path: '/staff' },
    { name: 'Preview Booking', icon: QrCode, path: '/book/mg-road' },
  ];

  return (
    <aside style={{
      width: '260px',
      height: '100vh',
      background: 'var(--card-bg)',
      backdropFilter: 'blur(var(--glass-blur))',
      borderRight: '1px solid var(--glass-border)',
      display: 'flex',
      flexDirection: 'column',
      padding: '24px 16px',
      position: 'sticky',
      top: 0
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px', padding: '0 8px' }}>
        <div style={{ 
          width: '40px', 
          height: '40px', 
          borderRadius: '10px', 
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Scissors size={24} color="white" />
        </div>
        <h2 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>SalonCloud</h2>
      </div>

      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: 'var(--radius-md)',
              textDecoration: 'none',
              color: isActive ? 'white' : 'var(--text-muted)',
              background: isActive ? 'var(--primary-glow)' : 'transparent',
              border: isActive ? '1px solid var(--primary)' : '1px solid transparent',
              transition: 'all 0.2s ease',
              fontWeight: isActive ? '600' : '400'
            })}
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div style={{ marginTop: 'auto', borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
        <NavLink
          to="/settings"
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            borderRadius: 'var(--radius-md)',
            textDecoration: 'none',
            color: isActive ? 'white' : 'var(--text-muted)',
            transition: 'all 0.2s ease'
          })}
        >
          <Settings size={20} />
          <span>Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
