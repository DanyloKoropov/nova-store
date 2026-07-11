import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {
    if (products.length === 0) {
        return (
            <div className="products-empty">
                <h2>No products found</h2>
                <p>Try changing your search or filters.</p>
            </div>
        );
    }

    return (
        <div className="product-grid">
            {products.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
}
