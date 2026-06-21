import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  ChevronRight, 
  MapPin, 
  Star, 
  Clock, 
  CheckCircle2, 
  Smartphone,
  Calendar,
  User,
  Phone,
  ArrowRight,
  Info
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { bookingService } from '../../services/bookingService';

const SLOTS = ['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

const QRBooking = () => {
  const { branchId } = useParams();
  const [step, setStep] = useState(0); 
  const [loading, setLoading] = useState(true);
  const [branchInfo, setBranchInfo] = useState(null);
  const [services, setServices] = useState([]);
  const [staffList, setStaffList] = useState([]);
  
  const [booking, setBooking] = useState({ 
    service: null, 
    staff: null, 
    date: null, 
    slot: null,
    customerName: '',
    phone: ''
  });

  const DAYS = [
    { day: 'Tue', date: '24', full: 'Tuesday, 24 March 2026' },
    { day: 'Wed', date: '25', full: 'Wednesday, 25 March 2026' },
    { day: 'Thu', date: '26', full: 'Thursday, 26 March 2026' },
    { day: 'Fri', date: '27', full: 'Friday, 27 March 2026' },
    { day: 'Sat', date: '28', full: 'Saturday, 28 March 2026' },
  ];

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await bookingService.init(branchId);
        setBranchInfo(data.branch);
        setServices(data.services);
        setStaffList(data.staff);
        setBooking(prev => ({ ...prev, date: DAYS[0] }));
      } catch (err) {
        console.error("Booking init failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [branchId]);

  const nextStep = (data = {}) => {
    setBooking(prev => ({ ...prev, ...data }));
    setStep(prev => prev + 1);
  };

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await bookingService.submitBooking({
        catalog_item_id: booking.service.id,
        staff_id: booking.staff?.id || null,
        client_name: booking.customerName,
        client_phone: booking.phone,
        appointment_date: `2026-03-${booking.date.date}`, // Mock year/month for now
        appointment_time: booking.slot,
        branch_id: branchId,
        notes: "Web Booking"
      });
      nextStep();
    } catch (err) {
      alert("Booking failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  const renderStep = () => {
    switch(step) {
      case 0: // Landing
        return (
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '32px', padding: '20px 0' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'var(--primary)', borderRadius: '50%', filter: 'blur(40px)', opacity: 0.3 }}></div>
              <div style={{ position: 'relative', width: '100%', height: '100%', borderRadius: '50%', background: 'var(--card-bg)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px' }}>✨</div>
            </div>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '12px' }}>Book Your <span className="text-gradient">Experience</span></h1>
              <p style={{ color: 'var(--text-muted)', fontSize: '16px', lineHeight: '1.6' }}>Skip the wait. Book your favorite stylist and service in seconds.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', textAlign: 'left' }}>
                <Star size={20} color="var(--warning)" style={{ marginBottom: '8px' }} />
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>4.9/5</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Customer Rating</div>
              </div>
              <div style={{ padding: '16px', borderRadius: '16px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', textAlign: 'left' }}>
                <Info size={20} color="var(--primary)" style={{ marginBottom: '8px' }} />
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Premium</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Quality Services</div>
              </div>
            </div>
            <Button size="lg" style={{ width: '100%', padding: '20px' }} onClick={() => nextStep()}>
              Start Booking <ArrowRight size={20} />
            </Button>
          </div>
        );
      case 1: // Select Service
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Button variant="secondary" size="sm" onClick={prevStep} style={{ padding: '8px' }}>Back</Button>
              <h3 style={{ fontSize: '20px', fontWeight: '800' }}>Pick a Service</h3>
            </div>
            {['Men', 'Women'].map(cat => (
              <div key={cat} style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>{cat} Services</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {services.filter(s => s.category === cat).map(s => (
                    <div 
                      key={s.id} 
                      onClick={() => nextStep({ service: s })}
                      style={{ padding: '20px', background: 'var(--glass-bg)', borderRadius: '20px', border: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s' }}
                    >
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '16px' }}>{s.name}</div>
                        <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>{s.duration_minutes || 30} min • ₹{s.price}</div>
                      </div>
                      <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <ChevronRight size={18} color="var(--text-muted)" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );
      case 2: // Select Staff
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Button variant="secondary" size="sm" onClick={prevStep} style={{ padding: '8px' }}>Back</Button>
              <h3 style={{ fontSize: '20px', fontWeight: '800' }}>Choose Expert</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {staffList.map(s => (
                <div 
                  key={s.id} 
                  onClick={() => nextStep({ staff: s })}
                  style={{ padding: '20px', background: 'var(--glass-bg)', borderRadius: '24px', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}
                >
                  <div style={{ width: '60px', height: '60px', borderRadius: '20px', background: 'linear-gradient(135deg, var(--accent), var(--primary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '24px', boxShadow: '0 8px 16px var(--primary-glow)' }}>{s.name.charAt(0)}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '700', fontSize: '17px' }}>{s.name}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{s.role}</div>
                    <div style={{ fontSize: '12px', color: 'var(--warning)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '4px' }}>
                      <Star size={12} fill="var(--warning)" /> 4.8 (Dynamic)
                    </div>
                  </div>
                  <ChevronRight size={18} color="var(--text-muted)" />
                </div>
              ))}
            </div>
            <Button variant="secondary" onClick={() => nextStep({ staff: { name: 'Anyone' } })}>Any Available Stylist</Button>
          </div>
        );
      case 3: // Select Slot
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Button variant="secondary" size="sm" onClick={prevStep} style={{ padding: '8px' }}>Back</Button>
              <h3 style={{ fontSize: '20px', fontWeight: '800' }}>Select Time</h3>
            </div>
            
            {/* Date Picker */}
            <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
              {DAYS.map(d => (
                <div 
                  key={d.date}
                  onClick={() => setBooking({ ...booking, date: d })}
                  style={{ 
                    minWidth: '70px', 
                    padding: '16px 8px', 
                    borderRadius: '16px', 
                    background: booking.date?.date === d.date ? 'var(--primary)' : 'var(--glass-bg)',
                    border: '1px solid var(--glass-border)',
                    textAlign: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontSize: '12px', opacity: 0.8 }}>{d.day}</div>
                  <div style={{ fontSize: '20px', fontWeight: '800', marginTop: '4px' }}>{d.date}</div>
                </div>
              ))}
            </div>

            {/* Time Grid */}
            <div>
              <div style={{ fontSize: '14px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} color="var(--primary)" /> Available Slots
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                {SLOTS.map(slot => (
                  <div 
                    key={slot} 
                    onClick={() => nextStep({ slot })}
                    style={{ 
                      padding: '16px 8px', 
                      textAlign: 'center', 
                      background: 'var(--glass-bg)', 
                      borderRadius: '16px', 
                      border: '1px solid var(--glass-border)', 
                      fontSize: '13px', 
                      fontWeight: '700',
                      cursor: 'pointer'
                    }}
                  >
                    {slot}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 4: // Contact Info
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Button variant="secondary" size="sm" onClick={prevStep} style={{ padding: '8px' }}>Back</Button>
              <h3 style={{ fontSize: '20px', fontWeight: '800' }}>Your Details</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', color: 'var(--text-muted)', marginLeft: '4px' }}>Full Name</label>
                <div style={{ position: 'relative' }}>
                  <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    value={booking.customerName}
                    onChange={(e) => setBooking({ ...booking, customerName: e.target.value })}
                    style={{ width: '100%', padding: '16px 16px 16px 48px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '16px', color: 'white', fontSize: '16px' }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '14px', color: 'var(--text-muted)', marginLeft: '4px' }}>Phone Number</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary)' }} />
                  <input 
                    type="tel" 
                    placeholder="+91 9876543210"
                    value={booking.phone}
                    onChange={(e) => setBooking({ ...booking, phone: e.target.value })}
                    style={{ width: '100%', padding: '16px 16px 16px 48px', background: 'var(--glass-bg)', border: '1px solid var(--glass-border)', borderRadius: '16px', color: 'white', fontSize: '16px' }}
                  />
                </div>
              </div>
            </div>
            <Button 
              size="lg" 
              disabled={!booking.customerName || !booking.phone}
              onClick={() => nextStep()}
              style={{ marginTop: '12px' }}
            >
              Verify & Book
            </Button>
          </div>
        );
      case 5: // Confirmation Summary
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '900', textAlign: 'center' }}>Booking Summary</h3>
            <div style={{ background: 'var(--glass-bg)', borderRadius: '24px', border: '1px solid var(--glass-border)', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Service</span>
                <span style={{ fontWeight: 'bold' }}>{booking.service.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Stylist</span>
                <span style={{ fontWeight: 'bold' }}>{booking.staff.name}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Time</span>
                <div>
                  <div style={{ fontWeight: 'bold', textAlign: 'right' }}>{booking.slot}</div>
                  <div style={{ fontSize: '12px', color: 'var(--primary)', textAlign: 'right' }}>{booking.date.full}</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Amount</span>
                <span style={{ fontWeight: 'bold', color: 'var(--success)', fontSize: '18px' }}>₹{booking.service.price}</span>
              </div>
            </div>
            <div style={{ padding: '16px', borderRadius: '16px', background: 'rgba(99, 102, 241, 0.1)', border: '1px dashed var(--primary)', display: 'flex', gap: '12px', alignItems: 'center' }}>
              <Info size={20} color="var(--primary)" />
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>You will pay at the salon after your service.</div>
            </div>
            <Button size="lg" onClick={handleConfirm} disabled={loading}>
              {loading ? 'Processing...' : 'Confirm Appointment'}
            </Button>
            <Button variant="ghost" onClick={prevStep}>Change Details</Button>
          </div>
        );
      case 6: // Success
        return (
          <div style={{ textAlign: 'center', padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', inset: -20, background: 'var(--success)', borderRadius: '50%', filter: 'blur(30px)', opacity: 0.3 }}></div>
              <div style={{ position: 'relative', width: '100px', height: '100px', borderRadius: '50%', background: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', boxShadow: '0 10px 20px rgba(16, 185, 129, 0.4)' }}>
                <CheckCircle2 size={56} />
              </div>
            </div>
            <div>
              <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '8px' }}>Booking Confirmed!</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '16px' }}>We've reserved your slot at Elite Beauty.</p>
            </div>
            <div style={{ background: 'var(--glass-bg)', padding: '24px', borderRadius: '24px', border: '1px solid var(--glass-border)', width: '100%', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: 'var(--success)', marginBottom: '16px' }}>
                <Smartphone size={18} />
                <span style={{ fontWeight: '600' }}>Confirmation sent to {booking.phone}</span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Please arrive 10 minutes before your appointment time ({booking.slot}). Show this screen at the reception.
              </div>
            </div>
            <Button style={{ width: '100%', padding: '16px' }} onClick={() => setStep(0)}>Book Another Service</Button>
          </div>
        );
      default: return null;
    }
  };

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--background)', color: 'white' }}>Loading Boutique...</div>;

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'var(--background)', 
      color: 'white', 
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{ padding: '32px 24px', background: 'var(--card-bg)', borderBottom: '1px solid var(--glass-border)', textAlign: 'center' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '900', letterSpacing: '-0.5px' }}>{branchInfo?.name || 'Elite Beauty'} <span style={{ color: 'var(--primary)' }}>& Spa</span></h1>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
          <MapPin size={12} /> {branchInfo?.location || 'Bangalore'}
        </div>
      </div>

      <div style={{ flex: 1, padding: '24px', maxWidth: '500px', margin: '0 auto', width: '100%' }}>
        {renderStep()}
      </div>

      {step > 0 && step < 6 && (
        <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '11px' }}>
          By continuing, you agree to receive a confirmation via WhatsApp.
        </div>
      )}
    </div>
  );
};

export default QRBooking;
