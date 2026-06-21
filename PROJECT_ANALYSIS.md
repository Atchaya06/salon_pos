# SalonCloud — Project Analysis

> **Stack:** React 19 + Vite 8 · React Router v7 · Lucide React · Recharts · Framer Motion · date-fns  
> **Architecture:** Single-Page App with a fixed Sidebar layout and feature-based module structure  
> **Data Layer:** `localStorage`-persisted inventory; all other data currently uses mock/static arrays

---

## 📁 Project Structure

```
D:\salon\
├── src/
│   ├── App.jsx                  # Root router — all routes defined here
│   ├── main.jsx                 # React entry point
│   ├── components/
│   │   ├── Navbar.jsx           # Top navigation bar (public website)
│   │   ├── Sidebar.jsx          # Admin sidebar navigation
│   │   ├── ui/                  # Reusable UI components (Button, Card, DateRangeFilter)
│   │   └── appointments/
│   │       └── DateTimePicker.jsx
│   ├── features/                # Feature modules (main business logic)
│   │   ├── appointments/
│   │   │   ├── Appointments.jsx
│   │   │   └── QRBooking.jsx
│   │   ├── crm/
│   │   │   ├── CRM.jsx          # Clients module
│   │   │   ├── Enquiry.jsx
│   │   │   └── Feedback.jsx
│   │   ├── pos/
│   │   │   ├── POS.jsx          # Point of Sale + Billing
│   │   │   └── CheckoutModal.jsx
│   │   ├── reports/
│   │   │   └── Reports.jsx
│   │   ├── inventory/
│   │   │   └── Inventory.jsx
│   │   ├── staff/
│   │   │   └── Staff.jsx
│   │   └── admin/
│   │       └── Settings.jsx
│   ├── data/
│   │   └── inventoryData.js     # Shared product/service catalog (localStorage)
│   ├── pages/
│   │   └── Dashboard.jsx
│   ├── layouts/
│   │   └── MainLayout.jsx
│   ├── hooks/
│   ├── styles/
│   ├── types/
│   └── utils/
└── public/
```

---

## 🗺️ Routing Map

| Route | Component | Access |
|---|---|---|
| `/book/:branchId` | `QRBooking` | Public (customer-facing) |
| `/dashboard` | `Dashboard` | Admin |
| `/pos` | `POS` | Admin |
| `/appointments` | `Appointments` | Admin |
| `/crm` | `CRM` (Clients) | Admin |
| `/enquiry` | `Enquiry` | Admin |
| `/feedback` | `Feedback` | Admin |
| `/reports` | `Reports` | Admin |
| `/reports/:reportType` | `Reports` | Admin |
| `/inventory` | `Inventory` | Admin |
| `/staff` | `Staff` | Admin |
| `/settings` | `Settings` | Admin |

---

## 🧩 Modules & Features

---

### 1. 🏠 Dashboard (`/dashboard`)
**Purpose:** Overview of salon performance metrics.

**UI Elements:**
- KPI summary cards
- Sales charts (Recharts)
- Recent activity feed

---

### 2. 📅 Appointments (`/appointments`)
**Purpose:** Visual calendar scheduler + online appointment list.

**Views:**
| View | Description |
|---|---|
| **Timeline View** | Grid showing staff columns × time slots (9 AM – 8 PM) |
| **Appointment List** | Table of web/online bookings |

**Timeline Grid Fields:**
- Staff columns: Name, Role, Color tag
- Time slots: 09:00 AM – 08:00 PM (hourly)
- Booking card: Customer name, Service, Duration

**Appointment List Table Columns:**
`#` · `Date Appt` · `Time` · `Date Booking` · `Client Name` · `Number` · `Amount` · `Service Name` · `Action (View / Edit / Delete)`

**Mock Staff:**
| Name | Role |
|---|---|
| Fathima | Senior Stylist |
| Priya | Skin Specialist |
| Karan | Artist |
| Suresh | Stylist |

