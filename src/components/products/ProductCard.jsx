import { Link } from "react-router";
import { useCart } from "../../context/CartContext";
import { useFavorites } from "../../context/FavoritesContext";
import { formatCurrency } from "../../utils/formatCurrency";
import Rating from "./Rating";

export default function ProductCard({ product }) {
    const { addToCart } = useCart();
    const { toggleFavorite, isFavorite } = useFavorites();

    const favorite = isFavorite(product.id);

    return (
        <article className="product-card">
            <div className="product-card-image-wrapper">
                <Link
                    to={`/products/${product.id}`}
                    className="product-card-image-link"
                >
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="product-card-image"
                    />
                </Link>

                <button
                    type="button"
                    className={
                        favorite
                            ? "favorite-button active"
                            : "favorite-button"
                    }
                    onClick={() => toggleFavorite(product)}
                    aria-label={
                        favorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                    }
                >
                    {favorite ? "♥" : "♡"}
                </button>
            </div>

            <div className="product-card-content">
                <p className="product-card-category">
                    {product.category}
                </p>

                <h2 className="product-card-title">
                    <Link to={`/products/${product.id}`}>
                        {product.title}
                    </Link>
                </h2>

                <Rating value={product.rating} />

                <div className="product-card-footer">
                    <p className="product-card-price">
                        {formatCurrency(product.price)}
                    </p>

                    <button
                        type="button"
                        className="product-card-button"
                        onClick={() => addToCart(product)}
                        disabled={product.stock === 0}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </article>
    );
}
