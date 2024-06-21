# Uber-like Taxi Service Web Application

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a web application designed to solve the common problem of fare exploitation in ride-sharing services like Uber and Ola. Often, drivers demand extra fare over the metered amount, claiming that they won't get a return fare from certain areas. This web application includes a unique feature for drivers: Order Density Calculation, which recommends drivers the nearest places where they are more likely to get rides. This helps drivers find passengers more efficiently and ensures fair pricing for customers.

## Features

- **Customer Dashboard**: Allows users to select their pickup and drop-off locations, calculate distances, and send location data.
- **Driver Recommendations**: Provides drivers with the best nearby areas to find passengers based on real-time order density calculations.
- **Real-Time Updates**: Ensures seamless communication and updates between customers and drivers through WebSockets.
- **Fair Pricing**: Helps to eliminate fare exploitation by ensuring that customers are charged a fair fare without any added charges.

## Technologies Used

### Frontend:

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Google Maps API](https://developers.google.com/maps)

### Backend:

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

### Database:

- [PostgreSQL](https://www.postgresql.org/)
- [Prisma ORM](https://www.prisma.io/)

### Caching:

- [Redis](https://redis.io/)

### Authentication:

- [NextAuth.js](https://next-auth.js.org/)

### Containerization:

- [Docker](https://www.docker.com/)

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/uber-like-taxi-service.git
   cd uber-like-taxi-service
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables by creating a `.env` file in the root directory:

   ```env
   NEXT_PUBLIC_GOOGLE_API_KEY=your_google_api_key
   NEXTAUTH_URL=http://localhost:3000
   DATABASE_URL=postgresql://user:password@localhost:5432/yourdatabase
   REDIS_URL=redis://localhost:6379
   ```

4. Start the PostgreSQL and Redis services using Docker:

   ```sh
   docker-compose up -d
   ```

5. Migrate the database schema:

   ```sh
   npx prisma migrate deploy
   ```

6. Start the development server:

   ```sh
   npm run dev
   ```

## Usage

1. Navigate to `http://localhost:3000` in your web browser.
2. Sign in using the login button on the home page.
3. Use the customer dashboard to select your pickup and drop-off locations.
4. The dashboard will show the nearest areas with high order density based on real-time data.

## Project Structure

```plaintext
├── components
│   ├── CustomerDashboard.tsx
│   └── DriverDashboard.tsx
├── pages
│   ├── api
│   │   └── finddrivers.ts
│   ├── _app.tsx
│   ├── index.tsx
│   └── ...
├── public
│   └── ...
├── styles
│   └── globals.css
├── utils
│   └── ...
├── prisma
│   ├── schema.prisma
│   └── ...
├── docker-compose.yml
├── package.json
└── ...
```
