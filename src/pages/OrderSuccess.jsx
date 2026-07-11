import { Navigate, Link, useLocation } from "react-router";
import { formatCurrency } from "../utils/formatCurrency";

export default function OrderSuccess() {
    const location = useLocation();

    const {
        orderNumber,
        customerName,
        orderTotal,
    } = location.state ?? {};

    if (!orderNumber) {
        return <Navigate to="/" replace />;
    }

    return (
        <section className="page order-success-page">
            <div className="container">
                <div className="order-success-card">
                    <div
                        className="order-success-icon"
                        aria-hidden="true"
                    >
                        ✓
                    </div>

                    <p className="order-success-eyebrow">
                        Order confirmed
                    </p>

                    <h1>
                        Thank you
                        {customerName
                            ? `, ${customerName}`
                            : ""}
                        !
                    </h1>

                    <p>
                        Your demo order has been successfully created.
                    </p>

                    <div className="order-success-details">
                        <div>
                            <span>Order number</span>
                            <strong>{orderNumber}</strong>
                        </div>

                        {typeof orderTotal === "number" && (
                            <div>
                                <span>Order total</span>

                                <strong>
                                    {formatCurrency(orderTotal)}
                                </strong>
                            </div>
                        )}
                    </div>

                    <Link to="/" className="button-link">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </section>
    );
}
