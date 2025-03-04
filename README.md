# shoes-store

Shoe Store is a e-commerce application built using the MERN stack (MongoDB, Express, React, Node.js). It provides a seamless shopping experience with features like product management, user authentication, cart functionality,attractive UI and AI-powered image-based search.

## 🚀 Features
- 🛒 **Product Management** - Add, edit, delete, and manage products via an admin panel.
- 👤 **User Authentication** - Secure login/signup using Clerk authentication.
- 🛍️ **Shopping Cart** - Add and remove products with an intuitive cart interface.
-  💳 **Payment Integration** - Integrated Razorpay, it provides fastest seemless payment experience
- 🧾 **Payment Invoice** - Provides payment Invoice includes order and transaction details to users,who made transaction through online .
- 🎨 **Fully Responsive Design** - Optimized for mobile and desktop.(Coming soon...)
-  **Admin Dshboard Graphs** -  Sales data more understandable through simple graphs.
-  📸 **AI-Based Image Search** - Find similar shoes using an image-based search powered by TensorFlow(Coming soon...).


## 🏗️ Tech Stack
- **Frontend:** React, Redux,Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** Clerk
- **Storage:** Multer (for image uploads)
- **Machine Learning:** TensorFlow.js
- **Charts & Graphs:** Recharts, Chart.js (for admin dashboard analytics)


## 🔧 Setup Instructions
### 1️⃣ Clone the repository
```sh
git clone https://github.com/Sharathhh/MERN-Shoe-Store.git
cd MERN-Shoe-Store
```

### 2️⃣ Install dependencies
```sh
cd client && npm install
cd ../server && npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file in the `server/` directory and add:
```
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_URL=your_cloudinary_url
PORT=5000
```

### 4️⃣ Run the app
```sh
# Start backend
cd server && npm start

# Start frontend
cd client && npm start
```

### 5️⃣ Open in Browser
```
http://localhost:3000
```
