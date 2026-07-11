export default function SearchBar({
    value,
    onChange,
    onClear,
}) {
    return (
        <div className="search-bar">
            <label htmlFor="product-search" className="search-label">
                Search products
            </label>

            <div className="search-input-wrapper">
                <input
                    id="product-search"
                    type="search"
                    className="search-input"
                    placeholder="Search by product name..."
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                />
{value && (
    <button
        type="button"
        className="search-clear-button"
        onClick={onClear}
        aria-label="Clear search"
    >
        ×
    </button>
)}
            </div>
        </div>
    );
}
