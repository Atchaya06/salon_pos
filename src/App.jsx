import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import POS from './features/pos/POS';
import CRM from './features/crm/CRM';
import Appointments from './features/appointments/Appointments';
import Inventory from './features/inventory/Inventory';
import Staff from './features/staff/Staff';
import Settings from './features/admin/Settings';
import QRBooking from './features/appointments/QRBooking';
import Reports from './features/reports/Reports';
import Enquiry from './features/crm/Enquiry';
import Feedback from './features/crm/Feedback';

function App() {
  return (
    <Router>
      <Routes>
        {/* Customer Facing Booking */}
        <Route path="/book/:branchId" element={<QRBooking />} />

        {/* Admin Dashboard Application */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="pos" element={<POS />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="crm" element={<CRM />} />
          <Route path="enquiry" element={<Enquiry />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="feedbacks" element={<Feedback />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/:reportType" element={<Reports />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="staff" element={<Staff />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
