import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  BarChart3, Calendar, Filter, X, Download, ChevronDown, 
  FileText, Users, ShoppingBag, CreditCard, TrendingUp,
  Search, RefreshCcw, Printer
} from 'lucide-react';
import Button from '../../components/ui/Button';
import DateRangeFilter from '../../components/ui/DateRangeFilter';

const REPORT_CATEGORIES = [
  'Daily Reports', 'Day Summary', 'Billing Reports', 'Enquiry Reports', 
  'Service Provider Reports', 'Received Pending Payments',
  'Balance Reports', 'Attendance Report'
];

const MOCK_REPORT_DATA = [
  { id: 1, date: '24-03-2026', serviceAmt: 4500, productAmt: 1200, packageAmt: 0, membershipAmt: 2000, walletAmt: 500, pendingReceived: 0, appointmentAdvance: 300, discount: 100, netSale: 7900, tax: 450, grandSale: 8350, totalCollection: 8350, cash: 5000, card: 3350, cheque: 0, online: 0, paytm: 0, wallet: 0, rewardPoint: 0 }
];

const DAY_SUMMARY_GROUPS = [
  {
    title: 'Total Sales', amount: 8350, color: '#818cf8', bg: 'rgba(129,140,248,0.08)', border: 'rgba(129,140,248,0.25)',
    sub: [{ label: 'Orders', value: '3' }]
  },
  {
    title: 'Payment Methods', amount: 5000, color: '#4ade80', bg: 'rgba(74,222,128,0.08)', border: 'rgba(74,222,128,0.25)',
    sub: [{ label: 'Cash', value: '₹5,000' }, { label: 'UPI', value: '₹0.00' }, { label: 'Online', value: '₹0.00' }]
  },
  {
    title: 'Sales Breakdown', amount: null, color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', border: 'rgba(56,189,248,0.25)',
    sub: [{ label: 'Service Sales', value: '₹4,500' }, { label: 'Product Sales', value: '₹1,200' }, { label: 'Wallet Recharged', value: '₹2,000' }]
  },
  {
    title: 'Additional Amounts', amount: null, color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', border: 'rgba(251,191,36,0.25)',
    sub: [{ label: 'Pending Received', value: '₹0.00' }, { label: 'Appointment Advance', value: '₹300.00' }, { label: 'Paid by Wallet', value: '₹0.00' }, { label: 'Reward Points', value: '₹0.00' }]
  },
  {
    title: 'Tax Breakdown', amount: 450, color: '#f472b6', bg: 'rgba(244,114,182,0.08)', border: 'rgba(244,114,182,0.25)',
    sub: [{ label: 'Total TAX', value: '₹450.00' }, { label: 'Inclusive Tax', value: '₹0.00' }]
  },
  {
    title: 'Discount & Pending', amount: 100, color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.25)',
    sub: [{ label: 'Total Discount', value: '₹100.00' }, { label: 'Pending by Clients', value: '₹0.00' }]
  },
];

const MOCK_BILLING_REPORTS = [
  { date: '24-03-2026', type: 'Service', invoiceId: 'INV-9953', client: 'John Doe', contact: '9876543210', total: 1200, paid: 1200, detail: 'Cash', pending: 0, billType: 'GST', products: 'Haircut (Classic) - Priya', remarks: 'Good', user: 'Admin' }
];

const MOCK_ENQUIRY_REPORTS = [
  { name: 'Alice Smith', email: 'alice@example.com', phone: '9988776655', date: '25-03-2026', type: 'Personal', enquiryFor: 'Hydra Facial', action: 'Pending' }
];

const MOCK_PROVIDER_REPORTS = [
  { date: '24-03-2026', provider: 'Priya', contact: '9876500001', service: 'Haircut (Classic)', price: 450, commission: 45 }
];

const MOCK_BALANCE_DATA = [
  { id: 1, date: '24-03-2026', desc: 'Opening Balance', opening: 5000, credit: 0, debit: 0, closing: 5000 },
  { id: 2, date: '24-03-2026', desc: 'Service Sale (INV-9953)', opening: 5000, credit: 1200, debit: 0, closing: 6200 },
];

