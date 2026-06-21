import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sun, Sunrise, Moon } from 'lucide-react';

const DateTimePicker = ({ onSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Generate 14 days
  const days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d;
  });

  const slots = {
    Morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    Afternoon: ['12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'],
    Evening: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM', '08:00 PM']
  };

  const handleSelectSlot = (slot) => {
    setSelectedSlot(slot);
    onSelect && onSelect({ date: selectedDate, slot });
  };

  const styles = {
    container: { background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--glass-border)', overflow: 'hidden', padding: '20px' },
    dateSelector: { display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '16px', scrollbarWidth: 'none', borderBottom: '1px solid var(--glass-border)' },
    dateCard: (active) => ({
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      minWidth: '60px', height: '80px', borderRadius: '12px', cursor: 'pointer',
      background: active ? 'var(--primary)' : 'var(--glass-bg)',
      border: '1px solid ' + (active ? 'var(--primary)' : 'var(--glass-border)'),
      color: active ? 'white' : 'var(--text-main)',
      transition: 'all 0.2s'
    }),
    section: { marginTop: '24px' },
    sectionHeader: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', fontSize: '14px', fontWeight: '700', color: 'var(--text-muted)' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(90px, 1fr))', gap: '10px' },
    slot: (active) => ({
      padding: '10px', borderRadius: '8px', textAlign: 'center', fontSize: '13px', fontWeight: '600', cursor: 'pointer',
      background: active ? 'var(--primary-glow)' : 'var(--glass-bg)',
      border: '1px solid ' + (active ? 'var(--primary)' : 'var(--glass-border)'),
      color: active ? 'var(--primary)' : 'var(--text-main)',
      transition: 'all 0.2s'
    })
  };

  return (
    <div style={styles.container}>
      {/* Date Selector */}
      <div style={styles.dateSelector}>
        {days.map((day, i) => {
          const isActive = selectedDate.toDateString() === day.toDateString();
          return (
            <div key={i} style={styles.dateCard(isActive)} onClick={() => setSelectedDate(day)}>
              <span style={{ fontSize: '12px', opacity: 0.7 }}>{day.toLocaleDateString('en-US', { weekday: 'short' })}</span>
              <span style={{ fontSize: '18px', fontWeight: '800' }}>{day.getDate()}</span>
              <span style={{ fontSize: '12px', opacity: 0.7 }}>{day.toLocaleDateString('en-US', { month: 'short' })}</span>
            </div>
          );
        })}
      </div>

      {/* Slots Section */}
      {Object.entries(slots).map(([name, timeSlots]) => (
        <div key={name} style={styles.section}>
          <div style={styles.sectionHeader}>
            {name === 'Morning' && <Sunrise size={16} />}
            {name === 'Afternoon' && <Sun size={16} />}
            {name === 'Evening' && <Moon size={16} />}
            {name}
            <span style={{ marginLeft: 'auto', fontSize: '12px', fontWeight: 'normal' }}>{timeSlots.length} SLOTS</span>
          </div>
          <div style={styles.grid}>
            {timeSlots.map(slot => (
              <div 
                key={slot} 
                style={styles.slot(selectedSlot === slot)} 
                onClick={() => handleSelectSlot(slot)}
              >
                {slot}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DateTimePicker;
