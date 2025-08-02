import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AxiosInstance from "../../../axiosInterceptore/axiosInterceptoreToken";
import styles from "./DetailsProduct.module.css";

export default function DetailsProducts() {
    const [Product, SetProduct] = useState(null);
    const [Error, SetError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        async function FetchProduct() {
            try {
                const response = await AxiosInstance.get(`products/${id}`);
                SetProduct(response.data.product);
            } catch (error) {
                SetError(error.message);
            }
        }
        FetchProduct();
    }, [id]);

    if (Error) return <p className={styles.error}>Error: {Error}</p>;
    if (!Product) return <p className={styles.loading}>Loading...</p>;

    const images = JSON.parse(Product.ProductsImage);

    return (
        <div className={styles.container}>
            <div className={styles.imageSection}>
                <img
                    className={styles.mainImage}
                    src={`http://localhost:5000/ProductsImage/${images[0]}`}
                    alt={Product.Name}
                />
                <div className={styles.thumbnails}>
                    {images.map((img, index) => (
                        <img
                            key={index}
                            className={styles.thumbnail}
                            src={`http://localhost:5000/ProductsImage/${img}`}
                            alt={`Thumbnail ${index}`}
                        />
                    ))}
                </div>

            </div>
            <div className={styles.detailsSection}>
                <h2>{Product.Name}</h2>
                <p className={styles.description}>{Product.Description}</p>
                <p className={styles.price}>${Product.Price}</p>
                <p className={styles.quantity}>Available: {Product.Quantity}</p>
                <div className={styles.buttons}>
                    <button className={styles.cartBtn}>Add to Cart</button>
                    <button className={styles.favBtn}>Add to Favorite</button>
                </div>
            </div>
        </div>
    );
}
