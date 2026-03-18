# News-Aggregator-API

This News-Aggregator-API is built with Node.js and using the MVC pattern. I built this project to deepen my understanding of the APIs and also to learn the basics around deployment. This project allowed me to practice concepts such as CI/CD using GitHub Actions, testing with Jest & SuperTest and deployment via Railway.

## Tech Stack

| Technology | Why |
|---|---|
| Node.js + Express | Industry standard, non-blocking I/O |
| PostgreSQL | Relational data, structured articles |
| Redis | In-memory caching, sub-millisecond lookups |
| Winston | Structured JSON logging for production observability |

## Architecture

News-Aggregator-API is structured off the MVC architecture:
```
utils          → Logger & Normaliser.
services       → Articles, Cache, Fetcher
integrations   → HackerNews & NewsApi
db             → Migrations & Model 
api            → Controllers, Middleware, Routes
```

## Features

- **Structured Logging** — useful logs for developers to handle errors
- **Caching** — caching of articles to not constantly fetch from external APIs
- **Deployment** — online and avaliable at https://news-aggregator-api-production-3e8b.up.railway.app/
- **CI/CD** — automatic GitHub Actions on PR 
- **API** — API endpoints to get articles  

## Running Locally

1. Clone the repo
2. Install dependencies: `npm install`
3. Copy env file: `cp .env.example .env` and fill in values
4. Start Postgres and Redis: `docker-compose up -d`
5. Run migrations: `npm run migrate`
6. Start the server: `npm run dev`

## Testing

Integrations tests using Jest and SuperTest.

Run all tests:
```bash
npm test
```

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | /health | Health check |
| GET | /articles | Paginated list of articles |
| GET | /articles/:id | Single article by ID |
| GET | /articles?page=2&limit=20&category=tech | Filtered and paginated |
| GET | /sources | List of available sources |
| POST | /fetch | Fetch latest articles from external APIs |
