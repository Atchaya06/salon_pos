import React, { useState } from 'react';
import {
  MessageSquare, Star, Plus, Download,
  Search, Filter, RefreshCcw, MoreVertical,
  Trash2, Eye
} from 'lucide-react';
import Button from '../../components/ui/Button';

const MOCK_FEEDBACKS = [
  // Empty state as per screenshot
];

const Feedback = () => {
  const styles = {
    container: { padding: '24px', background: 'var(--background)', minHeight: 'calc(100vh - 72px)', overflowY: 'auto' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
    titleSection: { display: 'flex', alignItems: 'center', gap: '12px' },
    statsInfo: { display: 'flex', alignItems: 'center', gap: '24px', fontSize: '15px', fontWeight: '700' },
    tableWrapper: { background: 'var(--card-bg)', borderRadius: '12px', border: '1px solid var(--glass-border)', overflowX: 'hidden' },
    table: { width: '100%', borderCollapse: 'collapse', tableLayout: 'auto' },
    th: { padding: '10px 8px', textAlign: 'left', background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)', fontSize: '10px', fontWeight: '700', borderBottom: '1px solid var(--glass-border)', textTransform: 'uppercase' },
    td: { padding: '10px 8px', fontSize: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#eee' },
    emptyState: { padding: '60px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '14px' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.statsInfo}>
          <span style={{ fontSize: '18px', fontWeight: '800' }}>Latest feedbacks</span>
          <span style={{ color: 'var(--primary)' }}>Average Rating : 0</span>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button><Plus size={18} /> Add feedback</Button>
          <Button variant="secondary"><Download size={18} /> Export</Button>
        </div>
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: '16px', color: 'var(--text-muted)', fontSize: '13px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          Show
          <select style={{ background: 'var(--background)', border: '1px solid var(--glass-border)', color: 'white', padding: '4px 8px', borderRadius: '4px' }}>
            <option>10</option>
            <option>25</option>
          </select>
          entries
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          Search:
          <input type="text" style={{ background: 'var(--background)', border: '1px solid var(--glass-border)', color: 'white', padding: '6px 12px', borderRadius: '4px' }} />
        </div>
      </div>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={{ ...styles.th, width: '30px' }}>#</th>
              <th style={{ ...styles.th, width: '80px' }}>Date</th>
              <th style={{ ...styles.th, width: '100px' }}>Name</th>
              <th style={{ ...styles.th, width: '120px' }}>Email</th>
              <th style={styles.th}>Review</th>
              <th style={{ ...styles.th, width: '90px' }}>Experience</th>
              <th style={{ ...styles.th, width: '90px' }}>Response</th>
              <th style={{ ...styles.th, width: '80px' }}>Support</th>
              <th style={{ ...styles.th, width: '90px' }}>Satisfaction</th>
              <th style={{ ...styles.th, width: '80px' }}>Rating</th>
              <th style={styles.th}>Suggestion</th>
              <th style={{ ...styles.th, width: '70px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_FEEDBACKS.length > 0 ? (
              MOCK_FEEDBACKS.map((f, i) => (
                <tr key={i}>
                  {/* Map fields here */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={12} style={styles.emptyState}>No data available in table</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', fontSize: '13px', color: 'var(--text-muted)' }}>
        <div>Showing 0 to 0 of 0 entries</div>
        <div style={{ display: 'flex', gap: '2px' }}>
          <button style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', cursor: 'not-allowed', borderRadius: '4px 0 0 4px' }}>Previous</button>
          <button style={{ padding: '6px 12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', color: 'var(--text-muted)', cursor: 'not-allowed', borderRadius: '0 4px 4px 0' }}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
