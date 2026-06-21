import React, { useState, useEffect } from 'react';
import { 
  Search, PackagePlus, AlertTriangle, ArrowDown, ArrowUp, 
  Filter, Download, RefreshCcw, Box, IndianRupee, Activity, Edit2, Trash2, Check, X
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { posService } from '../../services/posService';

const SEG_CARDS = [
  { label: 'Total Items', value: '124', sub: 'In catalog', color: '#818cf8', bg: 'rgba(129,140,248,0.08)', icon: Box },
  { label: 'Low Stock Alert', value: '8', sub: 'Needs reorder', color: '#f87171', bg: 'rgba(248,113,113,0.08)', icon: AlertTriangle },
  { label: 'Stock Value', value: '₹84,500', sub: 'Current valuation', color: '#34d399', bg: 'rgba(52,211,153,0.08)', icon: IndianRupee },
  { label: 'Consumption MTD', value: '₹12,400', sub: 'This month', color: '#fbbf24', bg: 'rgba(251,191,36,0.08)', icon: Activity },
];

const MOCK_INVENTORY_TRANS = [
  { date: '25-03-2026 11:20 AM', product: 'Loreal Shampoo', type: 'Usage', qty: '50 ml', reason: 'Service: Global Hair Color', user: 'Fathima' },
  { date: '25-03-2026 10:00 AM', product: 'Hair Serum', type: 'Stock Add', qty: '500 ml', reason: 'Restock Purchase', user: 'Admin' },
  { date: '24-03-2026 04:30 PM', product: 'D-Tan Cream', type: 'Usage', qty: '30 g', reason: 'Service: D-Tan Pack', user: 'Priya' },
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
  ...inputBase,
  paddingRight: '32px',
  background: '#1e293b',
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

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [filters, setFilters] = useState({
    search: '', category: 'All', status: 'All'
  });
  const [transactions, setTransactions] = useState([]);
  const [activeTab, setActiveTab] = useState('Stock List');
  const [showAddStock, setShowAddStock] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  useEffect(() => {
    posService.init().then(data => {
      // Filter out services and wallets for the inventory view
      const stockItems = data.catalog.filter(i => i.type === 'product');
      setInventory(stockItems);
    }).catch(err => console.error("Failed to load inventory:", err));

    posService.getInventoryTransactions().then(setTransactions)
      .catch(err => console.error("Failed to load transactions:", err));
  }, []);

  const upd = (k, v) => setFilters(f => ({ ...f, [k]: v }));

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditName(item.name);
  };

  const saveEdit = (id) => {
    if (editName.trim()) {
      const updated = updateItem(id, { name: editName.trim() });
      setInventory(updated);
    }
    setEditingId(null);
    setEditName('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  const filteredInventory = inventory.filter(item => {
    if (item.type === 'service' || item.type === 'wallet') return false;

    const term = filters.search.toLowerCase();
    const matchSearch = item.name.toLowerCase().includes(term) || `inv-${item.id}`.includes(term);
    const matchCat = filters.category === 'All' || item.category === filters.category;
    const isLowStock = item.stock <= item.reorder;
    const matchStatus = filters.status === 'All' || 
                        (filters.status === 'Low Stock' && isLowStock) || 
                        (filters.status === 'In Stock' && !isLowStock);
    return matchSearch && matchCat && matchStatus;
  });

  return (
    <div style={{ padding: '28px', background: 'var(--background)', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* ── Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>Inventory Management</h1>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>Track retail stock and raw material consumption.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button variant="secondary"><Download size={15}/> Export</Button>
          <Button onClick={() => setShowAddStock(true)}><PackagePlus size={15} /> Add Stock</Button>
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

      {/* ── Tabs ── */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '4px' }}>
        {['Stock List', 'Inventory Transactions'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 16px', borderRadius: '8px 8px 0 0', border: 'none',
              background: activeTab === tab ? 'rgba(99,102,241,0.1)' : 'transparent',
              color: activeTab === tab ? 'var(--primary)' : 'var(--text-muted)',
              fontSize: '13px', fontWeight: '700', cursor: 'pointer',
              borderBottom: activeTab === tab ? '2px solid var(--primary)' : '2px solid transparent',
              transition: 'all 0.2s'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Stock List' ? (
        <>
          {/* ── Filter Panel ── */}
          <div style={{ borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            <div style={{
              padding: '14px 20px', background: 'rgba(255,255,255,0.03)',
              borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              <Filter size={14} color="var(--primary)" />
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'white' }}>Search & Filter</span>
            </div>

            <div style={{ padding: '20px 20px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '16px' }}>
              <div>
                <label style={labelBase}>Search Product / ID</label>
                <div style={{ position: 'relative' }}>
                  <input style={{ ...inputBase, paddingLeft: '34px' }} value={filters.search} onChange={e => upd('search', e.target.value)} placeholder="Search..." />
                  <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                </div>
              </div>
              <div>
                <label style={labelBase}>Category</label>
                <select style={selectBase} value={filters.category} onChange={e => upd('category', e.target.value)}>
                  <option value="All" style={OPT}>All Categories</option>
                  <option value="Retail" style={OPT}>Retail</option>
                  <option value="Raw Material" style={OPT}>Raw Material</option>
                </select>
              </div>
              <div>
                <label style={labelBase}>Status</label>
                <select style={selectBase} value={filters.status} onChange={e => upd('status', e.target.value)}>
                  <option value="All" style={OPT}>All Status</option>
                  <option value="In Stock" style={OPT}>In Stock</option>
                  <option value="Low Stock" style={OPT}>Low Stock</option>
                </select>
              </div>
            </div>
          </div>

          {/* ── Table ── */}
          <div style={{ borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                  {['', 'Product ID', 'Product Name', 'Category', 'Stock Available', 'Reorder Level', 'Price', 'GST %', 'Status', 'Action'].map((h, i) => (
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
                {filteredInventory.map((item, idx) => {
                  const isLowStock = item.stock <= item.reorder;
                  const formattedId = `INV-${item.id.toString().padStart(3, '0')}`;
                  const isEditing = editingId === item.id;
                  return (
                    <tr key={item.id} style={{ background: idx % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.016)', transition: 'background 0.15s' }}>
                      <td style={{ padding: '12px' }}><input type="checkbox" /></td>
                      <td style={{ padding: '12px', fontSize: '12px', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{formattedId}</td>
                      <td style={{ padding: '12px' }}>
                        {isEditing ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <input
                              autoFocus
                              value={editName}
                              onChange={e => setEditName(e.target.value)}
                              style={{ ...inputBase, width: '180px', padding: '5px 8px', fontSize: '13px', border: '1px solid var(--primary)', background: 'rgba(99,102,241,0.1)' }}
                            />
                            <button onClick={() => saveEdit(item.id)} style={{ padding: '4px', borderRadius: '4px', border: 'none', background: 'rgba(16,185,129,0.2)', color: '#34d399', cursor: 'pointer' }}><Check size={14} /></button>
                            <button onClick={cancelEdit} style={{ padding: '4px', borderRadius: '4px', border: 'none', background: 'rgba(239,68,68,0.12)', color: '#f87171', cursor: 'pointer' }}><X size={14} /></button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ fontSize: '13px', fontWeight: '700', color: 'white' }}>{item.name}</span>
                            <button onClick={() => startEdit(item)} style={{ padding: '3px', borderRadius: '4px', border: 'none', background: 'rgba(99,102,241,0.12)', color: 'var(--primary)', cursor: 'pointer', opacity: 0.7 }}><Edit2 size={11} /></button>
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '12px' }}><span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '20px', background: 'rgba(255,255,255,0.05)', color: '#e2e8f0', fontWeight: '600' }}>{item.category}</span></td>
                      <td style={{ padding: '12px' }}><span style={{ fontSize: '13px', fontWeight: '800', color: isLowStock ? '#f87171' : '#e2e8f0' }}>{item.availability_display}</span></td>
                      <td style={{ padding: '12px' }}><span style={{ fontSize: '13px', fontWeight: '600', color: '#94a3b8' }}>{formatVolume(item.reorder, item.unit)}</span></td>
                      <td style={{ padding: '12px', fontSize: '13px', fontWeight: '700', color: '#34d399' }}>₹{item.price}</td>
                      <td style={{ padding: '12px', fontSize: '13px', fontWeight: '700', color: 'var(--text-muted)' }}>{item.gst ? `${item.gst}%` : '-'}</td>
                      <td style={{ padding: '12px' }}>
                        <span style={{ fontSize: '10px', padding: '4px 8px', borderRadius: '4px', background: isLowStock ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)', color: isLowStock ? '#f87171' : '#34d399', fontWeight: '800', border: isLowStock ? '1px solid rgba(239, 68, 68, 0.2)' : '1px solid rgba(16, 185, 129, 0.2)' }}>{isLowStock ? 'LOW STOCK' : 'IN STOCK'}</span>
                      </td>
                      <td style={{ padding: '12px' }}>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <button onClick={() => startEdit(item)} style={{ padding: '6px', borderRadius: '6px', border: 'none', background: 'rgba(59,130,246,0.15)', color: '#60a5fa', cursor: 'pointer' }}><Edit2 size={13}/></button>
                          <button style={{ padding: '6px', borderRadius: '6px', border: 'none', background: 'rgba(239,68,68,0.12)', color: '#f87171', cursor: 'pointer' }}><Trash2 size={13}/></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        /* ── Transactions Table ── */
        <div style={{ borderRadius: '14px', border: '1px solid rgba(255,255,255,0.08)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.04)' }}>
                {['Date & Time', 'Product', 'Type', 'Quantity', 'Reason / Details', 'User'].map((h, i) => (
                  <th key={i} style={{
                    padding: '11px 12px', textAlign: 'left',
                    fontSize: '10px', fontWeight: '800', textTransform: 'uppercase',
                    letterSpacing: '0.06em', color: 'var(--text-muted)',
                    borderBottom: '1px solid rgba(255,255,255,0.08)',
                    whiteSpace: 'nowrap'
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {transactions.map((row, i) => (
                <tr key={i} style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.016)' }}>
                  <td style={{ padding: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>{row.date}</td>
                  <td style={{ padding: '12px', fontSize: '13px', fontWeight: '700', color: 'white' }}>{row.product}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: '800',
                      background: row.type === 'Usage' ? 'rgba(239,68,68,0.1)' : 'rgba(16,185,129,0.1)',
                      color: row.type === 'Usage' ? '#ef4444' : '#10b981'
                    }}>{row.type}</span>
                  </td>
                  <td style={{ padding: '12px', fontSize: '13px', fontWeight: '700', color: 'white' }}>{row.qty}</td>
                  <td style={{ padding: '12px', fontSize: '12px', color: '#94a3b8' }}>{row.reason}</td>
                  <td style={{ padding: '12px', fontSize: '12px', color: '#94a3b8' }}>{row.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Stock Modal */}
      {showAddStock && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ background: '#12121f', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px', width: '100%', maxWidth: '500px', padding: '32px', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7)' }}>
            <button onClick={() => setShowAddStock(false)} style={{ position: 'absolute', top: '24px', right: '24px', border: 'none', background: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={24}/></button>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px', color: 'white' }}>Add Stock</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '28px' }}>Record a new stock purchase or manual entry.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={labelBase}>Select Product</label>
                <select style={{ ...selectBase, background: '#1e293b', color: 'white', fontWeight: '700' }}>
                  <option style={OPT}>Loreal Shampoo 250ml</option>
                  <option style={OPT}>Hair Serum 100ml</option>
                  <option style={OPT}>D-Tan Cream 500g</option>
                  <option style={OPT}>Keratin Prep 1L</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
                <div>
                  <label style={labelBase}>Quantity</label>
                  <input type="number" placeholder="0" style={{ ...inputBase, border: '1px solid rgba(255,255,255,0.15)', fontWeight: '700' }} />
                </div>
                <div>
                  <label style={labelBase}>Unit</label>
                  <select style={{ ...selectBase, background: '#1e293b', border: '1px solid rgba(255,255,255,0.15)', color: 'white', fontWeight: '700' }}>
                    <option style={OPT}>ml</option>
                    <option style={OPT}>L</option>
                    <option style={OPT}>g</option>
                    <option style={OPT}>kg</option>
                    <option style={OPT}>Pcs</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={labelBase}>Purchase Date</label>
                <input type="date" defaultValue="2026-03-25" style={{ ...inputBase, border: '1px solid rgba(255,255,255,0.15)', colorScheme: 'dark' }} />
              </div>
              <div>
                <label style={labelBase}>Remarks / Bill No.</label>
                <textarea placeholder="e.g. Monthly restock - Bill #9921" rows="2" style={{ ...inputBase, resize: 'none' }} />
              </div>
              <Button variant="primary" style={{ height: '52px', fontSize: '16px', fontWeight: '800' }} onClick={() => setShowAddStock(false)}>Save Stock Entry</Button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Inventory;
