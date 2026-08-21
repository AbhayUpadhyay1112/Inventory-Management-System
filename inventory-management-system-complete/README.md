# Inventory Management System

Node.js Intern Assignment: REST API for product inventory management.

## Requirements

- Node.js
- MongoDB
- npm
- Postman (recommended for API testing)

## Technology Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- Morgan
- Nodemon

## Project Structure

```text
inventory-management-system/
├── src/
│   ├── controllers/
│   │   └── productController.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── Product.js
│   │   └── Transaction.js
│   ├── routes/
│   │   └── productRoutes.js
│   ├── utils/
│   │   └── validation.js
│   ├── app.js
│   ├── config.js
│   └── server.js
├── .env.example
├── .gitignore
├── package.json
├── postman_collection.json
└── README.md
```

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env`.

Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Default local MongoDB URI:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/inventory_management
PORT=5000
```

If using MongoDB Atlas, replace `MONGODB_URI` with your Atlas connection string.

### 3. Start MongoDB

Make sure MongoDB is running locally, or use MongoDB Atlas.

### 4. Start development server

```bash
npm run dev
```

Production-style start:

```bash
npm start
```

Expected output:

```text
MongoDB connected
Server running at http://localhost:5000
```

## API Endpoints

Base URL:

```text
http://localhost:5000
```

### Health

```http
GET /health
```

### Create Product

```http
POST /products
Content-Type: application/json
```

Body:

```json
{
  "productName": "Laptop",
  "price": 55000,
  "availableStock": 10
}
```

### Get Products

```http
GET /products
```

### Purchase Product

```http
POST /products/purchase
Content-Type: application/json
```

Body:

```json
{
  "productId": "PRODUCT_ID_HERE",
  "quantity": 2
}
```

### Restock Product

```http
POST /products/restock
Content-Type: application/json
```

Body:

```json
{
  "productId": "PRODUCT_ID_HERE",
  "quantity": 5
}
```

### Transaction History

```http
GET /products/PRODUCT_ID_HERE/history
```

## Business Rules Implemented

- Product name must be unique.
- Product price must be greater than zero.
- Product stock cannot be negative.
- Purchase quantity must be greater than zero.
- Restock quantity must be greater than zero.
- Purchase is rejected when requested quantity exceeds available stock.
- Successful purchase decreases stock.
- Successful restock increases stock.
- Successful purchase/restock creates a transaction record.
- Invalid product IDs return a validation error.
- Missing products return 404.
- Duplicate product names return 409.
- Unknown routes return 404.

## Suggested Test Flow

1. `GET /health`
2. `POST /products`
3. Copy returned `_id`
4. `GET /products`
5. `POST /products/purchase`
6. `POST /products/restock`
7. `GET /products/:productId/history`
8. Test invalid quantity
9. Test insufficient stock
10. Test duplicate product name

## Notes

The implementation uses a conditional stock update for purchases:

```text
availableStock >= requested quantity
```

This prevents a purchase from reducing stock below zero when concurrent requests are received.

For a production system requiring strict atomicity between the inventory update and transaction insert, MongoDB sessions/transactions with a replica set should be used.
