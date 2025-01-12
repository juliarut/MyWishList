import { getCart, clearCart } from '../services/cartService';
import { useState } from 'react';

const ShoppingCartPage = () => {
    const [cart, setCart] = useState(getCart());

    const handleCheckout = () => {
        alert('Purchase successful!');
        clearCart();
        setCart([]);
    };

    return (
        <div>
            <h1>Shopping Cart</h1>
            {cart.length > 0 ? (
                <>
                    <ul>
                        {cart.map((itemId, index) => (
                            <li key={index}>Item ID: {itemId}</li>
                        ))}
                    </ul>
                    <button onClick={handleCheckout}>Checkout</button>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default ShoppingCartPage;
