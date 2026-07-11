const BASE_URL = "https://dummyjson.com";

export async function getProducts() {
    const response = await fetch(`${BASE_URL}/products`);

    if (!response.ok) {
        throw new Error("Failed to fetch products");
    }

    const data = await response.json();

    return data.products;
}

export async function getProductById(productId) {
    const response = await fetch(
        `${BASE_URL}/products/${productId}`
    );

    if (response.status === 404) {
        throw new Error("Product not found.");
    }

    if (!response.ok) {
        throw new Error("Failed to fetch product.");
    }

    return response.json();
}

export async function getCategories() {
    const response = await fetch(`${BASE_URL}/products/category-list`);

    if (!response.ok) {
        throw new Error("Failed to fetch categories");
    }

    return response.json();
}
