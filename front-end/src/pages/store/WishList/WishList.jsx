import { useEffect, useState } from 'react';
import styles from './WishList.module.css';
import AxiosInstance from '../../../axiosInterceptore/axiosInterceptoreToken';
import { jwtDecode } from 'jwt-decode';
import { FiShoppingCart } from 'react-icons/fi';
import { CiCircleRemove } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Delete } from '../../../redux/slices/wishlistSlice';
import { SetCartItems } from '../../../redux/slices/cartSlice';
export default function WishList() {
    const dispatch = useDispatch();
    const [WishList, SetWishList] = useState([]);
    const [Error, SetError] = useState(null);
    async function FetchWishList() {
        try {
            const response = await AxiosInstance.get(`/getallwishlist/${jwtDecode(localStorage.getItem('token')).id}`);
            SetWishList(response.data.WishListProducts);
            console.log(response);
        } catch (error) {
            SetError(error.message);
        }
    }

    async function DeleteWishList(ProductId) {
        try {
            const response = await AxiosInstance.delete('/deletefromwishlist', {
                data: {
                    ProductId: ProductId,
                    UserId: jwtDecode(localStorage.getItem('token')).id
                }
            });
            console.log(response);
            FetchWishList();
            dispatch(Delete());
        } catch (error) {
            SetError(error.message);
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
        }
    }
    useEffect(() => {
        FetchWishList();
    }, []);
    return (
        <div className={styles.wishlistContainer}>
            <div className={styles.wishlistHeader}>
                <div className={styles.wishlistHeaderInfo}>
                    <h1>My Wishlist</h1>
                </div>
                <NavLink to='/Store/Products' className={styles.continueShoppingBtn}>
                    Continue Shopping
                </NavLink>
            </div>

            {WishList && WishList.length > 0 ? (
                <table className={styles.wishlistTable}>
                    <tbody>
                        {WishList.map((WishItem) => (
                            <tr key={WishItem.id} className={styles.wishlistItem}>
                                <td className={`${styles.itemCell} ${styles.itemImageCell}`}>
                                    <img
                                        src={`http://localhost:5000/ProductsImage/${JSON.parse(WishItem.ProductsImage)[0]}`}
                                        alt={WishItem.Name}
                                        className={styles.itemImage}
                                    />
                                </td>
                                <td className={`${styles.itemCell} ${styles.itemInfoCell}`}>
                                    <span className={styles.productName}>{WishItem.Name}</span>
                                    <span className={styles.productCategory}>Category</span>
                                </td>
                                <td className={`${styles.itemCell} ${styles.itemPriceCell}`}>
                                    {WishItem.Price}$
                                </td>
                                <td className={`${styles.itemCell} ${styles.itemActionsCell}`}>
                                    <button className={styles.actionBtn} onClick={()=>AddToCart(WishItem.id)}><FiShoppingCart /></button>
                                    <button className={styles.actionBtn}><FaRegEye /></button>
                                    <button
                                        className={`${styles.actionBtn} ${styles.removeBtn}`}
                                        onClick={() => DeleteWishList(WishItem.id)}
                                    >
                                        <CiCircleRemove />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className={styles.emptyWishlist}>
                    <div className={styles.emptyIcon}>
                        <CiCircleRemove />
                    </div>
                    <div className={styles.emptyText}>Your wishlist is empty</div>
                    <NavLink to='/Store/Products' className={styles.continueShoppingBtn}>
                        Start Shopping
                    </NavLink>
                </div>
            )}
        </div>
    );
}