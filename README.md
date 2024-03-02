# Rails + Next.js + Tailwind Boilerplate

## Description

This is a boilerplate for a Next.js frontend and a Rails backend. It is designed to be a starting point for a full-stack web application.

**Key features included in this boilerplate are:**
  - A ready-to-use Landing Page
  - User Authentication setup
  - User Onboarding Flow
  - Stripe Integration for secure payment handling

## Installation

Install rails dependencies
```bash
 bundle install
```

Install frontend dependencies
```bash
 cd client && npm install
```

## Usage

Use Procfile.dev to start both servers.
```bash
 foreman start -f Procfile.dev
```


or start the servers individually


Start the Rails server.
```bash
 rails s
```

Start the Next.js server.
```bash
 cd client && npm run dev
```
