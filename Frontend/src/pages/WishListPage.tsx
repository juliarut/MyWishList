import { useState, useEffect } from 'react';
import { getWishLists } from '../services/apiService';
import { addToCart } from '../services/cartService';
import type { components } from '../types/openapi';

type WishList = components["schemas"]["WishList"];
type WishListItem = components["schemas"]["WishListItem"];

const WishListPage = () => {
    
    const [wishLists, setWishLists] = useState<WishList[]>([]);

    useEffect(() => {
        const fetchWishLists = async () => {
            try {
                const data = await getWishLists();
                if (data) {
                    setWishLists(data); 
                } else {
                    setWishLists([]);
                }
            } catch (error) {
                console.error("Failed to fetch wish lists", error);
            }
        };
        fetchWishLists();
    }, []);

    const handlePurchase = (itemId: number) => {
        addToCart(itemId);
        alert(`Item ${itemId} added to cart!`);
    };

    return (
        <div>
            <h1>Wish Lists</h1>
            {wishLists.length > 0 ? (
                wishLists.map((wishList) => (
                    <div key={wishList.wishListId}>
                        <h2>Wish List for User {wishList.userId}</h2>
                        <ul>
                            {wishList.items?.map((item) => (
                                item && (
                                    <li key={item.itemId}>
                                        {item.name} - ${item.price?.toFixed(2)}
                                        {!item.isPurchased && (
                                            <button onClick={() => handlePurchase(item.itemId!)}>
                                                Buy
                                            </button>
                                        )}
                                    </li>
                                )
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <p>No wish lists available.</p>
            )}
        </div>
    );
};

export default WishListPage;