---

### 3. 🌐 QR Booking (`/book/:branchId`)
**Purpose:** Customer-facing self-booking page accessed via QR code at branch.

**Fields:**
- Branch selection (from URL param)
- Service selection
- Date & Time picker (`DateTimePicker` component)
- Client name, phone
- Confirmation flow

---

### 4. 👥 Clients / CRM (`/crm`)
**Purpose:** Full client database with segmentation and filtering.

**Segment Cards (KPIs):**
| Segment | Metric |
|---|---|
| Existing Clients | 9,213 |
| Active | 1,170 |
| Churn Risk | 853 |
| Defected | 6,884 |

**Filter Fields:**
| Field | Type |
|---|---|
| Client ID | Text input |
| Client Name | Text input |
| Contact Number | Text input |
| Source | Dropdown (Walk-in, Instagram, Facebook, Client Reference, Flex, Social Media, Cold Calling, Twitter, Website, Flyer, Newspaper, SMS, Street Hoardings, Event, TV/Radio) |
| Assigned To | Dropdown (staff list) |
| Service | Text input |
| Gender | Dropdown (Male / Female / Other) |

**Client Table Columns:**
`☐` · `ID` · `Name` · `Contact` · `Invite Code` · `First Visit` · `Last Visit` · `Last Service` · `Provider` · `Bill Amount` · `Gender` · `Points` · `Action (View / Delete)`

**Actions:** Add New Client · Export · Upload (bulk import)

---

### 5. 📋 Enquiry (`/enquiry`)
**Purpose:** Lead management — log incoming enquiries and track follow-up.

**Add Enquiry Form Fields:**
| Field | Type | Required |
|---|---|---|
| Contact Number | Text | ✅ |
| Client Name | Text | ✅ |
| Enquiry For | Autocomplete (services) | ✅ |
| Enquiry Type | Dropdown (Hot / Cold / Warm) | ✅ |
| Response | Text | — |
| Date to Follow | Date picker | ✅ |
| Source of Enquiry | Dropdown (same as CRM source list) | ✅ |
| Lead Representative | Dropdown (Admin / Reception) | — |
| Lead Status | Dropdown (Pending / Converted / Close) | ✅ |

**Enquiry List Filter Fields:**
`Date to Follow` · `Enquiry For` · `Lead Representative` · `Enquiry Type`

**Enquiry Table Columns:**
`☐` · `Name` · `Phone` · `Date to Follow` · `Lead Type (Hot🔴/Cold🔵)` · `Enquiry For` · `Action (Edit / Delete)`

**Actions:** Export · Send SMS

---

### 6. 💬 Feedback (`/feedback`)
**Purpose:** Collect and display client feedback/reviews.

---

### 7. 🛒 POS / Billing (`/pos`)
**Purpose:** Point-of-sale system for in-salon billing with inventory integration.

**Tabs:**
| Tab | Description |
|---|---|
| **Billing POS** | Full checkout screen |
| **Wallet Reload** | Top-up client wallet balance |

#### Billing POS Layout

**Left Panel — Product/Service Catalog:**
- Customer search bar (name or mobile) / Walk-in button
- Service/product search bar (barcode support)
- **Keyboard Shortcuts:** `/` or `F2` = focus search · `F8` = open pay
- **Category Tabs:** All · Hair · Skin · Retail · Membership

**Item Card Fields:**
`Icon` · `Name` · `Type badge (Service / Product / Membership)` · `Stock level` · `Price (₹)` · `+ Add button`

**Right Panel — Cart & Billing:**
- Cart item: Name · Type · GST% · Qty controls · Staff selector · Line total
- **Billing Fields:**
  | Field | Description |
  |---|---|
  | Bill Type | GST / non-GST |
  | Discount | Flat (INR) or Percentage |
  | Advance Received | Pre-paid amount |
  | Amount Payable | Auto-calculated |
  | Due / Credit | Balance after payment |
