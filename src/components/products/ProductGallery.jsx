import { useState } from "react";

export default function ProductGallery({ images, title }) {
    const [selectedImage, setSelectedImage] = useState(images[0]);

    return (
        <div className="product-gallery">
            <div className="product-gallery-main">
                <img
                    src={selectedImage}
                    alt={title}
                    className="product-gallery-main-image"
                />
            </div>

            {images.length > 1 && (
                <div className="product-gallery-thumbnails">
                    {images.map((image, index) => (
                        <button
                            key={image}
                            type="button"
                            className={
                                selectedImage === image
                                    ? "product-thumbnail active"
                                    : "product-thumbnail"
                            }
                            onClick={() => setSelectedImage(image)}
                            aria-label={`View image ${index + 1}`}
                        >
                            <img
                                src={image}
                                alt={`${title} view ${index + 1}`}
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
