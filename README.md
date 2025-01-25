# 3D Models E-Shop

Welcome to the 3D Models E-Shop! This project is a modern e-commerce platform for showcasing and selling 3D models. Built with **React** for the frontend, **Laravel** for the backend, and styled using **Tailwind CSS**, it delivers a seamless and responsive shopping experience.

---

## Features

- 🛒 **E-Commerce Functionality**: Browse, search, and purchase 3D models.
- 💻 **Modern UI**: Styled with Tailwind CSS for a clean and responsive design.
- ⚙️ **Backend Integration**: Laravel powers a robust API and database management.
- 🔒 **Secure Login and Roles**: User authentication and role-based access control.
- 📦 **Full CRUD Operations**: Manage models, categories, and user data.

---

## Installation Guide

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js**: [Download Node.js](https://nodejs.org/)
- **Composer**: [Download Composer](https://getcomposer.org/)
- **PHP** (Version 8.0 or higher)
- **MySQL** or another database server

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/3d-models-eshop.git
cd 3d-models-eshop
```

### Step 2: Backend Setup (Laravel)
1. Navigate to the project's **root** directory using terminal
2. Copy **.env.example** into **.env ** and configure database credentials
3. Run **composer install**
4. Set the encryption key by executing **php artisan key:generate**
5. Run migrations **php artisan migrate --seed**
6. Start local server by executing **php artisan serve**
   
### Step 3: Frontend Setup (React)
1. Open new terminal and navigate to the **react** folder
2. Copy **react/.env.example** into **.env** and adjust the **VITE_API_BASE_URL** parameter
3. Run **npm install**
4. Run **npm run dev** to start vite server for React

### Step 4: CSS Setup (Tailwind)


