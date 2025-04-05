
# Unified API

## 🚀 Overview
Unified API is a backend service built using **Node.js** and **Express**, designed to support multiple applications. Currently, it includes functionality for **Ugaoo features**, with plans to expand for **portfolio projects** and other services.

## 🏗 Features
- **Modular API structure**: `/api/v1/{service}/{resource}`
  - Example: `/api/v1/ugaoo/products` (for Ugaoo features)
  - Example: `/api/v1/portfolio/projects` (for portfolio management)
- **CRUD operations** for products (Ugaoo service)
- **MongoDB Atlas** integration for database storage
- **Middleware setup** for **CORS**, **logging (Morgan)**, and **environment variables**
- **Environment Variable Support**: Ensure secure management of configurations like DB credentials.

## 🛠 Installation & Setup

### Prerequisites
- **Node.js** (v16 or later)
- **MongoDB Atlas** account

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/sureshragam/unified-api.git
   cd unified-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure MongoDB connection:
   ```sh
   MONGO_URI=your_mongodb_connection_string
   DB_USER=your_db_username
   DB_PASSWORD=your_db_password
   NODE_ENV=development
   ```
4. Start the server:
   - Development mode:
     ```sh
     npm run dev
     ```
   - Production mode:
     ```sh
     npm start
     ```

## 🚀 Deployment
- Hosted on **Render** with **MongoDB Atlas**.
- Pushing to the **main** branch automatically triggers deployment.

## 📌 Future Enhancements
- Add **authentication** & **user management**
- Implement **file upload/download**
- Enable **notifications** and **logging mechanisms**
- Set up **CI/CD pipeline**

## 🤝 Contributing
Contributions are welcome! Feel free to fork the repo and create a pull request.

## 📄 License
This project is licensed under the **ISC License**.

---

💡 **Have questions or suggestions? Open an issue!**
