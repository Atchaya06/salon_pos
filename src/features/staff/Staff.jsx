import React, { useState } from 'react';
import { 
  Plus, 
  Phone, 
  Award, 
  TrendingUp, 
  Calendar, 
  Users,
  UserCircle, 
  ChevronRight 
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import DateRangeFilter from '../../components/ui/DateRangeFilter';

const MOCK_STAFF = [
  { 
    id: 1, name: 'Fathima', role: 'Senior Stylist', phone: '9876543210', commission: '15%', revenue: '₹45,000', earned: '₹6,750',
    dailyServices: [
      { id: 101, serviceName: 'Global Hair Color', client: 'Ananya S.', price: 2200, rate: '15%', earned: 330, time: '10:30 AM' },
      { id: 102, serviceName: 'Hydra Facial', client: 'Rahul K.', price: 1500, rate: '15%', earned: 225, time: '12:15 PM' },
      { id: 103, serviceName: 'Haircut (Classic)', client: 'Sneha P.', price: 450, rate: '15%', earned: 67.5, time: '02:30 PM' },
    ]
  },
  { 
    id: 2, name: 'Priya', role: 'Skin Specialist', phone: '9123456789', commission: '12%', revenue: '₹32,000', earned: '₹3,840',
    dailyServices: [
      { id: 201, serviceName: 'Cleanup', client: 'Meera R.', price: 700, rate: '12%', earned: 84, time: '11:00 AM' },
      { id: 202, serviceName: 'D-Tan Pack', client: 'Vikram J.', price: 600, rate: '12%', earned: 72, time: '01:45 PM' },
    ]
  },
  { 
    id: 3, name: 'Karan', role: 'Artist', phone: '9988776655', commission: '10%', revenue: '₹18,500', earned: '₹1,850',
    dailyServices: [
      { id: 301, serviceName: 'Beard Trim', client: 'Arjun M.', price: 200, rate: '10%', earned: 20, time: '03:15 PM' },
    ]
  },
  { 
    id: 4, name: 'Suresh', role: 'Stylist', phone: '9000011122', commission: '10%', revenue: '₹28,000', earned: '₹2,800',
    dailyServices: [
      { id: 401, serviceName: 'Haircut (Classic)', client: 'Pankaj D.', price: 450, rate: '10%', earned: 45, time: '04:00 PM' },
    ]
  },
];

const Staff = () => {
  const [selectedStaff, setSelectedStaff] = useState(MOCK_STAFF[0]);

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '4px' }}>Staff & Commissions</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your team and track their performance earnings.</p>
        </div>
        <Button><Plus size={18} /> Add Employee</Button>
      </div>

      {/* Date Range Filter */}
      <DateRangeFilter onChange={(range) => console.log('Staff range:', range)} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', background: 'var(--primary-glow)', borderRadius: '12px' }}><Award size={24} color="var(--primary)" /></div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Top Performer</div>
              <div style={{ fontWeight: '800', fontSize: '18px' }}>Fathima</div>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', background: 'var(--secondary-glow)', borderRadius: '12px' }}><TrendingUp size={24} color="var(--secondary)" /></div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Global Commission</div>
              <div style={{ fontWeight: '800', fontSize: '18px' }}>₹15,240</div>
            </div>
          </div>
        </Card>
        <Card>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '12px', background: 'var(--accent-glow)', borderRadius: '12px' }}><Users size={24} color="var(--accent)" /></div>
            <div>
              <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Active Staff</div>
              <div style={{ fontWeight: '800', fontSize: '18px' }}>8 Members</div>
            </div>
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <Card style={{ flex: 2, padding: 0 }}>
          <div style={{ padding: '24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '700' }}>Employee Directory</h3>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Month: March 2024</div>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left', background: 'rgba(255,255,255,0.02)' }}>
                <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '13px', fontWeight: '600' }}>STAFF MEMBER</th>
                <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '13px', fontWeight: '600' }}>ROLE</th>
                <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '13px', fontWeight: '600' }}>REVENUE</th>
                <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '13px', fontWeight: '600' }}>COMMISSION</th>
                <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '13px', fontWeight: '600' }}>EARNED</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_STAFF.map(staff => (
                <tr 
                  key={staff.id} 
                  onClick={() => setSelectedStaff(staff)}
                  style={{ borderBottom: '1px solid var(--glass-border)', cursor: 'pointer', background: selectedStaff.id === staff.id ? 'var(--primary-glow)' : 'transparent', transition: 'all 0.2s' }}
                >
                  <td style={{ padding: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--glass-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>{staff.name.charAt(0)}</div>
                      <div style={{ fontWeight: '600' }}>{staff.name}</div>
                    </div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>{staff.role}</td>
                  <td style={{ padding: '16px', fontWeight: '600' }}>{staff.revenue}</td>
                  <td style={{ padding: '16px', fontSize: '13px' }}>{staff.commission}</td>
                  <td style={{ padding: '16px', fontWeight: '800', color: 'var(--success)' }}>{staff.earned}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>

        <Card style={{ flex: 1, height: 'fit-content' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 'bold' }}>{selectedStaff.name.charAt(0)}</div>
            <h3 style={{ fontSize: '18px', fontWeight: '800' }}>{selectedStaff.name}</h3>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{selectedStaff.role}</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
            <div style={{ padding: '12px', background: 'var(--glass-bg)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Phone size={16} color="var(--text-muted)" />
                <span style={{ fontSize: '14px' }}>{selectedStaff.phone}</span>
              </div>
              <ChevronRight size={16} color="var(--text-muted)" />
            </div>
            <div style={{ padding: '12px', background: 'var(--glass-bg)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <Calendar size={16} color="var(--text-muted)" />
                <span style={{ fontSize: '14px' }}>View Schedule</span>
              </div>
              <ChevronRight size={16} color="var(--text-muted)" />
            </div>
          </div>

          <div style={{ marginTop: '24px' }}>
            <h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '16px' }}>Performance Snapshot</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ height: '8px', background: 'var(--glass-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '85%', height: '100%', background: 'var(--primary)', borderRadius: '4px' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)' }}>
                <span>Target: ₹50,000</span>
                <span>85% Achieved</span>
              </div>
            </div>
          </div>

          <Button style={{ width: '100%', marginTop: '24px' }}>Generate Pay Slip</Button>
        </Card>
      </div>

      {/* Daily Service Log Grid */}
      <Card style={{ padding: 0 }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Daily Attendance & Earnings Log</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: '4px 0 0' }}>Showing services performed by <strong>{selectedStaff.name}</strong> today (25 March 2026)</p>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Services Attended</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary)' }}>{selectedStaff.dailyServices?.length || 0}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Commission Earned</div>
              <div style={{ fontSize: '18px', fontWeight: '800', color: '#4ade80' }}>₹{selectedStaff.dailyServices?.reduce((sum, s) => sum + s.earned, 0).toLocaleString()}</div>
            </div>
          </div>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)', textAlign: 'left', background: 'rgba(255,255,255,0.02)' }}>
              <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Time</th>
              <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Service Details</th>
              <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Client</th>
              <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Price</th>
              <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Comm %</th>
              <th style={{ padding: '16px', color: 'var(--text-muted)', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Earned</th>
            </tr>
          </thead>
          <tbody>
            {!selectedStaff.dailyServices || selectedStaff.dailyServices.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }}>No services recorded for today.</td>
              </tr>
            ) : (
              selectedStaff.dailyServices.map(service => (
                <tr key={service.id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s' }}>
                  <td style={{ padding: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>{service.time}</td>
                  <td style={{ padding: '16px' }}>
                    <div style={{ fontWeight: '600', fontSize: '14px' }}>{service.serviceName}</div>
                  </td>
                  <td style={{ padding: '16px', fontSize: '13px' }}>{service.client}</td>
                  <td style={{ padding: '16px', fontWeight: '600' }}>₹{service.price.toLocaleString()}</td>
                  <td style={{ padding: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>{service.rate}</td>
                  <td style={{ padding: '16px', fontWeight: '800', color: '#4ade80' }}>₹{service.earned.toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default Staff;
