import React, { useState } from 'react';
import { 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  User, 
  Scissors, 
  Clock,
  Globe,
  Trash2,
  Eye,
  Edit
} from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const STAFF = [
  { id: 1, name: 'Fathima', role: 'Senior Stylist', color: '#6366f1' },
  { id: 2, name: 'Priya', role: 'Skin Specialist', color: '#ec4899' },
  { id: 3, name: 'Karan', role: 'Artist', color: '#8b5cf6' },
  { id: 4, name: 'Suresh', role: 'Stylist', color: '#10b981' },
];

const TIMES = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM'
];

const MOCK_BOOKINGS = [
  { id: 101, staffId: 1, time: '10:00 AM', customer: 'Rahul Sharma', service: 'Haircut', duration: '60 min' },
  { id: 102, staffId: 2, time: '11:00 AM', customer: 'Sneha Kapur', service: 'Facial', duration: '90 min' },
  { id: 103, staffId: 3, time: '02:00 PM', customer: 'Amit Verma', service: 'Manicure', duration: '45 min' },
  { id: 104, staffId: 1, time: '03:00 PM', customer: 'Priya Mani', service: 'Coloring', duration: '120 min' },
];

const MOCK_WEB_APPOINTMENTS = [
  { id: 1, dateAppt: '2026-03-24', time: '10:00 AM', dateBook: '2026-03-22', client: 'John Doe', phone: '9876543210', amount: 1500, service: 'Haircut & Styling' },
  { id: 2, dateAppt: '2026-03-25', time: '02:30 PM', dateBook: '2026-03-23', client: 'Jane Smith', phone: '9000000001', amount: 2000, service: 'Facial Treatment' },
];

const Appointments = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState('grid');

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '24px', height: 'calc(100vh - 72px)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div>
            <h1 style={{ fontSize: '28px', marginBottom: '4px' }}>Appointments</h1>
            <p style={{ color: 'var(--text-muted)' }}>{selectedDate.toDateString()}</p>
          </div>
          <div style={{ display: 'flex', gap: '8px', background: 'var(--glass-bg)', padding: '4px', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
            <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '8px' }}><ChevronLeft size={20} /></button>
            <button style={{ background: 'var(--primary)', border: 'none', color: 'white', cursor: 'pointer', padding: '8px 16px', borderRadius: '8px', fontWeight: 'bold' }}>Today</button>
            <button style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '8px' }}><ChevronRight size={20} /></button>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant={view === 'grid' ? 'primary' : 'secondary'} onClick={() => setView('grid')}><Clock size={18} /> Timeline View</Button>
          <Button variant={view === 'web' ? 'primary' : 'secondary'} onClick={() => setView('web')}><Globe size={18} />  Appointment list</Button>
          <Button><Plus size={18} /> New Booking</Button>
        </div>
      </div>

      <Card style={{ flex: 1, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {view === 'grid' ? (
          <>
            {/* Calendar Header */}
            <div style={{ display: 'flex', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.02)' }}>
              <div style={{ width: '100px', padding: '16px', borderRight: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Clock size={18} color="var(--text-muted)" />
              </div>
              <div style={{ flex: 1, display: 'flex' }}>
                {STAFF.map(s => (
                  <div key={s.id} style={{ flex: 1, padding: '16px', borderRight: '1px solid var(--glass-border)', textAlign: 'center' }}>
                    <div style={{ fontWeight: '700', fontSize: '15px' }}>{s.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{s.role}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar Body */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {TIMES.map(time => (
                <div key={time} style={{ display: 'flex', minHeight: '80px', borderBottom: '1px solid var(--glass-border)' }}>
                  <div style={{ width: '100px', padding: '16px', borderRight: '1px solid var(--glass-border)', textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>
                    {time}
                  </div>
                  <div style={{ flex: 1, display: 'flex' }}>
                    {STAFF.map(s => {
                      const booking = MOCK_BOOKINGS.find(b => b.staffId === s.id && b.time === time);
                      return (
                        <div key={s.id} style={{ flex: 1, borderRight: '1px solid var(--glass-border)', position: 'relative', padding: '4px' }}>
                          {booking && (
                            <div style={{ 
                              background: `${s.color}20`, 
                              borderLeft: `4px solid ${s.color}`, 
                              borderRadius: '8px', 
                              padding: '10px',
                              height: 'calc(100% - 8px)',
                              cursor: 'pointer',
                              transition: 'transform 0.2s'
                            }}>
                              <div style={{ fontWeight: '700', fontSize: '13px', marginBottom: '4px' }}>{booking.customer}</div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)' }}>
                                <Scissors size={10} /> {booking.service}
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                                <Clock size={10} /> {booking.duration}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div style={{ flex: 1, overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--card-bg)' }}>
                <tr>
                  {['#', 'Date Appt', 'Time', 'Date Booking', 'Client Name', 'Number', 'Amount', 'Service Name', 'Action'].map(h => (
                    <th key={h} style={{ padding: '12px 16px', fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', borderBottom: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.03)' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {MOCK_WEB_APPOINTMENTS.map((appt, i) => (
                  <tr key={appt.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px 16px', fontSize: '12px' }}>{i + 1}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px' }}>{appt.dateAppt}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--text-muted)' }}>{appt.time}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px' }}>{appt.dateBook}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', fontWeight: '700', color: 'var(--primary)' }}>{appt.client}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px' }}>{appt.phone}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px' }}>₹{appt.amount}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px', color: 'var(--text-muted)' }}>{appt.service}</td>
                    <td style={{ padding: '12px 16px', fontSize: '12px' }}>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button style={{ padding: '4px 8px', background: '#3b82f6', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}><Eye size={12}/></button>
                        <button style={{ padding: '4px 8px', background: '#eab308', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}><Edit size={12}/></button>
                        <button style={{ padding: '4px 8px', background: '#ef4444', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer' }}><Trash2 size={12}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Appointments;
