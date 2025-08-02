import { useEffect, useState } from 'react';
import styles from './Products.module.css';
import { jwtDecode } from 'jwt-decode';
import AxiosInstance from '../../../axiosInterceptore/axiosInterceptoreToken';
import { FiShoppingCart } from 'react-icons/fi';
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { SetCartItems } from '../../../redux/slices/cartSlice';
import {Add} from '../../../redux/slices/wishlistSlice';
import { NavLink } from 'react-router-dom';
export default function Products() {
    const dispatch = useDispatch();
    const [Category, SetCategory] = useState([]);
    const [Products, SetProducts] = useState([]);
    const [Loading, SetLoading] = useState(false);
    const [Error, SetError] = useState(null);
    async function AllCategory() {
        try {
            SetLoading(true);
            const response = await AxiosInstance.get('/allcategory');
            SetCategory(response.data.category);
        } catch (error) {
            SetError(error.message);
        } finally {
            SetLoading(false);
        }
    }
    async function AddToCart(id) {
        try {
            const response = await AxiosInstance.post('/addtocart', {
                ProductId: id,
                UserId: jwtDecode(localStorage.getItem('token')).id
            });
            console.log(response);
            const cartResponse = await AxiosInstance.get(`/Allcartitem/${jwtDecode(localStorage.getItem('token')).id}`);
            dispatch(SetCartItems(cartResponse.data.ProdcutInCartItem));
        } catch (error) {
            SetError(error.message);
        } finally {
            SetLoading(false);
        }
    }
    async function AllProducts() {
        try {
            SetLoading(true);
            const response = await AxiosInstance.get('/allproducts');
            SetProducts(response.data.allproduct);
            console.log(response.data.allproduct);
        } catch (error) {
            SetError(error.message);
        } finally {
            SetLoading(false);
        }
    }

    async function ProductByCategory(id) {
        try {
            SetLoading(true);
            const response = await AxiosInstance.get(`/proudctbycategory/${id}`);
            console.log(response);
            SetProducts(response.data.product);
        } catch (error) {
            SetError(error.message);
        } finally {
            SetLoading(false);
        }

    }

    async function AddToWishList(ProductId) {
        try{
            SetLoading(true);
            const response = await AxiosInstance.post('/addtowishlist',{ProductId, UserId:jwtDecode(localStorage.getItem('token')).id});
            console.log(response);
            dispatch(Add());
        }catch(error){
            SetError(error.message);
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
                        <li onClick={() => AllProducts()}>All</li>
                        {
                            Category.map((cat) => (
                                <li key={cat.id} onClick={() => ProductByCategory(cat.id)}>{cat.Name}</li>
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
                            Products ? Products.map((product) => (
                                <div className={styles.productCard} key={product._id}>
                                    <div className={styles.productImageContainer}>
                                        <img
                                            src={`http://localhost:5000/ProductsImage/${JSON.parse(product.ProductsImage)[0]}`}
                                            className={styles.productImage}
                                            alt={product.Name}
                                        />
                                        <div className={styles.productActions}>
                                            <button className={styles.actionButton} onClick={() => AddToCart(product.id)}><FiShoppingCart /></button>
                                            <button className={styles.actionButton} onClick={()=>AddToWishList(product.id)} ><MdOutlineFavoriteBorder /></button>
                                            <NavLink to={`/Store/DetailsProduct/${product.id}`}><button className={styles.actionButton} > <FaRegEye /></button></NavLink>
                                        </div>
                                    </div>
                                    <div className={styles.productInfo}>
                                        <h3 className={styles.productName}>{product.Name}</h3>
                                        <h3 className={styles.productPrice}>{product.Price}$</h3>
                                    </div>
                                </div>
                            )) : (
                                <div className={styles.notcategory}>
                                    <h1>Ther'es no products in this category</h1>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}