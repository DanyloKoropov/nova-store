import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { getProductById } from "../api/productsApi";
import ProductGallery from "../components/products/ProductGallery";
import ProductInfo from "../components/products/ProductInfo";
import ProductReviews from "../components/products/ProductReviews";

export default function ProductDetails() {
    const { productId } = useParams();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadProduct() {
            try {
                setIsLoading(true);
                setError("");

                const productData = await getProductById(productId);

                setProduct(productData);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        }

        loadProduct();
    }, [productId]);

    if (isLoading) {
        return (
            <section className="page">
                <div className="container">
                    <p>Loading product...</p>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="page">
                <div className="container">
                    <h1>Unable to load product</h1>
                    <p>{error}</p>

                    <Link to="/" className="button-link">
                        Back to Products
                    </Link>
                </div>
            </section>
        );
    }

    if (!product) {
        return null;
    }

    const productImages =
        product.images?.length > 0
            ? product.images
            : [product.thumbnail];

    return (
        <section className="page product-details-page">
            <div className="container">
                <Link to="/" className="back-link">
                    ← Back to Products
                </Link>

                <div className="product-details-layout">
                    <ProductGallery
                        images={productImages}
                        title={product.title}
                    />

                    <ProductInfo product={product} />
                </div>

                <ProductReviews reviews={product.reviews} />
            </div>
        </section>
    );
}
