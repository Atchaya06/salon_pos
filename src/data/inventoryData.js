// Unified Inventory and Product Data
// Simplifies sync between POS and Inventory modules
const INVENTORY_VERSION = 2; // bump this to force-refresh cached data

const DEFAULT_INVENTORY = [
  { id: 1,  name: 'Haircut (Classic)',     category: 'Hair',    type: 'service',  price: 450,  stock: 999,  unit: 'svc', reorder: 0,   gst: 5,  icon: 'Scissors', uses: { id: 8, qty: 1 } },
  { id: 2,  name: 'Beard Trim',            category: 'Hair',    type: 'service',  price: 200,  stock: 999,  unit: 'svc', reorder: 0,   gst: 5,  icon: 'Scissors', uses: { id: 14, qty: 1 } },
  { id: 3,  name: 'Hair Color (Global)',   category: 'Hair',    type: 'service',  price: 2200, stock: 999,  unit: 'svc', reorder: 0,   gst: 5,  icon: 'Scissors', uses: { id: 15, qty: 1 } },
  { id: 4,  name: 'Keratin Treatment',     category: 'Hair',    type: 'service',  price: 3500, stock: 999,  unit: 'svc', reorder: 0,   gst: 5,  icon: 'Scissors', uses: { id: 16, qty: 1 } },
  { id: 5,  name: 'Hydra Facial',          category: 'Skin',    type: 'service',  price: 1500, stock: 999,  unit: 'svc', reorder: 0,   gst: 5,  icon: 'Sparkles', uses: { id: 17, qty: 1 } },
  { id: 6,  name: 'Cleanup',              category: 'Skin',    type: 'service',  price: 700,  stock: 999,  unit: 'svc', reorder: 0,   gst: 5,  icon: 'Sparkles', uses: { id: 17, qty: 1 } },
  { id: 7,  name: 'D-Tan Pack',           category: 'Skin',    type: 'service',  price: 600,  stock: 999,  unit: 'svc', reorder: 0,   gst: 5,  icon: 'Sparkles', uses: { id: 13, qty: 1 } },
  { id: 8,  name: 'Loreal Shampoo 250ml', category: 'Retail',  type: 'product',  price: 850,  stock: 3750,  unit: 'ml', reorder: 2500, gst: 18, icon: 'Package' },
  { id: 9,  name: 'Hair Serum 100ml',     category: 'Retail',  type: 'product',  price: 1200, stock: 400,   unit: 'ml', reorder: 500,  gst: 18, icon: 'Package' },
  { id: 10, name: 'SPF Sunscreen',        category: 'Retail',  type: 'product',  price: 450,  stock: 900,   unit: 'ml', reorder: 1250, gst: 18, icon: 'Package' },
  { id: 13, name: 'D-Tan Cream 500g',     category: 'Retail',  type: 'product',  price: 1400, stock: 5000,  unit: 'g',  reorder: 10000, gst: 18, icon: 'Package' },
  { id: 14, name: 'Shaving Foam',         category: 'Retail',  type: 'product',  price: 350,  stock: 1600,  unit: 'ml', reorder: 3000, gst: 18, icon: 'Package' },
  { id: 15, name: 'Color Kit (Natural)',  category: 'Retail',  type: 'product',  price: 750,  stock: 800,   unit: 'ml', reorder: 2000, gst: 18, icon: 'Package' },
  { id: 16, name: 'Keratin Prep 1L',      category: 'Retail',  type: 'product',  price: 2500, stock: 2000,  unit: 'ml', reorder: 5000, gst: 18, icon: 'Package' },
  { id: 17, name: 'Cleansing Milk 500ml', category: 'Retail',  type: 'product',  price: 550,  stock: 3000,  unit: 'ml', reorder: 6000, gst: 18, icon: 'Package' },
  { id: 11, name: 'Gold Wallet Plan',     category: 'Membership', type: 'wallet', price: 5000, value: 7000, stock: 999, unit: 'plan', reorder: 0, gst: 0, icon: 'Gift' },
  { id: 12, name: 'Silver Wallet Plan',   category: 'Membership', type: 'wallet', price: 2000, value: 2600, stock: 999, unit: 'plan', reorder: 0, gst: 0, icon: 'Gift' },
];


export const getInventory = () => {
  const ver = localStorage.getItem('salon_inventory_ver');
  if (ver && Number(ver) === INVENTORY_VERSION) {
    const saved = localStorage.getItem('salon_inventory');
    if (saved) return JSON.parse(saved);
  }
  // Auto-refresh: version mismatch or first load
  localStorage.setItem('salon_inventory', JSON.stringify(DEFAULT_INVENTORY));
  localStorage.setItem('salon_inventory_ver', String(INVENTORY_VERSION));
  return DEFAULT_INVENTORY;
};

export const updateStock = (id, quantitySold) => {
  const inventory = getInventory();
  const updated = inventory.map(item => {
    if (item.id === id && (item.type === 'product' || item.stock < 900)) {
      return { ...item, stock: Math.max(0, item.stock - quantitySold) };
    }
    return item;
  });
  localStorage.setItem('salon_inventory', JSON.stringify(updated));
  return updated;
};

export const resetInventory = () => {
  localStorage.setItem('salon_inventory', JSON.stringify(DEFAULT_INVENTORY));
  return DEFAULT_INVENTORY;
};

export const updateItem = (id, changes) => {
  const inventory = getInventory();
  const updated = inventory.map(item =>
    item.id === id ? { ...item, ...changes } : item
  );
  localStorage.setItem('salon_inventory', JSON.stringify(updated));
  return updated;
};

// Format volume: 2000ml → 2 L, 500ml → 500 ml, 3750ml → 3.75 L
export const formatVolume = (value, unit) => {
  if (unit === 'ml') {
    if (value >= 1000) {
      const litres = value / 1000;
      return `${parseFloat(litres.toFixed(2))} L`;
    }
    return `${value} ml`;
  }
  if (unit === 'g') {
    if (value >= 1000) {
      const kg = value / 1000;
      return `${parseFloat(kg.toFixed(2))} kg`;
    }
    return `${value} g`;
  }
  return `${value} ${unit}`;
};