const MOCK_ATTENDANCE = {
  enrollId: '1004',
  name: 'RAVI RAGUL',
  refId: '1004',
  month: 'March',
  year: '2026',
  days: Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    in: i < 15 ? '09:00 AM' : '',
    out: i < 15 ? '07:00 PM' : '',
    hrs: i < 15 ? '10' : '',
    status: i < 15 ? 'P' : (i % 7 === 0 ? 'W' : 'A')
  }))
};

const MOCK_PENDING_PAYMENTS = [
  { date: '24-03-2026', client: 'Sarah Connor', invoice: 'INV-1024', amount: 500, pending: 200, status: 'Partial' }
];

const Reports = () => {
  const { reportType } = useParams();
  const [activeReport, setActiveReport] = useState('Daily Reports');

  useEffect(() => {
    if (reportType) {
      const typeMap = {
        'daily': 'Daily Reports',
        'summary': 'Day Summary',
        'billing': 'Billing Reports',
        'enquiry': 'Enquiry Reports',
        'provider': 'Service Provider Reports',
        'balance': 'Balance Reports',
        'attendance': 'Attendance Report'
      };
      if (typeMap[reportType]) {
        setActiveReport(typeMap[reportType]);
      }
    }
  }, [reportType]);

  const styles = {
    container: { padding: '24px', height: 'calc(100vh - 72px)', overflowY: 'auto', background: 'var(--background)' },
    header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' },
    titleSection: { display: 'flex', alignItems: 'center', gap: '12px' },
    filterBar: { 
      background: 'var(--card-bg)', backdropFilter: 'blur(10px)', border: '1px solid var(--glass-border)',
      padding: '16px 20px', borderRadius: '12px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' 
    },
    dropdown: { position: 'relative' },
    dropdownMenu: {
      position: 'absolute', top: '100%', left: 0, background: '#1a1a2e', border: '1px solid var(--glass-border)',
      borderRadius: '8px', boxShadow: '0 10px 25px rgba(0,0,0,0.5)', zIndex: 100, width: '220px', marginTop: '8px'
    },
    dropdownItem: (active) => ({
      padding: '10px 16px', fontSize: '13px', color: active ? 'var(--primary)' : 'white', cursor: 'pointer',
      borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.2s', background: active ? 'rgba(139,92,246,0.1)' : 'transparent'
    }),
    tableWrapper: { 
      background: 'var(--card-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', 
      overflowX: 'hidden', scrollbarWidth: 'thin' 
    },
    table: { width: '100%', borderCollapse: 'collapse', tableLayout: 'auto' },
    th: { padding: '8px 4px', textAlign: 'left', background: 'rgba(255,255,255,0.03)', color: 'var(--text-muted)', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid var(--glass-border)' },
    td: { padding: '8px 4px', fontSize: '10px', borderBottom: '1px solid rgba(255,255,255,0.05)', color: '#eee' },
    badge: { padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '600' }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--primary-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <BarChart3 size={24} color="var(--primary)" />
          </div>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800' }}>Reports</h1>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>Track analytics and financial history</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <Button variant="secondary"><Download size={18}/> Export</Button>
          <Button variant="primary"><RefreshCcw size={18}/> Refresh</Button>
        </div>
      </div>

      {/* Tabs Interface */}
      <div style={{ 
        display: 'flex', 
        gap: '4px', 
        overflowX: 'auto', 
        background: 'rgba(255,255,255,0.03)', 
        padding: '6px', 
        borderRadius: '12px', 
        border: '1px solid var(--glass-border)',
        marginBottom: '20px',
        scrollbarWidth: 'none'
      }}>
        {REPORT_CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveReport(cat)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              background: activeReport === cat ? 'var(--primary)' : 'transparent',
              color: activeReport === cat ? 'white' : 'var(--text-muted)',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Date Range Filter */}
      <DateRangeFilter onChange={(range) => console.log('Report range:', range)} />

      <div style={{ marginTop: '16px' }}>
        {activeReport === 'Balance Reports' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Payment method:</span>
            <select style={{ padding: '8px 12px', borderRadius: '8px', background: 'var(--background)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '13px' }}>
              <option>Cash</option>
              <option>Card</option>
              <option>Online</option>
            </select>
          </div>
        )}
        {activeReport === 'Attendance Report' && (
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Attendance type:</span>
              <select style={{ padding: '8px 12px', borderRadius: '8px', background: 'var(--background)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '13px' }}>
                <option>Service provider</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Service provider:</span>
              <select style={{ padding: '8px 12px', borderRadius: '8px', background: 'var(--background)', border: '1px solid var(--glass-border)', color: 'white', fontSize: '13px' }}>
                <option>RAVI RAGUL</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Day Summary - rendered outside table wrapper */}
      {activeReport === 'Day Summary' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {DAY_SUMMARY_GROUPS.map(group => (
            <div key={group.title} style={{
              padding: '20px', borderRadius: '14px',
              background: group.bg, border: `1px solid ${group.border}`,
              display: 'flex', flexDirection: 'column', gap: '12px',
              minHeight: '120px'
            }}>
              {/* Card Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: group.color, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{group.title}</div>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: group.color, opacity: 0.6 }} />
              </div>
              {/* Amount */}
              {group.amount !== null && (
                <div style={{ fontSize: '28px', fontWeight: '900', color: group.color, lineHeight: 1 }}>₹{group.amount.toLocaleString()}</div>
              )}
              {/* Sub Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: group.amount !== null ? '0' : '4px' }}>
                {group.sub.map((s, j) => (
                  <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', fontWeight: '600', color: group.color, opacity: 0.85 }}>{s.label}</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: 'white' }}>{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <div style={{ ...styles.tableWrapper, display: activeReport === 'Day Summary' ? 'none' : 'block' }}>
        {activeReport === 'Daily Reports' && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={{ ...styles.th, width: '30px' }}>#</th>
                <th style={{ ...styles.th, width: '70px' }}>Date</th>
                <th style={styles.th}>Svc</th>
                <th style={styles.th}>Prd</th>
                <th style={styles.th}>Pkg</th>
                <th style={styles.th}>Mem</th>
               
                <th style={styles.th}>Pend</th>
                <th style={styles.th}>Adv</th>
                <th style={styles.th}>Disc</th>
                <th style={styles.th}>Net</th>
                <th style={styles.th}>Tax</th>
                <th style={styles.th}>Total</th>
                <th style={styles.th}>Cash</th>
                <th style={styles.th}>Online</th>
                <th style={styles.th}>Wlt</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_REPORT_DATA.map((row, i) => (
                <tr key={i}>
                  <td style={styles.td}>{row.id}</td>
                  <td style={styles.td}>{row.date}</td>
                  <td style={styles.td}>₹{row.serviceAmt.toFixed(2)}</td>
                  <td style={styles.td}>₹{row.productAmt.toFixed(2)}</td>
                  <td style={styles.td}>₹{row.packageAmt.toFixed(2)}</td>
                  <td style={styles.td}>₹{row.membershipAmt.toFixed(2)}</td>
                 
                  <td style={styles.td}>₹{row.pendingReceived.toFixed(2)}</td>
                  <td style={styles.td}>₹{row.appointmentAdvance.toFixed(2)}</td>
                  <td style={styles.td}>₹{row.discount.toFixed(2)}</td>
                  <td style={styles.td}>₹{row.netSale.toFixed(2)}</td>
                  <td style={styles.td}>{row.tax.toFixed(0)}</td>
                  <td style={styles.td}>₹{row.grandSale.toFixed(2)}</td>
                  <td style={styles.td}>₹{row.cash.toFixed(2)}</td>
                  <td style={styles.td}>₹{row.online.toFixed(2)}</td>
                  <td style={styles.td}>₹{row.wallet.toFixed(2)}</td>
                </tr>
              ))}
              <tr style={{ background: 'rgba(255,255,255,0.05)', fontWeight: '900' }}>
                <td style={styles.td} colSpan={2}>Total</td>
                <td style={styles.td}>₹4500.00</td>
                <td style={styles.td}>₹1200.00</td>
                <td style={styles.td}>₹0.00</td>
                <td style={styles.td}>₹2000.00</td>
                
                <td style={styles.td}>₹0.00</td>
                <td style={styles.td}>₹300.00</td>
                <td style={styles.td}>₹100.00</td>
                <td style={styles.td}>₹7900.00</td>
                <td style={styles.td}>₹450.00</td>
                <td style={styles.td}>₹8350.00</td>
                <td style={styles.td}>₹5000.00</td>
                <td style={styles.td}>₹0.00</td>
                <td style={styles.td}>₹0.00</td>
              </tr>
            </tbody>
          </table>
        )}

        {activeReport === 'Billing Reports' && (
          <table style={{ ...styles.table, minWidth: '1400px' }}>
            <thead>
              <tr>
                <th style={styles.th}>Date of Bill</th>
                <th style={styles.th}>Bill type</th>
                <th style={styles.th}>Invoice id</th>
                <th style={styles.th}>Client</th>
                <th style={styles.th}>Contact</th>
                <th style={styles.th}>Total</th>
                <th style={styles.th}>Paid</th>
                <th style={styles.th}>Payment detail</th>
                <th style={styles.th}>Pending</th>
                <th style={styles.th}>Type</th>
                <th style={styles.th}>Products/Services - Service Provider</th>
                <th style={styles.th}>Remarks</th>
                <th style={styles.th}>User</th>
                <th style={styles.th}>Manage</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_BILLING_REPORTS.map((row, i) => (
                <tr key={i}>
                  <td style={styles.td}>{row.date}</td>
                  <td style={styles.td}>{row.billType}</td>
                  <td style={{ ...styles.td, color: 'var(--primary)', fontWeight: '700' }}>{row.invoiceId}</td>
                  <td style={styles.td}>{row.client}</td>
                  <td style={styles.td}>{row.contact}</td>
                  <td style={styles.td}>₹{row.total.toFixed(2)}</td>
                  <td style={styles.td}>₹{row.paid.toFixed(2)}</td>
                  <td style={styles.td}>{row.detail}</td>
                  <td style={styles.td}>₹{row.pending.toFixed(2)}</td>
                  <td style={styles.td}>{row.type}</td>
                  <td style={styles.td}>{row.products}</td>
                  <td style={styles.td}>{row.remarks}</td>
                  <td style={styles.td}>{row.user}</td>
                  <td style={styles.td}>
                    <button style={{ background: 'var(--primary-glow)', border: '1px solid var(--primary)', color: 'white', padding: '4px 10px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeReport === 'Enquiry Reports' && (
          <table style={{ ...styles.table, minWidth: '100%' }}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Phone</th>
                <th style={styles.th}>Date to follow</th>
                <th style={styles.th}>Lead type</th>
                <th style={styles.th}>Enquiry for</th>
                <th style={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ENQUIRY_REPORTS.map((row, i) => (
                <tr key={i}>
                  <td style={styles.td}>{row.name}</td>
                  <td style={styles.td}>{row.email}</td>
                  <td style={styles.td}>{row.phone}</td>
                  <td style={styles.td}>{row.date}</td>
                  <td style={styles.td}>{row.type}</td>
                  <td style={styles.td}>{row.enquiryFor}</td>
                  <td style={styles.td}><span style={{ color: '#fbbf24' }}>{row.action}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeReport === 'Service Provider Reports' && (
          <table style={{ ...styles.table, minWidth: '100%' }}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Service provider</th>
                <th style={styles.th}>Contact</th>
                <th style={styles.th}>Service/Product/Package/Membership</th>
                <th style={styles.th}>Price</th>
                <th style={styles.th}>Commission</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PROVIDER_REPORTS.map((row, i) => (
                <tr key={i}>
                  <td style={styles.td}>{row.date}</td>
                  <td style={styles.td}>{row.provider}</td>
                  <td style={styles.td}>{row.contact}</td>
                  <td style={styles.td}>{row.service}</td>
                  <td style={styles.td}>₹{row.price.toFixed(2)}</td>
                  <td style={{ ...styles.td, color: '#10b981', fontWeight: '700' }}>₹{row.commission.toFixed(2)}</td>
                </tr>
              ))}
              <tr style={{ background: 'rgba(255,255,255,0.05)', fontWeight: '900' }}>
                <td style={styles.td} colSpan={4} textAlign="right">Total</td>
                <td style={styles.td}>₹450.00</td>
                <td style={{ ...styles.td, color: '#10b981' }}>₹45.00</td>
              </tr>
            </tbody>
          </table>
        )}

        {activeReport === 'Balance Reports' && (
          <table style={{ ...styles.table, minWidth: '100%' }}>
            <thead>
              <tr>
                <th style={styles.th}>S.No</th>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Opening Balance</th>
                <th style={styles.th}>Credit</th>
                <th style={styles.th}>Debit</th>
                <th style={styles.th}>Closing Balance</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_BALANCE_DATA.map((row, i) => (
                <tr key={i}>
                  <td style={styles.td}>{row.id}</td>
                  <td style={styles.td}>{row.date}</td>
                  <td style={styles.td}>{row.desc}</td>
                  <td style={styles.td}>₹{row.opening.toFixed(2)}</td>
                  <td style={{ ...styles.td, color: '#10b981' }}>₹{row.credit.toFixed(2)}</td>
                  <td style={{ ...styles.td, color: '#ef4444' }}>₹{row.debit.toFixed(2)}</td>
                  <td style={{ ...styles.td, fontWeight: '700' }}>₹{row.closing.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {activeReport === 'Attendance Report' && (
          <div style={{ padding: '20px' }}>
            <div style={{ 
              display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', 
              background: 'rgba(255,255,255,0.03)', padding: '12px', 
              borderRadius: '8px', border: '1px solid var(--glass-border)',
              marginBottom: '16px', fontSize: '13px'
            }}>
              <div><strong>Enroll Id:</strong> {MOCK_ATTENDANCE.enrollId}</div>
              <div><strong>Employee Name:</strong> {MOCK_ATTENDANCE.name}</div>
              <div><strong>Ref Id:</strong> {MOCK_ATTENDANCE.refId}</div>
            </div>
            <h3 style={{ textAlign: 'center', margin: '20px 0', fontSize: '16px' }}>Monthly Attendance Summery For Month {MOCK_ATTENDANCE.month}/{MOCK_ATTENDANCE.year}</h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px', textAlign: 'center' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
                    <th style={{ ...styles.th, border: '1px solid var(--glass-border)', padding: '8px' }}>Day</th>
                    {MOCK_ATTENDANCE.days.map(d => <th key={d.day} style={{ border: '1px solid var(--glass-border)', padding: '4px' }}>{d.day}</th>)}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ ...styles.td, border: '1px solid var(--glass-border)', fontWeight: 'bold' }}>In</td>
                    {MOCK_ATTENDANCE.days.map(d => <td key={d.day} style={{ border: '1px solid var(--glass-border)', padding: '4px' }}>{d.in}</td>)}
                  </tr>
                  <tr>
                    <td style={{ ...styles.td, border: '1px solid var(--glass-border)', fontWeight: 'bold' }}>Out</td>
                    {MOCK_ATTENDANCE.days.map(d => <td key={d.day} style={{ border: '1px solid var(--glass-border)', padding: '4px' }}>{d.out}</td>)}
                  </tr>
                  <tr>
                    <td style={{ ...styles.td, border: '1px solid var(--glass-border)', fontWeight: 'bold' }}>Total Hrs</td>
                    {MOCK_ATTENDANCE.days.map(d => <td key={d.day} style={{ border: '1px solid var(--glass-border)', padding: '4px' }}>{d.hrs}</td>)}
                  </tr>
                  <tr>
                    <td style={{ ...styles.td, border: '1px solid var(--glass-border)', fontWeight: 'bold' }}>Status</td>
                    {MOCK_ATTENDANCE.days.map(d => (
                      <td key={d.day} style={{ 
                        border: '1px solid var(--glass-border)', padding: '4px',
                        color: d.status === 'P' ? '#10b981' : (d.status === 'W' ? '#fbbf24' : '#ef4444'),
                        fontWeight: 'bold'
                      }}>
                        {d.status}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeReport === 'Received Pending Payments' && (
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Date</th>
                <th style={styles.th}>Client</th>
                <th style={styles.th}>Invoice</th>
                <th style={styles.th}>Total Amount</th>
                <th style={styles.th}>Pending Amount</th>
                <th style={styles.th}>Status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PENDING_PAYMENTS.map((row, i) => (
                <tr key={i}>
                  <td style={styles.td}>{row.date}</td>
                  <td style={styles.td}>{row.client}</td>
                  <td style={styles.td}>{row.invoice}</td>
                  <td style={styles.td}>₹{row.amount}</td>
                  <td style={{ ...styles.td, color: '#ef4444', fontWeight: '700' }}>₹{row.pending}</td>
                  <td style={styles.td}><span style={{ color: '#fbbf24' }}>{row.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}


      </div>

    </div>
  );
};

export default Reports;
