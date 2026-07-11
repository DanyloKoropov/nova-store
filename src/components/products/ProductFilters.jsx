export default function ProductFilters({
    categories,
    selectedCategory,
    minPrice,
    maxPrice,
    minimumRating,
    onCategoryChange,
    onMinPriceChange,
    onMaxPriceChange,
    onRatingChange,
    onReset,
}) {
    return (
        <aside className="product-filters">
            <div className="product-filters-header">
                <h2>Filters</h2>

                <button
                    type="button"
                    className="filters-reset-button"
                    onClick={onReset}
                >
                    Reset
                </button>
            </div>

            <div className="filter-group">
                <label htmlFor="category-filter">
                    Category
                </label>

                <select
                    id="category-filter"
                    value={selectedCategory}
                    onChange={(event) =>
                        onCategoryChange(event.target.value)
                    }
                >
                    <option value="">All categories</option>

                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {formatCategoryName(category)}
                        </option>
                    ))}
                </select>
            </div>

            <div className="filter-group">
                <label htmlFor="minimum-price">
                    Minimum price
                </label>

                <input
                    id="minimum-price"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="0"
                    value={minPrice}
                    onChange={(event) =>
                        onMinPriceChange(event.target.value)
                    }
                />
            </div>

            <div className="filter-group">
                <label htmlFor="maximum-price">
                    Maximum price
                </label>

                <input
                    id="maximum-price"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="No maximum"
                    value={maxPrice}
                    onChange={(event) =>
                        onMaxPriceChange(event.target.value)
                    }
                />
            </div>

            <div className="filter-group">
                <label htmlFor="rating-filter">
                    Minimum rating
                </label>

                <select
                    id="rating-filter"
                    value={minimumRating}
                    onChange={(event) =>
                        onRatingChange(event.target.value)
                    }
                >
                    <option value="0">All ratings</option>
                    <option value="4">4 stars and up</option>
                    <option value="3">3 stars and up</option>
                    <option value="2">2 stars and up</option>
                    <option value="1">1 star and up</option>
                </select>
            </div>
        </aside>
    );
}

function formatCategoryName(category) {
    return category
        .split("-")
        .map(
            (word) =>
                word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
}
