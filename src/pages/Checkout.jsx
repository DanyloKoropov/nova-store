import { useState } from "react";
import { Link, useNavigate } from "react-router";
import CheckoutForm from "../components/checkout/CheckoutForm";
import OrderSummary from "../components/checkout/OrderSummary";
import { useCart } from "../context/CartContext";
import { validateCheckoutForm } from "../utils/checkoutValidation";

const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardholderName: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
};

export default function Checkout() {
    const [formData, setFormData] = useState(initialFormData);
    const [errors, setErrors] = useState({});

    const {
        cartItems,
        cartCount,
        cartTotal,
        clearCart,
    } = useCart();

    const navigate = useNavigate();

    function formatCardNumber(value) {
        const digits = value
            .replace(/\D/g, "")
            .slice(0, 16);

        return digits
            .replace(/(\d{4})(?=\d)/g, "$1 ")
            .trim();
    }

    function formatExpirationDate(value) {
        const digits = value
            .replace(/\D/g, "")
            .slice(0, 4);

        if (digits.length <= 2) {
            return digits;
        }

        return `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }

    function handleChange(event) {
        const { name, value } = event.target;

        let nextValue = value;

        if (name === "cardNumber") {
            nextValue = formatCardNumber(value);
        }

        if (name === "expirationDate") {
            nextValue = formatExpirationDate(value);
        }

        if (name === "cvv") {
            nextValue = value.replace(/\D/g, "").slice(0, 4);
        }

        if (name === "state") {
            nextValue = value
                .replace(/[^a-zA-Z]/g, "")
                .toUpperCase()
                .slice(0, 2);
        }

        setFormData((currentFormData) => ({
            ...currentFormData,
            [name]: nextValue,
        }));

        if (errors[name]) {
            setErrors((currentErrors) => ({
                ...currentErrors,
                [name]: "",
            }));
        }
    }

    function handleSubmit(event) {
        event.preventDefault();

        const validationErrors =
            validateCheckoutForm(formData);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);

            const firstInvalidField =
                Object.keys(validationErrors)[0];

            document
                .getElementById(firstInvalidField)
                ?.focus();

            return;
        }

        const orderNumber = `NS-${Date.now()
            .toString()
            .slice(-8)}`;

        clearCart();

        navigate("/order-success", {
            replace: true,
            state: {
                orderNumber,
                customerName: formData.firstName,
                orderTotal: cartTotal,
            },
        });
    }

    if (cartItems.length === 0) {
        return (
            <section className="page">
                <div className="container checkout-empty">
                    <h1>Your Cart Is Empty</h1>

                    <p>
                        Add products before starting checkout.
                    </p>

                    <Link to="/" className="button-link">
                        Browse Products
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="page checkout-page">
            <div className="container">
                <div className="checkout-page-header">
                    <p>Secure demo checkout</p>
                    <h1>Checkout</h1>
                </div>

                <div className="checkout-layout">
                    <CheckoutForm
                        formData={formData}
                        errors={errors}
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                    />

                    <OrderSummary
                        cartItems={cartItems}
                        cartCount={cartCount}
                        cartTotal={cartTotal}
                    />
                </div>
            </div>
        </section>
    );
}