- **Summary:** Subtotal · GST (5%/18%) · Grand Total
- **Payment Modes:** Cash · Card · UPI · Wallet · Print
- **Quick Actions:** Pay (F8) · Fast Cash Checkout (⚡)

#### Wallet Reload Tab Fields:
`Date` · `Client Name` · `Contact Number` · `Amount Paid` · `Payment Mode (Cash/Card/UPI)` · `Amount to Credit` · `Description` · `Send Receipt checkbox`

**Client 360° View (Wallet Tab):**
Branch · Last Visit · Total Visits · Total Spendings · Membership · Active Packages · Last Feedback · Wallet Balance · Reward Points · Gender · Date of Birth · Anniversary · Source of Client

---

### 8. 📦 Inventory (`/inventory`)
**Purpose:** Track retail stock, raw material consumption, and reorder levels.

**KPI Cards:**
| Card | Value |
|---|---|
| Total Items | 124 |
| Low Stock Alert | 8 items |
| Stock Value | ₹84,500 |
| Consumption MTD | ₹12,400 |

**Tabs:**
| Tab | Description |
|---|---|
| **Stock List** | Full product catalog with live stock |
| **Inventory Transactions** | Log of usage and stock-add events |

**Stock List Filter Fields:**
`Search Product / ID` · `Category (All / Retail / Raw Material)` · `Status (All / In Stock / Low Stock)`

**Stock List Table Columns:**
`☐` · `Product ID (INV-001)` · `Product Name` · `Category` · `Stock Available` · `Reorder Level` · `Price` · `GST %` · `Status (IN STOCK / LOW STOCK)` · `Action (Edit / Delete)`

**Inventory Transactions Table Columns:**
`Date & Time` · `Product` · `Type (Usage🔴 / Stock Add🟢)` · `Quantity` · `Reason/Details` · `User`

**Add Stock Modal Fields:**
`Select Product` · `Quantity` · `Unit (ml / L / g / kg / Pcs)` · `Purchase Date` · `Remarks / Bill No.`

#### Product/Service Catalog (`inventoryData.js`)
| Category | Type | Examples |
|---|---|---|
| Hair | Service | Haircut (Classic) ₹450, Beard Trim ₹200, Hair Color (Global) ₹2200, Keratin Treatment ₹3500 |
| Skin | Service | Hydra Facial ₹1500, Cleanup ₹700, D-Tan Pack ₹600 |
| Retail | Product | Loreal Shampoo, Hair Serum, SPF Sunscreen, D-Tan Cream, Color Kit, Keratin Prep |
| Membership | Wallet | Gold Wallet Plan ₹5000 (value ₹7000), Silver Wallet Plan ₹2000 (value ₹2600) |

**Stock deduction happens automatically at POS checkout.**

---

### 9. 👨‍💼 Staff & Commissions (`/staff`)
**Purpose:** Manage employee directory, track commission earnings, and view daily service logs.

**KPI Cards:**
`Top Performer` · `Global Commission (₹15,240)` · `Active Staff (8 Members)`

**Employee Directory Table Columns:**
`Staff Member` · `Role` · `Revenue` · `Commission %` · `Earned`

**Staff Detail Panel:**
- Avatar, Name, Role
- Phone · View Schedule
- Performance progress bar (Target vs Achieved %)
- Generate Pay Slip button

**Daily Attendance & Earnings Log Columns:**
`Time` · `Service Details` · `Client` · `Price` · `Commission %` · `Earned`

**Sample Staff Data:**
| Name | Role | Commission |
|---|---|---|
| Fathima | Senior Stylist | 15% |
| Priya | Skin Specialist | 12% |
| Karan | Artist | 10% |
| Suresh | Stylist | 10% |

---

### 10. 📊 Reports (`/reports`)
**Purpose:** Financial, operational, and HR reporting with date-range filtering.

