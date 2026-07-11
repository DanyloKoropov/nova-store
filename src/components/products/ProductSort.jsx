export default function ProductSort({
    value,
    onChange,
}) {
    return (
        <div className="product-sort">
            <label htmlFor="product-sort">
                Sort by
            </label>

            <select
                id="product-sort"
                value={value}
                onChange={(event) =>
                    onChange(event.target.value)
                }
            >
                <option value="default">
                    Default
                </option>

                <option value="price-low-high">
                    Price: Low to High
                </option>

                <option value="price-high-low">
                    Price: High to Low
                </option>

                <option value="rating-high-low">
                    Highest Rated
                </option>

                <option value="title-a-z">
                    Name: A–Z
                </option>

                <option value="title-z-a">
                    Name: Z–A
                </option>
            </select>
        </div>
    );
}
