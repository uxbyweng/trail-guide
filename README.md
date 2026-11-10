# Trail Guide

A small hiking trail directory. Browse trails by region on a server-rendered site, manage them in an admin panel, or use the JSON API.

> **Status:** early stage. The project skeleton is in place, features are being added step by step.

## Stack

- [Bun](https://bun.com) and TypeScript
- Express 5 with Nunjucks templates and [Pico.css](https://picocss.com)
- SQLite
- sanitize-html for user-supplied descriptions

## Getting started

Requires [Bun](https://bun.com). SQLite comes built in via `bun:sqlite`, nothing else to install.

```bash
bun install
cp .env.example .env
bun run db:seed
bun run dev
```

`db:seed` creates the tables and loads sample data from `src/db/seed.sql`. Running it again resets the database.

| Variable  | Purpose                                |
| --------- | -------------------------------------- |
| `PORT`    | Port the server listens on             |
| `DB_PATH` | Path to the SQLite file                |
| `API_KEY` | Key required for write requests to API |

## Pages

| Path                         | Description                  |
| ---------------------------- | ---------------------------- |
| `/`                          | All trails, newest first     |
| `/trails/:slug`              | Trail details                |
| `/regions`, `/regions/:slug` | Regions and their trails     |
| `/admin`                     | Create, edit and delete trails |

## API

Read endpoints are open. Write endpoints need an `x-api-key` header.

| Method   | Path                      | Description              |
| -------- | ------------------------- | ------------------------ |
| `GET`    | `/api/trails`             | List trails              |
| `GET`    | `/api/trails/:slug`       | Single trail             |
| `GET`    | `/api/regions`            | List regions             |
| `GET`    | `/api/regions/:slug/trails` | Trails of one region   |
| `POST`   | `/api/trails`             | Create a trail           |
| `PUT`    | `/api/trails/:id`         | Replace a trail          |
| `DELETE` | `/api/trails/:id`         | Delete a trail           |

## Structure

```
src/
  routes/       maps paths to controller functions
  controllers/  reads the request, sends the response
  models/       all SQL lives here, queries are parameterized
  middleware/   request logger, API key check
  db/           connection, schema and seed data, SQLite file
views/          Nunjucks templates and macros
public/         static files
```
