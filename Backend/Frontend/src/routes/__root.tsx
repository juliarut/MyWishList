import React from "react";
import { RouterProvider } from "@tanstack/react-router";
import { createRouter } from "@tanstack/react-router";
import HomePage from "./routes/HomePage";
import CreateWishListPage from "./routes/CreateWishListPage";
import EditWishListPage from "./routes/EditWishListPage";
import DeleteWishListPage from "./routes/DeleteWishListPage";

// Skapa din router och definiera vägarna
const router = createRouter({
  routeTree: [
    { path: "/", component: HomePage },
    { path: "/create-wishlist", component: CreateWishListPage },
    { path: "/edit-wishlist/:id", component: EditWishListPage },
    { path: "/delete-wishlist/:id", component: DeleteWishListPage },
  ],
});

// Huvudkomponenten för appen
const AppRoot: React.FC = () => {
  return (
    <div>
      {/* Här kan du lägga till gemensam layout */}
      <header>
        <h1>Welcome to the Wish List App</h1>
        <nav>
          {/* Länkar för navigering */}
          <a href="/">Home</a> |<a href="/create-wishlist">Create Wish List</a>
        </nav>
      </header>

      {/* Huvudroutern för att hantera navigering */}
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRoot;
