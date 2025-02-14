import React from "react";
import { StrictMode } from "react";
import { ClerkProvider } from "@clerk/clerk-react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ShopContextProvider from "./Context/ShopContext.jsx";


const clerkPubKey = import.meta.env.VITE_CLERK_FRONTEND_API;

if (!clerkPubKey) {
  throw new Error("Missing Clerk API Key in .env file");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
  
    <ClerkProvider publishableKey={clerkPubKey} afterSignOutUrl="/">
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </ClerkProvider>
  </StrictMode>
);
