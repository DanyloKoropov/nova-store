import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext(null);

function getInitialFavorites() {
    const savedFavorites = localStorage.getItem("favoriteProducts");

    if (!savedFavorites) {
        return [];
    }

    try {
        return JSON.parse(savedFavorites);
    } catch {
        return [];
    }
}

export function FavoritesProvider({ children }) {
    const [favoriteProducts, setFavoriteProducts] = useState(
        getInitialFavorites
    );

    useEffect(() => {
        localStorage.setItem(
            "favoriteProducts",
            JSON.stringify(favoriteProducts)
        );
    }, [favoriteProducts]);

    function toggleFavorite(product) {
        setFavoriteProducts((currentFavorites) => {
            const isAlreadyFavorite = currentFavorites.some(
                (item) => item.id === product.id
            );

            if (isAlreadyFavorite) {
                return currentFavorites.filter(
                    (item) => item.id !== product.id
                );
            }

            return [
                ...currentFavorites,
                {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    rating: product.rating,
                    category: product.category,
                    stock: product.stock,
                },
            ];
        });
    }

    function removeFavorite(productId) {
        setFavoriteProducts((currentFavorites) =>
            currentFavorites.filter((item) => item.id !== productId)
        );
    }

    function isFavorite(productId) {
        return favoriteProducts.some(
            (item) => item.id === productId
        );
    }

    const favoritesCount = favoriteProducts.length;

    const value = {
        favoriteProducts,
        toggleFavorite,
        removeFavorite,
        isFavorite,
        favoritesCount,
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);

    if (!context) {
        throw new Error(
            "useFavorites must be used inside FavoritesProvider"
        );
    }

    return context;
}
