import { useState, useEffect } from 'react';
import { getWishLists, createWishList } from '../services/apiService';
import type { components } from '../types/openapi';

type WishList = components["schemas"]["WishList"];

const WishListPage = () => {
    const [wishLists, setWishLists] = useState<WishList[]>([]);
    const [newWishListName, setNewWishListName] = useState('');

    useEffect(() => {
        const fetchWishLists = async () => {
            const data = await getWishLists();
            setWishLists(data || []);
        };
        fetchWishLists();
    }, []);

    const handleCreateWishList = async () => {
        if (!newWishListName.trim()) {
            alert("Please enter a wish list name");
            return;
        }
        await createWishList({ userId: 1, wishListName: newWishListName, items: [] });
        setNewWishListName('');
    };

    return (
        <div>
            <h1>Wish Lists</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleCreateWishList(); }}>
                <input
                    value={newWishListName}
                    onChange={(e) => setNewWishListName(e.target.value)}
                    placeholder="Enter wish list name"
                />
                <button type="submit">Create Wish List</button>
            </form>

            <h2>Existing Wish Lists:</h2>
            {wishLists.map((list) => (
                <div key={list.wishListId}>
                    <h3>{list.user?.username ?? `Wish List #${list.wishListId}`}</h3>
                </div>
            ))}
        </div>
    );
};

export default WishListPage;
