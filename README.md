# Frontend Task – PDF Generator App

A **Next.js + TypeScript** application built as part of a frontend internship assignment.  
The app collects user information, previews it in a PDF format, and allows the user to download the generated PDF.

---

## Features
- **User Form Page**
  - Fields: Name, Email, Phone Number, Position, Description
  - Validations:
    - Required fields: Name, Email, Phone Number
    - Valid email format
    - Phone number ≥ 10 digits
  - Actions:
    - **View PDF** → Navigate to PDF preview page
    - **Download PDF** → Directly download the generated PDF

- **PDF Preview Page**
  - Displays the entered data in a PDF layout
  - Allows downloading the generated PDF
  - Option to go back to the form with data intact

- **Enhancements**
  - Added **Framer Motion** for smooth page transitions and animations
  - Implemented **Local Storage** to persist form data even after page refresh

---

## Tech Stack
- **Next.js** (React Framework)
- **TypeScript**
- **Tailwind CSS** (styling)
- **Framer Motion** (animations)
- **jsPDF / pdf-lib** (PDF generation)
- **Local Storage API** (data persistence)

---

## Getting Started

### Prerequisites
- Node.js ≥ 16.x
- npm or yarn

### Installation
```bash
# Clone the repo
git clone https://github.com/gunjanghate/frontend-task.git

# Navigate into the project directory
cd frontend-task

# Install dependencies
npm install
