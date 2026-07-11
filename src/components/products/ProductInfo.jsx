import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import QuantityControl from "./QuantityControl";
import Rating from "./Rating";
import { useFavorites } from "../../context/FavoritesContext";

export default function ProductInfo({ product }) {
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const { toggleFavorite, isFavorite } = useFavorites();
    const favorite = isFavorite(product.id);

    function decreaseQuantity() {
        setQuantity((currentQuantity) =>
            Math.max(1, currentQuantity - 1)
        );
    }

    function increaseQuantity() {
        setQuantity((currentQuantity) =>
            Math.min(product.stock, currentQuantity + 1)
        );
    }

    function handleAddToCart() {
        addToCart(product, quantity);
    }

    const originalPrice =
        product.price / (1 - product.discountPercentage / 100);

    return (
        <div className="product-info">
            <p className="product-info-category">
                {product.category}
            </p>

            <h1>{product.title}</h1>

            {product.brand && (
                <p className="product-info-brand">
                    Brand: <strong>{product.brand}</strong>
                </p>
            )}

            <Rating value={product.rating} />

            <div className="product-info-price-row">
                <p className="product-info-price">
                    {formatCurrency(product.price)}
                </p>

                {product.discountPercentage > 0 && (
                    <>
                        <p className="product-info-original-price">
                            {formatCurrency(originalPrice)}
                        </p>

                        <span className="product-info-discount">
                            {product.discountPercentage.toFixed(0)}% off
                        </span>
                    </>
                )}
            </div>

            <p className="product-info-description">
                {product.description}
            </p>

            <div className="product-info-status">
                <span
                    className={
                        product.stock > 0
                            ? "stock-status in-stock"
                            : "stock-status out-of-stock"
                    }
                >
                    {product.availabilityStatus}
                </span>

                <span>{product.stock} items available</span>
            </div>

            <div className="product-purchase">
                <QuantityControl
                    quantity={quantity}
                    onDecrease={decreaseQuantity}
                    onIncrease={increaseQuantity}
                    max={product.stock}
                />

                <button
                    type="button"
                    className="add-to-cart-button"
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                >
                    Add to Cart
                </button>

            </div>

            <button
                type="button"
                className={
                    favorite
                        ? "product-favorite-button active"
                        : "product-favorite-button"
                }
                onClick={() => toggleFavorite(product)}
            >
                {favorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>

            <div className="product-service-info">
                <div>
                    <span>Shipping</span>
                    <strong>{product.shippingInformation}</strong>
                </div>

                <div>
                    <span>Returns</span>
                    <strong>{product.returnPolicy}</strong>
                </div>

                <div>
                    <span>Warranty</span>
                    <strong>{product.warrantyInformation}</strong>
                </div>
            </div>
        </div>
    );
}
