import React, { useState } from "react";
import api from //"../api"; 

const CreateWishListPage: React.FC = () => {
  const [userId, setUserId] = useState<string>(""); 
  const [items, setItems] = useState<
    { name: string; price: number; isPurchased: boolean }[]
  >([]); 
  const [newItemName, setNewItemName] = useState<string>(""); 
  const [newItemPrice, setNewItemPrice] = useState<number>(0); 


  const handleAddItem = () => {
    if (newItemName && newItemPrice > 0) {
      const newItem = {
        name: newItemName,
        price: newItemPrice,
        isPurchased: false,
      };
      setItems([...items, newItem]); 
      setNewItemName("");
      setNewItemPrice(0);
    }
  };


  const handleSubmit = async () => {
    if (!userId || items.length === 0) {
      alert("Please provide a valid User ID and at least one item!");
      return;
    }

    try {
      const newWishList = {
        userId,
        items,
      };

      const response = await api.post("/wishlist", newWishList);

      if (response.status === 201) {
        alert("Wish List Created Successfully");
      }
    } catch (error) {
      console.error("Error creating wish list:", error);
      alert("There was an error creating your wish list.");
    }
  };

  return (
    <div>
      <h1>Create a New Wish List</h1>

      {/* Användarens ID */}
      <div>
        <label htmlFor="userId">User ID:</label>
        <input
          id="userId"
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter User ID"
        />
      </div>

      {/* Lägg till en ny artikel */}
      <div>
        <label htmlFor="newItemName">Item Name:</label>
        <input
          id="newItemName"
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Enter item name"
        />
      </div>
      <div>
        <label htmlFor="newItemPrice">Item Price:</label>
        <input
          id="newItemPrice"
          type="number"
          value={newItemPrice}
          onChange={(e) => setNewItemPrice(parseFloat(e.target.value))}
          placeholder="Enter item price"
        />
      </div>

      <button onClick={handleAddItem}>Add Item</button>

      {/* Visa alla artiklar som lagts till */}
      <div>
        <h2>Items in Your Wish List</h2>
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      </div>

      {/* Skicka önskelistan till backend */}
      <button onClick={handleSubmit}>Create Wish List</button>
    </div>
  );
};

export default CreateWishListPage;
