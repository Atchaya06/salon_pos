import React, { useState, useMemo, useEffect, useRef } from 'react';
import {
  Search, ShoppingCart, Trash2, Plus, Minus, User, Tag,
  CreditCard, ScanLine, Zap, Keyboard, Scissors, Sparkles,
  Package, Gift, ChevronDown, ReceiptText, Phone, UserCheck,
  Banknote, X, Check, Percent, RotateCcw, Star, Clock,
  Printer, Share2, BadgeIndianRupee, Wallet, QrCode, Edit
} from 'lucide-react';
import CheckoutModal from './CheckoutModal';
import { posService } from '../../services/posService';

// Removed static STAFF_LIST

const ICON_MAP = {
  Scissors, Sparkles, Package, Gift, Star
};

const inputBase = {
  width: '100%',
  padding: '10px 14px',
  background: 'rgba(15, 23, 42, 0.6)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '10px',
  color: 'white',
  fontSize: '13px',
  outline: 'none',
  transition: 'all 0.2s',
};

const selectBase = {
  ...inputBase,
  paddingRight: '40px',
  appearance: 'none',
  WebkitAppearance: 'none',
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 12px center',
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

const CATEGORY_ICONS = {
  All:        Star,
  Hair:       Scissors,
  Skin:       Sparkles,
  Retail:     Package,
  Membership: Gift,
};

const TYPE_COLORS = {
  service:    { bg: 'rgba(139,92,246,0.15)', text: '#a78bfa', label: 'Service' },
  product:    { bg: 'rgba(59,130,246,0.15)', text: '#60a5fa', label: 'Product' },
  wallet:     { bg: 'rgba(245,158,11,0.15)', text: '#fbbf24', label: 'Membership' },
};

const UsageVolumeModal = ({ isOpen, onClose, item, onConfirm }) => {
  const [usedVolume, setUsedVolume] = useState('');

  // Volume resolution priority:
  //  1. API base_volume + base_unit (set by saving hook / backfill command)
  //  2. Parse item.unit string  e.g. "250ml"
  //  3. Parse product NAME      e.g. "K9 Conditioner 300ML" or "Shampoo (250 ML)"
  //  4. Fallback 1 pcs
  const unitInfo = useMemo(() => {
    const VOL_RE = /(\d+(?:\.\d+)?)\s*(ml|l|ltr|litre|g|kg|oz|gm)\b/i;

    // 1. Prefer authoritative DB fields (only if base_unit is a real unit, not null/numeric-1)
    if (item?.base_unit && parseFloat(item.base_volume) > 1) {
      return { volume: parseFloat(item.base_volume), unit: item.base_unit };
    }

    // 2. Parse item.unit  e.g. "250ml" or "300 ML"
    if (item?.unit) {
      const m = String(item.unit).match(VOL_RE);
      if (m) return { volume: parseFloat(m[1]), unit: m[2].toLowerCase() };
    }

    // 3. Parse product name as last resort  e.g. "K9 BOTOPLEX 300ML" or "(250 ML)"
    if (item?.name) {
      const m = String(item.name).match(VOL_RE);
      if (m) return { volume: parseFloat(m[1]), unit: m[2].toLowerCase() };
    }

    // 4. Non-volume unit (e.g. "pcs") or nothing set
    return { volume: 1, unit: item?.unit || 'pcs' };
  }, [item]);

  useEffect(() => {
    if (isOpen) setUsedVolume(unitInfo.volume);
  }, [isOpen, unitInfo]);

  if (!isOpen) return null;

  const usedNum = parseFloat(usedVolume) || 0;
  const fraction = unitInfo.volume > 0 ? usedNum / unitInfo.volume : 0;
  const calculatedPrice = fraction * item.price;
  const isInvalid = usedNum <= 0 || usedNum > unitInfo.volume;

  return (
    <div style={{ position:'fixed', inset:0, zIndex:2000, background:'rgba(0,0,0,0.8)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center' }}>
      <div style={{ width:'400px', background:'var(--card-bg)', border:'1px solid var(--glass-border)', borderRadius:'16px', padding:'24px', display:'flex', flexDirection:'column', gap:'20px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <h3 style={{ margin:0, fontSize:'18px', fontWeight:'800' }}>Confirm Usage</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer' }}><X size={20}/></button>
        </div>

        <div>
          <div style={{ fontSize:'14px', fontWeight:'700', marginBottom:'4px' }}>{item.name}</div>
          <div style={{ fontSize:'12px', color:'var(--text-muted)' }}>Base Volume: {unitInfo.volume} {unitInfo.unit} | Full Price: ₹{item.price}</div>
        </div>

        <div>
          <label style={{ display:'block', fontSize:'11px', fontWeight:'600', color:'var(--text-muted)', marginBottom:'8px', textTransform:'uppercase' }}>Volume Used ({unitInfo.unit})</label>
          <div style={{ display:'flex', gap:'12px', alignItems:'center' }}>
            <input
              type="number"
              autoFocus
              min={0}
              max={unitInfo.volume}
              step="any"
              style={{ flex:1, padding:'12px', background:'rgba(15,23,42,0.6)', border:`1px solid ${isInvalid && usedNum > 0 ? '#ef4444' : 'var(--glass-border)'}`, borderRadius:'10px', color:'white', fontSize:'16px' }}
              value={usedVolume}
              onChange={e => setUsedVolume(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !isInvalid && onConfirm(usedNum, unitInfo.volume, unitInfo.unit)}
            />
            <span style={{ fontSize:'14px', fontWeight:'600', color:'var(--primary)' }}>/ {unitInfo.volume} {unitInfo.unit}</span>
          </div>
          {usedNum > unitInfo.volume && (
            <div style={{ fontSize:'11px', color:'#f87171', marginTop:'4px' }}>⚠ Cannot exceed full volume ({unitInfo.volume} {unitInfo.unit})</div>
          )}
        </div>

        <div style={{ background:'var(--primary-glow)', padding:'12px', borderRadius:'10px', border:'1px solid var(--primary)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontSize:'13px', fontWeight:'600' }}>Calculated Price:</span>
          <span style={{ fontSize:'18px', fontWeight:'900' }}>₹{calculatedPrice.toFixed(0)}</span>
        </div>

        <button
          onClick={() => !isInvalid && onConfirm(usedNum, unitInfo.volume, unitInfo.unit)}
          disabled={isInvalid}
          style={{ padding:'12px', borderRadius:'10px', background: isInvalid ? '#334155' : 'var(--primary)', color:'white', border:'none', fontWeight:'700', cursor: isInvalid ? 'not-allowed' : 'pointer', opacity: isInvalid ? 0.6 : 1 }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};



export default function POS() {
  const createNewBill = (id = Date.now()) => ({
    id: id,
    invoiceNumber: 'INV-' + Math.floor(Math.random() * 90000 + 10000),
    cart: [],
    customer: null,
    customerSearch: '',
    discount: 0,
    discountType: 'flat',
    advanceReceived: 0,
    amountPaid: 0,
    paymentMode: 'Cash',
    billType: 'GST',
    gstType: 'local'
  });

  const [items, setItems]                 = useState([]);
  const [categories, setCategories]       = useState(['All']);
  const [staffList, setStaffList]         = useState([]);
  const [activeTab, setActiveTab]         = useState('Billing');
  const [addItemOpen, setAddItemOpen]     = useState(false);
  const [addItemSearch, setAddItemSearch] = useState('');
  const [addItemCategory, setAddItemCategory] = useState('All');
  
  const [bills, setBills] = useState(() => {
    const saved = localStorage.getItem('pos_bills');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error('Failed to parse saved bills', e);
      }
    }
    return [createNewBill(Date.now()), createNewBill(Date.now() + 1)];
  });
  
  const [activeBillIndex, setActiveBillIndex] = useState(() => {
    const saved = localStorage.getItem('pos_active_bill_index');
    return saved ? parseInt(saved, 10) : 0;
  });

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('pos_bills', JSON.stringify(bills));
  }, [bills]);

  useEffect(() => {
    localStorage.setItem('pos_active_bill_index', activeBillIndex.toString());
  }, [activeBillIndex]);

  
  // Use fallback to avoid crash if index is briefly out of sync
  const activeBill = bills[activeBillIndex] || bills[0] || createNewBill(0);

  const updateActiveBill = (updates) => {
    setBills(prev => prev.map((bill, i) => 
      i === activeBillIndex ? { ...bill, ...updates } : bill
    ));
  };

  const addNewBill = () => {
    const nextId = bills.length > 0 ? Math.max(...bills.map(b => typeof b.id === 'number' ? b.id : 0)) + 1 : 1;
    const nb = createNewBill(nextId);
    setBills([...bills, nb]);
    setActiveBillIndex(bills.length);
  };

  const closeBill = (e, index) => {
    if (e) e.stopPropagation();
    if (bills.length === 1) {
      setBills([createNewBill(Date.now())]);
      setActiveBillIndex(0);
      return;
    }
    const newBills = bills.filter((_, i) => i !== index);
    setBills(newBills);
    if (activeBillIndex >= index) {
      setActiveBillIndex(Math.max(0, activeBillIndex - 1));
    }
  };

  const [search, setSearch]               = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    posService.init().then(data => {
      const normalizedCatalog = data.catalog.map(item => ({
        ...item,
        type: item.type.toLowerCase(),
        stock: item.stock_available
      }));
      setItems(normalizedCatalog);
      setCategories(data.categories);
      setStaffList(data.staff);
      updateActiveBill({
        invoiceNumber: 'INV-' + Math.floor(Math.random() * 90000 + 10000)
      });
    }).catch(err => console.error(err));
  }, []);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [searchResults, setSearchResults]     = useState([]);
  const [usageVolumeOverlay, setUsageVolumeOverlay] = useState({ isOpen: false, item: null });

  const [walletForm, setWalletForm] = useState({
    date: new Date().toISOString().split('T')[0],
    client_id: '',
    client_name: '',
    phone: '',
    amount_paid: 0,
    payment_mode: 'Cash',
    amount_to_credit: 0,
    description: '',
    send_receipt: false
  });

  const searchInputRef = useRef(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handle = (e) => {
      if (e.key === '/' || e.key === 'F2') {
        if (e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          searchInputRef.current?.focus();
        }
      }
      if (e.key === 'F8') { e.preventDefault(); if (activeBill.cart.length > 0) setIsCheckoutOpen(true); }
      if (e.key === 'Escape') { setIsCheckoutOpen(false); }
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [activeBill.cart]);

  // Shared utility to detect if a product is volume-based and what its capacity is
  const getProductVolume = (item) => {
    const VOL_RE = /(\d+(?:\.\d+)?)\s*(ml|l|ltr|litre|g|kg|oz|gm)\b/i;
    
    // 1. Authoritative DB field
    if (item?.base_unit && parseFloat(item.base_volume) > 1) {
      return { volume: parseFloat(item.base_volume), unit: item.base_unit };
    }
    // 2. Parse from name
    if (item?.name) {
      const m = String(item.name).match(VOL_RE);
      if (m) return { volume: parseFloat(m[1]), unit: m[2].toLowerCase() };
    }
    return null;
  };

  const addToCart = (item, confirmedVolume = null) => {
    const volInfo = getProductVolume(item);

    // 1. If it's a product, check its volume
    if (item.type === 'product' && volInfo && !confirmedVolume) {
      setUsageVolumeOverlay({ isOpen: true, item });
      return;
    }

    // 2. If it's a service, check if its "uses" product is volume-based
    if (item.type === 'service' && item.uses && !confirmedVolume) {
      const ingredient = items.find(m => m.id === item.uses.id);
      const ingVol = getProductVolume(ingredient);
      if (ingVol) {
        // Trigger modal for the SERVICE, but it will use the INGREDIENT's volume facts
        setUsageVolumeOverlay({ isOpen: true, item }); 
        return;
      }
    }

    // Check stock if it's a product
    if (item.type === 'product' || item.uses) {
      const productId = item.type === 'product' ? item.id : item.uses.id;
      const product = items.find(m => m.id === productId);
      const inCartTotal = activeBill.cart.reduce((acc, ci) => {
        if (ci.id === productId) return acc + ci.quantity;
        if (ci.uses && ci.uses.id === productId) return acc + ci.quantity * ci.uses.qty;
        return acc;
      }, 0);
      
      const needed = confirmedVolume ? (confirmedVolume.used / confirmedVolume.base) : (item.type === 'product' ? 1 : item.uses.qty);
      if (product.stock - inCartTotal < needed) {
        alert('Out of Stock!');
        return;
      }
    }

    const prevCart = activeBill.cart;
    // If confirmedVolume is provided, we treat it as a unique entry or we update existing?
    // Usually, fractional usage items might be unique per service.
    // For now, let's treat identical name+volume as same.
    const entryId = confirmedVolume ? `${item.id}-${confirmedVolume.used}` : item.id;
    const ex = prevCart.find(i => i.cartId === entryId);
    
    const qty = confirmedVolume ? (confirmedVolume.used / confirmedVolume.base) : 1;
    const price = confirmedVolume ? (confirmedVolume.used / confirmedVolume.base) * item.price : item.price;

    let newCart;
    if (ex) {
      const increment = qty;
      newCart = prevCart.map(i => i.cartId === entryId ? { 
        ...i, 
        quantity: Number((i.quantity + increment).toFixed(4)) 
      } : i);
    } else {
      newCart = [...prevCart, { 
        ...item, 
        cartId: entryId,
        quantity: qty, 
        usedVolume: confirmedVolume?.used,
        baseVolume: confirmedVolume?.base,
        unit: confirmedVolume?.unit,
        // For services, we must also update the nested used_products array
        used_products: item.uses ? [{
          id: item.uses.id,
          qty: confirmedVolume ? (confirmedVolume.used / confirmedVolume.base) : (item.uses.qty || 1),
          used_volume: confirmedVolume?.used,
          base_volume: confirmedVolume?.base,
          unit: confirmedVolume?.unit
        }] : [],
        price: price, // Per unit price for checkout backend
        displayPrice: price, // For UI
        staff: 'Anyone', 
        itemDiscount: 0, 
        gstRate: item.gst || 0 
      }];
    }
    
    updateActiveBill({ cart: newCart });

    if (confirmedVolume) setUsageVolumeOverlay({ isOpen: false, item: null });
  };

  const removeFromCart  = (id)         => updateActiveBill({ cart: activeBill.cart.filter(i => i.cartId !== id) });
  const updateQuantity  = (id, delta)  => {
    const item = activeBill.cart.find(i => i.cartId === id);
    if (!item) return;

    // Use the original usage fraction for incrementing (e.g. 100/250 = 0.4)
    const step = item.usedVolume ? (item.usedVolume / item.baseVolume) : 1;

    if (delta > 0) {
      if (item.type === 'product' || item.uses) {
        const productId = item.type === 'product' ? item.id : item.uses.id;
        const product = items.find(m => m.id === productId);
        const inCartTotal = activeBill.cart.reduce((acc, ci) => {
          if (ci.id === productId) return acc + ci.quantity;
          if (ci.uses && ci.uses.id === productId) return acc + ci.quantity * ci.uses.qty;
          return acc;
        }, 0);
        
        if (product.stock - inCartTotal < step) {
          alert('Out of Stock!');
          return;
        }
      }
    }

    const newCart = activeBill.cart.map(i => {
      if (i.cartId === id) {
        const newQty = Number((delta > 0 ? i.quantity + step : i.quantity - step).toFixed(4));
        if (newQty <= 0) return i; // Prevent reducing below current unit
        return { ...i, quantity: newQty };
      }
      return i;
    });
    updateActiveBill({ cart: newCart });
  };
  const updateStaff     = (id, staff)  => updateActiveBill({ cart: activeBill.cart.map(i => i.cartId === id ? { ...i, staff } : i) });
  const clearCart       = ()           => { updateActiveBill({ cart: [], discount: 0, customer: null, customerSearch: '' }); };

  const filteredItems = useMemo(() =>
    items.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (activeCategory === 'All' || item.category === activeCategory)
    ), [items, search, activeCategory]);

  const subtotal   = useMemo(() => activeBill.cart.reduce((a, i) => a + i.price * i.quantity, 0), [activeBill.cart]);
  
  const detailedTax = useMemo(() => {
    if (activeBill.billType === 'non-GST') return { total: 0, services: 0, products: 0, cgst: 0, sgst: 0, igst: 0 };
    
    let servicesTax = 0;
    let productsTax = 0;
    
    activeBill.cart.forEach(item => {
      const rate = item.gstRate || 0;
      const tax = (item.price * item.quantity * rate) / 100;
      if (item.type === 'product') productsTax += tax;
      else servicesTax += tax;
    });
    
    const total = servicesTax + productsTax;
    
    if (activeBill.gstType === 'local') {
      return { total, services: servicesTax, products: productsTax, cgst: total / 2, sgst: total / 2, igst: 0 };
    } else {
      return { total, services: servicesTax, products: productsTax, cgst: 0, sgst: 0, igst: total };
    }
  }, [bills, activeBillIndex, activeBill.cart, activeBill.billType, activeBill.gstType]);

  const taxAmount = detailedTax.total;
  const discountAmt = activeBill.discountType === 'percent'
    ? (subtotal * activeBill.discount) / 100
    : activeBill.discount;
  const total = subtotal + taxAmount - discountAmt;

  const handleCheckoutConfirm = async () => {
    try {
      const payload = {
        client_id: activeBill.customer?.id || null,
        client_name: activeBill.customer?.name || 'Walk-in',
        client_phone: activeBill.customer?.phone || '',
        bill_type: activeBill.billType,
        discount_type: 'Flat', // POS uses Flat by default
        discount_amount: activeBill.discount,
        advance_received: activeBill.advanceReceived,
        amount_paid: activeBill.amountPaid,
        payment_mode: activeBill.paymentMode,
        items: activeBill.cart.map(item => ({
          item_id: item.id,
          is_service: item.is_service_table,
          staff_id: item.staff === 'Anyone' ? null : item.staff,
          quantity: item.quantity,
          // Volume tracking for fractional product usage
          ...(item.usedVolume != null ? {
            used_volume: item.usedVolume,
            base_volume: item.baseVolume,
            unit: item.unit,
          } : {})
        }))
      };

      await posService.checkout(payload);
      
      // Refresh items to get updated stock
      const data = await posService.init();
      const normalizedCatalog = data.catalog.map(item => ({
        ...item,
        type: item.type.toLowerCase(),
        stock: item.stock_available
      }));
      setItems(normalizedCatalog);

      setIsCheckoutOpen(false);
      alert('Invoice generated successfully!');
      closeBill(null, activeBillIndex);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleAddWallet = async () => {
    try {
      if (!walletForm.client_id) return alert('Please select a client');
      await posService.reloadWallet(walletForm);
      alert('Wallet reloaded successfully!');
      
      // Refresh customer data if selected in POS too
      if (activeBill.customer && activeBill.customer.id === walletForm.client_id) {
        const clients = await posService.searchClients(activeBill.customer.phone);
        if (clients.length > 0) updateActiveBill({ customer: clients[0] });
      }
      
      setWalletForm({
        ...walletForm,
        amount_paid: 0,
        amount_to_credit: 0,
        description: ''
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleCustomerSearch = async (val) => {
    updateActiveBill({ customerSearch: val });
    if (val.length > 2) {
      const results = await posService.searchClients(val);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const selectCustomer = (c) => {
    updateActiveBill({ customer: c, customerSearch: '' });
    setSearchResults([]);
    // Also update wallet form if on that tab
    setWalletForm(prev => ({
      ...prev,
      client_id: c.id,
      client_name: c.name,
      phone: c.phone
    }));
  };

  // const categories = ['All', 'Hair', 'Skin', 'Retail', 'Membership']; // Removed redundant constant

  const renderWalletTab = () => (
    <div style={{ display: 'flex', flex: 1, padding: '24px', gap: '24px', overflowY: 'auto', background: 'var(--background)' }}>
      {/* Left: Form */}
      <div style={{ flex: 1, background: 'var(--card-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', height: 'fit-content' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>Add wallet amount</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={labelBase}>Date *</label>
            <input 
              style={inputBase} 
              type="date" 
              value={walletForm.date} 
              onChange={e => setWalletForm({...walletForm, date: e.target.value})}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <label style={labelBase}>Client name *</label>
            <input 
              style={inputBase} 
              placeholder="Search or Enter Client Name" 
              value={walletForm.client_name}
              onChange={e => {
                setWalletForm({...walletForm, client_name: e.target.value});
                handleCustomerSearch(e.target.value);
              }}
            />
            {searchResults.length > 0 && (
              <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#1e293b', border: '1px solid var(--glass-border)', borderRadius: '8px', zIndex: 100, marginTop: '4px', maxHeight: '150px', overflowY: 'auto' }}>
                {searchResults.map(c => (
                  <div key={c.id} onClick={() => selectCustomer(c)} style={{ padding: '8px 10px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '12px' }}>
                    {c.name} ({c.phone})
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <label style={labelBase}>Contact number *</label>
            <input 
              style={inputBase} 
              placeholder="Contact" 
              value={walletForm.phone}
              onChange={e => setWalletForm({...walletForm, phone: e.target.value})}
            />
          </div>
          <div>
            <label style={labelBase}>Amount paid *</label>
            <input 
              type="number" 
              style={inputBase} 
              placeholder="0.00" 
              value={walletForm.amount_paid}
              onChange={e => setWalletForm({...walletForm, amount_paid: Number(e.target.value)})}
            />
          </div>
          <div>
            <label style={labelBase}>Payment mode *</label>
            <select 
              style={selectBase} 
              value={walletForm.payment_mode}
              onChange={e => setWalletForm({...walletForm, payment_mode: e.target.value})}
            >
              <option style={OPT} value="Cash">Cash</option>
              <option style={OPT} value="Card">Card</option>
              <option style={OPT} value="UPI">UPI</option>
            </select>
          </div>
          <div>
            <label style={labelBase}>Amount to be credit *</label>
            <input 
              type="number" 
              style={inputBase} 
              placeholder="0.00" 
              value={walletForm.amount_to_credit}
              onChange={e => setWalletForm({...walletForm, amount_to_credit: Number(e.target.value)})}
            />
          </div>
        </div>
        <div>
          <label style={labelBase}>Description</label>
          <textarea 
            style={{ ...inputBase, minHeight: '80px', resize: 'vertical' }} 
            placeholder="Description"
            value={walletForm.description}
            onChange={e => setWalletForm({...walletForm, description: e.target.value})}
          ></textarea>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input 
            type="checkbox" 
            id="send_receipt" 
            style={{ accentColor: 'var(--primary)' }} 
            checked={walletForm.send_receipt}
            onChange={e => setWalletForm({...walletForm, send_receipt: e.target.checked})}
          />
          <label htmlFor="send_receipt" style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Send the deposit receipt to customer?</label>
        </div>
        <button 
          onClick={handleAddWallet}
          style={{ padding: '12px 24px', borderRadius: '8px', background: 'var(--primary)', color: 'white', border: 'none', fontWeight: '700', fontSize: '14px', cursor: 'pointer', alignSelf: 'flex-start' }}
        >
          Add wallet
        </button>
      </div>

      {/* Right: Client 360 */}
      <div style={{ width: '420px', background: 'var(--card-bg)', border: '1px solid var(--glass-border)', borderRadius: '12px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', height: 'fit-content' }}>
        <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>Client 360° view</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', rowGap: '12px', fontSize: '13px' }}>
          <div style={{ color: 'var(--text-muted)' }}>Branch:</div><div style={{ fontWeight: '600', textAlign: 'right' }}>Main</div>
          <div style={{ color: 'var(--text-muted)' }}>Last visit on:</div><div style={{ fontWeight: '600', textAlign: 'right' }}>{activeBill.customer?.last_visit || '----'}</div>
          <div style={{ color: 'var(--text-muted)' }}>Total visits:</div><div style={{ fontWeight: '600', textAlign: 'right' }}>{activeBill.customer?.total_visits || 0}</div>
          <div style={{ color: 'var(--text-muted)' }}>Total spendings:</div><div style={{ fontWeight: '600', textAlign: 'right' }}>₹{(activeBill.customer?.total_spent || 0).toLocaleString()}</div>
          <div style={{ color: 'var(--text-muted)' }}>Membership:</div><div style={{ fontWeight: '600', textAlign: 'right' }}>{activeBill.customer?.membership || '----'}</div>
          <div style={{ color: 'var(--text-muted)' }}>Active packages:</div><div style={{ fontWeight: '600', textAlign: 'right' }}>{activeBill.customer?.active_packages || '----'}</div>
          <div style={{ color: 'var(--text-muted)' }}>Last feedback:</div><div style={{ fontWeight: '600', textAlign: 'right' }}>{activeBill.customer?.last_feedback || '----'}</div>
          <div style={{ color: 'var(--text-muted)' }}>My wallet:</div><div style={{ fontWeight: '600', textAlign: 'right', color: '#4ade80' }}>₹{(Number(activeBill.customer?.wallet_balance) || 0).toLocaleString()}</div>
          <div style={{ color: 'var(--text-muted)' }}>Reward points:</div><div style={{ fontWeight: '600', textAlign: 'right', color: '#a78bfa' }}>{activeBill.customer?.reward_points || 0}</div>
        </div>

        <div style={{ height: '1px', background: 'var(--glass-border)', margin: '4px 0' }} />

        <div style={{ display: 'grid', gap: '16px' }}>
          <div>
            <label style={labelBase}>Gender</label>
            <select style={selectBase} value={activeBill.customer?.gender || ''} disabled>
              <option style={OPT} value="">--Select--</option>
              <option style={OPT} value="Male">Male</option>
              <option style={OPT} value="Female">Female</option>
              <option style={OPT} value="Other">Other</option>
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={labelBase}>Date of birth</label>
              <input type="date" style={inputBase} value={activeBill.customer?.dob || ''} disabled />
            </div>
            <div>
              <label style={labelBase}>Anniversary</label>
              <input type="date" style={inputBase} value={activeBill.customer?.anniversary || ''} disabled />
            </div>
          </div>
          <div>
            <label style={labelBase}>Source of client</label>
            <select style={selectBase} value={activeBill.customer?.source || ''} disabled>
              <option style={OPT} value="">--Select--</option>
              <option style={OPT} value="Walk-in">Walk-in</option>
              <option style={OPT} value="Social Media">Social Media</option>
              <option style={OPT} value="Referral">Referral</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const s = {
    // Layout
    wrapper:      { display:'flex', height:'100vh', background:'var(--background)', overflow:'hidden' },
    leftPanel:    { flex:1, display:'flex', flexDirection:'column', gap:'0', overflow:'hidden', borderRight:'1px solid var(--glass-border)' },
    rightPanel:   { width:'480px', display:'flex', flexDirection:'column', background:'var(--card-bg)', backdropFilter:'blur(20px)', height:'100%', overflow:'hidden' },

    // Top customer bar
    customerBar:  { padding:'12px 20px', background:'var(--glass-bg)', borderBottom:'1px solid var(--glass-border)', display:'flex', alignItems:'center', gap:'12px' },
    custInput:    { flex:1, background:'transparent', border:'none', color:'white', fontSize:'14px', outline:'none' },

    // Search & category row
    searchRow:    { padding:'14px 20px', display:'flex', gap:'12px', alignItems:'center', borderBottom:'1px solid var(--glass-border)' },
    searchWrap:   { position:'relative', flex:1 },
    searchInput:  { width:'100%', padding:'10px 40px', borderRadius:'10px', background:'var(--glass-bg)', border:'1px solid var(--glass-border)', color:'white', fontSize:'14px', outline:'none' },

    // Category tabs
    catRow:       { padding:'10px 20px', display:'flex', gap:'8px', overflowX:'auto', borderBottom:'1px solid var(--glass-border)', scrollbarWidth:'none' },
    catBtn:       (active) => ({
      display:'flex', alignItems:'center', gap:'6px',
      padding:'7px 14px', borderRadius:'20px', whiteSpace:'nowrap', fontWeight:'600', fontSize:'13px', cursor:'pointer', transition:'all 0.2s',
      background: active ? 'var(--primary)' : 'var(--glass-bg)',
      color:      active ? 'white'          : 'var(--text-muted)',
      border:     '1px solid ' + (active ? 'var(--primary)' : 'var(--glass-border)'),
    }),

    // Item grid
    grid:         { flex:1, overflowY:'auto', padding:'24px', display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(220px, 1fr))', gap:'24px', alignContent:'start' },
    itemCard:     { borderRadius:'20px', padding:'20px', background:'var(--glass-bg)', border:'1px solid var(--glass-border)', cursor:'pointer', transition:'all 0.25s', display:'flex', flexDirection:'column', gap:'16px', minHeight: '220px', height: '220px', position: 'relative', overflow: 'hidden' },
    itemName:     { fontSize:'15px', fontWeight:'700', lineHeight:'1.4', color:'white', display:'-webkit-box', WebkitLineClamp:'2', WebkitBoxOrient:'vertical', overflow:'hidden', height:'45px', wordBreak: 'break-word' },

    // Right panel
    rpHeader:     { padding:'10px 16px', borderBottom:'1px solid var(--glass-border)', display:'flex', alignItems:'center', gap:'10px' },
    cartList:     { flex:1, minHeight:0, overflowY:'auto', padding:'12px 16px', display:'flex', flexDirection:'column', gap:'10px' },
    cartItem:     { borderRadius:'10px', background:'var(--glass-bg)', border:'1px solid var(--glass-border)', padding:'10px', display:'flex', flexDirection:'column', gap:'8px', flexShrink: 0 },

    // Summary
    summary:      { padding:'12px 16px', borderTop:'1px solid var(--glass-border)', display:'flex', flexDirection:'column', gap:'6px' },
    summaryRow:   (bold) => ({ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize: bold ? '14px' : '12px', fontWeight: bold ? '800' : '400', color: bold ? 'white' : 'var(--text-muted)' }),
    divider:      { height:'1px', background:'var(--glass-border)', margin:'2px 0' },

    // Buttons
    btnPrimary:   { flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', padding:'10px 14px', borderRadius:'8px', background:'var(--primary)', color:'white', border:'none', fontWeight:'700', fontSize:'14px', cursor:'pointer', transition:'all 0.2s' },
    btnSuccess:   { flex:1, display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', padding:'10px 14px', borderRadius:'8px', background:'#16a34a', color:'white', border:'none', fontWeight:'700', fontSize:'14px', cursor:'pointer', transition:'all 0.2s' },
    btnSecondary: { display:'flex', alignItems:'center', justifyContent:'center', gap:'6px', padding:'10px 14px', borderRadius:'10px', background:'var(--glass-bg)', color:'var(--text-muted)', border:'1px solid var(--glass-border)', fontWeight:'600', fontSize:'13px', cursor:'pointer', transition:'all 0.2s' },
    btnDanger:    { background:'none', border:'none', color:'#ef4444', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', padding:'4px' },
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--background)', overflow: 'hidden' }}>
      
      <UsageVolumeModal 
        isOpen={usageVolumeOverlay.isOpen}
        item={usageVolumeOverlay.item}
        onClose={() => setUsageVolumeOverlay({ isOpen: false, item: null })}
        onConfirm={(used, base, unit) => addToCart(usageVolumeOverlay.item, { used, base, unit })}
      />
      
      {/* Top Tabs */}
      <div style={{ padding: '10px 20px', borderBottom: '1px solid var(--glass-border)', display: 'flex', gap: '12px', background: 'var(--glass-bg)' }}>
        <button onClick={() => setActiveTab('Billing')} style={{ padding: '8px 20px', border: 'none', background: activeTab === 'Billing' ? 'var(--primary)' : 'transparent', color: activeTab === 'Billing' ? 'white' : 'var(--text-muted)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', transition: 'all 0.2s' }}>Billing POS</button>
        <button onClick={() => setActiveTab('Wallet')} style={{ padding: '8px 20px', border: 'none', background: activeTab === 'Wallet' ? 'var(--primary)' : 'transparent', color: activeTab === 'Wallet' ? 'white' : 'var(--text-muted)', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', transition: 'all 0.2s' }}>Wallet Reload</button>
      </div>

      {activeTab === 'Wallet' ? renderWalletTab() : (
      <div style={{ ...s.wrapper, flex: 1, height: 'auto' }}>
        
        {/* LEFT PANEL */}
        <div style={s.leftPanel}>
          <div style={s.customerBar}>
            <div style={{ width:'34px', height:'34px', borderRadius:'50%', background:'var(--primary-glow)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <UserCheck size={18} color="var(--primary)" />
            </div>
            {activeBill.customer ? (
              <div style={{ flex:1, display:'flex', alignItems:'center', gap:'10px' }}>
                <div>
                  <div style={{ fontWeight:'700', fontSize:'14px' }}>{activeBill.customer.name}</div>
                  <div style={{ fontSize:'12px', color:'var(--text-muted)', display:'flex', alignItems:'center', gap:'4px' }}><Phone size={11}/> {activeBill.customer.phone}</div>
                </div>
                <div style={{ marginLeft:'auto', background:'rgba(139,92,246,0.15)', color:'#a78bfa', padding:'3px 10px', borderRadius:'20px', fontSize:'12px', fontWeight:'600' }}>
                  💰 ₹{(Number(activeBill.customer.wallet_balance) || 0).toLocaleString()} wallet
                </div>
                <button style={s.btnDanger} onClick={() => { updateActiveBill({ customer: null, customerSearch: '' }); }}><X size={14}/></button>
              </div>
            ) : (
              <div style={{ flex: 1, position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    style={s.custInput}
                    placeholder="Search customer by name or mobile..."
                    value={activeBill.customerSearch}
                    onChange={e => handleCustomerSearch(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') {
                        selectCustomer({ name: activeBill.customerSearch || 'Walk-in Customer', phone: '—', wallet_balance: 0 });
                      }
                    }}
                  />
                  <button
                    onClick={() => selectCustomer({ name: activeBill.customerSearch || 'Walk-in Customer', phone: '—', wallet_balance: 0 })}
                    style={{ ...s.btnSecondary, padding:'8px 14px' }}
                  >
                    <User size={14} /> Add Walk-in
                  </button>
                </div>
                {searchResults.length > 0 && (
                  <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, background: '#1e293b', border: '1px solid var(--glass-border)', borderRadius: '8px', zIndex: 100, marginTop: '4px', maxHeight: '200px', overflowY: 'auto' }}>
                    {searchResults.map(c => (
                      <div key={c.id} onClick={() => selectCustomer(c)} style={{ padding: '10px 12px', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: '700' }}>{c.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{c.phone}</div>
                        </div>
                        <div style={{ fontSize: '12px', color: '#4ade80' }}>₹{c.wallet_balance}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={s.searchRow}>
            <div style={s.searchWrap}>
              <Search size={16} style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)' }}/>
              <input
                ref={searchInputRef}
                autoFocus
                type="text"
                placeholder="Search service / product or scan barcode…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && search.trim()) {
                    const match = filteredItems.find(
                      item => item.name.toLowerCase() === search.toLowerCase() || item.id.toString() === search
                    ) || (filteredItems.length === 1 ? filteredItems[0] : null);
                    if (match) { addToCart(match); setSearch(''); }
                  }
                }}
                style={s.searchInput}
              />
              <ScanLine size={16} style={{ position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)' }}/>
            </div>
            <div style={{ display:'flex', alignItems:'center', gap:'6px', color:'var(--text-muted)', fontSize:'11px', whiteSpace:'nowrap' }}>
              <Keyboard size={13}/>
              <span><kbd style={{ background:'var(--glass-bg)', padding:'1px 4px', borderRadius:'3px', border:'1px solid var(--glass-border)' }}>/</kbd> focus | <kbd style={{ background:'var(--glass-bg)', padding:'1px 4px', borderRadius:'3px', border:'1px solid var(--glass-border)' }}>F8</kbd> pay</span>
            </div>
          </div>

          <div style={s.catRow}>
            {categories.map(cat => {   
              const Icon = CATEGORY_ICONS[cat] || Star;
              return (
                <button key={cat} onClick={() => setActiveCategory(cat)} style={s.catBtn(activeCategory === cat)}>
                  <Icon size={14} /> {cat}
                </button>
              );
            })}
          </div>

          <div style={s.grid}>
            {filteredItems.length === 0 && (
              <div style={{ gridColumn:'1/-1', textAlign:'center', color:'var(--text-muted)', paddingTop:'40px' }}>
                <Package size={40} style={{ opacity:0.2, marginBottom:'12px' }}/><p>No items found</p>
              </div>
            )}
            {filteredItems.map(item => {
              const Icon   = ICON_MAP[item.icon] || Package;
              const tColor = TYPE_COLORS[item.type] || TYPE_COLORS.service;
              const inCart = activeBill.cart.find(i => i.id === item.id);
              
              let currentAvailable = item.stock;
              if (item.type === 'product' || item.uses) {
                const productId = item.type === 'product' ? item.id : item.uses.id;
                const product = items.find(m => m.id === productId);
                if (product) {
                  const inCartTotal = activeBill.cart.reduce((acc, cartItem) => {
                    if (cartItem.id === productId) return acc + cartItem.quantity;
                    if (cartItem.uses && cartItem.uses.id === productId) return acc + cartItem.quantity * cartItem.uses.qty;
                    return acc;
                  }, 0);
                  currentAvailable = product.stock - inCartTotal;
                }
              }
              const formatStockDisplay = (qty, baseVol, baseUnit) => {
                if (typeof qty !== 'number' || isNaN(qty)) return 'N/A';
                if (!baseVol || baseVol <= 1) return qty <= 0 ? 'Out of Stock' : `${qty}`;
                const totalVol = Math.round(qty * baseVol * 100) / 100;
                const displayCount = Math.ceil(Math.round(qty * 10000) / 10000); 
                return `${displayCount} (${totalVol}${baseUnit || ''})`;
              };

              const isOutOfStock = (item.type === 'product' && currentAvailable <= 0) || (item.uses && currentAvailable < item.uses.qty);

              return (
                <div
                  key={item.id}
                  style={{
                    ...s.itemCard,
                    border: inCart ? '1.5px solid var(--primary)' : '1px solid var(--glass-border)',
                    boxShadow: inCart ? '0 0 0 3px var(--primary-glow)' : 'none',
                    opacity: isOutOfStock ? 0.6 : 1,
                    pointerEvents: isOutOfStock ? 'none' : 'auto'
                  }}
                  onClick={() => addToCart(item)}
                >
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', height: '40px' }}>
                    <div style={{ width:'40px', height:'40px', borderRadius:'12px', background: tColor.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
                      <Icon size={20} color={tColor.text}/>
                    </div>
                    <div style={{ fontSize:'11px', color: tColor.text, fontWeight:'800', background: tColor.bg, display:'inline-block', padding:'4px 10px', borderRadius:'10px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {tColor.label}
                    </div>
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={s.itemName}>{item.name}</div>
                    {item.type === 'product' && (
                      <div style={{ fontSize:'12px', color: currentAvailable <= 2 ? '#ef4444' : '#10b981', fontWeight: '800' }}>
                        {isOutOfStock ? 'Out of Stock' : `Stock: ${formatStockDisplay(currentAvailable, item.base_volume, item.base_unit)}`}
                      </div>
                    )}
                  </div>
                  
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price Total</span>
                      <span style={{ fontWeight:'950', fontSize:'20px', color: 'white' }}>₹{item.price.toLocaleString()}</span>
                    </div>
                    <div style={{ width:'44px', height:'44px', borderRadius:'14px', background:'var(--primary-glow)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--primary)', border: '1px solid rgba(99, 102, 241, 0.3)', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}>
                      {inCart ? (
                        <span style={{ fontSize: '18px', fontWeight: '900' }}>{inCart.quantity}</span>
                      ) : (
                        <Plus size={24} strokeWidth={3}/>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

         {/* RIGHT PANEL */}
        <div style={s.rightPanel}>
          {/* Bill Tabs */}
          <div style={{ padding: '10px 16px', borderBottom: '1px solid var(--glass-border)', display: 'flex', gap: '10px', overflowX: 'auto', scrollbarWidth: 'none', background: 'rgba(0,0,0,0.15)', alignItems: 'center' }}>
            {bills.map((bill, index) => {
              const isActive = activeBillIndex === index;
              const hasItems = bill.cart.length > 0;
              
              return (
                <div
                  key={bill.id}
                  onClick={() => setActiveBillIndex(index)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', borderRadius: '12px', cursor: 'pointer', whiteSpace: 'nowrap', fontSize: '13px', fontWeight: '800',
                    background: isActive ? 'var(--primary)' : 'var(--glass-bg)',
                    color: isActive ? 'white' : 'var(--text-muted)',
                    border: '1px solid ' + (isActive ? 'var(--primary)' : 'var(--glass-border)'),
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: isActive ? '0 4px 12px var(--primary-glow)' : 'none',
                    position: 'relative',
                    minWidth: '100px',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ReceiptText size={14} opacity={isActive ? 1 : 0.5} />
                    <span>BILL {index + 1}</span>
                    {hasItems && !isActive && (
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', position: 'absolute', top: '6px', right: '6px' }} />
                    )}
                  </div>
                  <button
                    onClick={(e) => {
                      if (bill.cart.length > 0 && !window.confirm('This bill has items. Clear and close?')) {
                        e.stopPropagation();
                        return;
                      }
                      closeBill(e, index);
                    }}
                    style={{ 
                      background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', display: 'flex', opacity: 0.5, padding: '2px', borderRadius: '4px',
                      transition: 'all 0.2s',
                      ':hover': { opacity: 1, background: 'rgba(255,255,255,0.1)' } 
                    }}
                  >
                    <X size={14} />
                  </button>
                </div>
              );
            })}
            <button
              onClick={addNewBill}
              title="Add New Bill"
              style={{ padding: '8px', borderRadius: '12px', background: 'var(--glass-bg)', color: 'var(--primary)', border: '1px dashed var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
            >
              <Plus size={20} />
            </button>
          </div>


          <div style={s.rpHeader}>
            <ReceiptText size={22} color="var(--primary)"/>
            <div>
              <div style={{ fontWeight:'800', fontSize:'16px' }}>Current Bill</div>
              <div style={{ fontSize:'11px', color:'var(--text-muted)' }}>Invoice #{activeBill.invoiceNumber}</div>
            </div>
            <div style={{ marginLeft:'auto', display:'flex', gap:'8px', alignItems:'center' }}>
              <button
                onClick={() => { setAddItemOpen(true); setAddItemSearch(''); setAddItemCategory('All'); }}
                style={{ display:'flex', alignItems:'center', gap:'5px', padding:'6px 12px', borderRadius:'8px', background:'var(--primary)', color:'white', border:'none', fontWeight:'700', fontSize:'12px', cursor:'pointer', whiteSpace:'nowrap' }}
              >
                <Plus size={14}/> Add Item
              </button>
              <button style={s.btnSecondary} title="Clear Cart" onClick={clearCart}><RotateCcw size={15}/></button>
              <div style={{ background:'var(--glass-bg)', border:'1px solid var(--glass-border)', color:'white', padding:'4px 10px', borderRadius:'20px', fontSize:'12px', fontWeight:'700' }}>
                {activeBill.cart.length} item{activeBill.cart.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          <div style={s.cartList}>
            {activeBill.cart.length === 0 ? (
              <div style={{ textAlign:'center', paddingTop:'48px', color:'var(--text-muted)' }}>
                <ShoppingCart size={48} style={{ opacity:0.15, marginBottom:'14px' }}/>
                <p style={{ fontSize:'14px' }}>Add services or products to begin billing</p>
                <button
                  onClick={() => { setAddItemOpen(true); setAddItemSearch(''); setAddItemCategory('All'); }}
                  style={{ marginTop:'12px', display:'inline-flex', alignItems:'center', gap:'6px', padding:'10px 20px', borderRadius:'10px', background:'var(--primary)', color:'white', border:'none', fontWeight:'700', fontSize:'13px', cursor:'pointer' }}
                >
                  <Plus size={16}/> Add Product or Service
                </button>
              </div>
            ) : (
              activeBill.cart.map(item => {
                const tColor = TYPE_COLORS[item.type] || TYPE_COLORS.service;
                const Icon   = ICON_MAP[item.icon] || Package;
                return (
                  <div key={item.cartId} style={s.cartItem}>
                    <div style={{ display:'flex', alignItems:'flex-start', gap:'8px' }}>
                      <div style={{ width:'28px', height:'28px', borderRadius:'6px', background: tColor.bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0, marginTop: '2px' }}>
                        <Icon size={14} color={tColor.text}/>
                      </div>
                      <div style={{ flex:1, minWidth: 0 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '4px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <div style={{ fontWeight:'700', fontSize:'13px', whiteSpace: 'normal', lineClamp: 2, display: '-webkit-box', WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.2' }}>{item.name}</div>
                            {item.usedVolume && (
                              <div style={{ fontSize: '11px', color: 'var(--primary)', fontWeight: '700', marginTop: '2px' }}>
                                Usage: {item.usedVolume}{item.unit} / {item.baseVolume}{item.unit}
                              </div>
                            )}
                          </div>
                          {activeBill.billType === 'GST' && (
                            <div style={{ textAlign: 'right', flexShrink: 0 }}>
                              <div style={{ fontSize: '9px', fontWeight: '800', color: 'var(--primary)', background: 'var(--primary-glow)', padding: '1px 5px', borderRadius: '4px' }}>GST {item.gstRate}%</div>
                              <div style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '1px' }}>₹{((item.price * item.quantity * item.gstRate) / 100).toFixed(0)}</div>
                            </div>
                          )}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', alignItems: 'center', marginTop: '2px' }}>
                          <div style={{ fontSize:'9px', color: tColor.text, fontWeight: '700', background: tColor.bg, padding: '2px 4px', borderRadius: '4px' }}>{tColor.label}</div>
                          {item.type === 'product' && (
                            <div style={{ fontSize:'9px', color: '#4ade80', fontWeight: '800', background: 'rgba(74, 222, 128, 0.1)', padding: '2px 4px', borderRadius: '4px' }}>
                              Remains: {(() => {
                                 const orig = items.find(m => m.id === item.id).stock;
                                 const inCartTotal = activeBill.cart.reduce((acc, ci) => {
                                   if (ci.id === item.id) return acc + ci.quantity;
                                   if (ci.uses && ci.uses.id === item.id) return acc + ci.quantity * ci.uses.qty;
                                   return acc;
                                 }, 0);
                                 return orig - inCartTotal;
                              })()}
                            </div>
                          )}
                          {(() => {
                            const masterItem = items.find(m => m.id === item.id);
                            return masterItem?.uses && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', width: '100%', marginTop: '2px' }}>
                                <div style={{ fontSize:'9px', color: '#a78bfa', fontWeight: '800', background: 'rgba(167,139,250,0.15)', padding: '2px 6px', borderRadius: '4px', border: '1px solid rgba(167,139,250,0.3)', flex: 1, textAlign: 'center' }}>
                                  Uses: {items.find(m => m.id === masterItem.uses.id).name}
                                </div>
                                <button 
                                  onClick={() => setUsageVolumeOverlay({ isOpen: true, item })}
                                  style={{ padding: '2px 4px', background: '#eab308', border: 'none', color: 'white', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                  <Edit size={10} />
                                </button>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                      <button style={{ ...s.btnDanger, padding: '4px' }} onClick={() => removeFromCart(item.cartId)}><Trash2 size={14}/></button>
                    </div>

                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'4px', background:'var(--background)', borderRadius:'6px', padding:'2px 6px' }}>
                        <button onClick={() => updateQuantity(item.cartId, -1)} style={{ background:'none', border:'none', color:'white', cursor:'pointer', display:'flex' }}><Minus size={11}/></button>
                        <span style={{ minWidth:'20px', textAlign:'center', fontSize:'12px', fontWeight:'700' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.cartId, 1)} style={{ background:'none', border:'none', color:'white', cursor:'pointer', display:'flex' }}><Plus size={11}/></button>
                      </div>
                      <div style={{ fontWeight:'800', fontSize:'13px' }}>₹{(item.price * item.quantity).toLocaleString()}</div>
                    </div>

                    <div style={{ display:'flex', alignItems:'center', gap:'4px', background:'var(--background)', borderRadius:'6px', padding:'4px 8px' }}>
                      <User size={11} color="var(--text-muted)"/>
                      <span style={{ fontSize:'11px', color:'var(--text-muted)', marginRight:'4px' }}>Staff:</span>
                      <select
                        value={item.staff}
                        onChange={e => updateStaff(item.cartId, e.target.value)}
                        style={{ flex:1, background:'transparent', border:'none', color:'white', fontSize:'11px', fontWeight:'600', cursor:'pointer', outline:'none' }}
                      >
                        <option value="Anyone" style={{ background:'#1a1a2e' }}>Anyone</option>
                        {staffList.map(s => <option key={s.id} value={s.id} style={{ background:'#1a1a2e' }}>{s.name}</option>)}
                      </select>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Billing Information Fields */}
          <div style={{ padding: '0 16px 10px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px', borderBottom: '1px solid var(--glass-border)' }}>
            <div>
              <label style={labelBase}>Bill Type</label>
              <select style={{...selectBase, padding: '9px 8px'}} value={activeBill.billType} onChange={e => updateActiveBill({ billType: e.target.value })}>
                <option style={OPT} value="GST">GST</option>
                <option style={OPT} value="non-GST">non-GST</option>
              </select>
            </div>
            {activeBill.billType === 'GST' && (
              <div>
                <label style={labelBase}>GST Type</label>
                <select style={{...selectBase, padding: '9px 8px'}} value={activeBill.gstType} onChange={e => updateActiveBill({ gstType: e.target.value })}>
                  <option style={OPT} value="local">Local (CGST + SGST)</option>
                  <option style={OPT} value="interstate">Interstate (IGST)</option>
                </select>
              </div>
            )}
            <div>
              <label style={labelBase}>Discount (INR)</label>
              <input type="number" style={{...inputBase, padding: '9px 8px'}} value={activeBill.discount} onChange={e => updateActiveBill({ discount: Number(e.target.value) })} placeholder="0" />
            </div>

            <div>
              <label style={labelBase}>Advance Received</label>
              <input type="number" style={inputBase} value={activeBill.advanceReceived} onChange={e => updateActiveBill({ advanceReceived: Number(e.target.value) })} placeholder="0" />
            </div>
            <div>
              <label style={labelBase}>Amount Payable</label>
              <div style={{ ...inputBase, background: 'rgba(0,0,0,0.2)', color: 'var(--text-muted)' }}>
                {Math.max(0, total - activeBill.advanceReceived).toLocaleString(undefined, {maximumFractionDigits:0})} INR
              </div>
            </div>

            <div>
              <label style={labelBase}>Amount Paid</label>
              <input 
                type="number" 
                style={inputBase} 
                value={activeBill.amountPaid} 
                onChange={e => updateActiveBill({ amountPaid: Number(e.target.value) })} 
                placeholder="0" 
              />
            </div>

            <div>
              <label style={labelBase}>Due / Credit</label>
              <div style={{ ...inputBase, background: 'rgba(0,0,0,0.2)', color: (activeBill.amountPaid - Math.max(0, total - activeBill.advanceReceived)) >= 0 ? '#4ade80' : '#ef4444' }}>
                {(activeBill.amountPaid - Math.max(0, total - activeBill.advanceReceived)).toLocaleString(undefined, {maximumFractionDigits:0})} INR
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1', fontSize: '11px', color: 'var(--primary)', fontWeight: '600' }}>
              *Reward points:- 10 points = 1.00 INR.
            </div>
          </div>

          {/* Summary */}
          <div style={s.summary}>
            {/* Subtotal */}
            <div style={s.summaryRow(false)}>
              <span>Subtotal ({activeBill.cart.length} items)</span>
              <span>₹ {subtotal.toLocaleString()}</span>
            </div>

            {/* Tax Details */}
            {activeBill.billType === 'GST' && (
              <>
                {activeBill.gstType === 'local' ? (
                  <>
                    <div style={s.summaryRow(false)}>
                      <span>CGST</span>
                      <span>₹ {detailedTax.cgst.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>
                    </div>
                    <div style={s.summaryRow(false)}>
                      <span>SGST</span>
                      <span>₹ {detailedTax.sgst.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>
                    </div>
                  </>
                ) : (
                  <div style={s.summaryRow(false)}>
                    <span>IGST</span>
                    <span>₹ {detailedTax.igst.toLocaleString(undefined, { maximumFractionDigits: 1 })}</span>
                  </div>
                )}
                
                <div style={s.divider}/>
                
                <div style={{ padding: '6px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)' }}>GST (Services)</span>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '800' }}>₹ {detailedTax.services.toLocaleString(undefined, { maximumFractionDigits: 1 })}</div>
                </div>
 
                <div style={s.divider}/>
 
                <div style={{ padding: '6px 0', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-muted)' }}>GST (Products)</span>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '800' }}>₹ {detailedTax.products.toLocaleString(undefined, { maximumFractionDigits: 1 })}</div>
                </div>
              </>
            )}

            <div style={s.divider}/>

            {/* Total */}
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding: '6px 0' }}>
              <span style={{ fontWeight:'800', fontSize:'16px' }}>Grand Total</span>
              <span style={{ fontWeight:'900', fontSize:'20px', color:'var(--secondary)' }}>INR {Math.max(0,total).toLocaleString(undefined,{maximumFractionDigits:0})}</span>
            </div>

            {/* Action Buttons */}
            <div style={{ display:'flex', gap:'10px', marginTop:'4px' }}>
              <button
                style={{ ...s.btnPrimary, opacity: activeBill.cart.length === 0 ? 0.4 : 1 }}
                disabled={activeBill.cart.length === 0}
                onClick={() => setIsCheckoutOpen(true)}
              >
                <CreditCard size={18}/> Pay (F8)
              </button>
              <button
                style={{ ...s.btnSuccess, opacity: activeBill.cart.length === 0 ? 0.4 : 1 }}
                disabled={activeBill.cart.length === 0}
                onClick={() => { 
                  updateActiveBill({
                    paymentMode: 'Cash',
                    amountPaid: total - activeBill.advanceReceived
                  });
                  handleCheckoutConfirm();
                }}
              >
                <Zap size={18}/>
              </button>
            </div>

            {/* Quick payment icons row */}
            <div style={{ display:'flex', gap:'6px', justifyContent:'center', marginTop:'0px', marginBottom: '4px' }}>
              {[
                { Icon: Banknote, label:'Cash',   color:'#4ade80' },
                { Icon: CreditCard, label:'Card', color:'#60a5fa' },
                { Icon: QrCode, label:'UPI',      color:'#a78bfa' },
                { Icon: Wallet, label:'Wallet',   color:'#fbbf24' },
                { Icon: Printer, label:'Print',   color:'var(--text-muted)' },
              ].map(({ Icon, label, color }) => (
                <button
                  key={label}
                  title={label}
                  onClick={() => {
                    updateActiveBill({
                      paymentMode: label,
                      amountPaid: total - activeBill.advanceReceived
                    });
                  }}
                  style={{ 
                    display:'flex', flexDirection:'column', alignItems:'center', gap:'2px', 
                    background: activeBill.paymentMode === label ? 'var(--primary-glow)' : 'var(--glass-bg)', 
                    border: activeBill.paymentMode === label ? '1px solid var(--primary)' : '1px solid var(--glass-border)', 
                    borderRadius:'8px', padding:'6px 8px', cursor:'pointer', color, flex:1 
                  }}
                >
                  <Icon size={14}/>
                  <span style={{ fontSize:'9px', fontWeight:'600', color: activeBill.paymentMode === label ? 'white' : 'var(--text-muted)' }}>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      )}

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        total={Math.max(0, total)}
        onConfirm={handleCheckoutConfirm}
      />

      {/* Add Product or Service Modal */}
      {addItemOpen && (
        <div style={{ position:'fixed', inset:0, zIndex:1000, background:'rgba(0,0,0,0.75)', backdropFilter:'blur(6px)', display:'flex', alignItems:'center', justifyContent:'center' }}
          onClick={() => setAddItemOpen(false)}
        >
          <div
            style={{ width:'min(700px,95vw)', maxHeight:'80vh', background:'var(--card-bg)', border:'1px solid var(--glass-border)', borderRadius:'16px', display:'flex', flexDirection:'column', overflow:'hidden' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div style={{ padding:'18px 20px', borderBottom:'1px solid var(--glass-border)', display:'flex', alignItems:'center', gap:'12px' }}>
              <Package size={20} color="var(--primary)"/>
              <div style={{ fontWeight:'800', fontSize:'16px' }}>Add Product or Service</div>
              <button onClick={() => setAddItemOpen(false)} style={{ marginLeft:'auto', background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer', display:'flex', alignItems:'center' }}><X size={20}/></button>
            </div>

            {/* Search */}
            <div style={{ padding:'12px 20px', borderBottom:'1px solid var(--glass-border)', display:'flex', flexDirection:'column', gap:'10px' }}>
              <div style={{ position:'relative' }}>
                <Search size={15} style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', color:'var(--text-muted)' }}/>
                <input
                  autoFocus
                  style={{ ...s.searchInput, paddingLeft:'36px' }}
                  placeholder="Search product or service..."
                  value={addItemSearch}
                  onChange={e => setAddItemSearch(e.target.value)}
                />
              </div>
              {/* Category filter */}
              <div style={{ display:'flex', gap:'8px', overflowX:'auto', scrollbarWidth:'none' }}>
                {categories.map(cat => {
                  const Icon = CATEGORY_ICONS[cat] || Star;
                  const active = addItemCategory === cat;
                  return (
                    <button key={cat} onClick={() => setAddItemCategory(cat)} style={{ display:'flex', alignItems:'center', gap:'5px', padding:'5px 12px', borderRadius:'20px', whiteSpace:'nowrap', fontWeight:'600', fontSize:'12px', cursor:'pointer', background: active ? 'var(--primary)' : 'var(--glass-bg)', color: active ? 'white' : 'var(--text-muted)', border:'1px solid '+(active ? 'var(--primary)' : 'var(--glass-border)') }}>
                      <Icon size={12}/>{cat}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Item grid */}
            <div style={{ overflowY:'auto', padding:'16px 20px', display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:'12px', alignContent:'start' }}>
              {items
                .filter(item =>
                  item.name.toLowerCase().includes(addItemSearch.toLowerCase()) &&
                  (addItemCategory === 'All' || item.category === addItemCategory)
                )
                .map(item => {
                  const Icon = ICON_MAP[item.icon] || Package;
                  const tColor = TYPE_COLORS[item.type] || TYPE_COLORS.service;
                  const inCart = activeBill.cart.find(i => i.id === item.id);
                  let avail = item.stock;
                  if (item.type === 'product' || item.uses) {
                    const pid = item.type === 'product' ? item.id : item.uses.id;
                    const prod = items.find(m => m.id === pid);
                    const used = activeBill.cart.reduce((acc, ci) => {
                      if (ci.id === pid) return acc + ci.quantity;
                      if (ci.uses && ci.uses.id === pid) return acc + ci.quantity * ci.uses.qty;
                      return acc;
                    }, 0);
                    avail = prod ? prod.stock - used : avail;
                  }
                  const oos = (item.type === 'product' && avail <= 0) || (item.uses && avail < item.uses.qty);
                  return (
                    <div
                      key={item.id}
                      onClick={() => { if (!oos) { addToCart(item); } }}
                      style={{ borderRadius:'12px', padding:'14px', background: oos ? 'rgba(255,255,255,0.02)' : 'var(--glass-bg)', border: inCart ? '1.5px solid var(--primary)' : '1px solid var(--glass-border)', cursor: oos ? 'not-allowed' : 'pointer', opacity: oos ? 0.5 : 1, display:'flex', flexDirection:'column', gap:'10px', transition:'all 0.15s', position:'relative' }}
                    >
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                        <div style={{ width:'32px', height:'32px', borderRadius:'8px', background: tColor.bg, display:'flex', alignItems:'center', justifyContent:'center' }}>
                          <Icon size={16} color={tColor.text}/>
                        </div>
                        {inCart && (
                          <div style={{ background:'var(--primary)', color:'white', borderRadius:'50%', width:'18px', height:'18px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'10px', fontWeight:'800' }}>{inCart.quantity}</div>
                        )}
                      </div>
                      <div>
                        <div style={{ fontSize:'12px', fontWeight:'700', lineHeight:'1.3', marginBottom:'4px' }}>{item.name}</div>
                        <div style={{ display:'flex', gap:'5px', alignItems:'center', flexWrap:'wrap' }}>
                          <span style={{ fontSize:'9px', color: tColor.text, fontWeight:'700', background: tColor.bg, padding:'1px 6px', borderRadius:'8px' }}>{tColor.label}</span>
                          {item.type === 'product' && (
                            <span style={{ fontSize:'9px', color: avail <= 2 ? '#ef4444' : '#10b981', fontWeight:'700' }}>
                              {oos ? 'Out of Stock' : `Stock: ${item.availability_display || avail}`}
                            </span>
                          )}
                        </div>
                      </div>
                      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                        <span style={{ fontWeight:'800', fontSize:'14px' }}>₹{item.price.toLocaleString()}</span>
                        <div style={{ width:'26px', height:'26px', borderRadius:'7px', background:'var(--primary-glow)', display:'flex', alignItems:'center', justifyContent:'center', color:'var(--primary)' }}>
                          <Plus size={14}/>
                        </div>
                      </div>
                    </div>
                  );
                })
              }
              {items.filter(item => item.name.toLowerCase().includes(addItemSearch.toLowerCase()) && (addItemCategory === 'All' || item.category === addItemCategory)).length === 0 && (
                <div style={{ gridColumn:'1/-1', textAlign:'center', color:'var(--text-muted)', paddingTop:'32px' }}>
                  <Package size={36} style={{ opacity:0.2, marginBottom:'10px' }}/>
                  <p>No items found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
