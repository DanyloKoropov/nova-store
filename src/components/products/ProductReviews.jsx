import Rating from "./Rating";

export default function ProductReviews({ reviews }) {
    if (!reviews || reviews.length === 0) {
        return (
            <section className="product-reviews">
                <h2>Customer Reviews</h2>
                <p>No reviews yet.</p>
            </section>
        );
    }

    return (
        <section className="product-reviews">
            <div className="product-reviews-header">
                <h2>Customer Reviews</h2>
                <p>{reviews.length} reviews</p>
            </div>

            <div className="reviews-list">
                {reviews.map((review, index) => (
                    <article
                        key={`${review.reviewerEmail}-${index}`}
                        className="review-card"
                    >
                        <div className="review-card-header">
                            <div>
                                <h3>{review.reviewerName}</h3>

                                <time dateTime={review.date}>
                                    {new Date(review.date).toLocaleDateString(
                                        "en-US",
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }
                                    )}
                                </time>
                            </div>

                            <Rating value={review.rating} />
                        </div>

                        <p>{review.comment}</p>
                    </article>
                ))}
            </div>
        </section>
    );
}
