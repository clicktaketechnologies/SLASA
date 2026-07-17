# Slasa Academy 🎓

Slasa Academy is a premium education and tuition center based in Nottingham, providing exceptional learning support for pupils across Key Stage 1 (KS1), Key Stage 2 (KS2), Key Stage 3 (KS3), GCSE, and specialized courses such as 11+ exam preparation and Urdu language studies.

This repository houses the full-stack web application of Slasa Academy, built using React, TypeScript, Tailwind CSS, and integrated with Google Firebase (Authentication & Firestore) to support real-time data flow, lead registration, and specialized user portals.

---

## 🚀 Key Features

### 🌟 Public Website
*   **Intuitive Course Navigator**: Dynamic courses database filtering by age groups, level, or subject.
*   **Interactive Tuition Calculator**: Instant quote generation based on educational key stages and selected study subjects.
*   **Active Tutors & Staff Gallery**: Get to know the dedicated tutors and academic heads behind our students' success.
*   **Visual Student Gallery**: Showcasing student achievements, art, classroom moments, and academic progress.
*   **Pricing & Registration System**: Transparent fee structure and an integrated online registration/lead submission form.
*   **GCSE Retakes Portal**: Dedicated guidance and streamlined sign-ups for revision courses and exam retakes.
*   **Direct WhatsApp Chat Integration**: One-click floating support button connecting parents directly with academy coordinators.
*   **Interactive Venue Finder**: Detailed Nottingham center location information, venue features, and contact details.
*   **News & Academy Updates**: Up-to-date information on GCSE retakes, course registration dates, and academy updates.

### 🔐 Interactive User Portals (Role-Based Dashboards)
*   **Admin Dashboard**:
    *   **Real-time Analytics**: Tracks student count, active leads, courses, and pending feedback.
    *   **Lead & CMS Management**: View, filter, and contact prospective leads. Dynamically manage courses, lessons, and galleries.
    *   **User Management**: Authorize and manage roles for teachers, students, parents, and administrative staff.
*   **Teacher Portal**:
    *   Manage weekly student lessons and resource materials.
    *   Provide feedback and grading on student submissions.
*   **Student Portal**:
    *   Access registered courses, active lesson materials, and assignments.
    *   Submit homework/assignments and track grading feedback.
*   **Parent Portal**:
    *   Track children's progress, teacher feedback, and course status.

---

## 🗝️ Admin Portal & Access Credentials

To access the administrative dashboard, CMS settings, or student portals, navigate to the **Login Portal**:
*   **Login Page Link**: [Slasa Academy Login Portal](https://ais-pre-o2mvvxjw22god2d5ototxi-56455435001.asia-east1.run.app/login)
*   **Subsequent Admin Path**: `/admin` (accessible automatically once authorized as an administrative role).

### 🔑 Authentication Details

You can log in and manage the application using either of the following two methods:

#### Method A: Demo Admin Account (Seeded Instantly)
This is the recommended approach for quick testing and overview of administrative operations.
*   **Email**: `admin@example.com`
*   **Password**: `password123`
*   **Role Assigned**: `super_admin`
*   **How to Activate**: Simply head to the [Login page](https://ais-pre-o2mvvxjw22god2d5ototxi-56455435001.asia-east1.run.app/login) and click the **"Seed Demo Admin Account"** button. This instantly provisions and registers the default administrator profile in your Firebase Auth and Firestore database.

#### Method B: Google Authentication (Self-Promotion)
*   **Admin Email**: `clicktaketechnologies@gmail.com`
*   **Role Assigned**: `super_admin`
*   **How to Activate**: Go to the login page and click **"Google Account"** to sign in. The application automatically detects this specific email address and grants full `super_admin` credentials to your session on the first sign-in.

---

## 🛠️ Technology Stack

*   **Frontend**: React 18, Vite (for ultra-fast builds), TypeScript (for strict type-safety), Framer Motion (for polished, smooth UI animations).
*   **Styling**: Tailwind CSS (fully customized theme colors and modern fluid layout utilities).
*   **Icons**: Lucide React.
*   **Backend & Persistence**: 
    *   **Firebase Firestore**: Real-time cloud-hosted NoSQL database.
    *   **Firebase Authentication**: Secure user login and role assignment.
    *   **Firestore Security Rules**: Hardened database schema and permission matrices to ensure maximum privacy of student/parent data.

---

## 📦 Directory Structure

```bash
├── firebase-blueprint.json    # Initial Firestore database schema
├── firestore.rules            # Hardened Firestore security rules
├── firebase-applet-config.json# Firebase environment configuration
├── src/
│   ├── admin/                 # Admin, CMS, and Role-specific Dashboards
│   ├── components/            # Shared UI components (Navbar, Footer, etc.)
│   ├── pages/                 # Public pages (Home, About, Tuition, Courses, contact, etc.)
│   ├── firebase.ts            # Firebase initialization & global error handlers
│   ├── types.ts               # Strict TypeScript definitions
│   └── App.tsx                # Main Router and entry layout
└── package.json               # Scripts and dependency manifests
```

---

## ⚙️ Setup and Installation

### 1. Prerequisites
Make sure you have Node.js (v18 or higher) installed on your system.

### 2. Clone the Repository
```bash
git clone https://github.com/clicktaketechnologies/SLASA.git
cd SLASA
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Setup Environment Config
Create or edit your Firebase configuration inside `firebase-applet-config.json` with your real Firebase web app credentials:
```json
{
  "projectId": "YOUR_PROJECT_ID",
  "appId": "YOUR_APP_ID",
  "apiKey": "YOUR_API_KEY",
  "authDomain": "YOUR_AUTH_DOMAIN",
  "firestoreDatabaseId": "(default)",
  "storageBucket": "YOUR_STORAGE_BUCKET",
  "messagingSenderId": "YOUR_SENDER_ID"
}
```

### 5. Running the Application locally
Launch the development server on port 3000:
```bash
npm run dev
```

### 6. Building for Production
Bundle the optimized static files into the `dist/` directory:
```bash
npm run build
```

---

## 🔒 Security & Rules Deploy

To deploy or secure your Firestore database, compile and push the `firestore.rules`:
```bash
firebase deploy --only firestore:rules
```

The database is structured to deny unauthorized public writes, securing all sensitive leads, user accounts, and lesson materials behind verified role verification checks (such as `isAdmin()` or `isTeacher()`).

---

## 📄 License

This project is licensed under the MIT License.