**Report Types (Tabs):**
| Report | Key Columns |
|---|---|
| **Daily Reports** | Date · Service Amt · Product Amt · Package · Membership · Pending · Advance · Discount · Net Sale · Tax · Grand Total · Cash · Online · Wallet |
| **Day Summary** | Cards: Total Sales · Payment Methods · Sales Breakdown · Additional Amounts · Tax Breakdown · Discount & Pending |
| **Billing Reports** | Date · Bill Type · Invoice ID · Client · Contact · Total · Paid · Payment Detail · Pending · Type · Products/Services · Remarks · User |
| **Enquiry Reports** | Name · Email · Phone · Date to Follow · Lead Type · Enquiry For · Action |
| **Service Provider Reports** | Date · Provider · Contact · Service/Product · Price · Commission |
| **Received Pending Payments** | Date · Client · Invoice · Total Amount · Pending Amount · Status |
| **Balance Reports** | S.No · Date · Description · Opening Balance · Credit · Debit · Closing Balance |
| **Attendance Report** | Monthly grid: Day → In · Out · Total Hrs · Status (P/A/W) |

**Global Controls:** Date Range Filter · Export · Refresh · Print

---

### 11. ⚙️ Settings (`/settings`)
**Purpose:** Admin/branch configuration.

---

## 🔄 Key Workflows

### Billing Workflow
```
Customer arrives
    → POS: Search customer (or Walk-in)
    → Select services/products from catalog (category-filtered)
    → Assign staff per item
    → Apply discount (flat or %)
    → Review: Subtotal → GST → Grand Total
    → Pay (F8): Choose Cash / Card / UPI / Wallet
    → Confirm checkout → Stock auto-deducted → Invoice generated
```

### Enquiry → Conversion Workflow
```
Enquiry received (walk-in / phone / social media)
    → Log in Enquiry module (contact, service interest, lead type)
    → Assign follow-up date & lead representative
    → Track status: Pending → Converted / Closed
    → Send SMS reminder
    → On conversion: book Appointment or walk to POS
```

### Inventory Replenishment Workflow
```
Inventory module → Stock List
    → Identify LOW STOCK items (reorder alert)
    → Click "Add Stock" → Select product, qty, unit, date, bill no.
    → Save → Stock level updated
    → Transactions tab logs the Stock Add event
```

### Appointment Booking Workflow (Online / QR)
```
Customer scans QR code at branch
    → Opens /book/:branchId (QRBooking page)
    → Selects service, preferred date & time, enters details
    → Booking confirmed → appears in Appointments → Appointment List view
```

### Staff Commission Workflow
```
Staff performs service (logged via POS billing)
    → Staff module → Daily Attendance & Earnings Log
    → Commission % applied to each service price
    → Monthly revenue and earned totals displayed
    → Generate Pay Slip button
```

---

## 🎨 UI Design System

| Token | Value / Usage |
|---|---|
| Theme | Dark glassmorphism |
| Primary | Purple/Indigo (`var(--primary)`) |
| Secondary | Teal/Emerald (`var(--secondary)`) |
| Accent | Pink (`var(--accent)`) |
| Card BG | Semi-transparent blur (`var(--card-bg)`) |
| Border | Glass border (`var(--glass-border)`) |
| Icon Library | Lucide React |
| Animations | Framer Motion |
| Charts | Recharts |
| Font | System / CSS variable |

**Sidebar Width:** 260px · **Sticky top · Height:** 100vh

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `react` v19 | UI framework |
| `react-router-dom` v7 | Client-side routing |
| `lucide-react` | Icon set |
| `recharts` | Charts & graphs |
| `framer-motion` | Animations |
| `date-fns` | Date utilities |
| `clsx` + `tailwind-merge` | Class utilities |
| `vite` v8 | Build tool & dev server |

---

*Generated: 2026-03-26 · SalonCloud v0.0.0*
