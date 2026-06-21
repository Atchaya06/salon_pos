import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Calendar, 
  DollarSign, 
  ArrowUpRight, 
  MoreVertical,
  QrCode,
  UserPlus,
  Smile
} from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <Card style={{ flex: 1 }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div>
        <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '8px' }}>{title}</p>
        <h3 style={{ fontSize: '24px', fontWeight: '800' }}>{value}</h3>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
          <span style={{ fontSize: '12px', color: 'var(--success)', fontWeight: '600' }}>{change}</span>
          <ArrowUpRight size={12} color="var(--success)" />
        </div>
      </div>
      <div style={{ 
        width: '48px', 
        height: '48px', 
        borderRadius: '12px', 
        background: `${color}20`, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Icon size={24} color={color} />
      </div>
    </div>
  </Card>
);

const Dashboard = () => {
  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '28px', marginBottom: '4px' }}>Welcome back, Jane</h1>
          <p style={{ color: 'var(--text-muted)' }}>Here's what's happening with your salon today.</p>
        </div>
        <Button>Download Report</Button>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <StatCard title="Total Revenue" value="₹45,230" change="+12.5%" icon={DollarSign} color="#6366f1" />
        <StatCard title="Appointments" value="12" change="+3 today" icon={Calendar} color="#ec4899" />
        <StatCard title="Today Enquiry" value="8" change="+20%" icon={UserPlus} color="#8b5cf6" />
        <StatCard title="Clients Visit" value="₹1,250" change="+5.2%" icon={Smile} color="#10b981" />
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>
        <Card title="Revenue Analytics" subtitle="Gross revenue over the last 7 days" style={{ flex: 2, height: '400px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--glass-border)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--text-muted)" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ 
                  background: 'var(--card-bg)', 
                  border: '1px solid var(--glass-border)', 
                  borderRadius: 'var(--radius-md)',
                  backdropFilter: 'blur(10px)'
                }} 
              />
              <Area type="monotone" dataKey="sales" stroke="var(--primary)" fillOpacity={1} fill="url(#colorSales)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Upcoming Appointments" extra={<MoreVertical size={20} color="var(--text-muted)" />} style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {[
              { time: '10:30 AM', name: 'Rahul Sharma', service: 'Haircut & Styling', staff: 'Fathima' },
              { time: '11:45 AM', name: 'Sneha Kapur', service: 'Hydra Facial', staff: 'Priya' },
              { time: '02:00 PM', name: 'Amit Verma', service: 'Manicure', staff: 'Karan' },
            ].map((app, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-muted)', width: '70px' }}>{app.time}</div>
                <div style={{ width: '2px', height: '40px', background: 'var(--glass-border)' }}></div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '15px' }}>{app.name}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{app.service} • {app.staff}</div>
                </div>
              </div>
            ))}
            <Button variant="secondary" style={{ marginTop: '12px' }}>View Full Calendar</Button>
          </div>
        </Card>
      </div>

      <Card style={{ padding: '40px', textAlign: 'center', background: 'var(--primary-glow)', border: '1px solid var(--primary)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
            <QrCode size={40} />
          </div>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '800' }}>QR Customer Booking is Ready</h3>
            <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>Your customers can now book appointments instantly by scanning a QR code.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <Button onClick={() => window.open('/book/mg-road', '_blank')}>Preview Landing Page</Button>
            <Button variant="secondary">Download Store QR</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
