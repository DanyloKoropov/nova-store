import { Link } from "react-router";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";
import QuantityControl from "../products/QuantityControl";

export default function CartItem({ item }) {
    const {
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
    } = useCart();

    return (
        <article className="cart-item">
            <Link
                to={`/products/${item.id}`}
                className="cart-item-image-link"
            >
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="cart-item-image"
                />
            </Link>

            <div className="cart-item-content">
                <div>
                    <h2 className="cart-item-title">
                        <Link to={`/products/${item.id}`}>
                            {item.title}
                        </Link>
                    </h2>

                    <p className="cart-item-price">
                        {formatCurrency(item.price)}
                    </p>
                </div>

                <div className="cart-item-actions">
                    <QuantityControl
                        quantity={item.quantity}
                        onDecrease={() =>
                            decreaseQuantity(item.id)
                        }
                        onIncrease={() =>
                            increaseQuantity(item.id)
                        }
                        max={item.stock}
                    />

                    <button
                        type="button"
                        className="cart-remove-button"
                        onClick={() => removeFromCart(item.id)}
                    >
                        Remove
                    </button>
                </div>
            </div>

            <p className="cart-item-subtotal">
                {formatCurrency(item.price * item.quantity)}
            </p>
        </article>
    );
}
