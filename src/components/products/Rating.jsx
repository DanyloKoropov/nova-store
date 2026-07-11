export default function Rating({ value }) {
    const roundedRating = Math.round(value);

    return (
        <div className="rating" aria-label={`Rating: ${value} out of 5`}>
            <span className="rating-stars" aria-hidden="true">
                {"★".repeat(roundedRating)}
                {"☆".repeat(5 - roundedRating)}
            </span>

            <span className="rating-value">{value.toFixed(1)}</span>
        </div>
    );
}
