import { formatCurrency } from "../../utils/formatCurrency";

export default function OrderSummary({
    cartItems,
    cartCount,
    cartTotal,
}) {
    return (
        <aside className="checkout-summary">
            <h2>Order Summary</h2>

            <div className="checkout-summary-items">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="checkout-summary-item"
                    >
                        <div className="checkout-summary-image-wrapper">
                            <img
                                src={item.thumbnail}
                                alt={item.title}
                            />

                            <span>{item.quantity}</span>
                        </div>

                        <div className="checkout-summary-item-info">
                            <h3>{item.title}</h3>

                            <p>
                                {formatCurrency(item.price)} each
                            </p>
                        </div>

                        <strong>
                            {formatCurrency(
                                item.price * item.quantity
                            )}
                        </strong>
                    </div>
                ))}
            </div>

            <div className="checkout-summary-row">
                <span>Items</span>
                <span>{cartCount}</span>
            </div>

            <div className="checkout-summary-row">
                <span>Subtotal</span>
                <span>{formatCurrency(cartTotal)}</span>
            </div>

            <div className="checkout-summary-row">
                <span>Shipping</span>
                <span>Free</span>
            </div>

            <div className="checkout-summary-total">
                <span>Total</span>
                <strong>{formatCurrency(cartTotal)}</strong>
            </div>
        </aside>
    );
}
