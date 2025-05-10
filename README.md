# HerbVerse Hackathon Project 🌿

HerbVerse is a modern e-commerce platform for herbal products, designed to connect customers with natural wellness solutions. This project was built using **Expo**, **React Native**, and **Node.js** with a PostgreSQL database.

---

## App Architecture

The app follows a **modern full-stack architecture**:

1. **Frontend**:

   - Built with **React Native** and **Expo** for cross-platform compatibility (iOS, Android, and Web).
   - Uses **Expo Router** for file-based navigation.
   - **Tailwind CSS** (via NativeWind) for styling.
   - **Clerk** for authentication and user management.

2. **Backend**:

   - Built with **Node.js** and **Express.js**.
   - **PostgreSQL** as the database, managed via **docker-compose**.
   - RESTful API endpoints for products, orders, and inventory.

3. **State Management**:

   - Context API is used for managing the cart state.

4. **Deployment**:
   - Backend runs in a Dockerized environment.
   - Frontend is designed for deployment on Expo Go or as a standalone app.

---

## Key Features

### Customer Features:

- **Product Browsing**: Explore a wide range of herbal products.
- **Search Functionality**: Search for products by name, category, or seller.
- **Cart Management**: Add, update, and remove items from the cart.
- **Checkout**: View the total price and proceed to checkout. (not implemented)

### Vendor Features:

- **Inventory Management**: Add, edit, and view inventory items.
- **Order Management**: View and manage customer orders.
- **Role Switching**: Switch between customer and vendor roles.

### Shared Features:

- **Authentication**: Secure login and registration using Clerk.
- **Profile Management**: View and update user details.

---

## Code/Project Structure

### Frontend

The frontend is organized into the following directories:

<pre>
frontend/ 
├── api/                 # API functions for products, orders, and inventory
├── app/                 # Main application directory
│   ├── (auth)/          # Authentication screens (login, register)
│   ├── (protected)/     # Protected screens for customers and vendors
│   └── _layout.tsx      # Root layout for the app
├── components/          # Reusable UI components (e.g., SearchBar, QuantityPicker)
├── context/             # Context API for managing global state (e.g., CartContext)
├── assets/              # Static assets (images, fonts)
└── package.json         # Project dependencies and scripts
</pre>


### Backend
The backend is organized into the following directories:

<pre>
backend/
├── src/
│   ├── db/                 # Database connection and migrations
│   ├── routes/             # API routes for products, orders, and inventory
│   └── index.ts            # Main server entry point
├── Dockerfile              # Docker configuration for the backend
├── docker-compose.yml      # Docker Compose configuration for backend and database
└── package.json            # Project dependencies and scripts
</pre>


---

## How to Run the Project

### Prerequisites
- Node.js and npm installed

### Frontend
1. Navigate to the `frontend` directory:
   ```bash
   cd frontend

2. Install dependencies:
   ```bash
   npm install

2. Start the app:
   ```bash
   npm run start

### Backend

Not working! Didn't have time to finish 😞