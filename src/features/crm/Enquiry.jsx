import React, { useState } from 'react';
import { 
  Plus, Search, Filter, RefreshCcw, Download, 
  Edit2, Trash2, Send, Phone, MapPin, 
  Calendar, User, ClipboardList, Info
} from 'lucide-react';
import Button from '../../components/ui/Button';

const MOCK_ENQUIRIES = [
  { id: 1, name: 'John', phone: '9876543210', dateToFollow: '18-06-2023', leadType: 'Cold', enquiryFor: 'Service SMOOTHENING', action: 'Pending' },
  { id: 2, name: 'Thomas', phone: '9876543210', dateToFollow: '18-06-2023', leadType: 'Cold', enquiryFor: 'Service SMOOTHENING', action: 'Pending' },
  { id: 3, name: 'Kavya', phone: '9943364134', dateToFollow: '20-02-2023', leadType: 'Hot', enquiryFor: 'Service BASIC BRIDAL WOMEN', action: 'Pending' },
  { id: 4, name: 'Deepa', phone: '9629976390', dateToFollow: '31-12-2022', leadType: 'Hot', enquiryFor: 'Service KERATIN', action: 'Pending' },
  { id: 5, name: 'Mathi', phone: '8220602739', dateToFollow: '05-01-2023', leadType: 'Hot', enquiryFor: 'Service SMOOTHENING', action: 'Pending' },
];

const OPT = { background: '#1e293b', color: 'white' };

