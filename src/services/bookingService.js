const BASE_URL = 'http://127.0.0.1:8000/api';

export const bookingService = {
  async init(branchId) {
    const res = await fetch(`${BASE_URL}/booking/init/${branchId}`);
    if (!res.ok) throw new Error('Failed to fetch booking metadata');
    return res.json();
  },

  async submitBooking(payload) {
    const res = await fetch(`${BASE_URL}/booking/store`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Booking failed');
    }
    return res.json();
  }
};
