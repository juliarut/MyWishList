// src/components/WishListForm.tsx
import { useState } from 'react';
import { createWishList } from '../services/apiService';

const WishListForm = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !price) {
            alert("Title and price are required!");
            return;
        }

        const newWishList = {
            items: [{
                name: title,
                description,
                price: parseFloat(price),
                isPurchased: false
            }],
            userId: 1 
        };

        try {
            await createWishList(newWishList);
            alert('Wish list added successfully!');
            setTitle('');
            setPrice('');
            setDescription('');
        } catch (error) {
            console.error("Failed to create wish list:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg space-y-4">
            <h2 className="text-2xl font-bold text-blue-600">Add a New Wish List Item</h2>
            <input 
                type="text" 
                placeholder="Item Name" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 border rounded"
            />
            <input 
                type="number" 
                placeholder="Price" 
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full p-2 border rounded"
            />
            <textarea 
                placeholder="Description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border rounded"
            />
            <button 
                type="submit" 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
                Add Wish List Item
            </button>
        </form>
    );
};

export default WishListForm;
