export default function QuantityControl({
    quantity,
    onDecrease,
    onIncrease,
    max,
}) {
    return (
        <div className="quantity-control">
            <button
                type="button"
                onClick={onDecrease}
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
            >
                −
            </button>

            <span className="quantity-value">{quantity}</span>

            <button
                type="button"
                onClick={onIncrease}
                disabled={quantity >= max}
                aria-label="Increase quantity"
            >
                +
            </button>
        </div>
    );
}
