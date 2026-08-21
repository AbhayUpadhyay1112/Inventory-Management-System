# Inventory Management System

A RESTful Inventory Management System built with **Node.js, Express.js, MongoDB, and Mongoose**.

## 🚀 Features

- Create products
- Get all products
- Purchase products
- Restock products
- Product transaction history
- Stock validation
- Duplicate product validation
- Centralized error handling
- MongoDB database integration
- Postman API collection

## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- dotenv
- Morgan
- CORS
- Nodemon
- Postman

## 📁 Project Structure

```text
inventory-management-system/
│
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
│
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── postman_collection.json
├── TEST_CHECKLIST.md
└── README.md

Installation
1. Clone Repository
git clone https://github.com/AbhayUpadhyay1112/Inventory-Management-System.git
2. Enter Project
cd Inventory-Management-System
3. Install Dependencies
npm install
4. Configure Environment

Create a .env file:

PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/inventory_management

For MongoDB Atlas, replace MONGODB_URI with your Atlas connection string.

▶️ Run Application

Development:

npm run dev

Production:

npm start

Expected output:

MongoDB connected
Server running at http://localhost:5000
🔗 API Endpoints

Base URL:

http://localhost:5000
Method	Endpoint	Description
GET	/health	Check API status
POST	/products	Create product
GET	/products	Get all products
POST	/products/purchase	Purchase product
POST	/products/restock	Restock product
GET	/products/:productId/history	Get transaction history
📝 API Examples
Create Product
POST /products
{
  "productName": "Laptop",
  "price": 55000,
  "availableStock": 10
}
Purchase Product
POST /products/purchase
{
  "productId": "PRODUCT_ID",
  "quantity": 2
}

Purchase reduces stock:

10 - 2 = 8
Restock Product
POST /products/restock
{
  "productId": "PRODUCT_ID",
  "quantity": 5
}

Restock increases stock:

8 + 5 = 13
Transaction History
GET /products/PRODUCT_ID/history

Returns purchase and restock transactions.

✅ Business Rules
Product name is required and unique.
Price must be greater than 0.
Stock cannot be negative.
Purchase quantity must be greater than 0.
Restock quantity must be greater than 0.
Purchase cannot exceed available stock.
Successful purchases reduce stock.
Successful restocks increase stock.
Every purchase/restock creates a transaction.
🧪 Postman

Import:

postman_collection.json

The collection contains:

Health
Create Product
Get Products
Purchase Product
Restock Product
Product History
🔐 Environment Security

Never commit .env or node_modules.

.gitignore includes:

node_modules/
.env
npm-debug.log*
🌿 Git Commands
git add .
git commit -m "Update Inventory Management System"
git push
📊 Project Status
Backend              ✅
Express API          ✅
MongoDB              ✅
Product Management   ✅
Purchase API         ✅
Restock API          ✅
Transaction History  ✅
Validation           ✅
Error Handling       ✅
Postman Collection   ✅
GitHub               ✅
👨‍💻 Author

Abhay Upadhyay

GitHub:
https://github.com/AbhayUpadhyay1112

Repository:
https://github.com/AbhayUpadhyay1112/Inventory-Management-System

📄 License

Created for educational, assessment, and demonstration purposes.



Then save it and run:


```powershell
git add README.md
git commit -m "Update README"
git push
