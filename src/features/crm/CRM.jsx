import React, { useState } from 'react';
import { 
  Search, UserPlus, MoreVertical, Phone, Mail, Wallet, Star, History, 
  Users, UserCheck, UserMinus, UserX, Download, Filter, RefreshCcw, 
  Upload, Eye, Trash2, Smartphone, ChevronDown
} from 'lucide-react';
import Button from '../../components/ui/Button';

const MOCK_CLIENTS = [
  { id: 9220, name: 'rajkumar', phone: '8751199555', inviteCode: 'RAJK8762', firstVisit: '23-03-2024', lastVisit: '23-03-2024', lastService: 'HAIR CUT (senior stylist)', provider: 'RAVI RAGUL', billAmount: 1050, gender: 'Male', points: 0 },
  { id: 9219, name: 'rachana', phone: '9566523889', inviteCode: 'RACH33DE', firstVisit: '23-03-2024', lastVisit: '23-03-2024', lastService: 'HAIR CUT WOMEN', provider: 'RAVI RAGUL', billAmount: 1470, gender: 'Male', points: 0 },
  { id: 9218, name: 'Dhasneem', phone: '9500547310', inviteCode: 'DHAS9DDC', firstVisit: '22-03-2024', lastVisit: '22-03-2024', lastService: 'HAIR TRIM', provider: 'RAVI RAGUL', billAmount: 1000, gender: 'Male', points: 0 },
];

