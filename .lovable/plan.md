# IIT Indore Student Information System

## Overview

A clean, university-standard frontend for course registration and student management, using the IIT Indore logo and a professional blue color scheme matching the brand. All data will be dummy/mock data.

## Pages & Features

### 1. Login Page

- Student ID + password form with IIT Indore branding
- Clean centered card layout

### 2. Dashboard (post-login landing)

- Welcome card with student name, semester info
- Quick-access grid cards to all modules
- Sidebar navigation for all sections

### 3. Profile

- Student photo, name, roll number, department, batch
- Contact info, guardian details
- Editable fields (mock)

### 4. Course Registration

- Available courses table with credits, instructor, schedule
- listing available courses running in currnet and next sem, sirting and filtering based on sen, prof, dept, credits score, registrations, and so on. 
- also  show the courses that can be taken as graded and those taken as audit courses (no credits offered)
- Add/drop courses with confirmation
- Current registered courses summary with total credits

### 6. Result View

- Semester-wise results in table format
- Subject, grade, credits, grade points
- SGPA/CGPA summary

### 7. Gradesheets

- Semester selector dropdown
- Formal gradesheet layout with student details and grades
- Print/download button (mock)

### 8. Attendance

- Course-wise attendance percentage with visual indicators
- Color-coded (green >75%, yellow 65-75%, red <65%)
- Overall attendance summary

### 9. Fee Payment

- Fee breakdown table (tuition, hostel, mess, etc.)
- Payment status badges (paid/pending)
- Mock "Pay Now" button

### 10. Document Upload

- Upload area for documents (ID proof, photos, certificates)
- List of uploaded documents with status
- Mock file picker

## Design

- **Colors**: IIT Indore blue (#2B5EA7) as primary, clean white backgrounds
- **Logo**: IIT Indore logo in navbar and login page
- **Layout**: Sidebar navigation + top header with student info
- **Typography**: Clean, readable fonts
- **Components**: shadcn/ui cards, tables, badges, progress bars
- Responsive design, lazy-loaded routes for performance

## Technical Approach

- React Router for all pages with lazy loading
- Shared sidebar layout component
- Mock data in separate constants files
- Optimized with React.memo and code splitting