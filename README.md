# Student Skill Tracker & Placement Portal

## Overview
A full-stack placement portal with AI-powered ATS, resume builder, and microservices architecture.

## Tech Stack
- **Backend:** Node.js, Express.js, JWT
- **Database:** MongoDB Atlas
- **Frontend:** React.js
- **Architecture:** Microservices (6 services)

## Services
| Service | Port | Purpose |
|---------|------|---------|
| API Gateway | 5000 | Entry point |
| Auth Service | 5001 | Login/Register |
| Student Service | 5002 | Profile & Skills |
| Job Service | 5003 | Job Postings |
| Application Service | 5004 | Applications & ATS |
| Resume Service | 5005 | Resume Builder |
| Frontend | 3000 | React UI |

## Features
-  Student registration & profile
-  Skill tracking with levels
-  AI-powered ATS scoring (skills 60%, experience 20%, education 10%, projects 10%)
-  Resume builder with PDF download
-  Job posting & application
-  Recruiter dashboard with shortlist/select/reject
-  Application tracking

## Setup Instructions

1. Clone repository
2. Install dependencies: `npm install` in each service folder
3. Configure MongoDB Atlas connection in `.env` files
4. Run all services: `npm run dev` (from root)
5. Run frontend: `cd frontend && npm start`

## Demo Credentials
**Student:** student@test.com / 123456
**Recruiter:** recruiter@test.com / 123456

## Project Structure
placement-portal/
├── api-gateway/
├── auth-service/
├── student-service/
├── job-service/
├── application-service/
├── resume-service/
└── frontend/
