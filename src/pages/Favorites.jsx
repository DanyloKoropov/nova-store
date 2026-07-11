import { Link } from "react-router";
import ProductCard from "../components/products/ProductCard";
import { useFavorites } from "../context/FavoritesContext";

export default function Favorites() {
    const { favoriteProducts } = useFavorites();

    if (favoriteProducts.length === 0) {
        return (
            <section className="page">
                <div className="container favorites-empty">
                    <h1>No Favorites Yet</h1>

                    <p>
                        Save products you like and they will appear here.
                    </p>

                    <Link to="/" className="button-link">
                        Browse Products
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="page favorites-page">
            <div className="container">
                <div className="favorites-header">
                    <div>
                        <h1>Favorites</h1>

                        <p>
                            {favoriteProducts.length} saved products
                        </p>
                    </div>
                </div>

                <div className="product-grid">
                    {favoriteProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
