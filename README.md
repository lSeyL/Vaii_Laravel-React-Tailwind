# 3D Models E-Shop

Welcome to the 3D Models E-Shop! This project is a modern e-commerce platform for showcasing and selling 3D models. Built with **React** for the frontend, **Laravel** for the backend, and styled using **Tailwind CSS**.

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
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
git clone https://github.com/lSeyL/Vaii_Laravel-React-Tailwind.git
cd Vaii_Laravel-React-Tailwind
```

#
<p align="left"><a href="https://laravel.com" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Laravel.svg" alt="Laravel Logo" height="80" ></a></p>

### Step 2: Backend Setup (Laravel)
1. Navigate to the project's **root** directory using terminal
2. Copy **.env.example** into **.env** and configure database credentials
```bash
cp .env.example .env
``` 
3. Run
```bash
composer install
```  
4. Set the encryption key by executing
```bash
php artisan key:generate
``` 
5. Run migrations
```bash
php artisan migrate --seed
``` 
6. Start local server by executing
```bash
php artisan serve
``` 



# 
<p align="left"><a href="https://react.dev" target="_blank"> <img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React Logo" height="80"></a></p>   

### Step 3: Frontend Setup (React)
1. Open new terminal and navigate to the **react** folder
```bash
cd react
``` 
2. Copy **react/.env.example** into **.env** and adjust the **VITE_API_BASE_URL** parameter
3. Run 
```bash
npm install
``` 
4. Start vite server for React
```bash
npm run dev
``` 



   #
<p align="left"><a href="https://tailwindcss.com" target="_blank"><img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Tailwind_CSS_Logo.svg" alt="Tailwind CSS Logo" height="80"></a></p>

### Step 4: CSS Setup (Tailwind)
1. Install tailwindcss and @tailwindcss/vite via npm and configure the vite plugin
```
npm install tailwindcss @tailwindcss/vite
```

