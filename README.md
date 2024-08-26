# Digital Wallet Platform

An advanced digital wallet solution crafted using the MERN stack, enabling seamless money transfers, balance inquiries, transaction history access, and account management. Designed with a microservices architecture and equipped with cutting-edge technologies for secure and responsive user experiences.

## 🌟 Key Features

- **Peer-to-Peer Transfers**: Facilitate money transfers between registered users.
- **Account Oversight**: Check balances, review recent transactions, and update account information.
- **Email Alerts**: Automatic email notifications for every transaction.
- **Administrative Tools**: Endpoints for administrators to access user information.

## 🛠️ Microservices Overview

- **User Management Service**: Manages user registration, updates, and data retrieval.
- **Transaction Management Service**: Handles transaction initiation and execution.
- **Notification Management Service**: Manages email notifications for transactions.
- **Wallet Management Service**: Oversees user wallet balance and updates.

Note: Services communicate efficiently using RabbitMQ for message passing.

## 🔧 Technology Stack

- **MongoDB**: Database for storing user and transaction information.
- **Express.js**: Backend framework for building server applications.
- **React.js**: Frontend library for developing user interfaces.
- **Node.js**: JavaScript runtime for building server-side applications.
- **RabbitMQ**: Messaging broker for service communication.
- **JWT**: Authentication and authorization mechanism.
- **Mongoose**: ODM for MongoDB to define data models.

## 📌 API Endpoints

### Transactions API (TransactionsController)

- **Endpoint**: `/api/transactions`
  - **Method**: POST
  - **Purpose**: Start a peer-to-peer transaction.
  - **Parameters**: recipient, description, amount.

### User API (UsersController)

- **Endpoint**: `/api/users`
  - **Method**: POST
  - **Purpose**: Register a new user.

- **Endpoint**: `/api/users`
  - **Method**: GET
  - **Purpose**: Retrieve details of the authenticated user.

- **Endpoint**: `/api/admin/users`
  - **Method**: GET
  - **Purpose**: Access information on all users (admin only).

- **Endpoint**: `/api/admin/users/{userId}`
  - **Method**: GET
  - **Purpose**: Fetch specific user details by ID (admin only).

## 🚀 Setup Instructions

### Requirements

- Node.js and npm must be installed.
- MongoDB server should be operational.
- RabbitMQ server should be configured for messaging.

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/digital-wallet-platform.git
   cd digital-wallet-platform