const SEG_CARDS = [
  { label: 'Existing Clients', value: '9,213', sub: 'In software', color: '#818cf8', bg: 'rgba(129,140,248,0.08)', icon: Users },
  { label: 'Active', value: '1,170', sub: 'Regular visitors', color: '#34d399', bg: 'rgba(52,211,153,0.08)', icon: UserCheck },
  { label: 'Churn Risk', value: '853', sub: 'Likely to leave', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', icon: UserMinus },
  { label: 'Defected', value: '6,884', sub: 'Became inactive', color: '#f87171', bg: 'rgba(248,113,113,0.08)', icon: UserX },
];

const inputBase = {
  width: '100%',
  padding: '9px 12px',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '8px',
  color: 'white',
  fontSize: '13px',
  outline: 'none',
};

const selectBase = {
  width: '100%',
  padding: '9px 12px',
  paddingRight: '32px',
  background: '#1e293b',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '8px',
  color: 'white',
  fontSize: '13px',
  outline: 'none',
  appearance: 'none',
  WebkitAppearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  cursor: 'pointer',
};

const OPT = { background: '#1e293b', color: 'white' };

const labelBase = {
  display: 'block',
  fontSize: '11px',
  fontWeight: '600',
  color: 'var(--text-muted)',
  marginBottom: '5px',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const CRM = () => {
  const [filters, setFilters] = useState({
    clientId: '', clientName: '', contact: '',
    source: '', assignedTo: '', service: '', gender: ''
  });

  const upd = (k, v) => setFilters(f => ({ ...f, [k]: v }));

  return (
    <div style={{ padding: '28px', background: 'var(--background)', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>Clients</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Manage and segment your client base</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button><UserPlus size={15}/> Add New Client</Button>
          <Button variant="secondary"><Download size={15}/> Export</Button>
          <Button variant="secondary"><Upload size={15}/> Upload</Button>
        </div>
      </div>

      {/* ── Segment Cards ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {SEG_CARDS.map(({ label, value, sub, color, bg, icon: Icon }) => (
          <div key={label} style={{
            padding: '20px 24px', borderRadius: '14px',
            background: bg, border: `1px solid ${color}30`,
            display: 'flex', gap: '16px', alignItems: 'center'
          }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <Icon size={22} color={color} />
            </div>
            <div>
              <div style={{ fontSize: '26px', fontWeight: '800', color, lineHeight: 1 }}>{value}</div>
              <div style={{ fontSize: '13px', fontWeight: '700', color: 'white', marginTop: '4px' }}>{label}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Filter Panel ── */}
      <div style={{
        borderRadius: '14px',
        border: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden'
      }}>
        {/* Panel Header */}
        <div style={{
          padding: '14px 20px',
          background: 'rgba(255,255,255,0.03)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          display: 'flex', alignItems: 'center', gap: '8px'
        }}>
          <Filter size={14} color="var(--primary)" />
          <span style={{ fontSize: '13px', fontWeight: '700', color: 'white' }}>Search & Filter</span>
        </div>

        {/* Row 1: text fields */}
        <div style={{ padding: '20px 20px 0', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          <div>
            <label style={labelBase}>Client ID</label>
            <div style={{ position: 'relative' }}>
              <input style={{ ...inputBase, paddingLeft: '34px' }} value={filters.clientId} onChange={e => upd('clientId', e.target.value)} placeholder="e.g. 9220" />
              <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>
          <div>
            <label style={labelBase}>Client Name</label>
            <div style={{ position: 'relative' }}>
              <input style={{ ...inputBase, paddingLeft: '34px' }} value={filters.clientName} onChange={e => upd('clientName', e.target.value)} placeholder="Search by name" />
              <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>
          <div>
            <label style={labelBase}>Contact Number</label>
            <div style={{ position: 'relative' }}>
              <input style={{ ...inputBase, paddingLeft: '34px' }} value={filters.contact} onChange={e => upd('contact', e.target.value)} placeholder="Phone number" />
              <Phone size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            </div>
          </div>
        </div>

        {/* Row 2: dropdowns + service */}
        <div style={{ padding: '14px 20px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div>
            <label style={labelBase}>Source</label>
            <select style={selectBase} value={filters.source} onChange={e => upd('source', e.target.value)}>
              <option value="" style={OPT}>-- Select --</option>
              {['Walk-in','Instagram','Facebook','Client Reference','Flex','Other Social Media','Cold Calling','Twitter','Website','Flyer','Newspaper','SMS','Street Hoardings','Event','TV/Radio'].map(s => <option key={s} style={OPT}>{s}</option>)}
            </select>
          </div>
          <div>
            <label style={labelBase}>Assigned To</label>
            <select style={selectBase} value={filters.assignedTo} onChange={e => upd('assignedTo', e.target.value)}>
              <option value="" style={OPT}>-- Select --</option>
              <option style={OPT}>Fathima</option>
              <option style={OPT}>Karan</option>
              <option style={OPT}>Rahul</option>
            </select>
          </div>
          <div>
            <label style={labelBase}>Service</label>
            <input style={inputBase} value={filters.service} onChange={e => upd('service', e.target.value)} placeholder="Filter by service" />
          </div>
          <div>
            <label style={labelBase}>Gender</label>
            <select style={selectBase} value={filters.gender} onChange={e => upd('gender', e.target.value)}>
              <option value="" style={OPT}>-- Select --</option>
              <option style={OPT}>Male</option>
              <option style={OPT}>Female</option>
              <option style={OPT}>Other</option>
            </select>
          </div>
        </div>

        {/* Action Row */}
        <div style={{
          padding: '14px 20px 18px',
          display: 'flex', gap: '10px', justifyContent: 'flex-end',
          borderTop: '1px solid rgba(255,255,255,0.06)'
        }}>
          <button
            onClick={() => setFilters({ clientId:'', clientName:'', contact:'',
              source:'', assignedTo:'', service:'', gender:'' })}
            style={{ padding: '9px 22px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', background: 'transparent', color: 'var(--text-muted)', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <RefreshCcw size={13} /> Clear
          </button>
          <button
            style={{ padding: '9px 28px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, var(--primary), var(--accent))', color: 'white', fontSize: '13px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 12px rgba(99,102,241,0.3)' }}
          >
            <Filter size={13} /> Apply Filter
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div style={{ borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
              {['', 'ID', 'Name', 'Contact', 'Invite Code', 'First Visit', 'Last Visit', 'Service', 'Provider', 'Amount', 'Gender', 'Pts', 'Action'].map((h, i) => (
                <th key={i} style={{
                  padding: '11px 12px', textAlign: 'left',
                  fontSize: '10px', fontWeight: '800', textTransform: 'uppercase',
                  letterSpacing: '0.06em', color: 'var(--text-muted)',
                  borderBottom: '1px solid rgba(255,255,255,0.08)',
                  whiteSpace: 'nowrap'
                }}>{h === '' ? <input type="checkbox" /> : h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MOCK_CLIENTS.map((client, idx) => (
              <tr key={client.id} style={{ background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.016)', transition: 'background 0.15s' }}>
                <td style={{ padding: '12px' }}><input type="checkbox" /></td>
                <td style={{ padding: '12px', fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{client.id}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    fontSize: '13px', fontWeight: '700',
                    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
                  }}>{client.name}</span>
                </td>
                <td style={{ padding: '12px', fontSize: '12px', color: '#e2e8f0' }}>{client.phone}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '20px', background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', fontWeight: '700', letterSpacing: '0.06em' }}>{client.inviteCode}</span>
                </td>
                <td style={{ padding: '12px', fontSize: '12px', color: '#e2e8f0' }}>{client.firstVisit}</td>
                <td style={{ padding: '12px', fontSize: '12px', color: '#e2e8f0' }}>{client.lastVisit}</td>
                <td style={{ padding: '12px', fontSize: '12px', color: '#e2e8f0', maxWidth: '160px' }}>{client.lastService}</td>
                <td style={{ padding: '12px', fontSize: '12px', color: '#e2e8f0' }}>{client.provider}</td>
                <td style={{ padding: '12px', fontSize: '12px', fontWeight: '700', color: '#34d399' }}>₹{client.billAmount.toLocaleString()}</td>
                <td style={{ padding: '12px' }}>
                  <span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '20px', background: client.gender === 'Male' ? 'rgba(99,102,241,0.12)' : 'rgba(236,72,153,0.12)', color: client.gender === 'Male' ? '#818cf8' : '#f9a8d4', fontWeight: '600' }}>{client.gender}</span>
                </td>
                <td style={{ padding: '12px', fontSize: '12px', color: 'var(--text-muted)' }}>{client.points}</td>
                <td style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button style={{ padding: '5px 12px', borderRadius: '6px', border: 'none', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontSize: '11px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Eye size={12}/> View
                    </button>
                    <button style={{ padding: '5px 8px', borderRadius: '6px', border: 'none', background: 'rgba(239,68,68,0.12)', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                      <Trash2 size={12}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CRM;
