# Admission Bridge - Global University Portal

**Admission Bridge** is a modern, full-stack university exploration and application platform. It helps students find their dream universities based on budget, evaluate their eligibility (GPA/IELTS), compare different institutions side-by-side, and apply through a seamless multi-step process.

---

## 🔗 Live Demo
 [Live Website URL](https://admission-bridge-web.vercel.app/)

---

## Key Features

### 1. Smart Filtering & Eligibility Check

- **Dynamic Budget Slider:** Filter universities based on maximum tuition fees in real-time.
- **Real-time Eligibility:** Enter your GPA and IELTS score to instantly see which universities you qualify for.
- **Visual Indicators:** "Not Eligible" badges and disabled buttons prevent students from applying to universities they don't qualify for.

---

### 2. Side-by-Side Comparison Tool

- Select up to 3 universities using checkboxes on the cards.
- A floating **"Compare Now"** button appears when at least 2 are selected.
- **Comparison Modal:** A clean table view comparing Country, Tuition Fee, GPA, and IELTS requirements.

---

### 3. Quick Apply (Multi-step Form)

- **Step 1:** Personal Information (Full Name, Email)
- **Step 2:** Academic Information (GPA, IELTS)
- **Backend Validation:** The server strictly rejects applications if the student's scores are lower than the university's minimum requirements.

---

## Tech Stack

- **Frontend:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Database:** MongoDB Atlas
- **ODM:** Mongoose

---

## Project Structure

```text
├── src/
│   ├── app/                # Next.js App Router (Pages & API)
│   │   ├── api/            # Backend API routes (universities, apply)
│   │   └── page.js         # Main Dashboard
│   ├── components/         # Reusable UI Components
│   │   ├── ApplyModal.jsx
│   │   ├── CompareModal.jsx
│   │   ├── HeroSection.jsx
│   │   ├── UniversityCard.jsx
│   │   └── UniversityList.jsx
│   ├── lib/                # Database connection utility (dbConnect.js)
│   └── models/             # Mongoose Schemas (University, Application)
├── .env.local              # Environment variables
└── package.json            # Project dependencies
```

---

## Installation & Setup

Clone the repository:

```bash
git clone https://github.com/mahadi40011/admission-bridge.git
cd admission-bridge
```

Install dependencies:

```bash
npm install
```

---

## Environment Variables

Create a `.env.local` file and add:

```bash
MONGODB_URI=your_mongodb_connection_string
```

---

## Run the Development Server

```bash
npm run dev
```

---

### Status
Everything is correctly formatted, organized, and **GitHub-ready**.

