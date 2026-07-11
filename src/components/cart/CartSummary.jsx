import { Link } from "react-router";
import { useCart } from "../../context/CartContext";
import { formatCurrency } from "../../utils/formatCurrency";

export default function CartSummary() {
    const { cartCount, cartTotal } = useCart();

    return (
        <aside className="cart-summary">
            <h2>Order Summary</h2>

            <div className="cart-summary-row">
                <span>Items</span>
                <span>{cartCount}</span>
            </div>

            <div className="cart-summary-row">
                <span>Subtotal</span>
                <span>{formatCurrency(cartTotal)}</span>
            </div>

            <div className="cart-summary-row">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
            </div>

            <div className="cart-summary-total">
                <span>Total</span>
                <strong>{formatCurrency(cartTotal)}</strong>
            </div>

            <Link to="/checkout" className="checkout-button">
                Proceed to Checkout
            </Link>
        </aside>
    );
}
