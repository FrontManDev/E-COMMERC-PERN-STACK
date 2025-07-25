import { useEffect, useState } from 'react';
import styles from './Products.module.css';
import AxiosInstance from '../../../axiosInterceptore/axiosInterceptoreToken';
import { FiShoppingCart } from 'react-icons/fi';
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
export default function Products() {
    const [Category, SetCategory] = useState([]);
    const [Products, SetProducts] = useState([]);
    const [Loading, SetLoading] = useState(false);
    const [Error, SetError] = useState(null);
    async function AllCategory() {
        try {
            SetLoading(true);
            const response = await AxiosInstance.get('http://localhost:5000/api/allcategory');
            SetCategory(response.data.category);
        } catch (error) {
            SetError(error.message);
        } finally {
            SetLoading(false);
        }
    }
    async function AllProducts() {
        try {
            SetLoading(true);
            const response = await AxiosInstance.get('http://localhost:5000/api/allproducts');
            SetProducts(response.data.allproduct);
            console.log(response.data.allproduct);
        } catch (error) {
            SetError(error.message);
        } finally {
            SetLoading(false);
        }
    }
    useEffect(() => {
        AllCategory();
        AllProducts();
    }, []);
    return (
        <div className={styles.container}>
            <div className={styles.heroProducts}>
                <div className={styles.categoriesSection}>
                    <ul className={styles.categoryList}>
                        <li>All</li>
                        {
                            Category.map((cat) => (
                                <li key={cat._id}>{cat.Name}</li>
                            ))
                        }
                    </ul>
                </div>
                <div className={styles.heroImagesOffer}>
                    <h1>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Impedit, blanditiis?
                    </h1>
                </div>
            </div>
            <h1>Our Products</h1>
            <div className={styles.contentWrapper}>
                <div className={styles.productsSection}>
                    <div className={styles.productsGrid}>
                        {
                            Products.map((product) => (
                                <div className={styles.productCard} key={product._id}>
                                    <div className={styles.productImageContainer}>
                                        <img
                                            src={`http://localhost:5000/ProductsImage/${JSON.parse(product.ProductsImage)[0]}`}
                                            className={styles.productImage}
                                            alt={product.Name}
                                        />
                                        <div className={styles.productActions}>
                                            <button className={styles.actionButton}><FiShoppingCart /></button>
                                            <button className={styles.actionButton}><MdOutlineFavoriteBorder /></button>
                                            <button className={styles.actionButton}><FaRegEye /></button>
                                        </div>
                                    </div>
                                    <div className={styles.productInfo}>
                                        <h3 className={styles.productName}>{product.Name}</h3>
                                        <h3 className={styles.productPrice}>{product.Price}$</h3>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}