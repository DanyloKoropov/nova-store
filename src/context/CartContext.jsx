import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

function getInitialCartItems() {
    const savedCart = localStorage.getItem("cartItems");

    if (!savedCart) {
        return [];
    }

    try {
        return JSON.parse(savedCart);
    } catch {
        return [];
    }
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(getInitialCartItems);

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    function addToCart(product, quantity = 1) {
        setCartItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === product.id
                        ? {
                              ...item,
                              quantity: Math.min(
                                  item.quantity + quantity,
                                  product.stock
                              ),
                          }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    stock: product.stock,
                    quantity,
                },
            ];
        });
    }

    function removeFromCart(productId) {
        setCartItems((currentItems) =>
            currentItems.filter((item) => item.id !== productId)
        );
    }

    function increaseQuantity(productId) {
        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.id === productId
                    ? {
                          ...item,
                          quantity: Math.min(
                              item.quantity + 1,
                              item.stock
                          ),
                      }
                    : item
            )
        );
    }

    function decreaseQuantity(productId) {
        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.id === productId
                    ? {
                          ...item,
                          quantity: Math.max(1, item.quantity - 1),
                      }
                    : item
            )
        );
    }

    function clearCart() {
        setCartItems([]);
    }

    const cartCount = cartItems.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const cartTotal = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartCount,
        cartTotal,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error("useCart must be used inside CartProvider");
    }

    return context;
}
