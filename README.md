🏭 Warehouse Inventory Management API

A RESTful API built with Node.js and Express to manage products and inventory in a warehouse.
This project implements full CRUD operations, stock management with validation, and tracks all inventory changes.

📘 Overview

This API allows you to:

Create, read, update, and delete products

Manage inventory levels with increase/decrease operations

Prevent negative stock through validation

Track low-stock products automatically

View complete stock change history for audit purposes

I built this as a backend-focused solution emphasizing robust business logic and proper error handling.

🧰 Tech Stack

Runtime: Node.js

Framework: Express.js

Database: MySQL

Testing: Jest + Supertest

ORM/Query: MySQL2

📂 Project Structure

I organized the code following MVC pattern to keep things clean and maintainable:

warehouse-api/
├── controllers/
│   └── productController.js
├── models/
│   └── productModel.js
├── routes/
│   └── productRoutes.js
├── db/
│   └── db.js
├── tests/
│   └── products.test.js
├── app.js
├── server.js
├── .env
└── package.json

🎯 API Endpoints
🧱 Product Management (CRUD)
Method	Endpoint	Description
GET	/api/products	Get all products
GET	/api/products/:id	Get single product
POST	/api/products	Create new product
PUT	/api/products/:id	Update product
DELETE	/api/products/:id	Delete product
📦 Inventory Operations
Method	Endpoint	Description
POST	/api/products/:id/increase	Increase stock quantity
POST	/api/products/:id/decrease	Decrease stock (validates stock)
🌟 Bonus Features
Method	Endpoint	Description
GET	/api/products/low-stock	Get products below threshold
GET	/api/products/:id/history	Get stock change history
🚀 Getting Started
✅ Prerequisites

Make sure you have these installed:

Node.js (v14 or higher)

MySQL (v8 or higher)

npm or yarn

1. Clone the Repository
git clone https://github.com/GauravGK30/Warehouse-API.git
cd warehouse-api

2. Install Dependencies
npm install


This installs Express, MySQL2, Jest, Supertest, and other required packages.

3. Database Setup

Open your MySQL client (MySQL Workbench, command line, etc.) and run:

CREATE DATABASE warehouse_db;
USE warehouse_db;

CREATE TABLE products(
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  stock_quantity INT NOT NULL DEFAULT 0 CHECK(stock_quantity >= 0),
  low_stock_threshold INT DEFAULT 3,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE stock_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  change_type ENUM('increase', 'decrease') NOT NULL,
  quantity INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE INDEX idx_low_stock ON products(stock_quantity, low_stock_threshold);
CREATE INDEX idx_stock_history_product ON stock_history(product_id);

CREATE VIEW low_stock_products AS
SELECT id, name, description, stock_quantity, low_stock_threshold,
(low_stock_threshold - stock_quantity) as shortage_amount
FROM products
WHERE stock_quantity < low_stock_threshold;

🧪 Optional - Add Sample Data
INSERT INTO products (name, description, stock_quantity, low_stock_threshold) VALUES
('Laptop Dell XPS 15', 'High-performance laptop with 16GB RAM and 512GB SSD', 25, 10),
('Wireless Mouse', 'Ergonomic wireless mouse with USB receiver', 5, 8),
('USB-C Cable', '2m USB-C charging cable - Fast charging', 2, 5),
('Monitor 27"', '4K UHD monitor with HDR support', 0, 3),
('Mechanical Keyboard', 'RGB mechanical gaming keyboard with blue switches', 15, 5),
('Webcam HD', '1080p webcam with built-in microphone', 8, 10),
('Headphones', 'Noise cancelling wireless headphones', 1, 4),
('External SSD 1TB', 'Portable SSD with USB 3.2', 30, 8);

4. Configure Environment Variables

Create a .env file in the root directory.
A .env.example is already included as a template:

cp .env.example .env


.env

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=warehouse_db


⚠️ Replace your_mysql_password with your actual MySQL password.

5. Run the Application
npm start


For development with auto-reload:

npm run dev


You should see:

Connected to MySQL database
Server running on port 5000


The API is now available at:
👉 http://localhost:5000

📡 Example Requests
Create a Product
curl -X POST http://localhost:5000/api/products \
-H "Content-Type: application/json" \
-d '{ "name": "Wireless Headphones", "description": "Noise cancelling headphones", "stock_quantity": 30, "low_stock_threshold": 10 }'

Increase Stock
curl -X POST http://localhost:5000/api/products/1/increase \
-H "Content-Type: application/json" \
-d '{"quantity": 20}'

Decrease Stock
curl -X POST http://localhost:5000/api/products/1/decrease \
-H "Content-Type: application/json" \
-d '{"quantity": 5}'

Get Low Stock Products
curl http://localhost:5000/api/products/low-stock

Get Stock History
curl http://localhost:5000/api/products/:id/history

🧪 Running Tests

Comprehensive test cases cover all stock management operations and edge cases.

Run all tests:

npm test

✅ Tests Cover:

Stock increase operations

Stock decrease operations

Edge case: remove more stock than available

Edge case: decrease stock to exactly zero

Edge case: decreasing when already at zero

Validation: negative or zero quantities rejected

Error handling: non-existent products (404)

Low stock product listing

Stock history tracking

🧠 Design Choices & Assumptions
🧩 Architecture Decisions

MVC Pattern:
Clear separation of concerns:

Models → Database operations

Controllers → Business logic

Routes → API endpoints

MySQL Over NoSQL:

Strong data consistency

ACID transactions

Relational structure (Products + Stock History)

CHECK constraints to prevent negative stock

🧮 Business Logic Assumptions

Stock Validation:

No negative stock allowed

Quantities must be positive integers

Validation enforced at both application and DB level

Low Stock Threshold:

Defaults to 3 if not specified

Low stock = stock_quantity < low_stock_threshold

Database VIEW used for efficient queries

Stock History:

Every increase/decrease is logged

Tracks quantity changed

Automatically deleted if product is deleted (CASCADE)

Update Behavior:

PUT /api/products/:id updates all fields (validates stock)

Use dedicated increase/decrease endpoints for stock updates

⚙️ Error Handling Strategy
Code	Description
200	Success
201	Created successfully
400	Bad Request (validation errors, etc.)
404	Product not found
500	Internal Server Error

All error responses include descriptive messages for easier debugging.

⚠️ Troubleshooting
🔌 Database Connection Issues

If you see "Database connection failed":

Ensure MySQL is running

Verify credentials in .env

Check if database exists: SHOW DATABASES;

Ensure MySQL user has permissions

🔁 Port Already In Use

If port 5000 is taken, change in .env:

PORT=3000

🧪 Tests Failing?

Ensure database is running

Check for conflicting test data

Run npm install to verify all dependencies
