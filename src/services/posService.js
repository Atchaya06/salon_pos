const BASE_URL = 'http://127.0.0.1:8000/api'; // Laravel dev server default

export const posService = {
  async init() {
    const res = await fetch(`${BASE_URL}/pos/init`);
    if (!res.ok) throw new Error('Failed to fetch POS init data');
    return res.json();
  },

  async searchClients(query) {
    const res = await fetch(`${BASE_URL}/pos/search-client?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error('Failed to search clients');
    return res.json();
  },

  async checkout(payload) {
    const res = await fetch(`${BASE_URL}/pos/checkout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Checkout failed');
    }
    return res.json();
  },

  async reloadWallet(payload) {
    const res = await fetch(`${BASE_URL}/pos/wallet-reload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Wallet reload failed');
    }
    return res.json();
  },

  async getInventoryTransactions() {
    const res = await fetch(`${BASE_URL}/pos/inventory-transactions`);
    if (!res.ok) throw new Error('Failed to fetch inventory transactions');
    return res.json();
  }
};
