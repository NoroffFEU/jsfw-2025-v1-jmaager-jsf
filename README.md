# GreenCart (JS Frameworks Assignment)

Online shop built with Next.js (App Router), React, TypeScript (strict mode), and Bootstrap.

## Features

- Product list fetched from Noroff API (`GET /online-shop`)
- Product detail page (`GET /online-shop/:id`)
- Search + sorting on homepage
- Cart with quantity updates, remove item, and total calculation
- Checkout success page that clears cart
- Contact form with TypeScript validation:
  - Full Name (min 3)
  - Subject (min 3)
  - Email (valid format)
  - Message (min 10)
- Responsive UI for desktop, tablet, and mobile

## Stack

- Next.js 16
- React 19
- TypeScript (strict)
- Bootstrap 5

## Environment variables

Copy [.env.example](.env.example) to `.env.local` and fill values:

```bash
NEXT_PUBLIC_NOROFF_API_BASE_URL=https://v2.api.noroff.dev
NEXT_PUBLIC_NOROFF_API_KEY=your_api_key
```

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Main routes

- `/` Home (search/sort/list)
- `/product/[id]` Product detail
- `/cart` Cart page
- `/checkout/success` Success page
- `/contact` Contact form
