import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  Wallet, 
  Banknote, 
  QrCode, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import Button from '../../components/ui/Button';

const CheckoutModal = ({ isOpen, onClose, total, onConfirm }) => {
  const [paymentMode, setPaymentMode] = useState('UPI');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCheckout = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      setTimeout(() => {
        onConfirm();
        onClose();
        setIsSuccess(false);
      }, 2000);
    }, 1500);
  };

  const modes = [
    { id: 'UPI', icon: QrCode, label: 'UPI / GPay' },
    { id: 'Cash', icon: Banknote, label: 'Cash' },
    { id: 'Card', icon: CreditCard, label: 'Card' },
    { id: 'Wallet', icon: Wallet, label: 'Wallet Balance' },
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        background: 'var(--background)',
        width: '100%',
        maxWidth: '480px',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--glass-border)',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
      }}>
        {isSuccess ? (
          <div style={{ padding: '60px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              background: 'var(--success)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              color: 'white',
              boxShadow: '0 0 20px var(--success)'
            }}>
              <CheckCircle2 size={48} />
            </div>
            <h2 style={{ fontSize: '24px', fontWeight: '800' }}>Payment Successful!</h2>
            <p style={{ color: 'var(--text-muted)' }}>Invoice #GST-00045 generated and sent via WhatsApp.</p>
          </div>
        ) : (
          <>
            <div style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '700' }}>Complete Checkout</h2>
              <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><X size={24} /></button>
            </div>

            <div style={{ padding: '32px' }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: '8px' }}>Amount to Pay</p>
                <h1 style={{ fontSize: '48px', fontWeight: '900', color: 'var(--secondary)' }}>₹{total.toLocaleString()}</h1>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginBottom: '32px' }}>
                {modes.map(mode => (
                  <div
                    key={mode.id}
                    onClick={() => setPaymentMode(mode.id)}
                    style={{
                      padding: '16px',
                      borderRadius: 'var(--radius-md)',
                      border: '2px solid ' + (paymentMode === mode.id ? 'var(--primary)' : 'var(--glass-border)'),
                      background: paymentMode === mode.id ? 'var(--primary-glow)' : 'var(--glass-bg)',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '12px',
                      transition: 'all 0.2s'
                    }}
                  >
                    <mode.icon size={24} color={paymentMode === mode.id ? 'var(--primary)' : 'var(--text-muted)'} />
                    <span style={{ fontSize: '13px', fontWeight: '600', color: paymentMode === mode.id ? 'white' : 'var(--text-muted)' }}>{mode.label}</span>
                  </div>
                ))}
              </div>

              {paymentMode === 'Wallet' && (
                <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid var(--warning)', borderRadius: 'var(--radius-md)', display: 'flex', gap: '12px', marginBottom: '24px' }}>
                  <AlertCircle size={20} color="var(--warning)" style={{ flexShrink: 0 }} />
                  <p style={{ fontSize: '13px', color: 'var(--warning)', margin: 0 }}>Available Balance: ₹4,200. Remaining balance will be ₹0.</p>
                </div>
              )}

              <Button 
                style={{ width: '100%', height: '56px', fontSize: '18px' }} 
                onClick={handleCheckout}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
              </Button>

              <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: 'var(--text-muted)' }}>
                By proceeding, you agree to the terms of service.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
