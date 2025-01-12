import React, { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import api from "../api"; // För att hämta data från din backend

const HomePage: React.FC = () => {
  const [wishLists, setWishLists] = useState<any[]>([]);

  useEffect(() => {
    // Hämta alla önskelistor från backend
    api
      .get("/wishlist")
      .then((response) => setWishLists(response.data))
      .catch((error) => console.error("Error fetching wishlists", error));
  }, []);

  return (
    <div>
      <h1>Wish Lists</h1>
      <ul>
        {wishLists.map((wishList) => (
          <li key={wishList.id}>
            <span>
              {wishList.userId} - {wishList.items.length} items
            </span>
            <Link to={`/edit-wishlist/${wishList.id}`}>Edit</Link> |
            <Link to={`/delete-wishlist/${wishList.id}`}>Delete</Link>
          </li>
        ))}
      </ul>
      <Link to="/create-wishlist">Create a new Wish List</Link>
    </div>
  );
};

export default HomePage;
