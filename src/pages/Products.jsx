import { useEffect, useState } from "react";
import {
    getCategories,
    getProducts,
} from "../api/productsApi";
import ProductFilters from "../components/products/ProductFilters";
import ProductGrid from "../components/products/ProductGrid";
import SearchBar from "../components/products/SearchBar";
import ProductSort from "../components/products/ProductSort";



export default function Products() {
    const [sortOption, setSortOption] = useState("default");
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minimumRating, setMinimumRating] = useState("0");

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadCatalogData() {
            try {
                setIsLoading(true);
                setError("");

                const [productsData, categoriesData] =
                    await Promise.all([
                        getProducts(),
                        getCategories(),
                    ]);

                setProducts(productsData);
                setCategories(categoriesData);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        loadCatalogData();
    }, []);

    const normalizedSearchQuery = searchQuery
        .trim()
        .toLowerCase();

    const minimumPriceNumber =
        minPrice === "" ? 0 : Number(minPrice);

    const maximumPriceNumber =
        maxPrice === "" ? Infinity : Number(maxPrice);

    const minimumRatingNumber = Number(minimumRating);

    const filteredProducts = products.filter((product) => {
        const title = product.title.toLowerCase();
        const category = product.category.toLowerCase();
        const brand = product.brand?.toLowerCase() ?? "";

        const matchesSearch =
            title.includes(normalizedSearchQuery) ||
            category.includes(normalizedSearchQuery) ||
            brand.includes(normalizedSearchQuery);

        const matchesCategory =
            selectedCategory === "" ||
            product.category === selectedCategory;

        const matchesMinimumPrice =
            product.price >= minimumPriceNumber;

        const matchesMaximumPrice =
            product.price <= maximumPriceNumber;

        const matchesRating =
            product.rating >= minimumRatingNumber;

        return (
            matchesSearch &&
            matchesCategory &&
            matchesMinimumPrice &&
            matchesMaximumPrice &&
            matchesRating
        );
    });

    const sortedProducts = [...filteredProducts];

    switch (sortOption) {
        case "price-low-high":
            sortedProducts.sort(
                (firstProduct, secondProduct) =>
                    firstProduct.price - secondProduct.price
            );
            break;

        case "price-high-low":
            sortedProducts.sort(
                (firstProduct, secondProduct) =>
                    secondProduct.price - firstProduct.price
            );
            break;

        case "rating-high-low":
            sortedProducts.sort(
                (firstProduct, secondProduct) =>
                    secondProduct.rating - firstProduct.rating
            );
            break;

        case "title-a-z":
            sortedProducts.sort(
                (firstProduct, secondProduct) =>
                    firstProduct.title.localeCompare(
                        secondProduct.title
                    )
            );
            break;

        case "title-z-a":
            sortedProducts.sort(
                (firstProduct, secondProduct) =>
                    secondProduct.title.localeCompare(
                        firstProduct.title
                    )
            );
            break;

        default:
            break;
    }

    function resetFilters() {
        setSelectedCategory("");
        setMinPrice("");
        setMaxPrice("");
        setMinimumRating("0");
        setSortOption("default");
    }

    if (isLoading) {
        return (
            <section className="page">
                <div className="container">
                    <p>Loading products...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="page">
                <div className="container">
                    <p>Error: {error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="page products-page">
            <div className="container">
                <div className="catalog-layout">
                    <ProductFilters
                        categories={categories}
                        selectedCategory={selectedCategory}
                        minPrice={minPrice}
                        maxPrice={maxPrice}
                        minimumRating={minimumRating}
                        onCategoryChange={setSelectedCategory}
                        onMinPriceChange={setMinPrice}
                        onMaxPriceChange={setMaxPrice}
                        onRatingChange={setMinimumRating}
                        onReset={resetFilters}
                    />

                    <div className="catalog-results">
                        <div className="catalog-controls">
                            <SearchBar
                                value={searchQuery}
                                onChange={setSearchQuery}
                                onClear={() => setSearchQuery("")}
                            />

                            <ProductSort
                                value={sortOption}
                                onChange={setSortOption}
                            />
                        </div>

                        <div className="catalog-results-header">
                            <p>{sortedProducts.length} products</p>
                        </div>

                        <ProductGrid products={sortedProducts} />
                    </div>
                </div>
            </div>
        </section>
    );
}

