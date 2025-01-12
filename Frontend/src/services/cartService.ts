export const getCart = (): number[] => {
    const cart = localStorage.getItem('shoppingCart');
    return cart ? JSON.parse(cart) : [];
};

export const addToCart = (itemId: number): void => {
    const cart = getCart();
    if (!cart.includes(itemId)) {
        cart.push(itemId);
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    }
};

export const clearCart = (): void => {
    localStorage.removeItem('shoppingCart');
};
