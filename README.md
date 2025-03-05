# URL Shortener

A full-stack URL shortener application built with React, NestJS, and Drizzle ORM.

## Features

- Shorten long URLs to make them easier to share
- Custom slug support for personalized short URLs
- Copy to clipboard functionality
- URL validation
- Visit tracking for shortened URLs
- Docker containerization for easy deployment

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Vite for fast development

### Backend
- NestJS with TypeScript
- Drizzle ORM for database operations
- PostgreSQL for data storage

### DevOps
- Docker and Docker Compose for containerization

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v8 or higher)
- Docker and Docker Compose

### Running with Docker

The easiest way to run the application is using Docker Compose:

```bash
# Clone the repository
git clone <repository-url>
cd url-shortener

# Start the application with Docker Compose
docker-compose up
```

This will start:
- PostgreSQL database on port 5432
- Backend API on port 3000
- Frontend on port 5173

### Running Locally (Development)

If you prefer to run the application locally:

```bash
# Install dependencies
pnpm install

# Start the backend
cd packages/backend
pnpm run start:dev

# In another terminal, start the frontend
cd packages/frontend
pnpm run dev
```

## API Endpoints

- `POST /api/shorten` - Create a shortened URL
- `GET /:slug` - Redirect to the original URL
- `GET /api/url/:slug` - Get details about a shortened URL

## License

MIT 