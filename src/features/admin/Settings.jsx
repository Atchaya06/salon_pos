import React from 'react';
import { 
  Store, 
  CreditCard, 
  Users, 
  Bell, 
  Shield, 
  Smartphone, 
  Globe 
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Settings = () => {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div>
        <h1 style={{ fontSize: '28px', marginBottom: '4px' }}>System Settings</h1>
        <p style={{ color: 'var(--text-muted)' }}>Configure your salon's profile, branches, and subscription plans.</p>
      </div>

      <div style={{ display: 'flex', gap: '32px' }}>
        <aside style={{ width: '240px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { name: 'Salon Profile', icon: Store, active: true },
            { name: 'Subscription', icon: CreditCard },
            { name: 'Team & Roles', icon: Users },
            { name: 'Notifications', icon: Bell },
            { name: 'Security', icon: Shield },
            { name: 'WhatsApp Integration', icon: Smartphone },
            { name: 'Online Booking', icon: Globe },
          ].map(item => (
            <button
              key={item.name}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                borderRadius: '10px',
                border: 'none',
                background: item.active ? 'var(--primary-glow)' : 'transparent',
                color: item.active ? 'var(--primary)' : 'var(--text-muted)',
                cursor: 'pointer',
                textAlign: 'left',
                fontWeight: item.active ? '700' : '400',
                transition: 'all 0.2s'
              }}
            >
              <item.icon size={18} />
              <span style={{ fontSize: '14px' }}>{item.name}</span>
            </button>
          ))}
        </aside>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Card title="Salon Information" subtitle="Update your business details and location.">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Salon Name</label>
                <input 
                  type="text" 
                  defaultValue="Elite Beauty & Spa"
                  style={{ padding: '10px', borderRadius: '8px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'white' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Contact Number</label>
                <input 
                  type="text" 
                  defaultValue="+91 98765 43210"
                  style={{ padding: '10px', borderRadius: '8px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'white' }}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', gridColumn: 'span 2' }}>
                <label style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Business Address</label>
                <textarea 
                  defaultValue="123, Luxury Heights, MG Road, Bangalore, Karnataka - 560001"
                  style={{ padding: '10px', borderRadius: '8px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', color: 'white', minHeight: '80px' }}
                />
              </div>
            </div>
            <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end' }}>
              <Button>Save Changes</Button>
            </div>
          </Card>

          <Card title="Subscription Plan" subtitle="Manage your SalonCloud billing and limits.">
            <div style={{ padding: '20px', background: 'linear-gradient(135deg, var(--primary-glow), var(--secondary-glow))', borderRadius: '12px', border: '1px solid var(--primary)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--primary)', textTransform: 'uppercase', marginBottom: '4px' }}>Current Plan</div>
                <h3 style={{ fontSize: '22px', fontWeight: '900' }}>Pro Enterprise</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Billed annually. Next renewal on 15 Jan 2025.</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <h2 style={{ fontSize: '28px', fontWeight: '900' }}>₹19,999<span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>/yr</span></h2>
                <Button variant="secondary" size="sm" style={{ marginTop: '8px' }}>Change Plan</Button>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '24px' }}>
              <div style={{ padding: '16px', border: '1px solid var(--glass-border)', borderRadius: '12px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>Branches</div>
                <div style={{ fontWeight: '800' }}>3 / 5 Used</div>
              </div>
              <div style={{ padding: '16px', border: '1px solid var(--glass-border)', borderRadius: '12px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>Staff Accounts</div>
                <div style={{ fontWeight: '800' }}>12 / ∞</div>
              </div>
              <div style={{ padding: '16px', border: '1px solid var(--glass-border)', borderRadius: '12px' }}>
                <div style={{ color: 'var(--text-muted)', fontSize: '12px', marginBottom: '4px' }}>WhatsApp Msgs</div>
                <div style={{ fontWeight: '800', color: 'var(--warning)' }}>980 / 1000</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