const Enquiry = () => {
  const [form, setForm] = useState({
    contact: '', clientName: '',
    enquiryFor: '', enquiryType: '', response: '', dateToFollow: '2026-03-25',
    source: '', leadRep: 'Admin', leadStatus: 'Pending'
  });

  const styles = {
    container: { padding: '28px', background: 'var(--background)', minHeight: 'calc(100vh - 72px)', overflowY: 'auto' },
    sectionTitle: { fontSize: '18px', fontWeight: '800', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' },
    formGrid: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' },
    label: { display: 'block', fontSize: '11px', fontWeight: '800', color: 'var(--primary)', marginBottom: '2px', textTransform: 'uppercase', letterSpacing: '0.05em' },
    input: { 
      width: '100%', padding: '10px 0', background: 'transparent', 
      border: 'none', borderBottom: '2px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '14px', outline: 'none' 
    },
    select: {
      width: '100%', padding: '10px 0', background: 'transparent', 
      border: 'none', borderBottom: '2px solid rgba(255,255,255,0.15)', color: 'white', fontSize: '14px', outline: 'none',
      cursor: 'pointer'
    },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '0' },
    th: { padding: '12px 16px', textAlign: 'left', background: 'rgba(99,102,241,0.06)', color: 'var(--text-muted)', fontSize: '10px', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.08)', textTransform: 'uppercase', letterSpacing: '0.08em' },
    td: { padding: '10px 16px', fontSize: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#eee' },
    actionBtn: (color) => ({
      padding: '4px 8px', borderRadius: '4px', border: 'none', cursor: 'pointer', display: 'flex', 
      alignItems: 'center', gap: '4px', fontSize: '11px', fontWeight: '700', color: 'white', background: color
    })
  };

  return (
    <div style={styles.container}>
      {/* Add Enquiry Section */}
      <h2 style={styles.sectionTitle}><Plus size={20} color="var(--primary)"/> Add Enquiry</h2>
      <div style={styles.formGrid}>
        <div>
          <label style={styles.label}>Contact number *</label>
          <input type="text" placeholder="Contact number" style={styles.input} />
        </div>
        <div>
          <label style={styles.label}>Client name *</label>
          <input type="text" placeholder="Client Name" style={styles.input} />
        </div>
        <div>
          <label style={styles.label}>Enquiry for *</label>
          <input type="text" placeholder="Autocomplete services..." style={styles.input} />
        </div>
        <div>
          <label style={styles.label}>Enquiry type *</label>
          <select style={styles.select}>
            <option style={OPT}>-- Select a type --</option>
            <option style={OPT}>Hot</option>
            <option style={OPT}>Cold </option>
            <option style={OPT}>Warm</option>
          </select>
        </div>
        <div>
          <label style={styles.label}>Response</label>
          <input type="text" placeholder="Response" style={styles.input} />
        </div>
        <div>
          <label style={styles.label}>Date to follow *</label>
          <input type="date" value={form.dateToFollow} onChange={(e) => setForm({...form, dateToFollow: e.target.value})} style={styles.input} />
        </div>
        <div>
          <label style={styles.label}>Source of enquiry *</label>
          <select style={styles.select}>
            <option style={OPT}>-- Select --</option>
            {['Walk-in', 'Instagram', 'Facebook', 'Client Refrence', 'Flex', 'Other Social Media', 'Cold Calling', 'Twitter', 'Website', 'Flyer', 'Newspaper', 'SMS', 'Street Hoardings', 'Event', 'TV/Radio'].map(o => <option key={o} style={OPT}>{o}</option>)}
          </select>
        </div>
        <div>
          <label style={styles.label}>Lead representative</label>
          <select style={styles.select}>
            <option style={OPT}>Admin</option>
            <option style={OPT}>Reception</option>
          </select>
        </div>
        <div>
          <label style={styles.label}>Lead status *</label>
          <select style={styles.select}>
            <option style={OPT}>Pending</option>
            <option style={OPT}>Converted</option>
            <option style={OPT}>Close</option>
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gridColumn: 'span 3', justifyContent: 'flex-end' }}>
          <Button style={{ padding: '9px 24px' }}>
            <Plus size={16}/> Add enquiry
          </Button>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '40px 0' }} />

      {/* View & Manage Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ ...styles.sectionTitle, marginBottom: 0 }}><ClipboardList size={20} color="var(--primary)"/> View & Manage all enquiry</h2>
        <Button variant="secondary" small><Download size={14}/> Export</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '16px', background: 'rgba(255,255,255,0.02)', padding: '16px', borderRadius: '12px', border: '1px solid var(--glass-border)', marginBottom: '16px' }}>
        <div>
          <label style={styles.label}>Date to follow</label>
          <input type="text" value="03/24/2026 - 03/24/2026" style={styles.input} readOnly />
        </div>
        <div>
          <label style={styles.label}>Enquiry for</label>
          <input type="text" placeholder="Autocomplete services..." style={styles.input} />
        </div>
        <div>
          <label style={styles.label}>Lead representative</label>
          <select style={styles.select}>
            <option style={OPT}>-- Select User --</option>
            <option style={OPT}>Admin</option>
          </select>
        </div>
        <div>
          <label style={styles.label}>Enquiry type</label>
          <select style={styles.select}>
            <option style={OPT}>-- Select a type --</option>
            <option style={OPT}>Hot</option>
            <option style={OPT}>Cold </option>
            <option style={OPT}>Warm</option>
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
          <Button small style={{ flex: 1, padding: '9px 0' }}><Filter size={14}/> Filter</Button>
          <Button variant="secondary" small style={{ flex: 1, padding: '9px 0' }}><RefreshCcw size={14}/> Clear</Button>
        </div>
      </div>

      <div style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
        marginTop: '24px', marginBottom: '16px', color: 'var(--text-muted)', fontSize: '13px' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          Show 
          <select style={{ ...styles.select, width: 'auto', padding: '4px 32px 4px 12px' }}>
            <option style={OPT}>10</option>
            <option style={OPT}>25</option>
          </select>
          entries
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          Search: 
          <input type="text" style={{ ...styles.input, width: '200px' }} />
        </div>
      </div>

      <div style={{ marginTop: '24px', overflowX: 'auto', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, width: '40px' }}><input type="checkbox" /></th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Phone</th>
              <th style={styles.th}>Date to follow</th>
              <th style={styles.th}>Lead type</th>
              <th style={styles.th}>Enquiry for</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_ENQUIRIES.map((enq, idx) => (
              <tr key={enq.id} style={{ background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.016)' }}>
                <td style={styles.td}><input type="checkbox" /></td>
                <td style={{ ...styles.td, fontWeight: '700', color: 'var(--primary)' }}>{enq.name}</td>
                <td style={styles.td}>{enq.phone}</td>
                <td style={styles.td}>{enq.dateToFollow}</td>
                <td style={styles.td}>
                  <span style={{ padding: '3px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: '700', background: enq.leadType === 'Hot' ? 'rgba(239,68,68,0.1)' : 'rgba(59,130,246,0.1)', color: enq.leadType === 'Hot' ? '#ef4444' : '#3b82f6' }}>
                    {enq.leadType}
                  </span>
                </td>
                <td style={styles.td}>{enq.enquiryFor}</td>
                <td style={styles.td}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={styles.actionBtn('#eab308')}><Edit2 size={12}/> Edit</button>
                    <button style={styles.actionBtn('#ef4444')}><Trash2 size={12}/> Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Button>
          <Send size={16}/> Send SMS
        </Button>
      </div>
    </div>
  );
};

export default Enquiry;
