import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

const PRESETS = ['Today', 'Yesterday', 'Current Week', 'Last Week', 'This Month', 'Last Month', 'Custom'];

// Get current week range (Mon-Sun)
const getCurrentWeek = () => {
  const now = new Date();
  const day = now.getDay();
  const diffMon = day === 0 ? -6 : 1 - day;
  const mon = new Date(now);
  mon.setDate(now.getDate() + diffMon);
  const sun = new Date(mon);
  sun.setDate(mon.getDate() + 6);
  return { start: formatDate(mon), end: formatDate(sun) };
};

const formatDate = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${dd}`;
};

const formatDisplay = (iso) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
};

const inputStyle = {
  padding: '8px 12px 8px 32px',
  borderRadius: '8px',
  background: 'var(--background)',
  border: '1px solid var(--glass-border)',
  color: 'white',
  fontSize: '13px',
  outline: 'none',
  width: '140px',
};

const selectStyle = {
  padding: '8px 14px',
  borderRadius: '8px',
  background: 'var(--background)',
  border: '1px solid var(--glass-border)',
  color: 'white',
  fontSize: '13px',
  fontWeight: '600',
  cursor: 'pointer',
  outline: 'none',
  appearance: 'none',
  WebkitAppearance: 'none',
  paddingRight: '30px',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
};

export default function DateRangeFilter({ onChange }) {
  const week = getCurrentWeek();
  const [preset, setPreset] = useState('Current Week');
  const [dateRange, setDateRange] = useState(week);

  const handlePreset = (val) => {
    setPreset(val);
    const now = new Date();
    let start, end;

    switch (val) {
      case 'Today':
        start = end = formatDate(now);
        break;
      case 'Yesterday': {
        const y = new Date(now); y.setDate(now.getDate() - 1);
        start = end = formatDate(y);
        break;
      }
      case 'Current Week':
        ({ start, end } = getCurrentWeek());
        break;
      case 'Last Week': {
        const cw = getCurrentWeek();
        const ls = new Date(cw.start); ls.setDate(ls.getDate() - 7);
        const le = new Date(cw.start); le.setDate(le.getDate() - 1);
        start = formatDate(ls); end = formatDate(le);
        break;
      }
      case 'This Month':
        start = formatDate(new Date(now.getFullYear(), now.getMonth(), 1));
        end = formatDate(now);
        break;
      case 'Last Month': {
        const fm = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const lm = new Date(now.getFullYear(), now.getMonth(), 0);
        start = formatDate(fm); end = formatDate(lm);
        break;
      }
      default: return;
    }
    setDateRange({ start, end });
    onChange?.({ start, end, preset: val });
  };

  const handleDateChange = (key, val) => {
    const updated = { ...dateRange, [key]: val };
    setDateRange(updated);
    setPreset('Custom');
    onChange?.({ ...updated, preset: 'Custom' });
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap',
      padding: '12px 20px',
      background: 'var(--card-bg)', backdropFilter: 'blur(10px)',
      border: '1px solid var(--glass-border)', borderRadius: '12px',
    }}>
      {/* Preset Dropdown */}
      <select
        value={preset}
        onChange={e => handlePreset(e.target.value)}
        style={selectStyle}
      >
        {PRESETS.map(p => (
          <option key={p} value={p} style={{ background: '#1a1a2e', color: 'white' }}>{p}</option>
        ))}
      </select>

      {/* From */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>From</span>
        <div style={{ position: 'relative' }}>
          <Calendar size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', pointerEvents: 'none' }} />
          <input
            type="date"
            value={dateRange.start}
            onChange={e => handleDateChange('start', e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      {/* To */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>To</span>
        <div style={{ position: 'relative' }}>
          <Calendar size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)', pointerEvents: 'none' }} />
          <input
            type="date"
            value={dateRange.end}
            onChange={e => handleDateChange('end', e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Display info */}
      <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginLeft: 'auto' }}>
        {formatDisplay(dateRange.start)} — {formatDisplay(dateRange.end)}
      </div>
    </div>
  );
}
