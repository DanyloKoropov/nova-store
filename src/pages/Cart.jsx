import { Link } from "react-router";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import { useCart } from "../context/CartContext";

export default function Cart() {
    const { cartItems, clearCart } = useCart();

    if (cartItems.length === 0) {
        return (
            <section className="page">
                <div className="container cart-empty">
                    <h1>Your Cart Is Empty</h1>

                    <p>
                        Add some products before proceeding to checkout.
                    </p>

                    <Link to="/" className="button-link">
                        Browse Products
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="page cart-page">
            <div className="container">
                <div className="cart-page-header">
                    <div>
                        <h1>Shopping Cart</h1>
                        <p>Review your products before checkout.</p>
                    </div>

                    <button
                        type="button"
                        className="clear-cart-button"
                        onClick={clearCart}
                    >
                        Clear Cart
                    </button>
                </div>

                <div className="cart-layout">
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                            />
                        ))}
                    </div>

                    <CartSummary />
                </div>
            </div>
        </section>
    );
}
